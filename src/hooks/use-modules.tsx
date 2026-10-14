import { useSubscription } from "@/hooks/use-subscription";
import { effectiveFeaturesForSubscription, FeatureKey } from "@/lib/subscription";

export type ModuleId = FeatureKey;

export const ALL_MODULES: { id: ModuleId; label: string; description: string; icon: string }[] = [
  {
    id: "agenda",
    label: "Agenda",
    description: "Gerencie seus horários e agendamentos.",
    icon: "Calendar",
  },
  {
    id: "clients",
    label: "Clientes",
    description: "Histórico e informações dos seus clientes.",
    icon: "Users",
  },
  {
    id: "services",
    label: "Serviços",
    description: "Configure os cortes e barbas oferecidos.",
    icon: "Scissors",
  },
  {
    id: "inventory",
    label: "Estoque",
    description: "Gestão de produtos e alertas de estoque baixo.",
    icon: "Package",
  },
  {
    id: "finance",
    label: "Financeiro",
    description: "Controle de fluxo de caixa e lucros.",
    icon: "CreditCard",
  },
  {
    id: "commissions",
    label: "Comissões",
    description: "Cálculo automático de comissões para barbeiros.",
    icon: "Percent",
  },
  {
    id: "online-booking",
    label: "Agendamento Online",
    description: "Página pública para seus clientes agendarem.",
    icon: "Globe",
  },
  {
    id: "vip",
    label: "Planos VIP",
    description: "Crie planos de assinatura para seus clientes.",
    icon: "Crown",
  },
  {
    id: "reports",
    label: "Relatórios",
    description: "Análises detalhadas do seu negócio.",
    icon: "BarChart3",
  },
  {
    id: "crm",
    label: "CRM Premium",
    description: "Perfil avançado e ranking de clientes.",
    icon: "Heart",
  },
  {
    id: "recovery",
    label: "Recuperação",
    description: "Detecte e recupere clientes inativos.",
    icon: "UserPlus",
  },
  {
    id: "ai",
    label: "Business AI",
    description: "Inteligência artificial para análise de dados.",
    icon: "Sparkles",
  },
];

/**
 * Módulos disponíveis derivam automaticamente do plano.
 * O administrador NÃO gerencia permissões manualmente — o plano
 * é o único controle.
 */
export function useModules() {
  const { subscription, isLoading } = useSubscription();

  const enabledModules = effectiveFeaturesForSubscription(subscription) as ModuleId[];

  const isEnabled = (moduleId: ModuleId) => enabledModules.includes(moduleId);

  // Mantido apenas por compatibilidade com telas antigas — no-op.
  const toggleModule = async (_moduleId: ModuleId) => {
    return;
  };

  return {
    enabledModules,
    isEnabled,
    toggleModule,
    isLoading,
  };
}
