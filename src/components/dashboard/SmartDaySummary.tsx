import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { translateKey } from "@/lib/i18n";
import {
  Sparkles,
  Calendar,
  DollarSign,
  UserCheck,
  XCircle,
  Package,
  Clock,
  ArrowRight,
} from "lucide-react";
import { startOfToday, endOfToday, format } from "date-fns";
import { ptBR } from "date-fns/locale";

type DayData = {
  totalToday: number;
  completedToday: number;
  scheduledToday: number;
  pendingConfirmation: number;
  cancelledToday: number;
  expectedRevenue: number;
  lowStock: number;
  nextClient: { name: string; time: string } | null;
} | null;

const currency = (v: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(v || 0);

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export function SmartDaySummary() {
  const { t } = useTranslation();
  const [data, setData] = useState<DayData>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        const user = auth?.user;
        if (!user) {
          if (mounted) setLoading(false);
          return;
        }

        const now = new Date();
        const sToday = startOfToday().toISOString();
        const eToday = endOfToday().toISOString();

        const [{ data: appts }, { data: products }] = await Promise.all([
          supabase
            .from("appointments")
            .select("start_time, status, service:services(price), client:clients(name)")
            .eq("user_id", user.id)
            .gte("start_time", sToday)
            .lte("start_time", eToday)
            .order("start_time", { ascending: true }),
          supabase.from("products").select("current_stock, min_stock").eq("user_id", user.id),
        ]);

        const list = appts || [];
        const completed = list.filter((a) => a.status === "completed");
        const scheduled = list.filter(
          (a) => a.status === "scheduled" || a.status === "in_progress",
        );
        const pending = list.filter((a) => a.status === "pending");
        const cancelled = list.filter((a) => a.status === "cancelled" || a.status === "no_show");

        const expectedRevenue =
          completed.reduce((s, a: any) => s + (a.service?.price || 0), 0) +
          scheduled.reduce((s, a: any) => s + (a.service?.price || 0), 0);

        const upcoming = scheduled.find((a) => new Date(a.start_time) >= now) as any;

        const lowStock = (products || []).filter(
          (p) => (p.current_stock ?? 0) <= (p.min_stock ?? 0),
        ).length;

        if (!mounted) return;
        setData({
          totalToday: list.length,
          completedToday: completed.length,
          scheduledToday: scheduled.length,
          pendingConfirmation: pending.length,
          cancelledToday: cancelled.length,
          expectedRevenue,
          lowStock,
          nextClient: upcoming
            ? {
                name: upcoming.client?.name || "Cliente",
                time: format(new Date(upcoming.start_time), "HH:mm", { locale: ptBR }),
              }
            : null,
        });
      } catch (e) {
        console.error("[SmartDaySummary] error", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const message = useMemo(() => {
    if (!data) return "";
    const { totalToday, pendingConfirmation, lowStock, scheduledToday, cancelledToday } = data;
    if (pendingConfirmation > 0)
      return `Você tem ${pendingConfirmation} ${pendingConfirmation === 1 ? "cliente" : "clientes"} aguardando confirmação.`;
    if (lowStock > 0) return "Seu estoque precisa de atenção.";
    if (totalToday === 0)
      return "Nenhum atendimento hoje. Ótimo momento para divulgar horários livres.";
    if (totalToday >= 8) return "Hoje será um dia movimentado. Mantenha o ritmo!";
    if (scheduledToday === 0 && totalToday > 0) return "Seu dia está praticamente completo.";
    if (cancelledToday >= 2) return "Alguns cancelamentos hoje. Considere reabrir horários.";
    return "Seu dia está sob controle. Bom trabalho!";
  }, [data]);

  const action = useMemo(() => {
    if (!data) return null;
    if (data.pendingConfirmation > 0)
      return { label: "Confirmar clientes", to: "/dashboard/agenda" as const, icon: UserCheck };
    if (data.lowStock > 0)
      return { label: "Ver estoque", to: "/dashboard/inventory" as const, icon: Package };
    if (data.scheduledToday > 0)
      return { label: "Abrir agenda", to: "/dashboard/agenda" as const, icon: Calendar };
    return { label: "Registrar venda", to: "/dashboard/finance" as const, icon: DollarSign };
  }, [data]);

  if (loading) {
    return (
      <Card className="rounded-3xl border-border bg-card shadow-sm animate-pulse">
        <CardContent className="p-6 h-40" />
      </Card>
    );
  }

  if (!data || (data.totalToday === 0 && data.lowStock === 0 && data.pendingConfirmation === 0)) {
    // Still render a minimal, tranquil card
  }

  const items: { key: string; label: string; value: string; icon: any; show: boolean }[] = [
    {
      key: "count",
      label: "Atendimentos",
      value: String(data?.totalToday ?? 0),
      icon: Calendar,
      show: (data?.totalToday ?? 0) > 0,
    },
    {
      key: "revenue",
      label: "Previsão do dia",
      value: currency(data?.expectedRevenue ?? 0),
      icon: DollarSign,
      show: (data?.expectedRevenue ?? 0) > 0,
    },
    {
      key: "next",
      label: "Próximo cliente",
      value: data?.nextClient ? `${data.nextClient.time} · ${data.nextClient.name}` : "",
      icon: Clock,
      show: !!data?.nextClient,
    },
    {
      key: "pending",
      label: "Aguardando confirmação",
      value: String(data?.pendingConfirmation ?? 0),
      icon: UserCheck,
      show: (data?.pendingConfirmation ?? 0) > 0,
    },
    {
      key: "cancelled",
      label: "Cancelamentos hoje",
      value: String(data?.cancelledToday ?? 0),
      icon: XCircle,
      show: (data?.cancelledToday ?? 0) > 0,
    },
    {
      key: "stock",
      label: "Estoque baixo",
      value: String(data?.lowStock ?? 0),
      icon: Package,
      show: (data?.lowStock ?? 0) > 0,
    },
  ].filter((i) => i.show);

  return (
    <Card className="rounded-3xl border-border bg-card shadow-sm">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Resumo inteligente do dia
              </p>
              <p className="mt-1 text-base md:text-lg font-semibold leading-snug text-foreground">
                {greeting()}! {message}
              </p>
            </div>
          </div>
          {action && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="shrink-0 rounded-xl gap-1.5 hidden sm:inline-flex"
            >
              <Link to={action.to}>
                <action.icon className="h-4 w-4" />
                {action.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>

        {items.length > 0 && (
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((it) => (
              <div
                key={it.key}
                className="rounded-2xl border border-border/60 bg-secondary/30 p-3 flex items-center gap-3"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-background text-muted-foreground">
                  <it.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground truncate">
                    {it.label}
                  </p>
                  <p className="text-sm font-semibold tabular-nums truncate">{it.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {action && (
          <Button
            asChild
            size="sm"
            variant="outline"
            className="w-full rounded-xl gap-1.5 sm:hidden"
          >
            <Link to={action.to}>
              <action.icon className="h-4 w-4" />
              {action.label}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
