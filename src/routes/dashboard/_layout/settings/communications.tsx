import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2,
  Search,
  Bell,
  CreditCard,
  Calendar,
  Wallet,
  User,
  Save,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import {
  NOTIFICATION_EVENTS,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  eventsByCategory,
  type NotificationCategory,
} from "@/lib/notifications/registry";
import { notify } from "@/lib/notifications/notify";

export const Route = createFileRoute("/dashboard/_layout/settings/communications")({
  component: CommunicationsWrapper,
});

function CommunicationsWrapper() {
  return (
    <ErrorBoundary>
      <CommunicationsPage />
    </ErrorBoundary>
  );
}

const CATEGORY_ICONS: Record<NotificationCategory, React.ReactNode> = {
  conta: <User className="h-4 w-4" />,
  assinatura: <CreditCard className="h-4 w-4" />,
  agendamento: <Calendar className="h-4 w-4" />,
  financeiro: <Wallet className="h-4 w-4" />,
};

function CommunicationsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return setLoading(false);
      setUserId(user.id);
      const { data } = await supabase
        .from("profiles")
        .select("notification_preferences")
        .eq("id", user.id)
        .maybeSingle();
      const stored = (data?.notification_preferences as Record<string, boolean> | null) ?? {};
      // Aplica defaults do catálogo para eventos ainda não definidos.
      const merged: Record<string, boolean> = {};
      for (const ev of NOTIFICATION_EVENTS) {
        merged[ev.key] = stored[ev.key] ?? ev.defaultEnabled;
      }
      setPrefs(merged);
      setLoading(false);
    })();
  }, []);

  const grouped = useMemo(() => eventsByCategory(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return grouped;
    const out: typeof grouped = { conta: [], assinatura: [], agendamento: [], financeiro: [] };
    for (const cat of Object.keys(grouped) as NotificationCategory[]) {
      out[cat] = grouped[cat].filter(
        (e) =>
          e.label.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.key.toLowerCase().includes(q),
      );
    }
    return out;
  }, [grouped, query]);

  const setPref = (key: string, v: boolean) => setPrefs((p) => ({ ...p, [key]: v }));

  const toggleCategory = (cat: NotificationCategory, v: boolean) => {
    const patch: Record<string, boolean> = {};
    for (const ev of grouped[cat]) patch[ev.key] = v;
    setPrefs((p) => ({ ...p, ...patch }));
  };

  const save = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ notification_preferences: prefs, updated_at: new Date().toISOString() } as any)
        .eq("id", userId);
      if (error) throw error;
      toast.success("Preferências de comunicação salvas");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const sendTest = async (key: string) => {
    const res = await notify(key, {
      data: {
        plano: "Profissional",
        cliente: "Cliente Teste",
        data: "amanhã",
        hora: "14:00",
        servico: "Corte",
        valor: "R$ 50,00",
        vencimento: "30/11",
      },
    });
    if (res.ok && res.delivered) toast.success("Notificação de teste enviada");
    else if (res.ok) toast.info("Este evento está desativado para você");
    else toast.error("Falha ao enviar teste");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span className="text-sm">Carregando preferências…</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-16 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" /> Central de Comunicação
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Escolha quais avisos automáticos você deseja receber.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar comunicação..."
            className="pl-9 h-10 rounded-xl"
          />
        </div>
      </header>

      {(Object.keys(filtered) as NotificationCategory[]).map((cat) => {
        const events = filtered[cat];
        if (events.length === 0) return null;
        const allOn = events.every((e) => prefs[e.key]);
        return (
          <section
            key={cat}
            className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
          >
            <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                  {CATEGORY_ICONS[cat]}
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold">{CATEGORY_LABELS[cat]}</h2>
                  <p className="text-xs text-muted-foreground truncate">
                    {CATEGORY_DESCRIPTIONS[cat]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground hidden sm:inline">Todas</span>
                <Switch checked={allOn} onCheckedChange={(v) => toggleCategory(cat, v)} />
              </div>
            </header>
            <ul className="divide-y divide-border">
              {events.map((ev) => (
                <li key={ev.key} className="flex items-center gap-4 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{ev.label}</p>
                    <p className="text-xs text-muted-foreground">{ev.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {ev.channels.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] uppercase tracking-wide font-medium px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border"
                        >
                          {channelLabel(c)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => sendTest(ev.key)}
                    className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary shrink-0"
                    title="Enviar notificação de teste"
                  >
                    <Send className="h-3.5 w-3.5" /> Testar
                  </button>
                  <Switch checked={!!prefs[ev.key]} onCheckedChange={(v) => setPref(ev.key, v)} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <div className="rounded-xl border border-border bg-secondary/30 p-4 text-xs text-muted-foreground">
        E-mail é o canal principal hoje. WhatsApp e SMS estão preparados na arquitetura e serão
        ativados nas próximas integrações.
      </div>

      <div className="sticky bottom-4 flex justify-end">
        <Button onClick={save} disabled={saving} className="h-11 rounded-xl px-6 shadow-lg">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Salvar preferências
        </Button>
      </div>
    </div>
  );
}

function channelLabel(c: string) {
  switch (c) {
    case "email":
      return "E-mail";
    case "in_app":
      return "No app";
    case "whatsapp":
      return "WhatsApp";
    case "sms":
      return "SMS";
    default:
      return c;
  }
}
