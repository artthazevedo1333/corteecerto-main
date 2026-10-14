import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const PlanSchema = z.enum(["starter", "professional", "premium", "lifetime"]);

/** create_checkout: gera URL de checkout do gateway ativo para o plano solicitado. */
export const createCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ plan: PlanSchema }).parse(input))
  .handler(async ({ data, context }) => {
    const { getProvider, activeGateway } = await import("./providers.server");
    const { logGatewayError } = await import("./errors.server");
    const { PLANS } = await import("./plans");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const plan = PLANS.find((p) => p.id === data.plan)!;
    const gateway = activeGateway();
    const provider = getProvider(gateway);

    const email = (context.claims as any)?.email ?? "";
    const origin = process.env.APP_URL ?? "";

    try {
      const res = await provider.createCheckout({
        userId: context.userId,
        email,
        plan: data.plan,
        amountCents: plan.priceCents,
        currency: plan.currency,
        successUrl: `${origin}/subscription?status=success`,
        cancelUrl: `${origin}/subscription?status=cancelled`,
        metadata: { user_id: context.userId, plan: data.plan },
      });

      await supabaseAdmin.from("billing_history" as any).insert({
        user_id: context.userId,
        amount_cents: plan.priceCents,
        currency: plan.currency,
        status: "pending",
        gateway,
        external_id: res.externalId,
        metadata: { plan: data.plan },
      });

      return { checkoutUrl: res.checkoutUrl, gateway };
    } catch (err: any) {
      await logGatewayError({
        userId: context.userId,
        gateway,
        operation: "createCheckout",
        message: err?.message ?? String(err),
      });
      return {
        checkoutUrl: null,
        gateway,
        notConfigured: true,
        message: err?.message ?? "Gateway não configurado",
      };
    }
  });

/**
 * change_plan: cria checkout do novo plano SEM cancelar a assinatura atual.
 * A troca só é efetivada quando o webhook do gateway confirma o pagamento
 * (ver src/routes/api/public/webhooks.payments.ts → change_plan_after_payment).
 */
export const changePlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ plan: PlanSchema }).parse(input))
  .handler(async ({ data, context }) => {
    const { getProvider, activeGateway } = await import("./providers.server");
    const { logGatewayError } = await import("./errors.server");
    const { PLANS } = await import("./plans");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: current } = await supabaseAdmin
      .from("subscriptions" as any)
      .select("plan, provider_subscription_id, payment_provider")
      .eq("user_id", context.userId)
      .maybeSingle();

    const currentPlan = (current as any)?.plan;
    if (currentPlan === data.plan) {
      return { checkoutUrl: null, sameplan: true };
    }

    const plan = PLANS.find((p) => p.id === data.plan)!;
    const gateway = activeGateway();
    const provider = getProvider(gateway);
    const email = (context.claims as any)?.email ?? "";
    const origin = process.env.APP_URL ?? "";

    try {
      const res = await provider.createCheckout({
        userId: context.userId,
        email,
        plan: data.plan,
        amountCents: plan.priceCents,
        currency: plan.currency,
        successUrl: `${origin}/dashboard/subscription?status=success`,
        cancelUrl: `${origin}/dashboard/subscription?status=cancelled`,
        metadata: { user_id: context.userId, plan: data.plan, change: "1" },
      });

      await supabaseAdmin.from("billing_history" as any).insert({
        user_id: context.userId,
        amount_cents: plan.priceCents,
        currency: plan.currency,
        status: "pending",
        gateway,
        external_id: res.externalId,
        metadata: {
          plan: data.plan,
          change_from: currentPlan,
          previous_provider: (current as any)?.payment_provider ?? null,
          previous_external_id: (current as any)?.provider_subscription_id ?? null,
          pending_change: true,
        },
      });

      return { checkoutUrl: res.checkoutUrl, gateway };
    } catch (err: any) {
      await logGatewayError({
        userId: context.userId,
        gateway,
        operation: "changePlan.createCheckout",
        message: err?.message ?? String(err),
      });
      return { checkoutUrl: null, notConfigured: true, message: err?.message };
    }
  });

/** cancel_subscription: usuário cancela a própria assinatura. */
export const cancelSubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { getProvider } = await import("./providers.server");
    const { logGatewayError } = await import("./errors.server");

    const { data: sub } = await supabaseAdmin
      .from("subscriptions" as any)
      .select("provider_subscription_id, payment_provider")
      .eq("user_id", context.userId)
      .maybeSingle();

    const providerId = (sub as any)?.payment_provider;
    const externalId = (sub as any)?.provider_subscription_id;

    if (providerId && externalId) {
      try {
        await getProvider(providerId).cancelSubscription(externalId);
      } catch (err: any) {
        await logGatewayError({
          userId: context.userId,
          gateway: providerId,
          operation: "cancelSubscription",
          externalId,
          message: err?.message ?? String(err),
        });
      }
    }

    await supabaseAdmin.rpc("cancel_user_subscription" as any, { _user_id: context.userId });
    return { ok: true };
  });

/** renew_subscription: dispara nova cobrança para renovar. */
export const renewSubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { getProvider } = await import("./providers.server");
    const { logGatewayError } = await import("./errors.server");

    const { data: sub } = await supabaseAdmin
      .from("subscriptions" as any)
      .select("provider_subscription_id, payment_provider")
      .eq("user_id", context.userId)
      .maybeSingle();

    const providerId = (sub as any)?.payment_provider;
    const externalId = (sub as any)?.provider_subscription_id;

    if (!providerId || !externalId) {
      return { ok: false, notConfigured: true };
    }

    try {
      await getProvider(providerId).renewSubscription(externalId);
      return { ok: true };
    } catch (err: any) {
      await logGatewayError({
        userId: context.userId,
        gateway: providerId,
        operation: "renewSubscription",
        externalId,
        message: err?.message ?? String(err),
      });
      return { ok: false, notConfigured: true, message: err?.message };
    }
  });

/** Histórico de pagamentos do usuário. */
export const getBillingHistory = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("billing_history" as any)
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    return data ?? [];
  });
