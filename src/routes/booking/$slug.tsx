import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  CheckCircle2,
  Loader2,
  Clock,
  Scissors,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  User as UserIcon,
  Phone,
  MapPin,
  AlertCircle,
  ShieldAlert,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/booking/$slug")({
  component: BookingSlugPage,
});

function autoDescription(name: string): string {
  const n = (name || "").toLowerCase();
  if (n.includes("barba")) return "Modelagem completa da barba com acabamento profissional.";
  if (n.includes("sobrancelha")) return "Design e alinhamento com toque refinado.";
  if (n.includes("pigment")) return "Pigmentação precisa para um visual impecável.";
  if (n.includes("hidrat") || n.includes("tratamento"))
    return "Tratamento capilar especializado para nutrição profunda.";
  if (n.includes("platinado") || n.includes("descolor"))
    return "Descoloração e tonalização com produtos premium.";
  if (n.includes("infantil") || n.includes("kids"))
    return "Atendimento cuidadoso e divertido para crianças.";
  if (n.includes("combo") || n.includes("+"))
    return "Combinação completa para um resultado impecável.";
  if (n.includes("corte")) return "Corte realizado com acabamento profissional e personalizado.";
  return "Atendimento profissional com acabamento de alto padrão.";
}

function formatPrice(v: any): string {
  const n = Number(v || 0);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function BookingSlugPage() {
  const { slug } = useParams({ from: "/booking/$slug" });

  // Estados globais da página
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Estado do formulário de agendamento
  const [booking, setBooking] = useState({
    service_id: "",
    date: "",
    time: "",
    name: "",
    phone: "",
  });

  // Novos estados: Horários ocupados e tratamento
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // ESTADOS DE SEGURANÇA (AUDITORIA)
  const [requiredDeposit, setRequiredDeposit] = useState(0);
  const [checkingDeposit, setCheckingDeposit] = useState(false);

  // Carregamento inicial do perfil e serviços
  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.rpc("get_public_booking_data", {
        p_slug: slug,
      });

      if (error || !data) {
        toast.error("Barbearia não encontrada");
        setLoading(false);
        return;
      }

      const payload = data as {
        profile: {
          id: string;
          barber_shop_name: string | null;
          avatar_url: string | null;
          business_address: string | null;
          business_city: string | null;
          business_state: string | null;
          business_phone: string | null;
          business_whatsapp: string | null;
          business_instagram: string | null;
          opening_hours: Record<string, any>;
          business_timezone: string | null;
        };
        services: Array<{
          id: string;
          name: string;
          description: string | null;
          price: number;
          duration_minutes: number;
          color?: string | null;
          image_url?: string | null;
        }>;
      };

      setProfile(payload.profile);
      setServices(payload.services || []);
      setLoading(false);
    }
    loadData();
  }, [slug]);

  // Efeito para buscar horários ocupados quando a data muda
  useEffect(() => {
    async function fetchBusySlots() {
      if (!booking.date) {
        setBusySlots([]);
        setSlotsError(null);
        return;
      }

      setSlotsLoading(true);
      setSlotsError(null);

      try {
        const { data, error } = await supabase.rpc("get_public_booking_busy_slots", {
          p_slug: slug,
          p_date: booking.date,
        });

        if (error) throw error;

        // Normaliza os dados para um array de strings
        const slots = Array.isArray(data)
          ? data.map((item: any) => (typeof item === "string" ? item : item.time || item.start_time)).filter(Boolean)
          : [];

        setBusySlots(slots);
      } catch (err: any) {
        console.error("Erro ao buscar horários ocupados:", err);
        setSlotsError("Não foi possível carregar a disponibilidade. Tente novamente.");
        toast.error("Erro ao verificar disponibilidade de horários.");
      } finally {
        setSlotsLoading(false);
      }
    }

    fetchBusySlots();
  }, [booking.date, slug]);

  const selectedService = useMemo(
    () => services.find((s) => s.id === booking.service_id),
    [services, booking.service_id],
  );

  // Lógica de cálculo e cruzamento de disponibilidade
  const availableSlots = useMemo(() => {
    if (!booking.date || !profile) return [];

    const tz = profile.business_timezone || "America/Sao_Paulo";
    const dateStr = booking.date;

    // Obtém o momento atual no fuso horário do estabelecimento para comparação justa
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const parts = formatter.formatToParts(new Date());
    const getPart = (type: string) => parts.find((p) => p.type === type)?.value;
    const currentYMD = `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
    const currentHM = `${getPart("hour")}:${getPart("minute")}`;

    // Descobre o dia da semana correspondente à data escolhida
    const dayOfWeek = new Date(`${dateStr}T00:00:00`).getDay(); // 0 a 6
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayName = days[dayOfWeek];

    const oh = profile.opening_hours || {};
    const schedule = oh[dayOfWeek] || oh[dayOfWeek.toString()] || oh[dayName];

    let openTime = "08:00";
    let closeTime = "18:00";
    let isClosed = false;

    if (schedule && typeof schedule === "object") {
      openTime = schedule.open || schedule.start || openTime;
      closeTime = schedule.close || schedule.end || closeTime;
      isClosed = schedule.isClosed === true || schedule.isOpen === false;
    } else if (!schedule && Object.keys(oh).length > 0) {
      // Se há um calendário mas não para este dia, considera-se fechado
      isClosed = true;
    }

    if (isClosed) return [];

    const parseTime = (ts: string) => {
      const [h, m] = ts.split(":").map(Number);
      return h * 60 + (m || 0);
    };

    const formatTime = (mins: number) => {
      const h = Math.floor(mins / 60).toString().padStart(2, "0");
      const m = (mins % 60).toString().padStart(2, "0");
      return `${h}:${m}`;
    };

    const startMins = parseTime(openTime);
    const closeMins = parseTime(closeTime);
    const serviceDuration = selectedService?.duration_minutes || 30;

    const slots = [];
    // Gera horários em blocos de 30 minutos
    for (let current = startMins; current + serviceDuration <= closeMins; current += 30) {
      const timeStr = formatTime(current);

      // Bloqueia horários no passado
      const isPast = dateStr < currentYMD || (dateStr === currentYMD && timeStr <= currentHM);

      // Verifica se há colisão com os slots retornados do banco
      const isBusy = busySlots.some((bs) => bs.startsWith(timeStr));

      slots.push({
        time: timeStr,
        available: !isPast && !isBusy,
      });
    }

    return slots;
  }, [booking.date, profile, busySlots, selectedService]);

  const isTimeSelectionValid = useMemo(() => {
    if (!booking.time) return false;
    const selected = availableSlots.find((s) => s.time === booking.time);
    return selected ? selected.available : false;
  }, [booking.time, availableSlots]);

  // Função de Segurança: Validação de Política de No-Show/Depósito
  const handleProceedToDetails = async () => {
    setCheckingDeposit(true);
    try {
      const startTime = new Date(`${booking.date}T${booking.time}:00-03:00`);
      
      // Zero-Trust: Consulta o backend antes de mostrar a tela de resumo final
      const { data, error } = await supabase.rpc("calculate_required_deposit", {
        p_slug: slug,
        p_service_id: booking.service_id,
        p_start_time: startTime.toISOString(),
      });

      if (error) {
        console.error("Erro de segurança ao validar política de depósito:", error);
        toast.error("Não foi possível validar o serviço com segurança. Tente novamente.");
        return; // Impede o avanço caso a RPC falhe
      }

      setRequiredDeposit(Number(data || 0));
      setStep(3);
    } catch (err) {
      toast.error("Erro de conexão ao validar dados do agendamento.");
    } finally {
      setCheckingDeposit(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/40">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="text-sm font-medium">Carregando agendamento…</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-black">Barbearia não encontrada</h1>
          <p className="text-muted-foreground mt-2">Verifique o link e tente novamente.</p>
        </div>
      </div>
    );
  }

  const shopName = profile.barber_shop_name || "Barbearia";
  const initials = shopName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const stepLabels = ["Serviço", "Data & Hora", "Seus dados", "Pronto"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/40 relative overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative container max-w-2xl mx-auto px-4 py-8 md:py-14 space-y-8">
        {/* HERO */}
        <header className="text-center space-y-5">
          <div className="mx-auto flex items-center justify-center">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={shopName}
                className="h-20 w-20 rounded-2xl object-cover ring-1 ring-border shadow-lg"
              />
            ) : (
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground grid place-items-center text-2xl font-black shadow-lg ring-1 ring-primary/20">
                {initials || <Scissors className="h-8 w-8" />}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">{shopName}</h1>
            {profile.business_address && (
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {profile.business_address}
              </p>
            )}
          </div>

          <div className="max-w-md mx-auto space-y-1">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Agende seu horário em poucos segundos.
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Escolha um serviço abaixo e confirme seu atendimento de forma rápida e segura.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-xs md:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-primary" />
              Horários em tempo real
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Confirmação instantânea
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Atendimento profissional
            </span>
          </div>
        </header>

        {/* Progress */}
        <nav aria-label="Etapas" className="flex items-center justify-center gap-2">
          {stepLabels.map((label, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm scale-105"
                      : done
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-black ${
                      active
                        ? "bg-primary-foreground text-primary"
                        : done
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/60"
                    }`}
                  >
                    {done ? "✓" : n}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < stepLabels.length - 1 && <div className="h-px w-4 bg-border" />}
              </div>
            );
          })}
        </nav>

        {/* STEP 1 — Services */}
        {step === 1 && (
          <section className="space-y-4">
            <div className="flex items-end justify-between">
              <h2 className="text-lg font-bold">Escolha um serviço</h2>
              <span className="text-xs text-muted-foreground">{services.length} disponíveis</span>
            </div>

            {services.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
                Nenhum serviço disponível no momento.
              </div>
            ) : (
              <div className="grid gap-3">
                {services.map((s) => {
                  const desc = s.description || autoDescription(s.name);
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setBooking({ ...booking, service_id: s.id });
                        setStep(2);
                      }}
                      className="group text-left rounded-2xl border bg-card/80 backdrop-blur-sm p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <div className="flex items-start gap-4">
                        {s.image_url ? (
                          <img
                            src={s.image_url}
                            alt={s.name}
                            className="h-16 w-16 rounded-xl object-cover ring-1 ring-border shrink-0"
                          />
                        ) : (
                          <div className="h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary grid place-items-center ring-1 ring-primary/10 group-hover:scale-105 transition-transform">
                            <Scissors className="h-7 w-7" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-bold text-base truncate">{s.name}</h3>
                            <div className="text-right shrink-0">
                              <div className="text-lg md:text-xl font-black text-primary leading-none">
                                {formatPrice(s.price)}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{desc}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              {s.duration_minutes} min
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              Selecionar
                              <ChevronRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* STEP 2 — Date/Time */}
        {step === 2 && (
          <section className="space-y-5">
            {selectedService && (
              <div className="rounded-2xl border bg-card/80 backdrop-blur-sm p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                  <Scissors className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Serviço selecionado</p>
                  <p className="font-bold truncate">{selectedService.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {selectedService.duration_minutes} min
                  </p>
                  <p className="font-black text-primary">{formatPrice(selectedService.price)}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-lg font-bold">Quando você quer ir?</h2>

              <div className="grid gap-3">
                <label className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
                    <CalendarIcon className="h-3.5 w-3.5" /> Data
                  </span>
                  <Input
                    type="date"
                    className="h-12 text-base"
                    value={booking.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      // Zera o tempo sempre que a data for alterada, para forçar o recálculo
                      setBooking({ ...booking, date: e.target.value, time: "" })
                    }
                  />
                </label>

                {booking.date && (
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> Horários disponíveis
                      </span>
                      {slotsLoading && (
                        <span className="text-xs text-primary flex items-center gap-1 animate-pulse">
                          <Loader2 className="h-3 w-3 animate-spin" /> Atualizando...
                        </span>
                      )}
                    </div>

                    {slotsError && (
                      <p className="text-xs text-destructive flex items-center gap-1 bg-destructive/10 p-2 rounded-md">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {slotsError}
                      </p>
                    )}

                    {!slotsLoading && availableSlots.length === 0 && !slotsError ? (
                      <div className="p-8 text-center border border-dashed rounded-2xl text-muted-foreground bg-muted/20">
                        <AlertCircle className="h-6 w-6 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">A barbearia está fechada nesta data ou não há horários livres.</p>
                        <p className="text-xs mt-1">Por favor, selecione outro dia.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableSlots.map((slot) => {
                          const isSelected = booking.time === slot.time;
                          return (
                            <button
                              key={slot.time}
                              disabled={!slot.available}
                              onClick={() => setBooking({ ...booking, time: slot.time })}
                              className={`p-2.5 rounded-xl border text-sm font-bold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                                ${
                                  !slot.available
                                    ? "bg-muted/40 text-muted-foreground/40 border-transparent cursor-not-allowed"
                                    : isSelected
                                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                                      : "bg-card text-foreground hover:border-primary/50 hover:shadow-sm"
                                }`}
                            >
                              {slot.time}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="h-12 font-bold" onClick={() => setStep(1)} disabled={checkingDeposit}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
              </Button>
              <Button
                className="flex-1 h-12 font-black tracking-wide shadow-md hover:shadow-lg transition-all"
                disabled={!booking.date || !booking.time || slotsLoading || !isTimeSelectionValid || !!slotsError || checkingDeposit}
                onClick={handleProceedToDetails}
              >
                {checkingDeposit ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> VALIDANDO...
                  </>
                ) : (
                  "CONTINUAR"
                )}
              </Button>
            </div>
          </section>
        )}

        {/* STEP 3 — Personal data */}
        {step === 3 && (
          <section className="space-y-5">
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Seus dados</h2>

              <label className="space-y-1.5 block">
                <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
                  <UserIcon className="h-3.5 w-3.5" /> Nome completo
                </span>
                <Input
                  placeholder="Como podemos te chamar?"
                  className="h-12 text-base"
                  value={booking.name}
                  onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                />
              </label>

              <label className="space-y-1.5 block">
                <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> Telefone (WhatsApp)
                </span>
                <Input
                  placeholder="(11) 99999-9999"
                  className="h-12 text-base"
                  value={booking.phone}
                  onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                />
              </label>
            </div>

            {selectedService && (
              <div className="rounded-2xl border bg-muted/40 p-4 space-y-3 text-sm relative overflow-hidden">
                <p className="font-bold text-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" /> Resumo Seguro
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{selectedService.name}</span>
                    <span className="font-semibold text-foreground">
                      {formatPrice(selectedService.price)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Data e horário</span>
                    <span className="font-semibold text-foreground">
                      {booking.date &&
                        new Date(`${booking.date}T${booking.time || "00:00"}`).toLocaleDateString(
                          "pt-BR",
                        )}{" "}
                      · {booking.time}
                    </span>
                  </div>
                </div>

                {/* Exibição condicional do depósito se validado no backend */}
                {requiredDeposit > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center bg-primary/5 -mx-4 -mb-4 p-4">
                    <span className="font-semibold text-primary flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" />
                      Sinal Obrigatório (No-show)
                    </span>
                    <span className="font-black text-primary text-lg">
                      {formatPrice(requiredDeposit)}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-12 font-bold"
                onClick={() => setStep(2)}
                disabled={submitting}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
              </Button>
              
              {/* === BOTAO CONFIRMAR COM LOGICA DE ERROS REVISADA === */}
              <Button
                className="flex-1 h-12 font-black tracking-wide shadow-md hover:shadow-lg transition-all"
                disabled={submitting || !booking.name || !booking.phone}
                onClick={async () => {
                  setSubmitting(true);
                  try {
                    const startTime = new Date(`${booking.date}T${booking.time}:00-03:00`);

                    // 🚨 AUDITORIA DE SEGURANÇA:
                    // O preço (price) ou depósito NÃO são repassados no payload. O frontend
                    // passa estritamente os IDs, garantindo que usuários não manipulem os valores via console.
                    const { error } = await supabase.rpc("create_public_booking", {
                      p_slug: slug,
                      p_service_id: booking.service_id,
                      p_start_time: startTime.toISOString(),
                      p_customer_name: booking.name.trim(),
                      p_customer_phone: booking.phone.trim(),
                    });

                    if (error) {
                      console.error("Erro retornado pelo Supabase RPC:", error);
                      const message = (error.message || error.details || "").toLowerCase();

                      // TRATAMENTO ANTI-FRAUDE (Validações blindadas do BD)
                      if (message.includes("fraude") || message.includes("manipula") || message.includes("inconsistência") || message.includes("violado") || message.includes("preço") || message.includes("segurança")) {
                        toast.error("Operação bloqueada por motivos de segurança. Refaça o agendamento.", {
                          icon: <ShieldAlert className="h-4 w-4 text-destructive" />
                        });
                        setStep(1); // Volta pro início imediato
                      }
                      // Tratamento de conflito de horário duplo / já preenchido
                      else if (message.includes("horário") || message.includes("indisponível") || message.includes("conflito") || message.includes("ocupado") || message.includes("duplicado") || message.includes("já existe")) {
                        toast.error("Vixe! Alguém acabou de reservar esse horário. Por favor, escolha outro.");
                        setStep(2); // Volta pra data e hora para escolher outro
                      } 
                      // Tratamento de agendamento fora do expediente
                      else if (message.includes("fechado") || message.includes("expediente") || message.includes("fora de horário") || message.includes("fora do horário")) {
                        toast.error("O horário selecionado está fora do expediente da barbearia.");
                        setStep(2); // Volta pra data e hora para mudar o momento
                      } 
                      // Tratamento caso o serviço seja inativado/removido enquanto o usuário tenta agendar
                      else if (message.includes("serviço")) {
                        toast.error("O serviço selecionado não está mais disponível.");
                        setStep(1); // Volta pro início do funil
                      } 
                      // Erros genéricos de banco de dados
                      else {
                        toast.error("Não foi possível concluir o agendamento no momento. Tente novamente.");
                      }
                      
                      return;
                    }

                    // Sucesso!
                    toast.success("Agendamento concluído!");
                    setStep(4);

                  } catch (err: any) {
                    // Captura erros inesperados como falha de rede
                    console.error("Erro inesperado durante o agendamento:", err);
                    toast.error("Ocorreu um problema de conexão. Verifique sua internet e tente novamente.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> CONFIRMANDO…
                  </>
                ) : (
                  "CONFIRMAR AGENDAMENTO"
                )}
              </Button>
            </div>
          </section>
        )}

        {/* STEP 4 — Success */}
        {step === 4 && (
          <section className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="h-24 w-24 bg-gradient-to-br from-green-500/20 to-green-500/5 text-green-600 rounded-full flex items-center justify-center mx-auto ring-1 ring-green-500/30 shadow-lg">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Tudo certo!</h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
                Seu horário foi agendado com sucesso na{" "}
                <span className="font-semibold text-foreground">{shopName}</span>. Você receberá a
                confirmação em breve.
              </p>
            </div>

            {selectedService && (
              <div className="max-w-sm mx-auto rounded-2xl border bg-card/80 backdrop-blur-sm p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serviço</span>
                  <span className="font-semibold">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quando</span>
                  <span className="font-semibold">
                    {new Date(`${booking.date}T${booking.time}`).toLocaleDateString("pt-BR")} ·{" "}
                    {booking.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Total</span>
                  <span className="font-black text-primary">
                    {formatPrice(selectedService.price)}
                  </span>
                </div>
                {requiredDeposit > 0 && (
                  <div className="flex justify-between pt-2 mt-2 border-t border-border">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5"/> Sinal Pago/Pendente
                    </span>
                    <span className="font-black text-primary">
                      {formatPrice(requiredDeposit)}
                    </span>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="outline"
              className="h-12 font-black px-8"
              onClick={() => window.location.reload()}
            >
              FAZER NOVO AGENDAMENTO
            </Button>
          </section>
        )}

        <footer className="pt-6 text-center text-xs text-muted-foreground">
          Powered by <span className="font-bold text-foreground">Corte Certo</span>
        </footer>
      </div>
    </div>
  );
}