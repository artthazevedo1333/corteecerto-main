import { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Crown, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSubscription } from "@/hooks/use-subscription";
import {
  effectiveFeaturesForSubscription,
  FEATURE_LABELS,
  FeatureKey,
  minPlanForFeature,
  TIER_LABELS,
} from "@/lib/subscription";

interface Props {
  feature: FeatureKey;
  children: ReactNode;
}

/**
 * Bloqueia o acesso a um recurso quando o plano atual não o inclui
 * OU quando o status da assinatura não permite recursos pagos.
 * Nunca esconde apenas o menu — protege também o acesso via URL direta.
 */
export function FeatureGate({ feature, children }: Props) {
  const { subscription, isLoading } = useSubscription();
  const navigate = useNavigate();

  if (isLoading) return null;

  if (effectiveFeaturesForSubscription(subscription).includes(feature)) {
    return <>{children}</>;
  }

  const requiredTier = minPlanForFeature(feature);
  const featureName = FEATURE_LABELS[feature];
  const tierName = TIER_LABELS[requiredTier];

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-lg rounded-3xl border-border bg-card p-8 md:p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
          <Crown className="h-3.5 w-3.5" />
          Recurso exclusivo do plano {tierName}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
          {featureName} está disponível no plano {tierName}
        </h1>
        <p className="text-muted-foreground text-base mb-8 leading-relaxed">
          Faça upgrade da sua assinatura para desbloquear{" "}
          <strong className="text-foreground">{featureName}</strong> e todos os recursos do plano{" "}
          {tierName}. Sua barbearia merece o próximo nível.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            className="flex-1 h-12 rounded-xl gap-2 shadow-sm"
            onClick={() => navigate({ to: "/dashboard/subscription" })}
          >
            <Sparkles className="h-4 w-4" />
            Ver planos e fazer upgrade
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onClick={() => navigate({ to: "/dashboard" })}
          >
            Voltar
          </Button>
        </div>
      </Card>
    </div>
  );
}
