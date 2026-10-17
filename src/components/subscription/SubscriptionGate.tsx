import { ReactNode } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { Scissors, Crown, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/use-subscription";
import { PLAN_LABELS } from "@/lib/subscription";

interface Props {
  children: ReactNode;
}

export function SubscriptionGate({ children }: Props) {
  const { subscription, isLoading, hasAccess } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();

  // Sempre permitir a própria tela de assinatura
  if (location.pathname.startsWith("/dashboard/subscription")) return <>{children}</>;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm uppercase tracking-widest">
          Verificando assinatura…
        </div>
      </div>
    );
  }

  if (hasAccess) return <>{children}</>;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ 
      to: "/auth",
      search: (old: any) => ({ ...old })
    });
  };

  const statusLabel: Record<string, string> = {
    overdue: "Pagamento em atraso",
    suspended: "Acesso suspenso",
    cancelled: "Assinatura cancelada",
    trial: "Período de avaliação encerrado",
  };
  const label = subscription
    ? (statusLabel[subscription.status] ?? "Acesso encerrado")
    : "Sem assinatura ativa";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card shadow-xl p-8 md:p-10 text-center animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 mb-6">
          <Crown className="h-8 w-8 text-primary" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
          <Scissors className="h-3.5 w-3.5" />
          {subscription ? PLAN_LABELS[subscription.plan] : "Corte Certo"} · {label}
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Seu período de acesso terminou</h1>
        <p className="text-muted-foreground text-base mb-8 leading-relaxed">
          Renove sua assinatura para continuar utilizando o Corte Certo e manter sua barbearia
          rodando sem interrupções.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            className="flex-1 h-12 rounded-xl gap-2 shadow-sm"
            onClick={() => navigate({ to: "/dashboard/subscription" })}
          >
            <Sparkles className="h-4 w-4" />
            Assinar agora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 h-12 rounded-xl gap-2"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sair da conta
          </Button>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Precisa de ajuda? Fale com nosso suporte.
        </p>
      </div>
    </div>
  );
}

