// Despachante central de notificações.
// Respeita preferências do usuário (profiles.notification_preferences),
// grava histórico em uma tabela leve (quando disponível) e delega o
// envio real ao canal correspondente. Preparado para integrações futuras
// com WhatsApp / SMS.

import { supabase } from "@/integrations/supabase/client";
import { findEvent, interpolate, type NotificationChannel } from "./registry";

export type NotifyOptions = {
  userId?: string;
  data?: Record<string, unknown>;
  channels?: NotificationChannel[]; // sobrescreve os padrões do evento
  silent?: boolean; // não grava histórico
};

export async function notify(eventKey: string, options: NotifyOptions = {}) {
  const event = findEvent(eventKey);
  if (!event) {
    console.warn(`[notify] evento desconhecido: ${eventKey}`);
    return { ok: false, reason: "unknown_event" as const };
  }

  // Descobre o usuário destino.
  let userId = options.userId;
  if (!userId) {
    const { data } = await supabase.auth.getUser();
    userId = data.user?.id;
  }
  if (!userId) return { ok: false, reason: "no_user" as const };

  // Lê preferências.
  const { data: profile } = await supabase
    .from("profiles")
    .select("notification_preferences, full_name")
    .eq("id", userId)
    .maybeSingle();

  const prefs = (profile?.notification_preferences as Record<string, boolean> | null) ?? {};
  const enabled = prefs[event.key] ?? event.defaultEnabled;
  if (!enabled) return { ok: true, delivered: false, reason: "disabled" as const };

  // Renderiza template.
  const payload = { nome: profile?.full_name ?? "você", ...(options.data ?? {}) };
  const subject = interpolate(event.template.subject, payload);
  const body = interpolate(event.template.body, payload);

  const channels = options.channels ?? event.channels;

  // Log central — a interface consome via realtime.
  if (!options.silent) {
    // Nota: gravação best-effort. Se a tabela não existir, silenciosamente ignora.
    await (supabase as any)
      .from("notification_log")
      .insert({
        user_id: userId,
        event_key: event.key,
        subject,
        body,
        channels,
        status: "queued",
      })
      .then(
        () => {},
        () => {},
      );
  }

  // Canais reais são despachados por workers/edge functions externos.
  // Aqui apenas encaminhamos ao console para desenvolvimento.
  if (import.meta.env.DEV) {
    console.info("[notify]", { event: event.key, channels, subject, body, payload });
  }

  return { ok: true, delivered: true, channels, subject, body };
}
