// Central de Comunicação — catálogo de eventos automáticos do Corte Certo.
// Todo evento novo deve ser adicionado aqui para ficar disponível na área
// de preferências e no despachante.

export type NotificationCategory = "conta" | "assinatura" | "agendamento" | "financeiro";

export type NotificationChannel = "email" | "in_app" | "whatsapp" | "sms";

export type NotificationEvent = {
  key: string;
  category: NotificationCategory;
  label: string;
  description: string;
  defaultEnabled: boolean;
  // Canais disponíveis para este evento (arquitetura preparada para futuro).
  channels: NotificationChannel[];
  // Template amigável em pt-BR (interpolação simples com {chave}).
  template: {
    subject: string;
    body: string;
  };
};

export const CATEGORY_LABELS: Record<NotificationCategory, string> = {
  conta: "Conta",
  assinatura: "Assinatura",
  agendamento: "Agendamentos",
  financeiro: "Financeiro",
};

export const CATEGORY_DESCRIPTIONS: Record<NotificationCategory, string> = {
  conta: "Boas-vindas, senhas e acesso ao sistema.",
  assinatura: "Cobranças, renovações e alterações de plano.",
  agendamento: "Novos horários, confirmações e lembretes.",
  financeiro: "Recebimentos e cobranças da sua barbearia.",
};

export const NOTIFICATION_EVENTS: NotificationEvent[] = [
  // ---------------- Conta ----------------
  {
    key: "account.welcome",
    category: "conta",
    label: "Boas-vindas",
    description: "Enviado quando um novo usuário cria a conta.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Bem-vindo ao Corte Certo, {nome}!",
      body: "Olá {nome}, sua conta foi criada com sucesso. Estamos felizes em ter você por aqui.",
    },
  },
  {
    key: "account.email_confirm",
    category: "conta",
    label: "Confirmação de e-mail",
    description: "Solicita a verificação do e-mail cadastrado.",
    defaultEnabled: true,
    channels: ["email"],
    template: {
      subject: "Confirme seu e-mail no Corte Certo",
      body: "Confirme seu e-mail para começar a usar o sistema.",
    },
  },
  {
    key: "account.password_reset",
    category: "conta",
    label: "Redefinição de senha",
    description: "Link seguro para redefinir a senha.",
    defaultEnabled: true,
    channels: ["email"],
    template: {
      subject: "Redefinição de senha",
      body: "Recebemos uma solicitação para redefinir sua senha.",
    },
  },
  {
    key: "account.password_changed",
    category: "conta",
    label: "Alteração de senha",
    description: "Aviso ao usuário quando a senha é alterada.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Sua senha foi alterada",
      body: "Sua senha foi atualizada com sucesso. Caso não tenha sido você, entre em contato conosco.",
    },
  },
  {
    key: "account.team_invite",
    category: "conta",
    label: "Convite para profissionais",
    description: "Convite enviado a barbeiros da equipe.",
    defaultEnabled: true,
    channels: ["email"],
    template: {
      subject: "Você foi convidado para {barbearia}",
      body: "Aceite o convite para acessar o painel da equipe.",
    },
  },

  // ---------------- Assinatura ----------------
  {
    key: "subscription.created",
    category: "assinatura",
    label: "Assinatura criada",
    description: "Confirmação de assinatura contratada.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Sua assinatura foi ativada",
      body: "Seja bem-vindo ao plano {plano}. Sua assinatura está ativa.",
    },
  },
  {
    key: "subscription.payment_approved",
    category: "assinatura",
    label: "Pagamento aprovado",
    description: "Confirmação de pagamento processado com sucesso.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Pagamento confirmado",
      body: "Seu pagamento foi confirmado. Sua assinatura continua ativa.",
    },
  },
  {
    key: "subscription.payment_failed",
    category: "assinatura",
    label: "Pagamento recusado",
    description: "Notificação de falha na cobrança da assinatura.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Não conseguimos processar seu pagamento",
      body: "Regularize o pagamento para manter o acesso completo ao Corte Certo.",
    },
  },
  {
    key: "subscription.renewed",
    category: "assinatura",
    label: "Renovação",
    description: "Aviso de renovação automática do plano.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Sua assinatura foi renovada",
      body: "Seu plano {plano} foi renovado até {vencimento}.",
    },
  },
  {
    key: "subscription.plan_changed",
    category: "assinatura",
    label: "Alteração de plano",
    description: "Confirmação de upgrade ou downgrade de plano.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Seu plano foi atualizado",
      body: "Agora você está no plano {plano}.",
    },
  },
  {
    key: "subscription.cancelled",
    category: "assinatura",
    label: "Cancelamento",
    description: "Confirmação de cancelamento da assinatura.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Sua assinatura foi cancelada",
      body: "Sentiremos sua falta. Você continua com acesso até {vencimento}.",
    },
  },
  {
    key: "subscription.suspended",
    category: "assinatura",
    label: "Assinatura suspensa",
    description: "Notifica suspensão por inadimplência.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Sua assinatura foi suspensa",
      body: "Regularize seu pagamento para reativar o acesso completo.",
    },
  },
  {
    key: "subscription.reactivated",
    category: "assinatura",
    label: "Assinatura reativada",
    description: "Confirma reativação após regularização.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Sua assinatura foi reativada",
      body: "Tudo certo! Sua assinatura está novamente ativa.",
    },
  },

  // ---------------- Agendamentos ----------------
  {
    key: "appointment.created",
    category: "agendamento",
    label: "Novo agendamento",
    description: "Aviso quando um cliente cria um novo agendamento.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Novo agendamento recebido",
      body: "{cliente} agendou {servico} para {data} às {hora}.",
    },
  },
  {
    key: "appointment.confirmed",
    category: "agendamento",
    label: "Confirmação",
    description: "Confirmação enviada ao cliente e à barbearia.",
    defaultEnabled: true,
    channels: ["email", "whatsapp", "in_app"],
    template: {
      subject: "Agendamento confirmado",
      body: "Seu horário está confirmado para {data} às {hora}.",
    },
  },
  {
    key: "appointment.cancelled",
    category: "agendamento",
    label: "Cancelamento",
    description: "Aviso de cancelamento de agendamento.",
    defaultEnabled: true,
    channels: ["email", "whatsapp", "in_app"],
    template: {
      subject: "Agendamento cancelado",
      body: "O horário de {data} às {hora} foi cancelado.",
    },
  },
  {
    key: "appointment.rescheduled",
    category: "agendamento",
    label: "Reagendamento",
    description: "Aviso quando um agendamento é remarcado.",
    defaultEnabled: true,
    channels: ["email", "whatsapp", "in_app"],
    template: {
      subject: "Agendamento remarcado",
      body: "Seu horário foi remarcado para {data} às {hora}.",
    },
  },
  {
    key: "appointment.reminder",
    category: "agendamento",
    label: "Lembrete automático",
    description: "Lembrete enviado antes do horário agendado.",
    defaultEnabled: true,
    channels: ["email", "whatsapp", "sms", "in_app"],
    template: {
      subject: "Lembrete: seu horário é amanhã",
      body: "Passando para lembrar do seu horário em {data} às {hora}.",
    },
  },

  // ---------------- Financeiro ----------------
  {
    key: "finance.received",
    category: "financeiro",
    label: "Recebimento confirmado",
    description: "Aviso quando uma entrada é registrada.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Recebimento confirmado",
      body: "Entrada de {valor} registrada com sucesso.",
    },
  },
  {
    key: "finance.pending",
    category: "financeiro",
    label: "Cobrança pendente",
    description: "Alerta de cobrança em aberto.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Você tem uma cobrança pendente",
      body: "A cobrança de {valor} está em aberto.",
    },
  },
  {
    key: "finance.overdue",
    category: "financeiro",
    label: "Pagamento vencido",
    description: "Aviso quando o vencimento é ultrapassado.",
    defaultEnabled: true,
    channels: ["email", "in_app"],
    template: {
      subject: "Pagamento vencido",
      body: "A cobrança de {valor} venceu em {data}.",
    },
  },
];

export function eventsByCategory(): Record<NotificationCategory, NotificationEvent[]> {
  const out: Record<NotificationCategory, NotificationEvent[]> = {
    conta: [],
    assinatura: [],
    agendamento: [],
    financeiro: [],
  };
  for (const ev of NOTIFICATION_EVENTS) out[ev.category].push(ev);
  return out;
}

export function findEvent(key: string): NotificationEvent | undefined {
  return NOTIFICATION_EVENTS.find((e) => e.key === key);
}

export function interpolate(template: string, data: Record<string, unknown>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => {
    const v = data?.[k];
    return v === undefined || v === null ? `{${k}}` : String(v);
  });
}
