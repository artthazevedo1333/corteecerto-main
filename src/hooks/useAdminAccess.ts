// src/hooks/useAdminAccess.ts
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAdminAccess() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Evita memory leaks

    const checkAdmin = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        const email = session?.user?.email?.toLowerCase().trim();
        
        if (!email) {
          if (isMounted) {
            setIsAdmin(false);
            setIsLoading(false);
          }
          return;
        }

        // Sua verificação Hardcoded
        if (email === "azevedoarthur120@gmail.com") {
          if (isMounted) setIsAdmin(true);
        } else {
          // A verificação na tabela
          const { data, error } = await supabase
            .from("admin_whitelist")
            .select("email")
            .eq("email", email)
            .maybeSingle();
            
          if (error) {
             console.error("Erro ao checar whitelist:", error);
             if (isMounted) setIsAdmin(false);
          } else {
             if (isMounted) setIsAdmin(!!data);
          }
        }
      } catch (error) {
        console.error("Erro no Auth:", error);
        if (isMounted) setIsAdmin(false);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkAdmin();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  return { isAdmin, isLoading };
}