import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { C as Card, e as CardContent, d as Button } from "./router-DONcpGkq.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a8 as Clock, a9 as User, D as DollarSign, aB as Play, aC as CircleCheckBig, M as MessageCircle } from "../_libs/lucide-react.mjs";
import { a as format, s as startOfToday, e as endOfToday, j as startOfWeek, k as startOfMonth, b as parseISO } from "../_libs/date-fns.mjs";
function useDashboardData() {
  const [stats, setStats] = reactExports.useState({
    nextAppointment: null,
    today: { revenue: 0, count: 0 },
    week: { revenue: 0, count: 0 },
    month: { revenue: 0, count: 0, goal: 0 },
    topServices: [],
    birthdays: [],
    lowStockCount: 0,
    loading: true,
    monthlyRevenueRecords: []
  });
  const loadData = async () => {
    try {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (!user) {
        setStats((prev) => ({ ...prev, loading: false }));
        return;
      }
      const now = /* @__PURE__ */ new Date();
      const sToday = startOfToday().toISOString();
      const eToday = endOfToday().toISOString();
      const sWeek = startOfWeek(now, { weekStartsOn: 1 }).toISOString();
      const sMonth = startOfMonth(now).toISOString();
      const { data: profile } = await supabase.from("profiles").select("monthly_goal").eq("id", user.id).single();
      const { data: nextApt } = await supabase.from("appointments").select("*, client:clients(name, phone), service:services(name, price)").eq("user_id", user.id).in("status", ["scheduled", "in_progress"]).gte("start_time", now.toISOString()).order("start_time", { ascending: true }).limit(1).maybeSingle();
      const { data: financialRecords } = await supabase.from("financial_records").select("amount, date, type").eq("user_id", user.id).eq("type", "income").gte("date", sMonth);
      const todayRev = financialRecords?.filter((r) => r.date >= sToday && r.date <= eToday).reduce((acc, r) => acc + r.amount, 0) || 0;
      const weekRev = financialRecords?.filter((r) => r.date >= sWeek).reduce((acc, r) => acc + r.amount, 0) || 0;
      const monthRev = financialRecords?.reduce((acc, r) => acc + r.amount, 0) || 0;
      const monthlyRevenueRecords = financialRecords || [];
      const { data: monthAppointments } = await supabase.from("appointments").select("start_time, status, service:services(name, price)").eq("user_id", user.id).eq("status", "completed").gte("start_time", sMonth);
      const todayCount = monthAppointments?.filter((a) => a.start_time >= sToday && a.start_time <= eToday).length || 0;
      const weekCount = monthAppointments?.filter((a) => a.start_time >= sWeek).length || 0;
      const monthCount = monthAppointments?.length || 0;
      const serviceMap = /* @__PURE__ */ new Map();
      monthAppointments?.forEach((a) => {
        const name = a.service?.name || "Outros";
        const price = a.service?.price || 0;
        const current = serviceMap.get(name) || { count: 0, revenue: 0 };
        serviceMap.set(name, { count: current.count + 1, revenue: current.revenue + price });
      });
      const topServices = Array.from(serviceMap.entries()).map(([name, data]) => ({ name, ...data })).sort((a, b) => b.count - a.count).slice(0, 5);
      const monthDay = format(now, "MM-dd");
      const { data: birthdays } = await supabase.from("clients").select("*").eq("user_id", user.id).filter("birthday", "not.is", null);
      const todayBirthdays = birthdays?.filter((c) => {
        if (!c.birthday) return false;
        const b = parseISO(c.birthday);
        return format(b, "MM-dd") === monthDay;
      }) || [];
      const { data: products } = await supabase.from("products").select("current_stock, min_stock").eq("user_id", user.id);
      const lowStockCount = products?.filter((p) => p.current_stock <= p.min_stock).length || 0;
      setStats({
        nextAppointment: nextApt,
        today: { revenue: todayRev, count: todayCount },
        week: { revenue: weekRev, count: weekCount },
        month: { revenue: monthRev, count: monthCount, goal: profile?.monthly_goal || 0 },
        topServices,
        birthdays: todayBirthdays,
        lowStockCount,
        loading: false,
        monthlyRevenueRecords
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };
  reactExports.useEffect(() => {
    loadData();
  }, []);
  return { ...stats, refresh: loadData };
}
function NextAppointment({ appointment, onUpdate }) {
  const [loading, setLoading] = reactExports.useState(false);
  if (!appointment) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[2rem] border-dashed border-2 border-border bg-transparent shadow-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8 text-muted-foreground/30" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase italic tracking-tight", children: "Sem agendamentos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium mt-1", children: "Sua agenda está livre por enquanto." })
    ] }) });
  }
  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("appointments").update({ status: newStatus }).eq("id", appointment.id);
      if (error) throw error;
      if (newStatus === "completed") {
        await supabase.from("financial_records").insert({
          user_id: appointment.user_id,
          amount: appointment.service?.price || 0,
          description: `Serviço: ${appointment.service?.name} - Cliente: ${appointment.client?.name}`,
          type: "income",
          category: "service",
          date: (/* @__PURE__ */ new Date()).toISOString()
        });
        const { data: clientData } = await supabase.from("clients").select("total_spent").eq("id", appointment.client_id).single();
        await supabase.from("clients").update({
          last_visit: (/* @__PURE__ */ new Date()).toISOString(),
          total_spent: (clientData?.total_spent || 0) + (appointment.service?.price || 0)
        }).eq("id", appointment.client_id);
        toast.success("Atendimento finalizado e financeiro atualizado!");
      } else {
        toast.success("Atendimento iniciado!");
      }
      onUpdate?.();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Erro ao atualizar status");
    } finally {
      setLoading(false);
    }
  };
  const sendWhatsApp = () => {
    const phone = appointment.client?.phone || "";
    const message = encodeURIComponent(
      `Olá, ${appointment.client?.name}! Aqui é da barbearia. Estou te aguardando para seu atendimento das ${format(new Date(appointment.start_time), "HH:mm")}.`
    );
    window.open(`https://wa.me/55${phone.replace(/\D/g, "")}?text=${message}`, "_blank");
  };
  const is_in_progress = appointment.status === "in_progress";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `overflow-hidden rounded-[2.5rem] shadow-2xl transition-all border-none ${is_in_progress ? "bg-green-600 text-white shadow-green-600/20" : "bg-primary text-white shadow-primary/20"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10 flex-1 border-white/10 border-b md:border-b-0 md:border-r", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center border border-white/30 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-10 w-10" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-white/20 border border-white/20`,
                  children: is_in_progress ? "EM ATENDIMENTO" : "PRÓXIMO"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-black italic tracking-tighter leading-none break-words", children: appointment.client?.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold mt-2 text-white/80", children: appointment.service?.name })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-white/10 border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-black tracking-widest opacity-70", children: "Horário" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-xl leading-tight", children: format(new Date(appointment.start_time), "HH:mm") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-white/10 border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-black tracking-widest opacity-70", children: "Valor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-black text-xl leading-tight", children: [
                  "R$",
                  " ",
                  appointment.service?.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                  })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10 flex flex-col gap-3 justify-center w-full md:w-72 bg-black/10", children: [
          !is_in_progress ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => handleStatusChange("in_progress"),
              disabled: loading,
              className: "w-full font-black h-14 text-base rounded-2xl bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/20 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-5 w-5 fill-current" }),
                "INICIAR SERVIÇO"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => handleStatusChange("completed"),
              disabled: loading,
              className: "w-full font-black h-14 text-base rounded-2xl bg-white text-green-600 hover:bg-white/90 shadow-xl shadow-black/20 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5" }),
                "FINALIZAR E RECEBER"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: sendWhatsApp,
              className: "w-full font-black h-14 text-base rounded-2xl border-white/30 text-white hover:bg-white/10 bg-transparent gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
                "WHATSAPP"
              ]
            }
          )
        ] })
      ] }) })
    }
  );
}
export {
  NextAppointment as N,
  useDashboardData as u
};
