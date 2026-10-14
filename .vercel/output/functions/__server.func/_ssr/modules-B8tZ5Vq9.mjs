import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useModules, A as ALL_MODULES } from "./use-modules-Coxz0RSf.mjs";
import { E as ErrorBoundary, C as Card, d as Button } from "./router-DONcpGkq.mjs";
import { u as useSubscription } from "./use-subscription-DyCgx5h8.mjs";
import { P as PLAN_LABELS, m as minPlanForFeature, T as TIER_LABELS } from "./subscription-D6ZG8HOt.mjs";
import { l as Sparkles, a3 as UserPlus, a as Heart, N as ChartColumn, a2 as Globe, a1 as Percent, s as Crown, F as Scissors, O as Package, a0 as CreditCard, U as Users, J as Calendar, ac as Lock } from "../_libs/lucide-react.mjs";
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
const ICON_MAP = {
  Calendar,
  Users,
  CreditCard,
  Package,
  Scissors,
  Crown,
  Percent,
  Globe,
  BarChart3: ChartColumn,
  Heart,
  UserPlus,
  Sparkles
};
function ModulesPageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModulesPage, {}) });
}
function ModulesPage() {
  const {
    isEnabled,
    isLoading
  } = useModules();
  const {
    subscription
  } = useSubscription();
  const navigate = useNavigate();
  const activeCount = reactExports.useMemo(() => ALL_MODULES.filter((m) => isEnabled(m.id)).length, [isEnabled]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-64 bg-secondary rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 bg-secondary rounded-2xl" }, i)) })
    ] });
  }
  const planLabel = subscription ? PLAN_LABELS[subscription.plan] : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-16 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-3xl md:text-4xl font-bold tracking-tight", children: "Módulos do seu plano" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm md:text-base text-muted-foreground", children: [
          "Os recursos abaixo são liberados automaticamente pelo seu plano",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: planLabel }),
          ". Faça upgrade para desbloquear novos módulos."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 rounded-2xl border border-border bg-card px-4 py-2 text-right shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Liberados" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold tabular-nums leading-tight", children: [
          activeCount,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-muted-foreground", children: [
            "/",
            ALL_MODULES.length
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr", children: ALL_MODULES.map((module) => {
      const Icon = ICON_MAP[module.icon];
      const active = isEnabled(module.id);
      const requiredTier = minPlanForFeature(module.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `group flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all ${active ? "border-primary/25 ring-1 ring-primary/10" : "border-border opacity-75"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-11 w-11 shrink-0 place-items-center rounded-xl ${active ? "bg-primary/10 text-primary ring-1 ring-primary/15" : "bg-secondary text-muted-foreground"}`, children: Icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5", strokeWidth: 2 }) : null }),
          !active && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 min-w-0 flex-1 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-[15px] font-semibold tracking-tight", title: module.label, children: module.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-[13px] leading-relaxed text-muted-foreground", children: module.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-emerald-600", children: "Incluído" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: [
          "Disponível no ",
          TIER_LABELS[requiredTier]
        ] }) })
      ] }, module.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Precisa de mais recursos? Faça upgrade a qualquer momento." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "rounded-xl gap-2", onClick: () => navigate({
        to: "/dashboard/subscription"
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        "Ver planos e fazer upgrade"
      ] })
    ] })
  ] });
}
export {
  ModulesPageWrapper as component
};
