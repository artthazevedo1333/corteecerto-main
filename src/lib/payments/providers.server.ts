// Implementações concretas dos provedores. Server-only.
// Nenhuma está conectada ainda — cada método lança "not_configured"
// até que as credenciais/endpoints reais sejam plugados.

import type {
  CheckoutRequest,
  CheckoutResponse,
  PaymentGateway,
  PaymentProvider,
  WebhookEvent,
} from "./types";

function notConfigured(gateway: PaymentGateway, op: string): never {
  throw new Error(
    `[payments:${gateway}] operação "${op}" ainda não configurada. Conecte o gateway para habilitar.`,
  );
}

class AsaasProvider implements PaymentProvider {
  id: PaymentGateway = "asaas";
  async createCheckout(_req: CheckoutRequest): Promise<CheckoutResponse> {
    notConfigured(this.id, "createCheckout");
  }
  async cancelSubscription(_externalId: string): Promise<void> {
    notConfigured(this.id, "cancelSubscription");
  }
  async renewSubscription(_externalId: string): Promise<void> {
    notConfigured(this.id, "renewSubscription");
  }
  async parseWebhook(_h: Headers, rawBody: string): Promise<WebhookEvent> {
    const raw = safeJson(rawBody);
    const evt = (raw as any)?.event as string | undefined;
    const map: Record<string, WebhookEvent["type"]> = {
      PAYMENT_CONFIRMED: "payment_confirmed",
      PAYMENT_RECEIVED: "payment_confirmed",
      PAYMENT_OVERDUE: "charge_overdue",
      PAYMENT_REFUNDED: "payment_failed",
      PAYMENT_DELETED: "payment_failed",
      SUBSCRIPTION_DELETED: "subscription_cancelled",
    };
    return {
      type: (evt && map[evt]) || "unknown",
      externalEventId: (raw as any)?.id ?? null,
      externalSubscriptionId: (raw as any)?.payment?.subscription ?? null,
      raw,
    };
  }
  async verifySignature(headers: Headers): Promise<boolean> {
    const expected = process.env.ASAAS_WEBHOOK_TOKEN;
    const received = headers.get("asaas-access-token");
    if (!expected || !received) return false;
    const { timingSafeEqual } = await import("crypto");
    const a = Buffer.from(expected);
    const b = Buffer.from(received);
    if (a.length !== b.length) return false;
    try {
      return timingSafeEqual(a, b);
    } catch {
      return false;
    }
  }
}

const MP_API = "https://api.mercadopago.com";

function mpToken(): string {
  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "MERCADO_PAGO_ACCESS_TOKEN não configurado. Configure a variável de ambiente no servidor.",
    );
  }
  return token;
}

class MercadoPagoProvider implements PaymentProvider {
  id: PaymentGateway = "mercadopago";

  async createCheckout(req: CheckoutRequest): Promise<CheckoutResponse> {
    const token = mpToken();
    const amount = Number((req.amountCents / 100).toFixed(2));
    const body = {
      reason: `Corte Certo — Plano ${req.plan}`,
      external_reference: req.userId,
      payer_email: req.email,
      back_url: req.successUrl,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: amount,
        currency_id: req.currency || "BRL",
      },
      status: "pending",
    };

    const res = await fetch(`${MP_API}/preapproval`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = (json as any)?.message ?? `HTTP ${res.status}`;
      throw new Error(`[mercadopago] createCheckout falhou: ${msg}`);
    }

    const initPoint = (json as any)?.init_point ?? (json as any)?.sandbox_init_point;
    const id = (json as any)?.id;
    if (!initPoint || !id) {
      throw new Error("[mercadopago] resposta inesperada (sem init_point/id)");
    }

    return { checkoutUrl: initPoint, externalId: String(id), gateway: this.id };
  }

  async cancelSubscription(externalId: string): Promise<void> {
    const token = mpToken();
    const res = await fetch(`${MP_API}/preapproval/${externalId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "cancelled" }),
    });
    if (!res.ok) {
      throw new Error(`[mercadopago] cancelSubscription HTTP ${res.status}`);
    }
  }

  async renewSubscription(_externalId: string): Promise<void> {
    // Renovação é automática no Mercado Pago (Preapproval).
  }

  async parseWebhook(headers: Headers, rawBody: string): Promise<WebhookEvent> {
    const url = new URL("http://x/?" + (headers.get("x-original-query") ?? ""));
    const raw = safeJson(rawBody) as any;
    const topic =
      raw?.type ?? raw?.topic ?? url.searchParams.get("type") ?? url.searchParams.get("topic");
    const dataId = raw?.data?.id ?? url.searchParams.get("id") ?? url.searchParams.get("data.id");
    const action = raw?.action as string | undefined;

    let type: WebhookEvent["type"] = "unknown";
    let externalSubscriptionId: string | null = dataId ? String(dataId) : null;
    let amountCents: number | undefined;
    let paidAt: string | undefined;

    try {
      const token = mpToken();
      if (topic === "payment" && dataId) {
        const r = await fetch(`${MP_API}/v1/payments/${dataId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (r.ok) {
          const p: any = await r.json();
          externalSubscriptionId = p.metadata?.preapproval_id ?? externalSubscriptionId;
          amountCents = Math.round(Number(p.transaction_amount ?? 0) * 100);
          paidAt = p.date_approved ?? undefined;
          if (p.status === "approved") type = "payment_confirmed";
          else if (p.status === "rejected" || p.status === "cancelled") type = "payment_failed";
        }
      } else if ((topic === "preapproval" || topic === "subscription_preapproval") && dataId) {
        const r = await fetch(`${MP_API}/preapproval/${dataId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (r.ok) {
          const s: any = await r.json();
          if (s.status === "authorized") type = "payment_confirmed";
          else if (s.status === "cancelled") type = "subscription_cancelled";
          else if (s.status === "paused") type = "charge_overdue";
        }
      }
    } catch (err) {
      console.warn("[mercadopago] parseWebhook lookup error", err);
    }

    if (type === "unknown" && action === "subscription.cancelled") {
      type = "subscription_cancelled";
    }

    return {
      type,
      externalEventId: raw?.id ? String(raw.id) : dataId ? String(dataId) : null,
      externalSubscriptionId,
      amountCents,
      currency: "BRL",
      paidAt,
      raw,
    };
  }

  async verifySignature(headers: Headers): Promise<boolean> {
    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
    if (!secret) {
      // Fail-closed em produção: sem secret não há como validar.
      console.error("[mercadopago] MERCADO_PAGO_WEBHOOK_SECRET ausente — rejeitando webhook.");
      return false;
    }
    const sigHeader = headers.get("x-signature");
    const requestId = headers.get("x-request-id") ?? "";
    if (!sigHeader) return false;

    const parts = Object.fromEntries(
      sigHeader.split(",").map((kv) => {
        const [k, v] = kv.split("=");
        return [k.trim(), (v ?? "").trim()];
      }),
    );
    const ts = parts.ts;
    const v1 = parts.v1;
    if (!ts || !v1) return false;

    const dataId =
      headers.get("x-data-id") ??
      new URL("http://x/?" + (headers.get("x-original-query") ?? "")).searchParams.get("data.id") ??
      "";
    const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;

    const { createHmac, timingSafeEqual } = await import("crypto");
    const expected = createHmac("sha256", secret).update(manifest).digest("hex");
    try {
      return timingSafeEqual(Buffer.from(expected), Buffer.from(v1));
    } catch {
      return false;
    }
  }
}

/**
 * StripeProvider — DESATIVADO.
 * Mercado Pago é o gateway oficial. Este provider permanece stubado para
 * futura reativação: todas as operações lançam "stripe_disabled" e a
 * verificação de assinatura sempre retorna false (fail-closed).
 */
class StripeProvider implements PaymentProvider {
  id: PaymentGateway = "stripe";
  private disabled(): never {
    throw new Error("[stripe] provider desativado. Use Mercado Pago.");
  }
  async createCheckout(_req: CheckoutRequest): Promise<CheckoutResponse> {
    this.disabled();
  }
  async cancelSubscription(_externalId: string): Promise<void> {
    this.disabled();
  }
  async renewSubscription(_externalId: string): Promise<void> {
    this.disabled();
  }
  async parseWebhook(_h: Headers, _rawBody: string): Promise<WebhookEvent> {
    return { type: "unknown", externalEventId: null, externalSubscriptionId: null, raw: {} };
  }
  async verifySignature(_headers: Headers): Promise<boolean> {
    // Fail-closed: enquanto Stripe estiver desligado, todo webhook é rejeitado.
    return false;
  }
}

function safeJson(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}

const REGISTRY: Record<PaymentGateway, PaymentProvider> = {
  asaas: new AsaasProvider(),
  mercadopago: new MercadoPagoProvider(),
  stripe: new StripeProvider(),
};

export function getProvider(gateway: PaymentGateway): PaymentProvider {
  return REGISTRY[gateway];
}

/** Gateway ativo — controlado por env var, default asaas. */
/** Gateway ativo — controlado por env var, default mercadopago. */
export function activeGateway(): PaymentGateway {
  const g = (process.env.PAYMENT_GATEWAY ?? "mercadopago") as PaymentGateway;
  return REGISTRY[g] ? g : "mercadopago";
}
