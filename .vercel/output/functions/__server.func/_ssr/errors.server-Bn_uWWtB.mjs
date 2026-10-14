async function logGatewayError(input) {
  try {
    const { supabaseAdmin } = await import("./client.server-DMSl3WSm.mjs");
    await supabaseAdmin.from("payment_gateway_errors").insert({
      user_id: input.userId ?? null,
      gateway: input.gateway,
      operation: input.operation,
      message: input.message?.slice(0, 4e3) ?? "",
      external_id: input.externalId ?? null,
      http_status: input.httpStatus ?? null,
      payload: input.payload ?? null
    });
  } catch (err) {
  }
}
export {
  logGatewayError
};
