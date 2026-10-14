import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Subscription } from "@/lib/subscription";
import { hasAccess, PLAN_FEATURES } from "@/lib/subscription";

export function useSubscription() {
  const query = useQuery({
    queryKey: ["subscription"],
    queryFn: async (): Promise<Subscription | null> => {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (!user) return null;

      const { data, error } = await supabase
        .from("subscriptions" as any)
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("[subscription] fetch error", error);
        return null;
      }
      return (data as unknown as Subscription) ?? null;
    },
    staleTime: 60_000,
    retry: 1,
  });

  const sub = query.data ?? null;
  return {
    subscription: sub,
    isLoading: query.isLoading,
    hasAccess: hasAccess(sub),
    features: sub ? PLAN_FEATURES[sub.plan] : null,
    refetch: query.refetch,
  };
}
