import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus,
  Users,
  Search,
  Phone,
  Calendar as CalendarIcon,
  MessageCircle,
  Pencil,
  Trash2,
  Cake,
  Eye,
  Crown,
  Sparkles,
  RefreshCcw,
  AlertTriangle,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ClientForm } from "@/components/dashboard/ClientForm";
import { ClientDetails } from "@/components/clients/ClientDetails";
import { differenceInDays, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/dashboard/_layout/clients")({
  component: ClientsPageWrapper,
});

function ClientsPageWrapper() {
  return (
    <ErrorBoundary>
      <ClientsPage />
    </ErrorBoundary>
  );
}

type FilterKey = "all" | "vip" | "active" | "inactive" | "return" | "recurring" | "new";

const FILTERS: FilterKey[] = ["all", "vip", "active", "return", "inactive", "recurring", "new"];

const currency = (v: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(v || 0);

interface EnrichedClient {
  id: string;
  name: string;
  phone: string | null;
  birthday: string | null;
  notes: string | null;
  last_visit: string | null;
  total_spent: number;
  created_at: string;
  visits: number;
  avgTicket: number;
  nextVisit: string | null;
  isVip: boolean;
  isNew: boolean;
  isRecurring: boolean;
  isInactive: boolean;
  needsReturn: boolean;
  raw: any;
}

function ClientsPage() {
  const { t } = useTranslation();
  const [clients, setClients] = useState<EnrichedClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const [clientsRes, apptsRes, membershipsRes] = await Promise.all([
        supabase.from("clients").select("*").order("name", { ascending: true }),
        supabase
          .from("appointments")
          .select("client_id, status, start_time, service:services(price)"),
        supabase.from("customer_memberships").select("client_id, status, end_date"),
      ]);

      if (clientsRes.error) throw clientsRes.error;

      const appts = apptsRes.data || [];
      const memberships = membershipsRes.data || [];
      const now = new Date();

      const vipSet = new Set(
        memberships
          .filter((m: any) => m.status === "active" && (!m.end_date || new Date(m.end_date) >= now))
          .map((m: any) => m.client_id),
      );

      const byClient: Record<string, { visits: number; spent: number; next: string | null }> = {};
      for (const a of appts) {
        if (!a.client_id) continue;
        const entry =
          byClient[a.client_id] || (byClient[a.client_id] = { visits: 0, spent: 0, next: null });
        if (a.status === "completed") {
          entry.visits += 1;
          entry.spent += (a as any).service?.price || 0;
        }
        if (
          (a.status === "scheduled" || a.status === "in_progress") &&
          new Date(a.start_time) >= now
        ) {
          if (!entry.next || new Date(a.start_time) < new Date(entry.next)) {
            entry.next = a.start_time;
          }
        }
      }

      const enriched: EnrichedClient[] = (clientsRes.data || []).map((c: any) => {
        const stats = byClient[c.id] || { visits: 0, spent: 0, next: null };
        const daysSince = c.last_visit ? differenceInDays(now, parseISO(c.last_visit)) : null;
        const isVip = vipSet.has(c.id);
        const isNew = differenceInDays(now, parseISO(c.created_at)) <= 30;
        const isRecurring = stats.visits >= 3;
        const isInactive = daysSince === null ? true : daysSince > 60;
        const needsReturn = daysSince !== null && daysSince > 30 && daysSince <= 60;
        const totalSpent = Number(c.total_spent) || stats.spent || 0;
        const avgTicket = stats.visits > 0 ? totalSpent / stats.visits : 0;
        return {
          id: c.id,
          name: c.name,
          phone: c.phone,
          birthday: c.birthday,
          notes: c.notes,
          last_visit: c.last_visit,
          total_spent: totalSpent,
          created_at: c.created_at,
          visits: stats.visits,
          avgTicket,
          nextVisit: stats.next,
          isVip,
          isNew,
          isRecurring,
          isInactive,
          needsReturn,
          raw: c,
        };
      });

      setClients(enriched);
    } catch (error: any) {
      toast.error("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase.from("clients").delete().eq("id", id);
      if (error) throw error;
      toast.success("Cliente removido");
      fetchClients();
    } catch {
      toast.error("Erro ao remover cliente");
    }
  };

  const stats = useMemo(() => {
    const vip = clients.filter((c) => c.isVip).length;
    const inactive = clients.filter((c) => c.isInactive).length;
    const active = clients.length - inactive;
    const retention = clients.length > 0 ? Math.round((active / clients.length) * 100) : 0;
    return { total: clients.length, vip, inactive, active, retention };
  }, [clients]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return clients.filter((c) => {
      if (term) {
        const t = c.name.toLowerCase() + " " + (c.phone || "");
        if (!t.includes(term)) return false;
      }
      switch (filter) {
        case "vip":
          return c.isVip;
        case "active":
          return !c.isInactive;
        case "inactive":
          return c.isInactive;
        case "return":
          return c.needsReturn;
        case "recurring":
          return c.isRecurring;
        case "new":
          return c.isNew;
        default:
          return true;
      }
    });
  }, [clients, searchTerm, filter]);

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-3xl md:text-4xl font-bold tracking-tight">Clientes</h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            Seu relacionamento em um só lugar.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-10 rounded-xl gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Novo cliente</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold tracking-tight">
                Novo cliente
              </DialogTitle>
            </DialogHeader>
            <ClientForm
              onSuccess={() => {
                setIsAddDialogOpen(false);
                fetchClients();
              }}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </header>

      {/* Stats */}
      <section className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total"
          value={stats.total.toString()}
          hint="Base cadastrada"
          icon={<Users className="h-4 w-4 text-primary" />}
          accent="bg-primary/10"
        />
        <StatCard
          label="VIP"
          value={stats.vip.toString()}
          hint="Com assinatura ativa"
          icon={<Crown className="h-4 w-4 text-amber-600" />}
          accent="bg-amber-500/10"
        />
        <StatCard
          label="Ativos"
          value={stats.active.toString()}
          hint="Visita nos últimos 60 dias"
          icon={<Sparkles className="h-4 w-4 text-emerald-600" />}
          accent="bg-emerald-500/10"
        />
        <StatCard
          label="Retenção"
          value={`${stats.retention}%`}
          hint={`${stats.inactive} inativos`}
          icon={<RefreshCcw className="h-4 w-4 text-blue-600" />}
          accent="bg-blue-500/10"
        />
      </section>

      {/* Search + Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou telefone..."
            className="h-11 rounded-2xl border-border bg-card pl-11 pr-10 text-sm shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-secondary"
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {key === "all"
                  ? "Todos"
                  : key === "vip"
                    ? "VIP"
                    : key === "active"
                      ? "Ativos"
                      : key === "inactive"
                        ? "Inativos"
                        : key === "return"
                          ? "Retornar"
                          : key === "recurring"
                            ? "Recorrentes"
                            : "Novos"}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-secondary" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onView={() => setSelectedClient(client.raw)}
              onEdit={() => setEditingClient(client.raw)}
              onDelete={() => deleteClient(client.id)}
            />
          ))
        ) : (
          <EmptyState
            hasQuery={!!searchTerm || filter !== "all"}
            onClear={() => {
              setSearchTerm("");
              setFilter("all");
            }}
            onNew={() => setIsAddDialogOpen(true)}
          />
        )}
      </div>

      {/* Edit */}
      <Dialog open={!!editingClient} onOpenChange={(open) => !open && setEditingClient(null)}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Editar cliente
            </DialogTitle>
          </DialogHeader>
          {editingClient && (
            <ClientForm
              client={editingClient}
              onSuccess={() => {
                setEditingClient(null);
                fetchClients();
              }}
              onCancel={() => setEditingClient(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Details */}
      <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <DialogContent className="sm:max-w-[640px] p-0 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
          {selectedClient && <ClientDetails client={selectedClient} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <Card className="group rounded-2xl border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`grid h-9 w-9 place-items-center rounded-xl transition-transform group-hover:scale-105 ${accent}`}
      >
        {icon}
      </div>
      <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-xl font-bold tracking-tight tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground truncate">{hint}</p>
    </Card>
  );
}

function Badge({
  color,
  icon,
  children,
}: {
  color: "amber" | "emerald" | "orange" | "red" | "blue";
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const map = {
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20",
    emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20",
    orange: "bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-orange-500/20",
    red: "bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20",
    blue: "bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-blue-500/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${map[color]}`}
    >
      {icon}
      {children}
    </span>
  );
}

function ClientCard({
  client,
  onView,
  onEdit,
  onDelete,
}: {
  client: EnrichedClient;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { t } = useTranslation();
  const initials = client.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      className={`group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
        client.isVip
          ? "border-amber-500/30 ring-1 ring-amber-500/10"
          : client.isInactive
            ? "border-border opacity-90"
            : "border-border hover:border-primary/30"
      }`}
    >
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
        {/* Identity */}
        <button onClick={onView} className="flex min-w-0 flex-1 items-center gap-4 text-left">
          <div
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-base font-bold tracking-tight transition-transform group-hover:scale-105 ${
              client.isVip
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/25"
                : "bg-secondary text-primary"
            }`}
          >
            {client.isVip ? <Crown className="h-5 w-5" /> : initials}
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-[15px] font-semibold tracking-tight">{client.name}</h3>
              {client.isVip && (
                <Badge color="amber" icon={<Crown className="h-3 w-3" />}>
                  VIP
                </Badge>
              )}
              {client.isNew && !client.isVip && <Badge color="emerald">Novo</Badge>}
              {client.isRecurring && !client.isVip && <Badge color="blue">Recorrente</Badge>}
              {client.needsReturn && (
                <Badge color="orange" icon={<AlertTriangle className="h-3 w-3" />}>
                  Retornar
                </Badge>
              )}
              {client.isInactive && !client.isNew && <Badge color="red">Inativo</Badge>}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {client.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {client.phone}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5" />
                {client.last_visit
                  ? `Última: ${format(parseISO(client.last_visit), "dd MMM", { locale: ptBR })}`
                  : "Nunca visitou"}
              </span>
              {client.nextVisit && (
                <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {`Próxima: ${format(parseISO(client.nextVisit), "dd MMM 'às' HH:mm", { locale: ptBR })}`}
                </span>
              )}
              {client.birthday && (
                <span className="inline-flex items-center gap-1.5">
                  <Cake className="h-3.5 w-3.5 text-pink-500" />
                  {format(parseISO(client.birthday), "dd/MM")}
                </span>
              )}
            </div>
          </div>
        </button>

        {/* Metrics */}
        <div className="hidden lg:flex items-center gap-6 pr-2 text-right">
          <Metric label="Visitas" value={client.visits.toString()} />
          <Metric
            label="Ticket médio"
            value={client.avgTicket > 0 ? currency(client.avgTicket) : "—"}
          />
          <Metric
            label="Total gasto"
            value={client.total_spent > 0 ? currency(client.total_spent) : "—"}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 md:pl-2 md:border-l md:border-border">
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-xl text-primary hover:bg-primary/10"
            title="Agendar"
          >
            <Link to="/dashboard/agenda">
              <CalendarIcon className="h-4 w-4" />
            </Link>
          </Button>
          {client.phone && (
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-xl text-emerald-600 hover:bg-emerald-500/10"
              title="WhatsApp"
            >
              <a
                href={`https://wa.me/55${client.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </Button>
          )}
          <Button
            onClick={onView}
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Ver detalhes"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            onClick={onEdit}
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Editar"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-600"
                title="Remover"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir cliente?</AlertDialogTitle>
                <AlertDialogDescription>
                  O cliente e seu histórico serão removidos permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={onDelete}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-bold tabular-nums">{value}</p>
    </div>
  );
}

function EmptyState({
  hasQuery,
  onClear,
  onNew,
}: {
  hasQuery: boolean;
  onClear: () => void;
  onNew: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-16 text-center">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-card shadow-sm">
        <Users className="h-6 w-6 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">
        {hasQuery ? "Nenhum cliente encontrado" : "Sua base está vazia"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {hasQuery
          ? "Ajuste a busca ou os filtros ativos."
          : "Cadastre seu primeiro cliente para começar."}
      </p>
      {hasQuery ? (
        <Button onClick={onClear} variant="outline" className="mt-6 rounded-xl gap-1.5">
          <X className="h-4 w-4" />
          Limpar filtros
        </Button>
      ) : (
        <Button onClick={onNew} className="mt-6 rounded-xl gap-1.5">
          <Plus className="h-4 w-4" />
          Cadastrar cliente
        </Button>
      )}
    </div>
  );
}
