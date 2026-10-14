import { useMemo, useState } from "react";
import {
  HelpCircle,
  Search,
  Shield,
  Users,
  KeyRound,
  Sparkles,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Ban,
  XCircle,
  CalendarClock,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { PlansGuide } from "@/components/admin/PlansGuide";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Section = {
  id: string;
  title: string;
  icon: React.ReactNode;
  intro?: string;
  items: Array<{ term: string; description: string }>;
};

const SECTIONS: Section[] = [
  {
    id: "overview",
    title: "Visão geral",
    icon: <BookOpen className="h-4 w-4" />,
    intro:
      "O Painel Master é a área administrativa exclusiva do proprietário do Corte Certo. Aqui você gerencia clientes, planos, licenças e acompanha a saúde do SaaS em tempo real.",
    items: [
      { term: "O que é", description: "Central administrativa do SaaS Corte Certo." },
      {
        term: "Para que serve",
        description: "Gerir assinantes, planos, licenças, testes e métricas.",
      },
      {
        term: "Quem acessa",
        description: "Somente contas com papel Proprietário (ou Administrador quando delegado).",
      },
      {
        term: "Por que existe",
        description: "Ter controle total sobre o SaaS sem depender de painéis externos.",
      },
    ],
  },
  {
    id: "roles",
    title: "Papéis",
    icon: <Shield className="h-4 w-4" />,
    items: [
      {
        term: "Proprietário",
        description:
          "Dono do SaaS. Acesso total: clientes, planos, licenças, assinaturas, métricas e auditoria. Apenas uma conta deve ter esse papel.",
      },
      {
        term: "Administrador",
        description:
          "Conta administrativa opcional com permissões limitadas para gestão do dia a dia.",
      },
      {
        term: "Cliente",
        description: "Assinante do Corte Certo. Nunca acessa o Painel Master.",
      },
    ],
  },
  {
    id: "plans",
    title: "Planos",
    icon: <Sparkles className="h-4 w-4" />,
    items: [
      {
        term: "O que é um plano",
        description: "Conjunto de recursos e preço oferecidos aos assinantes.",
      },
      {
        term: "Criar / editar / excluir",
        description:
          "Gestão feita pelo próprio painel; nomes e preços são totalmente personalizáveis.",
      },
      { term: "Assinatura", description: "Vínculo do cliente ao plano com cobrança recorrente." },
      {
        term: "Renovação",
        description: "Cobrança automática ao final do ciclo mantendo a licença ativa.",
      },
    ],
  },
  {
    id: "licenses",
    title: "Licenças",
    icon: <KeyRound className="h-4 w-4" />,
    items: [
      {
        term: "O que é",
        description: "Autorização que libera o acesso do cliente ao Corte Certo.",
      },
      {
        term: "Quando é criada",
        description: "Ao assinar um plano ou receber licença promocional.",
      },
      {
        term: "Quando expira",
        description: "No fim do período pago ou promocional, se não houver renovação.",
      },
      { term: "Renovação", description: "Ocorre automaticamente com pagamento aprovado." },
      {
        term: "Bloqueio",
        description: "Aplicado em inadimplência prolongada ou suspensão manual.",
      },
    ],
  },
  {
    id: "trial",
    title: "Período de teste",
    icon: <CalendarClock className="h-4 w-4" />,
    items: [
      { term: "O que é", description: "Período gratuito para o cliente experimentar o sistema." },
      { term: "Conceder", description: "Ativado no cadastro ou manualmente pelo painel." },
      { term: "Cancelar", description: "Encerrado a qualquer momento pelo Proprietário." },
      {
        term: "Fim do teste",
        description: "Cliente precisa assinar um plano para continuar utilizando.",
      },
    ],
  },
  {
    id: "customers",
    title: "Clientes",
    icon: <Users className="h-4 w-4" />,
    items: [
      { term: "Ativo", description: "Assinatura em dia e sistema liberado." },
      { term: "Bloqueado", description: "Acesso suspenso temporariamente pelo Proprietário." },
      { term: "Cancelado", description: "Encerrou a assinatura e não usa mais o sistema." },
      { term: "Inadimplente", description: "Cobrança em aberto após vencimento." },
    ],
  },
  {
    id: "metrics",
    title: "Métricas",
    icon: <TrendingUp className="h-4 w-4" />,
    items: [
      { term: "Total de clientes", description: "Número de clientes cadastrados na base." },
      { term: "Assinaturas ativas", description: "Clientes com pagamento em dia." },
      { term: "Testes ativos", description: "Clientes utilizando o período gratuito." },
      {
        term: "Receita Mensal (MRR)",
        description: "Receita recorrente mensal. Ex.: 50 clientes × R$ 99 = R$ 4.950 de MRR.",
      },
      {
        term: "Receita Anual Estimada (ARR)",
        description:
          "Projeção anual da receita recorrente. Ex.: MRR R$ 4.950 × 12 = R$ 59.400 de ARR.",
      },
      { term: "Inadimplentes", description: "Assinantes com cobrança em aberto." },
      { term: "Suspensos", description: "Clientes temporariamente bloqueados." },
      { term: "Cancelados", description: "Clientes que encerraram a assinatura." },
      { term: "Renovação", description: "Data da próxima cobrança da assinatura." },
    ],
  },
  {
    id: "security",
    title: "Segurança",
    icon: <Shield className="h-4 w-4" />,
    items: [
      {
        term: "Acesso restrito",
        description: "Apenas contas com papel Proprietário conseguem abrir o Painel Master.",
      },
      {
        term: "Proteção",
        description:
          "Verificação de papel via has_role no servidor, RLS ativo em todas as tabelas.",
      },
      { term: "Usuários comuns", description: "Nunca visualizam rotas nem APIs administrativas." },
    ],
  },
  {
    id: "flow",
    title: "Fluxo de assinatura",
    icon: <ListChecks className="h-4 w-4" />,
    items: [
      { term: "1. Cadastro", description: "Cliente cria a conta no Corte Certo." },
      {
        term: "2. Período de teste",
        description: "Recebe período gratuito para testar o sistema.",
      },
      { term: "3. Assinatura", description: "Escolhe um plano e realiza o pagamento." },
      { term: "4. Pagamento aprovado", description: "Licença é renovada automaticamente." },
      { term: "5. Uso contínuo", description: "Cliente segue utilizando o sistema normalmente." },
    ],
  },
  {
    id: "faq",
    title: "Perguntas frequentes",
    icon: <HelpCircle className="h-4 w-4" />,
    items: [
      {
        term: "Posso mudar o preço de um plano?",
        description:
          "Sim. A alteração vale para novas assinaturas; existentes seguem a regra vigente até renovação.",
      },
      {
        term: "Posso dar Teste novamente?",
        description:
          "Sim. O Proprietário pode reiniciar o período de teste de um cliente pela ação Reiniciar teste.",
      },
      {
        term: "O que acontece se um cliente não pagar?",
        description: "Entra como Inadimplente e, após o período de tolerância, pode ser suspenso.",
      },
      {
        term: "Posso bloquear um cliente?",
        description: "Sim, usando a ação Suspender assinatura.",
      },
      {
        term: "Como cancelar uma assinatura?",
        description: "Selecione o cliente, escolha Cancelar assinatura e confirme.",
      },
      {
        term: "Como funciona a renovação?",
        description: "Automática ao final do ciclo, mediante pagamento aprovado.",
      },
    ],
  },
  {
    id: "tips",
    title: "Boas práticas",
    icon: <Lightbulb className="h-4 w-4" />,
    items: [
      {
        term: "Preservar histórico",
        description: "Nunca exclua clientes sem necessidade — prefira bloquear.",
      },
      { term: "Planos simples", description: "Poucas opções bem definidas convertem mais." },
      {
        term: "Revisão semanal",
        description: "Acompanhe MRR, inadimplência e cancelamentos toda semana.",
      },
      { term: "Backup", description: "Antes de grandes alterações, garanta backup dos dados." },
      {
        term: "Conta de teste",
        description: "Valide novos planos com uma conta de teste antes de liberar.",
      },
    ],
  },
];

export function HelpCenter() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return SECTIONS;
    return SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.term.toLowerCase().includes(term) || item.description.toLowerCase().includes(term),
      ),
    })).filter((section) => section.items.length > 0);
  }, [query]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-xl gap-2 shrink-0"
          aria-label="Abrir Central de Ajuda"
        >
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Ajuda</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-xl p-0 flex flex-col">
        <SheetHeader className="border-b border-border px-6 py-5 space-y-2">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="h-5 w-5 text-primary" />
            Central de Ajuda
          </SheetTitle>
          <SheetDescription>Manual interno do Painel Master do Corte Certo.</SheetDescription>
          <div className="relative pt-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar no manual…"
              className="h-10 rounded-xl pl-9"
            />
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-5 space-y-6">
            {!query.trim() && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold tracking-tight">Guia de Planos</h3>
                </div>
                <PlansGuide />
              </section>
            )}
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-10">
                Nenhum resultado encontrado.
              </p>
            ) : (
              filtered.map((section) => (
                <section key={section.id} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                      {section.icon}
                    </div>
                    <h3 className="text-base font-bold tracking-tight">{section.title}</h3>
                  </div>
                  {section.intro && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.intro}</p>
                  )}
                  <Accordion
                    type="multiple"
                    className="border border-border rounded-xl divide-y divide-border overflow-hidden"
                  >
                    {section.items.map((item, idx) => (
                      <AccordionItem
                        key={`${section.id}-${idx}`}
                        value={`${section.id}-${idx}`}
                        className="border-0 px-4"
                      >
                        <AccordionTrigger className="text-sm font-semibold py-3 hover:no-underline">
                          {item.term}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-3">
                          {item.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

const HINTS: Record<string, string> = {
  "Total de clientes": "Número de clientes cadastrados na base.",
  "Assinaturas ativas": "Clientes com pagamento em dia.",
  "Testes ativos": "Clientes utilizando o período gratuito.",
  Inadimplentes: "Assinantes com cobrança em aberto após o vencimento.",
  Suspensos: "Clientes temporariamente bloqueados.",
  Cancelados: "Clientes que encerraram a assinatura.",
  MRR: "Receita Mensal Recorrente das assinaturas ativas.",
  "ARR estimado": "Receita Anual estimada = MRR × 12.",
  "Novos no mês": "Novos clientes cadastrados no mês atual.",
  Cancelamentos: "Assinaturas encerradas no mês corrente.",
};

export function MetricHint({ label }: { label: string }) {
  const text = HINTS[label];
  if (!text) return null;
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={`Sobre ${label}`}
            className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Unused imports guard — keeps tree-shaking happy for icons referenced only in data
export const _iconsUsed = {
  Users,
  KeyRound,
  Sparkles,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Ban,
  XCircle,
  CalendarClock,
  CheckCircle2,
};
