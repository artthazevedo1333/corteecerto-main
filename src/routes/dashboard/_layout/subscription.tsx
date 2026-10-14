import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Crown,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Calendar,
  AlertTriangle,
  Loader2,
  Ban,
  ArrowUpRight,
  RefreshCw,
  Copy,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/use-subscription";
import {
  PLAN_LABELS,
  daysLeftInTrial,
  type SubscriptionPlan,
  type SubscriptionStatus,
} from "@/lib/subscription";
import { PLANS } from "@/lib/payments/plans";
import {
  createCheckout,
  cancelSubscription,
  changePlan,
  getBillingHistory,
} from "@/lib/payments/subscription.functions";

export const Route = createFileRoute("/dashboard/_layout/subscription")({
  head: () => ({
    meta: [
      { title: "Assinatura — Corte Certo" },
      {
        name: "description",
        content: "Gerencie seu plano, pagamento e faturamento do Corte Certo.",
      },
    ],
  }),
  component: SubscriptionPage,
});

type StatusMeta = { label: string; tone: string; dot: string; description: string };

const STATUS_META: Record<SubscriptionStatus, StatusMeta> = {
  active: {
    label: "Ativa",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-500",
    description: "Sua assinatura está em dia. Aproveite todos os recursos do seu plano.",
  },
  trial: {
    label: "Período de teste",
    tone: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    dot: "bg-blue-500",
    description: "Você está no período gratuito de avaliação.",
  },
  overdue: {
    label: "Pagamento pendente",
    tone: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    dot: "bg-amber-500",
    description: "Identificamos uma cobrança pendente. Regularize para manter seu acesso.",
  },
  suspended: {
    label: "Suspensa",
    tone: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
    dot: "bg-red-500",
    description: "Seu acesso foi interrompido. Regularize seu pagamento para reativar.",
  },
  cancelled: {
    label: "Cancelada",
    tone: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground/60",
    description: "Sua assinatura foi cancelada. Você pode assinar novamente a qualquer momento.",
  },
};

function currency(cents: number, curr = "BRL") {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: curr,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function shortId(id: string | null | undefined) {
  if (!id) return "—";
  const s = String(id);
  if (s.length <= 12) return s;
  return `${s.slice(0, 6)}…${s.slice(-4)}`;
}

function SubscriptionPage() {
  const { subscription, isLoading, refetch } = useSubscription();
  const queryClient = useQueryClient();

  const checkout = useServerFn(createCheckout);
  const cancel = useServerFn(cancelSubscription);
  const change = useServerFn(changePlan);
  const billing = useServerFn(getBillingHistory);

  // Sincronização em tempo real — assinatura reflete mudanças automaticamente.
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      const uid = data?.user?.id;
      if (!uid || !mounted) return;
      const ch = supabase
        .channel(`sub:${uid}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${uid}` },
          () => {
            queryClient.invalidateQueries({ queryKey: ["subscription"] });
            queryClient.invalidateQueries({ queryKey: ["billing-history"] });
          },
        )
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "billing_history", filter: `user_id=eq.${uid}` },
          () => queryClient.invalidateQueries({ queryKey: ["billing-history"] }),
        )
        .subscribe();
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
    staleTime: 30_000,
  });

  const checkoutMutation = useMutation({
    mutationFn: (plan: SubscriptionPlan) => checkout({ data: { plan } }),
    onSuccess: (res: any) => {
      if (res?.notConfigured || !res?.checkoutUrl) {
        toast.info("Checkout ainda não conectado. Fale com o suporte.");
        return;
      }
      window.location.href = res.checkoutUrl;
    },
    onError: (err: any) => toast.error(err?.message ?? "Erro ao iniciar pagamento"),
  });

  const changeMutation = useMutation({
    mutationFn: (plan: SubscriptionPlan) => change({ data: { plan } }),
    onSuccess: (res: any) => {
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
    onError: (err: any) => toast.error(err?.message ?? "Erro ao alterar plano"),
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancel(),
    onSuccess: () => {
      toast.success("Assinatura cancelada. Seu acesso segue até o fim do período pago.");
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      refetch();
    },
    onError: (err: any) => toast.error(err?.message ?? "Erro ao cancelar"),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const status = subscription?.status ?? "cancelled";
  const meta = STATUS_META[status];
  const trialDays = daysLeftInTrial(subscription);
  const nextBilling = subscription?.current_period_end
    ? new Date(subscription.current_period_end)
    : null;
  const createdAt = subscription?.created_at ? new Date(subscription.created_at) : null;
  const currentPlan = subscription?.plan;
  const currentPlanDef = currentPlan ? PLANS.find((p) => p.id === currentPlan) : null;
  const canManage = status === "active" || status === "trial" || status === "overdue";
  const isOverdue = status === "overdue" || status === "suspended";

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Cabeçalho */}
      <header>
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-2">
          <Crown className="h-3.5 w-3.5" />
          Assinatura
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Minha Assinatura</h1>
        <p className="mt-1 text-muted-foreground max-w-2xl">
          Acompanhe seu plano, seus pagamentos e gerencie sua conta a qualquer momento.
        </p>
      </header>

      {/* Cartão principal de status */}
      <Card className="rounded-3xl border-border bg-gradient-to-br from-primary/5 via-card to-card p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Plano atual
                </p>
                <h2 className="text-2xl font-bold tracking-tight truncate">
                  {currentPlan ? PLAN_LABELS[currentPlan] : "Sem assinatura"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${meta.tone}`}
              >
                <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                {meta.label}
              </span>
              {currentPlanDef && (
                <span className="text-sm text-muted-foreground">
                  {currency(currentPlanDef.priceCents, currentPlanDef.currency)}
                  <span className="opacity-70">
                    {currentPlanDef.interval === "monthly"
                      ? " / mês"
                      : currentPlanDef.interval === "yearly"
                        ? " / ano"
                        : ""}
                  </span>
                </span>
              )}
            </div>

            <p className="mt-3 text-sm text-muted-foreground max-w-lg">{meta.description}</p>
          </div>

          {/* Ações principais */}
          <div className="flex flex-wrap gap-2 md:justify-end shrink-0">
            {isOverdue && (
              <Button
                className="rounded-xl h-11 px-5"
                onClick={() => currentPlan && checkoutMutation.mutate(currentPlan)}
                disabled={checkoutMutation.isPending || !currentPlan}
              >
                {checkoutMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Regularizar pagamento
              </Button>
            )}

            {canManage && currentPlan && currentPlan !== "lifetime" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-xl h-11 px-4">
                    <Ban className="h-4 w-4 mr-1.5" />
                    Cancelar assinatura
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar sua assinatura?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você continuará utilizando o Corte Certo normalmente até o fim do período já
                      pago. Depois disso, o acesso será encerrado. Você pode reativar a qualquer
                      momento.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Manter assinatura</AlertDialogCancel>
                    <AlertDialogAction
                      className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => cancelMutation.mutate()}
                    >
                      Sim, cancelar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        {/* Grade de informações */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {trialDays !== null && (
            <InfoTile
              icon={<Calendar className="h-4 w-4" />}
              label="Dias de teste"
              value={`${trialDays} ${trialDays === 1 ? "dia" : "dias"}`}
            />
          )}
          <InfoTile
            icon={<CreditCard className="h-4 w-4" />}
            label="Próxima cobrança"
            value={nextBilling ? format(nextBilling, "dd 'de' MMM yyyy", { locale: ptBR }) : "—"}
          />
          <InfoTile
            icon={<Sparkles className="h-4 w-4" />}
            label="Início da assinatura"
            value={createdAt ? format(createdAt, "dd/MM/yyyy", { locale: ptBR }) : "—"}
          />
          <InfoTile
            icon={<Shield className="h-4 w-4" />}
            label="Forma de pagamento"
            value={
              subscription?.payment_provider === "mercadopago"
                ? "Mercado Pago"
                : subscription?.payment_provider
                  ? subscription.payment_provider
                  : "Não informada"
            }
          />
          {subscription?.grace_period_until && status === "overdue" && (
            <InfoTile
              icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
              label="Regularizar até"
              value={format(new Date(subscription.grace_period_until), "dd/MM/yyyy", {
                locale: ptBR,
              })}
              highlight
            />
          )}
          {subscription?.provider_subscription_id && (
            <InfoTile
              icon={<Copy className="h-4 w-4" />}
              label="ID da assinatura"
              value={shortId(subscription.provider_subscription_id)}
              onClick={() => {
                navigator.clipboard?.writeText(subscription.provider_subscription_id!);
                toast.success("ID copiado");
              }}
            />
          )}
        </div>
      </Card>

      {/* Alteração de plano */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Alterar plano</h2>
            <p className="text-sm text-muted-foreground">
              Escolha o plano que faz mais sentido para o seu momento. A alteração entra em vigor
              após a confirmação do pagamento.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.filter((p) => p.id !== "lifetime").map((p) => {
            const isCurrent = currentPlan === p.id && (status === "active" || status === "trial");
            const hasActiveSub =
              !!subscription && (status === "active" || status === "trial" || status === "overdue");
            return (
              <Card
                key={p.id}
                className={`relative rounded-3xl p-6 shadow-sm transition-all flex flex-col ${
                  isCurrent
                    ? "border-primary ring-2 ring-primary/40"
                    : p.highlight
                      ? "border-primary/40"
                      : "border-border"
                } hover:shadow-md`}
              >
                {isCurrent && (
                  <Badge className="absolute -top-2.5 right-6 rounded-full bg-primary text-primary-foreground border-0">
                    Plano atual
                  </Badge>
                )}
                {!isCurrent && p.highlight && (
                  <Badge className="absolute -top-2.5 right-6 rounded-full bg-foreground text-background border-0">
                    Mais popular
                  </Badge>
                )}
                <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 min-h-[2.5rem]">{p.tagline}</p>
                <div className="my-5">
                  <span className="text-3xl font-bold tracking-tight">
                    {currency(p.priceCents, p.currency)}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {p.interval === "monthly" ? "/mês" : "/ano"}
                  </span>
                </div>
                <ul className="space-y-2 text-sm mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full rounded-xl h-11"
                  variant={isCurrent ? "outline" : p.highlight ? "default" : "outline"}
                  disabled={isCurrent || checkoutMutation.isPending || changeMutation.isPending}
                  onClick={() =>
                    hasActiveSub ? changeMutation.mutate(p.id) : checkoutMutation.mutate(p.id)
                  }
                >
                  {isCurrent ? (
                    "Plano atual"
                  ) : hasActiveSub ? (
                    <>
                      Alterar para {p.name}
                      <ArrowUpRight className="h-4 w-4 ml-1.5" />
                    </>
                  ) : (
                    "Assinar"
                  )}
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Histórico de pagamentos */}
      <section>
        <h2 className="text-xl font-bold tracking-tight mb-4">Histórico de pagamentos</h2>
        <Card className="rounded-3xl border-border overflow-hidden">
          {history.isLoading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : !history.data?.length ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              Ainda não há cobranças registradas.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {history.data.map((row: any) => (
                <div key={row.id} className="flex items-center justify-between px-5 py-4 gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold tracking-tight">
                      {currency(row.amount_cents, row.currency)}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {format(new Date(row.created_at), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <PaymentStatusBadge status={row.status} />
                    {row.receipt_url && (
                      <a
                        href={row.receipt_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Comprovante
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}

function InfoTile({
  icon,
  label,
  value,
  highlight,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
  onClick?: () => void;
}) {
  const Base = onClick ? "button" : "div";
  return (
    <Base
      onClick={onClick}
      className={`text-left rounded-2xl border p-3 transition ${
        highlight ? "border-amber-500/40 bg-amber-500/5" : "border-border bg-card"
      } ${onClick ? "hover:border-primary/40 hover:bg-primary/5 cursor-pointer" : ""}`}
    >
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-1 font-semibold tracking-tight text-sm">{value}</p>
    </Base>
  );
}

function PaymentStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    confirmed: {
      label: "Pago",
      className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    },
    pending: {
      label: "Pendente",
      className: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    },
    failed: {
      label: "Falhou",
      className: "bg-red-500/10 text-red-700 border-red-500/20",
    },
    refunded: {
      label: "Estornado",
      className: "bg-muted text-muted-foreground border-border",
    },
  };
  const info = map[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border",
  };
  return (
    <Badge variant="outline" className={`rounded-full ${info.className}`}>
      {info.label}
    </Badge>
  );
}
