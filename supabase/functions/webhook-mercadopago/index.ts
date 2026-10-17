import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

serve(async (req) => {
  try {
    // O Mercado Pago envia os dados no URL (query params) ou no corpo da requisição (body)
    const url = new URL(req.url);
    const action = url.searchParams.get("type") || url.searchParams.get("topic");
    const paymentId = url.searchParams.get("data.id") || url.searchParams.get("id");

    if (action === "payment" && paymentId) {
      // 1. Vai buscar os detalhes do pagamento à API do Mercado Pago
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${Deno.env.get('MP_ACCESS_TOKEN')}`
        }
      });
      
      const paymentData = await mpResponse.json();

      // 2. Verifica se o pagamento foi aprovado
      if (paymentData.status === "approved") {
        
        // Aqui está o ID do barbeiro que passámos no link como 'external_reference'
        const userId = paymentData.external_reference;

        if (userId) {
          const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
          );

          // 3. Desbloqueia o barbeiro no Supabase
          const { error } = await supabase
            .from('profiles') // Confirme se é esta a tabela que o useSubscription() lê
            .update({ 
              subscription_status: 'active'
              // status: 'active' -> Ajuste o nome da coluna conforme o seu banco de dados
            })
            .eq('id', userId);

          if (error) throw error;
          
          console.log(`Sucesso MP! Utilizador ${userId} ativado.`);
        }
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error: any) {
    console.error("Erro no Webhook MP:", error);
    return new Response("Erro", { status: 500 });
  }
})