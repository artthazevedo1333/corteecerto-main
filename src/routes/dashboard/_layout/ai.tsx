import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, Scissors, Sparkles, TrendingUp, Users } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/_layout/ai")({
  component: AIPage,
});

function AIPage() {
  return (
    <ErrorBoundary>
      <AIContent />
    </ErrorBoundary>
  );
}

function AIContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const since = new Date();
        since.setDate(since.getDate() - 30);
        const [c, p, a, r] = await Promise.all([
          supabase.from("clients").select("id, name, last_visit, total_spent"),
          supabase.from("products").select("id, name, current_stock, min_stock"),
          supabase
            .from("appointments")
            .select("id, status, start_time, service:services(name, price)")
            .gte("start_time", since.toISOString()),
          supabase
            .from("financial_records")
            .select("amount, type, date")
            .gte("date", since.toISOString().slice(0, 10)),
        ]);
        if (c.error) throw c.error;
        if (p.error) throw p.error;
        if (a.error) throw a.error;
        if (r.error) throw r.error;
        setClients(c.data || []);
        setProducts(p.data || []);
        setAppointments(a.data || []);
        setRecords(r.data || []);
      } catch (error: any) {
        toast.error("Erro ao gerar insights");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const insights = useMemo(() => {
    const income = records
      .filter((r) => r.type === "income")
      .reduce((sum, r) => sum + Number(r.amount || 0), 0);
    const expense = records
      .filter((r) => r.type === "expense")
      .reduce((sum, r) => sum + Number(r.amount || 0), 0);
    const completed = appointments.filter((a) => a.status === "completed");
    const lowStock = products.filter(
      (p) => Number(p.current_stock || 0) <= Number(p.min_stock || 0),
    );
    const inactive = clients.filter((client) => {
      if (!client.last_visit) return true;
      return Date.now() - new Date(client.last_visit).getTime() > 30 * 24 * 60 * 60 * 1000;
    });
    const serviceMap = new Map<string, number>();
    completed.forEach((item) => {
      const name = item.service?.name || "Serviços avulsos";
      serviceMap.set(name, (serviceMap.get(name) || 0) + 1);
    });
    const topService = Array.from(serviceMap.entries()).sort((a, b) => b[1] - a[1])[0];

    return [
      {
        icon: <TrendingUp className="h-5 w-5" />,
        title: income >= expense ? "Caixa positivo" : "Margem pressionada",
        text:
          income >= expense
            ? `Nos últimos 30 dias o saldo está positivo em R$ ${(income - expense).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}.`
            : `As despesas superam receitas em R$ ${(expense - income).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}. Revise custos fixos.`,
        action: "/dashboard/finance",
      },
      {
        icon: <Scissors className="h-5 w-5" />,
        title: topService ? "Serviço líder" : "Catálogo sem histórico",
        text: topService
          ? `${topService[0]} lidera os atendimentos recentes com ${topService[1]} vendas.`
          : "Registre atendimentos concluídos para identificar serviços campeões.",
        action: "/dashboard/services",
      },
      {
        icon: <Package className="h-5 w-5" />,
        title: lowStock.length ? "Reposição necessária" : "Estoque saudável",
        text: lowStock.length
          ? `${lowStock.length} produto(s) estão no nível mínimo de estoque.`
          : "Nenhum produto está abaixo do estoque mínimo.",
        action: "/dashboard/inventory",
      },
      {
        icon: <Users className="h-5 w-5" />,
        title: inactive.length ? "Clientes para reativar" : "Relacionamento ativo",
        text: inactive.length
          ? `${inactive.length} cliente(s) podem receber uma campanha de retorno.`
          : "Sua base não tem clientes críticos no momento.",
        action: "/dashboard/recovery",
      },
    ];
  }, [records, appointments, products, clients]);

  return (
    <div className="space-y-8 pb-10">
      <header>
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <Badge variant="outline" className="rounded-full font-black uppercase">
            Insights automáticos
          </Badge>
        </div>
        <h1 className="text-3xl font-black tracking-tight uppercase italic">Business AI</h1>
        <p className="text-muted-foreground font-medium text-lg">
          Leitura prática dos dados atuais da barbearia.
        </p>
      </header>

      {loading ? (
        <div className="py-20 text-center font-bold uppercase tracking-widest text-muted-foreground">
          Analisando dados...
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {insights.map((insight) => (
            <Card key={insight.title} className="rounded-[2rem] overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-black uppercase italic tracking-tight">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {insight.icon}
                  </span>
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="font-medium text-muted-foreground leading-relaxed">{insight.text}</p>
                <Button
                  variant="outline"
                  onClick={() => navigate({ to: insight.action as any })}
                  className="h-11 rounded-xl font-black uppercase"
                >
                  Ver módulo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="rounded-[2rem] border-primary/20 bg-primary/5">
        <CardContent className="p-6 flex items-start gap-4">
          <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <p className="font-medium text-muted-foreground">
            Os insights são calculados com os registros já salvos no sistema. Quanto mais
            atendimentos, clientes e lançamentos você registrar, mais precisas ficam as
            recomendações.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
