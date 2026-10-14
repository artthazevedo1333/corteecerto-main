import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { E as ErrorBoundary, I as Input, C as Card, f as CardHeader, g as CardTitle, e as CardContent, B as Badge, d as Button } from "./router-DONcpGkq.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { F as Scissors, ao as Wallet, a1 as Percent } from "../_libs/lucide-react.mjs";
import { a as format, p as ptBR, k as startOfMonth } from "../_libs/date-fns.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-label.mjs";
function CommissionsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommissionsContent, {}) });
}
function CommissionsContent() {
  const [appointments, setAppointments] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [rate, setRate] = reactExports.useState(40);
  reactExports.useEffect(() => {
    const savedRate = Number(window.localStorage.getItem("commission-rate") || 40);
    setRate(Number.isFinite(savedRate) ? savedRate : 40);
  }, []);
  reactExports.useEffect(() => {
    const load = async () => {
      try {
        const from = startOfMonth(/* @__PURE__ */ new Date()).toISOString();
        const {
          data,
          error
        } = await supabase.from("appointments").select("id, status, start_time, service:services(name, price)").eq("status", "completed").gte("start_time", from).order("start_time", {
          ascending: false
        });
        if (error) throw error;
        setAppointments(data || []);
      } catch (error) {
        toast.error("Erro ao carregar comissões");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  const totals = reactExports.useMemo(() => {
    const revenue = appointments.reduce((sum, item) => sum + Number(item.service?.price || 0), 0);
    return {
      revenue,
      commission: revenue * (rate / 100),
      shop: revenue * (1 - rate / 100)
    };
  }, [appointments, rate]);
  const updateRate = (value) => {
    const next = Math.max(0, Math.min(100, Number(value) || 0));
    setRate(next);
    window.localStorage.setItem("commission-rate", String(next));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight uppercase italic", children: "Comissões" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-lg", children: "Fechamento mensal baseado em atendimentos concluídos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full sm:w-48 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground", children: "Comissão (%)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", max: "100", value: rate, onChange: (event) => updateRate(event.target.value), className: "h-12 rounded-xl text-lg font-black" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-5 w-5" }), label: "Atendimentos", value: String(appointments.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5" }), label: "Total vendido", value: `R$ ${totals.revenue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      })}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "h-5 w-5" }), label: "Comissão", value: `R$ ${totals.commission.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      })}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-border bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-black uppercase italic tracking-tight", children: "Atendimentos do mês" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center font-bold uppercase tracking-widest text-muted-foreground", children: "Carregando comissões..." }) : appointments.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: appointments.map((item) => {
        const price = Number(item.service?.price || 0);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black uppercase italic tracking-tight", children: item.service?.name || "Serviço" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-muted-foreground", children: format(new Date(item.start_time), "dd 'de' MMMM", {
              locale: ptBR
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 sm:justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "rounded-full px-3 py-1 font-black uppercase", children: [
              "Venda R$ ",
              price.toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "rounded-full px-3 py-1 font-black uppercase", children: [
              "Comissão R$",
              " ",
              (price * rate / 100).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })
            ] })
          ] })
        ] }, item.id);
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase italic", children: "Sem atendimentos concluídos este mês" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium text-muted-foreground", children: "Finalize comandas para gerar o relatório de comissões." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => window.print(), className: "h-12 rounded-xl px-6 font-black uppercase", children: "Imprimir fechamento" }) })
  ] });
}
function Metric({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-2xl font-black italic tracking-tight", children: value })
  ] }) });
}
export {
  CommissionsPage as component
};
