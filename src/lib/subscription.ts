// =============================================================
// Arquitetura definitiva de assinaturas do Corte Certo
// -------------------------------------------------------------
// - Três planos comerciais: Essencial · Profissional · Premium
// - Ids internos do enum (compat.): starter → Essencial,
//   professional → Profissional, premium → Premium,
//   lifetime → Premium Vitalício (mesmos recursos do Premium).
// - Permissões são pacotes automáticos por plano. Admin nunca
//   gerencia módulos manualmente.
// =============================================================

export type SubscriptionPlan = "starter" | "professional" | "premium" | "lifetime";
export type SubscriptionStatus = "trial" | "active" | "overdue" | "suspended" | "cancelled";

export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  trial_ends_at: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  grace_period_until: string | null;
  payment_provider: string | null;
  provider_customer_id: string | null;
  provider_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

/** Tier comercial exibido ao público — mapa 1:1 com a Landing Page. */
export type PlanTier = "essential" | "professional" | "premium";

export const PLAN_TIER: Record<SubscriptionPlan, PlanTier> = {
  starter: "essential",
  professional: "professional",
  premium: "premium",
  lifetime: "premium",
};

/** Nome de exibição — idêntico ao usado na Landing Page. */
export const PLAN_LABELS: Record<SubscriptionPlan, string> = {
  starter: "Essencial",
  professional: "Profissional",
  premium: "Premium",
  lifetime: "Premium Vitalício",
};

export const PLAN_ICONS: Record<SubscriptionPlan, string> = {
  starter: "💈",
  professional: "⭐",
  premium: "👑",
  lifetime: "👑",
};

// -------------------------------------------------------------
// Permissões internas — chaves usadas por todo o app.
// Novos módulos: adicione a chave e coloque no pacote do plano.
// -------------------------------------------------------------
export type FeatureKey =
  | "agenda"
  | "clients"
  | "services"
  | "inventory"
  | "finance"
  | "commissions"
  | "online-booking"
  | "vip"
  | "reports"
  | "crm"
  | "recovery"
  | "ai"
  | "multi-professional"
  | "multi-unit";

/** Pacote de permissões por tier comercial. */
const TIER_FEATURES: Record<PlanTier, FeatureKey[]> = {
  essential: ["agenda", "clients", "services", "inventory"],
  professional: [
    "agenda",
    "clients",
    "services",
    "inventory",
    "finance",
    "commissions",
    "online-booking",
    "vip",
    "reports",
    "multi-professional",
  ],
  premium: [
    "agenda",
    "clients",
    "services",
    "inventory",
    "finance",
    "commissions",
    "online-booking",
    "vip",
    "reports",
    "crm",
    "recovery",
    "ai",
    "multi-professional",
    "multi-unit",
  ],
};

export function featuresForPlan(plan: SubscriptionPlan | null | undefined): FeatureKey[] {
  if (!plan) return TIER_FEATURES.essential;
  return TIER_FEATURES[PLAN_TIER[plan]];
}

export function planHasFeature(
  plan: SubscriptionPlan | null | undefined,
  feature: FeatureKey,
): boolean {
  return featuresForPlan(plan).includes(feature);
}

/** Nome amigável exibido nos gates de upgrade. */
export const FEATURE_LABELS: Record<FeatureKey, string> = {
  agenda: "Agenda",
  clients: "Clientes",
  services: "Serviços",
  inventory: "Estoque",
  finance: "Financeiro",
  commissions: "Comissões",
  "online-booking": "Agendamento Online",
  vip: "Planos VIP",
  reports: "Relatórios",
  crm: "CRM Premium",
  recovery: "Recuperação de Clientes",
  ai: "Business AI",
  "multi-professional": "Múltiplos Profissionais",
  "multi-unit": "Multiunidades",
};

/** Menor plano que libera a feature — usado nas mensagens de upgrade. */
export function minPlanForFeature(feature: FeatureKey): PlanTier {
  if (TIER_FEATURES.essential.includes(feature)) return "essential";
  if (TIER_FEATURES.professional.includes(feature)) return "professional";
  return "premium";
}

export const TIER_LABELS: Record<PlanTier, string> = {
  essential: "Essencial",
  professional: "Profissional",
  premium: "Premium",
};

// -------------------------------------------------------------
// Limites quantitativos (compatibilidade com código existente).
// -------------------------------------------------------------
export const PLAN_FEATURES: Record<
  SubscriptionPlan,
  {
    maxClients: number | null;
    maxAppointmentsPerMonth: number | null;
    onlineBooking: boolean;
    reports: boolean;
    crm: boolean;
    ai: boolean;
    vipPlans: boolean;
    commissions: boolean;
  }
> = {
  starter: {
    maxClients: 300,
    maxAppointmentsPerMonth: 500,
    onlineBooking: false,
    reports: false,
    crm: false,
    ai: false,
    vipPlans: false,
    commissions: false,
  },
  professional: {
    maxClients: 2000,
    maxAppointmentsPerMonth: null,
    onlineBooking: true,
    reports: true,
    crm: false,
    ai: false,
    vipPlans: true,
    commissions: true,
  },
  premium: {
    maxClients: null,
    maxAppointmentsPerMonth: null,
    onlineBooking: true,
    reports: true,
    crm: true,
    ai: true,
    vipPlans: true,
    commissions: true,
  },
  lifetime: {
    maxClients: null,
    maxAppointmentsPerMonth: null,
    onlineBooking: true,
    reports: true,
    crm: true,
    ai: true,
    vipPlans: true,
    commissions: true,
  },
};

/** Verdadeiro se a assinatura permite acesso ao app. */
export function hasAccess(sub: Subscription | null | undefined): boolean {
  if (!sub) return false;
  const now = Date.now();

  if (sub.status === "active") return true;

  if (sub.status === "trial") {
    if (!sub.trial_ends_at) return true;
    return new Date(sub.trial_ends_at).getTime() > now;
  }

  if (sub.status === "overdue" && sub.grace_period_until) {
    return new Date(sub.grace_period_until).getTime() > now;
  }

  // Cancelada: mantém acesso até o fim do período já pago.
  if (sub.status === "cancelled" && sub.current_period_end) {
    return new Date(sub.current_period_end).getTime() > now;
  }

  return false;
}

export function daysLeftInTrial(sub: Subscription | null | undefined): number | null {
  if (!sub || sub.status !== "trial" || !sub.trial_ends_at) return null;
  const diff = new Date(sub.trial_ends_at).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Permissões efetivas considerando plano + status.
 * - active/trial/cancelled-within-period/overdue-in-grace → recursos completos do plano
 * - suspended/expired/cancelled-past-period → apenas recursos essenciais
 *   (defesa em profundidade; SubscriptionGate normalmente já bloqueia toda a UI)
 */
export function effectiveFeaturesForSubscription(
  sub: Subscription | null | undefined,
): FeatureKey[] {
  if (!sub) return TIER_FEATURES.essential;
  if (hasAccess(sub)) return featuresForPlan(sub.plan);
  return TIER_FEATURES.essential;
}
