import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const SERVICE_COLORS = [
  "#3b82f6",
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316",
  "#14b8a6",
  "#6366f1",
  "#84cc16",
  "#a855f7",
];

interface ServiceFormProps {
  service?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ServiceForm({ service, onSuccess, onCancel }: ServiceFormProps) {
  const { t } = useTranslation();
  const isEditing = !!service;

  const serviceSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
        description: z.string().optional(),
        price: z.coerce.number().min(0, "O preço deve ser maior ou igual a zero"),
        duration_minutes: z.coerce.number().min(1, "A duração deve ser de pelo menos 1 minuto"),
        color: z.string(),
        active: z.boolean(),
      }),
    [t],
  );

  type ServiceFormValues = z.infer<typeof serviceSchema>;

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price || 0,
      duration_minutes: service?.duration_minutes || 30,
      color: service?.color || "#3b82f6",
      active: service?.active ?? true,
    },
  });

  const onSubmit = async (values: ServiceFormValues) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      if (isEditing) {
        const { error } = await supabase
          .from("services")
          .update({ ...values, updated_at: new Date().toISOString() })
          .eq("id", service.id);
        if (error) throw error;
        toast.success("Serviço atualizado!");
      } else {
        const { error } = await supabase.from("services").insert({ ...values, user_id: user.id });
        if (error) throw error;
        toast.success("Serviço criado!");
      }
      onSuccess();
    } catch (error: any) {
      console.error("Error saving service:", error);
      toast.error(error.message || "Erro ao salvar serviço");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Nome do Serviço
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Corte de Cabelo"
                  {...field}
                  className="h-12 text-lg font-bold"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Descrição (Opcional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detalhes sobre o serviço..."
                  {...field}
                  className="min-h-[100px] text-base font-medium"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  Preço (R$)
                </FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} className="h-12 text-lg font-bold" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration_minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  Duração (Minutos)
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="h-12 text-lg font-bold" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Cor no Calendário
              </FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => field.onChange(c)}
                      className={`h-10 w-10 rounded-xl border-2 transition-all ${
                        field.value === c ? "border-foreground scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                      aria-label={`Selecionar cor ${c}`}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-xl border border-border p-4">
              <div>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  Serviço Ativo
                </FormLabel>
                <p className="text-xs text-muted-foreground mt-1">
                  Se desativado, não aparecerá na agenda.
                </p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 h-14 font-black uppercase tracking-widest rounded-xl"
          >
            CANCELAR
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
              "CRIAR SERVIÇO"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
