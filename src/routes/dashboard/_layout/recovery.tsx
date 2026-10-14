import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { differenceInDays, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, UserPlus, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/_layout/recovery")({
  component: RecoveryPage,
});

function RecoveryPage() {
  return (
    <ErrorBoundary>
      <RecoveryContent />
    </ErrorBoundary>
  );
}

function RecoveryContent() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from("clients")
          .select("id, name, phone, last_visit, total_spent")
          .order("last_visit", { ascending: true, nullsFirst: true });
        if (error) throw error;
        setClients(data || []);
      } catch (error: any) {
        toast.error("Erro ao carregar recuperação");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const atRiskClients = useMemo(() => {
    return clients
      .map((client) => {
        const days = client.last_visit
          ? differenceInDays(new Date(), parseISO(client.last_visit))
          : 999;
        return { ...client, days_since_last_visit: days };
      })
      .filter((client) => client.days_since_last_visit > 30)
      .sort((a, b) => b.days_since_last_visit - a.days_since_last_visit);
  }, [clients]);

  const recoveredPotential = atRiskClients.reduce(
    (sum, client) => sum + Math.max(Number(client.total_spent || 0) / 3, 60),
    0,
  );

  const sendRecovery = (client: any) => {
    const phone = String(client.phone || "").replace(/\D/g, "");
    if (!phone) {
      toast.error("Cliente sem WhatsApp cadastrado");
      return;
    }
    const message = encodeURIComponent(
      `Olá, ${client.name}! Sentimos sua falta no Corte Certo. Quer reservar um horário esta semana?`,
    );
    window.open(`https://wa.me/55${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic">
            Recuperação de Clientes
          </h1>
          <p className="text-muted-foreground font-medium text-lg">
            Priorize contatos que estão há mais tempo sem voltar.
          </p>
        </div>
        <Button asChild className="h-12 px-6 rounded-xl font-black uppercase">
          <Link to="/dashboard/clients">Base de clientes</Link>
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat
          icon={<Users className="h-5 w-5" />}
          label="Clientes analisados"
          value={String(clients.length)}
        />
        <Stat
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Em risco"
          value={String(atRiskClients.length)}
        />
        <Stat
          icon={<UserPlus className="h-5 w-5" />}
          label="Potencial"
          value={`R$ ${recoveredPotential.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
        />
      </div>

      <Card className="rounded-[2rem] overflow-hidden">
        <CardHeader className="border-b border-border bg-secondary/30">
          <CardTitle className="font-black uppercase italic tracking-tight flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" /> Lista de recuperação
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-20 text-center font-bold uppercase tracking-widest text-muted-foreground">
              Carregando clientes...
            </div>
          ) : atRiskClients.length ? (
            <div className="divide-y divide-border">
              {atRiskClients.map((client) => (
                <div
                  key={client.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <p className="truncate text-lg font-black uppercase italic tracking-tight">
                        {client.name}
                      </p>
                      <Badge
                        variant="outline"
                        className="rounded-full border-yellow-500/20 bg-yellow-500/10 text-yellow-600 font-black uppercase"
                      >
                        {client.days_since_last_visit === 999
                          ? "Sem visita"
                          : `${client.days_since_last_visit} dias`}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">
                      {client.phone || "Sem telefone cadastrado"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => sendRecovery(client)}
                    className="h-11 rounded-xl font-black uppercase gap-2"
                  >
                    <MessageCircle className="h-4 w-4" /> Recuperar
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center px-6">
              <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" />
              <h3 className="text-xl font-black uppercase italic">Carteira saudável</h3>
              <p className="mt-2 font-medium text-muted-foreground">
                Nenhum cliente exige recuperação no momento.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
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
