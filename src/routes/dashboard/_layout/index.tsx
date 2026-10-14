"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  Package,
  DollarSign,
  Calendar,
  Zap,
  Star,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModules } from "@/hooks/use-modules";
import { ErrorBoundary } from "@/components/error-boundary";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useClientRetention } from "@/hooks/useClientRetention";
import { translateKey } from "@/lib/i18n";
import { FinancialGoal } from "@/components/dashboard/FinancialGoal";
import { NextAppointment } from "@/components/dashboard/NextAppointment";
import { TopServices } from "@/components/dashboard/TopServices";
import { InactiveClients } from "@/components/dashboard/InactiveClients";
import { BirthdayCard } from "@/components/dashboard/BirthdayCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SmartDaySummary } from "@/components/dashboard/SmartDaySummary";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard/_layout/")({
  component: DashboardHomeWrapper,
});

function DashboardHomeWrapper() {
  return (
    <ErrorBoundary>
      <DashboardHome />
    </ErrorBoundary>
  );
}

const currency = (v: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(v || 0);

function DashboardHome() {
  const { t } = useTranslation();
  const [userName, setUserName] = useState("Barbeiro");
  const { isEnabled } = useModules();
  const {
    nextAppointment,
    today,
    week,
    month,
    topServices,
    birthdays,
    lowStockCount,
    loading,
    refresh,
  } = useDashboardData() as any;

  const { inactiveClients } = useClientRetention();

  useEffect(() => {
    const getProfile = async () => {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (user) {
        setUserName(user.user_metadata?.full_name?.split(" ")[0] || "Barbeiro");
      }
    };
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 pb-10 animate-pulse">
        <div className="h-10 w-72 bg-secondary rounded-2xl" />
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-secondary rounded-3xl" />
          ))}
        </div>
        <div className="h-48 w-full bg-secondary rounded-3xl" />
      </div>
    );
  }

  const goalPercent = month.goal > 0 ? Math.round((month.revenue / month.goal) * 100) : 0;
  const avgTicket = month.count > 0 ? month.revenue / month.count : 0;
  const statCards = [
    {
      key: "revenue_today",
      labelKey: "Faturamento hoje",
      value: currency(today.revenue),
      hintKey: today.count === 1 ? `${today.count} atendimento` : `${today.count} atendimentos`,
      hintOptions: { count: today.count },
      icon: <DollarSign className="h-5 w-5 text-emerald-600" />,
      accent: "bg-emerald-500/10",
    },
    {
      key: "monthly_goal",
      labelKey: "Meta mensal",
      value: `${goalPercent}%`,
      hintKey: `${currency(month.revenue)} de ${currency(month.goal)}`,
      hintOptions: { current: currency(month.revenue), goal: currency(month.goal) },
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      accent: "bg-primary/10",
    },
    {
      key: "clients_at_risk",
      labelKey: "Clientes em risco",
      value: inactiveClients.length.toString(),
      hintKey: "Precisam de atenção",
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      accent: "bg-orange-500/10",
      alert: inactiveClients.length > 0,
    },
    {
      key: "average_ticket",
      labelKey: "Ticket médio",
      value: currency(avgTicket),
      hintKey: `Base de ${month.count} atend.`,
      hintOptions: { count: month.count },
      icon: <Star className="h-5 w-5 text-amber-500" />,
      accent: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-3xl md:text-4xl font-bold tracking-tight">
            Olá, {userName}
          </h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            Aqui está sua barbearia em tempo real.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="shrink-0 rounded-2xl h-11 md:h-12 px-4 md:px-6 gap-2 shadow-sm shadow-primary/10"
        >
          <Link to="/dashboard/barber-mode">
            <Zap className="h-4 w-4 fill-current" />
            <span className="hidden sm:inline">Modo Barbeiro</span>
          </Link>
        </Button>
      </header>

      {/* KPIs — primeira dobra */}
      <section className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statCards.map((metric) => (
          <StatCard
            key={metric.key}
            label={metric.labelKey}
            value={metric.value}
            hint={metric.hintKey}
            icon={metric.icon}
            accent={metric.accent}
            alert={metric.alert}
          />
        ))}
      </section>

      {/* Resumo inteligente do dia */}
      <section>
        <SmartDaySummary />
      </section>

      {/* Ações rápidas */}
      <section>
        <QuickActions />
      </section>

      {/* Next appointment — foco */}
      {isEnabled("agenda") && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Próximo atendimento
              </h2>
            </div>
            <Link
              to="/dashboard/agenda"
              className="text-sm font-medium text-primary hover:underline"
            >
              Ver agenda →
            </Link>
          </div>
          <NextAppointment appointment={nextAppointment} onUpdate={refresh} />
        </section>
      )}

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div
            className={`grid gap-6 ${isEnabled("finance") ? "md:grid-cols-2" : "md:grid-cols-1"}`}
          >
            {isEnabled("finance") && <FinancialGoal current={month.revenue} goal={month.goal} />}
            <BirthdayCard birthdays={birthdays} />
          </div>

          {(isEnabled("services") || isEnabled("recovery")) && (
            <div
              className={`grid gap-6 ${
                isEnabled("services") && isEnabled("recovery") ? "md:grid-cols-2" : "md:grid-cols-1"
              }`}
            >
              {isEnabled("services") && <TopServices services={topServices} />}
              {isEnabled("recovery") && <InactiveClients clients={inactiveClients} />}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {isEnabled("inventory") && (
            <Card className="rounded-3xl border-border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                        lowStockCount > 0
                          ? "bg-red-500/10 text-red-600"
                          : "bg-emerald-500/10 text-emerald-600"
                      }`}
                    >
                      <Package className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Estoque
                      </p>
                      <p className="text-xl font-bold tabular-nums leading-tight">
                        {lowStockCount}
                        <span className="ml-1.5 text-xs font-medium text-muted-foreground">
                          em alerta
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="shrink-0 rounded-xl">
                    <Link to="/dashboard/inventory">Abrir</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="rounded-3xl border-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-white/15 p-2 backdrop-blur-sm">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-90">
                  Insights
                </p>
              </div>
              <h3 className="text-xl font-bold leading-tight">Cresça sua barbearia com dados</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                A Corte Certo AI analisa seu movimento e sugere ações concretas para elevar seu
                faturamento.
              </p>
              <Button
                asChild
                variant="secondary"
                className="w-full rounded-xl bg-white text-primary hover:bg-white/90"
              >
                <Link to="/dashboard/ai">Ver insights</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border bg-card shadow-sm">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Semana
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold tabular-nums">{currency(week.revenue)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {week.count === 1 ? `${week.count} atendimento` : `${week.count} atendimentos`}
                  </p>
                </div>
                <Link
                  to="/dashboard/reports"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Relatórios →
                </Link>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon,
  accent,
  alert,
}: {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
  accent: string;
  alert?: boolean;
}) {
  return (
    <Card
      className={`group rounded-3xl border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${
        alert ? "ring-2 ring-red-500/60 border-red-500/30" : "border-border"
      }`}
    >
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={`grid h-10 w-10 place-items-center rounded-2xl transition-transform group-hover:scale-105 ${accent}`}
          >
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-bold tracking-tight tabular-nums">{value}</p>
          <p className="text-xs text-muted-foreground truncate">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}