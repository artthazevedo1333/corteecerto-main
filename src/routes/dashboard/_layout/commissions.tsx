import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { format, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Percent, Scissors, Wallet } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/_layout/commissions")({
  component: CommissionsPage,
});

function CommissionsPage() {
  return (
    <ErrorBoundary>
      <CommissionsContent />
    </ErrorBoundary>
  );
}

function CommissionsContent() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(40);

  useEffect(() => {
    const savedRate = Number(window.localStorage.getItem("commission-rate") || 40);
    setRate(Number.isFinite(savedRate) ? savedRate : 40);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const from = startOfMonth(new Date()).toISOString();
        const { data, error } = await supabase
          .from("appointments")
          .select("id, status, start_time, service:services(name, price)")
          .eq("status", "completed")
          .gte("start_time", from)
          .order("start_time", { ascending: false });
        if (error) throw error;
        setAppointments(data || []);
      } catch (error: any) {
        toast.error("Erro ao carregar comissões");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const totals = useMemo(() => {
    const revenue = appointments.reduce((sum, item) => sum + Number(item.service?.price || 0), 0);
    return {
      revenue,
      commission: revenue * (rate / 100),
      shop: revenue * (1 - rate / 100),
    };
  }, [appointments, rate]);

  const updateRate = (value: string) => {
    const next = Math.max(0, Math.min(100, Number(value) || 0));
    setRate(next);
    window.localStorage.setItem("commission-rate", String(next));
  };

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic">Comissões</h1>
          <p className="text-muted-foreground font-medium text-lg">
            Fechamento mensal baseado em atendimentos concluídos.
          </p>
        </div>
        <div className="w-full sm:w-48 space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Comissão (%)
          </Label>
          <Input
            type="number"
            min="0"
            max="100"
            value={rate}
            onChange={(event) => updateRate(event.target.value)}
            className="h-12 rounded-xl text-lg font-black"
          />
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Metric
          icon={<Scissors className="h-5 w-5" />}
          label="Atendimentos"
          value={String(appointments.length)}
        />
        <Metric
          icon={<Wallet className="h-5 w-5" />}
          label="Total vendido"
          value={`R$ ${totals.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
        />
        <Metric
          icon={<Percent className="h-5 w-5" />}
          label="Comissão"
          value={`R$ ${totals.commission.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
        />
      </div>

      <Card className="rounded-[2rem] overflow-hidden">
        <CardHeader className="border-b border-border bg-secondary/30">
          <CardTitle className="font-black uppercase italic tracking-tight">
            Atendimentos do mês
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-20 text-center font-bold uppercase tracking-widest text-muted-foreground">
              Carregando comissões...
            </div>
          ) : appointments.length ? (
            <div className="divide-y divide-border">
              {appointments.map((item) => {
                const price = Number(item.service?.price || 0);
                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-lg font-black uppercase italic tracking-tight">
                        {item.service?.name || "Serviço"}
                      </p>
                      <p className="text-sm font-bold text-muted-foreground">
                        {format(new Date(item.start_time), "dd 'de' MMMM", { locale: ptBR })}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <Badge
                        variant="outline"
                        className="rounded-full px-3 py-1 font-black uppercase"
                      >
                        Venda R$ {price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </Badge>
                      <Badge className="rounded-full px-3 py-1 font-black uppercase">
                        Comissão R${" "}
                        {((price * rate) / 100).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center px-6">
              <h3 className="text-xl font-black uppercase italic">
                Sem atendimentos concluídos este mês
              </h3>
              <p className="mt-2 font-medium text-muted-foreground">
                Finalize comandas para gerar o relatório de comissões.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={() => window.print()}
          className="h-12 rounded-xl px-6 font-black uppercase"
        >
          Imprimir fechamento
        </Button>
      </div>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 truncate text-2xl font-black italic tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}
