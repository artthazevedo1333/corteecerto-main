import { useAdminWhitelist, useAddAdmin, useRemoveAdmin } from "@/lib/adminWhitelistQueries";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Ban,
  CalendarClock,
  CheckCircle2,
  Crown,
  DollarSign,
  KeyRound,
  Loader2,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createPromotionalLicense,
  deleteUser,
  getAdminOverview,
  setPromotionalLicenseActive,
  setUserRole,
  updateAdminSubscription,
} from "@/lib/admin.functions";
import { PLAN_LABELS, type SubscriptionPlan, type SubscriptionStatus } from "@/lib/subscription";
import { HelpCenter, MetricHint } from "@/components/admin/HelpCenter";
// IMPORTANTE: Importando o hook que nós corrigimos!
import { useAdminAccess } from "@/hooks/useAdminAccess"; 

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin SaaS — Corte Certo" },
      { name: "description", content: "Painel master do proprietário para gestão administrativa do Corte Certo." },
    ],
  }),
  // Removemos o beforeLoad daqui para evitar o bloqueio prematuro
  component: AdminPage,
});

type Customer = {
  id: string;
  email: string | null;
  fullName: string;
  shopName: string | null;
  phone: string | null;
  createdAt: string | null;
  paidTotal: number;
  paymentCount: number;
  billing: Array<Record<string, any>>;
  roles: string[];
  subscription: {
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    current_period_end: string | null;
    trial_ends_at: string | null;
    grace_period_until: string | null;
  } | null;
};

const ROLE_OPTIONS: Array<{ value: "owner" | "admin" | "support" | "user"; label: string }> = [
  { value: "owner", label: "Proprietário" },
  { value: "admin", label: "Administrador" },
  { value: "support", label: "Suporte" },
];

type AdminOverview = {
  stats?: Record<string, number>;
  metrics?: {
    planCounts?: Record<string, number>;
    conversionRate?: number;
    monthlyRevenue?: number;
    annualRevenue?: number;
    cancellations?: number;
    averageStayDays?: number;
    lifetimeCount?: number;
    revenueByMonth?: Record<string, number>;
  };
  customers?: Customer[];
  licenses?: Array<Record<string, any>>;
};

const STATUS_META: Record<string, { label: string; className: string }> = {
  trial: {
    label: "Período de teste",
    className: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  },
  active: { label: "Ativa", className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" },
  overdue: {
    label: "Inadimplente",
    className: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  suspended: { label: "Suspensa", className: "bg-red-500/10 text-red-700 border-red-500/20" },
  cancelled: { label: "Cancelada", className: "bg-muted text-muted-foreground border-border" },
};

const ACTION_LABELS: Record<string, string> = {
  change_plan: "Alterar plano",
  activate: "Ativar assinatura",
  suspend: "Suspender assinatura",
  cancel: "Cancelar assinatura",
  reactivate: "Reativar assinatura",
  grant_days: "Conceder dias",
  grant_months: "Conceder meses",
  lifetime: "Licença vitalícia",
  end_trial: "Encerrar teste",
  restart_trial: "Reiniciar teste",
};

const plans: SubscriptionPlan[] = ["starter", "professional", "premium", "lifetime"];
const statuses = ["all", "trial", "active", "overdue", "suspended", "cancelled"];

function currency(value: number) {
  if (import.meta.env.DEV) {
    console.log("[Admin] Formatando valor monetário:", value);
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function shortDate(value?: string | null) {
  if (!value) return "—";
  return format(new Date(value), "dd/MM/yyyy");
}

function AdminPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  // Utilizando o hook seguro
  const { isAdmin, isLoading: isAuthLoading } = useAdminAccess();

  const loadOverview = useServerFn(getAdminOverview);
  const updateSubscription = useServerFn(updateAdminSubscription);
  const createLicense = useServerFn(createPromotionalLicense);
  const setLicenseActive = useServerFn(setPromotionalLicenseActive);
  const setRole = useServerFn(setUserRole);
  const removeUser = useServerFn(deleteUser);

  const roleMutation = useMutation({
    mutationFn: (vars: {
      targetUserId: string;
      role: "owner" | "admin" | "support" | "user";
      grant: boolean;
    }) => setRole({ data: vars }),
    onSuccess: () => {
      toast.success("Roles atualizadas");
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Erro ao atualizar role"),
  });

  const deleteMutation = useMutation({
    mutationFn: (targetUserId: string) => removeUser({ data: { targetUserId } }),
    onSuccess: () => {
      toast.success("Usuário excluído");
      setSelectedCustomer(null);
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Erro ao excluir"),
  });

  const { data: whitelist, isLoading: whitelistLoading } = useAdminWhitelist();
  const addAdminMutation = useAddAdmin();
  const removeAdminMutation = useRemoveAdmin();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [action, setAction] = useState("change_plan");
  const [actionPlan, setActionPlan] = useState<SubscriptionPlan>("starter");
  const [actionAmount, setActionAmount] = useState(1);
  const [licenseCode, setLicenseCode] = useState("");
  const [licensePlan, setLicensePlan] = useState<SubscriptionPlan>("professional");
  const [licenseMaxUses, setLicenseMaxUses] = useState(50);
  const [licenseMonths, setLicenseMonths] = useState(1);
  const [licenseExpiresAt, setLicenseExpiresAt] = useState("");
  const [licenseLifetime, setLicenseLifetime] = useState(false);
  const [newWhitelistEmail, setNewWhitelistEmail] = useState("");

  const overviewQuery = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => loadOverview() as Promise<AdminOverview>,
    enabled: isAdmin, // Só carrega os dados se for admin confirmado
    staleTime: 20_000,
    retry: false,
  });

  // Redirecionamento seguro caso o carregamento termine e não seja admin
  useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [isAuthLoading, isAdmin, navigate]);

  const actionMutation = useMutation({
    mutationFn: () => {
      if (!selectedCustomer) throw new Error("Cliente não selecionado");
      return updateSubscription({
        data: {
          targetUserId: selectedCustomer.id,
          action,
          plan: action === "change_plan" || action === "activate" ? actionPlan : undefined,
          amount: action === "grant_days" || action === "grant_months" ? actionAmount : undefined,
        },
      });
    },
    onSuccess: () => {
      toast.success("Assinatura atualizada");
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Erro ao executar ação"),
  });

  const licenseMutation = useMutation({
    mutationFn: () =>
      createLicense({
        data: {
          code: licenseCode,
          plan: licensePlan,
          maxUses: licenseMaxUses || null,
          expiresAt: licenseExpiresAt || null,
          monthsGranted: licenseMonths,
          lifetime: licenseLifetime,
        },
      }),
    onSuccess: () => {
      toast.success("Licença criada");
      setLicenseCode("");
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Erro ao criar licença"),
  });

  const toggleLicenseMutation = useMutation({
    mutationFn: ({ licenseId, active }: { licenseId: string; active: boolean }) =>
      setLicenseActive({ data: { licenseId, active } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-overview"] }),
    onError: (error: any) => toast.error(error?.message ?? "Erro ao atualizar licença"),
  });

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailToAdd = newWhitelistEmail.toLowerCase().trim();
    if (!emailToAdd) return;
    try {
      await addAdminMutation.mutateAsync(emailToAdd);
      toast.success("E-mail adicionado à whitelist com sucesso.");
      setNewWhitelistEmail("");
    } catch (error: any) {
      toast.error(error?.message ?? "Erro ao adicionar à whitelist.");
    }
  };

  const overview = overviewQuery.data || {};
  const filteredCustomers = useMemo(() => {
    const customers = overview?.customers ?? [];
    const term = search.trim().toLowerCase();
    return customers
      .filter((customer) => {
        const status = customer?.subscription?.status ?? "cancelled";
        const matchesStatus = statusFilter === "all" || status === statusFilter;
        const haystack =
          `${customer?.fullName ?? ""} ${customer?.shopName ?? ""} ${customer?.email ?? ""}`.toLowerCase();
        return matchesStatus && (!term || haystack.includes(term));
      })
      .sort((a, b) => {
        if (sortBy === "mrr") return (b?.paidTotal ?? 0) - (a?.paidTotal ?? 0);
        if (sortBy === "status") {
          return (a?.subscription?.status ?? "").localeCompare(b?.subscription?.status ?? "");
        }
        return new Date(b?.createdAt ?? 0).getTime() - new Date(a?.createdAt ?? 0).getTime();
      });
  }, [overview?.customers, search, sortBy, statusFilter]);

  const latestRevenueMonths = useMemo(
    () =>
      Object.entries(overview?.metrics?.revenueByMonth ?? {})
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-6),
    [overview?.metrics?.revenueByMonth],
  );

  // Estados de Carregamento
  if (isAuthLoading || overviewQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Se não for admin (mostra uma tela vazia e o useEffect redireciona)
  if (!isAdmin) {
    return null; 
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <Button asChild variant="outline" size="sm" className="h-9 rounded-xl gap-2 shrink-0">
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Voltar ao Corte Certo</span>
                <span className="sm:hidden">Voltar</span>
              </Link>
            </Button>
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-border min-w-0">
              <Shield className="h-4 w-4 text-primary shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-bold leading-tight truncate">Painel Master</div>
                <div className="text-xs text-muted-foreground leading-tight truncate">
                  Administração do SaaS Corte Certo
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <HelpCenter />
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-xl gap-2"
              onClick={() => overviewQuery.refetch()}
              disabled={overviewQuery.isFetching}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Atualizar</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 md:px-8 md:py-10">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Shield className="h-4 w-4" /> Corte Certo Master
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Painel SaaS</h1>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Stat icon={<Users />} label="Total de clientes" value={overview?.stats?.totalCustomers ?? 0} />
          <Stat
            icon={<CheckCircle2 />}
            label="Assinaturas ativas"
            value={overview?.stats?.activeSubscriptions ?? 0}
          />
          <Stat icon={<Sparkles />} label="Testes ativos" value={overview?.stats?.activeTrials ?? 0} />
          <Stat
            icon={<AlertTriangle />}
            label="Inadimplentes"
            value={overview?.stats?.overdueCustomers ?? 0}
          />
          <Stat icon={<Ban />} label="Suspensos" value={overview?.stats?.suspendedCustomers ?? 0} />
          <Stat icon={<XCircle />} label="Cancelados" value={overview?.stats?.cancelledCustomers ?? 0} />
          <Stat icon={<DollarSign />} label="MRR" value={currency(overview?.stats?.mrr ?? 0)} />
          <Stat icon={<TrendingUp />} label="ARR estimado" value={currency(overview?.stats?.arr ?? 0)} />
          <Stat
            icon={<Activity />}
            label="Novos no mês"
            value={overview?.stats?.newCustomersThisMonth ?? 0}
          />
          <Stat
            icon={<CalendarClock />}
            label="Cancelamentos"
            value={overview?.stats?.cancellationsThisMonth ?? 0}
          />
        </section>

        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid h-auto w-full grid-cols-4 rounded-2xl bg-muted p-1 md:w-[640px]">
            <TabsTrigger value="customers" className="rounded-xl">
              Clientes
            </TabsTrigger>
            <TabsTrigger value="licenses" className="rounded-xl">
              Licenças
            </TabsTrigger>
            <TabsTrigger value="metrics" className="rounded-xl">
              Métricas
            </TabsTrigger>
            <TabsTrigger value="whitelist" className="rounded-xl">
              Whitelist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="space-y-4">
            <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-11 rounded-xl pl-9"
                  placeholder="Pesquisar cliente"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "Todos" : STATUS_META[status]?.label ?? status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Cadastro</SelectItem>
                  <SelectItem value="mrr">Receita</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="overflow-hidden rounded-3xl border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Renovação</TableHead>
                    <TableHead>Cadastro</TableHead>
                    <TableHead className="text-right">Pagamentos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow
                        key={customer.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-semibold">
                                {customer.shopName || customer.fullName || "Sem Nome"}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {customer.email ?? "—"}
                              </div>
                            </div>
                            {(customer.roles ?? [])
                              .filter((r) => r !== "user")
                              .map((r) => (
                                <Badge
                                  key={r}
                                  variant="outline"
                                  className="rounded-full text-[10px] uppercase"
                                >
                                  {r}
                                </Badge>
                              ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {customer.subscription ? PLAN_LABELS[customer.subscription.plan] ?? customer.subscription.plan : "—"}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={customer.subscription?.status} />
                        </TableCell>
                        <TableCell>{shortDate(customer.subscription?.current_period_end)}</TableCell>
                        <TableCell>{shortDate(customer.createdAt)}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {currency(customer.paidTotal ?? 0)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        Nenhum dado registrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="licenses" className="grid gap-6 lg:grid-cols-[380px_1fr]">
            <Card className="rounded-3xl border-border p-5">
              <div className="mb-5 flex items-center gap-3">
                <KeyRound className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold tracking-tight">Nova licença</h2>
              </div>
              <div className="space-y-4">
                <Field label="Código">
                  <Input
                    value={licenseCode}
                    onChange={(event) => setLicenseCode(event.target.value.toUpperCase())}
                    placeholder="BETA2026"
                  />
                </Field>
                <Field label="Plano">
                  <Select
                    value={licensePlan}
                    onValueChange={(value) => setLicensePlan(value as SubscriptionPlan)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan} value={plan}>
                          {PLAN_LABELS[plan]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Usos">
                    <Input
                      type="number"
                      min={1}
                      value={licenseMaxUses}
                      onChange={(event) => setLicenseMaxUses(Number(event.target.value))}
                    />
                  </Field>
                  <Field label="Meses">
                    <Input
                      type="number"
                      min={0}
                      value={licenseMonths}
                      onChange={(event) => setLicenseMonths(Number(event.target.value))}
                    />
                  </Field>
                </div>
                <Field label="Expira em">
                  <Input
                    type="date"
                    value={licenseExpiresAt}
                    onChange={(event) => setLicenseExpiresAt(event.target.value)}
                  />
                </Field>
                <Button
                  type="button"
                  variant={licenseLifetime ? "default" : "outline"}
                  className="w-full rounded-xl"
                  onClick={() => setLicenseLifetime((value) => !value)}
                >
                  <Crown className="mr-2 h-4 w-4" /> Vitalícia
                </Button>
                <Button
                  className="h-11 w-full rounded-xl"
                  onClick={() => licenseMutation.mutate()}
                  disabled={licenseMutation.isPending}
                >
                  Criar código
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden rounded-3xl border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Uso</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(overview?.licenses ?? []).length > 0 ? (
                    (overview?.licenses ?? []).map((license) => (
                      <TableRow key={license.id}>
                        <TableCell className="font-bold">{license.code}</TableCell>
                        <TableCell>{PLAN_LABELS[license.plan as SubscriptionPlan] ?? license.plan}</TableCell>
                        <TableCell>
                          {license.uses ?? 0}/{license.max_uses ?? "∞"}
                        </TableCell>
                        <TableCell>{shortDate(license.expires_at)}</TableCell>
                        <TableCell>{license.active ? "Ativa" : "Pausada"}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl"
                            onClick={() =>
                              toggleLicenseMutation.mutate({
                                licenseId: license.id,
                                active: !license.active,
                              })
                            }
                          >
                            {license.active ? "Pausar" : "Ativar"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        Nenhum dado registrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Metric
              title="Clientes por plano"
              rows={Object.entries(overview?.metrics?.planCounts ?? {}).map(([label, value]) => [
                PLAN_LABELS[label as SubscriptionPlan] ?? label,
                value,
              ])}
            />
            <Metric
              title="Receita mensal"
              rows={latestRevenueMonths.map(([label, value]) => [label, currency(value)])}
            />
            <Metric
              title="SaaS"
              rows={[
                ["Teste → Pago", `${overview?.metrics?.conversionRate ?? 0}%`],
                ["Receita anual", currency(overview?.metrics?.annualRevenue ?? 0)],
                ["Cancelamentos", overview?.metrics?.cancellations ?? 0],
                ["Permanência média", `${overview?.metrics?.averageStayDays ?? 0} dias`],
                ["Vitalícias", overview?.metrics?.lifetimeCount ?? 0],
              ]}
            />
          </TabsContent>

          <TabsContent value="whitelist" className="space-y-6">
            <Card className="rounded-3xl border-border p-5">
              <div className="mb-5 flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold tracking-tight">Whitelist de Administradores</h2>
              </div>
              <form onSubmit={handleAddAdmin} className="flex gap-3 mb-6">
                <Input
                  type="email"
                  placeholder="E-mail do administrador"
                  value={newWhitelistEmail}
                  onChange={(e) => setNewWhitelistEmail(e.target.value)}
                  className="h-11 flex-1 rounded-xl"
                  required
                />
                <Button
                  type="submit"
                  disabled={addAdminMutation.isPending}
                  className="h-11 rounded-xl"
                >
                  {addAdminMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Adicionar
                </Button>
              </form>

              <div className="rounded-2xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>E-mail</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {whitelistLoading ? (
                      <TableRow>
                        <TableCell colSpan={2} className="h-24 text-center">
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : whitelist && whitelist.length > 0 ? (
                      whitelist.map((item: any) => (
                        <TableRow key={item.email}>
                          <TableCell className="font-medium">{item.email}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={async () => {
                                try {
                                  await removeAdminMutation.mutateAsync(item.email);
                                  toast.success("E-mail removido da whitelist!");
                                } catch (error: any) {
                                  toast.error(error?.message ?? "Erro ao remover e-mail.");
                                }
                              }}
                              disabled={removeAdminMutation.isPending}
                            >
                              Remover
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                          Nenhum administrador na whitelist.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-3xl">
          {selectedCustomer && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  {selectedCustomer.shopName || selectedCustomer.fullName || "Sem Nome"}
                </DialogTitle>
                <DialogDescription>{selectedCustomer.email ?? "Sem e-mail"}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 md:grid-cols-3">
                <Mini
                  label="Plano"
                  value={
                    selectedCustomer.subscription?.plan
                      ? PLAN_LABELS[selectedCustomer.subscription.plan] ?? selectedCustomer.subscription.plan
                      : "—"
                  }
                />
                <Mini
                  label="Status"
                  value={STATUS_META[selectedCustomer.subscription?.status ?? "cancelled"]?.label ?? "Desconhecido"}
                />
                <Mini
                  label="Renovação"
                  value={shortDate(selectedCustomer.subscription?.current_period_end)}
                />
              </div>
              <Card className="rounded-2xl border-border p-4">
                <h3 className="mb-3 font-bold tracking-tight">Ação administrativa</h3>
                <div className="grid gap-3 md:grid-cols-[1fr_160px_120px_auto]">
                  <Select value={action} onValueChange={setAction}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ACTION_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={actionPlan}
                    onValueChange={(value) => setActionPlan(value as SubscriptionPlan)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan} value={plan}>
                          {PLAN_LABELS[plan]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    min={1}
                    value={actionAmount}
                    onChange={(event) => setActionAmount(Number(event.target.value))}
                  />
                  <Button
                    onClick={() => actionMutation.mutate()}
                    disabled={actionMutation.isPending}
                  >
                    Aplicar
                  </Button>
                </div>
              </Card>
              <Card className="rounded-2xl border-border p-4">
                <h3 className="mb-3 font-bold tracking-tight">Roles administrativas</h3>
                <div className="flex flex-wrap gap-2">
                  {ROLE_OPTIONS.map((option) => {
                    const active = (selectedCustomer.roles ?? []).includes(option.value);
                    return (
                      <Button
                        key={option.value}
                        size="sm"
                        variant={active ? "default" : "outline"}
                        className="rounded-full"
                        disabled={roleMutation.isPending}
                        onClick={() =>
                          roleMutation.mutate({
                            targetUserId: selectedCustomer.id,
                            role: option.value,
                            grant: !active,
                          })
                        }
                      >
                        {active ? "✓ " : ""}
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Apenas Proprietários podem alterar papéis. Proprietários não podem se
                  auto-remover.
                </p>
              </Card>
              <Card className="rounded-2xl border-border p-4">
                <h3 className="mb-3 font-bold tracking-tight">Histórico de pagamentos</h3>
                <div className="divide-y divide-border">
                  {(selectedCustomer?.billing ?? []).length > 0 ? (
                    (selectedCustomer.billing ?? []).map((row) => (
                      <div key={row.id} className="flex items-center justify-between py-3 text-sm">
                        <span>
                          {shortDate(row.created_at)} · {row.gateway ?? "Desconhecido"}
                        </span>
                        <span className="font-semibold">
                          {currency((row.amount_cents ?? 0) / 100)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      Nenhum pagamento registrado.
                    </p>
                  )}
                </div>
              </Card>
              <Card className="rounded-2xl border-destructive/40 bg-destructive/5 p-4">
                <h3 className="mb-2 font-bold tracking-tight text-destructive">Zona de perigo</h3>
                <p className="mb-3 text-xs text-muted-foreground">
                  Exclui permanentemente a conta e todos os dados vinculados. Ação irreversível.
                </p>
                <Button
                  variant="destructive"
                  className="rounded-xl"
                  disabled={deleteMutation.isPending}
                  onClick={() => {
                    if (
                      confirm(
                        `Excluir definitivamente ${selectedCustomer.email ?? selectedCustomer.fullName ?? "este usuário"}?`,
                      )
                    ) {
                      deleteMutation.mutate(selectedCustomer.id);
                    }
                  }}
                >
                  Excluir usuário
                </Button>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border-border p-4 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span>{label}</span>
        <MetricHint label={label} />
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const meta = STATUS_META[status ?? "cancelled"] ?? STATUS_META.cancelled;
  return (
    <Badge variant="outline" className={`rounded-full ${meta.className}`}>
      {meta.label}
    </Badge>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function Mini({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function Metric({
  title,
  rows,
}: {
  title: string;
  rows: Array<[React.ReactNode, React.ReactNode]>;
}) {
  return (
    <Card className="rounded-3xl border-border p-5">
      <h2 className="mb-4 text-lg font-bold tracking-tight">{title}</h2>
      <div className="space-y-3">
        {rows && rows.length > 0 ? (
          rows.map(([label, value], index) => (
            <div
              key={`${label}-${index}`}
              className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2 text-sm"
            >
              <span className="text-muted-foreground">{label}</span>
              <span className="font-bold">{value}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum dado registrado.</p>
        )}
      </div>
    </Card>
  );
}