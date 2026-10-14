import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, d as Button, I as Input, C as Card, e as CardContent, T as Textarea } from "./router-DONcpGkq.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-2PAumXzc.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-B1Aan_F-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-D_QTIlY3.mjs";
import { S as Switch } from "./switch-Dj_mi93B.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { P as Plus, r as Search, F as Scissors, al as Pencil, T as Trash2, a8 as Clock, D as DollarSign, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/i18next.mjs";
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
  "#a855f7"
];
function ServiceForm({ service, onSuccess, onCancel }) {
  const { t } = useTranslation();
  const isEditing = !!service;
  const serviceSchema = reactExports.useMemo(
    () => object({
      name: string().min(2, "O nome deve ter pelo menos 2 caracteres"),
      description: string().optional(),
      price: number().min(0, "O preço deve ser maior ou igual a zero"),
      duration_minutes: number().min(1, "A duração deve ser de pelo menos 1 minuto"),
      color: string(),
      active: boolean()
    }),
    [t]
  );
  const form = useForm({
    resolver: u(serviceSchema),
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price || 0,
      duration_minutes: service?.duration_minutes || 30,
      color: service?.color || "#3b82f6",
      active: service?.active ?? true
    }
  });
  const onSubmit = async (values) => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");
      if (isEditing) {
        const { error } = await supabase.from("services").update({ ...values, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", service.id);
        if (error) throw error;
        toast.success("Serviço atualizado!");
      } else {
        const { error } = await supabase.from("services").insert({ ...values, user_id: user.id });
        if (error) throw error;
        toast.success("Serviço criado!");
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error(error.message || "Erro ao salvar serviço");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "name",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Nome do Serviço" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Ex: Corte de Cabelo",
              ...field,
              className: "h-12 text-lg font-bold"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "description",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Descrição (Opcional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Detalhes sobre o serviço...",
              ...field,
              className: "min-h-[100px] text-base font-medium"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "price",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Preço (R$)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", ...field, className: "h-12 text-lg font-bold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "duration_minutes",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Duração (Minutos)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", ...field, className: "h-12 text-lg font-bold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "color",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Cor no Calendário" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SERVICE_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => field.onChange(c),
              className: `h-10 w-10 rounded-xl border-2 transition-all ${field.value === c ? "border-foreground scale-110" : "border-transparent"}`,
              style: { backgroundColor: c },
              "aria-label": `Selecionar cor ${c}`
            },
            c
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "active",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "flex items-center justify-between rounded-xl border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Serviço Ativo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Se desativado, não aparecerá na agenda." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: field.value, onCheckedChange: field.onChange }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onCancel,
          className: "flex-1 h-14 font-black uppercase tracking-widest rounded-xl",
          children: "CANCELAR"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: form.formState.isSubmitting,
          className: "flex-1 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20",
          children: form.formState.isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : isEditing ? "SALVAR" : "CRIAR SERVIÇO"
        }
      )
    ] })
  ] }) });
}
function ServicesPageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesPage, {}) });
}
function ServicesPage() {
  const {
    t
  } = useTranslation();
  const [services, setServices] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = reactExports.useState(false);
  const [editingService, setEditingService] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchServices();
  }, []);
  const fetchServices = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from("services").select("*").order("name", {
        ascending: true
      });
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      toast.error("Erro ao carregar serviços");
    } finally {
      setLoading(false);
    }
  };
  const deleteService = async (id) => {
    try {
      const {
        error
      } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      toast.success("Serviço removido");
      fetchServices();
    } catch (error) {
      toast.error("Erro ao remover serviço");
    }
  };
  const filteredServices = services.filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight uppercase", children: "Serviços" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-lg", children: "Preços e duração dos seus atendimentos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isAddDialogOpen, onOpenChange: setIsAddDialogOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "h-14 px-8 font-black text-base shadow-lg shadow-primary/20 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-6 w-6" }),
          " NOVO SERVIÇO"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] p-8 rounded-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-black uppercase tracking-tight italic", children: "Novo serviço" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceForm, { onSuccess: () => {
            setIsAddDialogOpen(false);
            fetchServices();
          }, onCancel: () => setIsAddDialogOpen(false) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar serviço por nome...", className: "bg-card border-border pl-14 h-14 text-lg font-bold rounded-2xl shadow-sm", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 animate-pulse col-span-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-12 w-12 text-muted-foreground/30 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-muted-foreground", children: "Carregando serviços..." })
    ] }) : filteredServices.length > 0 ? filteredServices.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card hover:border-primary/50 transition-all group overflow-hidden shadow-sm rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary border border-border text-primary font-black shadow-sm group-hover:bg-primary/5 transition-colors shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-xl tracking-tight leading-tight", children: service.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-muted-foreground hover:text-primary", onClick: () => setEditingService(service), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-3xl p-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-xl font-black uppercase italic", children: "Remover Serviço?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-base font-medium", children: "Esta ação não pode ser desfeita. O serviço será removido permanentemente." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "h-12 rounded-xl font-bold", children: "CANCELAR" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "h-12 rounded-xl font-black bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: () => deleteService(service.id), children: "REMOVER" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1.5 font-medium line-clamp-2", children: service.description || "Sem descrição detalhada" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-black text-muted-foreground bg-secondary px-3 py-1.5 rounded-full border border-border uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }),
          " ",
          service.duration_minutes,
          " MIN"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-black text-success bg-success/5 px-3 py-1.5 rounded-full border border-success/10 uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4" }),
          " R$",
          " ",
          service.price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2
          })
        ] })
      ] })
    ] }) }) }, service.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24 border-2 border-dashed border-border rounded-3xl bg-secondary/10 col-span-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-10 w-10 text-muted-foreground/30" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black tracking-tight italic uppercase", children: "Nenhum serviço" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-lg mt-2", children: "Comece adicionando seu primeiro serviço." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setIsAddDialogOpen(true), className: "mt-8 font-black h-12 px-8 rounded-xl shadow-lg shadow-primary/20", children: "CRIAR MEU PRIMEIRO SERVIÇO" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editingService, onOpenChange: (open) => !open && setEditingService(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] p-8 rounded-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-black uppercase tracking-tight italic", children: "Editar serviço" }) }),
      editingService && /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceForm, { service: editingService, onSuccess: () => {
        setEditingService(null);
        fetchServices();
      }, onCancel: () => setEditingService(null) })
    ] }) })
  ] });
}
export {
  ServicesPageWrapper as component
};
