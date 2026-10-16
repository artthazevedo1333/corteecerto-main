import { createFileRoute, Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  CreditCard,
  Scissors,
  Crown,
  Percent,
  Globe,
  BarChart3,
  Heart,
  UserPlus,
  Sparkles,
  Grid,
  Zap,
  Shield,
  MessageSquareHeart,
  HelpCircle
} from "lucide-react";

import { useModules, ModuleId } from "@/hooks/use-modules";
import { translateKey } from "@/lib/i18n";
import { SubscriptionGate } from "@/components/subscription/SubscriptionGate";
import { FeatureGate } from "@/components/subscription/FeatureGate";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import type { FeatureKey } from "@/lib/subscription";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { FloatingHelp } from "@/components/FloatingHelp";

// 1. Definições de Rotas Movidas para o Topo (Evita erros de leitura do TypeScript)
const ROUTE_FEATURE: Array<{ prefix: string; feature: FeatureKey }> = [
  { prefix: "/dashboard/agenda", feature: "agenda" },
  { prefix: "/dashboard/clients", feature: "clients" },
  { prefix: "/dashboard/services", feature: "services" },
  { prefix: "/dashboard/inventory", feature: "inventory" },
  { prefix: "/dashboard/finance", feature: "finance" },
  { prefix: "/dashboard/commissions", feature: "commissions" },
  { prefix: "/dashboard/booking", feature: "online-booking" },
  { prefix: "/dashboard/vip-plans", feature: "vip" },
  { prefix: "/dashboard/reports", feature: "reports" },
  { prefix: "/dashboard/crm", feature: "crm" },
  { prefix: "/dashboard/recovery", feature: "recovery" },
  { prefix: "/dashboard/ai", feature: "ai" },
];

function RouteFeatureGate({ pathname, children }: { pathname: string; children: ReactNode }) {
  const match = ROUTE_FEATURE.find((r) => pathname.startsWith(r.prefix));
  if (!match) return <>{children}</>;
  return <FeatureGate feature={match.feature}>{children}</FeatureGate>;
}

// 2. Declaração da Rota Principal
export const Route = createFileRoute("/dashboard/_layout")({
  staticData: { adminOnly: false },
  component: DashboardLayout,
});

// 3. Componente Layout
function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [onboarding, setOnboarding] = useState<{ userId: string; userName: string | null } | null>(null);

  const checkOnboarding = async (userId: string, fullName: string | null) => {
    const { data } = await (supabase.from("profiles") as any)
      .select("onboarding_completed_at, barber_shop_name")
      .eq("id", userId)
      .maybeSingle();
    const done = data?.onboarding_completed_at || data?.barber_shop_name;
    if (!done) setOnboarding({ userId, userName: fullName });
    else setOnboarding(null);
  };

  useEffect(() => {
    const checkUser = async () => {
      if (import.meta.env.DEV) console.log("[Auth] Dashboard layout check...");
      
      const { data: { session }, error } = await supabase.auth.getSession();

      if (session?.user) {
        setUserEmail(session.user.email ?? null);
      }

      if (error) {
        console.error("[Auth] Session check failed:", error);
        toast.error("Sua sessão expirou. Por favor, entre novamente.");
        navigate({ 
          to: "/auth",
          search: (old: any) => ({ ...old })
        });
        return;
      }

      if (!session) {
        setTimeout(async () => {
          const retryRes = await supabase.auth.getSession();
          const retrySession = retryRes?.data?.session ?? null;
          
          if (retrySession?.user) {
             setUserEmail(retrySession.user.email ?? null);
          }
          
          if (!retrySession) {
            navigate({ 
              to: "/auth",
              search: (old: any) => ({ ...old })
            });
          }
        }, 1500);
      } else {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", session.user.id)
          .single();

        if (profileError && profileError.code === "PGRST116") {
          await supabase.from("profiles").upsert({
            id: session.user.id,
            full_name: session.user.user_metadata?.full_name || "Barbeiro",
          });
        }
        await checkOnboarding(session.user.id, session.user.user_metadata?.full_name ?? null);
      }

      setLoading(false);
    };

    checkUser();
    const subRes = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUserEmail(null);
        navigate({ 
          to: "/auth",
          search: (old: any) => ({ ...old })
        });
      } else if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        setUserEmail(session?.user?.email ?? null);
        setLoading(false);
      }
    });

    return () => subRes?.data?.subscription?.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erro ao sair da conta");
    } else {
      toast.success("Até logo!");
      navigate({ 
        to: "/auth",
        search: (old: any) => ({ ...old })
      });
    }
  };

  const { isEnabled, isLoading: isModulesLoading } = useModules();
  const isSupremeAdmin = userEmail?.toLowerCase()?.trim() === "azevedoarthur120@gmail.com";

  if (loading || isModulesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-pulse text-primary font-bold text-xl uppercase tracking-widest">
            {loading ? "Autenticando..." : "Carregando perfil..."}
          </div>
          <div className="h-1.5 w-48 bg-secondary overflow-hidden rounded-full">
            <div className="h-full bg-primary animate-progress origin-left"></div>
          </div>
        </div>
      </div>
    );
  }

  const allNavItems = [
    { label: "Início", icon: LayoutDashboard, to: "/dashboard", module: null },
    { label: "Modo Barbeiro", icon: Zap, to: "/dashboard/barber-mode", module: null },
    { label: "Comunidade", icon: MessageSquareHeart, to: "/dashboard/community", module: null },
    { label: "Agenda", icon: Calendar, to: "/dashboard/agenda", module: "agenda" },
    { label: "Clientes", icon: Users, to: "/dashboard/clients", module: "clients" },
    { label: "Financeiro", icon: CreditCard, to: "/dashboard/finance", module: "finance" },
    { label: "Estoque", icon: Package, to: "/dashboard/inventory", module: "inventory" },
    { label: "Serviços", icon: Scissors, to: "/dashboard/services", module: "services" },
    { label: "Planos VIP", icon: Crown, to: "/dashboard/vip-plans", module: "vip" },
    { label: "Comissões", icon: Percent, to: "/dashboard/commissions", module: "commissions" },
    { label: "Agendamento Online", icon: Globe, to: "/dashboard/booking", module: "online-booking" },
    { label: "Relatórios", icon: BarChart3, to: "/dashboard/reports", module: "reports" },
    { label: "CRM", icon: Heart, to: "/dashboard/crm", module: "crm" },
    { label: "Recuperação", icon: UserPlus, to: "/dashboard/recovery", module: "recovery" },
    { label: "IA do Negócio", icon: Sparkles, to: "/dashboard/ai", module: "ai" },
    { label: "Módulos", icon: Grid, to: "/dashboard/modules", module: null },
    { label: "Assinatura", icon: Crown, to: "/dashboard/subscription", module: null },
    { label: "Configurações", icon: Settings, to: "/dashboard/settings", module: null },
    { label: "Ajuda e Tutoriais", icon: HelpCircle, to: "/dashboard/ajuda", module: null },
  ];

  const navItems = allNavItems.filter((item) => !item.module || isEnabled(item.module as ModuleId));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card h-screen sticky top-0">
        <div className="flex h-20 items-center px-6 border-b border-border shrink-0">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
              <Scissors className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">Corte Certo</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "bg-primary text-primary-foreground shadow-sm" }}
              className="flex items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border mt-auto space-y-1.5">
          {isSupremeAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
            >
              <Shield className="h-5 w-5" />
              <span className="font-medium text-sm">Painel Master</span>
            </Link>
          )}
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-card px-4 lg:hidden">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/20">
            <Scissors className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight">Corte Certo</span>
        </Link>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Abrir menu"
              className="text-muted-foreground min-h-11 min-w-11"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 border-border bg-card p-0">
            <div className="flex h-16 items-center px-6 border-b border-border">
              <span className="text-xl font-bold">Menu</span>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 max-h-[calc(100vh-140px)] custom-scrollbar">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  activeProps={{ className: "bg-primary text-primary-foreground shadow-sm" }}
                  className="flex items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-border space-y-1.5">
                {isSupremeAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
                  >
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Painel Master</span>
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sair</span>
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex-1 w-full pt-16 lg:pt-0 overflow-y-auto min-h-screen">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
          <SubscriptionGate>
            <RouteFeatureGate pathname={location.pathname}>
              <Outlet />
            </RouteFeatureGate>
          </SubscriptionGate>
        </div>
      </main>

      {onboarding && (
        <OnboardingWizard
          open
          userId={onboarding.userId}
          userName={onboarding.userName}
          onComplete={() => setOnboarding(null)}
        />
      )}
      
      <FloatingHelp />
    </div>
  );
}