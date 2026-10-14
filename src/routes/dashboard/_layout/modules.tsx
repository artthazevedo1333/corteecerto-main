import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useModules, ALL_MODULES } from "@/hooks/use-modules";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  CreditCard,
  Package,
  Scissors,
  Crown,
  Percent,
  Globe,
  BarChart3,
  Heart,
  UserPlus,
  Sparkles,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { useMemo } from "react";
import { useSubscription } from "@/hooks/use-subscription";
import { minPlanForFeature, PLAN_LABELS, TIER_LABELS, type FeatureKey } from "@/lib/subscription";

export const Route = createFileRoute("/dashboard/_layout/modules")({
  component: ModulesPageWrapper,
});

const ICON_MAP: Record<string, LucideIcon> = {
  Calendar,
  Users,
  CreditCard,
  Package,
  Scissors,
  Crown,
  Percent,
  Globe,
  BarChart3,
  Heart,
  UserPlus,
  Sparkles,
};

function ModulesPageWrapper() {
  return (
    <ErrorBoundary>
      <ModulesPage />
    </ErrorBoundary>
  );
}

function ModulesPage() {
  const { isEnabled, isLoading } = useModules();
  const { subscription } = useSubscription();
  const navigate = useNavigate();

  const activeCount = useMemo(() => ALL_MODULES.filter((m) => isEnabled(m.id)).length, [isEnabled]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-64 bg-secondary rounded-2xl" />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-40 bg-secondary rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const planLabel = subscription ? PLAN_LABELS[subscription.plan] : "—";

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-3xl md:text-4xl font-bold tracking-tight">
            Módulos do seu plano
          </h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            Os recursos abaixo são liberados automaticamente pelo seu plano{" "}
            <strong className="text-foreground">{planLabel}</strong>. Faça upgrade para desbloquear
            novos módulos.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-border bg-card px-4 py-2 text-right shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Liberados
          </p>
          <p className="text-lg font-bold tabular-nums leading-tight">
            {activeCount}
            <span className="text-sm font-medium text-muted-foreground">/{ALL_MODULES.length}</span>
          </p>
        </div>
      </header>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
        {ALL_MODULES.map((module) => {
          const Icon = ICON_MAP[module.icon];
          const active = isEnabled(module.id);
          const requiredTier = minPlanForFeature(module.id as FeatureKey);
          return (
            <Card
              key={module.id}
              className={`group flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all ${
                active ? "border-primary/25 ring-1 ring-primary/10" : "border-border opacity-75"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                    active
                      ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {Icon ? <Icon className="h-5 w-5" strokeWidth={2} /> : null}
                </div>
                {!active && <Lock className="h-4 w-4 text-muted-foreground" />}
              </div>

              <div className="mt-4 min-w-0 flex-1 space-y-1.5">
                <h3
                  className="truncate text-[15px] font-semibold tracking-tight"
                  title={module.label}
                >
                  {module.label}
                </h3>
                <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                  {module.description}
                </p>
              </div>

              <div className="mt-4">
                {active ? (
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
                      Incluído
                    </span>
                  </div>
                ) : (
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Disponível no {TIER_LABELS[requiredTier]}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Precisa de mais recursos? Faça upgrade a qualquer momento.
        </p>
        <Button
          size="lg"
          className="rounded-xl gap-2"
          onClick={() => navigate({ to: "/dashboard/subscription" })}
        >
          <Sparkles className="h-4 w-4" />
          Ver planos e fazer upgrade
        </Button>
      </div>
    </div>
  );
}
