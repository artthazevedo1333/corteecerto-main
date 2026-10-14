import type { SubscriptionPlan } from "@/lib/subscription";

export type PaymentGateway = "asaas" | "mercadopago" | "stripe";

export interface CheckoutRequest {
  userId: string;
  email: string;
  plan: SubscriptionPlan;
  amountCents: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CheckoutResponse {
  checkoutUrl: string;
  externalId: string;
  gateway: PaymentGateway;
}

export interface WebhookEvent {
  type:
    | "payment_confirmed"
    | "payment_failed"
    | "subscription_cancelled"
    | "subscription_renewed"
    | "charge_overdue"
    | "unknown";
  externalEventId: string | null;
  userId?: string | null;
  externalSubscriptionId?: string | null;
  amountCents?: number;
  currency?: string;
  paidAt?: string;
  receiptUrl?: string;
  raw: unknown;
}

/**
 * Camada de abstração para gateways de pagamento.
 * Cada gateway (Asaas, Mercado Pago, Stripe) implementa esta interface.
 */
export interface PaymentProvider {
  id: PaymentGateway;
  createCheckout(req: CheckoutRequest): Promise<CheckoutResponse>;
  cancelSubscription(externalSubscriptionId: string): Promise<void>;
  renewSubscription(externalSubscriptionId: string): Promise<void>;
  parseWebhook(headers: Headers, rawBody: string): Promise<WebhookEvent>;
  verifySignature(headers: Headers, rawBody: string): Promise<boolean>;
}
