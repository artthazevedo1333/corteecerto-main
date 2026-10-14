import { c as createServerRpc } from "./createServerRpc-TpF5Q0la.mjs";
import { a as createServerFn } from "./server-BAnYV7rD.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-7bes90Rp.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { _ as _enum, o as object } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const PlanSchema = _enum(["starter", "professional", "premium", "lifetime"]);
const createCheckout_createServerFn_handler = createServerRpc({
  id: "701cdd546651dbcebcbf238416dc92fe2affb2901bb03d7ad5b1e96d577d1e59",
  name: "createCheckout",
  filename: "src/lib/payments/subscription.functions.ts"
}, (opts) => createCheckout.__executeServer(opts));
const createCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  plan: PlanSchema
}).parse(input)).handler(createCheckout_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    getProvider,
    activeGateway
  } = await import("./providers.server-CK_iqY3Q.mjs");
  const {
    logGatewayError
  } = await import("./errors.server-Bn_uWWtB.mjs");
  const {
    PLANS
  } = await import("./plans-DuyqPZD-.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  const plan = PLANS.find((p) => p.id === data.plan);
  const gateway = activeGateway();
  const provider = getProvider(gateway);
  const email = context.claims?.email ?? "";
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
      metadata: {
        user_id: context.userId,
        plan: data.plan
      }
    });
    await supabaseAdmin.from("billing_history").insert({
      user_id: context.userId,
      amount_cents: plan.priceCents,
      currency: plan.currency,
      status: "pending",
      gateway,
      external_id: res.externalId,
      metadata: {
        plan: data.plan
      }
    });
    return {
      checkoutUrl: res.checkoutUrl,
      gateway
    };
  } catch (err) {
    await logGatewayError({
      userId: context.userId,
      gateway,
      operation: "createCheckout",
      message: err?.message ?? String(err)
    });
    return {
      checkoutUrl: null,
      gateway,
      notConfigured: true,
      message: err?.message ?? "Gateway não configurado"
    };
  }
});
const changePlan_createServerFn_handler = createServerRpc({
  id: "2c585082d08e638aa6c76c9f8589925f9b40dec60b688c25295500cf55b028ba",
  name: "changePlan",
  filename: "src/lib/payments/subscription.functions.ts"
}, (opts) => changePlan.__executeServer(opts));
const changePlan = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  plan: PlanSchema
}).parse(input)).handler(changePlan_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    getProvider,
    activeGateway
  } = await import("./providers.server-CK_iqY3Q.mjs");
  const {
    logGatewayError
  } = await import("./errors.server-Bn_uWWtB.mjs");
  const {
    PLANS
  } = await import("./plans-DuyqPZD-.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  const {
    data: current
  } = await supabaseAdmin.from("subscriptions").select("plan, provider_subscription_id, payment_provider").eq("user_id", context.userId).maybeSingle();
  const currentPlan = current?.plan;
  if (currentPlan === data.plan) {
    return {
      checkoutUrl: null,
      sameplan: true
    };
  }
  const plan = PLANS.find((p) => p.id === data.plan);
  const gateway = activeGateway();
  const provider = getProvider(gateway);
  const email = context.claims?.email ?? "";
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
      metadata: {
        user_id: context.userId,
        plan: data.plan,
        change: "1"
      }
    });
    await supabaseAdmin.from("billing_history").insert({
      user_id: context.userId,
      amount_cents: plan.priceCents,
      currency: plan.currency,
      status: "pending",
      gateway,
      external_id: res.externalId,
      metadata: {
        plan: data.plan,
        change_from: currentPlan,
        previous_provider: current?.payment_provider ?? null,
        previous_external_id: current?.provider_subscription_id ?? null,
        pending_change: true
      }
    });
    return {
      checkoutUrl: res.checkoutUrl,
      gateway
    };
  } catch (err) {
    await logGatewayError({
      userId: context.userId,
      gateway,
      operation: "changePlan.createCheckout",
      message: err?.message ?? String(err)
    });
    return {
      checkoutUrl: null,
      notConfigured: true,
      message: err?.message
    };
  }
});
const cancelSubscription_createServerFn_handler = createServerRpc({
  id: "62102adf664ef6321bc26b867cf93aee1aa346d54d6e285c8c9d3d2b67a56121",
  name: "cancelSubscription",
  filename: "src/lib/payments/subscription.functions.ts"
}, (opts) => cancelSubscription.__executeServer(opts));
const cancelSubscription = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(cancelSubscription_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  const {
    getProvider
  } = await import("./providers.server-CK_iqY3Q.mjs");
  const {
    logGatewayError
  } = await import("./errors.server-Bn_uWWtB.mjs");
  const {
    data: sub
  } = await supabaseAdmin.from("subscriptions").select("provider_subscription_id, payment_provider").eq("user_id", context.userId).maybeSingle();
  const providerId = sub?.payment_provider;
  const externalId = sub?.provider_subscription_id;
  if (providerId && externalId) {
    try {
      await getProvider(providerId).cancelSubscription(externalId);
    } catch (err) {
      await logGatewayError({
        userId: context.userId,
        gateway: providerId,
        operation: "cancelSubscription",
        externalId,
        message: err?.message ?? String(err)
      });
    }
  }
  await supabaseAdmin.rpc("cancel_user_subscription", {
    _user_id: context.userId
  });
  return {
    ok: true
  };
});
const renewSubscription_createServerFn_handler = createServerRpc({
  id: "0b6c99cc07feaca2d85f477a6610a76a1ca9981b34aa73c75fe1e559bfa7b303",
  name: "renewSubscription",
  filename: "src/lib/payments/subscription.functions.ts"
}, (opts) => renewSubscription.__executeServer(opts));
const renewSubscription = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(renewSubscription_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  const {
    getProvider
  } = await import("./providers.server-CK_iqY3Q.mjs");
  const {
    logGatewayError
  } = await import("./errors.server-Bn_uWWtB.mjs");
  const {
    data: sub
  } = await supabaseAdmin.from("subscriptions").select("provider_subscription_id, payment_provider").eq("user_id", context.userId).maybeSingle();
  const providerId = sub?.payment_provider;
  const externalId = sub?.provider_subscription_id;
  if (!providerId || !externalId) {
    return {
      ok: false,
      notConfigured: true
    };
  }
  try {
    await getProvider(providerId).renewSubscription(externalId);
    return {
      ok: true
    };
  } catch (err) {
    await logGatewayError({
      userId: context.userId,
      gateway: providerId,
      operation: "renewSubscription",
      externalId,
      message: err?.message ?? String(err)
    });
    return {
      ok: false,
      notConfigured: true,
      message: err?.message
    };
  }
});
const getBillingHistory_createServerFn_handler = createServerRpc({
  id: "70b7b84ecb01a17c7a45c0061cc659d452eee4d5b0233ce8c4a80d973d541dfb",
  name: "getBillingHistory",
  filename: "src/lib/payments/subscription.functions.ts"
}, (opts) => getBillingHistory.__executeServer(opts));
const getBillingHistory = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getBillingHistory_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("billing_history").select("*").eq("user_id", context.userId).order("created_at", {
    ascending: false
  }).limit(50);
  if (error) throw error;
  return data ?? [];
});
export {
  cancelSubscription_createServerFn_handler,
  changePlan_createServerFn_handler,
  createCheckout_createServerFn_handler,
  getBillingHistory_createServerFn_handler,
  renewSubscription_createServerFn_handler
};
