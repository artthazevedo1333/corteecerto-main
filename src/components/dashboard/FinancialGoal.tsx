import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp } from "lucide-react";

interface FinancialGoalProps {
  current?: number | null;
  goal?: number | null;
}

export function FinancialGoal({ current, goal }: FinancialGoalProps) {
  const safeCurrent = Number(current) || 0;
  const safeGoal = Number(goal) || 0;
  const percent = safeGoal > 0 ? Math.min(Math.round((safeCurrent / safeGoal) * 100), 100) : 0;
  const remaining = Math.max(safeGoal - safeCurrent, 0);

  const now = new Date();
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const dailyPace = dayOfMonth > 0 ? safeCurrent / dayOfMonth : 0;
  const projected = Math.round(dailyPace * daysInMonth);
  const daysToReach = dailyPace > 0 && remaining > 0 ? Math.ceil(remaining / dailyPace) : 0;
  const daysLeftInMonth = daysInMonth - dayOfMonth;

  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

  const forecastLabel =
    safeGoal === 0
      ? "Defina uma meta em Configurações"
      : percent >= 100
        ? "Meta alcançada este mês 🎉"
        : daysToReach === 0
          ? "Sem dados suficientes ainda"
          : daysToReach <= daysLeftInMonth
            ? `No ritmo atual, meta em ${daysToReach} dia${daysToReach > 1 ? "s" : ""}`
            : `No ritmo atual, projeção de ${currency.format(projected)}`;

  return (
    <Card className="group rounded-3xl border-border bg-card shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-2.5 ring-1 ring-primary/15">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Meta mensal
              </p>
              <p className="text-sm text-muted-foreground">
                {currency.format(safeCurrent)} de {currency.format(safeGoal)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold tracking-tight tabular-nums">
              {percent}
              <span className="text-lg text-muted-foreground">%</span>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div
            className="relative h-2.5 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-secondary/50 p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Faltam
            </p>
            <p className="text-lg font-bold tabular-nums mt-1">{currency.format(remaining)}</p>
          </div>
          <div className="rounded-2xl bg-primary/5 p-3 ring-1 ring-primary/10">
            <p className="text-[11px] font-medium uppercase tracking-wider text-primary/80">
              Projeção
            </p>
            <p className="text-lg font-bold tabular-nums mt-1 text-primary">
              {currency.format(projected)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>{forecastLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
}
