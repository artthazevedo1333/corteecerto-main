import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, differenceInDays } from "date-fns";
import {
  User,
  Phone,
  Calendar as CalendarIcon,
  DollarSign,
  TrendingUp,
  Clock,
  MessageCircle,
  Scissors,
  ClipboardList,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ClientDetailsProps {
  client: any;
}

export function ClientDetails({ client }: ClientDetailsProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase
        .from("appointments")
        .select("*, service:services(name, price)")
        .eq("client_id", client.id)
        .eq("status", "completed")
        .order("start_time", { ascending: false });

      setHistory(data || []);
      setLoading(false);
    };
    fetchHistory();
  }, [client.id]);

  const sendWhatsApp = () => {
    const phone = client.phone || "";
    window.open(`https://wa.me/55${phone.replace(/\D/g, "")}`, "_blank");
  };

  const favoriteService =
    history.length > 0
      ? Object.entries(
          history.reduce((acc, curr) => {
            const name = curr.service?.name || "Outros";
            acc[name] = (acc[name] || 0) + 1;
            return acc;
          }, {} as any),
        ).sort((a, b) => (b[1] as number) - (a[1] as number))[0][0]
      : "Nenhum";

  const frequency =
    history.length > 1
      ? (
          differenceInDays(
            parseISO(history[0].start_time),
            parseISO(history[history.length - 1].start_time),
          ) /
          (history.length - 1)
        ).toFixed(0)
      : "30";

  const ticketMedio =
    history.length > 0
      ? history.reduce((acc, curr) => acc + (curr.service?.price || 0), 0) / history.length
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center p-6 bg-secondary/30 rounded-3xl border border-border">
        <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-black mb-4 border-4 border-white shadow-xl">
          {client.name.charAt(0)}
        </div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">{client.name}</h2>
        <div className="flex items-center gap-2 mt-1 text-muted-foreground font-bold">
          <Phone className="h-4 w-4" />
          {client.phone || "Sem telefone"}
        </div>
        <Button
          onClick={sendWhatsApp}
          className="mt-6 rounded-2xl h-12 px-8 font-black gap-2 shadow-lg shadow-primary/20"
        >
          <MessageCircle className="h-5 w-5" />
          CONTATO VIA WHATSAPP
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
            Total Gasto
          </p>
          <p className="text-xl font-black text-green-500">
            R$ {(client.total_spent || 0).toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
            Visitas
          </p>
          <p className="text-xl font-black">{history.length}</p>
        </div>
        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
            Ticket Médio
          </p>
          <p className="text-xl font-black">R$ {ticketMedio.toLocaleString("pt-BR")}</p>
        </div>
        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
            Frequência
          </p>
          <p className="text-xl font-black">{frequency} dias</p>
        </div>
        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm col-span-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
            Serviço Favorito
          </p>
          <p className="text-xl font-black italic uppercase">{favoriteService}</p>
        </div>
      </div>

      {client.notes && (
        <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl">
          <div className="flex items-center gap-2 mb-2 font-black text-sm uppercase italic text-primary">
            <ClipboardList className="h-4 w-4" />
            Observações
          </div>
          <p className="text-sm font-medium italic">{client.notes}</p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-black uppercase italic tracking-tight opacity-70 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Histórico Recente
        </h3>
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-secondary rounded-2xl" />
            ))}
          </div>
        ) : history.length > 0 ? (
          <div className="space-y-3">
            {history.slice(0, 5).map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center border border-border">
                    <Scissors className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase">{apt.service?.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground">
                      {format(parseISO(apt.start_time), "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
                <p className="font-black text-sm">
                  R$ {apt.service?.price?.toLocaleString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-muted-foreground italic font-medium">
            Nenhum atendimento finalizado.
          </p>
        )}
      </div>
    </div>
  );
}
