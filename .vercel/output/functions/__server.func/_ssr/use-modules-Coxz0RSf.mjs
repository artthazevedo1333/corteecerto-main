import { u as useSubscription } from "./use-subscription-DyCgx5h8.mjs";
import { e as effectiveFeaturesForSubscription } from "./subscription-D6ZG8HOt.mjs";
const ALL_MODULES = [
  {
    id: "agenda",
    label: "Agenda",
    description: "Gerencie seus horários e agendamentos.",
    icon: "Calendar"
  },
  {
    id: "clients",
    label: "Clientes",
    description: "Histórico e informações dos seus clientes.",
    icon: "Users"
  },
  {
    id: "services",
    label: "Serviços",
    description: "Configure os cortes e barbas oferecidos.",
    icon: "Scissors"
  },
  {
    id: "inventory",
    label: "Estoque",
    description: "Gestão de produtos e alertas de estoque baixo.",
    icon: "Package"
  },
  {
    id: "finance",
    label: "Financeiro",
    description: "Controle de fluxo de caixa e lucros.",
    icon: "CreditCard"
  },
  {
    id: "commissions",
    label: "Comissões",
    description: "Cálculo automático de comissões para barbeiros.",
    icon: "Percent"
  },
  {
    id: "online-booking",
    label: "Agendamento Online",
    description: "Página pública para seus clientes agendarem.",
    icon: "Globe"
  },
  {
    id: "vip",
    label: "Planos VIP",
    description: "Crie planos de assinatura para seus clientes.",
    icon: "Crown"
  },
  {
    id: "reports",
    label: "Relatórios",
    description: "Análises detalhadas do seu negócio.",
    icon: "BarChart3"
  },
  {
    id: "crm",
    label: "CRM Premium",
    description: "Perfil avançado e ranking de clientes.",
    icon: "Heart"
  },
  {
    id: "recovery",
    label: "Recuperação",
    description: "Detecte e recupere clientes inativos.",
    icon: "UserPlus"
  },
  {
    id: "ai",
    label: "Business AI",
    description: "Inteligência artificial para análise de dados.",
    icon: "Sparkles"
  }
];
function useModules() {
  const { subscription, isLoading } = useSubscription();
  const enabledModules = effectiveFeaturesForSubscription(subscription);
  const isEnabled = (moduleId) => enabledModules.includes(moduleId);
  const toggleModule = async (_moduleId) => {
    return;
  };
  return {
    enabledModules,
    isEnabled,
    toggleModule,
    isLoading
  };
}
export {
  ALL_MODULES as A,
  useModules as u
};
