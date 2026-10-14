import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, d as Button, C as Card, e as CardContent, f as CardHeader, g as CardTitle, T as Textarea } from "./router-DONcpGkq.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { S as Switch } from "./switch-Dj_mi93B.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getAllTemplates, T as TEMPLATE_LABELS, s as saveTemplates, r as resetTemplates, a as TEMPLATE_DEFAULTS } from "./wa-templates-DoWwHxz5.mjs";
import { L as LoaderCircle, J as Calendar, O as Package, m as TriangleAlert, aL as Save, M as MessageCircle, aM as RotateCcw } from "../_libs/lucide-react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/date-fns.mjs";
function NotificationSettingsPageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationSettingsPage, {}) });
}
function NotificationSettingsPage() {
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        data,
        error
      } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      toast.error("Erro ao carregar preferências");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      const {
        error
      } = await supabase.from("profiles").update({
        notification_preferences: profile.notification_preferences,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", profile.id);
      if (error) throw error;
      toast.success("Preferências atualizadas!");
    } catch (error) {
      toast.error("Erro ao salvar alterações");
    } finally {
      setSaving(false);
    }
  };
  const togglePreference = (key) => {
    const newPrefs = {
      ...profile.notification_preferences
    };
    newPrefs[key] = !newPrefs[key];
    setProfile({
      ...profile,
      notification_preferences: newPrefs
    });
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary mb-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-black text-muted-foreground uppercase tracking-widest", children: "Carregando preferências..." })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-3xl mx-auto pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight uppercase italic", children: "Notificações & Alertas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-lg", children: "Escolha quais avisos você deseja receber no sistema." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PreferenceCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-6 w-6 text-primary" }), title: "Lembretes de Agenda", description: "Avisos sobre próximos horários e mudanças nos agendamentos.", checked: profile?.notification_preferences?.reminders, onCheckedChange: () => togglePreference("reminders") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PreferenceCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6 text-orange-500" }), title: "Alertas de Estoque", description: "Avisos automáticos quando um produto atingir o nível crítico de estoque.", checked: profile?.notification_preferences?.stock_alerts, onCheckedChange: () => togglePreference("stock_alerts") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PreferenceCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-6 w-6 text-yellow-500" }), title: "Clientes em Risco", description: "Notificações sobre clientes frequentes que não aparecem há mais de 30 dias.", checked: profile?.notification_preferences?.risk_clients, onCheckedChange: () => togglePreference("risk_clients") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppTemplates, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSave, className: "h-16 px-10 rounded-2xl font-black text-lg uppercase italic shadow-2xl shadow-primary/20 gap-3 w-full md:w-auto", disabled: saving, children: [
      saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-6 w-6" }),
      "SALVAR PREFERÊNCIAS"
    ] }) })
  ] });
}
function WhatsAppTemplates() {
  const [tpl, setTpl] = reactExports.useState(() => getAllTemplates());
  const keys = ["confirm", "reminder", "cancel", "thanks"];
  const update = (k, v) => setTpl((prev) => ({
    ...prev,
    [k]: v
  }));
  const save = () => {
    saveTemplates(tpl);
    toast.success("Templates salvos");
  };
  const reset = () => {
    resetTemplates();
    setTpl({
      ...TEMPLATE_DEFAULTS
    });
    toast.success("Templates restaurados");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-3 text-xl font-black uppercase italic tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-6 w-6 text-green-500" }),
        "Templates de WhatsApp"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-medium", children: [
        "Personalize as mensagens automáticas. Variáveis: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "{cliente}" }),
        ",",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "{data}" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "{hora}" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "{servico}" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
      keys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground", children: TEMPLATE_LABELS[k] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: tpl[k], onChange: (e) => update(k, e.target.value), rows: 3, className: "rounded-xl font-medium" })
      ] }, k)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, className: "h-12 rounded-xl font-black gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " SALVAR TEMPLATES"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: reset, variant: "outline", className: "h-12 rounded-xl font-black gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
          " RESTAURAR PADRÃO"
        ] })
      ] })
    ] })
  ] });
}
function PreferenceCard({
  icon,
  title,
  description,
  checked,
  onCheckedChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[2rem] border-border bg-card shadow-sm hover:border-primary/20 transition-all overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 flex items-center justify-between gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center border border-border shrink-0 mt-1", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase italic tracking-tight", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-base leading-tight mt-1", children: description })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked, onCheckedChange, className: "scale-125" })
  ] }) });
}
export {
  NotificationSettingsPageWrapper as component
};
