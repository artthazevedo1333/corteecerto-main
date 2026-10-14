import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, MessageCircle, Play, CheckCircle, User } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NextAppointmentProps {
  appointment: any;
  onUpdate?: () => void;
}

export function NextAppointment({ appointment, onUpdate }: NextAppointmentProps) {
  const [loading, setLoading] = useState(false);

  if (!appointment) {
    return (
      <Card className="rounded-[2rem] border-dashed border-2 border-border bg-transparent shadow-none">
        <CardContent className="p-12 text-center">
          <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-muted-foreground/30" />
          </div>
          <h3 className="text-xl font-black uppercase italic tracking-tight">Sem agendamentos</h3>
          <p className="text-muted-foreground font-medium mt-1">
            Sua agenda está livre por enquanto.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleStatusChange = async (newStatus: "in_progress" | "completed") => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", appointment.id);

      if (error) throw error;

      if (newStatus === "completed") {
        // Record financial income automatically
        await supabase.from("financial_records").insert({
          user_id: appointment.user_id,
          amount: appointment.service?.price || 0,
          description: `Serviço: ${appointment.service?.name} - Cliente: ${appointment.client?.name}`,
          type: "income",
          category: "service",
          date: new Date().toISOString(),
        });

        // Update client last visit and total spent
        const { data: clientData } = await supabase
          .from("clients")
          .select("total_spent")
          .eq("id", appointment.client_id)
          .single();

        await supabase
          .from("clients")
          .update({
            last_visit: new Date().toISOString(),
            total_spent: (clientData?.total_spent || 0) + (appointment.service?.price || 0),
          })
          .eq("id", appointment.client_id);

        toast.success("Atendimento finalizado e financeiro atualizado!");
      } else {
        toast.success("Atendimento iniciado!");
      }

      onUpdate?.();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Erro ao atualizar status");
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsApp = () => {
    const phone = appointment.client?.phone || "";
    const message = encodeURIComponent(
      `Olá, ${appointment.client?.name}! Aqui é da barbearia. Estou te aguardando para seu atendimento das ${format(new Date(appointment.start_time), "HH:mm")}.`,
    );
    window.open(`https://wa.me/55${phone.replace(/\D/g, "")}?text=${message}`, "_blank");
  };

  const is_in_progress = appointment.status === "in_progress";

  return (
    <Card
      className={`overflow-hidden rounded-[2.5rem] shadow-2xl transition-all border-none ${is_in_progress ? "bg-green-600 text-white shadow-green-600/20" : "bg-primary text-white shadow-primary/20"}`}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 md:p-10 flex-1 border-white/10 border-b md:border-b-0 md:border-r">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center border border-white/30 text-white">
                <User className="h-10 w-10" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-white/20 border border-white/20`}
                  >
                    {is_in_progress ? "EM ATENDIMENTO" : "PRÓXIMO"}
                  </span>
                </div>
                <h3 className="text-3xl font-black italic tracking-tighter leading-none break-words">
                  {appointment.client?.name}
                </h3>
                <p className="font-bold mt-2 text-white/80">{appointment.service?.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/10 border border-white/20">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-70">
                    Horário
                  </p>
                  <p className="font-black text-xl leading-tight">
                    {format(new Date(appointment.start_time), "HH:mm")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/10 border border-white/20">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-70">
                    Valor
                  </p>
                  <p className="font-black text-xl leading-tight">
                    R${" "}
                    {appointment.service?.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col gap-3 justify-center w-full md:w-72 bg-black/10">
            {!is_in_progress ? (
              <Button
                onClick={() => handleStatusChange("in_progress")}
                disabled={loading}
                className="w-full font-black h-14 text-base rounded-2xl bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/20 gap-2"
              >
                <Play className="h-5 w-5 fill-current" />
                INICIAR SERVIÇO
              </Button>
            ) : (
              <Button
                onClick={() => handleStatusChange("completed")}
                disabled={loading}
                className="w-full font-black h-14 text-base rounded-2xl bg-white text-green-600 hover:bg-white/90 shadow-xl shadow-black/20 gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                FINALIZAR E RECEBER
              </Button>
            )}

            <Button
              variant="outline"
              onClick={sendWhatsApp}
              className="w-full font-black h-14 text-base rounded-2xl border-white/30 text-white hover:bg-white/10 bg-transparent gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              WHATSAPP
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
