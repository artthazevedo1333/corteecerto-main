import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminWhitelist = () => useQuery({
  queryKey: ["adminWhitelist"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("admin_whitelist")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  }
});

export const useAddAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase
        .from("admin_whitelist")
        .insert([{ email }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminWhitelist"] });
    }
  });
};

export const useRemoveAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase
        .from("admin_whitelist")
        .delete()
        .eq("email", email);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminWhitelist"] });
    }
  });
};