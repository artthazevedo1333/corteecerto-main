import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Scissors,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  Play,
  MessageCircle,
  Zap,
  GripVertical,
  Ban,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
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
import { translateKey } from "@/lib/i18n";
import { format, addDays, startOfToday, isToday, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentForm } from "@/components/dashboard/AppointmentForm";
import { CheckoutDialog } from "@/components/dashboard/CheckoutDialog";
import { ScheduleBlocksManager } from "@/components/dashboard/ScheduleBlocksManager";
import { waLink } from "@/lib/wa-templates";

export const Route = createFileRoute("/dashboard/_layout/agenda")({
  component: AgendaPageWrapper,
});

function AgendaPageWrapper() {
  return (
    <ErrorBoundary>
      <AgendaPage />
    </ErrorBoundary>
  );
}

type Status = "scheduled" | "in_progress" | "completed" | "cancelled";

const STATUS_META: Record<Status, { dot: string; text: string; ring: string; bg: string }> = {
  scheduled: {
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    ring: "ring-amber-500/20",
    bg: "bg-amber-500/10",
  },
  in_progress: {
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-400",
    ring: "ring-blue-500/20",
    bg: "bg-blue-500/10",
  },
  completed: {
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
    ring: "ring-border",
    bg: "bg-secondary",
  },
  cancelled: {
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
    ring: "ring-red-500/20",
    bg: "bg-red-500/10",
  },
};

function currency(v: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(v || 0);
}

function AgendaPage() {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [checkoutAppointment, setCheckoutAppointment] = useState<any>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from("appointments")
        .select(
          `*, client:clients(id, name, phone, created_at), service:services(id, name, price, duration_minutes)`,
        )
        .gte("start_time", startOfDay.toISOString())
        .lte("start_time", endOfDay.toISOString())
        .order("start_time", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);

      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (user) {
        const { data: blockData } = await supabase
          .from("schedule_blocks")
          .select("*")
          .eq("user_id", user.id)
          .lte("start_time", endOfDay.toISOString())
          .gte("end_time", startOfDay.toISOString())
          .order("start_time");
        setBlocks(blockData || []);
      } else {
        setBlocks([]);
      }
    } catch (error: any) {
      toast.error("Erro ao carregar agenda");
    } finally {
      setLoading(false);
    }
  };

  const setStatus = async (id: string, status: Status, successMsg: string) => {
    try {
      const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
      if (error) throw error;
      toast.success(successMsg);
      fetchAppointments();
    } catch {
      toast.error("Erro ao atualizar");
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw error;
      toast.success("Agendamento removido");
      fetchAppointments();
    } catch {
      toast.error("Erro ao remover");
    }
  };

  const nextDay = () => setSelectedDate(addDays(selectedDate, 1));
  const prevDay = () => setSelectedDate(addDays(selectedDate, -1));
  const goToday = () => setSelectedDate(startOfToday());

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = appointments.findIndex((a) => a.id === active.id);
    const newIndex = appointments.findIndex((a) => a.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const a = appointments[oldIndex];
    const b = appointments[newIndex];
    setAppointments(arrayMove(appointments, oldIndex, newIndex));

    try {
      const { error: e1 } = await supabase
        .from("appointments")
        .update({ start_time: b.start_time, end_time: b.end_time })
        .eq("id", a.id);
      const { error: e2 } = await supabase
        .from("appointments")
        .update({ start_time: a.start_time, end_time: a.end_time })
        .eq("id", b.id);
      if (e1 || e2) throw e1 || e2;
      toast.success("Horários reordenados");
      fetchAppointments();
    } catch {
      toast.error("Erro ao reordenar");
      fetchAppointments();
    }
  };

  const viewingToday = isSameDay(selectedDate, startOfToday());

  const summary = useMemo(() => {
    const active = appointments.filter((a) => a.status !== "cancelled");
    const total = active.length;
    const pending = active.filter((a) => a.status === "scheduled").length;
    const done = active.filter((a) => a.status === "completed").length;
    const revenue = active
      .filter((a) => a.status === "completed")
      .reduce((s, a) => s + (a.service?.price || 0), 0);
    const nextUp = active.find(
      (a) =>
        (a.status === "scheduled" || a.status === "in_progress") && new Date(a.start_time) >= now,
    );
    return { total, pending, done, revenue, nextUp };
  }, [appointments, now]);

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-3xl md:text-4xl font-bold tracking-tight">Agenda</h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            {viewingToday ? `Hoje · ${format(now, "HH:mm")}` : "Organize seus atendimentos."}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ScheduleBlocksManager selectedDate={selectedDate} onChange={fetchAppointments} />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden md:inline-flex h-10 rounded-xl gap-1.5"
          >
            <Link to="/dashboard/barber-mode">
              <Zap className="h-4 w-4 fill-current" />
              Modo Trabalho
            </Link>
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-10 rounded-xl gap-1.5 shadow-sm">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Novo horário</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  Novo agendamento
                </DialogTitle>
              </DialogHeader>
              <AppointmentForm
                defaultDate={selectedDate}
                onSuccess={() => {
                  setIsAddDialogOpen(false);
                  fetchAppointments();
                }}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Summary KPIs */}
      <section className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Atendimentos"
          value={summary.total.toString()}
          hint={`${summary.done} concluídos`}
          icon={<Users className="h-4 w-4 text-primary" />}
          accent="bg-primary/10"
        />
        <StatCard
          label="Aguardando"
          value={summary.pending.toString()}
          hint="Confirmar clientes"
          icon={<Clock className="h-4 w-4 text-amber-600" />}
          accent="bg-amber-500/10"
        />
        <StatCard
          label="Faturamento"
          value={currency(summary.revenue)}
          hint="Do dia (concluídos)"
          icon={<DollarSign className="h-4 w-4 text-emerald-600" />}
          accent="bg-emerald-500/10"
        />
        <StatCard
          label="Próximo"
          value={summary.nextUp ? format(new Date(summary.nextUp.start_time), "HH:mm") : "—"}
          hint={
            summary.nextUp
              ? summary.nextUp.client?.name || summary.nextUp.customer_name || "Cliente"
              : "Nada em seguida"
          }
          icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
          accent="bg-blue-500/10"
        />
      </section>

      {/* Date Selector */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevDay}
          className="h-10 w-10 rounded-xl"
          aria-label="Dia anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-1 flex-col items-center text-center">
          <div className="text-base font-semibold capitalize tracking-tight">
            {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            {viewingToday ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Hoje · {format(now, "HH:mm")}
              </span>
            ) : (
              <button
                onClick={goToday}
                className="text-xs font-medium text-primary hover:underline"
              >
                Voltar para hoje
              </button>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextDay}
          className="h-10 w-10 rounded-xl"
          aria-label="Próximo dia"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Blocks */}
      {blocks.length > 0 && (
        <div className="space-y-2">
          {blocks.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-3.5"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-500/10">
                <Ban className="h-4 w-4 text-orange-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{b.title}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(b.start_time), "HH:mm")} –{" "}
                  {format(new Date(b.end_time), "HH:mm")} ·{" "}
                  {b.block_type === "vacation"
                    ? "Férias"
                    : b.block_type === "lunch"
                      ? "Pausa"
                      : "Bloqueio"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Appointments */}
      <div className="space-y-3">
        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-secondary" />
            ))}
          </div>
        ) : appointments.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={appointments.map((a) => a.id)}
              strategy={verticalListSortingStrategy}
            >
              {appointments.map((apt, idx) => {
                const isNext = summary.nextUp?.id === apt.id && viewingToday;
                const showNowLine =
                  viewingToday &&
                  idx === 0 &&
                  isToday(selectedDate) &&
                  new Date(apt.start_time) > now;
                return (
                  <div key={apt.id}>
                    {showNowLine && <NowIndicator time={now} />}
                    <SortableRow id={apt.id}>
                      {(dragHandle) => (
                        <AppointmentCard
                          apt={apt}
                          dragHandle={dragHandle}
                          isNext={isNext}
                          onStart={() => setStatus(apt.id, "in_progress", "Atendimento iniciado")}
                          onCheckout={() => setCheckoutAppointment(apt)}
                          onEdit={() => setEditingAppointment(apt)}
                          onCancel={() => setStatus(apt.id, "cancelled", "Agendamento cancelado")}
                          onDelete={() => deleteAppointment(apt.id)}
                        />
                      )}
                    </SortableRow>
                  </div>
                );
              })}
            </SortableContext>
          </DndContext>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-16 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-card shadow-sm">
              <CalendarDays className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Agenda livre</h3>
            <p className="mt-1 text-sm text-muted-foreground">Nenhum atendimento para este dia.</p>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-6 rounded-xl gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Criar agendamento
            </Button>
          </div>
        )}
      </div>

      {/* Edit dialog */}
      <Dialog
        open={!!editingAppointment}
        onOpenChange={(open) => !open && setEditingAppointment(null)}
      >
        <DialogContent className="sm:max-w-[500px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Editar horário
            </DialogTitle>
          </DialogHeader>
          {editingAppointment && (
            <AppointmentForm
              appointment={editingAppointment}
              onSuccess={() => {
                setEditingAppointment(null);
                fetchAppointments();
              }}
              onCancel={() => setEditingAppointment(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <CheckoutDialog
        appointment={checkoutAppointment}
        open={!!checkoutAppointment}
        onOpenChange={(open) => !open && setCheckoutAppointment(null)}
        onSuccess={() => {
          setCheckoutAppointment(null);
          fetchAppointments();
        }}
      />
    </div>
  );
}

function NowIndicator({ time }: { time: Date }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3 py-2" aria-label="Horário atual">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary tabular-nums">
        {format(time, "HH:mm")}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
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
  icon: ReactNode;
  accent: string;
}) {
  return (
    <Card className="group rounded-2xl border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div
          className={`grid h-9 w-9 place-items-center rounded-xl transition-transform group-hover:scale-105 ${accent}`}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-xl font-bold tracking-tight tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground truncate">{hint}</p>
    </Card>
  );
}

function AppointmentCard({
  apt,
  dragHandle,
  isNext,
  onStart,
  onCheckout,
  onEdit,
  onCancel,
  onDelete,
}: {
  apt: any;
  dragHandle: ReactNode;
  isNext: boolean;
  onStart: () => void;
  onCheckout: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  const { t } = useTranslation();
  const status = (apt.status || "scheduled") as Status;
  const meta = STATUS_META[status];
  const isDone = status === "completed" || status === "cancelled";
  const clientName = apt.client?.name || apt.customer_name || "Cliente avulso";
  const phone = apt.client?.phone || apt.customer_phone || "";
  const isNew =
    apt.client?.created_at &&
    Date.now() - new Date(apt.client.created_at).getTime() < 1000 * 60 * 60 * 24 * 30;

  return (
    <Card
      className={`group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
        isNext
          ? "border-primary/40 ring-2 ring-primary/15"
          : status === "cancelled"
            ? "border-border opacity-60"
            : status === "completed"
              ? "border-border opacity-80"
              : "border-border hover:border-primary/30"
      }`}
    >
      <div className="flex items-stretch">
        {/* Drag handle */}
        <div className="hidden sm:flex">{dragHandle}</div>

        {/* Time */}
        <div
          className={`flex min-w-[92px] flex-col items-center justify-center px-4 py-5 ${
            isNext ? "bg-primary/5" : "bg-secondary/40"
          }`}
        >
          <span
            className={`text-2xl font-bold tabular-nums leading-none tracking-tight ${
              isNext ? "text-primary" : ""
            }`}
          >
            {format(new Date(apt.start_time), "HH:mm")}
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {apt.service?.duration_minutes || 30} min
          </span>
        </div>

        {/* Body */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold tracking-tight">{clientName}</h3>
            {isNext && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary ring-1 ring-primary/20">
                Próximo
              </span>
            )}
            {isNew && (
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                Novo
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Scissors className="h-3.5 w-3.5" />
              {apt.service?.name || "Serviço"}
            </span>
            {apt.service?.price ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80 tabular-nums">
                {currency(apt.service.price)}
              </span>
            ) : null}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${meta.bg} ${meta.text} ${meta.ring}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {status === "scheduled"
                ? "Aguardando"
                : status === "in_progress"
                  ? "Em atendimento"
                  : status === "completed"
                    ? "Concluído"
                    : "Cancelado"}
            </span>
          </div>
          {apt.notes && (
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground/80 italic">
              “{apt.notes}”
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 px-3 py-3 sm:pr-4">
          {!isDone && (
            <>
              {status === "scheduled" && (
                <Button
                  onClick={onStart}
                  size="sm"
                  variant="ghost"
                  className="h-9 rounded-xl gap-1.5 text-blue-600 hover:bg-blue-500/10 hover:text-blue-600"
                  title="Iniciar"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span className="hidden lg:inline">Iniciar</span>
                </Button>
              )}
              <Button
                onClick={onCheckout}
                size="sm"
                variant={status === "in_progress" ? "default" : "ghost"}
                className={`h-9 rounded-xl gap-1.5 ${
                  status === "in_progress"
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700"
                }`}
                title="Concluir"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden lg:inline">Concluir</span>
              </Button>
              {phone && (
                <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-xl text-emerald-600 hover:bg-emerald-500/10"
                  title="WhatsApp"
                  aria-label="Enviar mensagem no WhatsApp"
                >
                  <a
                    href={waLink(apt, "confirm") || `https://wa.me/55${phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              )}
              <Button
                onClick={onEdit}
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground"
                title="Editar"
                aria-label="Editar horário"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-600"
                    title="Cancelar"
                    aria-label="Cancelar horário"
                  >
                    <XCircle className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar horário?</AlertDialogTitle>
                    <AlertDialogDescription>
                      O horário será marcado como cancelado na sua agenda.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Voltar</AlertDialogCancel>
                    <AlertDialogAction
                      className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={onCancel}
                    >
                      Cancelar horário
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          {isDone && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-600 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  title="Remover"
                  aria-label="Remover horário concluído"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-3xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Remover registro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Este agendamento será removido permanentemente do histórico.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={onDelete}
                  >
                    Remover
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </Card>
  );
}

function SortableRow({
  id,
  children,
}: {
  id: string;
  children: (dragHandle: ReactNode) => ReactNode;
}) {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : "auto",
  };
  const handle = (
    <button
      type="button"
      {...attributes}
      {...listeners}
      className="flex items-center justify-center px-2 text-muted-foreground/50 hover:text-muted-foreground cursor-grab active:cursor-grabbing touch-none"
      aria-label="Arrastar para reordenar"
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );
  return (
    <div ref={setNodeRef} style={style}>
      {children(handle)}
    </div>
  );
}
