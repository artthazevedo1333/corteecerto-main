import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { E as ErrorBoundary, d as Button, C as Card, e as CardContent, f as CardHeader, g as CardTitle } from "./router-DONcpGkq.mjs";
import { u as useModules } from "./use-modules-Coxz0RSf.mjs";
import { u as useDashboardData, N as NextAppointment } from "./NextAppointment-CdU305Kl.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import "../_libs/sonner.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { D as DollarSign, p as TrendingUp, m as TriangleAlert, ah as Star, _ as Zap, a8 as Clock, O as Package, J as Calendar, ai as UserCheck, o as CircleX, l as Sparkles, ab as ArrowRight, aj as CalendarPlus, a3 as UserPlus, F as Scissors, x as Target, ak as Cake, M as MessageCircle, f as ChevronRight, a9 as User } from "../_libs/lucide-react.mjs";
import { s as startOfToday, e as endOfToday, a as format, p as ptBR, b as parseISO, d as differenceInDays } from "../_libs/date-fns.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./use-subscription-DyCgx5h8.mjs";
import "./subscription-D6ZG8HOt.mjs";
import "../_libs/i18next.mjs";
function useClientRetention() {
  const [inactiveClients, setInactiveClients] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const loadData = async () => {
    try {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (!user) {
        setInactiveClients([]);
        return;
      }
      const { data: clients } = await supabase.from("clients").select("id, name, phone, last_visit").eq("user_id", user.id).not("last_visit", "is", null).order("last_visit", { ascending: true });
      if (!clients) {
        setInactiveClients([]);
        return;
      }
      const now = /* @__PURE__ */ new Date();
      const analyzedClients = clients.map((client) => {
        const lastVisit = parseISO(client.last_visit);
        const daysSince = differenceInDays(now, lastVisit);
        const frequency = 30;
        let risk = "green";
        if (daysSince > frequency * 2) {
          risk = "red";
        } else if (daysSince > frequency) {
          risk = "yellow";
        }
        return {
          id: client.id,
          name: client.name,
          phone: client.phone || "",
          last_visit: client.last_visit,
          days_since_last_visit: daysSince,
          risk_level: risk,
          frequency_days: frequency
        };
      });
      setInactiveClients(analyzedClients.filter((c) => c.risk_level !== "green"));
    } catch (error) {
      console.error("Error loading retention data:", error);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    loadData();
  }, []);
  return { inactiveClients, loading, refresh: loadData };
}
function FinancialGoal({ current, goal }) {
  const safeCurrent = Number(current) || 0;
  const safeGoal = Number(goal) || 0;
  const percent = safeGoal > 0 ? Math.min(Math.round(safeCurrent / safeGoal * 100), 100) : 0;
  const remaining = Math.max(safeGoal - safeCurrent, 0);
  const now = /* @__PURE__ */ new Date();
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const dailyPace = dayOfMonth > 0 ? safeCurrent / dayOfMonth : 0;
  const projected = Math.round(dailyPace * daysInMonth);
  const daysToReach = dailyPace > 0 && remaining > 0 ? Math.ceil(remaining / dailyPace) : 0;
  const daysLeftInMonth = daysInMonth - dayOfMonth;
  const currency2 = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });
  const forecastLabel = safeGoal === 0 ? "Defina uma meta em Configurações" : percent >= 100 ? "Meta alcançada este mês 🎉" : daysToReach === 0 ? "Sem dados suficientes ainda" : daysToReach <= daysLeftInMonth ? `No ritmo atual, meta em ${daysToReach} dia${daysToReach > 1 ? "s" : ""}` : `No ritmo atual, projeção de ${currency2.format(projected)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group rounded-3xl border-border bg-card shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-primary/10 p-2.5 ring-1 ring-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Meta mensal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            currency2.format(safeCurrent),
            " de ",
            currency2.format(safeGoal)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold tracking-tight tabular-nums", children: [
        percent,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-muted-foreground", children: "%" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary",
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": percent,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-700 ease-out",
            style: { width: `${percent}%` }
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-secondary/50 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: "Faltam" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold tabular-nums mt-1", children: currency2.format(remaining) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary/5 p-3 ring-1 ring-primary/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-primary/80", children: "Projeção" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold tabular-nums mt-1 text-primary", children: currency2.format(projected) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: forecastLabel })
    ] })
  ] }) });
}
function TopServices({ services }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-border bg-card shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl font-black uppercase italic tracking-tight flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-green-500" }),
      "Serviços em Alta"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: services.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: services.map((service, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-secondary flex items-center justify-center border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-sm uppercase italic", children: service.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-medium", children: [
                service.count,
                " atendimentos"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-black text-sm", children: [
              "R$ ",
              service.revenue.toLocaleString("pt-BR")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-bold text-green-500", children: "Mês" })
          ] })
        ]
      },
      index
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-muted-foreground italic font-medium", children: "Nenhum serviço registrado este mês." }) })
  ] });
}
function InactiveClients({ clients }) {
  const sendWhatsApp = (phone, name) => {
    const message = encodeURIComponent(
      `Olá, ${name}! Tudo bem? Sentimos sua falta aqui na barbearia. Que tal agendar um horário para esta semana?`
    );
    window.open(`https://wa.me/55${phone.replace(/\D/g, "")}?text=${message}`, "_blank");
  };
  const getRiskColor = (risk) => {
    switch (risk) {
      case "red":
        return "bg-destructive text-destructive-foreground";
      case "yellow":
        return "bg-yellow-500 text-black";
      default:
        return "bg-green-500 text-primary-foreground";
    }
  };
  const getRiskLabel = (risk) => {
    switch (risk) {
      case "red":
        return "CRÍTICO (+60 dias)";
      case "yellow":
        return "EM RISCO (+30 dias)";
      default:
        return "OK";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-border bg-card shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 flex flex-row items-center justify-between space-y-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl font-black uppercase italic tracking-tight flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-yellow-500" }),
        "Recuperar Clientes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/dashboard/clients",
          className: "text-primary hover:underline font-black flex items-center gap-1 text-[10px] uppercase tracking-widest",
          children: [
            "Ver todos ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: clients.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: clients.slice(0, 5).map((client) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-secondary flex items-center justify-center border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-6 w-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-sm italic break-words", children: client.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[8px] font-black px-1.5 py-0.5 rounded-full ${getRiskColor(client.risk_level)}`,
                    children: getRiskLabel(client.risk_level)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-medium", children: [
                "Última visita: ",
                format(parseISO(client.last_visit), "dd/MM/yy")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "rounded-xl h-9 font-black text-[10px] gap-2 border-primary/20 hover:bg-primary hover:text-white",
              onClick: () => sendWhatsApp(client.phone, client.name),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
                "RECUPERAR"
              ]
            }
          )
        ]
      },
      client.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8 text-muted-foreground/30" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase italic tracking-tight", children: "Tudo em dia!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium mt-1", children: "Nenhum cliente em risco de perda." })
    ] }) })
  ] });
}
function BirthdayCard({ birthdays }) {
  if (birthdays.length === 0) return null;
  const sendWhatsApp = (phone, name) => {
    const message = encodeURIComponent(
      `Parabéns, ${name}! 🎉 O Corte Certo deseja um feliz aniversário! Que tal dar aquele trato no visual hoje?`
    );
    window.open(`https://wa.me/55${phone.replace(/\D/g, "")}?text=${message}`, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[2rem] border-none bg-gradient-to-br from-pink-500/10 to-orange-500/10 shadow-sm overflow-hidden border border-pink-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cake, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase italic tracking-tight", children: "Aniversariantes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Não esqueça de parabenizar!" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: birthdays.map((client) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between p-3 rounded-2xl bg-white/50 border border-pink-500/10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-sm italic break-words", children: client.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "rounded-xl h-9 px-4 font-black text-xs gap-2 hover:bg-pink-500 hover:text-white",
              onClick: () => sendWhatsApp(client.phone, client.name),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
                "PARABENIZAR"
              ]
            }
          )
        ]
      },
      client.id
    )) })
  ] }) });
}
const actions = [
  {
    label: "Agendar",
    icon: CalendarPlus,
    to: "/dashboard/agenda",
    color: "text-blue-600 bg-blue-500/10"
  },
  {
    label: "Novo cliente",
    icon: UserPlus,
    to: "/dashboard/clients",
    color: "text-emerald-600 bg-emerald-500/10"
  },
  {
    label: "Novo serviço",
    icon: Scissors,
    to: "/dashboard/services",
    color: "text-violet-600 bg-violet-500/10"
  },
  {
    label: "Nova venda",
    icon: DollarSign,
    to: "/dashboard/finance",
    color: "text-amber-600 bg-amber-500/10"
  }
];
function QuickActions() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: actions.map((a) => {
    const Icon = a.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: a.to,
        className: "group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-105 ${a.color}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold leading-tight", children: a.label })
        ]
      },
      a.label
    );
  }) });
}
const currency$1 = (v) => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0
}).format(v || 0);
function greeting() {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}
function SmartDaySummary() {
  const { t } = useTranslation();
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        const user = auth?.user;
        if (!user) {
          if (mounted) setLoading(false);
          return;
        }
        const now = /* @__PURE__ */ new Date();
        const sToday = startOfToday().toISOString();
        const eToday = endOfToday().toISOString();
        const [{ data: appts }, { data: products }] = await Promise.all([
          supabase.from("appointments").select("start_time, status, service:services(price), client:clients(name)").eq("user_id", user.id).gte("start_time", sToday).lte("start_time", eToday).order("start_time", { ascending: true }),
          supabase.from("products").select("current_stock, min_stock").eq("user_id", user.id)
        ]);
        const list = appts || [];
        const completed = list.filter((a) => a.status === "completed");
        const scheduled = list.filter(
          (a) => a.status === "scheduled" || a.status === "in_progress"
        );
        const pending = list.filter((a) => a.status === "pending");
        const cancelled = list.filter((a) => a.status === "cancelled" || a.status === "no_show");
        const expectedRevenue = completed.reduce((s, a) => s + (a.service?.price || 0), 0) + scheduled.reduce((s, a) => s + (a.service?.price || 0), 0);
        const upcoming = scheduled.find((a) => new Date(a.start_time) >= now);
        const lowStock = (products || []).filter(
          (p) => (p.current_stock ?? 0) <= (p.min_stock ?? 0)
        ).length;
        if (!mounted) return;
        setData({
          totalToday: list.length,
          completedToday: completed.length,
          scheduledToday: scheduled.length,
          pendingConfirmation: pending.length,
          cancelledToday: cancelled.length,
          expectedRevenue,
          lowStock,
          nextClient: upcoming ? {
            name: upcoming.client?.name || "Cliente",
            time: format(new Date(upcoming.start_time), "HH:mm", { locale: ptBR })
          } : null
        });
      } catch (e) {
        console.error("[SmartDaySummary] error", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const message = reactExports.useMemo(() => {
    if (!data) return "";
    const { totalToday, pendingConfirmation, lowStock, scheduledToday, cancelledToday } = data;
    if (pendingConfirmation > 0)
      return `Você tem ${pendingConfirmation} ${pendingConfirmation === 1 ? "cliente" : "clientes"} aguardando confirmação.`;
    if (lowStock > 0) return "Seu estoque precisa de atenção.";
    if (totalToday === 0)
      return "Nenhum atendimento hoje. Ótimo momento para divulgar horários livres.";
    if (totalToday >= 8) return "Hoje será um dia movimentado. Mantenha o ritmo!";
    if (scheduledToday === 0 && totalToday > 0) return "Seu dia está praticamente completo.";
    if (cancelledToday >= 2) return "Alguns cancelamentos hoje. Considere reabrir horários.";
    return "Seu dia está sob controle. Bom trabalho!";
  }, [data]);
  const action = reactExports.useMemo(() => {
    if (!data) return null;
    if (data.pendingConfirmation > 0)
      return { label: "Confirmar clientes", to: "/dashboard/agenda", icon: UserCheck };
    if (data.lowStock > 0)
      return { label: "Ver estoque", to: "/dashboard/inventory", icon: Package };
    if (data.scheduledToday > 0)
      return { label: "Abrir agenda", to: "/dashboard/agenda", icon: Calendar };
    return { label: "Registrar venda", to: "/dashboard/finance", icon: DollarSign };
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-3xl border-border bg-card shadow-sm animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 h-40" }) });
  }
  if (!data || data.totalToday === 0 && data.lowStock === 0 && data.pendingConfirmation === 0) ;
  const items = [
    {
      key: "count",
      label: "Atendimentos",
      value: String(data?.totalToday ?? 0),
      icon: Calendar,
      show: (data?.totalToday ?? 0) > 0
    },
    {
      key: "revenue",
      label: "Previsão do dia",
      value: currency$1(data?.expectedRevenue ?? 0),
      icon: DollarSign,
      show: (data?.expectedRevenue ?? 0) > 0
    },
    {
      key: "next",
      label: "Próximo cliente",
      value: data?.nextClient ? `${data.nextClient.time} · ${data.nextClient.name}` : "",
      icon: Clock,
      show: !!data?.nextClient
    },
    {
      key: "pending",
      label: "Aguardando confirmação",
      value: String(data?.pendingConfirmation ?? 0),
      icon: UserCheck,
      show: (data?.pendingConfirmation ?? 0) > 0
    },
    {
      key: "cancelled",
      label: "Cancelamentos hoje",
      value: String(data?.cancelledToday ?? 0),
      icon: CircleX,
      show: (data?.cancelledToday ?? 0) > 0
    },
    {
      key: "stock",
      label: "Estoque baixo",
      value: String(data?.lowStock ?? 0),
      icon: Package,
      show: (data?.lowStock ?? 0) > 0
    }
  ].filter((i) => i.show);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-3xl border-border bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Resumo inteligente do dia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-base md:text-lg font-semibold leading-snug text-foreground", children: [
            greeting(),
            "! ",
            message
          ] })
        ] })
      ] }),
      action && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          size: "sm",
          variant: "outline",
          className: "shrink-0 rounded-xl gap-1.5 hidden sm:inline-flex",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: action.to, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { className: "h-4 w-4" }),
            action.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] })
        }
      )
    ] }),
    items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl border border-border/60 bg-secondary/30 p-3 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-background text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground truncate", children: it.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold tabular-nums truncate", children: it.value })
          ] })
        ]
      },
      it.key
    )) }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        asChild: true,
        size: "sm",
        variant: "outline",
        className: "w-full rounded-xl gap-1.5 sm:hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: action.to, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { className: "h-4 w-4" }),
          action.label
        ] })
      }
    )
  ] }) });
}
function DashboardHomeWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardHome, {}) });
}
const currency = (v) => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0
}).format(v || 0);
function DashboardHome() {
  const {
    t
  } = useTranslation();
  const [userName, setUserName] = reactExports.useState("Barbeiro");
  const {
    isEnabled
  } = useModules();
  const {
    nextAppointment,
    today,
    week,
    month,
    topServices,
    birthdays,
    lowStockCount,
    loading,
    refresh
  } = useDashboardData();
  const {
    inactiveClients
  } = useClientRetention();
  reactExports.useEffect(() => {
    const getProfile = async () => {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (user) {
        setUserName(user.user_metadata?.full_name?.split(" ")[0] || "Barbeiro");
      }
    };
    getProfile();
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-10 animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-72 bg-secondary rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 grid-cols-2 lg:grid-cols-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 bg-secondary rounded-3xl" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 w-full bg-secondary rounded-3xl" })
    ] });
  }
  const goalPercent = month.goal > 0 ? Math.round(month.revenue / month.goal * 100) : 0;
  const avgTicket = month.count > 0 ? month.revenue / month.count : 0;
  const statCards = [{
    key: "revenue_today",
    labelKey: "Faturamento hoje",
    value: currency(today.revenue),
    hintKey: today.count === 1 ? `${today.count} atendimento` : `${today.count} atendimentos`,
    hintOptions: {
      count: today.count
    },
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5 text-emerald-600" }),
    accent: "bg-emerald-500/10"
  }, {
    key: "monthly_goal",
    labelKey: "Meta mensal",
    value: `${goalPercent}%`,
    hintKey: `${currency(month.revenue)} de ${currency(month.goal)}`,
    hintOptions: {
      current: currency(month.revenue),
      goal: currency(month.goal)
    },
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-primary" }),
    accent: "bg-primary/10"
  }, {
    key: "clients_at_risk",
    labelKey: "Clientes em risco",
    value: inactiveClients.length.toString(),
    hintKey: "Precisam de atenção",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-orange-500" }),
    accent: "bg-orange-500/10",
    alert: inactiveClients.length > 0
  }, {
    key: "average_ticket",
    labelKey: "Ticket médio",
    value: currency(avgTicket),
    hintKey: `Base de ${month.count} atend.`,
    hintOptions: {
      count: month.count
    },
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-amber-500" }),
    accent: "bg-amber-500/10"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-16 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "truncate text-3xl md:text-4xl font-bold tracking-tight", children: [
          "Olá, ",
          userName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm md:text-base text-muted-foreground", children: "Aqui está sua barbearia em tempo real." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "shrink-0 rounded-2xl h-11 md:h-12 px-4 md:px-6 gap-2 shadow-sm shadow-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/barber-mode", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 fill-current" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Modo Barbeiro" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid gap-4 grid-cols-2 lg:grid-cols-4", children: statCards.map((metric) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: metric.labelKey, value: metric.value, hint: metric.hintKey, icon: metric.icon, accent: metric.accent, alert: metric.alert }, metric.key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SmartDaySummary, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuickActions, {}) }),
    isEnabled("agenda") && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Próximo atendimento" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/agenda", className: "text-sm font-medium text-primary hover:underline", children: "Ver agenda →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NextAppointment, { appointment: nextAppointment, onUpdate: refresh })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid gap-6 ${isEnabled("finance") ? "md:grid-cols-2" : "md:grid-cols-1"}`, children: [
          isEnabled("finance") && /* @__PURE__ */ jsxRuntimeExports.jsx(FinancialGoal, { current: month.revenue, goal: month.goal }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BirthdayCard, { birthdays })
        ] }),
        (isEnabled("services") || isEnabled("recovery")) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid gap-6 ${isEnabled("services") && isEnabled("recovery") ? "md:grid-cols-2" : "md:grid-cols-1"}`, children: [
          isEnabled("services") && /* @__PURE__ */ jsxRuntimeExports.jsx(TopServices, { services: topServices }),
          isEnabled("recovery") && /* @__PURE__ */ jsxRuntimeExports.jsx(InactiveClients, { clients: inactiveClients })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6", children: [
        isEnabled("inventory") && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-3xl border-border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${lowStockCount > 0 ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Estoque" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold tabular-nums leading-tight", children: [
                lowStockCount,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-xs font-medium text-muted-foreground", children: "em alerta" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "shrink-0 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/inventory", children: "Abrir" }) })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-3xl border-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-white/15 p-2 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider opacity-90", children: "Insights" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold leading-tight", children: "Cresça sua barbearia com dados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90 leading-relaxed", children: "A Corte Certo AI analisa seu movimento e sugere ações concretas para elevar seu faturamento." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "secondary", className: "w-full rounded-xl bg-white text-primary hover:bg-white/90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/ai", children: "Ver insights" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-3xl border-border bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Semana" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold tabular-nums", children: currency(week.revenue) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: week.count === 1 ? `${week.count} atendimento` : `${week.count} atendimentos` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/reports", className: "text-xs font-medium text-primary hover:underline", children: "Relatórios →" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
function StatCard({
  label,
  value,
  hint,
  icon,
  accent,
  alert
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `group rounded-3xl border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${alert ? "ring-2 ring-red-500/60 border-red-500/30" : "border-border"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-10 w-10 place-items-center rounded-2xl transition-transform group-hover:scale-105 ${accent}`, children: icon }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold tracking-tight tabular-nums", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: hint })
    ] })
  ] }) });
}
export {
  DashboardHomeWrapper as component
};
