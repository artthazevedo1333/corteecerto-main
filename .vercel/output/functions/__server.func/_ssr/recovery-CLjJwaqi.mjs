import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { E as ErrorBoundary, d as Button, C as Card, f as CardHeader, g as CardTitle, e as CardContent, B as Badge } from "./router-DONcpGkq.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as differenceInDays, b as parseISO } from "../_libs/date-fns.mjs";
import { U as Users, m as TriangleAlert, a3 as UserPlus, M as MessageCircle, k as CircleCheck } from "../_libs/lucide-react.mjs";
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
function RecoveryPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecoveryContent, {}) });
}
function RecoveryContent() {
  const [clients, setClients] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchClients = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from("clients").select("id, name, phone, last_visit, total_spent").order("last_visit", {
          ascending: true,
          nullsFirst: true
        });
        if (error) throw error;
        setClients(data || []);
      } catch (error) {
        toast.error("Erro ao carregar recuperação");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);
  const atRiskClients = reactExports.useMemo(() => {
    return clients.map((client) => {
      const days = client.last_visit ? differenceInDays(/* @__PURE__ */ new Date(), parseISO(client.last_visit)) : 999;
      return {
        ...client,
        days_since_last_visit: days
      };
    }).filter((client) => client.days_since_last_visit > 30).sort((a, b) => b.days_since_last_visit - a.days_since_last_visit);
  }, [clients]);
  const recoveredPotential = atRiskClients.reduce((sum, client) => sum + Math.max(Number(client.total_spent || 0) / 3, 60), 0);
  const sendRecovery = (client) => {
    const phone = String(client.phone || "").replace(/\D/g, "");
    if (!phone) {
      toast.error("Cliente sem WhatsApp cadastrado");
      return;
    }
    const message = encodeURIComponent(`Olá, ${client.name}! Sentimos sua falta no Corte Certo. Quer reservar um horário esta semana?`);
    window.open(`https://wa.me/55${phone}?text=${message}`, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight uppercase italic", children: "Recuperação de Clientes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-lg", children: "Priorize contatos que estão há mais tempo sem voltar." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "h-12 px-6 rounded-xl font-black uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/clients", children: "Base de clientes" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }), label: "Clientes analisados", value: String(clients.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }), label: "Em risco", value: String(atRiskClients.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-5 w-5" }), label: "Potencial", value: `R$ ${recoveredPotential.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      })}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-border bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-black uppercase italic tracking-tight flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-5 w-5 text-primary" }),
        " Lista de recuperação"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center font-bold uppercase tracking-widest text-muted-foreground", children: "Carregando clientes..." }) : atRiskClients.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: atRiskClients.map((client) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-lg font-black uppercase italic tracking-tight", children: client.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "rounded-full border-yellow-500/20 bg-yellow-500/10 text-yellow-600 font-black uppercase", children: client.days_since_last_visit === 999 ? "Sem visita" : `${client.days_since_last_visit} dias` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-muted-foreground", children: client.phone || "Sem telefone cadastrado" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => sendRecovery(client), className: "h-11 rounded-xl font-black uppercase gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " Recuperar"
        ] })
      ] }, client.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto mb-4 h-12 w-12 text-green-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase italic", children: "Carteira saudável" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium text-muted-foreground", children: "Nenhum cliente exige recuperação no momento." })
      ] }) })
    ] })
  ] });
}
function Stat({
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
  RecoveryPage as component
};
