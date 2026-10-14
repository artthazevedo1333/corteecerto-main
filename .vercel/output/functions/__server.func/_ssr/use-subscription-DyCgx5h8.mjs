import { c as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { a as PLAN_FEATURES, h as hasAccess } from "./subscription-D6ZG8HOt.mjs";
function useSubscription() {
  const query = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (!user) return null;
      const { data, error } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle();
      if (error) {
        console.error("[subscription] fetch error", error);
        return null;
      }
      return data ?? null;
    },
    staleTime: 6e4,
    retry: 1
  });
  const sub = query.data ?? null;
  return {
    subscription: sub,
    isLoading: query.isLoading,
    hasAccess: hasAccess(sub),
    features: sub ? PLAN_FEATURES[sub.plan] : null,
    refetch: query.refetch
  };
}
export {
  useSubscription as u
};
