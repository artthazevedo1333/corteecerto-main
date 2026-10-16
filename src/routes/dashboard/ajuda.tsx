"use client";

import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { PlayCircle, BookOpen, ChevronDown, ChevronUp, LifeBuoy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/dashboard/ajuda')({
  component: HelpPage,
});

const faqData = [
  { q: "Como adiciono um novo barbeiro à minha equipa?", a: "Vá a 'Equipa' no menu lateral. Clique em 'Adicionar Profissional', insira os dados e defina a comissão padrão dele." },
  { q: "Como o cliente faz o agendamento online?", a: "No menu 'Agendamento Online', copie o seu link exclusivo e coloque no seu Instagram. O cliente clica, escolhe o serviço, o profissional e o horário, e a marcação cai direto na sua Agenda." },
  { q: "Posso criar planos VIP mensais para clientes?", a: "Sim! Na aba 'Planos VIP', crie um pacote (ex: 4 cortes por mês) e o sistema irá controlar automaticamente quantas vezes o cliente já usou o serviço." },
];

function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background/95 w-full pb-20">
      <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-12 mb-12 text-primary-foreground shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">Como podemos ajudar hoje?</h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mb-8">
              Explore os nossos tutoriais em vídeo ou consulte as perguntas frequentes para dominar o Corte Certo.
            </p>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="font-bold text-primary hover:bg-white">
                <LifeBuoy className="w-5 h-5 mr-2" />
                Contactar Suporte Humano
              </Button>
            </a>
          </div>
          <BookOpen className="absolute -right-10 -bottom-10 w-64 h-64 text-white opacity-10 rotate-12" />
        </div>

        {/* Cursos / Vídeos */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Primeiros Passos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Placeholder Vídeo 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-video bg-muted border border-border/50 rounded-2xl mb-3 relative overflow-hidden flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" alt="Tutorial" />
                <div className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center relative z-10 shadow-lg group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-8 h-8" />
                </div>
              </div>
              <h3 className="font-bold text-foreground text-lg">Configurar a sua Agenda</h3>
              <p className="text-sm text-muted-foreground">Aprenda a definir horários de funcionamento e bloqueios.</p>
            </div>

            {/* Placeholder Vídeo 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-video bg-muted border border-border/50 rounded-2xl mb-3 relative overflow-hidden flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" alt="Tutorial" />
                <div className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center relative z-10 shadow-lg group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-8 h-8" />
                </div>
              </div>
              <h3 className="font-bold text-foreground text-lg">Como partilhar o Agendamento Online</h3>
              <p className="text-sm text-muted-foreground">Onde encontrar o seu link e como colocá-lo no Instagram.</p>
            </div>

          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-border/60 rounded-xl bg-card overflow-hidden transition-all">
                <button 
                  className="w-full px-6 py-4 flex items-center justify-between font-semibold text-left text-foreground hover:bg-secondary/50"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.q}
                  {openFaq === index ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-muted-foreground text-sm leading-relaxed border-t border-border/40 bg-secondary/10">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}