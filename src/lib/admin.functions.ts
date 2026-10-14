import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const PlanSchema = z.enum(["starter", "professional", "premium", "lifetime"]);
const StatusSchema = z.enum(["trial", "active", "overdue", "suspended", "cancelled"]);
const RoleSchema = z.enum(["owner", "admin", "support", "user"]);

const AdminActionSchema = z.enum([
  "change_plan",
  "activate",
  "suspend",
  "cancel",
  "reactivate",
  "grant_days",
  "grant_months",
  "lifetime",
  "end_trial",
  "restart_trial",
]);

const LicenseSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3)
    .max(40)
    .transform((value) => value.toUpperCase()),
  plan: PlanSchema,
  maxUses: z.coerce.number().int().positive().nullable().optional(),
  expiresAt: z.string().nullable().optional(),
  monthsGranted: z.coerce.number().int().min(0).max(120).default(1),
  lifetime: z.boolean().default(false),
});

type DbRow = Record<string, any>;

async function assertAdmin(context: any) {
  const roles = ["owner", "admin"] as const;
  for (const role of roles) {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: role,
    });
    if (!error && data === true) return;
  }
  throw new Response("Not found", { status: 404 });
}

async function assertOwner(context: any) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "owner",
  });
  if (error || data !== true) {
    throw new Response("Forbidden", { status: 403 });
  }
}

function centsToMoney(cents: number) {
  return Math.max(0, cents || 0) / 100;
}

function startOfMonth() {
  const date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(base: Date, days: number) {
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  return date;
}

async function logAdminAction(
  adminUserId: string,
  action: string,
  details: Record<string, unknown>,
  targetUserId?: string,
) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin.from("admin_audit_logs" as any).insert({
    admin_user_id: adminUserId,
    target_user_id: targetUserId ?? null,
    action,
    details,
  } as any);
}

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const monthStart = startOfMonth();
    const monthStartIso = monthStart.toISOString();

    const [profilesRes, subscriptionsRes, billingRes, licensesRes, redemptionsRes, rolesRes] =
      await Promise.all([
        supabaseAdmin
          .from("profiles" as any)
          .select("id, full_name, barber_shop_name, avatar_url, business_phone, created_at"),
        supabaseAdmin
          .from("subscriptions" as any)
          .select(
            "id, user_id, plan, status, trial_ends_at, current_period_start, current_period_end, grace_period_until, payment_provider, provider_customer_id, provider_subscription_id, created_at, updated_at",
          ),
        supabaseAdmin
          .from("billing_history" as any)
          .select(
            "id, user_id, amount_cents, currency, status, gateway, external_id, paid_at, receipt_url, created_at",
          )
          .order("created_at", { ascending: false })
          .limit(500),
        supabaseAdmin
          .from("promotional_licenses" as any)
          .select(
            "id, code, plan, max_uses, expires_at, months_granted, lifetime, active, created_at, updated_at",
          )
          .order("created_at", { ascending: false }),
        supabaseAdmin
          .from("promotional_license_redemptions" as any)
          .select("id, license_id, user_id, redeemed_at"),
        supabaseAdmin.from("user_roles" as any).select("user_id, role"),
      ]);

    if (profilesRes.error) throw profilesRes.error;
    if (subscriptionsRes.error) throw subscriptionsRes.error;
    if (billingRes.error) throw billingRes.error;
    if (licensesRes.error) throw licensesRes.error;
    if (redemptionsRes.error) throw redemptionsRes.error;
    if (rolesRes.error) throw rolesRes.error;

    const profiles = (profilesRes.data ?? []) as Array<Record<string, any>>;
    const subscriptions = (subscriptionsRes.data ?? []) as Array<Record<string, any>>;
    const billing = (billingRes.data ?? []) as Array<Record<string, any>>;
    const redemptions = (redemptionsRes.data ?? []) as Array<Record<string, any>>;
    const roleRows = (rolesRes.data ?? []) as unknown as Array<{ user_id: string; role: string }>;
    const rolesByUser = roleRows.reduce((acc, row) => {
      const list = acc.get(row.user_id) ?? [];
      list.push(row.role);
      acc.set(row.user_id, list);
      return acc;
    }, new Map<string, string[]>());

    const usersRes = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (usersRes.error) throw usersRes.error;
    const authUsers = usersRes.data.users ?? [];
    const authById = new Map(authUsers.map((user) => [user.id, user]));
    const profilesById = new Map(profiles.map((profile) => [profile.id, profile]));
    const subscriptionByUser = new Map(
      subscriptions.map((subscription) => [subscription.user_id, subscription]),
    );

    const userIds = Array.from(
      new Set([
        ...authUsers.map((user) => user.id),
        ...profiles.map((profile) => profile.id),
        ...subscriptions.map((subscription) => subscription.user_id),
      ]),
    );

    const billingByUser = billing.reduce((acc: Map<string, DbRow[]>, row: DbRow) => {
      const list = acc.get(row.user_id) ?? [];
      list.push(row);
      acc.set(row.user_id, list);
      return acc;
    }, new Map<string, Array<Record<string, any>>>());

    const customers = userIds.map((userId) => {
      const profile = profilesById.get(userId) ?? {};
      const subscription = subscriptionByUser.get(userId) ?? null;
      const userBilling = billingByUser.get(userId) ?? [];
      const confirmedPayments = userBilling.filter((row: DbRow) => row.status === "confirmed");
      const paidTotalCents = confirmedPayments.reduce(
        (sum: number, row: DbRow) => sum + (row.amount_cents ?? 0),
        0,
      );
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
        roles: rolesByUser.get(userId) ?? [],
      };
    });

    const active = subscriptions.filter((row) => row.status === "active");
    const trials = subscriptions.filter((row) => row.status === "trial");
    const overdue = subscriptions.filter((row) => row.status === "overdue");
    const suspended = subscriptions.filter((row) => row.status === "suspended");
    const cancelled = subscriptions.filter((row) => row.status === "cancelled");
    const monthPayments = billing.filter(
      (row) => row.status === "confirmed" && new Date(row.paid_at ?? row.created_at) >= monthStart,
    );
    const monthlyRevenue = centsToMoney(
      monthPayments.reduce((sum, row) => sum + (row.amount_cents ?? 0), 0),
    );
    const newCustomersThisMonth = customers.filter(
      (customer) => customer.createdAt && new Date(customer.createdAt) >= monthStart,
    ).length;
    const cancellationsThisMonth = subscriptions.filter(
      (row) =>
        row.status === "cancelled" && row.updated_at && new Date(row.updated_at) >= monthStart,
    ).length;

    const revenueByMonth = billing
      .filter((row) => row.status === "confirmed")
      .reduce(
        (acc, row) => {
          const key = new Date(row.paid_at ?? row.created_at).toISOString().slice(0, 7);
          acc[key] = (acc[key] ?? 0) + centsToMoney(row.amount_cents ?? 0);
          return acc;
        },
        {} as Record<string, number>,
      );

    const planCounts = subscriptions.reduce(
      (acc, row) => {
        acc[row.plan] = (acc[row.plan] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const paidUserIds = new Set(
      billing.filter((row) => row.status === "confirmed").map((row) => row.user_id),
    );
    const trialUsers = new Set(
      subscriptions.filter((row) => row.trial_ends_at).map((row) => row.user_id),
    );
    const conversionRate = trialUsers.size
      ? Math.round((paidUserIds.size / trialUsers.size) * 100)
      : 0;
    const lifetimeCount = subscriptions.filter((row) => row.plan === "lifetime").length;
    const averageStayDays = Math.round(
      subscriptions.reduce((sum, row) => {
        const from = new Date(row.created_at).getTime();
        const until =
          row.status === "cancelled" && row.updated_at
            ? new Date(row.updated_at).getTime()
            : Date.now();
        return sum + Math.max(0, until - from) / 86_400_000;
      }, 0) / Math.max(1, subscriptions.length),
    );

    const redemptionCountByLicense = redemptions.reduce(
      (acc, row) => {
        acc[row.license_id] = (acc[row.license_id] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const licenses = ((licensesRes.data ?? []) as Array<Record<string, any>>).map((license) => ({
      ...license,
      uses: redemptionCountByLicense[license.id] ?? 0,
    }));

    return {
      generatedAt: new Date().toISOString(),
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
        cancellationsThisMonth,
      },
      metrics: {
        planCounts,
        conversionRate,
        monthlyRevenue,
        annualRevenue: monthlyRevenue * 12,
        cancellations: cancelled.length,
        averageStayDays,
        lifetimeCount,
        revenueByMonth,
      },
      customers,
      licenses,
      monthStart: monthStartIso,
    };
  });

export const updateAdminSubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        targetUserId: z.string().uuid(),
        action: AdminActionSchema,
        plan: PlanSchema.optional(),
        status: StatusSchema.optional(),
        amount: z.coerce.number().int().min(1).max(3650).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const now = new Date();

    const { data: existing, error: existingError } = await supabaseAdmin
      .from("subscriptions" as any)
      .select("*")
      .eq("user_id", data.targetUserId)
      .maybeSingle();

    if (existingError) throw existingError;
    const currentSubscription = existing as DbRow | null;

    const periodBase =
      currentSubscription?.current_period_end &&
      new Date(currentSubscription.current_period_end) > now
        ? new Date(currentSubscription.current_period_end)
        : now;

    const patch: Record<string, unknown> = { updated_at: now.toISOString() };

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
        patch.current_period_end =
          currentSubscription?.plan === "lifetime" ? null : addDays(now, 30).toISOString();
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
      ...patch,
    };

    const { error } = await supabaseAdmin
      .from("subscriptions" as any)
      .upsert(row as any, { onConflict: "user_id" });

    if (error) throw error;
    await logAdminAction(context.userId, data.action, data, data.targetUserId);
    return { ok: true };
  });

export const createPromotionalLicense = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => LicenseSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("promotional_licenses" as any).insert({
      code: data.code,
      plan: data.plan,
      max_uses: data.maxUses ?? null,
      expires_at: data.expiresAt || null,
      months_granted: data.monthsGranted,
      lifetime: data.lifetime,
      created_by: context.userId,
    } as any);

    if (error) throw error;
    await logAdminAction(context.userId, "create_license", { code: data.code, plan: data.plan });
    return { ok: true };
  });

export const setPromotionalLicenseActive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ licenseId: z.string().uuid(), active: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("promotional_licenses" as any)
      .update({ active: data.active } as any)
      .eq("id", data.licenseId);

    if (error) throw error;
    await logAdminAction(context.userId, data.active ? "activate_license" : "deactivate_license", {
      licenseId: data.licenseId,
    });
    return { ok: true };
  });

export const setUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        targetUserId: z.string().uuid(),
        role: RoleSchema,
        grant: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertOwner(context);
    if (data.role === "owner" && data.targetUserId === context.userId && !data.grant) {
      throw new Error("Você não pode remover sua própria role de owner.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (data.grant) {
      const { error } = await supabaseAdmin
        .from("user_roles" as any)
        .insert({ user_id: data.targetUserId, role: data.role } as any);
      if (error && !String(error.message).includes("duplicate")) throw error;
    } else {
      const { error } = await supabaseAdmin
        .from("user_roles" as any)
        .delete()
        .eq("user_id", data.targetUserId)
        .eq("role", data.role);
      if (error) throw error;
    }

    await logAdminAction(
      context.userId,
      data.grant ? "grant_role" : "revoke_role",
      { role: data.role },
      data.targetUserId,
    );
    return { ok: true };
  });

export const deleteUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ targetUserId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertOwner(context);
    if (data.targetUserId === context.userId) {
      throw new Error("Você não pode excluir a si mesmo.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.targetUserId);
    if (error) throw error;
    await logAdminAction(context.userId, "delete_user", {}, data.targetUserId);
    return { ok: true };
  });
