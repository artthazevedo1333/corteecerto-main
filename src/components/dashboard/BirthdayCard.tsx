import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cake, MessageCircle } from "lucide-react";

interface BirthdayCardProps {
  birthdays: any[];
}

export function BirthdayCard({ birthdays }: BirthdayCardProps) {
  if (birthdays.length === 0) return null;

  const sendWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(
      `Parabéns, ${name}! 🎉 O Corte Certo deseja um feliz aniversário! Que tal dar aquele trato no visual hoje?`,
    );
    window.open(`https://wa.me/55${phone.replace(/\D/g, "")}?text=${message}`, "_blank");
  };

  return (
    <Card className="rounded-[2rem] border-none bg-gradient-to-br from-pink-500/10 to-orange-500/10 shadow-sm overflow-hidden border border-pink-500/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
            <Cake className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase italic tracking-tight">Aniversariantes</h3>
            <p className="text-sm font-medium text-muted-foreground">Não esqueça de parabenizar!</p>
          </div>
        </div>

        <div className="space-y-3">
          {birthdays.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-white/50 border border-pink-500/10"
            >
              <span className="font-black text-sm italic break-words">{client.name}</span>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-xl h-9 px-4 font-black text-xs gap-2 hover:bg-pink-500 hover:text-white"
                onClick={() => sendWhatsApp(client.phone, client.name)}
              >
                <MessageCircle className="h-4 w-4" />
                PARABENIZAR
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
