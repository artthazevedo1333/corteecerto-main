import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { f as useParams } from "./_libs/tanstack__react-router.mjs";
import { s as supabase } from "./_ssr/client-DsJMwvTf.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { I as Input, d as Button } from "./_ssr/router-DONcpGkq.mjs";
import { L as LoaderCircle, F as Scissors, ad as MapPin, _ as Zap, ae as ShieldCheck, l as Sparkles, a8 as Clock, f as ChevronRight, J as Calendar, C as CircleAlert, A as ArrowLeft, a9 as User, af as Phone, ac as Lock, ag as ShieldAlert, k as CircleCheck } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "./_libs/isbot.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-avatar.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/zod.mjs";
function autoDescription(name) {
  const n = (name || "").toLowerCase();
  if (n.includes("barba")) return "Modelagem completa da barba com acabamento profissional.";
  if (n.includes("sobrancelha")) return "Design e alinhamento com toque refinado.";
  if (n.includes("pigment")) return "Pigmentação precisa para um visual impecável.";
  if (n.includes("hidrat") || n.includes("tratamento")) return "Tratamento capilar especializado para nutrição profunda.";
  if (n.includes("platinado") || n.includes("descolor")) return "Descoloração e tonalização com produtos premium.";
  if (n.includes("infantil") || n.includes("kids")) return "Atendimento cuidadoso e divertido para crianças.";
  if (n.includes("combo") || n.includes("+")) return "Combinação completa para um resultado impecável.";
  if (n.includes("corte")) return "Corte realizado com acabamento profissional e personalizado.";
  return "Atendimento profissional com acabamento de alto padrão.";
}
function formatPrice(v) {
  const n = Number(v || 0);
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function BookingSlugPage() {
  const {
    slug
  } = useParams({
    from: "/booking/$slug"
  });
  const [loading, setLoading] = reactExports.useState(true);
  const [profile, setProfile] = reactExports.useState(null);
  const [services, setServices] = reactExports.useState([]);
  const [step, setStep] = reactExports.useState(1);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [booking, setBooking] = reactExports.useState({
    service_id: "",
    date: "",
    time: "",
    name: "",
    phone: ""
  });
  const [busySlots, setBusySlots] = reactExports.useState([]);
  const [slotsLoading, setSlotsLoading] = reactExports.useState(false);
  const [slotsError, setSlotsError] = reactExports.useState(null);
  const [requiredDeposit, setRequiredDeposit] = reactExports.useState(0);
  const [checkingDeposit, setCheckingDeposit] = reactExports.useState(false);
  reactExports.useEffect(() => {
    async function loadData() {
      const {
        data,
        error
      } = await supabase.rpc("get_public_booking_data", {
        p_slug: slug
      });
      if (error || !data) {
        toast.error("Barbearia não encontrada");
        setLoading(false);
        return;
      }
      const payload = data;
      setProfile(payload.profile);
      setServices(payload.services || []);
      setLoading(false);
    }
    loadData();
  }, [slug]);
  reactExports.useEffect(() => {
    async function fetchBusySlots() {
      if (!booking.date) {
        setBusySlots([]);
        setSlotsError(null);
        return;
      }
      setSlotsLoading(true);
      setSlotsError(null);
      try {
        const {
          data,
          error
        } = await supabase.rpc("get_public_booking_busy_slots", {
          p_slug: slug,
          p_date: booking.date
        });
        if (error) throw error;
        const slots = Array.isArray(data) ? data.map((item) => typeof item === "string" ? item : item.time || item.start_time).filter(Boolean) : [];
        setBusySlots(slots);
      } catch (err) {
        console.error("Erro ao buscar horários ocupados:", err);
        setSlotsError("Não foi possível carregar a disponibilidade. Tente novamente.");
        toast.error("Erro ao verificar disponibilidade de horários.");
      } finally {
        setSlotsLoading(false);
      }
    }
    fetchBusySlots();
  }, [booking.date, slug]);
  const selectedService = reactExports.useMemo(() => services.find((s) => s.id === booking.service_id), [services, booking.service_id]);
  const availableSlots = reactExports.useMemo(() => {
    if (!booking.date || !profile) return [];
    const tz = profile.business_timezone || "America/Sao_Paulo";
    const dateStr = booking.date;
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    const parts = formatter.formatToParts(/* @__PURE__ */ new Date());
    const getPart = (type) => parts.find((p) => p.type === type)?.value;
    const currentYMD = `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
    const currentHM = `${getPart("hour")}:${getPart("minute")}`;
    const dayOfWeek = (/* @__PURE__ */ new Date(`${dateStr}T00:00:00`)).getDay();
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
      isClosed = true;
    }
    if (isClosed) return [];
    const parseTime = (ts) => {
      const [h, m] = ts.split(":").map(Number);
      return h * 60 + (m || 0);
    };
    const formatTime = (mins) => {
      const h = Math.floor(mins / 60).toString().padStart(2, "0");
      const m = (mins % 60).toString().padStart(2, "0");
      return `${h}:${m}`;
    };
    const startMins = parseTime(openTime);
    const closeMins = parseTime(closeTime);
    const serviceDuration = selectedService?.duration_minutes || 30;
    const slots = [];
    for (let current = startMins; current + serviceDuration <= closeMins; current += 30) {
      const timeStr = formatTime(current);
      const isPast = dateStr < currentYMD || dateStr === currentYMD && timeStr <= currentHM;
      const isBusy = busySlots.some((bs) => bs.startsWith(timeStr));
      slots.push({
        time: timeStr,
        available: !isPast && !isBusy
      });
    }
    return slots;
  }, [booking.date, profile, busySlots, selectedService]);
  const isTimeSelectionValid = reactExports.useMemo(() => {
    if (!booking.time) return false;
    const selected = availableSlots.find((s) => s.time === booking.time);
    return selected ? selected.available : false;
  }, [booking.time, availableSlots]);
  const handleProceedToDetails = async () => {
    setCheckingDeposit(true);
    try {
      const startTime = /* @__PURE__ */ new Date(`${booking.date}T${booking.time}:00-03:00`);
      const {
        data,
        error
      } = await supabase.rpc("calculate_required_deposit", {
        p_slug: slug,
        p_service_id: booking.service_id,
        p_start_time: startTime.toISOString()
      });
      if (error) {
        console.error("Erro de segurança ao validar política de depósito:", error);
        toast.error("Não foi possível validar o serviço com segurança. Tente novamente.");
        return;
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-10 w-10 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Carregando agendamento…" })
    ] }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: "Barbearia não encontrada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Verifique o link e tente novamente." })
    ] }) });
  }
  const shopName = profile.barber_shop_name || "Barbearia";
  const initials = shopName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const stepLabels = ["Serviço", "Data & Hora", "Seus dados", "Pronto"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-background via-background to-muted/40 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-primary/5 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container max-w-2xl mx-auto px-4 py-8 md:py-14 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex items-center justify-center", children: profile.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.avatar_url, alt: shopName, className: "h-20 w-20 rounded-2xl object-cover ring-1 ring-border shadow-lg" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground grid place-items-center text-2xl font-black shadow-lg ring-1 ring-primary/20", children: initials || /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-8 w-8" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-black tracking-tight", children: shopName }),
          profile.business_address && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center justify-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            profile.business_address
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-bold text-foreground", children: "Agende seu horário em poucos segundos." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm md:text-base", children: "Escolha um serviço abaixo e confirme seu atendimento de forma rápida e segura." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-xs md:text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-primary" }),
            "Horários em tempo real"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
            "Confirmação instantânea"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
            "Atendimento profissional"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Etapas", className: "flex items-center justify-center gap-2", children: stepLabels.map((label, i) => {
        const n = i + 1;
        const active = step === n;
        const done = step > n;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${active ? "bg-primary text-primary-foreground shadow-sm scale-105" : done ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-5 w-5 rounded-full grid place-items-center text-[10px] font-black ${active ? "bg-primary-foreground text-primary" : done ? "bg-primary text-primary-foreground" : "bg-background/60"}`, children: done ? "✓" : n }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: label })
          ] }),
          i < stepLabels.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-4 bg-border" })
        ] }, label);
      }) }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Escolha um serviço" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            services.length,
            " disponíveis"
          ] })
        ] }),
        services.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed p-10 text-center text-muted-foreground", children: "Nenhum serviço disponível no momento." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: services.map((s) => {
          const desc = s.description || autoDescription(s.name);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setBooking({
              ...booking,
              service_id: s.id
            });
            setStep(2);
          }, className: "group text-left rounded-2xl border bg-card/80 backdrop-blur-sm p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            s.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.image_url, alt: s.name, className: "h-16 w-16 rounded-xl object-cover ring-1 ring-border shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary grid place-items-center ring-1 ring-primary/10 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-7 w-7" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base truncate", children: s.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg md:text-xl font-black text-primary leading-none", children: formatPrice(s.price) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2", children: desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  s.duration_minutes,
                  " min"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity", children: [
                  "Selecionar",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
                ] })
              ] })
            ] })
          ] }) }, s.id);
        }) })
      ] }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-5", children: [
        selectedService && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card/80 backdrop-blur-sm p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Serviço selecionado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold truncate", children: selectedService.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              selectedService.duration_minutes,
              " min"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-primary", children: formatPrice(selectedService.price) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Quando você quer ir?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                " Data"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", className: "h-12 text-base", value: booking.date, min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0], onChange: (e) => (
                // Zera o tempo sempre que a data for alterada, para forçar o recálculo
                setBooking({
                  ...booking,
                  date: e.target.value,
                  time: ""
                })
              ) })
            ] }),
            booking.date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  " Horários disponíveis"
                ] }),
                slotsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary flex items-center gap-1 animate-pulse", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }),
                  " Atualizando..."
                ] })
              ] }),
              slotsError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1 bg-destructive/10 p-2 rounded-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5" }),
                slotsError
              ] }),
              !slotsLoading && availableSlots.length === 0 && !slotsError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center border border-dashed rounded-2xl text-muted-foreground bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-6 w-6 mx-auto mb-2 opacity-50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "A barbearia está fechada nesta data ou não há horários livres." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Por favor, selecione outro dia." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-2", children: availableSlots.map((slot) => {
                const isSelected = booking.time === slot.time;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: !slot.available, onClick: () => setBooking({
                  ...booking,
                  time: slot.time
                }), className: `p-2.5 rounded-xl border text-sm font-bold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                                ${!slot.available ? "bg-muted/40 text-muted-foreground/40 border-transparent cursor-not-allowed" : isSelected ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" : "bg-card text-foreground hover:border-primary/50 hover:shadow-sm"}`, children: slot.time }, slot.time);
              }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-12 font-bold", onClick: () => setStep(1), disabled: checkingDeposit, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
            " Voltar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "flex-1 h-12 font-black tracking-wide shadow-md hover:shadow-lg transition-all", disabled: !booking.date || !booking.time || slotsLoading || !isTimeSelectionValid || !!slotsError || checkingDeposit, onClick: handleProceedToDetails, children: checkingDeposit ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
            " VALIDANDO..."
          ] }) : "CONTINUAR" })
        ] })
      ] }),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Seus dados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5 block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }),
              " Nome completo"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Como podemos te chamar?", className: "h-12 text-base", value: booking.name, onChange: (e) => setBooking({
              ...booking,
              name: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5 block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
              " Telefone (WhatsApp)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "(11) 99999-9999", className: "h-12 text-base", value: booking.phone, onChange: (e) => setBooking({
              ...booking,
              phone: e.target.value
            }) })
          ] })
        ] }),
        selectedService && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-muted/40 p-4 space-y-3 text-sm relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-muted-foreground" }),
            " Resumo Seguro"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedService.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatPrice(selectedService.price) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Data e horário" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                booking.date && (/* @__PURE__ */ new Date(`${booking.date}T${booking.time || "00:00"}`)).toLocaleDateString("pt-BR"),
                " ",
                "· ",
                booking.time
              ] })
            ] })
          ] }),
          requiredDeposit > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/50 flex justify-between items-center bg-primary/5 -mx-4 -mb-4 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
              "Sinal Obrigatório (No-show)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-primary text-lg", children: formatPrice(requiredDeposit) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-12 font-bold", onClick: () => setStep(2), disabled: submitting, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
            " Voltar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "flex-1 h-12 font-black tracking-wide shadow-md hover:shadow-lg transition-all", disabled: submitting || !booking.name || !booking.phone, onClick: async () => {
            setSubmitting(true);
            try {
              const startTime = /* @__PURE__ */ new Date(`${booking.date}T${booking.time}:00-03:00`);
              const {
                error
              } = await supabase.rpc("create_public_booking", {
                p_slug: slug,
                p_service_id: booking.service_id,
                p_start_time: startTime.toISOString(),
                p_customer_name: booking.name.trim(),
                p_customer_phone: booking.phone.trim()
              });
              if (error) {
                console.error("Erro retornado pelo Supabase RPC:", error);
                const message = (error.message || error.details || "").toLowerCase();
                if (message.includes("fraude") || message.includes("manipula") || message.includes("inconsistência") || message.includes("violado") || message.includes("preço") || message.includes("segurança")) {
                  toast.error("Operação bloqueada por motivos de segurança. Refaça o agendamento.", {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 text-destructive" })
                  });
                  setStep(1);
                } else if (message.includes("horário") || message.includes("indisponível") || message.includes("conflito") || message.includes("ocupado") || message.includes("duplicado") || message.includes("já existe")) {
                  toast.error("Vixe! Alguém acabou de reservar esse horário. Por favor, escolha outro.");
                  setStep(2);
                } else if (message.includes("fechado") || message.includes("expediente") || message.includes("fora de horário") || message.includes("fora do horário")) {
                  toast.error("O horário selecionado está fora do expediente da barbearia.");
                  setStep(2);
                } else if (message.includes("serviço")) {
                  toast.error("O serviço selecionado não está mais disponível.");
                  setStep(1);
                } else {
                  toast.error("Não foi possível concluir o agendamento no momento. Tente novamente.");
                }
                return;
              }
              toast.success("Agendamento concluído!");
              setStep(4);
            } catch (err) {
              console.error("Erro inesperado durante o agendamento:", err);
              toast.error("Ocorreu um problema de conexão. Verifique sua internet e tente novamente.");
            } finally {
              setSubmitting(false);
            }
          }, children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
            " CONFIRMANDO…"
          ] }) : "CONFIRMAR AGENDAMENTO" })
        ] })
      ] }),
      step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 bg-gradient-to-br from-green-500/20 to-green-500/5 text-green-600 rounded-full flex items-center justify-center mx-auto ring-1 ring-green-500/30 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-black tracking-tight", children: "Tudo certo!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-base md:text-lg max-w-md mx-auto", children: [
            "Seu horário foi agendado com sucesso na",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: shopName }),
            ". Você receberá a confirmação em breve."
          ] })
        ] }),
        selectedService && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm mx-auto rounded-2xl border bg-card/80 backdrop-blur-sm p-4 text-left space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Serviço" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: selectedService.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Quando" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
              (/* @__PURE__ */ new Date(`${booking.date}T${booking.time}`)).toLocaleDateString("pt-BR"),
              " ·",
              " ",
              booking.time
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Valor Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-primary", children: formatPrice(selectedService.price) })
          ] }),
          requiredDeposit > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2 mt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
              " Sinal Pago/Pendente"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-primary", children: formatPrice(requiredDeposit) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "h-12 font-black px-8", onClick: () => window.location.reload(), children: "FAZER NOVO AGENDAMENTO" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "pt-6 text-center text-xs text-muted-foreground", children: [
        "Powered by ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "Corte Certo" })
      ] })
    ] })
  ] });
}
export {
  BookingSlugPage as component
};
