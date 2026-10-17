import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno"

// Inicializamos a Stripe com a sua chave secreta
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  try {
    const signature = req.headers.get('Stripe-Signature');
    const body = await req.text();

    // A Stripe exige esta verificação de segurança (para garantir que não é um hacker a simular pagamentos)
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') as string;
    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
    } catch (err: any) {
      console.error(`Erro na assinatura do Webhook: ${err.message}`);
      return new Response(`Erro no Webhook: ${err.message}`, { status: 400 });
    }

    // Quando o pagamento é concluído com sucesso...
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      
      // Aqui está o ID do utilizador que enviámos lá no frontend!
      const userId = session.client_reference_id; 

      if (userId) {
        // Inicializamos o Supabase com poderes de Admin para poder alterar a tabela
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // ATUALIZA O PERFIL DO BARBEIRO PARA "ATIVO" (ajuste o nome da tabela/coluna conforme o seu banco)
        const { error } = await supabase
          .from('profiles') // <-- Se a sua tabela tiver outro nome, mude aqui
          .update({ 
            subscription_status: 'active',
            // plan_id: 'premium' // Você pode até salvar qual plano ele comprou analisando o session.amount_total
          })
          .eq('id', userId);

        if (error) throw error;
        
        console.log(`Sucesso! Utilizador ${userId} foi atualizado e desbloqueado.`);
      }
    }

    return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error("Erro geral no webhook:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});