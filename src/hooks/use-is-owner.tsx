import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Verifica se o usuário atual possui role 'owner' ou 'admin'.
 * Usa a função security definer has_role() — RLS-safe.
 */
export function useIsOwner() {
  const query = useQuery({
    queryKey: ["is-owner"],
    queryFn: async (): Promise<boolean> => {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (!user) return false;

      const [ownerRes, adminRes] = await Promise.all([
        supabase.rpc("has_role", { _user_id: user.id, _role: "owner" as any }),
        supabase.rpc("has_role", { _user_id: user.id, _role: "admin" as any }),
      ]);

      return Boolean(ownerRes.data) || Boolean(adminRes.data);
    },
    staleTime: 5 * 60_000,
    retry: 1,
  });

  return { isOwner: query.data === true, isLoading: query.isLoading };
}
