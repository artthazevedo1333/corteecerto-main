import { createFileRoute } from "@tanstack/react-router";
import type { PaymentGateway } from "@/lib/payments/types";

/**
 * receive_webhook — endpoint público para os gateways.
 * URL: /api/public/webhooks/payments?gateway=mercadopago
 *
 * Stripe está desativado (D). Asaas/Mercado Pago permanecem suportados.
 *
 * Segurança:
 *  - verifica assinatura via provider.verifySignature
 *  - idempotência via tabela webhook_events (unique gateway+external_event_id)
 *  - troca de plano (A) só é efetivada aqui, após payment_confirmed
 */
export const Route = createFileRoute("/api/public/webhooks/payments")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const gateway = (url.searchParams.get("gateway") ?? "") as PaymentGateway;

        if (!["asaas", "mercadopago"].includes(gateway)) {
          return new Response("Unknown or disabled gateway", { status: 400 });
        }

        const rawBody = await request.text();
        const { getProvider } = await import("@/lib/payments/providers.server");
        const { logGatewayError } = await import("@/lib/payments/errors.server");
        const provider = getProvider(gateway);

        const headersWithQuery = new Headers(request.headers);
        headersWithQuery.set("x-original-query", url.searchParams.toString());

        const validSig = await provider.verifySignature(headersWithQuery, rawBody);
        if (!validSig) return new Response("Invalid signature", { status: 401 });

        const event = await provider.parseWebhook(headersWithQuery, rawBody);

        if (!event.externalEventId) {
          return new Response("Missing external_event_id", { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { error: insertErr } = await supabaseAdmin.from("webhook_events" as any).insert({
          gateway,
          event_type: event.type,
          external_event_id: event.externalEventId,
          payload: event.raw,
        });

        if (insertErr) {
          if (insertErr.code === "23505") {
            return new Response("ok (duplicate)", { status: 200 });
          }
          console.error("[webhook] insert idempotency row failed", insertErr);
          return new Response("Idempotency store error", { status: 500 });
        }

        try {
          const userId =
            event.userId ?? (await resolveUserByExternalSub(event.externalSubscriptionId));

          if (userId) {
            if (event.type === "payment_confirmed" || event.type === "subscription_renewed") {
              // (A) Detecta troca de plano pendente via billing_history.metadata
              const { data: pending } = await supabaseAdmin
                .from("billing_history" as any)
                .select("id, metadata")
                .eq("user_id", userId)
                .eq("external_id", event.externalEventId)
                .maybeSingle();

              const meta = (pending as any)?.metadata ?? {};
              const isPlanChange = meta?.pending_change === true && meta?.plan;

              if (isPlanChange) {
                await supabaseAdmin.rpc("change_plan_after_payment" as any, {
                  _user_id: userId,
                  _new_plan: meta.plan,
                  _period_days: 30,
                });

                // Só agora cancelamos a assinatura antiga no gateway.
                const prevProvider = meta.previous_provider as PaymentGateway | null;
                const prevExternal = meta.previous_external_id as string | null;
                if (prevProvider && prevExternal) {
                  try {
                    await getProvider(prevProvider).cancelSubscription(prevExternal);
                  } catch (err: any) {
                    await logGatewayError({
                      userId,
                      gateway: prevProvider,
                      operation: "changePlan.cancelPrevious",
                      externalId: prevExternal,
                      message: err?.message ?? String(err),
                    });
                  }
                }
              } else {
                await supabaseAdmin.rpc("apply_payment_confirmed" as any, {
                  _user_id: userId,
                  _plan: null,
                  _period_days: 30,
                });
              }

              await supabaseAdmin.from("billing_history" as any).insert({
                user_id: userId,
                amount_cents: event.amountCents ?? 0,
                currency: event.currency ?? "BRL",
                status: "confirmed",
                gateway,
                external_id: event.externalEventId,
                paid_at: event.paidAt ?? new Date().toISOString(),
                receipt_url: event.receiptUrl ?? null,
                metadata: { event_type: event.type, plan_change: isPlanChange || false },
              });
            } else if (event.type === "payment_failed" || event.type === "charge_overdue") {
              await supabaseAdmin.rpc("apply_payment_failed" as any, { _user_id: userId });
              await supabaseAdmin.from("billing_history" as any).insert({
                user_id: userId,
                amount_cents: event.amountCents ?? 0,
                currency: event.currency ?? "BRL",
                status: "failed",
                gateway,
                external_id: event.externalEventId,
                metadata: { event_type: event.type },
              });
              await logGatewayError({
                userId,
                gateway,
                operation: "webhook.payment_failed",
                externalId: event.externalEventId,
                message: `Pagamento não aprovado (${event.type})`,
                payload: event.raw,
              });
            } else if (event.type === "subscription_cancelled") {
              await supabaseAdmin.rpc("cancel_user_subscription" as any, { _user_id: userId });
            }
          }

          await supabaseAdmin
            .from("webhook_events" as any)
            .update({ processed_at: new Date().toISOString() })
            .eq("gateway", gateway)
            .eq("external_event_id", event.externalEventId);
        } catch (err: any) {
          await supabaseAdmin
            .from("webhook_events" as any)
            .update({ error: String(err?.message ?? err) })
            .eq("gateway", gateway)
            .eq("external_event_id", event.externalEventId);
          await logGatewayError({
            gateway,
            operation: "webhook.processing",
            externalId: event.externalEventId,
            message: err?.message ?? String(err),
            payload: event.raw,
          });
          return new Response("Processing error", { status: 500 });
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});

async function resolveUserByExternalSub(externalId: string | null | undefined) {
  if (!externalId) return null;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("subscriptions" as any)
    .select("user_id")
    .eq("provider_subscription_id", externalId)
    .maybeSingle();
  return (data as any)?.user_id ?? null;
}
