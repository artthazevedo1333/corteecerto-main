import "../_libs/react.mjs";
import { a as format, p as ptBR } from "../_libs/date-fns.mjs";
const DEFAULTS = {
  confirm: "Olá {cliente}! Seu horário está *confirmado* para {data} às {hora} — {servico}. Qualquer coisa é só chamar. ✂️",
  reminder: "Oi {cliente}, passando para lembrar do seu horário amanhã ({data} às {hora}) — {servico}. Até lá! 💈",
  cancel: "Olá {cliente}, precisamos cancelar seu horário de {data} às {hora}. Podemos remarcar? 🙏",
  thanks: "Obrigado pela visita, {cliente}! Agradecemos a preferência. Já quer deixar seu próximo horário marcado? 🙌"
};
const STORAGE_KEY = "wa_templates_v1";
function getTemplate(key) {
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
function getAllTemplates() {
  return {
    confirm: getTemplate("confirm"),
    reminder: getTemplate("reminder"),
    cancel: getTemplate("cancel"),
    thanks: getTemplate("thanks")
  };
}
function saveTemplates(t) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
}
function resetTemplates() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
const TEMPLATE_LABELS = {
  confirm: "Confirmação",
  reminder: "Lembrete",
  cancel: "Cancelamento",
  thanks: "Agradecimento"
};
const TEMPLATE_DEFAULTS = DEFAULTS;
function renderTemplate(key, apt) {
  const tpl = getTemplate(key);
  const d = new Date(apt.start_time);
  const nome = apt.client?.name || apt.customer_name || "cliente";
  const servico = apt.service?.name || "atendimento";
  return tpl.replaceAll("{cliente}", nome).replaceAll("{data}", format(d, "dd/MM", { locale: ptBR })).replaceAll("{hora}", format(d, "HH:mm")).replaceAll("{servico}", servico);
}
function waLink(apt, key) {
  const phone = (apt.client?.phone || apt.customer_phone || "").replace(/\D/g, "");
  if (!phone) return null;
  const msg = encodeURIComponent(renderTemplate(key, apt));
  const withCountry = phone.length <= 11 ? `55${phone}` : phone;
  return `https://wa.me/${withCountry}?text=${msg}`;
}
export {
  TEMPLATE_LABELS as T,
  TEMPLATE_DEFAULTS as a,
  getAllTemplates as g,
  resetTemplates as r,
  saveTemplates as s,
  waLink as w
};
