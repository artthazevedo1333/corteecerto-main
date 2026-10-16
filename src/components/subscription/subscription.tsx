"use client";

import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Check, Globe, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/dashboard/subscription')({
  component: SubscriptionPage,
});

type Currency = 'BRL' | 'EUR' | 'USD';

function SubscriptionPage() {
  const [currency, setCurrency] = useState<Currency>('BRL');

  // Símbolos das moedas
  const currencySymbols = {
    BRL: 'R$',
    EUR: '€',
    USD: '$'
  };

  // Os seus planos com os preços inflacionados para o mercado global
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
        BRL: '#link-mercadopago-essencial',
        EUR: 'https://buy.stripe.com/test_cNifZhe2BeeNbS27o26wE04',
        USD: 'https://buy.stripe.com/test_14A28r5w58Ut4pAcIm6wE03'
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
        BRL: '#link-mercadopago-profissional',
        EUR: 'https://buy.stripe.com/test_9B64gz0bL4EdcW69wa6wE05', // Cole o link da Stripe aqui!
        USD: 'https://buy.stripe.com/test_eVq14n7Ed0nXcW6fUy6wE06'
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
        BRL: '#link-mercadopago-premium',
        EUR: 'https://buy.stripe.com/test_8x25kD7Ed9Yx5tE37M6wE02',
        USD: '#link-stripe-premium-usd'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background w-full pb-20">
      <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
        
        {/* Cabeçalho e Seletor de Moeda */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Assinatura</h1>
            <p className="text-muted-foreground">Escolha o plano ideal para a sua barbearia.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-secondary/50 p-1.5 rounded-xl border border-border">
            <Globe className="w-4 h-4 text-muted-foreground ml-2" />
            <div className="flex gap-1 ml-1">
              {(['BRL', 'EUR', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                  Recomendado
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">
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

              <a href={plan.links[currency]} target="_blank" rel="noopener noreferrer" className="mt-auto">
                <Button 
                  className={`w-full h-12 text-base font-bold transition-all ${
                    plan.id === 'premium' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Alterar para {plan.name} <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}