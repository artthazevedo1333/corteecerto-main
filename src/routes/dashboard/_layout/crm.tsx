import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Search, Star, Trophy, Users } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/_layout/crm")({
  component: CRMPage,
});

function CRMPage() {
  return (
    <ErrorBoundary>
      <CRMContent />
    </ErrorBoundary>
  );
}

function CRMContent() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from("clients")
          .select("id, name, phone, instagram, total_spent, last_visit, birthday")
          .order("total_spent", { ascending: false });
        if (error) throw error;
        setClients(data || []);
      } catch (error: any) {
        toast.error("Erro ao carregar CRM");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = useMemo(
    () =>
      clients.filter(
        (client) =>
          client.name?.toLowerCase().includes(search.toLowerCase()) ||
          client.phone?.includes(search),
      ),
    [clients, search],
  );

  const totalSpent = clients.reduce((sum, client) => sum + Number(client.total_spent || 0), 0);
  const topClient = clients[0];

  const openWhatsApp = (client: any) => {
    const phone = String(client.phone || "").replace(/\D/g, "");
    if (!phone) {
      toast.error("Cliente sem WhatsApp cadastrado");
      return;
    }
    const message = encodeURIComponent(
      `Olá, ${client.name}! Tudo bem? Temos horários disponíveis esta semana no Corte Certo.`,
    );
    window.open(`https://wa.me/55${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic">CRM Premium</h1>
          <p className="text-muted-foreground font-medium text-lg">
            Ranking, relacionamento e valor por cliente.
          </p>
        </div>
        <Button asChild className="h-12 px-6 rounded-xl font-black uppercase">
          <Link to="/dashboard/clients">Gerenciar clientes</Link>
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Metric
          icon={<Users className="h-5 w-5" />}
          label="Clientes"
          value={String(clients.length)}
        />
        <Metric
          icon={<Heart className="h-5 w-5" />}
          label="Valor total"
          value={`R$ ${totalSpent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
        />
        <Metric
          icon={<Trophy className="h-5 w-5" />}
          label="Cliente destaque"
          value={topClient?.name || "—"}
        />
      </div>

      <div className="relative">
        <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar cliente por nome ou telefone..."
          className="h-14 rounded-2xl bg-card pl-14 text-base font-bold"
        />
      </div>

      <Card className="rounded-[2rem] overflow-hidden">
        <CardHeader className="border-b border-border bg-secondary/30">
          <CardTitle className="font-black uppercase italic tracking-tight flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" /> Clientes de maior valor
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-20 text-center font-bold uppercase tracking-widest text-muted-foreground">
              Carregando CRM...
            </div>
          ) : filteredClients.length ? (
            <div className="divide-y divide-border">
              {filteredClients.map((client, index) => (
                <div
                  key={client.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-black border border-primary/20">
                      #{index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-lg font-black uppercase italic tracking-tight">
                        {client.name}
                      </p>
                      <p className="text-sm font-bold text-muted-foreground">
                        {client.phone || "Sem telefone"}{" "}
                        {client.instagram ? `• ${client.instagram}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 font-black uppercase"
                    >
                      R${" "}
                      {Number(client.total_spent || 0).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openWhatsApp(client)}
                      className="h-10 rounded-xl font-black uppercase gap-2"
                    >
                      <MessageCircle className="h-4 w-4" /> Chamar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center px-6">
              <h3 className="text-xl font-black uppercase italic">Nenhum cliente encontrado</h3>
              <p className="mt-2 font-medium text-muted-foreground">
                Cadastre clientes para acompanhar o relacionamento.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
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
