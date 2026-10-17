"use client";

import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useLocale } from '@/hooks/use-locale';

export const Route = createFileRoute('/dashboard/subscription')({
  component: SubscriptionPage,
});

type Currency = 'BRL' | 'EUR' | 'USD';

function SubscriptionPage() {
  // 1. Conectamos o cérebro internacional!
  const { prefs, update } = useLocale();
  const currency = (prefs.currency || 'BRL') as Currency;

  const [userId, setUserId] = useState<string | null>(null);

  // 2. Vai buscar o ID do utilizador logado
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    };
    fetchUser();
  }, []);

  const currencySymbols = {
    BRL: 'R$',
    EUR: '€',
    USD: '$'
  };

  const plans = [
    {
      id: 'essencial',
      name: 'Essencial',
      description: 'O básico para organizar sua barbearia',
      prices: { BRL: '49,00', EUR: '29,00', USD: '29,00' },
      features: [
        'Agenda inteligente',
        'Cadastro de clientes',
        'Cadastro de serviços',
        'Controle básico de estoque',
        'Suporte por e-mail'
      ],
      links: {
        BRL: 'https://mpago.la/24XQh35',
        EUR: 'https://buy.stripe.com/14A00jgjF7fK1iY3tAbbG03',
        USD: 'https://buy.stripe.com/3cI3cv1oL0RmbXC1lsbbG00'
      }
    },
    {
      id: 'profissional',
      name: 'Profissional',
      description: 'Para barbearias que querem crescer',
      prices: { BRL: '99,00', EUR: '59,00', USD: '59,00' },
      features: [
        'Tudo do Essencial',
        'Financeiro completo',
        'Comissões automáticas',
        'Agendamento online',
        'Planos VIP',
        'Relatórios de desempenho',
        'Múltiplos profissionais'
      ],
      links: {
        BRL: 'https://mpago.la/1GkL6of',
        EUR: 'https://buy.stripe.com/8x2eVdd7t2ZuaTy4xEbbG04',
        USD: 'https://buy.stripe.com/cNifZhd7tgQkaTyggmbbG01'
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Barbearia com nível de rede',
      prices: { BRL: '199,00', EUR: '99,00', USD: '99,00' },
      features: [
        'Tudo do Profissional',
        'CRM avançado de clientes',
        'Recuperação automática de inativos',
        'Business AI (insights inteligentes)',
        'Preparado para multiunidades',
        'Suporte prioritário'
      ],
      links: {
        BRL: 'https://mpago.la/24KhsWK',
        EUR: 'https://buy.stripe.com/28E00j7N9eIc5ze0hobbG05',
        USD: 'https://buy.stripe.com/9B6dR9aZl7fK9PufcibbG02'
      }
    }
  ];

  // 3. Função mágica que constrói o link final com o ID do utilizador
  const getPaymentLink = (baseLink: string, currency: Currency) => {
    if (!userId || !baseLink || baseLink.startsWith('#')) return baseLink;

    try {
      const url = new URL(baseLink);
      if (currency === 'BRL') {
        // Para o Mercado Pago
        url.searchParams.set('external_reference', userId);
      } else {
        // Para a Stripe
        url.searchParams.set('client_reference_id', userId);
      }
      return url.toString();
    } catch (e) {
       console.error("Erro ao construir link", e)
       return baseLink;
    }
  };

  return (
    <div className="min-h-screen bg-background w-full pb-20">
      <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
        
        {/* Cabeçalho e Seletor de Moeda */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Minha Assinatura</h1>
            <p className="text-muted-foreground">Escolha o plano ideal para a sua barbearia.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-secondary/50 p-1.5 rounded-xl border border-border">
            <Globe className="w-4 h-4 text-muted-foreground ml-2" />
            <div className="flex gap-1 ml-1">
              {(['BRL', 'EUR', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  // Atualiza a preferência global do utilizador!
                  onClick={() => update({ currency: c })}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    currency === c 
                      ? 'bg-background shadow-sm text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Planos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-card border rounded-3xl p-8 flex flex-col transition-all duration-300 hover:shadow-lg ${
                plan.id === 'premium' ? 'border-primary shadow-md relative' : 'border-border/60'
              }`}
            >
              {plan.id === 'premium' && (
                <div className="absolute -top-3 right-8 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  Mais popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  {currencySymbols[currency]} {plan.prices[currency]}
                </span>
                <span className="text-muted-foreground font-medium">/mês</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a href={getPaymentLink(plan.links[currency], currency)} className="mt-auto block">
                <Button 
                  className={`w-full h-12 text-base font-bold transition-all ${
                    plan.id === 'premium' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Alterar para {plan.name}
                </Button>
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}