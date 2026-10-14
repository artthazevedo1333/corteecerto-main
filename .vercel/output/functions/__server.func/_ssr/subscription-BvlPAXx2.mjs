import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, c as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-BtOq93ts.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as Card, d as Button, B as Badge } from "./router-DONcpGkq.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-B1Aan_F-.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { u as useSubscription } from "./use-subscription-DyCgx5h8.mjs";
import { d as daysLeftInTrial, P as PLAN_LABELS } from "./subscription-D6ZG8HOt.mjs";
import { PLANS } from "./plans-DuyqPZD-.mjs";
import { a as createServerFn } from "./server-BAnYV7rD.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-7bes90Rp.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle, s as Crown, l as Sparkles, j as RefreshCw, n as Ban, J as Calendar, a0 as CreditCard, i as Shield, m as TriangleAlert, am as Copy, k as CircleCheck, y as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { a as format, p as ptBR } from "../_libs/date-fns.mjs";
import { o as object, _ as _enum } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const PlanSchema = _enum(["starter", "professional", "premium", "lifetime"]);
const createCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  plan: PlanSchema
}).parse(input)).handler(createSsrRpc("701cdd546651dbcebcbf238416dc92fe2affb2901bb03d7ad5b1e96d577d1e59"));
const changePlan = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  plan: PlanSchema
}).parse(input)).handler(createSsrRpc("2c585082d08e638aa6c76c9f8589925f9b40dec60b688c25295500cf55b028ba"));
const cancelSubscription = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("62102adf664ef6321bc26b867cf93aee1aa346d54d6e285c8c9d3d2b67a56121"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("0b6c99cc07feaca2d85f477a6610a76a1ca9981b34aa73c75fe1e559bfa7b303"));
const getBillingHistory = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("70b7b84ecb01a17c7a45c0061cc659d452eee4d5b0233ce8c4a80d973d541dfb"));
const STATUS_META = {
  active: {
    label: "Ativa",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-500",
    description: "Sua assinatura está em dia. Aproveite todos os recursos do seu plano."
  },
  trial: {
    label: "Período de teste",
    tone: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    dot: "bg-blue-500",
    description: "Você está no período gratuito de avaliação."
  },
  overdue: {
    label: "Pagamento pendente",
    tone: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    dot: "bg-amber-500",
    description: "Identificamos uma cobrança pendente. Regularize para manter seu acesso."
  },
  suspended: {
    label: "Suspensa",
    tone: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
    dot: "bg-red-500",
    description: "Seu acesso foi interrompido. Regularize seu pagamento para reativar."
  },
  cancelled: {
    label: "Cancelada",
    tone: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground/60",
    description: "Sua assinatura foi cancelada. Você pode assinar novamente a qualquer momento."
  }
};
function currency(cents, curr = "BRL") {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: curr,
    maximumFractionDigits: 2
  }).format(cents / 100);
}
function shortId(id) {
  if (!id) return "—";
  const s = String(id);
  if (s.length <= 12) return s;
  return `${s.slice(0, 6)}…${s.slice(-4)}`;
}
function SubscriptionPage() {
  const {
    subscription,
    isLoading,
    refetch
  } = useSubscription();
  const queryClient = useQueryClient();
  const checkout = useServerFn(createCheckout);
  const cancel = useServerFn(cancelSubscription);
  const change = useServerFn(changePlan);
  const billing = useServerFn(getBillingHistory);
  reactExports.useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data
      } = await supabase.auth.getUser();
      const uid = data?.user?.id;
      if (!uid || !mounted) return;
      const ch = supabase.channel(`sub:${uid}`).on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "subscriptions",
        filter: `user_id=eq.${uid}`
      }, () => {
        queryClient.invalidateQueries({
          queryKey: ["subscription"]
        });
        queryClient.invalidateQueries({
          queryKey: ["billing-history"]
        });
      }).on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "billing_history",
        filter: `user_id=eq.${uid}`
      }, () => queryClient.invalidateQueries({
        queryKey: ["billing-history"]
      })).subscribe();
      return () => {
        supabase.removeChannel(ch);
      };
    })();
    return () => {
      mounted = false;
    };
  }, [queryClient]);
  const history = useQuery({
    queryKey: ["billing-history"],
    queryFn: () => billing(),
    staleTime: 3e4
  });
  const checkoutMutation = useMutation({
    mutationFn: (plan) => checkout({
      data: {
        plan
      }
    }),
    onSuccess: (res) => {
      if (res?.notConfigured || !res?.checkoutUrl) {
        toast.info("Checkout ainda não conectado. Fale com o suporte.");
        return;
      }
      window.location.href = res.checkoutUrl;
    },
    onError: (err) => toast.error(err?.message ?? "Erro ao iniciar pagamento")
  });
  const changeMutation = useMutation({
    mutationFn: (plan) => change({
      data: {
        plan
      }
    }),
    onSuccess: (res) => {
      if (res?.sameplan) {
        toast.info("Este já é o seu plano atual.");
        return;
      }
      if (res?.notConfigured || !res?.checkoutUrl) {
        toast.error("Não foi possível alterar o plano agora.");
        return;
      }
      toast.success("Redirecionando para finalizar a alteração…");
      window.location.href = res.checkoutUrl;
    },
    onError: (err) => toast.error(err?.message ?? "Erro ao alterar plano")
  });
  const cancelMutation = useMutation({
    mutationFn: () => cancel(),
    onSuccess: () => {
      toast.success("Assinatura cancelada. Seu acesso segue até o fim do período pago.");
      queryClient.invalidateQueries({
        queryKey: ["subscription"]
      });
      refetch();
    },
    onError: (err) => toast.error(err?.message ?? "Erro ao cancelar")
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  }
  const status = subscription?.status ?? "cancelled";
  const meta = STATUS_META[status];
  const trialDays = daysLeftInTrial(subscription);
  const nextBilling = subscription?.current_period_end ? new Date(subscription.current_period_end) : null;
  const createdAt = subscription?.created_at ? new Date(subscription.created_at) : null;
  const currentPlan = subscription?.plan;
  const currentPlanDef = currentPlan ? PLANS.find((p) => p.id === currentPlan) : null;
  const canManage = status === "active" || status === "trial" || status === "overdue";
  const isOverdue = status === "overdue" || status === "suspended";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-16 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3.5 w-3.5" }),
        "Assinatura"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "Minha Assinatura" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground max-w-2xl", children: "Acompanhe seu plano, seus pagamentos e gerencie sua conta a qualquer momento." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-3xl border-border bg-gradient-to-br from-primary/5 via-card to-card p-5 sm:p-7 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-start md:justify-between gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Plano atual" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight truncate", children: currentPlan ? PLAN_LABELS[currentPlan] : "Sem assinatura" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${meta.tone}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${meta.dot}` }),
              meta.label
            ] }),
            currentPlanDef && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              currency(currentPlanDef.priceCents, currentPlanDef.currency),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: currentPlanDef.interval === "monthly" ? " / mês" : currentPlanDef.interval === "yearly" ? " / ano" : "" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground max-w-lg", children: meta.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 md:justify-end shrink-0", children: [
          isOverdue && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-xl h-11 px-5", onClick: () => currentPlan && checkoutMutation.mutate(currentPlan), disabled: checkoutMutation.isPending || !currentPlan, children: [
            checkoutMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 mr-2" }),
            "Regularizar pagamento"
          ] }),
          canManage && currentPlan && currentPlan !== "lifetime" && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "rounded-xl h-11 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-4 w-4 mr-1.5" }),
              "Cancelar assinatura"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Cancelar sua assinatura?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Você continuará utilizando o Corte Certo normalmente até o fim do período já pago. Depois disso, o acesso será encerrado. Você pode reativar a qualquer momento." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-xl", children: "Manter assinatura" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: () => cancelMutation.mutate(), children: "Sim, cancelar" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 md:grid-cols-4 gap-3", children: [
        trialDays !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }), label: "Dias de teste", value: `${trialDays} ${trialDays === 1 ? "dia" : "dias"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }), label: "Próxima cobrança", value: nextBilling ? format(nextBilling, "dd 'de' MMM yyyy", {
          locale: ptBR
        }) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }), label: "Início da assinatura", value: createdAt ? format(createdAt, "dd/MM/yyyy", {
          locale: ptBR
        }) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }), label: "Forma de pagamento", value: subscription?.payment_provider === "mercadopago" ? "Mercado Pago" : subscription?.payment_provider ? subscription.payment_provider : "Não informada" }),
        subscription?.grace_period_until && status === "overdue" && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-600" }), label: "Regularizar até", value: format(new Date(subscription.grace_period_until), "dd/MM/yyyy", {
          locale: ptBR
        }), highlight: true }),
        subscription?.provider_subscription_id && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }), label: "ID da assinatura", value: shortId(subscription.provider_subscription_id), onClick: () => {
          navigator.clipboard?.writeText(subscription.provider_subscription_id);
          toast.success("ID copiado");
        } })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold tracking-tight", children: "Alterar plano" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Escolha o plano que faz mais sentido para o seu momento. A alteração entra em vigor após a confirmação do pagamento." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: PLANS.filter((p) => p.id !== "lifetime").map((p) => {
        const isCurrent = currentPlan === p.id && (status === "active" || status === "trial");
        const hasActiveSub = !!subscription && (status === "active" || status === "trial" || status === "overdue");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `relative rounded-3xl p-6 shadow-sm transition-all flex flex-col ${isCurrent ? "border-primary ring-2 ring-primary/40" : p.highlight ? "border-primary/40" : "border-border"} hover:shadow-md`, children: [
          isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute -top-2.5 right-6 rounded-full bg-primary text-primary-foreground border-0", children: "Plano atual" }),
          !isCurrent && p.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute -top-2.5 right-6 rounded-full bg-foreground text-background border-0", children: "Mais popular" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold tracking-tight", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 min-h-[2.5rem]", children: p.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold tracking-tight", children: currency(p.priceCents, p.currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground ml-1", children: p.interval === "monthly" ? "/mês" : "/ano" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm mb-6 flex-1", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: f })
          ] }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full rounded-xl h-11", variant: isCurrent ? "outline" : p.highlight ? "default" : "outline", disabled: isCurrent || checkoutMutation.isPending || changeMutation.isPending, onClick: () => hasActiveSub ? changeMutation.mutate(p.id) : checkoutMutation.mutate(p.id), children: isCurrent ? "Plano atual" : hasActiveSub ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Alterar para ",
            p.name,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 ml-1.5" })
          ] }) : "Assinar" })
        ] }, p.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold tracking-tight mb-4", children: "Histórico de pagamentos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-3xl border-border overflow-hidden", children: history.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" }) }) : !history.data?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 text-center text-sm text-muted-foreground", children: "Ainda não há cobranças registradas." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: history.data.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold tracking-tight", children: currency(row.amount_cents, row.currency) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: format(new Date(row.created_at), "dd/MM/yyyy 'às' HH:mm", {
            locale: ptBR
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentStatusBadge, { status: row.status }),
          row.receipt_url && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: row.receipt_url, target: "_blank", rel: "noreferrer", className: "text-xs text-primary hover:underline", children: "Comprovante" })
        ] })
      ] }, row.id)) }) })
    ] })
  ] });
}
function InfoTile({
  icon,
  label,
  value,
  highlight,
  onClick
}) {
  const Base = onClick ? "button" : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Base, { onClick, className: `text-left rounded-2xl border p-3 transition ${highlight ? "border-amber-500/40 bg-amber-500/5" : "border-border bg-card"} ${onClick ? "hover:border-primary/40 hover:bg-primary/5 cursor-pointer" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground", children: [
      icon,
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold tracking-tight text-sm", children: value })
  ] });
}
function PaymentStatusBadge({
  status
}) {
  const map = {
    confirmed: {
      label: "Pago",
      className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
    },
    pending: {
      label: "Pendente",
      className: "bg-amber-500/10 text-amber-700 border-amber-500/20"
    },
    failed: {
      label: "Falhou",
      className: "bg-red-500/10 text-red-700 border-red-500/20"
    },
    refunded: {
      label: "Estornado",
      className: "bg-muted text-muted-foreground border-border"
    }
  };
  const info = map[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `rounded-full ${info.className}`, children: info.label });
}
export {
  SubscriptionPage as component
};
