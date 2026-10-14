// Registro centralizado de erros de gateway.
// Escreve na tabela public.payment_gateway_errors via service role.
// Nunca lança — logging não pode quebrar o fluxo principal.

export type GatewayErrorInput = {
  userId?: string | null;
  gateway: string;
  operation: string;
  message: string;
  externalId?: string | null;
  httpStatus?: number | null;
  payload?: unknown;
};

export async function logGatewayError(input: GatewayErrorInput): Promise<void> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("payment_gateway_errors" as any).insert({
      user_id: input.userId ?? null,
      gateway: input.gateway,
      operation: input.operation,
      message: input.message?.slice(0, 4000) ?? "",
      external_id: input.externalId ?? null,
      http_status: input.httpStatus ?? null,
      payload: input.payload ?? null,
    });
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("[payment_gateway_errors] insert failed", err);
    }
  }
}
