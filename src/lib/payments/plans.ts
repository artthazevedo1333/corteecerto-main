import type { SubscriptionPlan } from "@/lib/subscription";

export interface PlanDefinition {
  id: SubscriptionPlan;
  name: string;
  icon: string;
  tagline: string;
  priceCents: number;
  currency: string;
  interval: "monthly" | "yearly" | "lifetime";
  highlight?: boolean;
  features: string[];
}

/**
 * Catálogo público dos planos comerciais.
 * Nomes devem coincidir 1:1 com a Landing Page.
 */
export const PLANS: PlanDefinition[] = [
  {
    id: "starter",
    name: "Essencial",
    icon: "💈",
    tagline: "O básico para organizar sua barbearia",
    priceCents: 4900,
    currency: "BRL",
    interval: "monthly",
    features: [
      "Agenda inteligente",
      "Cadastro de clientes",
      "Cadastro de serviços",
      "Controle básico de estoque",
      "Suporte por e-mail",
    ],
  },
  {
    id: "professional",
    name: "Profissional",
    icon: "⭐",
    tagline: "Para barbearias que querem crescer",
    priceCents: 9900,
    currency: "BRL",
    interval: "monthly",
    highlight: true,
    features: [
      "Tudo do Essencial",
      "Financeiro completo",
      "Comissões automáticas",
      "Agendamento online",
      "Planos VIP",
      "Relatórios de desempenho",
      "Múltiplos profissionais",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    icon: "👑",
    tagline: "Barbearia com nível de rede",
    priceCents: 19900,
    currency: "BRL",
    interval: "monthly",
    features: [
      "Tudo do Profissional",
      "CRM avançado de clientes",
      "Recuperação automática de inativos",
      "Business AI (insights inteligentes)",
      "Preparado para multiunidades",
      "Suporte prioritário",
    ],
  },
];

export function getPlan(id: SubscriptionPlan): PlanDefinition {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}
