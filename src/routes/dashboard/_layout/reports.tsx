import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Download,
  Scissors,
  Wallet,
  Percent,
  Sparkles,
} from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { format, subDays, startOfDay, endOfDay, eachDayOfInterval } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/_layout/reports")({
  component: () => (
    <ErrorBoundary>
      <ReportsPage />
    </ErrorBoundary>
  ),
});

type Period = 7 | 30 | 90;

function ReportsPage() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<Period>(30);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const from = startOfDay(subDays(new Date(), period - 1));
        const to = endOfDay(new Date());
        const [r, a] = await Promise.all([
          supabase
            .from("financial_records")
            .select("*")
            .gte("date", format(from, "yyyy-MM-dd"))
            .lte("date", format(to, "yyyy-MM-dd")),
          supabase
            .from("appointments")
            .select(
              "id, status, start_time, service:services(id,name,price), client:clients(id,name)",
            )
            .gte("start_time", from.toISOString())
            .lte("start_time", to.toISOString()),
        ]);
        if (r.error) throw r.error;
        if (a.error) throw a.error;
        setRecords(r.data || []);
        setAppointments(a.data || []);
      } catch {
        toast.error("Erro ao carregar relatórios");
      } finally {
        setLoading(false);
      }
    })();
  }, [period]);

  const metrics = useMemo(() => {
    const income = records.filter((r) => r.type === "income");
    const expense = records.filter((r) => r.type === "expense");
    const totalIncome = income.reduce((s, r) => s + Number(r.amount || 0), 0);
    const totalExpense = expense.reduce((s, r) => s + Number(r.amount || 0), 0);
    const completed = appointments.filter((a) => a.status === "completed");
    const ticket = completed.length ? totalIncome / completed.length : 0;
    const uniqueClients = new Set(appointments.map((a) => a.client?.id).filter(Boolean)).size;
    const margin = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
    return {
      totalIncome,
      totalExpense,
      profit: totalIncome - totalExpense,
      margin,
      completed: completed.length,
      ticket,
      uniqueClients,
    };
  }, [records, appointments]);

  const dailyData = useMemo(() => {
    const days = eachDayOfInterval({
      start: subDays(new Date(), period - 1),
      end: new Date(),
    });
    return days.map((d) => {
      const key = format(d, "yyyy-MM-dd");
      const dayIncome = records
        .filter((r) => r.type === "income" && r.date === key)
        .reduce((s, r) => s + Number(r.amount || 0), 0);
      const dayExpense = records
        .filter((r) => r.type === "expense" && r.date === key)
        .reduce((s, r) => s + Number(r.amount || 0), 0);
      return {
        label: format(d, period === 7 ? "EEE" : "dd/MM"),
        receita: dayIncome,
        despesa: dayExpense,
      };
    });
  }, [records, period]);

  const servicesData = useMemo(() => {
    const map = new Map<string, { name: string; count: number; revenue: number }>();
    appointments
      .filter((a) => a.status === "completed" && a.service)
      .forEach((a) => {
        const key = a.service.id;
        const existing = map.get(key) || {
          name: a.service.name,
          count: 0,
          revenue: 0,
        };
        existing.count += 1;
        existing.revenue += Number(a.service.price || 0);
        map.set(key, existing);
      });
    return Array.from(map.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6);
  }, [appointments]);

  const topClients = useMemo(() => {
    const map = new Map<string, { name: string; count: number; revenue: number }>();
    appointments
      .filter((a) => a.status === "completed" && a.client)
      .forEach((a) => {
        const key = a.client.id;
        const existing = map.get(key) || {
          name: a.client.name,
          count: 0,
          revenue: 0,
        };
        existing.count += 1;
        existing.revenue += Number(a.service?.price || 0);
        map.set(key, existing);
      });
    return Array.from(map.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [appointments]);

  const exportCsv = () => {
    const rows = [
      ["Data", "Tipo", "Categoria", "Valor", "Descrição"],
      ...records.map((r) => [
        r.date,
        r.type,
        r.category || "",
        String(r.amount),
        (r.description || "").replace(/[,\n]/g, " "),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado");
  };

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(142 71% 45%)",
    "hsl(38 92% 50%)",
    "hsl(0 84% 60%)",
    "hsl(262 83% 58%)",
    "hsl(330 81% 60%)",
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight">
            Relatórios e Análises
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acompanhe o desempenho financeiro e operacional da barbearia.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PeriodTabs value={period} onChange={setPeriod} />
          <Button onClick={exportCsv} variant="outline" className="h-10 rounded-xl gap-2">
            <Download className="h-4 w-4" /> CSV
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="grid gap-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-secondary/40 animate-pulse" />
            ))}
          </div>
          <div className="h-72 rounded-2xl bg-secondary/40 animate-pulse" />
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
            <Kpi
              label="Faturamento"
              value={fmt(metrics.totalIncome)}
              icon={<Wallet className="h-4 w-4" />}
              tone="positive"
            />
            <Kpi
              label="Despesas"
              value={fmt(metrics.totalExpense)}
              icon={<TrendingUp className="h-4 w-4" />}
              tone="negative"
            />
            <Kpi
              label="Lucro"
              value={fmt(metrics.profit)}
              icon={<Sparkles className="h-4 w-4" />}
              tone={metrics.profit >= 0 ? "positive" : "negative"}
              sub={`Margem ${metrics.margin.toFixed(0)}%`}
            />
            <Kpi
              label="Ticket médio"
              value={fmt(metrics.ticket)}
              icon={<Percent className="h-4 w-4" />}
            />
            <Kpi
              label="Atendimentos"
              value={String(metrics.completed)}
              icon={<Scissors className="h-4 w-4" />}
            />
            <Kpi
              label="Clientes"
              value={String(metrics.uniqueClients)}
              icon={<Users className="h-4 w-4" />}
              sub="Únicos no período"
            />
          </div>

          {/* Main chart */}
          <Panel
            title="Receita × Despesa"
            subtitle="Evolução diária no período"
            icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          >
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid
                    stroke="hsl(var(--border))"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={false}
                    width={50}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    formatter={(v: any) => fmt(Number(v))}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar
                    dataKey="receita"
                    name="Receita"
                    fill="hsl(142 71% 45%)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="despesa"
                    name="Despesa"
                    fill="hsl(0 84% 60%)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* Grid: services + clients */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel title="Serviços mais vendidos" subtitle="Distribuição do faturamento">
              {servicesData.length === 0 ? (
                <Empty label="Sem serviços concluídos no período" />
              ) : (
                <div className="grid md:grid-cols-[1fr,1fr] gap-4 items-center">
                  <div className="h-56">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={servicesData}
                          dataKey="revenue"
                          nameKey="name"
                          innerRadius={45}
                          outerRadius={80}
                          paddingAngle={2}
                        >
                          {servicesData.map((_, i) => (
                            <Cell
                              key={i}
                              fill={COLORS[i % COLORS.length]}
                              stroke="hsl(var(--card))"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: 12,
                            fontSize: 12,
                          }}
                          formatter={(v: any) => fmt(Number(v))}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <ul className="space-y-2">
                    {servicesData.map((s, i) => (
                      <li key={s.name} className="flex items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ background: COLORS[i % COLORS.length] }}
                          />
                          <span className="truncate">{s.name}</span>
                        </div>
                        <span className="text-xs font-semibold tabular-nums whitespace-nowrap">
                          {fmt(s.revenue)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Panel>

            <Panel title="Top clientes" subtitle="Quem mais gerou receita">
              {topClients.length === 0 ? (
                <Empty label="Sem atendimentos concluídos no período" />
              ) : (
                <ul className="divide-y divide-border">
                  {topClients.map((c, i) => (
                    <li key={c.name} className="flex items-center justify-between py-3 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="h-7 w-7 shrink-0 rounded-lg bg-secondary text-xs font-semibold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{c.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {c.count} atendimento{c.count > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-500 tabular-nums">
                        {fmt(c.revenue)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- UI helpers ---------- */

function PeriodTabs({ value, onChange }: { value: Period; onChange: (p: Period) => void }) {
  return (
    <div className="inline-flex bg-secondary/60 p-1 rounded-xl border border-border">
      {([7, 30, 90] as Period[]).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3.5 h-8 rounded-lg text-xs font-medium transition-all ${
            value === p
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {p}d
        </button>
      ))}
    </div>
  );
}

function Kpi({
  label,
  value,
  icon,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  sub?: string;
  tone?: "neutral" | "positive" | "negative";
}) {
  const cls =
    tone === "positive"
      ? "text-emerald-600 dark:text-emerald-500"
      : tone === "negative"
        ? "text-red-600 dark:text-red-500"
        : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <span className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
          {icon}
        </span>
      </div>
      <p className={`text-xl md:text-2xl font-semibold tracking-tight tabular-nums ${cls}`}>
        {value}
      </p>
      {sub && <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <header className="flex items-center gap-2 mb-4">
        {icon}
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold tracking-tight truncate">{title}</h2>
          {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="h-40 flex items-center justify-center text-center text-xs text-muted-foreground">
      {label}
    </div>
  );
}
