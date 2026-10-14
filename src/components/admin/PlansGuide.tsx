import { useMemo } from "react";
import { PLANS, type PlanDefinition } from "@/lib/payments/plans";
import { PLAN_FEATURES, type SubscriptionPlan } from "@/lib/subscription";
import {
  Sparkles,
  Target,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";

function formatPrice(cents: number, currency: string, interval: PlanDefinition["interval"]) {
  const value = (cents / 100).toLocaleString("pt-BR", { style: "currency", currency });
  if (interval === "lifetime") return `${value} (único)`;
  if (interval === "yearly") return `${value} / ano`;
  return `${value} / mês`;
}

const AUDIENCE: Record<SubscriptionPlan, string> = {
  starter: "Barbeiro iniciante ou autônomo dando os primeiros passos na organização digital.",
  professional: "Profissional autônomo ou barbearia em crescimento que quer atrair mais clientes.",
  premium: "Barbearia consolidada com fluxo alto de clientes e necessidade de gestão avançada.",
  lifetime: "Dono que quer resolver a mensalidade de uma vez e ter todos os módulos para sempre.",
};

const BENEFITS: Record<SubscriptionPlan, string[]> = {
  starter: [
    "Organiza a agenda diária sem depender de caderno ou WhatsApp bagunçado.",
    "Cadastra até 100 clientes com histórico de atendimentos.",
    "Ideal para validar o sistema antes de escalar.",
  ],
  professional: [
    "Recebe agendamentos online 24h por dia, mesmo com a barbearia fechada.",
    "Acompanha relatórios financeiros e sabe exatamente quanto ganhou no mês.",
    "Calcula comissões automaticamente para funcionários.",
    "Vende planos VIP com mensalidade recorrente para clientes fiéis.",
  ],
  premium: [
    "CRM avançado para segmentar clientes e criar campanhas.",
    "Recuperação automática de clientes sumidos, aumentando o retorno.",
    "Business AI dá sugestões inteligentes de crescimento com base nos dados.",
    "Suporte prioritário quando precisar de ajuda.",
  ],
  lifetime: [
    "Todos os recursos do Premium, sem cobrança mensal.",
    "Onboarding personalizado para tirar o máximo do sistema desde o início.",
    "Atualizações vitalícias — nunca mais paga mensalidade.",
  ],
};

const WHEN_RECOMMEND: Record<SubscriptionPlan, string> = {
  starter: "Recomendado para quem atende até 100 clientes e quer só o essencial da agenda.",
  professional:
    "Recomendado para quem quer atrair clientes com agendamento online e ver o financeiro do negócio.",
  premium: "Recomendado para quem já tem base grande, funcionários e quer usar IA para crescer.",
  lifetime:
    "Recomendado para quem já sabe que o sistema entrega valor e quer eliminar a mensalidade para sempre.",
};

const UPGRADE_TIP: Record<SubscriptionPlan, string | null> = {
  starter:
    "Se começou a perder cliente por falta de agendamento online ou não sabe seu faturamento, é hora de subir para Profissional.",
  professional:
    "Se já tem muitos clientes, quer recuperar quem sumiu e receber insights de IA, o Premium se paga rápido.",
  premium:
    "Se pretende usar o sistema por vários anos, o Lifetime economiza dezenas de mensalidades.",
  lifetime: null,
};

const FEATURE_LABELS: Array<{
  key: keyof (typeof PLAN_FEATURES)["starter"];
  label: string;
  boolean?: boolean;
}> = [
  { key: "maxClients", label: "Limite de clientes" },
  { key: "maxAppointmentsPerMonth", label: "Agendamentos / mês" },
  { key: "onlineBooking", label: "Agendamento online", boolean: true },
  { key: "reports", label: "Relatórios financeiros", boolean: true },
  { key: "commissions", label: "Comissões automáticas", boolean: true },
  { key: "vipPlans", label: "Planos VIP", boolean: true },
  { key: "crm", label: "CRM avançado", boolean: true },
  { key: "ai", label: "Business AI", boolean: true },
];

function renderFeatureValue(value: unknown, isBoolean?: boolean) {
  if (isBoolean) return value ? "✓" : "—";
  if (value === null) return "Ilimitado";
  return String(value);
}

export function PlansGuide() {
  const plans = useMemo(() => PLANS, []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-4 w-4" />
          <h4 className="text-sm font-bold">Como usar este guia</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Use como referência rápida para lembrar a diferença entre os planos, decidir qual oferecer
          a cada perfil de cliente e identificar quando faz sentido sugerir um upgrade. Os dados
          abaixo são gerados a partir da configuração real dos planos — sempre que um plano, preço
          ou recurso for alterado no código de planos, esta documentação reflete a mudança.
        </p>
      </div>

      {plans.map((plan, idx) => {
        const prev = idx > 0 ? plans[idx - 1] : null;
        const features = PLAN_FEATURES[plan.id];
        const prevFeatures = prev ? PLAN_FEATURES[prev.id] : null;
        const newVsPrev = prev ? plan.features.filter((f) => !prev.features.includes(f)) : [];
        return (
          <article
            key={plan.id}
            className={`rounded-2xl border p-5 space-y-4 ${
              plan.highlight ? "border-primary/40 bg-primary/5" : "border-border bg-card"
            }`}
          >
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-bold flex items-center gap-2">
                  {plan.name}
                  {plan.highlight && (
                    <span className="text-[10px] uppercase tracking-wide bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                      Mais vendido
                    </span>
                  )}
                </h4>
                <p className="text-xs text-muted-foreground">{plan.tagline}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">
                  {formatPrice(plan.priceCents, plan.currency, plan.interval)}
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <section className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                  <Users className="h-3.5 w-3.5" /> Público-alvo
                </div>
                <p className="text-sm leading-relaxed">{AUDIENCE[plan.id]}</p>
              </section>

              <section className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                  <Target className="h-3.5 w-3.5" /> Quando recomendar
                </div>
                <p className="text-sm leading-relaxed">{WHEN_RECOMMEND[plan.id]}</p>
              </section>
            </div>

            <section className="space-y-2">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Recursos disponíveis
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {prev && newVsPrev.length > 0 && (
              <section className="space-y-2 rounded-xl bg-muted/40 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                  <ArrowUpRight className="h-3.5 w-3.5" /> O que muda em relação ao {prev.name}
                </div>
                <p className="text-xs text-muted-foreground">
                  Inclui tudo do {prev.name} e adiciona:
                </p>
                <ul className="space-y-1 text-sm">
                  {newVsPrev.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-primary">+</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" /> Benefícios reais
              </div>
              <ul className="space-y-1.5 text-sm">
                {BENEFITS[plan.id].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            {UPGRADE_TIP[plan.id] && (
              <section className="rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <Lightbulb className="h-3.5 w-3.5" /> Quando sugerir upgrade?
                </div>
                <p className="text-sm leading-relaxed">{UPGRADE_TIP[plan.id]}</p>
              </section>
            )}

            {/* silence unused warning for prevFeatures without changing behavior */}
            <span className="hidden" aria-hidden>
              {prevFeatures ? "" : ""}
            </span>
            <span className="hidden" aria-hidden>
              {features ? "" : ""}
            </span>
          </article>
        );
      })}

      <section className="space-y-3">
        <h4 className="text-base font-bold">Tabela comparativa</h4>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-3 py-2 font-semibold">Recurso</th>
                {plans.map((p) => (
                  <th key={p.id} className="text-center px-3 py-2 font-semibold whitespace-nowrap">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-3 py-2 font-medium">Preço</td>
                {plans.map((p) => (
                  <td key={p.id} className="text-center px-3 py-2 text-xs">
                    {formatPrice(p.priceCents, p.currency, p.interval)}
                  </td>
                ))}
              </tr>
              {FEATURE_LABELS.map((row) => (
                <tr key={row.key} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{row.label}</td>
                  {plans.map((p) => (
                    <td key={p.id} className="text-center px-3 py-2">
                      {renderFeatureValue(PLAN_FEATURES[p.id][row.key], row.boolean)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 space-y-3">
        <h4 className="text-base font-bold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Estratégia de venda
        </h4>
        <div className="space-y-2 text-sm leading-relaxed">
          <p>
            <strong>Starter</strong> é a porta de entrada: preço acessível para o barbeiro provar
            que a agenda digital funciona. Use-o para converter quem ainda usa caderno.
          </p>
          <p>
            <strong>Professional</strong> é o "coração" da venda. Destaque o agendamento online
            (menos falta), relatórios (dono sabe quanto ganha) e comissões (economiza horas por
            mês). É o plano com melhor relação valor × preço.
          </p>
          <p>
            <strong>Premium</strong> se vende com CRM + Recuperação de clientes + Business AI. Foco:
            cada cliente recuperado paga o plano várias vezes. Ideal para barbearias que já sentem
            que estão "perdendo cliente" e não sabem por quê.
          </p>
          <p>
            <strong>Lifetime</strong> é para o cliente que já ama o sistema. Argumento simples: "em
            menos de 2 anos você paga o Premium mensal — daqui pra frente é lucro".
          </p>
        </div>
      </section>
    </div>
  );
}
