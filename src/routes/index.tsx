import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Scissors, CalendarCheck, TrendingUp, ShieldCheck, ArrowRight, Star } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: NovaLandingPage,
});

function NovaLandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-amber-500/30">
      {/* Navegação VIP */}
      <nav className="w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tighter text-white">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-xl">
              <Scissors className="h-6 w-6 text-zinc-950" />
            </div>
            <span>Corte<span className="text-amber-500">Certo</span></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/login" className="text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors uppercase tracking-wider">
              Acesso Restrito
            </a>
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold border-none shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)] transition-all px-8">
              <a href="/register">Seja Premium</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section Exclusivo */}
      <section className="relative pt-32 pb-40 overflow-hidden flex flex-col items-center">
        {/* Efeito de luz de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-400 text-xs uppercase font-bold tracking-[0.2em] shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
            <Star className="w-4 h-4 fill-amber-400" />
            O Padrão Ouro em Gestão
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[1.05]">
            A sua barbearia no <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700">
              topo da cadeia.
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
            Esqueça os sistemas de amadores. O Corte Certo é a máquina definitiva para barbeiros que não cortam apenas cabelo, mas constroem impérios. Controle total, agenda lotada e caixa a faturar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button asChild size="lg" className="h-16 px-10 text-lg rounded-full w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black shadow-[0_0_30px_-5px_rgba(245,158,11,0.5)] transition-all border-none">
              <a href="/register">
                Desbloquear Acesso <ArrowRight className="ml-3 w-6 h-6" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-16 px-10 text-lg rounded-full w-full sm:w-auto border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all bg-transparent">
              <a href="/dashboard/subscription">Conhecer os Planos</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features VIP */}
      <section className="py-32 bg-zinc-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">As engrenagens do seu sucesso</h2>
            <p className="text-zinc-400 text-xl font-light">Ferramentas de alto calibre para profissionais exigentes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 p-10 rounded-[2rem] border border-white/5 hover:border-amber-500/50 transition-all duration-500 group hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <CalendarCheck className="w-32 h-32 text-amber-500" />
              </div>
              <div className="w-16 h-16 bg-zinc-950 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative z-10 group-hover:border-amber-500/50 transition-colors">
                <CalendarCheck className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Agenda Magnética</h3>
              <p className="text-zinc-400 leading-relaxed font-light relative z-10">Os seus clientes marcam no horário deles. Você acorda com o dia lotado. Zero atrito, máximo faturamento.</p>
            </div>

            <div className="bg-zinc-900/50 p-10 rounded-[2rem] border border-white/5 hover:border-amber-500/50 transition-all duration-500 group hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp className="w-32 h-32 text-amber-500" />
              </div>
              <div className="w-16 h-16 bg-zinc-950 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative z-10 group-hover:border-amber-500/50 transition-colors">
                <TrendingUp className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Caixa Blindado</h3>
              <p className="text-zinc-400 leading-relaxed font-light relative z-10">Não conte moedas, controle o império. Comissões calculadas num piscar de olhos e relatórios dignos de um CEO.</p>
            </div>

            <div className="bg-zinc-900/50 p-10 rounded-[2rem] border border-white/5 hover:border-amber-500/50 transition-all duration-500 group hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck className="w-32 h-32 text-amber-500" />
              </div>
              <div className="w-16 h-16 bg-zinc-950 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative z-10 group-hover:border-amber-500/50 transition-colors">
                <ShieldCheck className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Fidelidade Implacável</h3>
              <p className="text-zinc-400 leading-relaxed font-light relative z-10">Quem senta na sua cadeira não vai a mais lado nenhum. Lembretes automáticos e CRM para transformar clientes casuais em fãs fieis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final VIP */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/20 rounded-[3rem] p-16 text-center shadow-[0_0_100px_-20px_rgba(245,158,11,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-white">Assuma a cadeira do chefe.</h2>
            <p className="text-zinc-400 text-xl mb-12 max-w-2xl mx-auto font-light">
              A elite da barbearia já fez a transição. Em menos de 2 minutos você configura o seu sistema e revoluciona o seu negócio.
            </p>
            <Button asChild size="lg" className="h-16 px-12 text-lg rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] transition-all border-none">
              <a href="/register">
                Criar Conta Premium
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}