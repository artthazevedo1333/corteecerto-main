import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, d as Button } from "./router-DONcpGkq.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { c as startOfDay, g as subDays, h as endOfDay, a as format, i as eachDayOfInterval } from "../_libs/date-fns.mjs";
import { as as Download, ao as Wallet, p as TrendingUp, l as Sparkles, a1 as Percent, F as Scissors, U as Users, N as ChartColumn } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, a as Bar, P as PieChart, b as Pie, c as Cell } from "../_libs/recharts.mjs";
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
import "../_libs/i18next.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function ReportsPage() {
  const {
    t
  } = useTranslation();
  const [period, setPeriod] = reactExports.useState(30);
  const [loading, setLoading] = reactExports.useState(true);
  const [records, setRecords] = reactExports.useState([]);
  const [appointments, setAppointments] = reactExports.useState([]);
  reactExports.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const from = startOfDay(subDays(/* @__PURE__ */ new Date(), period - 1));
        const to = endOfDay(/* @__PURE__ */ new Date());
        const [r, a] = await Promise.all([supabase.from("financial_records").select("*").gte("date", format(from, "yyyy-MM-dd")).lte("date", format(to, "yyyy-MM-dd")), supabase.from("appointments").select("id, status, start_time, service:services(id,name,price), client:clients(id,name)").gte("start_time", from.toISOString()).lte("start_time", to.toISOString())]);
        if (r.error) throw r.error;
        if (a.error) throw a.error;
        setRecords(r.data || []);
        setAppointments(a.data || []);
      } catch {
        toast.error("Erro ao carregar relatórios");
      } finally {
        setLoading(false);
      }
    })();
  }, [period]);
  const metrics = reactExports.useMemo(() => {
    const income = records.filter((r) => r.type === "income");
    const expense = records.filter((r) => r.type === "expense");
    const totalIncome = income.reduce((s, r) => s + Number(r.amount || 0), 0);
    const totalExpense = expense.reduce((s, r) => s + Number(r.amount || 0), 0);
    const completed = appointments.filter((a) => a.status === "completed");
    const ticket = completed.length ? totalIncome / completed.length : 0;
    const uniqueClients = new Set(appointments.map((a) => a.client?.id).filter(Boolean)).size;
    const margin = totalIncome > 0 ? (totalIncome - totalExpense) / totalIncome * 100 : 0;
    return {
      totalIncome,
      totalExpense,
      profit: totalIncome - totalExpense,
      margin,
      completed: completed.length,
      ticket,
      uniqueClients
    };
  }, [records, appointments]);
  const dailyData = reactExports.useMemo(() => {
    const days = eachDayOfInterval({
      start: subDays(/* @__PURE__ */ new Date(), period - 1),
      end: /* @__PURE__ */ new Date()
    });
    return days.map((d) => {
      const key = format(d, "yyyy-MM-dd");
      const dayIncome = records.filter((r) => r.type === "income" && r.date === key).reduce((s, r) => s + Number(r.amount || 0), 0);
      const dayExpense = records.filter((r) => r.type === "expense" && r.date === key).reduce((s, r) => s + Number(r.amount || 0), 0);
      return {
        label: format(d, period === 7 ? "EEE" : "dd/MM"),
        receita: dayIncome,
        despesa: dayExpense
      };
    });
  }, [records, period]);
  const servicesData = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    appointments.filter((a) => a.status === "completed" && a.service).forEach((a) => {
      const key = a.service.id;
      const existing = map.get(key) || {
        name: a.service.name,
        count: 0,
        revenue: 0
      };
      existing.count += 1;
      existing.revenue += Number(a.service.price || 0);
      map.set(key, existing);
    });
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 6);
  }, [appointments]);
  const topClients = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    appointments.filter((a) => a.status === "completed" && a.client).forEach((a) => {
      const key = a.client.id;
      const existing = map.get(key) || {
        name: a.client.name,
        count: 0,
        revenue: 0
      };
      existing.count += 1;
      existing.revenue += Number(a.service?.price || 0);
      map.set(key, existing);
    });
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [appointments]);
  const exportCsv = () => {
    const rows = [["Data", "Tipo", "Categoria", "Valor", "Descrição"], ...records.map((r) => [r.date, r.type, r.category || "", String(r.amount), (r.description || "").replace(/[,\n]/g, " ")])];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-${format(/* @__PURE__ */ new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado");
  };
  const fmt = (n) => n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
  const COLORS = ["hsl(var(--primary))", "hsl(142 71% 45%)", "hsl(38 92% 50%)", "hsl(0 84% 60%)", "hsl(262 83% 58%)", "hsl(330 81% 60%)"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-[28px] font-semibold tracking-tight", children: "Relatórios e Análises" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Acompanhe o desempenho financeiro e operacional da barbearia." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PeriodTabs, { value: period, onChange: setPeriod }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: exportCsv, variant: "outline", className: "h-10 rounded-xl gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " CSV"
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-2xl bg-secondary/40 animate-pulse" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 rounded-2xl bg-secondary/40 animate-pulse" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Faturamento", value: fmt(metrics.totalIncome), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4" }), tone: "positive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Despesas", value: fmt(metrics.totalExpense), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }), tone: "negative" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Lucro", value: fmt(metrics.profit), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }), tone: metrics.profit >= 0 ? "positive" : "negative", sub: `Margem ${metrics.margin.toFixed(0)}%` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Ticket médio", value: fmt(metrics.ticket), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Atendimentos", value: String(metrics.completed), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Clientes", value: String(metrics.uniqueClients), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }), sub: "Únicos no período" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Receita × Despesa", subtitle: "Evolução diária no período", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4 text-muted-foreground" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: dailyData, margin: {
        top: 10,
        right: 10,
        left: -10,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "hsl(var(--border))", strokeDasharray: "3 3", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: {
          fontSize: 11,
          fill: "hsl(var(--muted-foreground))"
        }, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fontSize: 11,
          fill: "hsl(var(--muted-foreground))"
        }, tickLine: false, axisLine: false, width: 50 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 12,
          fontSize: 12
        }, formatter: (v) => fmt(Number(v)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "receita", name: "Receita", fill: "hsl(142 71% 45%)", radius: [6, 6, 0, 0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "despesa", name: "Despesa", fill: "hsl(0 84% 60%)", radius: [6, 6, 0, 0] })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Serviços mais vendidos", subtitle: "Distribuição do faturamento", children: servicesData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { label: "Sem serviços concluídos no período" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[1fr,1fr] gap-4 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: servicesData, dataKey: "revenue", nameKey: "name", innerRadius: 45, outerRadius: 80, paddingAngle: 2, children: servicesData.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[i % COLORS.length], stroke: "hsl(var(--card))", strokeWidth: 2 }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
              fontSize: 12
            }, formatter: (v) => fmt(Number(v)) })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: servicesData.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full shrink-0", style: {
                background: COLORS[i % COLORS.length]
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: s.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold tabular-nums whitespace-nowrap", children: fmt(s.revenue) })
          ] }, s.name)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Top clientes", subtitle: "Quem mais gerou receita", children: topClients.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { label: "Sem atendimentos concluídos no período" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: topClients.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between py-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 shrink-0 rounded-lg bg-secondary text-xs font-semibold flex items-center justify-center", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: c.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                c.count,
                " atendimento",
                c.count > 1 ? "s" : ""
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-emerald-600 dark:text-emerald-500 tabular-nums", children: fmt(c.revenue) })
        ] }, c.name)) }) })
      ] })
    ] })
  ] });
}
function PeriodTabs({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex bg-secondary/60 p-1 rounded-xl border border-border", children: [7, 30, 90].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onChange(p), className: `px-3.5 h-8 rounded-lg text-xs font-medium transition-all ${value === p ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
    p,
    "d"
  ] }, p)) });
}
function Kpi({
  label,
  value,
  icon,
  sub,
  tone = "neutral"
}) {
  const cls = tone === "positive" ? "text-emerald-600 dark:text-emerald-500" : tone === "negative" ? "text-red-600 dark:text-red-500" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl md:text-2xl font-semibold tracking-tight tabular-nums ${cls}`, children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: sub })
  ] });
}
function Panel({
  title,
  subtitle,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2 mb-4", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[15px] font-semibold tracking-tight truncate", children: title }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: subtitle })
      ] })
    ] }),
    children
  ] });
}
function Empty({
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 flex items-center justify-center text-center text-xs text-muted-foreground", children: label });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReportsPage, {}) });
export {
  SplitComponent as component
};
