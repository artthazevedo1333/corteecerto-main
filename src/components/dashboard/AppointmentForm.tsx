import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { addMinutes, format } from "date-fns";

const appointmentSchema = z.object({
  client_id: z.string().min(1, "Selecione um cliente"),
  service_id: z.string().min(1, "Selecione um serviço"),
  date: z.string().min(1, "Selecione uma data"),
  time: z.string().min(1, "Selecione um horário"),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  appointment?: any;
  onSuccess: () => void;
  onCancel: () => void;
  defaultDate?: Date;
}

export function AppointmentForm({
  appointment,
  onSuccess,
  onCancel,
  defaultDate,
}: AppointmentFormProps) {
  const [clients, setClients] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const isEditing = !!appointment;

  useEffect(() => {
    async function loadOptions() {
      try {
        const [clientsRes, servicesRes] = await Promise.all([
          supabase.from("clients").select("id, name").order("name"),
          supabase.from("services").select("id, name, duration_minutes").order("name"),
        ]);

        if (clientsRes.error) throw clientsRes.error;
        if (servicesRes.error) throw servicesRes.error;

        setClients(clientsRes.data || []);
        setServices(servicesRes.data || []);
      } catch (error) {
        toast.error("Erro ao carregar opções");
      } finally {
        setLoadingOptions(false);
      }
    }
    loadOptions();
  }, []);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      client_id: appointment?.client_id || "",
      service_id: appointment?.service_id || "",
      date: appointment
        ? format(new Date(appointment.start_time), "yyyy-MM-dd")
        : format(defaultDate || new Date(), "yyyy-MM-dd"),
      time: appointment ? format(new Date(appointment.start_time), "HH:mm") : "09:00",
      notes: appointment?.notes || "",
    },
  });

  const onSubmit = async (values: AppointmentFormValues) => {
    try {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (!user) throw new Error("Usuário não autenticado");

      const startTime = new Date(`${values.date}T${values.time}`);
      const service = services.find((s) => s.id === values.service_id);
      const duration = service?.duration_minutes || 30;
      const endTime = addMinutes(startTime, duration);

      const payload = {
        client_id: values.client_id || null,
        service_id: values.service_id,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        notes: values.notes,
        user_id: user.id,
        status: isEditing ? appointment.status : "scheduled",
        customer_name: values.client_id ? null : "Cliente Avulso",
      };

      if (isEditing) {
        const { error } = await supabase
          .from("appointments")
          .update(payload)
          .eq("id", appointment.id);
        if (error) throw error;
        toast.success("Agendamento atualizado");
      } else {
        const { error } = await supabase.from("appointments").insert(payload);
        if (error) throw error;
        toast.success("Agendamento criado");
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar agendamento");
    }
  };

  if (loadingOptions)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Cliente
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 text-lg font-bold">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id} className="font-bold">
                      {c.name}
                    </SelectItem>
                  ))}
                  {clients.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      Nenhum cliente cadastrado
                    </div>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Serviço
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 text-lg font-bold">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.id} className="font-bold">
                      {s.name}
                    </SelectItem>
                  ))}
                  {services.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      Nenhum serviço cadastrado
                    </div>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">Data</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="h-12 text-lg font-bold" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  Horário
                </FormLabel>
                <FormControl>
                  <Input type="time" {...field} className="h-12 text-lg font-bold" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 h-14 font-black uppercase tracking-widest rounded-xl"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex-1 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isEditing ? (
              "SALVAR"
            ) : (
              "AGENDAR"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
