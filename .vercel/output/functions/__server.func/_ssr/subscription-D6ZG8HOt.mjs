const PLAN_TIER = {
  starter: "essential",
  professional: "professional",
  premium: "premium",
  lifetime: "premium"
};
const PLAN_LABELS = {
  starter: "Essencial",
  professional: "Profissional",
  premium: "Premium",
  lifetime: "Premium Vitalício"
};
const TIER_FEATURES = {
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
    "multi-professional"
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
    "multi-unit"
  ]
};
function featuresForPlan(plan) {
  if (!plan) return TIER_FEATURES.essential;
  return TIER_FEATURES[PLAN_TIER[plan]];
}
const FEATURE_LABELS = {
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
  "multi-unit": "Multiunidades"
};
function minPlanForFeature(feature) {
  if (TIER_FEATURES.essential.includes(feature)) return "essential";
  if (TIER_FEATURES.professional.includes(feature)) return "professional";
  return "premium";
}
const TIER_LABELS = {
  essential: "Essencial",
  professional: "Profissional",
  premium: "Premium"
};
const PLAN_FEATURES = {
  starter: {
    maxClients: 300,
    maxAppointmentsPerMonth: 500,
    onlineBooking: false,
    reports: false,
    crm: false,
    ai: false,
    vipPlans: false,
    commissions: false
  },
  professional: {
    maxClients: 2e3,
    maxAppointmentsPerMonth: null,
    onlineBooking: true,
    reports: true,
    crm: false,
    ai: false,
    vipPlans: true,
    commissions: true
  },
  premium: {
    maxClients: null,
    maxAppointmentsPerMonth: null,
    onlineBooking: true,
    reports: true,
    crm: true,
    ai: true,
    vipPlans: true,
    commissions: true
  },
  lifetime: {
    maxClients: null,
    maxAppointmentsPerMonth: null,
    onlineBooking: true,
    reports: true,
    crm: true,
    ai: true,
    vipPlans: true,
    commissions: true
  }
};
function hasAccess(sub) {
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
  if (sub.status === "cancelled" && sub.current_period_end) {
    return new Date(sub.current_period_end).getTime() > now;
  }
  return false;
}
function daysLeftInTrial(sub) {
  if (!sub || sub.status !== "trial" || !sub.trial_ends_at) return null;
  const diff = new Date(sub.trial_ends_at).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1e3 * 60 * 60 * 24)));
}
function effectiveFeaturesForSubscription(sub) {
  if (!sub) return TIER_FEATURES.essential;
  if (hasAccess(sub)) return featuresForPlan(sub.plan);
  return TIER_FEATURES.essential;
}
export {
  FEATURE_LABELS as F,
  PLAN_LABELS as P,
  TIER_LABELS as T,
  PLAN_FEATURES as a,
  daysLeftInTrial as d,
  effectiveFeaturesForSubscription as e,
  hasAccess as h,
  minPlanForFeature as m
};
