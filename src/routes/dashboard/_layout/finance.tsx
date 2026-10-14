import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  Receipt,
  DollarSign,
  Scissors,
  Package,
  Trash2,
  AlertTriangle,
  Sparkles,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import { FinanceForm } from "@/components/dashboard/FinanceForm";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/dashboard/_layout/finance")({
  component: FinancePageWrapper,
});

function FinancePageWrapper() {
  return (
    <ErrorBoundary>
      <FinancePage />
    </ErrorBoundary>
  );
}

type Filter = "today" | "week" | "month" | "all";

function FinancePage() {
  const { t } = useTranslation();
  const [records, setRecords] = useState<any[]>([]);
  const [monthRecords, setMonthRecords] = useState<any[]>([]);
  const [todayRecords, setTodayRecords] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("month");

  useEffect(() => {
    fetchAll();
  }, [filter]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      let listStart: string | null = null;
      if (filter === "today") listStart = startOfDay;
      else if (filter === "week") {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        listStart = d.toISOString();
      } else if (filter === "month") listStart = startOfMonth;

      let listQuery = supabase
        .from("financial_records")
        .select("*")
        .order("date", { ascending: false })
        .limit(100);
      if (listStart) listQuery = listQuery.gte("date", listStart);

      const [listRes, monthRes, todayRes, apptRes, svcRes, prodRes] = await Promise.all([
        listQuery,
        supabase.from("financial_records").select("*").gte("date", startOfMonth),
        supabase.from("financial_records").select("*").gte("date", startOfDay),
        supabase
          .from("appointments")
          .select("id, status, start_time, service_id, services(name, price)")
          .gte("start_time", startOfMonth),
        supabase.from("services").select("id, name, price"),
        supabase
          .from("products")
          .select("id, name, current_stock, min_stock, sale_price, cost_price"),
      ]);

      if (listRes.error) throw listRes.error;
      setRecords(listRes.data || []);
      setMonthRecords(monthRes.data || []);
      setTodayRecords(todayRes.data || []);
      setAppointments(apptRes.data || []);
      setServices(svcRes.data || []);
      setProducts(prodRes.data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar financeiro");
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const { error } = await supabase.from("financial_records").delete().eq("id", id);
      if (error) throw error;
      toast.success("Lançamento removido");
      fetchAll();
    } catch {
      toast.error("Erro ao remover lançamento");
    }
  };

  const kpis = useMemo(() => {
    const sum = (rows: any[], type: "income" | "expense") =>
      rows.filter((r) => r.type === type).reduce((a, r) => a + Number(r.amount || 0), 0);

    const todayIncome = sum(todayRecords, "income");
    const monthIncome = sum(monthRecords, "income");
    const monthExpense = sum(monthRecords, "expense");
    const profit = monthIncome - monthExpense;
    const completed = appointments.filter((a) => a.status === "completed");
    const servicesDone = completed.length;
    const avgTicket = servicesDone > 0 ? monthIncome / servicesDone : 0;
    const margin = monthIncome > 0 ? (profit / monthIncome) * 100 : 0;

    return { todayIncome, monthIncome, monthExpense, profit, servicesDone, avgTicket, margin };
  }, [monthRecords, todayRecords, appointments]);

  const dailySeries = useMemo(() => {
    const days: Record<string, { day: string; income: number; expense: number }> = {};
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const key = String(i).padStart(2, "0");
      days[key] = { day: key, income: 0, expense: 0 };
    }
    monthRecords.forEach((r) => {
      const d = new Date(r.date);
      const key = String(d.getDate()).padStart(2, "0");
      if (!days[key]) return;
      if (r.type === "income") days[key].income += Number(r.amount || 0);
      else days[key].expense += Number(r.amount || 0);
    });
    return Object.values(days);
  }, [monthRecords]);

  const topServices = useMemo(() => {
    const map = new Map<string, { name: string; count: number; revenue: number; ticket: number }>();
    appointments
      .filter((a) => a.status === "completed" && a.services)
      .forEach((a) => {
        const name = a.services.name as string;
        const price = Number(a.services.price || 0);
        const cur = map.get(name) || { name, count: 0, revenue: 0, ticket: 0 };
        cur.count += 1;
        cur.revenue += price;
        cur.ticket = cur.revenue / cur.count;
        map.set(name, cur);
      });
    return Array.from(map.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [appointments]);

  const productHighlights = useMemo(() => {
    const withRevenue = products.map((p) => ({
      ...p,
      revenue: Number(p.sale_price || 0) * Math.max(0, Number(p.current_stock || 0)),
    }));
    const lowStock = products
      .filter((p) => Number(p.current_stock || 0) <= Number(p.min_stock || 0))
      .slice(0, 5);
    const topRevenue = [...withRevenue].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    return { lowStock, topRevenue };
  }, [products]);

  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, { income: number; expense: number }>();
    records.forEach((r) => {
      const key = r.category || "Sem categoria";
      const cur = map.get(key) || { income: 0, expense: 0 };
      if (r.type === "income") cur.income += Number(r.amount || 0);
      else cur.expense += Number(r.amount || 0);
      map.set(key, cur);
    });
    return Array.from(map.entries()).map(([name, v]) => ({ name, ...v }));
  }, [records]);

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight">Financeiro</h1>
          <p className="text-sm text-muted-foreground mt-1">Entradas, saídas e resultado do mês.</p>
        </div>
        <div className="flex items-center gap-3">
          <FilterTabs value={filter} onChange={setFilter} />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-10 rounded-xl gap-2 shadow-sm">
                <Plus className="h-4 w-4" /> Nova movimentação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-6 rounded-2xl">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-lg font-semibold">Nova movimentação</DialogTitle>
              </DialogHeader>
              <FinanceForm
                onSuccess={() => {
                  setIsAddDialogOpen(false);
                  fetchAll();
                }}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
        <Kpi
          label="Hoje"
          value={fmt(kpis.todayIncome)}
          icon={<Wallet className="h-4 w-4" />}
          tone="neutral"
        />
        <Kpi
          label="Mês"
          value={fmt(kpis.monthIncome)}
          icon={<TrendingUp className="h-4 w-4" />}
          tone="positive"
        />
        <Kpi
          label="Lucro estimado"
          value={fmt(kpis.profit)}
          icon={<Sparkles className="h-4 w-4" />}
          tone={kpis.profit >= 0 ? "positive" : "negative"}
          sub={`Margem ${kpis.margin.toFixed(0)}%`}
        />
        <Kpi
          label="Despesas"
          value={fmt(kpis.monthExpense)}
          icon={<ArrowDownRight className="h-4 w-4" />}
          tone="negative"
        />
        <Kpi
          label="Ticket médio"
          value={fmt(kpis.avgTicket)}
          icon={<Percent className="h-4 w-4" />}
          tone="neutral"
        />
        <Kpi
          label="Serviços"
          value={String(kpis.servicesDone)}
          icon={<Scissors className="h-4 w-4" />}
          tone="neutral"
          sub="Concluídos no mês"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          title="Evolução do mês"
          subtitle="Entradas x saídas por dia"
          className="lg:col-span-2"
        >
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailySeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142 71% 45%)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
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
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(142 71% 45%)"
                  strokeWidth={2}
                  fill="url(#gIncome)"
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="hsl(0 84% 60%)"
                  strokeWidth={2}
                  fill="url(#gExpense)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Top serviços" subtitle="Maior faturamento no mês">
          <div className="h-[260px]">
            {topServices.length === 0 ? (
              <EmptyMini icon={<Scissors className="h-5 w-5" />} label="Sem serviços concluídos" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topServices}
                  layout="vertical"
                  margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="hsl(var(--border))"
                    strokeDasharray="3 3"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={90}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={false}
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
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Panel>
      </div>

      {/* Services + Products highlights */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Serviços em destaque" subtitle="Mais vendidos e maior ticket">
          {topServices.length === 0 ? (
            <EmptyMini
              icon={<Scissors className="h-5 w-5" />}
              label="Nenhum serviço concluído ainda"
            />
          ) : (
            <ul className="divide-y divide-border">
              {topServices.map((s, i) => (
                <li key={s.name} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="h-7 w-7 shrink-0 rounded-lg bg-secondary text-xs font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {`${s.count} atendimentos · ticket ${fmt(s.ticket)}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-500 tabular-nums">
                    {fmt(s.revenue)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Produtos" subtitle="Estoque baixo e maior potencial">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="h-3.5 w-3.5" /> Estoque baixo
              </p>
              {productHighlights.lowStock.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">Tudo em ordem.</p>
              ) : (
                <ul className="space-y-1.5">
                  {productHighlights.lowStock.map((p) => (
                    <li key={p.id} className="flex items-center justify-between text-sm">
                      <span className="truncate">{p.name}</span>
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-500 tabular-nums">
                        {p.current_stock}/{p.min_stock}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2">
                <Package className="h-3.5 w-3.5" /> Maior faturamento potencial
              </p>
              {productHighlights.topRevenue.length === 0 ? (
                <p className="text-xs text-muted-foreground">Sem produtos cadastrados.</p>
              ) : (
                <ul className="space-y-1.5">
                  {productHighlights.topRevenue.map((p) => (
                    <li key={p.id} className="flex items-center justify-between text-sm">
                      <span className="truncate">{p.name}</span>
                      <span className="text-xs font-semibold tabular-nums">{fmt(p.revenue)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Panel>
      </div>

      {/* Movements */}
      <Panel
        title="Movimentações"
        subtitle={`${records.length} lançamentos no período`}
        icon={<Receipt className="h-4 w-4 text-muted-foreground" />}
      >
        {loading ? (
          <div className="space-y-2 py-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-secondary/40 animate-pulse" />
            ))}
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-14">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center mb-3">
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Sem movimentações no período</p>
            <p className="text-xs text-muted-foreground mt-1">
              Registre entradas e saídas para começar.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="mt-5 rounded-xl h-9">
              Lançar primeiro valor
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1fr,280px]">
            <ul className="divide-y divide-border">
              {records.map((r) => {
                const income = r.type === "income";
                return (
                  <li
                    key={r.id}
                    className="group flex items-center justify-between py-3 px-2 -mx-2 rounded-xl hover:bg-secondary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${
                          income
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500"
                            : "bg-red-500/10 text-red-600 dark:text-red-500"
                        }`}
                      >
                        {income ? (
                          <ArrowUpRight className="h-5 w-5" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {r.description || r.category || "Lançamento"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {new Date(r.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                          })}
                          <span className="mx-1.5 opacity-40">•</span>
                          {r.category || "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pl-3">
                      <span
                        className={`text-sm font-semibold tabular-nums ${
                          income
                            ? "text-emerald-600 dark:text-emerald-500"
                            : "text-red-600 dark:text-red-500"
                        }`}
                      >
                        {income ? "+" : "−"} {fmt(Number(r.amount || 0))}
                      </span>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl p-6">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir lançamento?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação remove o registro do seu fluxo de caixa permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-4">
                            <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => deleteRecord(r.id)}
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="rounded-2xl border border-border bg-secondary/30 p-4 h-fit">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Por categoria
              </p>
              {categoryBreakdown.length === 0 ? (
                <p className="text-xs text-muted-foreground">Sem dados.</p>
              ) : (
                <ul className="space-y-2.5">
                  {categoryBreakdown.slice(0, 6).map((c) => {
                    const net = c.income - c.expense;
                    return (
                      <li key={c.name} className="flex items-center justify-between">
                        <span className="text-sm truncate">{c.name}</span>
                        <span
                          className={`text-xs font-semibold tabular-nums ${
                            net >= 0
                              ? "text-emerald-600 dark:text-emerald-500"
                              : "text-red-600 dark:text-red-500"
                          }`}
                        >
                          {net >= 0 ? "+" : "−"} {fmt(Math.abs(net))}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </aside>
          </div>
        )}
      </Panel>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function FilterTabs({ value, onChange }: { value: Filter; onChange: (v: Filter) => void }) {
  const { t } = useTranslation();
  const opts: Filter[] = ["today", "week", "month", "all"];
  return (
    <div className="inline-flex bg-secondary/60 p-1 rounded-xl border border-border">
      {opts.map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-3.5 h-8 rounded-lg text-xs font-medium transition-all ${
            value === v
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {v === "today" ? "Hoje" : v === "week" ? "Semana" : v === "month" ? "Mês" : "Tudo"}
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
  tone,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  sub?: string;
  tone: "positive" | "negative" | "neutral";
}) {
  const toneCls =
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
      <p className={`text-xl md:text-2xl font-semibold tracking-tight tabular-nums ${toneCls}`}>
        {value}
      </p>
      {sub && <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
  className = "",
  icon,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-5 shadow-sm ${className}`}>
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold tracking-tight truncate">{title}</h2>
            {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
          </div>
        </div>
      </header>
      {children}
    </section>
  );
}

function EmptyMini({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
      <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center mb-2">
        {icon}
      </div>
      <p className="text-xs">{label}</p>
    </div>
  );
}
