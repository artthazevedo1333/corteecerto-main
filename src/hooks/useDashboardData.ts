import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfToday, endOfToday, startOfWeek, startOfMonth, parseISO } from "date-fns";

export interface DashboardStats {
  nextAppointment: any;
  today: {
    revenue: number;
    count: number;
  };
  week: {
    revenue: number;
    count: number;
  };
  month: {
    revenue: number;
    count: number;
    goal: number;
  };
  topServices: { name: string; count: number; revenue: number }[];
  birthdays: any[];
  lowStockCount: number;
  loading: boolean;
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats & { monthlyRevenueRecords: any[] }>({
    nextAppointment: null,
    today: { revenue: 0, count: 0 },
    week: { revenue: 0, count: 0 },
    month: { revenue: 0, count: 0, goal: 0 },
    topServices: [],
    birthdays: [],
    lowStockCount: 0,
    loading: true,
    monthlyRevenueRecords: [],
  });

  const loadData = async () => {
    try {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (!user) {
        setStats((prev) => ({ ...prev, loading: false }));
        return;
      }

      const now = new Date();
      const sToday = startOfToday().toISOString();
      const eToday = endOfToday().toISOString();
      const sWeek = startOfWeek(now, { weekStartsOn: 1 }).toISOString();
      const sMonth = startOfMonth(now).toISOString();

      // Get Profile (for goal)
      const { data: profile } = await supabase
        .from("profiles")
        .select("monthly_goal")
        .eq("id", user.id)
        .single();

      // Next Appointment
      const { data: nextApt } = await supabase
        .from("appointments")
        .select("*, client:clients(name, phone), service:services(name, price)")
        .eq("user_id", user.id)
        .in("status", ["scheduled", "in_progress"])
        .gte("start_time", now.toISOString())
        .order("start_time", { ascending: true })
        .limit(1)
        .maybeSingle();

      // Financials
      const { data: financialRecords } = await supabase
        .from("financial_records")
        .select("amount, date, type")
        .eq("user_id", user.id)
        .eq("type", "income")
        .gte("date", sMonth);

      const todayRev =
        financialRecords
          ?.filter((r) => r.date >= sToday && r.date <= eToday)
          .reduce((acc, r) => acc + r.amount, 0) || 0;
      const weekRev =
        financialRecords?.filter((r) => r.date >= sWeek).reduce((acc, r) => acc + r.amount, 0) || 0;
      const monthRev = financialRecords?.reduce((acc, r) => acc + r.amount, 0) || 0;
      const monthlyRevenueRecords = financialRecords || [];

      // Appointment counts
      const { data: monthAppointments } = await supabase
        .from("appointments")
        .select("start_time, status, service:services(name, price)")
        .eq("user_id", user.id)
        .eq("status", "completed")
        .gte("start_time", sMonth);

      const todayCount =
        monthAppointments?.filter((a) => a.start_time >= sToday && a.start_time <= eToday).length ||
        0;
      const weekCount = monthAppointments?.filter((a) => a.start_time >= sWeek).length || 0;
      const monthCount = monthAppointments?.length || 0;

      // Top Services
      const serviceMap = new Map<string, { count: number; revenue: number }>();
      monthAppointments?.forEach((a) => {
        const name = a.service?.name || "Outros";
        const price = a.service?.price || 0;
        const current = serviceMap.get(name) || { count: 0, revenue: 0 };
        serviceMap.set(name, { count: current.count + 1, revenue: current.revenue + price });
      });
      const topServices = Array.from(serviceMap.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Birthdays (today)
      const monthDay = format(now, "MM-dd");
      const { data: birthdays } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", user.id)
        // Note: Supabase/Postgres don't have a direct 'MM-dd' match easily without raw SQL or a specific format,
        // but for MVP we'll just fetch and filter or use a simple query if possible.
        // Let's use a more efficient query for Postgres:
        .filter("birthday", "not.is", null);

      const todayBirthdays =
        birthdays?.filter((c) => {
          if (!c.birthday) return false;
          const b = parseISO(c.birthday);
          return format(b, "MM-dd") === monthDay;
        }) || [];

      // Low Stock
      const { data: products } = await supabase
        .from("products")
        .select("current_stock, min_stock")
        .eq("user_id", user.id);
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
        monthlyRevenueRecords,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { ...stats, refresh: loadData };
}
