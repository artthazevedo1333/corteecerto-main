import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Crown, Plus, Trash2, Pencil, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { ErrorBoundary } from "@/components/error-boundary";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/_layout/vip-plans")({
  component: VipPlansPageWrapper,
});

const planSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  price: z.coerce.number().min(0, "Preço deve ser positivo"),
  validity_days: z.coerce.number().min(1, "Validade mínima de 1 dia"),
  includesText: z.string().optional(),
  is_active: z.boolean(),
});

type PlanFormValues = z.infer<typeof planSchema>;

function VipPlansPageWrapper() {
  return (
    <ErrorBoundary>
      <VipPlansPage />
    </ErrorBoundary>
  );
}

function VipPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("vip_plans")
        .select("*")
        .order("price", { ascending: true });
      if (error) throw error;
      setPlans(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar planos VIP");
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id: string) => {
    try {
      const { error } = await supabase.from("vip_plans").delete().eq("id", id);
      if (error) throw error;
      toast.success("Plano removido");
      fetchPlans();
    } catch (error: any) {
      toast.error("Erro ao remover plano");
    }
  };

  const openCreate = () => {
    setEditingPlan(null);
    setIsDialogOpen(true);
  };

  const openEdit = (plan: any) => {
    setEditingPlan(plan);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className="font-black uppercase tracking-widest text-[10px] rounded-full"
            >
              Fidelização
            </Badge>
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase italic leading-none">
            Planos VIP e Assinaturas
          </h1>
          <p className="text-muted-foreground text-lg font-medium mt-2">
            Crie, edite e gerencie planos recorrentes para clientes fiéis.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openCreate}
              className="h-14 px-8 rounded-xl font-black uppercase gap-2"
            >
              <Plus className="h-5 w-5" /> Novo plano
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[520px] p-8 rounded-3xl">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-black uppercase tracking-tight italic">
                {editingPlan ? "Editar Plano VIP" : "Novo Plano VIP"}
              </DialogTitle>
            </DialogHeader>
            <PlanForm
              plan={editingPlan}
              onCancel={() => setIsDialogOpen(false)}
              onSuccess={() => {
                setIsDialogOpen(false);
                setEditingPlan(null);
                fetchPlans();
              }}
            />
          </DialogContent>
        </Dialog>
      </header>

      {loading ? (
        <div className="grid gap-8 md:grid-cols-3 animate-pulse">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-80 bg-secondary rounded-[2.5rem]" />
          ))}
        </div>
      ) : plans.length ? (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`rounded-[2.5rem] border-border bg-card shadow-sm overflow-hidden flex flex-col ${!plan.is_active ? "opacity-60" : ""}`}
            >
              <CardHeader className="p-8 pb-0">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Crown className="h-8 w-8 text-primary" />
                  </div>
                  <Badge
                    variant={plan.is_active ? "default" : "secondary"}
                    className="font-black uppercase tracking-widest text-[10px] rounded-full"
                  >
                    {plan.is_active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-black uppercase italic tracking-tighter break-words">
                  {plan.name}
                </CardTitle>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black">
                    R${" "}
                    {Number(plan.price || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-muted-foreground font-bold text-sm uppercase">
                    /{plan.validity_days} dias
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-8 flex-1 space-y-6">
                <div className="space-y-4">
                  {(Array.isArray(plan.includes) ? plan.includes : []).map(
                    (item: string, idx: number) => (
                      <div key={`${item}-${idx}`} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm font-bold text-muted-foreground leading-tight break-words">
                          {item}
                        </span>
                      </div>
                    ),
                  )}
                  {(!Array.isArray(plan.includes) || plan.includes.length === 0) && (
                    <p className="text-sm font-medium text-muted-foreground">
                      Sem itens detalhados.
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => openEdit(plan)}
                    className="flex-1 h-12 rounded-xl font-black uppercase gap-2"
                  >
                    <Pencil className="h-4 w-4" /> Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-xl text-destructive hover:bg-destructive/5"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-3xl p-8">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-black uppercase italic">
                          Excluir plano?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base font-medium">
                          Esta ação remove o plano VIP permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className="h-12 rounded-xl font-bold">
                          CANCELAR
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="h-12 rounded-xl font-black bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => deletePlan(plan.id)}
                        >
                          EXCLUIR
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-secondary/20 rounded-[3rem] border-2 border-dashed border-border px-6">
          <div className="h-20 w-20 rounded-full bg-card flex items-center justify-center mx-auto mb-6 shadow-sm border border-border">
            <Crown className="h-10 w-10 text-muted-foreground/30" />
          </div>
          <h3 className="text-3xl font-black uppercase italic tracking-tight">
            Sua barbearia ainda não tem planos VIP
          </h3>
          <p className="text-muted-foreground text-lg font-medium mt-2 max-w-md mx-auto">
            Crie o primeiro plano para vender pacotes e fidelizar clientes.
          </p>
          <Button
            onClick={openCreate}
            className="mt-10 h-16 px-10 rounded-2xl font-black text-lg uppercase italic shadow-2xl shadow-primary/20"
          >
            CRIAR PRIMEIRO PLANO VIP
          </Button>
        </div>
      )}
    </div>
  );
}

function PlanForm({
  plan,
  onSuccess,
  onCancel,
}: {
  plan?: any;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const isEditing = !!plan;
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: plan?.name || "",
      price: Number(plan?.price || 0),
      validity_days: Number(plan?.validity_days || 30),
      includesText: Array.isArray(plan?.includes) ? plan.includes.join("\n") : "",
      is_active: plan?.is_active ?? true,
    },
  });

  useEffect(() => {
    form.reset({
      name: plan?.name || "",
      price: Number(plan?.price || 0),
      validity_days: Number(plan?.validity_days || 30),
      includesText: Array.isArray(plan?.includes) ? plan.includes.join("\n") : "",
      is_active: plan?.is_active ?? true,
    });
  }, [form, plan]);

  const onSubmit = async (values: PlanFormValues) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const payload = {
        name: values.name,
        price: values.price,
        validity_days: values.validity_days,
        includes: (values.includesText || "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        is_active: values.is_active,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase.from("vip_plans").update(payload).eq("id", plan.id);
        if (error) throw error;
        toast.success("Plano atualizado");
      } else {
        const { error } = await supabase.from("vip_plans").insert(payload);
        if (error) throw error;
        toast.success("Plano criado");
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar plano");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Nome do plano
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-12 text-lg font-bold"
                  placeholder="Ex: VIP Corte Mensal"
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
            name="validity_days"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  Validade
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
          name="includesText"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Itens inclusos
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-[110px] text-base font-medium"
                  placeholder="Um item por linha"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-xl border border-border p-4">
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Plano ativo
              </FormLabel>
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
            className="flex-1 h-14 font-black uppercase rounded-xl"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex-1 h-14 font-black uppercase rounded-xl"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isEditing ? (
              "Salvar"
            ) : (
              "Criar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
