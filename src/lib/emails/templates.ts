// Templates de e-mail transacional — estrutura preparada.
// A entrega real (SMTP/Resend/etc.) será plugada depois; aqui ficam
// apenas o conteúdo e as chaves usadas pelos gatilhos de assinatura.

export type EmailTemplateId =
  | "subscription_activated"
  | "payment_confirmed"
  | "payment_failed"
  | "subscription_expiring"
  | "subscription_suspended";

export interface EmailTemplate {
  id: EmailTemplateId;
  subject: string;
  body: (vars: Record<string, string>) => string;
}

export const EMAIL_TEMPLATES: Record<EmailTemplateId, EmailTemplate> = {
  subscription_activated: {
    id: "subscription_activated",
    subject: "Sua assinatura do Corte Certo está ativa 🎉",
    body: (v) =>
      `Olá ${v.name},\n\nSua assinatura do plano ${v.plan} foi ativada. Aproveite todos os recursos.\n\n— Corte Certo`,
  },
  payment_confirmed: {
    id: "payment_confirmed",
    subject: "Pagamento confirmado — Corte Certo",
    body: (v) => `Recebemos seu pagamento de ${v.amount}. Próxima cobrança em ${v.nextDate}.`,
  },
  payment_failed: {
    id: "payment_failed",
    subject: "Não conseguimos processar seu pagamento",
    body: (v) =>
      `Olá ${v.name},\n\nSeu pagamento não foi aprovado. Você tem ${v.graceDays} dias para regularizar antes que o acesso seja suspenso.`,
  },
  subscription_expiring: {
    id: "subscription_expiring",
    subject: "Sua assinatura vence em breve",
    body: (v) =>
      `Sua assinatura vence em ${v.daysLeft} dia(s). Renove para continuar sem interrupções.`,
  },
  subscription_suspended: {
    id: "subscription_suspended",
    subject: "Acesso suspenso — Corte Certo",
    body: (v) =>
      `Olá ${v.name},\n\nSeu acesso ao Corte Certo foi suspenso por falta de pagamento. Renove agora para reativar.`,
  },
};
