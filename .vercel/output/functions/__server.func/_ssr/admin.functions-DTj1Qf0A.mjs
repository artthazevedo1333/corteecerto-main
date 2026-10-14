import { c as createServerRpc } from "./createServerRpc-TpF5Q0la.mjs";
import { a as createServerFn } from "./server-BAnYV7rD.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-7bes90Rp.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { _ as _enum, o as object, b as boolean, n as number, s as string } from "../_libs/zod.mjs";
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
const StatusSchema = _enum(["trial", "active", "overdue", "suspended", "cancelled"]);
const RoleSchema = _enum(["owner", "admin", "support", "user"]);
const AdminActionSchema = _enum(["change_plan", "activate", "suspend", "cancel", "reactivate", "grant_days", "grant_months", "lifetime", "end_trial", "restart_trial"]);
const LicenseSchema = object({
  code: string().trim().min(3).max(40).transform((value) => value.toUpperCase()),
  plan: PlanSchema,
  maxUses: number().int().positive().nullable().optional(),
  expiresAt: string().nullable().optional(),
  monthsGranted: number().int().min(0).max(120).default(1),
  lifetime: boolean().default(false)
});
async function assertAdmin(context) {
  const roles = ["owner", "admin"];
  for (const role of roles) {
    const {
      data,
      error
    } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: role
    });
    if (!error && data === true) return;
  }
  throw new Response("Not found", {
    status: 404
  });
}
async function assertOwner(context) {
  const {
    data,
    error
  } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "owner"
  });
  if (error || data !== true) {
    throw new Response("Forbidden", {
      status: 403
    });
  }
}
function centsToMoney(cents) {
  return Math.max(0, cents || 0) / 100;
}
function startOfMonth() {
  const date = /* @__PURE__ */ new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}
function addDays(base, days) {
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  return date;
}
async function logAdminAction(adminUserId, action, details, targetUserId) {
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  await supabaseAdmin.from("admin_audit_logs").insert({
    admin_user_id: adminUserId,
    target_user_id: targetUserId ?? null,
    action,
    details
  });
}
const getAdminOverview_createServerFn_handler = createServerRpc({
  id: "98193c088815d6bbdd4155ffbad4b125116e51df7ef81d3d6aef43156e028e01",
  name: "getAdminOverview",
  filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminOverview.__executeServer(opts));
const getAdminOverview = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getAdminOverview_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  const monthStart = startOfMonth();
  const monthStartIso = monthStart.toISOString();
  const [profilesRes, subscriptionsRes, billingRes, licensesRes, redemptionsRes, rolesRes] = await Promise.all([supabaseAdmin.from("profiles").select("id, full_name, barber_shop_name, avatar_url, business_phone, created_at"), supabaseAdmin.from("subscriptions").select("id, user_id, plan, status, trial_ends_at, current_period_start, current_period_end, grace_period_until, payment_provider, provider_customer_id, provider_subscription_id, created_at, updated_at"), supabaseAdmin.from("billing_history").select("id, user_id, amount_cents, currency, status, gateway, external_id, paid_at, receipt_url, created_at").order("created_at", {
    ascending: false
  }).limit(500), supabaseAdmin.from("promotional_licenses").select("id, code, plan, max_uses, expires_at, months_granted, lifetime, active, created_at, updated_at").order("created_at", {
    ascending: false
  }), supabaseAdmin.from("promotional_license_redemptions").select("id, license_id, user_id, redeemed_at"), supabaseAdmin.from("user_roles").select("user_id, role")]);
  if (profilesRes.error) throw profilesRes.error;
  if (subscriptionsRes.error) throw subscriptionsRes.error;
  if (billingRes.error) throw billingRes.error;
  if (licensesRes.error) throw licensesRes.error;
  if (redemptionsRes.error) throw redemptionsRes.error;
  if (rolesRes.error) throw rolesRes.error;
  const profiles = profilesRes.data ?? [];
  const subscriptions = subscriptionsRes.data ?? [];
  const billing = billingRes.data ?? [];
  const redemptions = redemptionsRes.data ?? [];
  const roleRows = rolesRes.data ?? [];
  const rolesByUser = roleRows.reduce((acc, row) => {
    const list = acc.get(row.user_id) ?? [];
    list.push(row.role);
    acc.set(row.user_id, list);
    return acc;
  }, /* @__PURE__ */ new Map());
  const usersRes = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1e3
  });
  if (usersRes.error) throw usersRes.error;
  const authUsers = usersRes.data.users ?? [];
  const authById = new Map(authUsers.map((user) => [user.id, user]));
  const profilesById = new Map(profiles.map((profile) => [profile.id, profile]));
  const subscriptionByUser = new Map(subscriptions.map((subscription) => [subscription.user_id, subscription]));
  const userIds = Array.from(/* @__PURE__ */ new Set([...authUsers.map((user) => user.id), ...profiles.map((profile) => profile.id), ...subscriptions.map((subscription) => subscription.user_id)]));
  const billingByUser = billing.reduce((acc, row) => {
    const list = acc.get(row.user_id) ?? [];
    list.push(row);
    acc.set(row.user_id, list);
    return acc;
  }, /* @__PURE__ */ new Map());
  const customers = userIds.map((userId) => {
    const profile = profilesById.get(userId) ?? {};
    const subscription = subscriptionByUser.get(userId) ?? null;
    const userBilling = billingByUser.get(userId) ?? [];
    const confirmedPayments = userBilling.filter((row) => row.status === "confirmed");
    const paidTotalCents = confirmedPayments.reduce((sum, row) => sum + (row.amount_cents ?? 0), 0);
    const authUser = authById.get(userId);
    return {
      id: userId,
      email: authUser?.email ?? null,
      fullName: profile.full_name ?? authUser?.user_metadata?.full_name ?? "Cliente",
      shopName: profile.barber_shop_name ?? null,
      phone: profile.business_phone ?? null,
      createdAt: authUser?.created_at ?? profile.created_at ?? subscription?.created_at ?? null,
      subscription,
      billing: userBilling.slice(0, 8),
      paidTotal: centsToMoney(paidTotalCents),
      paymentCount: confirmedPayments.length,
      roles: rolesByUser.get(userId) ?? []
    };
  });
  const active = subscriptions.filter((row) => row.status === "active");
  const trials = subscriptions.filter((row) => row.status === "trial");
  const overdue = subscriptions.filter((row) => row.status === "overdue");
  const suspended = subscriptions.filter((row) => row.status === "suspended");
  const cancelled = subscriptions.filter((row) => row.status === "cancelled");
  const monthPayments = billing.filter((row) => row.status === "confirmed" && new Date(row.paid_at ?? row.created_at) >= monthStart);
  const monthlyRevenue = centsToMoney(monthPayments.reduce((sum, row) => sum + (row.amount_cents ?? 0), 0));
  const newCustomersThisMonth = customers.filter((customer) => customer.createdAt && new Date(customer.createdAt) >= monthStart).length;
  const cancellationsThisMonth = subscriptions.filter((row) => row.status === "cancelled" && row.updated_at && new Date(row.updated_at) >= monthStart).length;
  const revenueByMonth = billing.filter((row) => row.status === "confirmed").reduce((acc, row) => {
    const key = new Date(row.paid_at ?? row.created_at).toISOString().slice(0, 7);
    acc[key] = (acc[key] ?? 0) + centsToMoney(row.amount_cents ?? 0);
    return acc;
  }, {});
  const planCounts = subscriptions.reduce((acc, row) => {
    acc[row.plan] = (acc[row.plan] ?? 0) + 1;
    return acc;
  }, {});
  const paidUserIds = new Set(billing.filter((row) => row.status === "confirmed").map((row) => row.user_id));
  const trialUsers = new Set(subscriptions.filter((row) => row.trial_ends_at).map((row) => row.user_id));
  const conversionRate = trialUsers.size ? Math.round(paidUserIds.size / trialUsers.size * 100) : 0;
  const lifetimeCount = subscriptions.filter((row) => row.plan === "lifetime").length;
  const averageStayDays = Math.round(subscriptions.reduce((sum, row) => {
    const from = new Date(row.created_at).getTime();
    const until = row.status === "cancelled" && row.updated_at ? new Date(row.updated_at).getTime() : Date.now();
    return sum + Math.max(0, until - from) / 864e5;
  }, 0) / Math.max(1, subscriptions.length));
  const redemptionCountByLicense = redemptions.reduce((acc, row) => {
    acc[row.license_id] = (acc[row.license_id] ?? 0) + 1;
    return acc;
  }, {});
  const licenses = (licensesRes.data ?? []).map((license) => ({
    ...license,
    uses: redemptionCountByLicense[license.id] ?? 0
  }));
  return {
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    stats: {
      totalCustomers: customers.length,
      activeSubscriptions: active.length,
      activeTrials: trials.length,
      overdueCustomers: overdue.length,
      suspendedCustomers: suspended.length,
      cancelledCustomers: cancelled.length,
      mrr: monthlyRevenue,
      arr: monthlyRevenue * 12,
      newCustomersThisMonth,
      cancellationsThisMonth
    },
    metrics: {
      planCounts,
      conversionRate,
      monthlyRevenue,
      annualRevenue: monthlyRevenue * 12,
      cancellations: cancelled.length,
      averageStayDays,
      lifetimeCount,
      revenueByMonth
    },
    customers,
    licenses,
    monthStart: monthStartIso
  };
});
const updateAdminSubscription_createServerFn_handler = createServerRpc({
  id: "04762d776f3547b65e7fee19e62d0fdeed7cfd04c03cf35abab65b45a67edcc1",
  name: "updateAdminSubscription",
  filename: "src/lib/admin.functions.ts"
}, (opts) => updateAdminSubscription.__executeServer(opts));
const updateAdminSubscription = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  targetUserId: string().uuid(),
  action: AdminActionSchema,
  plan: PlanSchema.optional(),
  status: StatusSchema.optional(),
  amount: number().int().min(1).max(3650).optional()
}).parse(input)).handler(updateAdminSubscription_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  const now = /* @__PURE__ */ new Date();
  const {
    data: existing,
    error: existingError
  } = await supabaseAdmin.from("subscriptions").select("*").eq("user_id", data.targetUserId).maybeSingle();
  if (existingError) throw existingError;
  const currentSubscription = existing;
  const periodBase = currentSubscription?.current_period_end && new Date(currentSubscription.current_period_end) > now ? new Date(currentSubscription.current_period_end) : now;
  const patch = {
    updated_at: now.toISOString()
  };
  switch (data.action) {
    case "change_plan":
      if (!data.plan) throw new Error("Plano obrigatório");
      patch.plan = data.plan;
      break;
    case "activate":
      patch.status = data.status ?? "active";
      patch.plan = data.plan ?? currentSubscription?.plan ?? "starter";
      patch.current_period_start = now.toISOString();
      patch.current_period_end = data.plan === "lifetime" ? null : addDays(now, 30).toISOString();
      patch.trial_ends_at = null;
      patch.grace_period_until = null;
      break;
    case "suspend":
      patch.status = "suspended";
      patch.grace_period_until = null;
      break;
    case "cancel":
      patch.status = "cancelled";
      patch.grace_period_until = null;
      break;
    case "reactivate":
      patch.status = "active";
      patch.current_period_start = now.toISOString();
      patch.current_period_end = currentSubscription?.plan === "lifetime" ? null : addDays(now, 30).toISOString();
      patch.trial_ends_at = null;
      patch.grace_period_until = null;
      break;
    case "grant_days":
      patch.status = "active";
      patch.current_period_end = addDays(periodBase, data.amount ?? 7).toISOString();
      patch.grace_period_until = null;
      break;
    case "grant_months":
      patch.status = "active";
      patch.current_period_end = addDays(periodBase, (data.amount ?? 1) * 30).toISOString();
      patch.grace_period_until = null;
      break;
    case "lifetime":
      patch.status = "active";
      patch.plan = "lifetime";
      patch.current_period_start = now.toISOString();
      patch.current_period_end = null;
      patch.trial_ends_at = null;
      patch.grace_period_until = null;
      break;
    case "end_trial":
      patch.status = "overdue";
      patch.trial_ends_at = null;
      patch.grace_period_until = addDays(now, 3).toISOString();
      break;
    case "restart_trial":
      patch.status = "trial";
      patch.trial_ends_at = addDays(now, 7).toISOString();
      patch.current_period_start = now.toISOString();
      patch.current_period_end = addDays(now, 7).toISOString();
      patch.grace_period_until = null;
      break;
  }
  const row = {
    user_id: data.targetUserId,
    plan: currentSubscription?.plan ?? data.plan ?? "starter",
    status: currentSubscription?.status ?? "trial",
    current_period_start: currentSubscription?.current_period_start ?? now.toISOString(),
    current_period_end: currentSubscription?.current_period_end ?? addDays(now, 7).toISOString(),
    ...patch
  };
  const {
    error
  } = await supabaseAdmin.from("subscriptions").upsert(row, {
    onConflict: "user_id"
  });
  if (error) throw error;
  await logAdminAction(context.userId, data.action, data, data.targetUserId);
  return {
    ok: true
  };
});
const createPromotionalLicense_createServerFn_handler = createServerRpc({
  id: "91ed2a13d84c4354572bd0fd26298ba2ac55e208ebf7c01570095f6a63064783",
  name: "createPromotionalLicense",
  filename: "src/lib/admin.functions.ts"
}, (opts) => createPromotionalLicense.__executeServer(opts));
const createPromotionalLicense = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => LicenseSchema.parse(input)).handler(createPromotionalLicense_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  const {
    error
  } = await supabaseAdmin.from("promotional_licenses").insert({
    code: data.code,
    plan: data.plan,
    max_uses: data.maxUses ?? null,
    expires_at: data.expiresAt || null,
    months_granted: data.monthsGranted,
    lifetime: data.lifetime,
    created_by: context.userId
  });
  if (error) throw error;
  await logAdminAction(context.userId, "create_license", {
    code: data.code,
    plan: data.plan
  });
  return {
    ok: true
  };
});
const setPromotionalLicenseActive_createServerFn_handler = createServerRpc({
  id: "52201c075b5acf8c859a30f8c2a2dea42d4f7a004c0c20fb4bb2013951ef9dee",
  name: "setPromotionalLicenseActive",
  filename: "src/lib/admin.functions.ts"
}, (opts) => setPromotionalLicenseActive.__executeServer(opts));
const setPromotionalLicenseActive = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  licenseId: string().uuid(),
  active: boolean()
}).parse(input)).handler(setPromotionalLicenseActive_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  const {
    error
  } = await supabaseAdmin.from("promotional_licenses").update({
    active: data.active
  }).eq("id", data.licenseId);
  if (error) throw error;
  await logAdminAction(context.userId, data.active ? "activate_license" : "deactivate_license", {
    licenseId: data.licenseId
  });
  return {
    ok: true
  };
});
const setUserRole_createServerFn_handler = createServerRpc({
  id: "db980dd7fbef43d3fc13d10ddc5f8ed5aae0f52362aa36d741670b7c62aab77f",
  name: "setUserRole",
  filename: "src/lib/admin.functions.ts"
}, (opts) => setUserRole.__executeServer(opts));
const setUserRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  targetUserId: string().uuid(),
  role: RoleSchema,
  grant: boolean()
}).parse(input)).handler(setUserRole_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertOwner(context);
  if (data.role === "owner" && data.targetUserId === context.userId && !data.grant) {
    throw new Error("Você não pode remover sua própria role de owner.");
  }
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  if (data.grant) {
    const {
      error
    } = await supabaseAdmin.from("user_roles").insert({
      user_id: data.targetUserId,
      role: data.role
    });
    if (error && !String(error.message).includes("duplicate")) throw error;
  } else {
    const {
      error
    } = await supabaseAdmin.from("user_roles").delete().eq("user_id", data.targetUserId).eq("role", data.role);
    if (error) throw error;
  }
  await logAdminAction(context.userId, data.grant ? "grant_role" : "revoke_role", {
    role: data.role
  }, data.targetUserId);
  return {
    ok: true
  };
});
const deleteUser_createServerFn_handler = createServerRpc({
  id: "5f15d9c6194c3264109b1c81741c60a8654b66a5caffc1ee319315a3a983394e",
  name: "deleteUser",
  filename: "src/lib/admin.functions.ts"
}, (opts) => deleteUser.__executeServer(opts));
const deleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  targetUserId: string().uuid()
}).parse(input)).handler(deleteUser_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertOwner(context);
  if (data.targetUserId === context.userId) {
    throw new Error("Você não pode excluir a si mesmo.");
  }
  const {
    supabaseAdmin
  } = await import("./client.server-DMSl3WSm.mjs");
  const {
    error
  } = await supabaseAdmin.auth.admin.deleteUser(data.targetUserId);
  if (error) throw error;
  await logAdminAction(context.userId, "delete_user", {}, data.targetUserId);
  return {
    ok: true
  };
});
export {
  createPromotionalLicense_createServerFn_handler,
  deleteUser_createServerFn_handler,
  getAdminOverview_createServerFn_handler,
  setPromotionalLicenseActive_createServerFn_handler,
  setUserRole_createServerFn_handler,
  updateAdminSubscription_createServerFn_handler
};
