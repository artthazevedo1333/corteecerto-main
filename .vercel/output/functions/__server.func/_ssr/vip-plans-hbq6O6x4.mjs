import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, B as Badge, d as Button, C as Card, f as CardHeader, g as CardTitle, e as CardContent, I as Input, T as Textarea } from "./router-DONcpGkq.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-2PAumXzc.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-B1Aan_F-.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-D_QTIlY3.mjs";
import { S as Switch } from "./switch-Dj_mi93B.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as Plus, s as Crown, k as CircleCheck, al as Pencil, T as Trash2, L as LoaderCircle } from "../_libs/lucide-react.mjs";
import { o as object, b as boolean, s as string, n as number } from "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "./label-nYamNITy.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
const planSchema = object({
  name: string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  price: number().min(0, "Preço deve ser positivo"),
  validity_days: number().min(1, "Validade mínima de 1 dia"),
  includesText: string().optional(),
  is_active: boolean()
});
function VipPlansPageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(VipPlansPage, {}) });
}
function VipPlansPage() {
  const [plans, setPlans] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [isDialogOpen, setIsDialogOpen] = reactExports.useState(false);
  const [editingPlan, setEditingPlan] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchPlans();
  }, []);
  const fetchPlans = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from("vip_plans").select("*").order("price", {
        ascending: true
      });
      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      toast.error("Erro ao carregar planos VIP");
    } finally {
      setLoading(false);
    }
  };
  const deletePlan = async (id) => {
    try {
      const {
        error
      } = await supabase.from("vip_plans").delete().eq("id", id);
      if (error) throw error;
      toast.success("Plano removido");
      fetchPlans();
    } catch (error) {
      toast.error("Erro ao remover plano");
    }
  };
  const openCreate = () => {
    setEditingPlan(null);
    setIsDialogOpen(true);
  };
  const openEdit = (plan) => {
    setEditingPlan(plan);
    setIsDialogOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-black uppercase tracking-widest text-[10px] rounded-full", children: "Fidelização" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black tracking-tight uppercase italic leading-none", children: "Planos VIP e Assinaturas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg font-medium mt-2", children: "Crie, edite e gerencie planos recorrentes para clientes fiéis." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, className: "h-14 px-8 rounded-xl font-black uppercase gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }),
          " Novo plano"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[520px] p-8 rounded-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-black uppercase tracking-tight italic", children: editingPlan ? "Editar Plano VIP" : "Novo Plano VIP" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlanForm, { plan: editingPlan, onCancel: () => setIsDialogOpen(false), onSuccess: () => {
            setIsDialogOpen(false);
            setEditingPlan(null);
            fetchPlans();
          } })
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-3 animate-pulse", children: [1, 2, 3].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 bg-secondary rounded-[2.5rem]" }, item)) }) : plans.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-2 xl:grid-cols-3", children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `rounded-[2.5rem] border-border bg-card shadow-sm overflow-hidden flex flex-col ${!plan.is_active ? "opacity-60" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "p-8 pb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: plan.is_active ? "default" : "secondary", className: "font-black uppercase tracking-widest text-[10px] rounded-full", children: plan.is_active ? "Ativo" : "Inativo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-black uppercase italic tracking-tighter break-words", children: plan.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-4xl font-black", children: [
            "R$",
            " ",
            Number(plan.price || 0).toLocaleString("pt-BR", {
              minimumFractionDigits: 2
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-bold text-sm uppercase", children: [
            "/",
            plan.validity_days,
            " dias"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 flex-1 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          (Array.isArray(plan.includes) ? plan.includes : []).map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-green-500 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-muted-foreground leading-tight break-words", children: item })
          ] }, `${item}-${idx}`)),
          (!Array.isArray(plan.includes) || plan.includes.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Sem itens detalhados." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => openEdit(plan), className: "flex-1 h-12 rounded-xl font-black uppercase gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }),
            " Editar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", className: "h-12 w-12 rounded-xl text-destructive hover:bg-destructive/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-3xl p-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-xl font-black uppercase italic", children: "Excluir plano?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-base font-medium", children: "Esta ação remove o plano VIP permanentemente." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "h-12 rounded-xl font-bold", children: "CANCELAR" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "h-12 rounded-xl font-black bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: () => deletePlan(plan.id), children: "EXCLUIR" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }, plan.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24 bg-secondary/20 rounded-[3rem] border-2 border-dashed border-border px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-card flex items-center justify-center mx-auto mb-6 shadow-sm border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-10 w-10 text-muted-foreground/30" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-black uppercase italic tracking-tight", children: "Sua barbearia ainda não tem planos VIP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg font-medium mt-2 max-w-md mx-auto", children: "Crie o primeiro plano para vender pacotes e fidelizar clientes." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: openCreate, className: "mt-10 h-16 px-10 rounded-2xl font-black text-lg uppercase italic shadow-2xl shadow-primary/20", children: "CRIAR PRIMEIRO PLANO VIP" })
    ] })
  ] });
}
function PlanForm({
  plan,
  onSuccess,
  onCancel
}) {
  const isEditing = !!plan;
  const form = useForm({
    resolver: u(planSchema),
    defaultValues: {
      name: plan?.name || "",
      price: Number(plan?.price || 0),
      validity_days: Number(plan?.validity_days || 30),
      includesText: Array.isArray(plan?.includes) ? plan.includes.join("\n") : "",
      is_active: plan?.is_active ?? true
    }
  });
  reactExports.useEffect(() => {
    form.reset({
      name: plan?.name || "",
      price: Number(plan?.price || 0),
      validity_days: Number(plan?.validity_days || 30),
      includesText: Array.isArray(plan?.includes) ? plan.includes.join("\n") : "",
      is_active: plan?.is_active ?? true
    });
  }, [form, plan]);
  const onSubmit = async (values) => {
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");
      const payload = {
        name: values.name,
        price: values.price,
        validity_days: values.validity_days,
        includes: (values.includesText || "").split("\n").map((item) => item.trim()).filter(Boolean),
        is_active: values.is_active,
        user_id: user.id,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (isEditing) {
        const {
          error
        } = await supabase.from("vip_plans").update(payload).eq("id", plan.id);
        if (error) throw error;
        toast.success("Plano atualizado");
      } else {
        const {
          error
        } = await supabase.from("vip_plans").insert(payload);
        if (error) throw error;
        toast.success("Plano criado");
      }
      onSuccess();
    } catch (error) {
      toast.error(error.message || "Erro ao salvar plano");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "name", render: ({
      field
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Nome do plano" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field, className: "h-12 text-lg font-bold", placeholder: "Ex: VIP Corte Mensal" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "price", render: ({
        field
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Preço (R$)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", ...field, className: "h-12 text-lg font-bold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "validity_days", render: ({
        field
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Validade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", ...field, className: "h-12 text-lg font-bold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "includesText", render: ({
      field
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Itens inclusos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { ...field, className: "min-h-[110px] text-base font-medium", placeholder: "Um item por linha" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "is_active", render: ({
      field
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "flex items-center justify-between rounded-xl border border-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Plano ativo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: field.value, onCheckedChange: field.onChange }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onCancel, className: "flex-1 h-14 font-black uppercase rounded-xl", children: "Cancelar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: form.formState.isSubmitting, className: "flex-1 h-14 font-black uppercase rounded-xl", children: form.formState.isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : isEditing ? "Salvar" : "Criar" })
    ] })
  ] }) });
}
export {
  VipPlansPageWrapper as component
};
