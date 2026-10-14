import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type WaTemplateKey = "confirm" | "reminder" | "cancel" | "thanks";

const DEFAULTS: Record<WaTemplateKey, string> = {
  confirm:
    "Olá {cliente}! Seu horário está *confirmado* para {data} às {hora} — {servico}. Qualquer coisa é só chamar. ✂️",
  reminder:
    "Oi {cliente}, passando para lembrar do seu horário amanhã ({data} às {hora}) — {servico}. Até lá! 💈",
  cancel:
    "Olá {cliente}, precisamos cancelar seu horário de {data} às {hora}. Podemos remarcar? 🙏",
  thanks:
    "Obrigado pela visita, {cliente}! Agradecemos a preferência. Já quer deixar seu próximo horário marcado? 🙌",
};

const STORAGE_KEY = "wa_templates_v1";

export function getTemplate(key: WaTemplateKey): string {
  if (typeof window === "undefined") return DEFAULTS[key];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS[key];
    const obj = JSON.parse(raw);
    return obj[key] || DEFAULTS[key];
  } catch {
    return DEFAULTS[key];
  }
}

export function getAllTemplates(): Record<WaTemplateKey, string> {
  return {
    confirm: getTemplate("confirm"),
    reminder: getTemplate("reminder"),
    cancel: getTemplate("cancel"),
    thanks: getTemplate("thanks"),
  };
}

export function saveTemplates(t: Record<WaTemplateKey, string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
}

export function resetTemplates() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export const TEMPLATE_LABELS: Record<WaTemplateKey, string> = {
  confirm: "Confirmação",
  reminder: "Lembrete",
  cancel: "Cancelamento",
  thanks: "Agradecimento",
};

export const TEMPLATE_DEFAULTS = DEFAULTS;

export interface AppointmentLike {
  start_time: string;
  service?: { name?: string | null } | null;
  client?: { name?: string | null; phone?: string | null } | null;
  customer_name?: string | null;
  customer_phone?: string | null;
}

export function renderTemplate(key: WaTemplateKey, apt: AppointmentLike): string {
  const tpl = getTemplate(key);
  const d = new Date(apt.start_time);
  const nome = apt.client?.name || apt.customer_name || "cliente";
  const servico = apt.service?.name || "atendimento";
  return tpl
    .replaceAll("{cliente}", nome)
    .replaceAll("{data}", format(d, "dd/MM", { locale: ptBR }))
    .replaceAll("{hora}", format(d, "HH:mm"))
    .replaceAll("{servico}", servico);
}

export function waLink(apt: AppointmentLike, key: WaTemplateKey): string | null {
  const phone = (apt.client?.phone || apt.customer_phone || "").replace(/\D/g, "");
  if (!phone) return null;
  const msg = encodeURIComponent(renderTemplate(key, apt));
  const withCountry = phone.length <= 11 ? `55${phone}` : phone;
  return `https://wa.me/${withCountry}?text=${msg}`;
}

export function WaSendButton({
  apt,
  templateKey,
  label,
  size = "sm",
}: {
  apt: AppointmentLike;
  templateKey: WaTemplateKey;
  label?: string;
  size?: "sm" | "default" | "icon";
}) {
  const href = waLink(apt, templateKey);
  if (!href) return null;
  return (
    <Button
      asChild
      size={size}
      variant="outline"
      className="gap-2 text-green-500 border-green-500/30 hover:bg-green-500/10 font-black rounded-xl"
    >
      <a href={href} target="_blank" rel="noreferrer">
        <MessageCircle className="h-4 w-4" />
        {label || TEMPLATE_LABELS[templateKey]}
      </a>
    </Button>
  );
}
