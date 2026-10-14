import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, TrendingUp } from "lucide-react";

interface TopService {
  name: string;
  count: number;
  revenue: number;
}

interface TopServicesProps {
  services: TopService[];
}

export function TopServices({ services }: TopServicesProps) {
  return (
    <Card className="rounded-[2rem] border-border bg-card shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Serviços em Alta
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {services.length > 0 ? (
          <div className="divide-y divide-border">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center border border-border">
                    <Scissors className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase italic">{service.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {service.count} atendimentos
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm">R$ {service.revenue.toLocaleString("pt-BR")}</p>
                  <p className="text-[10px] uppercase font-bold text-green-500">Mês</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground italic font-medium">
            Nenhum serviço registrado este mês.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
