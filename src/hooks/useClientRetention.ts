import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { differenceInDays, parseISO, subDays } from "date-fns";

export interface ClientRetentionStats {
  id: string;
  name: string;
  phone: string;
  last_visit: string;
  days_since_last_visit: number;
  risk_level: "green" | "yellow" | "red";
  frequency_days: number;
}

export function useClientRetention() {
  const [inactiveClients, setInactiveClients] = useState<ClientRetentionStats[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (!user) {
        setInactiveClients([]);
        return;
      }

      const { data: clients } = await supabase
        .from("clients")
        .select("id, name, phone, last_visit")
        .eq("user_id", user.id)
        .not("last_visit", "is", null)
        .order("last_visit", { ascending: true });

      if (!clients) {
        setInactiveClients([]);
        return;
      }

      const now = new Date();

      const analyzedClients: ClientRetentionStats[] = clients.map((client) => {
        const lastVisit = parseISO(client.last_visit!);
        const daysSince = differenceInDays(now, lastVisit);

        // Default frequency: 30 days.
        // In a more advanced version, we'd calculate the real frequency per client.
        const frequency = 30;

        let risk: "green" | "yellow" | "red" = "green";
        if (daysSince > frequency * 2) {
          risk = "red";
        } else if (daysSince > frequency) {
          risk = "yellow";
        }

        return {
          id: client.id,
          name: client.name,
          phone: client.phone || "",
          last_visit: client.last_visit!,
          days_since_last_visit: daysSince,
          risk_level: risk,
          frequency_days: frequency,
        };
      });

      // Filter only those at risk (yellow or red)
      setInactiveClients(analyzedClients.filter((c) => c.risk_level !== "green"));
    } catch (error) {
      console.error("Error loading retention data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { inactiveClients, loading, refresh: loadData };
}
