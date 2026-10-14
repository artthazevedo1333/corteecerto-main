import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { E as ErrorBoundary, d as Button, I as Input, C as Card, f as CardHeader, g as CardTitle, e as CardContent, B as Badge } from "./router-DONcpGkq.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { U as Users, a as Heart, az as Trophy, r as Search, ah as Star, M as MessageCircle } from "../_libs/lucide-react.mjs";
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
function CRMPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CRMContent, {}) });
}
function CRMContent() {
  const [clients, setClients] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    const fetchClients = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from("clients").select("id, name, phone, instagram, total_spent, last_visit, birthday").order("total_spent", {
          ascending: false
        });
        if (error) throw error;
        setClients(data || []);
      } catch (error) {
        toast.error("Erro ao carregar CRM");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);
  const filteredClients = reactExports.useMemo(() => clients.filter((client) => client.name?.toLowerCase().includes(search.toLowerCase()) || client.phone?.includes(search)), [clients, search]);
  const totalSpent = clients.reduce((sum, client) => sum + Number(client.total_spent || 0), 0);
  const topClient = clients[0];
  const openWhatsApp = (client) => {
    const phone = String(client.phone || "").replace(/\D/g, "");
    if (!phone) {
      toast.error("Cliente sem WhatsApp cadastrado");
      return;
    }
    const message = encodeURIComponent(`Olá, ${client.name}! Tudo bem? Temos horários disponíveis esta semana no Corte Certo.`);
    window.open(`https://wa.me/55${phone}?text=${message}`, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight uppercase italic", children: "CRM Premium" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-lg", children: "Ranking, relacionamento e valor por cliente." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "h-12 px-6 rounded-xl font-black uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/clients", children: "Gerenciar clientes" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }), label: "Clientes", value: String(clients.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5" }), label: "Valor total", value: `R$ ${totalSpent.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      })}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5" }), label: "Cliente destaque", value: topClient?.name || "—" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Buscar cliente por nome ou telefone...", className: "h-14 rounded-2xl bg-card pl-14 text-base font-bold" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-border bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-black uppercase italic tracking-tight flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-primary" }),
        " Clientes de maior valor"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center font-bold uppercase tracking-widest text-muted-foreground", children: "Carregando CRM..." }) : filteredClients.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: filteredClients.map((client, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-black border border-primary/20", children: [
            "#",
            index + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-lg font-black uppercase italic tracking-tight", children: client.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-muted-foreground", children: [
              client.phone || "Sem telefone",
              " ",
              client.instagram ? `• ${client.instagram}` : ""
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 sm:justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "rounded-full px-3 py-1 font-black uppercase", children: [
            "R$",
            " ",
            Number(client.total_spent || 0).toLocaleString("pt-BR", {
              minimumFractionDigits: 2
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => openWhatsApp(client), className: "h-10 rounded-xl font-black uppercase gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
            " Chamar"
          ] })
        ] })
      ] }, client.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase italic", children: "Nenhum cliente encontrado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium text-muted-foreground", children: "Cadastre clientes para acompanhar o relacionamento." })
      ] }) })
    ] })
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
  CRMPage as component
};
