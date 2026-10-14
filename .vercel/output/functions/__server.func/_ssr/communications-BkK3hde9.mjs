import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, I as Input, d as Button } from "./router-DONcpGkq.mjs";
import { S as Switch } from "./switch-Dj_mi93B.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { L as LoaderCircle, ap as Bell, r as Search, S as Send, aL as Save, ao as Wallet, J as Calendar, a0 as CreditCard, a9 as User } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
const CATEGORY_LABELS = {
  conta: "Conta",
  assinatura: "Assinatura",
  agendamento: "Agendamentos",
  financeiro: "Financeiro"
};
const CATEGORY_DESCRIPTIONS = {
  conta: "Boas-vindas, senhas e acesso ao sistema.",
  assinatura: "Cobranças, renovações e alterações de plano.",
  agendamento: "Novos horários, confirmações e lembretes.",
  financeiro: "Recebimentos e cobranças da sua barbearia."
};
const NOTIFICATION_EVENTS = [
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
      body: "Olá {nome}, sua conta foi criada com sucesso. Estamos felizes em ter você por aqui."
    }
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
      body: "Confirme seu e-mail para começar a usar o sistema."
    }
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
      body: "Recebemos uma solicitação para redefinir sua senha."
    }
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
      body: "Sua senha foi atualizada com sucesso. Caso não tenha sido você, entre em contato conosco."
    }
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
      body: "Aceite o convite para acessar o painel da equipe."
    }
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
      body: "Seja bem-vindo ao plano {plano}. Sua assinatura está ativa."
    }
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
      body: "Seu pagamento foi confirmado. Sua assinatura continua ativa."
    }
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
      body: "Regularize o pagamento para manter o acesso completo ao Corte Certo."
    }
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
      body: "Seu plano {plano} foi renovado até {vencimento}."
    }
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
      body: "Agora você está no plano {plano}."
    }
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
      body: "Sentiremos sua falta. Você continua com acesso até {vencimento}."
    }
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
      body: "Regularize seu pagamento para reativar o acesso completo."
    }
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
      body: "Tudo certo! Sua assinatura está novamente ativa."
    }
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
      body: "{cliente} agendou {servico} para {data} às {hora}."
    }
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
      body: "Seu horário está confirmado para {data} às {hora}."
    }
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
      body: "O horário de {data} às {hora} foi cancelado."
    }
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
      body: "Seu horário foi remarcado para {data} às {hora}."
    }
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
      body: "Passando para lembrar do seu horário em {data} às {hora}."
    }
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
      body: "Entrada de {valor} registrada com sucesso."
    }
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
      body: "A cobrança de {valor} está em aberto."
    }
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
      body: "A cobrança de {valor} venceu em {data}."
    }
  }
];
function eventsByCategory() {
  const out = {
    conta: [],
    assinatura: [],
    agendamento: [],
    financeiro: []
  };
  for (const ev of NOTIFICATION_EVENTS) out[ev.category].push(ev);
  return out;
}
function findEvent(key) {
  return NOTIFICATION_EVENTS.find((e) => e.key === key);
}
function interpolate(template, data) {
  return template.replace(/\{(\w+)\}/g, (_, k) => {
    const v = data?.[k];
    return v === void 0 || v === null ? `{${k}}` : String(v);
  });
}
async function notify(eventKey, options = {}) {
  const event = findEvent(eventKey);
  if (!event) {
    console.warn(`[notify] evento desconhecido: ${eventKey}`);
    return { ok: false, reason: "unknown_event" };
  }
  let userId = options.userId;
  if (!userId) {
    const { data } = await supabase.auth.getUser();
    userId = data.user?.id;
  }
  if (!userId) return { ok: false, reason: "no_user" };
  const { data: profile } = await supabase.from("profiles").select("notification_preferences, full_name").eq("id", userId).maybeSingle();
  const prefs = profile?.notification_preferences ?? {};
  const enabled = prefs[event.key] ?? event.defaultEnabled;
  if (!enabled) return { ok: true, delivered: false, reason: "disabled" };
  const payload = { nome: profile?.full_name ?? "você", ...options.data ?? {} };
  const subject = interpolate(event.template.subject, payload);
  const body = interpolate(event.template.body, payload);
  const channels = options.channels ?? event.channels;
  if (!options.silent) {
    await supabase.from("notification_log").insert({
      user_id: userId,
      event_key: event.key,
      subject,
      body,
      channels,
      status: "queued"
    }).then(
      () => {
      },
      () => {
      }
    );
  }
  return { ok: true, delivered: true, channels, subject, body };
}
function CommunicationsWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommunicationsPage, {}) });
}
const CATEGORY_ICONS = {
  conta: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
  assinatura: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
  agendamento: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
  financeiro: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4" })
};
function CommunicationsPage() {
  const [userId, setUserId] = reactExports.useState(null);
  const [prefs, setPrefs] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  reactExports.useEffect(() => {
    (async () => {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return setLoading(false);
      setUserId(user.id);
      const {
        data
      } = await supabase.from("profiles").select("notification_preferences").eq("id", user.id).maybeSingle();
      const stored = data?.notification_preferences ?? {};
      const merged = {};
      for (const ev of NOTIFICATION_EVENTS) {
        merged[ev.key] = stored[ev.key] ?? ev.defaultEnabled;
      }
      setPrefs(merged);
      setLoading(false);
    })();
  }, []);
  const grouped = reactExports.useMemo(() => eventsByCategory(), []);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return grouped;
    const out = {
      conta: [],
      assinatura: [],
      agendamento: [],
      financeiro: []
    };
    for (const cat of Object.keys(grouped)) {
      out[cat] = grouped[cat].filter((e) => e.label.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.key.toLowerCase().includes(q));
    }
    return out;
  }, [grouped, query]);
  const setPref = (key, v) => setPrefs((p) => ({
    ...p,
    [key]: v
  }));
  const toggleCategory = (cat, v) => {
    const patch = {};
    for (const ev of grouped[cat]) patch[ev.key] = v;
    setPrefs((p) => ({
      ...p,
      ...patch
    }));
  };
  const save = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      const {
        error
      } = await supabase.from("profiles").update({
        notification_preferences: prefs,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", userId);
      if (error) throw error;
      toast.success("Preferências de comunicação salvas");
    } catch (err) {
      toast.error(err?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };
  const sendTest = async (key) => {
    const res = await notify(key, {
      data: {
        plano: "Profissional",
        cliente: "Cliente Teste",
        data: "amanhã",
        hora: "14:00",
        servico: "Corte",
        valor: "R$ 50,00",
        vencimento: "30/11"
      }
    });
    if (res.ok && res.delivered) toast.success("Notificação de teste enviada");
    else if (res.ok) toast.info("Este evento está desativado para você");
    else toast.error("Falha ao enviar teste");
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-24 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mr-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Carregando preferências…" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto pb-16 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl md:text-[28px] font-semibold tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-6 w-6 text-primary" }),
          " Central de Comunicação"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Escolha quais avisos automáticos você deseja receber." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Buscar comunicação...", className: "pl-9 h-10 rounded-xl" })
      ] })
    ] }),
    Object.keys(filtered).map((cat) => {
      const events = filtered[cat];
      if (events.length === 0) return null;
      const allOn = events.every((e) => prefs[e.key]);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0", children: CATEGORY_ICONS[cat] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold", children: CATEGORY_LABELS[cat] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: CATEGORY_DESCRIPTIONS[cat] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground hidden sm:inline", children: "Todas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: allOn, onCheckedChange: (v) => toggleCategory(cat, v) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: events.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: ev.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: ev.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-1.5", children: ev.channels.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wide font-medium px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border", children: channelLabel(c) }, c)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => sendTest(ev.key), className: "hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary shrink-0", title: "Enviar notificação de teste", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }),
            " Testar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: !!prefs[ev.key], onCheckedChange: (v) => setPref(ev.key, v) })
        ] }, ev.key)) })
      ] }, cat);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-secondary/30 p-4 text-xs text-muted-foreground", children: "E-mail é o canal principal hoje. WhatsApp e SMS estão preparados na arquitetura e serão ativados nas próximas integrações." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky bottom-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving, className: "h-11 rounded-xl px-6 shadow-lg", children: [
      saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
      "Salvar preferências"
    ] }) })
  ] });
}
function channelLabel(c) {
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
export {
  CommunicationsWrapper as component
};
