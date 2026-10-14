import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MessageCircle, ChevronRight, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";

interface InactiveClient {
  id: string;
  name: string;
  phone: string;
  last_visit: string;
  days_since_last_visit: number;
  risk_level: "green" | "yellow" | "red";
}

interface InactiveClientsProps {
  clients: InactiveClient[];
}

export function InactiveClients({ clients }: InactiveClientsProps) {
  const sendWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(
      `Olá, ${name}! Tudo bem? Sentimos sua falta aqui na barbearia. Que tal agendar um horário para esta semana?`,
    );
    window.open(`https://wa.me/55${phone.replace(/\D/g, "")}?text=${message}`, "_blank");
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "red":
        return "bg-destructive text-destructive-foreground";
      case "yellow":
        return "bg-yellow-500 text-black";
      default:
        return "bg-green-500 text-primary-foreground";
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case "red":
        return "CRÍTICO (+60 dias)";
      case "yellow":
        return "EM RISCO (+30 dias)";
      default:
        return "OK";
    }
  };

  return (
    <Card className="rounded-[2rem] border-border bg-card shadow-sm overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Recuperar Clientes
        </CardTitle>
        <Link
          to="/dashboard/clients"
          className="text-primary hover:underline font-black flex items-center gap-1 text-[10px] uppercase tracking-widest"
        >
          Ver todos <ChevronRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {clients.length > 0 ? (
          <div className="divide-y divide-border">
            {clients.slice(0, 5).map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center border border-border">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-black text-sm italic break-words">{client.name}</p>
                      <span
                        className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${getRiskColor(client.risk_level)}`}
                      >
                        {getRiskLabel(client.risk_level)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Última visita: {format(parseISO(client.last_visit), "dd/MM/yy")}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl h-9 font-black text-[10px] gap-2 border-primary/20 hover:bg-primary hover:text-white"
                  onClick={() => sendWhatsApp(client.phone, client.name)}
                >
                  <MessageCircle className="h-4 w-4" />
                  RECUPERAR
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 border border-border">
              <User className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-black uppercase italic tracking-tight">Tudo em dia!</h3>
            <p className="text-muted-foreground font-medium mt-1">
              Nenhum cliente em risco de perda.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
