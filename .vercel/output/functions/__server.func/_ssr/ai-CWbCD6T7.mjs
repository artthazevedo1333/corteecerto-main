import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { E as ErrorBoundary, B as Badge, C as Card, f as CardHeader, g as CardTitle, e as CardContent, d as Button } from "./router-DONcpGkq.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { p as TrendingUp, F as Scissors, O as Package, U as Users, l as Sparkles, m as TriangleAlert } from "../_libs/lucide-react.mjs";
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
function AIPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AIContent, {}) });
}
function AIContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(true);
  const [clients, setClients] = reactExports.useState([]);
  const [products, setProducts] = reactExports.useState([]);
  const [appointments, setAppointments] = reactExports.useState([]);
  const [records, setRecords] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const load = async () => {
      try {
        const since = /* @__PURE__ */ new Date();
        since.setDate(since.getDate() - 30);
        const [c, p, a, r] = await Promise.all([supabase.from("clients").select("id, name, last_visit, total_spent"), supabase.from("products").select("id, name, current_stock, min_stock"), supabase.from("appointments").select("id, status, start_time, service:services(name, price)").gte("start_time", since.toISOString()), supabase.from("financial_records").select("amount, type, date").gte("date", since.toISOString().slice(0, 10))]);
        if (c.error) throw c.error;
        if (p.error) throw p.error;
        if (a.error) throw a.error;
        if (r.error) throw r.error;
        setClients(c.data || []);
        setProducts(p.data || []);
        setAppointments(a.data || []);
        setRecords(r.data || []);
      } catch (error) {
        toast.error("Erro ao gerar insights");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  const insights = reactExports.useMemo(() => {
    const income = records.filter((r) => r.type === "income").reduce((sum, r) => sum + Number(r.amount || 0), 0);
    const expense = records.filter((r) => r.type === "expense").reduce((sum, r) => sum + Number(r.amount || 0), 0);
    const completed = appointments.filter((a) => a.status === "completed");
    const lowStock = products.filter((p) => Number(p.current_stock || 0) <= Number(p.min_stock || 0));
    const inactive = clients.filter((client) => {
      if (!client.last_visit) return true;
      return Date.now() - new Date(client.last_visit).getTime() > 30 * 24 * 60 * 60 * 1e3;
    });
    const serviceMap = /* @__PURE__ */ new Map();
    completed.forEach((item) => {
      const name = item.service?.name || "Serviços avulsos";
      serviceMap.set(name, (serviceMap.get(name) || 0) + 1);
    });
    const topService = Array.from(serviceMap.entries()).sort((a, b) => b[1] - a[1])[0];
    return [{
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }),
      title: income >= expense ? "Caixa positivo" : "Margem pressionada",
      text: income >= expense ? `Nos últimos 30 dias o saldo está positivo em R$ ${(income - expense).toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      })}.` : `As despesas superam receitas em R$ ${(expense - income).toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      })}. Revise custos fixos.`,
      action: "/dashboard/finance"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-5 w-5" }),
      title: topService ? "Serviço líder" : "Catálogo sem histórico",
      text: topService ? `${topService[0]} lidera os atendimentos recentes com ${topService[1]} vendas.` : "Registre atendimentos concluídos para identificar serviços campeões.",
      action: "/dashboard/services"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5" }),
      title: lowStock.length ? "Reposição necessária" : "Estoque saudável",
      text: lowStock.length ? `${lowStock.length} produto(s) estão no nível mínimo de estoque.` : "Nenhum produto está abaixo do estoque mínimo.",
      action: "/dashboard/inventory"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
      title: inactive.length ? "Clientes para reativar" : "Relacionamento ativo",
      text: inactive.length ? `${inactive.length} cliente(s) podem receber uma campanha de retorno.` : "Sua base não tem clientes críticos no momento.",
      action: "/dashboard/recovery"
    }];
  }, [records, appointments, products, clients]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "rounded-full font-black uppercase", children: "Insights automáticos" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight uppercase italic", children: "Business AI" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-lg", children: "Leitura prática dos dados atuais da barbearia." })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center font-bold uppercase tracking-widest text-muted-foreground", children: "Analisando dados..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2", children: insights.map((insight) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-3 font-black uppercase italic tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary", children: insight.icon }),
        insight.title
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground leading-relaxed", children: insight.text }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate({
          to: insight.action
        }), className: "h-11 rounded-xl font-black uppercase", children: "Ver módulo" })
      ] })
    ] }, insight.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[2rem] border-primary/20 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-1 h-5 w-5 shrink-0 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground", children: "Os insights são calculados com os registros já salvos no sistema. Quanto mais atendimentos, clientes e lançamentos você registrar, mais precisas ficam as recomendações." })
    ] }) })
  ] });
}
export {
  AIPage as component
};
