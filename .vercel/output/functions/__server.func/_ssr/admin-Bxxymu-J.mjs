import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, b as useMutation, c as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-BtOq93ts.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as Button, I as Input, C as Card, B as Badge, c as cn } from "./router-DONcpGkq.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-2PAumXzc.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C6am6R5Y.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { a as createServerFn } from "./server-BAnYV7rD.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-7bes90Rp.mjs";
import { P as PLAN_LABELS, a as PLAN_FEATURES } from "./subscription-D6ZG8HOt.mjs";
import { S as Sheet, a as SheetTrigger, b as SheetContent, c as SheetHeader, d as SheetTitle, e as SheetDescription } from "./sheet-DBHRoVkj.mjs";
import { PLANS } from "./plans-DuyqPZD-.mjs";
import { R as Root, V as Viewport, C as Corner, S as ScrollAreaScrollbar, a as ScrollAreaThumb } from "../_libs/radix-ui__react-scroll-area.mjs";
import { R as Root2$1, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { P as Provider, R as Root3, T as Trigger$1, a as Portal, C as Content2$1 } from "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle, A as ArrowLeft, i as Shield, j as RefreshCw, U as Users, k as CircleCheck, l as Sparkles, m as TriangleAlert, n as Ban, o as CircleX, D as DollarSign, p as TrendingUp, q as Activity, d as CalendarClock, r as Search, K as KeyRound, s as Crown, t as CircleQuestionMark, u as BookOpen, v as ListChecks, w as Lightbulb, x as Target, y as ArrowUpRight, z as ChevronDown } from "../_libs/lucide-react.mjs";
import { a as format } from "../_libs/date-fns.mjs";
import { o as object, b as boolean, s as string, n as number, _ as _enum } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
const useAdminWhitelist = () => useQuery({
  queryKey: ["adminWhitelist"],
  queryFn: async () => {
    const { data, error } = await supabase.from("admin_whitelist").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  }
});
const useAddAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email) => {
      const { data, error } = await supabase.from("admin_whitelist").insert([{ email }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminWhitelist"] });
    }
  });
};
const useRemoveAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email) => {
      const { data, error } = await supabase.from("admin_whitelist").delete().eq("email", email);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminWhitelist"] });
    }
  });
};
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const Table = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
const PlanSchema = _enum(["starter", "professional", "premium", "lifetime"]);
const StatusSchema = _enum(["trial", "active", "overdue", "suspended", "cancelled"]);
const RoleSchema = _enum(["owner", "admin", "support", "user"]);
const AdminActionSchema = _enum(["change_plan", "activate", "suspend", "cancel", "reactivate", "grant_days", "grant_months", "lifetime", "end_trial", "restart_trial"]);
const LicenseSchema = object({
  code: string().trim().min(3).max(40).transform((value) => value.toUpperCase()),
  plan: PlanSchema,
  maxUses: number().int().positive().nullable().optional(),
  expiresAt: string().nullable().optional(),
  monthsGranted: number().int().min(0).max(120).default(1),
  lifetime: boolean().default(false)
});
const getAdminOverview = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("98193c088815d6bbdd4155ffbad4b125116e51df7ef81d3d6aef43156e028e01"));
const updateAdminSubscription = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  targetUserId: string().uuid(),
  action: AdminActionSchema,
  plan: PlanSchema.optional(),
  status: StatusSchema.optional(),
  amount: number().int().min(1).max(3650).optional()
}).parse(input)).handler(createSsrRpc("04762d776f3547b65e7fee19e62d0fdeed7cfd04c03cf35abab65b45a67edcc1"));
const createPromotionalLicense = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => LicenseSchema.parse(input)).handler(createSsrRpc("91ed2a13d84c4354572bd0fd26298ba2ac55e208ebf7c01570095f6a63064783"));
const setPromotionalLicenseActive = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  licenseId: string().uuid(),
  active: boolean()
}).parse(input)).handler(createSsrRpc("52201c075b5acf8c859a30f8c2a2dea42d4f7a004c0c20fb4bb2013951ef9dee"));
const setUserRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  targetUserId: string().uuid(),
  role: RoleSchema,
  grant: boolean()
}).parse(input)).handler(createSsrRpc("db980dd7fbef43d3fc13d10ddc5f8ed5aae0f52362aa36d741670b7c62aab77f"));
const deleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  targetUserId: string().uuid()
}).parse(input)).handler(createSsrRpc("5f15d9c6194c3264109b1c81741c60a8654b66a5caffc1ee319315a3a983394e"));
function formatPrice(cents, currency2, interval) {
  const value = (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: currency2 });
  if (interval === "lifetime") return `${value} (único)`;
  if (interval === "yearly") return `${value} / ano`;
  return `${value} / mês`;
}
const AUDIENCE = {
  starter: "Barbeiro iniciante ou autônomo dando os primeiros passos na organização digital.",
  professional: "Profissional autônomo ou barbearia em crescimento que quer atrair mais clientes.",
  premium: "Barbearia consolidada com fluxo alto de clientes e necessidade de gestão avançada.",
  lifetime: "Dono que quer resolver a mensalidade de uma vez e ter todos os módulos para sempre."
};
const BENEFITS = {
  starter: [
    "Organiza a agenda diária sem depender de caderno ou WhatsApp bagunçado.",
    "Cadastra até 100 clientes com histórico de atendimentos.",
    "Ideal para validar o sistema antes de escalar."
  ],
  professional: [
    "Recebe agendamentos online 24h por dia, mesmo com a barbearia fechada.",
    "Acompanha relatórios financeiros e sabe exatamente quanto ganhou no mês.",
    "Calcula comissões automaticamente para funcionários.",
    "Vende planos VIP com mensalidade recorrente para clientes fiéis."
  ],
  premium: [
    "CRM avançado para segmentar clientes e criar campanhas.",
    "Recuperação automática de clientes sumidos, aumentando o retorno.",
    "Business AI dá sugestões inteligentes de crescimento com base nos dados.",
    "Suporte prioritário quando precisar de ajuda."
  ],
  lifetime: [
    "Todos os recursos do Premium, sem cobrança mensal.",
    "Onboarding personalizado para tirar o máximo do sistema desde o início.",
    "Atualizações vitalícias — nunca mais paga mensalidade."
  ]
};
const WHEN_RECOMMEND = {
  starter: "Recomendado para quem atende até 100 clientes e quer só o essencial da agenda.",
  professional: "Recomendado para quem quer atrair clientes com agendamento online e ver o financeiro do negócio.",
  premium: "Recomendado para quem já tem base grande, funcionários e quer usar IA para crescer.",
  lifetime: "Recomendado para quem já sabe que o sistema entrega valor e quer eliminar a mensalidade para sempre."
};
const UPGRADE_TIP = {
  starter: "Se começou a perder cliente por falta de agendamento online ou não sabe seu faturamento, é hora de subir para Profissional.",
  professional: "Se já tem muitos clientes, quer recuperar quem sumiu e receber insights de IA, o Premium se paga rápido.",
  premium: "Se pretende usar o sistema por vários anos, o Lifetime economiza dezenas de mensalidades.",
  lifetime: null
};
const FEATURE_LABELS = [
  { key: "maxClients", label: "Limite de clientes" },
  { key: "maxAppointmentsPerMonth", label: "Agendamentos / mês" },
  { key: "onlineBooking", label: "Agendamento online", boolean: true },
  { key: "reports", label: "Relatórios financeiros", boolean: true },
  { key: "commissions", label: "Comissões automáticas", boolean: true },
  { key: "vipPlans", label: "Planos VIP", boolean: true },
  { key: "crm", label: "CRM avançado", boolean: true },
  { key: "ai", label: "Business AI", boolean: true }
];
function renderFeatureValue(value, isBoolean) {
  if (isBoolean) return value ? "✓" : "—";
  if (value === null) return "Ilimitado";
  return String(value);
}
function PlansGuide() {
  const plans2 = reactExports.useMemo(() => PLANS, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold", children: "Como usar este guia" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Use como referência rápida para lembrar a diferença entre os planos, decidir qual oferecer a cada perfil de cliente e identificar quando faz sentido sugerir um upgrade. Os dados abaixo são gerados a partir da configuração real dos planos — sempre que um plano, preço ou recurso for alterado no código de planos, esta documentação reflete a mudança." })
    ] }),
    plans2.map((plan, idx) => {
      const prev = idx > 0 ? plans2[idx - 1] : null;
      const features = PLAN_FEATURES[plan.id];
      const prevFeatures = prev ? PLAN_FEATURES[prev.id] : null;
      const newVsPrev = prev ? plan.features.filter((f) => !prev.features.includes(f)) : [];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "article",
        {
          className: `rounded-2xl border p-5 space-y-4 ${plan.highlight ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-bold flex items-center gap-2", children: [
                  plan.name,
                  plan.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wide bg-primary text-primary-foreground rounded-full px-2 py-0.5", children: "Mais vendido" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: plan.tagline })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold", children: formatPrice(plan.priceCents, plan.currency, plan.interval) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
                  " Público-alvo"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: AUDIENCE[plan.id] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3.5 w-3.5" }),
                  " Quando recomendar"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: WHEN_RECOMMEND[plan.id] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase text-muted-foreground", children: "Recursos disponíveis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
              ] }, f)) })
            ] }),
            prev && newVsPrev.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2 rounded-xl bg-muted/40 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5" }),
                " O que muda em relação ao ",
                prev.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Inclui tudo do ",
                prev.name,
                " e adiciona:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm", children: newVsPrev.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "+" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
              ] }, f)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
                " Benefícios reais"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 text-sm", children: BENEFITS[plan.id].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: b })
              ] }, b)) })
            ] }),
            UPGRADE_TIP[plan.id] && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-3.5 w-3.5" }),
                " Quando sugerir upgrade?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: UPGRADE_TIP[plan.id] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden", "aria-hidden": true, children: prevFeatures ? "" : "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden", "aria-hidden": true, children: features ? "" : "" })
          ]
        },
        plan.id
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold", children: "Tabela comparativa" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-semibold", children: "Recurso" }),
          plans2.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-3 py-2 font-semibold whitespace-nowrap", children: p.name }, p.id))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium", children: "Preço" }),
            plans2.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center px-3 py-2 text-xs", children: formatPrice(p.priceCents, p.currency, p.interval) }, p.id))
          ] }),
          FEATURE_LABELS.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium", children: row.label }),
            plans2.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center px-3 py-2", children: renderFeatureValue(PLAN_FEATURES[p.id][row.key], row.boolean) }, p.id))
          ] }, row.key))
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
        " Estratégia de venda"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Starter" }),
          " é a porta de entrada: preço acessível para o barbeiro provar que a agenda digital funciona. Use-o para converter quem ainda usa caderno."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Professional" }),
          ' é o "coração" da venda. Destaque o agendamento online (menos falta), relatórios (dono sabe quanto ganha) e comissões (economiza horas por mês). É o plano com melhor relação valor × preço.'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Premium" }),
          ' se vende com CRM + Recuperação de clientes + Business AI. Foco: cada cliente recuperado paga o plano várias vezes. Ideal para barbearias que já sentem que estão "perdendo cliente" e não sabem por quê.'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Lifetime" }),
          ' é para o cliente que já ama o sistema. Argumento simples: "em menos de 2 anos você paga o Premium mensal — daqui pra frente é lucro".'
        ] })
      ] })
    ] })
  ] });
}
const ScrollArea = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
    ]
  }
));
ScrollArea.displayName = Root.displayName;
const ScrollBar = reactExports.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
const Accordion = Root2$1;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger$1;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2$1,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = Content2$1.displayName;
const SECTIONS = [
  {
    id: "overview",
    title: "Visão geral",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
    intro: "O Painel Master é a área administrativa exclusiva do proprietário do Corte Certo. Aqui você gerencia clientes, planos, licenças e acompanha a saúde do SaaS em tempo real.",
    items: [
      { term: "O que é", description: "Central administrativa do SaaS Corte Certo." },
      {
        term: "Para que serve",
        description: "Gerir assinantes, planos, licenças, testes e métricas."
      },
      {
        term: "Quem acessa",
        description: "Somente contas com papel Proprietário (ou Administrador quando delegado)."
      },
      {
        term: "Por que existe",
        description: "Ter controle total sobre o SaaS sem depender de painéis externos."
      }
    ]
  },
  {
    id: "roles",
    title: "Papéis",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
    items: [
      {
        term: "Proprietário",
        description: "Dono do SaaS. Acesso total: clientes, planos, licenças, assinaturas, métricas e auditoria. Apenas uma conta deve ter esse papel."
      },
      {
        term: "Administrador",
        description: "Conta administrativa opcional com permissões limitadas para gestão do dia a dia."
      },
      {
        term: "Cliente",
        description: "Assinante do Corte Certo. Nunca acessa o Painel Master."
      }
    ]
  },
  {
    id: "plans",
    title: "Planos",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
    items: [
      {
        term: "O que é um plano",
        description: "Conjunto de recursos e preço oferecidos aos assinantes."
      },
      {
        term: "Criar / editar / excluir",
        description: "Gestão feita pelo próprio painel; nomes e preços são totalmente personalizáveis."
      },
      { term: "Assinatura", description: "Vínculo do cliente ao plano com cobrança recorrente." },
      {
        term: "Renovação",
        description: "Cobrança automática ao final do ciclo mantendo a licença ativa."
      }
    ]
  },
  {
    id: "licenses",
    title: "Licenças",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-4 w-4" }),
    items: [
      {
        term: "O que é",
        description: "Autorização que libera o acesso do cliente ao Corte Certo."
      },
      {
        term: "Quando é criada",
        description: "Ao assinar um plano ou receber licença promocional."
      },
      {
        term: "Quando expira",
        description: "No fim do período pago ou promocional, se não houver renovação."
      },
      { term: "Renovação", description: "Ocorre automaticamente com pagamento aprovado." },
      {
        term: "Bloqueio",
        description: "Aplicado em inadimplência prolongada ou suspensão manual."
      }
    ]
  },
  {
    id: "trial",
    title: "Período de teste",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-4 w-4" }),
    items: [
      { term: "O que é", description: "Período gratuito para o cliente experimentar o sistema." },
      { term: "Conceder", description: "Ativado no cadastro ou manualmente pelo painel." },
      { term: "Cancelar", description: "Encerrado a qualquer momento pelo Proprietário." },
      {
        term: "Fim do teste",
        description: "Cliente precisa assinar um plano para continuar utilizando."
      }
    ]
  },
  {
    id: "customers",
    title: "Clientes",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
    items: [
      { term: "Ativo", description: "Assinatura em dia e sistema liberado." },
      { term: "Bloqueado", description: "Acesso suspenso temporariamente pelo Proprietário." },
      { term: "Cancelado", description: "Encerrou a assinatura e não usa mais o sistema." },
      { term: "Inadimplente", description: "Cobrança em aberto após vencimento." }
    ]
  },
  {
    id: "metrics",
    title: "Métricas",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
    items: [
      { term: "Total de clientes", description: "Número de clientes cadastrados na base." },
      { term: "Assinaturas ativas", description: "Clientes com pagamento em dia." },
      { term: "Testes ativos", description: "Clientes utilizando o período gratuito." },
      {
        term: "Receita Mensal (MRR)",
        description: "Receita recorrente mensal. Ex.: 50 clientes × R$ 99 = R$ 4.950 de MRR."
      },
      {
        term: "Receita Anual Estimada (ARR)",
        description: "Projeção anual da receita recorrente. Ex.: MRR R$ 4.950 × 12 = R$ 59.400 de ARR."
      },
      { term: "Inadimplentes", description: "Assinantes com cobrança em aberto." },
      { term: "Suspensos", description: "Clientes temporariamente bloqueados." },
      { term: "Cancelados", description: "Clientes que encerraram a assinatura." },
      { term: "Renovação", description: "Data da próxima cobrança da assinatura." }
    ]
  },
  {
    id: "security",
    title: "Segurança",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
    items: [
      {
        term: "Acesso restrito",
        description: "Apenas contas com papel Proprietário conseguem abrir o Painel Master."
      },
      {
        term: "Proteção",
        description: "Verificação de papel via has_role no servidor, RLS ativo em todas as tabelas."
      },
      { term: "Usuários comuns", description: "Nunca visualizam rotas nem APIs administrativas." }
    ]
  },
  {
    id: "flow",
    title: "Fluxo de assinatura",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-4 w-4" }),
    items: [
      { term: "1. Cadastro", description: "Cliente cria a conta no Corte Certo." },
      {
        term: "2. Período de teste",
        description: "Recebe período gratuito para testar o sistema."
      },
      { term: "3. Assinatura", description: "Escolhe um plano e realiza o pagamento." },
      { term: "4. Pagamento aprovado", description: "Licença é renovada automaticamente." },
      { term: "5. Uso contínuo", description: "Cliente segue utilizando o sistema normalmente." }
    ]
  },
  {
    id: "faq",
    title: "Perguntas frequentes",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-4 w-4" }),
    items: [
      {
        term: "Posso mudar o preço de um plano?",
        description: "Sim. A alteração vale para novas assinaturas; existentes seguem a regra vigente até renovação."
      },
      {
        term: "Posso dar Teste novamente?",
        description: "Sim. O Proprietário pode reiniciar o período de teste de um cliente pela ação Reiniciar teste."
      },
      {
        term: "O que acontece se um cliente não pagar?",
        description: "Entra como Inadimplente e, após o período de tolerância, pode ser suspenso."
      },
      {
        term: "Posso bloquear um cliente?",
        description: "Sim, usando a ação Suspender assinatura."
      },
      {
        term: "Como cancelar uma assinatura?",
        description: "Selecione o cliente, escolha Cancelar assinatura e confirme."
      },
      {
        term: "Como funciona a renovação?",
        description: "Automática ao final do ciclo, mediante pagamento aprovado."
      }
    ]
  },
  {
    id: "tips",
    title: "Boas práticas",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4" }),
    items: [
      {
        term: "Preservar histórico",
        description: "Nunca exclua clientes sem necessidade — prefira bloquear."
      },
      { term: "Planos simples", description: "Poucas opções bem definidas convertem mais." },
      {
        term: "Revisão semanal",
        description: "Acompanhe MRR, inadimplência e cancelamentos toda semana."
      },
      { term: "Backup", description: "Antes de grandes alterações, garanta backup dos dados." },
      {
        term: "Conta de teste",
        description: "Valide novos planos com uma conta de teste antes de liberar."
      }
    ]
  }
];
function HelpCenter() {
  const [open, setOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const filtered = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return SECTIONS;
    return SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => item.term.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
      )
    })).filter((section) => section.items.length > 0);
  }, [query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "h-9 rounded-xl gap-2 shrink-0",
        "aria-label": "Abrir Central de Ajuda",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Ajuda" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-xl p-0 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "border-b border-border px-6 py-5 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2 text-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5 text-primary" }),
          "Central de Ajuda"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Manual interno do Painel Master do Corte Certo." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: "Buscar no manual…",
              className: "h-10 rounded-xl pl-9"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-6", children: [
        !query.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold tracking-tight", children: "Guia de Planos" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlansGuide, {})
        ] }),
        filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-10", children: "Nenhum resultado encontrado." }) : filtered.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary", children: section.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold tracking-tight", children: section.title })
          ] }),
          section.intro && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: section.intro }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Accordion,
            {
              type: "multiple",
              className: "border border-border rounded-xl divide-y divide-border overflow-hidden",
              children: section.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                AccordionItem,
                {
                  value: `${section.id}-${idx}`,
                  className: "border-0 px-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-sm font-semibold py-3 hover:no-underline", children: item.term }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-sm text-muted-foreground leading-relaxed pb-3", children: item.description })
                  ]
                },
                `${section.id}-${idx}`
              ))
            }
          )
        ] }, section.id))
      ] }) })
    ] })
  ] });
}
const HINTS = {
  "Total de clientes": "Número de clientes cadastrados na base.",
  "Assinaturas ativas": "Clientes com pagamento em dia.",
  "Testes ativos": "Clientes utilizando o período gratuito.",
  Inadimplentes: "Assinantes com cobrança em aberto após o vencimento.",
  Suspensos: "Clientes temporariamente bloqueados.",
  Cancelados: "Clientes que encerraram a assinatura.",
  MRR: "Receita Mensal Recorrente das assinaturas ativas.",
  "ARR estimado": "Receita Anual estimada = MRR × 12.",
  "Novos no mês": "Novos clientes cadastrados no mês atual.",
  Cancelamentos: "Assinaturas encerradas no mês corrente."
};
function MetricHint({ label }) {
  const text = HINTS[label];
  if (!text) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": `Sobre ${label}`,
        className: "inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-3.5 w-3.5" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "top", className: "max-w-xs text-xs", children: text })
  ] }) });
}
function useAdminAccess() {
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let isMounted = true;
    const checkAdmin = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        const email = session?.user?.email?.toLowerCase().trim();
        if (!email) {
          if (isMounted) {
            setIsAdmin(false);
            setIsLoading(false);
          }
          return;
        }
        if (email === "azevedoarthur120@gmail.com") {
          if (isMounted) setIsAdmin(true);
        } else {
          const { data, error } = await supabase.from("admin_whitelist").select("email").eq("email", email).maybeSingle();
          if (error) {
            console.error("Erro ao checar whitelist:", error);
            if (isMounted) setIsAdmin(false);
          } else {
            if (isMounted) setIsAdmin(!!data);
          }
        }
      } catch (error) {
        console.error("Erro no Auth:", error);
        if (isMounted) setIsAdmin(false);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    checkAdmin();
    return () => {
      isMounted = false;
    };
  }, []);
  return { isAdmin, isLoading };
}
const ROLE_OPTIONS = [{
  value: "owner",
  label: "Proprietário"
}, {
  value: "admin",
  label: "Administrador"
}, {
  value: "support",
  label: "Suporte"
}];
const STATUS_META = {
  trial: {
    label: "Período de teste",
    className: "bg-blue-500/10 text-blue-700 border-blue-500/20"
  },
  active: {
    label: "Ativa",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
  },
  overdue: {
    label: "Inadimplente",
    className: "bg-amber-500/10 text-amber-700 border-amber-500/20"
  },
  suspended: {
    label: "Suspensa",
    className: "bg-red-500/10 text-red-700 border-red-500/20"
  },
  cancelled: {
    label: "Cancelada",
    className: "bg-muted text-muted-foreground border-border"
  }
};
const ACTION_LABELS = {
  change_plan: "Alterar plano",
  activate: "Ativar assinatura",
  suspend: "Suspender assinatura",
  cancel: "Cancelar assinatura",
  reactivate: "Reativar assinatura",
  grant_days: "Conceder dias",
  grant_months: "Conceder meses",
  lifetime: "Licença vitalícia",
  end_trial: "Encerrar teste",
  restart_trial: "Reiniciar teste"
};
const plans = ["starter", "professional", "premium", "lifetime"];
const statuses = ["all", "trial", "active", "overdue", "suspended", "cancelled"];
function currency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  }).format(value || 0);
}
function shortDate(value) {
  if (!value) return "—";
  return format(new Date(value), "dd/MM/yyyy");
}
function AdminPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isAdmin,
    isLoading: isAuthLoading
  } = useAdminAccess();
  const loadOverview = useServerFn(getAdminOverview);
  const updateSubscription = useServerFn(updateAdminSubscription);
  const createLicense = useServerFn(createPromotionalLicense);
  const setLicenseActive = useServerFn(setPromotionalLicenseActive);
  const setRole = useServerFn(setUserRole);
  const removeUser = useServerFn(deleteUser);
  const roleMutation = useMutation({
    mutationFn: (vars) => setRole({
      data: vars
    }),
    onSuccess: () => {
      toast.success("Roles atualizadas");
      queryClient.invalidateQueries({
        queryKey: ["admin-overview"]
      });
    },
    onError: (error) => toast.error(error?.message ?? "Erro ao atualizar role")
  });
  const deleteMutation = useMutation({
    mutationFn: (targetUserId) => removeUser({
      data: {
        targetUserId
      }
    }),
    onSuccess: () => {
      toast.success("Usuário excluído");
      setSelectedCustomer(null);
      queryClient.invalidateQueries({
        queryKey: ["admin-overview"]
      });
    },
    onError: (error) => toast.error(error?.message ?? "Erro ao excluir")
  });
  const {
    data: whitelist,
    isLoading: whitelistLoading
  } = useAdminWhitelist();
  const addAdminMutation = useAddAdmin();
  const removeAdminMutation = useRemoveAdmin();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("createdAt");
  const [selectedCustomer, setSelectedCustomer] = reactExports.useState(null);
  const [action, setAction] = reactExports.useState("change_plan");
  const [actionPlan, setActionPlan] = reactExports.useState("starter");
  const [actionAmount, setActionAmount] = reactExports.useState(1);
  const [licenseCode, setLicenseCode] = reactExports.useState("");
  const [licensePlan, setLicensePlan] = reactExports.useState("professional");
  const [licenseMaxUses, setLicenseMaxUses] = reactExports.useState(50);
  const [licenseMonths, setLicenseMonths] = reactExports.useState(1);
  const [licenseExpiresAt, setLicenseExpiresAt] = reactExports.useState("");
  const [licenseLifetime, setLicenseLifetime] = reactExports.useState(false);
  const [newWhitelistEmail, setNewWhitelistEmail] = reactExports.useState("");
  const overviewQuery = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => loadOverview(),
    enabled: isAdmin,
    // Só carrega os dados se for admin confirmado
    staleTime: 2e4,
    retry: false
  });
  reactExports.useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      navigate({
        to: "/dashboard",
        replace: true
      });
    }
  }, [isAuthLoading, isAdmin, navigate]);
  const actionMutation = useMutation({
    mutationFn: () => {
      if (!selectedCustomer) throw new Error("Cliente não selecionado");
      return updateSubscription({
        data: {
          targetUserId: selectedCustomer.id,
          action,
          plan: action === "change_plan" || action === "activate" ? actionPlan : void 0,
          amount: action === "grant_days" || action === "grant_months" ? actionAmount : void 0
        }
      });
    },
    onSuccess: () => {
      toast.success("Assinatura atualizada");
      queryClient.invalidateQueries({
        queryKey: ["admin-overview"]
      });
    },
    onError: (error) => toast.error(error?.message ?? "Erro ao executar ação")
  });
  const licenseMutation = useMutation({
    mutationFn: () => createLicense({
      data: {
        code: licenseCode,
        plan: licensePlan,
        maxUses: licenseMaxUses || null,
        expiresAt: licenseExpiresAt || null,
        monthsGranted: licenseMonths,
        lifetime: licenseLifetime
      }
    }),
    onSuccess: () => {
      toast.success("Licença criada");
      setLicenseCode("");
      queryClient.invalidateQueries({
        queryKey: ["admin-overview"]
      });
    },
    onError: (error) => toast.error(error?.message ?? "Erro ao criar licença")
  });
  const toggleLicenseMutation = useMutation({
    mutationFn: ({
      licenseId,
      active
    }) => setLicenseActive({
      data: {
        licenseId,
        active
      }
    }),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["admin-overview"]
    }),
    onError: (error) => toast.error(error?.message ?? "Erro ao atualizar licença")
  });
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const emailToAdd = newWhitelistEmail.toLowerCase().trim();
    if (!emailToAdd) return;
    try {
      await addAdminMutation.mutateAsync(emailToAdd);
      toast.success("E-mail adicionado à whitelist com sucesso.");
      setNewWhitelistEmail("");
    } catch (error) {
      toast.error(error?.message ?? "Erro ao adicionar à whitelist.");
    }
  };
  const overview = overviewQuery.data || {};
  const filteredCustomers = reactExports.useMemo(() => {
    const customers = overview?.customers ?? [];
    const term = search.trim().toLowerCase();
    return customers.filter((customer) => {
      const status = customer?.subscription?.status ?? "cancelled";
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const haystack = `${customer?.fullName ?? ""} ${customer?.shopName ?? ""} ${customer?.email ?? ""}`.toLowerCase();
      return matchesStatus && (!term || haystack.includes(term));
    }).sort((a, b) => {
      if (sortBy === "mrr") return (b?.paidTotal ?? 0) - (a?.paidTotal ?? 0);
      if (sortBy === "status") {
        return (a?.subscription?.status ?? "").localeCompare(b?.subscription?.status ?? "");
      }
      return new Date(b?.createdAt ?? 0).getTime() - new Date(a?.createdAt ?? 0).getTime();
    });
  }, [overview?.customers, search, sortBy, statusFilter]);
  const latestRevenueMonths = reactExports.useMemo(() => Object.entries(overview?.metrics?.revenueByMonth ?? {}).sort(([a], [b]) => a.localeCompare(b)).slice(-6), [overview?.metrics?.revenueByMonth]);
  if (isAuthLoading || overviewQuery.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  if (!isAdmin) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "h-9 rounded-xl gap-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Voltar ao Corte Certo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Voltar" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2 pl-3 border-l border-border min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold leading-tight truncate", children: "Painel Master" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground leading-tight truncate", children: "Administração do SaaS Corte Certo" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HelpCenter, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "h-9 rounded-xl gap-2", onClick: () => overviewQuery.refetch(), disabled: overviewQuery.isFetching, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Atualizar" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-8 px-4 py-6 md:px-8 md:py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
          " Corte Certo Master"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "Painel SaaS" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, {}), label: "Total de clientes", value: overview?.stats?.totalCustomers ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, {}), label: "Assinaturas ativas", value: overview?.stats?.activeSubscriptions ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, {}), label: "Testes ativos", value: overview?.stats?.activeTrials ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, {}), label: "Inadimplentes", value: overview?.stats?.overdueCustomers ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, {}), label: "Suspensos", value: overview?.stats?.suspendedCustomers ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, {}), label: "Cancelados", value: overview?.stats?.cancelledCustomers ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, {}), label: "MRR", value: currency(overview?.stats?.mrr ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, {}), label: "ARR estimado", value: currency(overview?.stats?.arr ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, {}), label: "Novos no mês", value: overview?.stats?.newCustomersThisMonth ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, {}), label: "Cancelamentos", value: overview?.stats?.cancellationsThisMonth ?? 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "customers", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid h-auto w-full grid-cols-4 rounded-2xl bg-muted p-1 md:w-[640px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "customers", className: "rounded-xl", children: "Clientes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "licenses", className: "rounded-xl", children: "Licenças" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "metrics", className: "rounded-xl", children: "Métricas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "whitelist", className: "rounded-xl", children: "Whitelist" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "customers", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-[1fr_180px_180px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-11 rounded-xl pl-9", placeholder: "Pesquisar cliente", value: search, onChange: (event) => setSearch(event.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-11 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: statuses.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, children: status === "all" ? "Todos" : STATUS_META[status]?.label ?? status }, status)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: setSortBy, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-11 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "createdAt", children: "Cadastro" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "mrr", children: "Receita" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "status", children: "Status" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden rounded-3xl border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Cliente" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Plano" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Renovação" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Cadastro" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Pagamentos" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredCustomers.length > 0 ? filteredCustomers.map((customer) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "cursor-pointer", onClick: () => setSelectedCustomer(customer), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: customer.shopName || customer.fullName || "Sem Nome" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: customer.email ?? "—" })
                ] }),
                (customer.roles ?? []).filter((r) => r !== "user").map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "rounded-full text-[10px] uppercase", children: r }, r))
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: customer.subscription ? PLAN_LABELS[customer.subscription.plan] ?? customer.subscription.plan : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: customer.subscription?.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: shortDate(customer.subscription?.current_period_end) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: shortDate(customer.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold", children: currency(customer.paidTotal ?? 0) })
            ] }, customer.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "h-24 text-center text-muted-foreground", children: "Nenhum dado registrado" }) }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "licenses", className: "grid gap-6 lg:grid-cols-[380px_1fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-3xl border-border p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold tracking-tight", children: "Nova licença" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Código", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: licenseCode, onChange: (event) => setLicenseCode(event.target.value.toUpperCase()), placeholder: "BETA2026" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Plano", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: licensePlan, onValueChange: (value) => setLicensePlan(value), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: plan, children: PLAN_LABELS[plan] }, plan)) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Usos", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: licenseMaxUses, onChange: (event) => setLicenseMaxUses(Number(event.target.value)) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Meses", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: licenseMonths, onChange: (event) => setLicenseMonths(Number(event.target.value)) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Expira em", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: licenseExpiresAt, onChange: (event) => setLicenseExpiresAt(event.target.value) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: licenseLifetime ? "default" : "outline", className: "w-full rounded-xl", onClick: () => setLicenseLifetime((value) => !value), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "mr-2 h-4 w-4" }),
                " Vitalícia"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-11 w-full rounded-xl", onClick: () => licenseMutation.mutate(), disabled: licenseMutation.isPending, children: "Criar código" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden rounded-3xl border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Código" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Plano" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Uso" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Validade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ação" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (overview?.licenses ?? []).length > 0 ? (overview?.licenses ?? []).map((license) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-bold", children: license.code }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: PLAN_LABELS[license.plan] ?? license.plan }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                license.uses ?? 0,
                "/",
                license.max_uses ?? "∞"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: shortDate(license.expires_at) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: license.active ? "Ativa" : "Pausada" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "rounded-xl", onClick: () => toggleLicenseMutation.mutate({
                licenseId: license.id,
                active: !license.active
              }), children: license.active ? "Pausar" : "Ativar" }) })
            ] }, license.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "h-24 text-center text-muted-foreground", children: "Nenhum dado registrado" }) }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "metrics", className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { title: "Clientes por plano", rows: Object.entries(overview?.metrics?.planCounts ?? {}).map(([label, value]) => [PLAN_LABELS[label] ?? label, value]) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { title: "Receita mensal", rows: latestRevenueMonths.map(([label, value]) => [label, currency(value)]) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { title: "SaaS", rows: [["Teste → Pago", `${overview?.metrics?.conversionRate ?? 0}%`], ["Receita anual", currency(overview?.metrics?.annualRevenue ?? 0)], ["Cancelamentos", overview?.metrics?.cancellations ?? 0], ["Permanência média", `${overview?.metrics?.averageStayDays ?? 0} dias`], ["Vitalícias", overview?.metrics?.lifetimeCount ?? 0]] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "whitelist", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-3xl border-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold tracking-tight", children: "Whitelist de Administradores" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddAdmin, className: "flex gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", placeholder: "E-mail do administrador", value: newWhitelistEmail, onChange: (e) => setNewWhitelistEmail(e.target.value), className: "h-11 flex-1 rounded-xl", required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: addAdminMutation.isPending, className: "h-11 rounded-xl", children: [
              addAdminMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null,
              "Adicionar"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "E-mail" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: whitelistLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 2, className: "h-24 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground mx-auto" }) }) }) : whitelist && whitelist.length > 0 ? whitelist.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: item.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive hover:text-destructive hover:bg-destructive/10", onClick: async () => {
                try {
                  await removeAdminMutation.mutateAsync(item.email);
                  toast.success("E-mail removido da whitelist!");
                } catch (error) {
                  toast.error(error?.message ?? "Erro ao remover e-mail.");
                }
              }, disabled: removeAdminMutation.isPending, children: "Remover" }) })
            ] }, item.email)) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 2, className: "h-24 text-center text-muted-foreground", children: "Nenhum administrador na whitelist." }) }) })
          ] }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedCustomer, onOpenChange: (open) => !open && setSelectedCustomer(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-3xl", children: selectedCustomer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-bold tracking-tight", children: selectedCustomer.shopName || selectedCustomer.fullName || "Sem Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: selectedCustomer.email ?? "Sem e-mail" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Plano", value: selectedCustomer.subscription?.plan ? PLAN_LABELS[selectedCustomer.subscription.plan] ?? selectedCustomer.subscription.plan : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Status", value: STATUS_META[selectedCustomer.subscription?.status ?? "cancelled"]?.label ?? "Desconhecido" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Renovação", value: shortDate(selectedCustomer.subscription?.current_period_end) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-2xl border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-bold tracking-tight", children: "Ação administrativa" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-[1fr_160px_120px_auto]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: action, onValueChange: setAction, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(ACTION_LABELS).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, children: label }, value)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: actionPlan, onValueChange: (value) => setActionPlan(value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: plan, children: PLAN_LABELS[plan] }, plan)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: actionAmount, onChange: (event) => setActionAmount(Number(event.target.value)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => actionMutation.mutate(), disabled: actionMutation.isPending, children: "Aplicar" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-2xl border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-bold tracking-tight", children: "Roles administrativas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ROLE_OPTIONS.map((option) => {
          const active = (selectedCustomer.roles ?? []).includes(option.value);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: active ? "default" : "outline", className: "rounded-full", disabled: roleMutation.isPending, onClick: () => roleMutation.mutate({
            targetUserId: selectedCustomer.id,
            role: option.value,
            grant: !active
          }), children: [
            active ? "✓ " : "",
            option.label
          ] }, option.value);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Apenas Proprietários podem alterar papéis. Proprietários não podem se auto-remover." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-2xl border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-bold tracking-tight", children: "Histórico de pagamentos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: (selectedCustomer?.billing ?? []).length > 0 ? (selectedCustomer.billing ?? []).map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            shortDate(row.created_at),
            " · ",
            row.gateway ?? "Desconhecido"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: currency((row.amount_cents ?? 0) / 100) })
        ] }, row.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "Nenhum pagamento registrado." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-2xl border-destructive/40 bg-destructive/5 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 font-bold tracking-tight text-destructive", children: "Zona de perigo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Exclui permanentemente a conta e todos os dados vinculados. Ação irreversível." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", className: "rounded-xl", disabled: deleteMutation.isPending, onClick: () => {
          if (confirm(`Excluir definitivamente ${selectedCustomer.email ?? selectedCustomer.fullName ?? "este usuário"}?`)) {
            deleteMutation.mutate(selectedCustomer.id);
          }
        }, children: "Excluir usuário" })
      ] })
    ] }) }) })
  ] });
}
function Stat({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-2xl border-border p-4 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary [&_svg]:h-5 [&_svg]:w-5", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold tracking-tight", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricHint, { label })
    ] })
  ] });
}
function StatusBadge({
  status
}) {
  const meta = STATUS_META[status ?? "cancelled"] ?? STATUS_META.cancelled;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `rounded-full ${meta.className}`, children: meta.label });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: label }),
    children
  ] });
}
function Mini({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/30 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold", children: value })
  ] });
}
function Metric({
  title,
  rows
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-3xl border-border p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-bold tracking-tight", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: rows && rows.length > 0 ? rows.map(([label, value], index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: value })
    ] }, `${label}-${index}`)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhum dado registrado." }) })
  ] });
}
export {
  AdminPage as component
};
