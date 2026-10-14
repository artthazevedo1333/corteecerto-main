import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { d as Button, C as Card, e as CardContent, f as CardHeader, g as CardTitle, h as CardDescription } from "./router-DONcpGkq.mjs";
import { F as Scissors, G as LogIn, J as Calendar, U as Users, N as ChartColumn, O as Package, Q as Settings, f as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "./client-DsJMwvTf.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "container mx-auto px-4 pt-24 pb-16 text-center max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-primary/10 p-5 ring-1 ring-primary/20 shadow-2xl shadow-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-14 w-14 text-primary" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mb-6 text-6xl font-black tracking-tighter sm:text-7xl lg:text-8xl", children: [
        "Corte ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Certo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mx-auto mb-12 max-w-2xl text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed", children: [
        "O sistema de gestão ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-bold italic", children: "mobile-first" }),
        " ",
        "para barbeiros que levam o negócio a sério."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-4 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "h-16 px-10 text-xl font-black shadow-xl shadow-primary/20 rounded-2xl", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: "COMEÇAR AGORA" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "h-16 border-border bg-card px-10 text-xl font-black rounded-2xl hover:bg-secondary transition-all", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", search: {
          mode: "login"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "mr-3 h-6 w-6" }),
          " ENTRAR"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 py-24 max-w-7xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-8 w-8" }), title: "Agenda Inteligente", description: "Agendamentos rápidos, visualização clara e controle total do seu tempo." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8" }), title: "Gestão de Clientes", description: "Histórico completo, aniversários e lembretes de retorno automático." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-8 w-8" }), title: "Financeiro Completo", description: "Controle de faturamento, despesas e lucro real em tempo real." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8" }), title: "Estoque", description: "Alertas de reposição e controle de margem de lucro por produto." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-8 w-8" }), title: "Serviços", description: "Personalize seu catálogo com tempo e preços variados." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-8 w-8" }), title: "100% Mobile", description: "Tudo o que você precisa na palma da mão, otimizado para seu smartphone." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-primary border-none shadow-2xl rounded-[3rem] overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-12 md:p-20 text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-black text-primary-foreground mb-6 tracking-tight", children: "Pronto para organizar sua barbearia?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-xl mb-10 max-w-2xl mx-auto font-medium", children: "Junte-se a centenas de barbeiros que já simplificaram sua rotina com o Corte Certo." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "secondary", className: "h-16 px-12 text-xl font-black rounded-2xl shadow-xl", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", children: [
          "CRIAR MINHA CONTA ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-2 h-6 w-6" })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border py-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-6 w-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black tracking-tight italic", children: "Corte Certo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-bold tracking-wide", children: "© 2026 CORTE CERTO. FEITO PARA QUEM DOMINA A TESOURA." })
    ] }) })
  ] });
}
function FeatureCard({
  icon,
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card shadow-sm hover:border-primary/50 transition-all group rounded-3xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary border border-border text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-muted-foreground text-base font-medium leading-relaxed", children: description })
  ] }) });
}
export {
  Index as component
};
