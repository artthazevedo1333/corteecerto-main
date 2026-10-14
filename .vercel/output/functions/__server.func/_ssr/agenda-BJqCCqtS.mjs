import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { c as useSensors, d as useSensor, D as DndContext, e as closestCenter, P as PointerSensor } from "../_libs/dnd-kit__core.mjs";
import { S as SortableContext, v as verticalListSortingStrategy, a as arrayMove, u as useSortable } from "../_libs/dnd-kit__sortable.mjs";
import { C as CSS } from "../_libs/dnd-kit__utilities.mjs";
import { E as ErrorBoundary, d as Button, I as Input, C as Card, c as cn } from "./router-DONcpGkq.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-2PAumXzc.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-B1Aan_F-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-D_QTIlY3.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C6am6R5Y.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { R as Root2, I as Item2, a as Indicator } from "../_libs/radix-ui__react-radio-group.mjs";
import { w as waLink } from "./wa-templates-DoWwHxz5.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { s as startOfToday, l as isSameDay, a as format, p as ptBR, m as isToday, n as addDays, o as addMinutes } from "../_libs/date-fns.mjs";
import { _ as Zap, P as Plus, U as Users, a8 as Clock, D as DollarSign, p as TrendingUp, aF as ChevronLeft, f as ChevronRight, n as Ban, an as CalendarDays, ac as Lock, aG as Plane, aH as Coffee, L as LoaderCircle, T as Trash2, aI as GripVertical, F as Scissors, aB as Play, k as CircleCheck, M as MessageCircle, al as Pencil, o as CircleX, ay as Minus, X, O as Package, ao as Wallet, a0 as CreditCard, h as Circle } from "../_libs/lucide-react.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/dnd-kit__accessibility.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/i18next.mjs";
const appointmentSchema = object({
  client_id: string().min(1, "Selecione um cliente"),
  service_id: string().min(1, "Selecione um serviço"),
  date: string().min(1, "Selecione uma data"),
  time: string().min(1, "Selecione um horário"),
  notes: string().optional()
});
function AppointmentForm({
  appointment,
  onSuccess,
  onCancel,
  defaultDate
}) {
  const [clients, setClients] = reactExports.useState([]);
  const [services, setServices] = reactExports.useState([]);
  const [loadingOptions, setLoadingOptions] = reactExports.useState(true);
  const isEditing = !!appointment;
  reactExports.useEffect(() => {
    async function loadOptions() {
      try {
        const [clientsRes, servicesRes] = await Promise.all([
          supabase.from("clients").select("id, name").order("name"),
          supabase.from("services").select("id, name, duration_minutes").order("name")
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
  const form = useForm({
    resolver: u(appointmentSchema),
    defaultValues: {
      client_id: appointment?.client_id || "",
      service_id: appointment?.service_id || "",
      date: appointment ? format(new Date(appointment.start_time), "yyyy-MM-dd") : format(defaultDate || /* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      time: appointment ? format(new Date(appointment.start_time), "HH:mm") : "09:00",
      notes: appointment?.notes || ""
    }
  });
  const onSubmit = async (values) => {
    try {
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (!user) throw new Error("Usuário não autenticado");
      const startTime = /* @__PURE__ */ new Date(`${values.date}T${values.time}`);
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
        customer_name: values.client_id ? null : "Cliente Avulso"
      };
      if (isEditing) {
        const { error } = await supabase.from("appointments").update(payload).eq("id", appointment.id);
        if (error) throw error;
        toast.success("Agendamento atualizado");
      } else {
        const { error } = await supabase.from("appointments").insert(payload);
        if (error) throw error;
        toast.success("Agendamento criado");
      }
      onSuccess();
    } catch (error) {
      toast.error(error.message || "Erro ao salvar agendamento");
    }
  };
  if (loadingOptions)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "client_id",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Cliente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 text-lg font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione um cliente" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              clients.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, className: "font-bold", children: c.name }, c.id)),
              clients.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-sm text-muted-foreground", children: "Nenhum cliente cadastrado" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "service_id",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Serviço" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 text-lg font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione um serviço" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.id, className: "font-bold", children: s.name }, s.id)),
              services.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-sm text-muted-foreground", children: "Nenhum serviço cadastrado" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "date",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Data" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...field, className: "h-12 text-lg font-bold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "time",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Horário" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", ...field, className: "h-12 text-lg font-bold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onCancel,
          className: "flex-1 h-14 font-black uppercase tracking-widest rounded-xl",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: form.formState.isSubmitting,
          className: "flex-1 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20",
          children: form.formState.isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : isEditing ? "SALVAR" : "AGENDAR"
        }
      )
    ] })
  ] }) });
}
const RadioGroup = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { className: cn("grid gap-2", className), ...props, ref });
});
RadioGroup.displayName = Root2.displayName;
const RadioGroupItem = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" }) })
    }
  );
});
RadioGroupItem.displayName = Item2.displayName;
function printReceipt(data) {
  const d = data.date || /* @__PURE__ */ new Date();
  const products = data.products || [];
  const win = window.open("", "_blank", "width=380,height=640");
  if (!win) return;
  const rows = [
    ...data.serviceName ? [
      {
        name: data.serviceName,
        quantity: 1,
        price: Number(data.servicePrice || 0)
      }
    ] : [],
    ...products
  ];
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Comprovante</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Courier New', ui-monospace, monospace; max-width: 320px; margin: 0 auto; padding: 16px; color: #111; }
  h1 { font-size: 18px; text-align: center; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 2px; }
  .sub { text-align: center; font-size: 11px; color: #555; margin-bottom: 12px; }
  hr { border: none; border-top: 1px dashed #999; margin: 10px 0; }
  .row { display: flex; justify-content: space-between; font-size: 12px; margin: 3px 0; }
  .total { font-size: 16px; font-weight: 700; margin-top: 8px; }
  .foot { text-align: center; font-size: 11px; color: #555; margin-top: 16px; }
  @media print { body { padding: 0; } }
</style></head><body>
<h1>${escape(data.businessName || "Corte Certo")}</h1>
<div class="sub">Comprovante de atendimento</div>
<hr>
<div class="row"><span>Cliente</span><strong>${escape(data.clientName)}</strong></div>
<div class="row"><span>Data</span><span>${format(d, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span></div>
${`<div class="row"><span>Pagamento</span><span>${escape(data.paymentMethod)}</span></div>`}
<hr>
${rows.map(
    (r) => `
  <div class="row"><span>${r.quantity}x ${escape(r.name)}</span><span>R$ ${(r.price * r.quantity).toFixed(2).replace(".", ",")}</span></div>`
  ).join("")}
<hr>
<div class="row total"><span>TOTAL</span><span>R$ ${Number(data.total).toFixed(2).replace(".", ",")}</span></div>
<div class="foot">Obrigado pela preferência!<br>${format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</div>
<script>window.onload=()=>{window.print();setTimeout(()=>window.close(),400);}<\/script>
</body></html>`;
  win.document.write(html);
  win.document.close();
}
function escape(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function CheckoutDialog({
  appointment,
  open,
  onOpenChange,
  onSuccess
}) {
  const servicePrice = Number(appointment?.service?.price) || 0;
  const [paymentMethod, setPaymentMethod] = reactExports.useState("money");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [products, setProducts] = reactExports.useState([]);
  const [cart, setCart] = reactExports.useState([]);
  const [showProducts, setShowProducts] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open) return;
    setCart([]);
    setShowProducts(false);
    (async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("products").select("id, name, selling_price, sale_price, current_stock").eq("user_id", user.id).gt("current_stock", 0).order("name");
      setProducts(data || []);
    })();
  }, [open]);
  const productsTotal = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const total = servicePrice + productsTotal;
  const addToCart = (product) => {
    const price = Number(product.selling_price ?? product.sale_price) || 0;
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        if (existing.quantity >= product.current_stock) {
          toast.error("Estoque insuficiente");
          return prev;
        }
        return prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price, stock: product.current_stock, quantity: 1 }
      ];
    });
  };
  const updateQty = (id, delta) => {
    setCart(
      (prev) => prev.map((p) => {
        if (p.id !== id) return p;
        const next = p.quantity + delta;
        if (next > p.stock) {
          toast.error("Estoque insuficiente");
          return p;
        }
        return { ...p, quantity: next };
      }).filter((p) => p.quantity > 0)
    );
  };
  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");
      const { error: aptError } = await supabase.from("appointments").update({ status: "completed" }).eq("id", appointment.id);
      if (aptError) throw aptError;
      const { error: finError } = await supabase.from("financial_records").insert({
        user_id: user.id,
        amount: servicePrice,
        type: "income",
        category: "service",
        description: `Atendimento: ${appointment.client?.name || appointment.customer_name || "Cliente Avulso"} - ${appointment.service?.name}`,
        appointment_id: appointment.id,
        date: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (finError) throw finError;
      for (const item of cart) {
        await supabase.from("financial_records").insert({
          user_id: user.id,
          amount: item.price * item.quantity,
          type: "income",
          category: "product",
          description: `Venda de produto: ${item.name} x${item.quantity}`,
          appointment_id: appointment.id,
          date: (/* @__PURE__ */ new Date()).toISOString()
        });
        await supabase.from("products").update({ current_stock: item.stock - item.quantity }).eq("id", item.id);
      }
      if (appointment.client_id) {
        const { data: client } = await supabase.from("clients").select("total_spent").eq("id", appointment.client_id).single();
        const currentTotal = Number(client?.total_spent) || 0;
        await supabase.from("clients").update({
          last_visit: (/* @__PURE__ */ new Date()).toISOString(),
          total_spent: currentTotal + total
        }).eq("id", appointment.client_id);
      }
      toast.success("Atendimento finalizado!");
      try {
        printReceipt({
          clientName: appointment.client?.name || appointment.customer_name || "Cliente",
          serviceName: appointment.service?.name,
          servicePrice,
          products: cart.map((c) => ({ name: c.name, quantity: c.quantity, price: c.price })),
          total,
          paymentMethod: paymentMethod === "money" ? "Dinheiro" : paymentMethod === "card" ? "Cartão" : "Pix"
        });
      } catch (receiptError) {
        console.warn("Não foi possível imprimir o recibo:", receiptError);
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Erro ao finalizar atendimento");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[480px] p-0 overflow-hidden border-none rounded-3xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "p-6 bg-primary text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-black uppercase tracking-tight italic", children: "Finalizar Atendimento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 font-medium", children: "Confirme os detalhes do pagamento." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-secondary/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground", children: "Serviço" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: appointment?.service?.name || "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-black text-lg", children: [
          "R$ ",
          servicePrice.toFixed(2)
        ] })
      ] }),
      cart.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-black uppercase tracking-widest opacity-70", children: "Produtos" }),
        cart.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 rounded-xl bg-secondary/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "R$ ",
                  item.price.toFixed(2),
                  " un."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    variant: "outline",
                    "aria-label": `Diminuir quantidade de ${item.name}`,
                    className: "h-8 w-8 rounded-lg",
                    onClick: () => updateQty(item.id, -1),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3", "aria-hidden": "true" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center font-black", "aria-live": "polite", children: item.quantity }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    variant: "outline",
                    "aria-label": `Aumentar quantidade de ${item.name}`,
                    className: "h-8 w-8 rounded-lg",
                    onClick: () => updateQty(item.id, 1),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3", "aria-hidden": "true" })
                  }
                )
              ] })
            ]
          },
          item.id
        ))
      ] }),
      products.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "w-full h-11 rounded-xl gap-2 font-black uppercase text-xs",
            onClick: () => setShowProducts((v) => !v),
            children: [
              showProducts ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
              showProducts ? "Fechar Produtos" : "Adicionar Produto"
            ]
          }
        ),
        showProducts && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 max-h-40 overflow-y-auto border border-border rounded-xl divide-y", children: products.map((p) => {
          const price = Number(p.selling_price ?? p.sale_price) || 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => addToCart(p),
              className: "w-full flex items-center justify-between p-3 hover:bg-secondary/50 text-left",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Estoque: ",
                    p.current_stock
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-black text-sm", children: [
                  "R$ ",
                  price.toFixed(2)
                ] })
              ]
            },
            p.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-primary/5 border-2 border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black uppercase tracking-widest text-sm", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-black italic", children: [
          "R$ ",
          total.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-black uppercase tracking-widest opacity-70", children: "Forma de Pagamento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          RadioGroup,
          {
            value: paymentMethod,
            onValueChange: setPaymentMethod,
            className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "money", id: "money", className: "peer sr-only" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "money",
                    className: "flex flex-col items-center rounded-2xl border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "mb-2 h-6 w-6" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase", children: "Dinheiro" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "pix", id: "pix", className: "peer sr-only" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "pix",
                    className: "flex flex-col items-center rounded-2xl border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "mb-2 h-6 w-6" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase", children: "PIX" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "card", id: "card", className: "peer sr-only" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "card",
                    className: "flex flex-col items-center rounded-2xl border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "mb-2 h-6 w-6" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase", children: "Cartão" })
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "w-full h-16 text-xl font-black uppercase tracking-tight rounded-2xl shadow-xl shadow-primary/20",
          onClick: handleCheckout,
          disabled: isSubmitting,
          children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }) : "CONCLUIR E RECEBER"
        }
      )
    ] })
  ] }) });
}
const BLOCK_META = {
  block: { label: "Bloqueio", icon: Ban, color: "text-red-500" },
  lunch: { label: "Almoço/Pausa", icon: Coffee, color: "text-orange-500" },
  vacation: { label: "Férias", icon: Plane, color: "text-blue-500" }
};
function ScheduleBlocksManager({ selectedDate, onChange }) {
  const [open, setOpen] = reactExports.useState(false);
  const [blocks, setBlocks] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [type, setType] = reactExports.useState("block");
  const [title, setTitle] = reactExports.useState("");
  const [startDate, setStartDate] = reactExports.useState(
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : format(/* @__PURE__ */ new Date(), "yyyy-MM-dd")
  );
  const [startTime, setStartTime] = reactExports.useState("12:00");
  const [endDate, setEndDate] = reactExports.useState(
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : format(/* @__PURE__ */ new Date(), "yyyy-MM-dd")
  );
  const [endTime, setEndTime] = reactExports.useState("13:00");
  const load = async () => {
    setLoading(true);
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) return setLoading(false);
    const { data } = await supabase.from("schedule_blocks").select("*").eq("user_id", user.id).gte("end_time", (/* @__PURE__ */ new Date()).toISOString()).order("start_time");
    setBlocks(data || []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    if (open) load();
  }, [open]);
  const handleTypeChange = (t) => {
    setType(t);
    if (t === "vacation") {
      setStartTime("00:00");
      setEndTime("23:59");
      setTitle("Férias");
    } else if (t === "lunch") {
      setStartTime("12:00");
      setEndTime("13:00");
      setTitle("Horário de almoço");
    } else {
      setTitle("");
    }
  };
  const create = async () => {
    if (!title.trim()) return toast.error("Informe um título");
    setSaving(true);
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");
      const start = /* @__PURE__ */ new Date(`${startDate}T${startTime}`);
      const end = /* @__PURE__ */ new Date(`${endDate}T${endTime}`);
      if (end <= start) throw new Error("Fim deve ser depois do início");
      const { error } = await supabase.from("schedule_blocks").insert({
        user_id: user.id,
        title: title.trim(),
        block_type: type,
        start_time: start.toISOString(),
        end_time: end.toISOString()
      });
      if (error) throw error;
      toast.success("Bloqueio criado");
      setTitle("");
      load();
      onChange?.();
    } catch (e) {
      toast.error(e.message || "Erro ao criar bloqueio");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (id) => {
    const { error } = await supabase.from("schedule_blocks").delete().eq("id", id);
    if (error) return toast.error("Erro ao remover");
    toast.success("Bloqueio removido");
    load();
    onChange?.();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        className: "h-14 px-6 font-black text-base rounded-xl gap-2 border-orange-500/30 text-orange-500 hover:bg-orange-500/5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5" }),
          "BLOQUEAR"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[520px] p-6 rounded-3xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-black uppercase tracking-tight italic", children: "Bloqueios de Agenda" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: Object.keys(BLOCK_META).map((t) => {
          const M = BLOCK_META[t];
          const Icon = M.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleTypeChange(t),
              className: `p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${type === t ? "border-primary bg-primary/5" : "border-border"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${M.color}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: M.label })
              ]
            },
            t
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest", children: "Título" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: title,
              onChange: (e) => setTitle(e.target.value),
              className: "h-11",
              placeholder: "Ex: Compromisso pessoal"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest", children: "Início" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: startDate,
                onChange: (e) => setStartDate(e.target.value),
                className: "h-11"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "time",
                value: startTime,
                onChange: (e) => setStartTime(e.target.value),
                className: "h-11"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest", children: "Fim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: endDate,
                onChange: (e) => setEndDate(e.target.value),
                className: "h-11"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "time",
                value: endTime,
                onChange: (e) => setEndTime(e.target.value),
                className: "h-11"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: create,
            disabled: saving,
            className: "w-full h-12 font-black uppercase rounded-xl",
            children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : "CRIAR BLOQUEIO"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-widest text-muted-foreground mb-3", children: "Bloqueios Ativos" }),
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : blocks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhum bloqueio ativo." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-60 overflow-y-auto", children: blocks.map((b) => {
            const M = BLOCK_META[b.block_type] || BLOCK_META.block;
            const Icon = M.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 p-3 rounded-xl border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${M.color} shrink-0` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate", children: b.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      format(new Date(b.start_time), "dd/MM HH:mm", { locale: ptBR }),
                      " →",
                      " ",
                      format(new Date(b.end_time), "dd/MM HH:mm", { locale: ptBR })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "h-8 w-8 text-destructive",
                      onClick: () => remove(b.id),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ]
              },
              b.id
            );
          }) })
        ] })
      ] })
    ] })
  ] });
}
function AgendaPageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AgendaPage, {}) });
}
const STATUS_META = {
  scheduled: {
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    ring: "ring-amber-500/20",
    bg: "bg-amber-500/10"
  },
  in_progress: {
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-400",
    ring: "ring-blue-500/20",
    bg: "bg-blue-500/10"
  },
  completed: {
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
    ring: "ring-border",
    bg: "bg-secondary"
  },
  cancelled: {
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
    ring: "ring-red-500/20",
    bg: "bg-red-500/10"
  }
};
function currency(v) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2
  }).format(v || 0);
}
function AgendaPage() {
  const {
    t
  } = useTranslation();
  const [appointments, setAppointments] = reactExports.useState([]);
  const [blocks, setBlocks] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [selectedDate, setSelectedDate] = reactExports.useState(startOfToday());
  const [isAddDialogOpen, setIsAddDialogOpen] = reactExports.useState(false);
  const [editingAppointment, setEditingAppointment] = reactExports.useState(null);
  const [checkoutAppointment, setCheckoutAppointment] = reactExports.useState(null);
  const [now, setNow] = reactExports.useState(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);
  reactExports.useEffect(() => {
    const t2 = setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
    return () => clearInterval(t2);
  }, []);
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);
      const {
        data,
        error
      } = await supabase.from("appointments").select(`*, client:clients(id, name, phone, created_at), service:services(id, name, price, duration_minutes)`).gte("start_time", startOfDay.toISOString()).lte("start_time", endOfDay.toISOString()).order("start_time", {
        ascending: true
      });
      if (error) throw error;
      setAppointments(data || []);
      const authRes = await supabase.auth.getUser();
      const user = authRes?.data?.user;
      if (user) {
        const {
          data: blockData
        } = await supabase.from("schedule_blocks").select("*").eq("user_id", user.id).lte("start_time", endOfDay.toISOString()).gte("end_time", startOfDay.toISOString()).order("start_time");
        setBlocks(blockData || []);
      } else {
        setBlocks([]);
      }
    } catch (error) {
      toast.error("Erro ao carregar agenda");
    } finally {
      setLoading(false);
    }
  };
  const setStatus = async (id, status, successMsg) => {
    try {
      const {
        error
      } = await supabase.from("appointments").update({
        status
      }).eq("id", id);
      if (error) throw error;
      toast.success(successMsg);
      fetchAppointments();
    } catch {
      toast.error("Erro ao atualizar");
    }
  };
  const deleteAppointment = async (id) => {
    try {
      const {
        error
      } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw error;
      toast.success("Agendamento removido");
      fetchAppointments();
    } catch {
      toast.error("Erro ao remover");
    }
  };
  const nextDay = () => setSelectedDate(addDays(selectedDate, 1));
  const prevDay = () => setSelectedDate(addDays(selectedDate, -1));
  const goToday = () => setSelectedDate(startOfToday());
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 6
    }
  }));
  const handleDragEnd = async (event) => {
    const {
      active,
      over
    } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = appointments.findIndex((a2) => a2.id === active.id);
    const newIndex = appointments.findIndex((a2) => a2.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const a = appointments[oldIndex];
    const b = appointments[newIndex];
    setAppointments(arrayMove(appointments, oldIndex, newIndex));
    try {
      const {
        error: e1
      } = await supabase.from("appointments").update({
        start_time: b.start_time,
        end_time: b.end_time
      }).eq("id", a.id);
      const {
        error: e2
      } = await supabase.from("appointments").update({
        start_time: a.start_time,
        end_time: a.end_time
      }).eq("id", b.id);
      if (e1 || e2) throw e1 || e2;
      toast.success("Horários reordenados");
      fetchAppointments();
    } catch {
      toast.error("Erro ao reordenar");
      fetchAppointments();
    }
  };
  const viewingToday = isSameDay(selectedDate, startOfToday());
  const summary = reactExports.useMemo(() => {
    const active = appointments.filter((a) => a.status !== "cancelled");
    const total = active.length;
    const pending = active.filter((a) => a.status === "scheduled").length;
    const done = active.filter((a) => a.status === "completed").length;
    const revenue = active.filter((a) => a.status === "completed").reduce((s, a) => s + (a.service?.price || 0), 0);
    const nextUp = active.find((a) => (a.status === "scheduled" || a.status === "in_progress") && new Date(a.start_time) >= now);
    return {
      total,
      pending,
      done,
      revenue,
      nextUp
    };
  }, [appointments, now]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-16 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-3xl md:text-4xl font-bold tracking-tight", children: "Agenda" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm md:text-base text-muted-foreground", children: viewingToday ? `Hoje · ${format(now, "HH:mm")}` : "Organize seus atendimentos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleBlocksManager, { selectedDate, onChange: fetchAppointments }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "hidden md:inline-flex h-10 rounded-xl gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/barber-mode", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 fill-current" }),
          "Modo Trabalho"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isAddDialogOpen, onOpenChange: setIsAddDialogOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-10 rounded-xl gap-1.5 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Novo horário" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] rounded-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-semibold tracking-tight", children: "Novo agendamento" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentForm, { defaultDate: selectedDate, onSuccess: () => {
              setIsAddDialogOpen(false);
              fetchAppointments();
            }, onCancel: () => setIsAddDialogOpen(false) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Atendimentos", value: summary.total.toString(), hint: `${summary.done} concluídos`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" }), accent: "bg-primary/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Aguardando", value: summary.pending.toString(), hint: "Confirmar clientes", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-amber-600" }), accent: "bg-amber-500/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Faturamento", value: currency(summary.revenue), hint: "Do dia (concluídos)", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-emerald-600" }), accent: "bg-emerald-500/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Próximo", value: summary.nextUp ? format(new Date(summary.nextUp.start_time), "HH:mm") : "—", hint: summary.nextUp ? summary.nextUp.client?.name || summary.nextUp.customer_name || "Cliente" : "Nada em seguida", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-blue-600" }), accent: "bg-blue-500/10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: prevDay, className: "h-10 w-10 rounded-xl", "aria-label": "Dia anterior", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold capitalize tracking-tight", children: format(selectedDate, "EEEE, dd 'de' MMMM", {
          locale: ptBR
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 flex items-center gap-2", children: viewingToday ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-primary" })
          ] }),
          "Hoje · ",
          format(now, "HH:mm")
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: goToday, className: "text-xs font-medium text-primary hover:underline", children: "Voltar para hoje" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: nextDay, className: "h-10 w-10 rounded-xl", "aria-label": "Próximo dia", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" }) })
    ] }),
    blocks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: blocks.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-4 w-4 text-orange-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold", children: b.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          format(new Date(b.start_time), "HH:mm"),
          " –",
          " ",
          format(new Date(b.end_time), "HH:mm"),
          " ·",
          " ",
          b.block_type === "vacation" ? "Férias" : b.block_type === "lunch" ? "Pausa" : "Bloqueio"
        ] })
      ] })
    ] }, b.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 animate-pulse", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-2xl bg-secondary" }, i)) }) : appointments.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: appointments.map((a) => a.id), strategy: verticalListSortingStrategy, children: appointments.map((apt, idx) => {
      const isNext = summary.nextUp?.id === apt.id && viewingToday;
      const showNowLine = viewingToday && idx === 0 && isToday(selectedDate) && new Date(apt.start_time) > now;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        showNowLine && /* @__PURE__ */ jsxRuntimeExports.jsx(NowIndicator, { time: now }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SortableRow, { id: apt.id, children: (dragHandle) => /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentCard, { apt, dragHandle, isNext, onStart: () => setStatus(apt.id, "in_progress", "Atendimento iniciado"), onCheckout: () => setCheckoutAppointment(apt), onEdit: () => setEditingAppointment(apt), onCancel: () => setStatus(apt.id, "cancelled", "Agendamento cancelado"), onDelete: () => deleteAppointment(apt.id) }) })
      ] }, apt.id);
    }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-6 w-6 text-muted-foreground/50" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold tracking-tight", children: "Agenda livre" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Nenhum atendimento para este dia." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setIsAddDialogOpen(true), className: "mt-6 rounded-xl gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Criar agendamento"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editingAppointment, onOpenChange: (open) => !open && setEditingAppointment(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] rounded-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-semibold tracking-tight", children: "Editar horário" }) }),
      editingAppointment && /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentForm, { appointment: editingAppointment, onSuccess: () => {
        setEditingAppointment(null);
        fetchAppointments();
      }, onCancel: () => setEditingAppointment(null) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutDialog, { appointment: checkoutAppointment, open: !!checkoutAppointment, onOpenChange: (open) => !open && setCheckoutAppointment(null), onSuccess: () => {
      setCheckoutAppointment(null);
      fetchAppointments();
    } })
  ] });
}
function NowIndicator({
  time
}) {
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2", "aria-label": "Horário atual", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-primary tabular-nums", children: format(time, "HH:mm") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-primary via-primary/40 to-transparent" })
  ] });
}
function StatCard({
  label,
  value,
  hint,
  icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group rounded-2xl border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-9 w-9 place-items-center rounded-xl transition-transform group-hover:scale-105 ${accent}`, children: icon }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold tracking-tight tabular-nums", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: hint })
  ] });
}
function AppointmentCard({
  apt,
  dragHandle,
  isNext,
  onStart,
  onCheckout,
  onEdit,
  onCancel,
  onDelete
}) {
  const {
    t
  } = useTranslation();
  const status = apt.status || "scheduled";
  const meta = STATUS_META[status];
  const isDone = status === "completed" || status === "cancelled";
  const clientName = apt.client?.name || apt.customer_name || "Cliente avulso";
  const phone = apt.client?.phone || apt.customer_phone || "";
  const isNew = apt.client?.created_at && Date.now() - new Date(apt.client.created_at).getTime() < 1e3 * 60 * 60 * 24 * 30;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${isNext ? "border-primary/40 ring-2 ring-primary/15" : status === "cancelled" ? "border-border opacity-60" : status === "completed" ? "border-border opacity-80" : "border-border hover:border-primary/30"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex", children: dragHandle }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex min-w-[92px] flex-col items-center justify-center px-4 py-5 ${isNext ? "bg-primary/5" : "bg-secondary/40"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-2xl font-bold tabular-nums leading-none tracking-tight ${isNext ? "text-primary" : ""}`, children: format(new Date(apt.start_time), "HH:mm") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: [
        apt.service?.duration_minutes || 30,
        " min"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-base font-semibold tracking-tight", children: clientName }),
        isNext && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary ring-1 ring-primary/20", children: "Próximo" }),
        isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/20", children: "Novo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-3.5 w-3.5" }),
          apt.service?.name || "Serviço"
        ] }),
        apt.service?.price ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 font-medium text-foreground/80 tabular-nums", children: currency(apt.service.price) }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${meta.bg} ${meta.text} ${meta.ring}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${meta.dot}` }),
          status === "scheduled" ? "Aguardando" : status === "in_progress" ? "Em atendimento" : status === "completed" ? "Concluído" : "Cancelado"
        ] })
      ] }),
      apt.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 line-clamp-1 text-xs text-muted-foreground/80 italic", children: [
        "“",
        apt.notes,
        "”"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-3 sm:pr-4", children: [
      !isDone && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        status === "scheduled" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onStart, size: "sm", variant: "ghost", className: "h-9 rounded-xl gap-1.5 text-blue-600 hover:bg-blue-500/10 hover:text-blue-600", title: "Iniciar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 fill-current" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden lg:inline", children: "Iniciar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onCheckout, size: "sm", variant: status === "in_progress" ? "default" : "ghost", className: `h-9 rounded-xl gap-1.5 ${status === "in_progress" ? "bg-emerald-600 text-white hover:bg-emerald-700" : "text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700"}`, title: "Concluir", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden lg:inline", children: "Concluir" })
        ] }),
        phone && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "icon", variant: "ghost", className: "h-9 w-9 rounded-xl text-emerald-600 hover:bg-emerald-500/10", title: "WhatsApp", "aria-label": "Enviar mensagem no WhatsApp", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: waLink(apt, "confirm") || `https://wa.me/55${phone.replace(/\D/g, "")}`, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onEdit, size: "icon", variant: "ghost", className: "h-9 w-9 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground", title: "Editar", "aria-label": "Editar horário", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-9 w-9 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-600", title: "Cancelar", "aria-label": "Cancelar horário", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Cancelar horário?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "O horário será marcado como cancelado na sua agenda." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-xl", children: "Voltar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: onCancel, children: "Cancelar horário" })
            ] })
          ] })
        ] })
      ] }),
      isDone && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-9 w-9 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-600 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity", title: "Remover", "aria-label": "Remover horário concluído", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remover registro?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Este agendamento será removido permanentemente do histórico." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-xl", children: "Cancelar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: onDelete, children: "Remover" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function SortableRow({
  id,
  children
}) {
  const {
    t
  } = useTranslation();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : "auto"
  };
  const handle = /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", ...attributes, ...listeners, className: "flex items-center justify-center px-2 text-muted-foreground/50 hover:text-muted-foreground cursor-grab active:cursor-grabbing touch-none", "aria-label": "Arrastar para reordenar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: setNodeRef, style, children: children(handle) });
}
export {
  AgendaPageWrapper as component
};
