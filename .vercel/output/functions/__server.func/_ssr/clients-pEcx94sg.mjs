import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, d as Button, I as Input, A as Avatar, a as AvatarImage, b as AvatarFallback, T as Textarea, C as Card } from "./router-DONcpGkq.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-2PAumXzc.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-B1Aan_F-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-D_QTIlY3.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { d as differenceInDays, b as parseISO, a as format, p as ptBR } from "../_libs/date-fns.mjs";
import { P as Plus, U as Users, s as Crown, l as Sparkles, R as RefreshCcw, r as Search, X, a9 as User, L as LoaderCircle, at as Upload, m as TriangleAlert, af as Phone, J as Calendar, ak as Cake, M as MessageCircle, Y as Eye, al as Pencil, T as Trash2, aD as ClipboardList, p as TrendingUp, F as Scissors } from "../_libs/lucide-react.mjs";
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
import "./label-nYamNITy.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/i18next.mjs";
const clientSchema = object({
  name: string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: string().optional(),
  birthday: string().optional(),
  instagram: string().optional(),
  notes: string().optional()
});
function ClientForm({ client, onSuccess, onCancel }) {
  const isEditing = !!client;
  const [photoUrl, setPhotoUrl] = reactExports.useState(client?.photo_url || null);
  const [uploading, setUploading] = reactExports.useState(false);
  const form = useForm({
    resolver: u(clientSchema),
    defaultValues: {
      name: client?.name || "",
      phone: client?.phone || "",
      birthday: client?.birthday || "",
      instagram: client?.instagram || "",
      notes: client?.notes || ""
    }
  });
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");
      const ext = file.name.split(".").pop();
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("client-photos").upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: signed } = await supabase.storage.from("client-photos").createSignedUrl(path, 60 * 60 * 24 * 365);
      setPhotoUrl(signed?.signedUrl || path);
      toast.success("Foto enviada");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Erro ao enviar foto");
    } finally {
      setUploading(false);
    }
  };
  const onSubmit = async (values) => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");
      const payload = {
        ...values,
        user_id: user.id,
        birthday: values.birthday || null,
        photo_url: photoUrl,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (isEditing) {
        const { error } = await supabase.from("clients").update(payload).eq("id", client.id);
        if (error) throw error;
        toast.success("Cliente atualizado com sucesso");
      } else {
        const { error } = await supabase.from("clients").insert(payload);
        if (error) throw error;
        toast.success("Cliente cadastrado com sucesso");
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error(error.message || "Erro ao salvar cliente");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-20 w-20 border-2 border-border", children: [
        photoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: photoUrl, alt: "Foto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8 text-muted-foreground" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: handlePhotoUpload,
            disabled: uploading
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-border bg-background hover:bg-secondary font-black uppercase text-xs tracking-widest", children: [
          uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
          photoUrl ? "Trocar Foto" : "Adicionar Foto"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "name",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Nome Completo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Ex: João Silva", ...field, className: "h-12 text-lg font-bold" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "phone",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "WhatsApp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "(00) 00000-0000",
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
          name: "birthday",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Aniversário" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...field, className: "h-12 text-lg font-bold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "instagram",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Instagram" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "@usuario", ...field, className: "h-12 text-lg font-bold" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "notes",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Observações" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Ex: Prefere corte baixo, alérgico a tal produto...",
              ...field,
              className: "min-h-[80px] text-base font-medium"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
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
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: form.formState.isSubmitting,
          className: "flex-1 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20",
          children: form.formState.isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : isEditing ? "SALVAR" : "CADASTRAR"
        }
      )
    ] })
  ] }) });
}
function ClientDetails({ client }) {
  const [history, setHistory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase.from("appointments").select("*, service:services(name, price)").eq("client_id", client.id).eq("status", "completed").order("start_time", { ascending: false });
      setHistory(data || []);
      setLoading(false);
    };
    fetchHistory();
  }, [client.id]);
  const sendWhatsApp = () => {
    const phone = client.phone || "";
    window.open(`https://wa.me/55${phone.replace(/\D/g, "")}`, "_blank");
  };
  const favoriteService = history.length > 0 ? Object.entries(
    history.reduce((acc, curr) => {
      const name = curr.service?.name || "Outros";
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0][0] : "Nenhum";
  const frequency = history.length > 1 ? (differenceInDays(
    parseISO(history[0].start_time),
    parseISO(history[history.length - 1].start_time)
  ) / (history.length - 1)).toFixed(0) : "30";
  const ticketMedio = history.length > 0 ? history.reduce((acc, curr) => acc + (curr.service?.price || 0), 0) / history.length : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center p-6 bg-secondary/30 rounded-3xl border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-black mb-4 border-4 border-white shadow-xl", children: client.name.charAt(0) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black uppercase italic tracking-tighter", children: client.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 text-muted-foreground font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
        client.phone || "Sem telefone"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: sendWhatsApp,
          className: "mt-6 rounded-2xl h-12 px-8 font-black gap-2 shadow-lg shadow-primary/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
            "CONTATO VIA WHATSAPP"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-card border border-border rounded-2xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1", children: "Total Gasto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-black text-green-500", children: [
          "R$ ",
          (client.total_spent || 0).toLocaleString("pt-BR")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-card border border-border rounded-2xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1", children: "Visitas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-black", children: history.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-card border border-border rounded-2xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1", children: "Ticket Médio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-black", children: [
          "R$ ",
          ticketMedio.toLocaleString("pt-BR")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-card border border-border rounded-2xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1", children: "Frequência" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-black", children: [
          frequency,
          " dias"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-card border border-border rounded-2xl shadow-sm col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1", children: "Serviço Favorito" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-black italic uppercase", children: favoriteService })
      ] })
    ] }),
    client.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-primary/5 border border-primary/10 rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 font-black text-sm uppercase italic text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4" }),
        "Observações"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium italic", children: client.notes })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-black uppercase italic tracking-tight opacity-70 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }),
        "Histórico Recente"
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-secondary rounded-2xl" }, i)) }) : history.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: history.slice(0, 5).map((apt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between p-4 bg-card border border-border rounded-2xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-secondary flex items-center justify-center border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-5 w-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-sm uppercase", children: apt.service?.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-muted-foreground", children: format(parseISO(apt.start_time), "dd/MM/yyyy") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-black text-sm", children: [
              "R$ ",
              apt.service?.price?.toLocaleString("pt-BR")
            ] })
          ]
        },
        apt.id
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center py-8 text-muted-foreground italic font-medium", children: "Nenhum atendimento finalizado." })
    ] })
  ] });
}
function ClientsPageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientsPage, {}) });
}
const FILTERS = ["all", "vip", "active", "return", "inactive", "recurring", "new"];
const currency = (v) => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0
}).format(v || 0);
function ClientsPage() {
  const {
    t
  } = useTranslation();
  const [clients, setClients] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = reactExports.useState(false);
  const [editingClient, setEditingClient] = reactExports.useState(null);
  const [selectedClient, setSelectedClient] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchClients();
  }, []);
  const fetchClients = async () => {
    try {
      setLoading(true);
      const [clientsRes, apptsRes, membershipsRes] = await Promise.all([supabase.from("clients").select("*").order("name", {
        ascending: true
      }), supabase.from("appointments").select("client_id, status, start_time, service:services(price)"), supabase.from("customer_memberships").select("client_id, status, end_date")]);
      if (clientsRes.error) throw clientsRes.error;
      const appts = apptsRes.data || [];
      const memberships = membershipsRes.data || [];
      const now = /* @__PURE__ */ new Date();
      const vipSet = new Set(memberships.filter((m) => m.status === "active" && (!m.end_date || new Date(m.end_date) >= now)).map((m) => m.client_id));
      const byClient = {};
      for (const a of appts) {
        if (!a.client_id) continue;
        const entry = byClient[a.client_id] || (byClient[a.client_id] = {
          visits: 0,
          spent: 0,
          next: null
        });
        if (a.status === "completed") {
          entry.visits += 1;
          entry.spent += a.service?.price || 0;
        }
        if ((a.status === "scheduled" || a.status === "in_progress") && new Date(a.start_time) >= now) {
          if (!entry.next || new Date(a.start_time) < new Date(entry.next)) {
            entry.next = a.start_time;
          }
        }
      }
      const enriched = (clientsRes.data || []).map((c) => {
        const stats2 = byClient[c.id] || {
          visits: 0,
          spent: 0,
          next: null
        };
        const daysSince = c.last_visit ? differenceInDays(now, parseISO(c.last_visit)) : null;
        const isVip = vipSet.has(c.id);
        const isNew = differenceInDays(now, parseISO(c.created_at)) <= 30;
        const isRecurring = stats2.visits >= 3;
        const isInactive = daysSince === null ? true : daysSince > 60;
        const needsReturn = daysSince !== null && daysSince > 30 && daysSince <= 60;
        const totalSpent = Number(c.total_spent) || stats2.spent || 0;
        const avgTicket = stats2.visits > 0 ? totalSpent / stats2.visits : 0;
        return {
          id: c.id,
          name: c.name,
          phone: c.phone,
          birthday: c.birthday,
          notes: c.notes,
          last_visit: c.last_visit,
          total_spent: totalSpent,
          created_at: c.created_at,
          visits: stats2.visits,
          avgTicket,
          nextVisit: stats2.next,
          isVip,
          isNew,
          isRecurring,
          isInactive,
          needsReturn,
          raw: c
        };
      });
      setClients(enriched);
    } catch (error) {
      toast.error("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  };
  const deleteClient = async (id) => {
    try {
      const {
        error
      } = await supabase.from("clients").delete().eq("id", id);
      if (error) throw error;
      toast.success("Cliente removido");
      fetchClients();
    } catch {
      toast.error("Erro ao remover cliente");
    }
  };
  const stats = reactExports.useMemo(() => {
    const vip = clients.filter((c) => c.isVip).length;
    const inactive = clients.filter((c) => c.isInactive).length;
    const active = clients.length - inactive;
    const retention = clients.length > 0 ? Math.round(active / clients.length * 100) : 0;
    return {
      total: clients.length,
      vip,
      inactive,
      active,
      retention
    };
  }, [clients]);
  const filtered = reactExports.useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return clients.filter((c) => {
      if (term) {
        const t2 = c.name.toLowerCase() + " " + (c.phone || "");
        if (!t2.includes(term)) return false;
      }
      switch (filter) {
        case "vip":
          return c.isVip;
        case "active":
          return !c.isInactive;
        case "inactive":
          return c.isInactive;
        case "return":
          return c.needsReturn;
        case "recurring":
          return c.isRecurring;
        case "new":
          return c.isNew;
        default:
          return true;
      }
    });
  }, [clients, searchTerm, filter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-16 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-3xl md:text-4xl font-bold tracking-tight", children: "Clientes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm md:text-base text-muted-foreground", children: "Seu relacionamento em um só lugar." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isAddDialogOpen, onOpenChange: setIsAddDialogOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-10 rounded-xl gap-1.5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Novo cliente" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] rounded-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-semibold tracking-tight", children: "Novo cliente" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClientForm, { onSuccess: () => {
            setIsAddDialogOpen(false);
            fetchClients();
          }, onCancel: () => setIsAddDialogOpen(false) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total", value: stats.total.toString(), hint: "Base cadastrada", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" }), accent: "bg-primary/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "VIP", value: stats.vip.toString(), hint: "Com assinatura ativa", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 text-amber-600" }), accent: "bg-amber-500/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Ativos", value: stats.active.toString(), hint: "Visita nos últimos 60 dias", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-emerald-600" }), accent: "bg-emerald-500/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Retenção", value: `${stats.retention}%`, hint: `${stats.inactive} inativos`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "h-4 w-4 text-blue-600" }), accent: "bg-blue-500/10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar por nome ou telefone...", className: "h-11 rounded-2xl border-border bg-card pl-11 pr-10 text-sm shadow-sm", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }),
        searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSearchTerm(""), className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-secondary", "aria-label": "Limpar busca", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: FILTERS.map((key) => {
        const active = filter === key;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(key), className: `inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight transition-all ${active ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"}`, children: key === "all" ? "Todos" : key === "vip" ? "VIP" : key === "active" ? "Ativos" : key === "inactive" ? "Inativos" : key === "return" ? "Retornar" : key === "recurring" ? "Recorrentes" : "Novos" }, key);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 animate-pulse", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-2xl bg-secondary" }, i)) }) : filtered.length > 0 ? filtered.map((client) => /* @__PURE__ */ jsxRuntimeExports.jsx(ClientCard, { client, onView: () => setSelectedClient(client.raw), onEdit: () => setEditingClient(client.raw), onDelete: () => deleteClient(client.id) }, client.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { hasQuery: !!searchTerm || filter !== "all", onClear: () => {
      setSearchTerm("");
      setFilter("all");
    }, onNew: () => setIsAddDialogOpen(true) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editingClient, onOpenChange: (open) => !open && setEditingClient(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] rounded-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-semibold tracking-tight", children: "Editar cliente" }) }),
      editingClient && /* @__PURE__ */ jsxRuntimeExports.jsx(ClientForm, { client: editingClient, onSuccess: () => {
        setEditingClient(null);
        fetchClients();
      }, onCancel: () => setEditingClient(null) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedClient, onOpenChange: (open) => !open && setSelectedClient(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "sm:max-w-[640px] p-0 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto", children: selectedClient && /* @__PURE__ */ jsxRuntimeExports.jsx(ClientDetails, { client: selectedClient }) }) })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-9 w-9 place-items-center rounded-xl transition-transform group-hover:scale-105 ${accent}`, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold tracking-tight tabular-nums", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: hint })
  ] });
}
function Badge({
  color,
  icon,
  children
}) {
  const map = {
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20",
    emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20",
    orange: "bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-orange-500/20",
    red: "bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20",
    blue: "bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-blue-500/20"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${map[color]}`, children: [
    icon,
    children
  ] });
}
function ClientCard({
  client,
  onView,
  onEdit,
  onDelete
}) {
  const {
    t
  } = useTranslation();
  const initials = client.name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${client.isVip ? "border-amber-500/30 ring-1 ring-amber-500/10" : client.isInactive ? "border-border opacity-90" : "border-border hover:border-primary/30"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 p-5 md:flex-row md:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onView, className: "flex min-w-0 flex-1 items-center gap-4 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-base font-bold tracking-tight transition-transform group-hover:scale-105 ${client.isVip ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/25" : "bg-secondary text-primary"}`, children: client.isVip ? /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5" }) : initials }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-[15px] font-semibold tracking-tight", children: client.name }),
          client.isVip && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "amber", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" }), children: "VIP" }),
          client.isNew && !client.isVip && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "emerald", children: "Novo" }),
          client.isRecurring && !client.isVip && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "blue", children: "Recorrente" }),
          client.needsReturn && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "orange", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }), children: "Retornar" }),
          client.isInactive && !client.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "red", children: "Inativo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
          client.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
            client.phone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            client.last_visit ? `Última: ${format(parseISO(client.last_visit), "dd MMM", {
              locale: ptBR
            })}` : "Nunca visitou"
          ] }),
          client.nextVisit && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-primary font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            `Próxima: ${format(parseISO(client.nextVisit), "dd MMM 'às' HH:mm", {
              locale: ptBR
            })}`
          ] }),
          client.birthday && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Cake, { className: "h-3.5 w-3.5 text-pink-500" }),
            format(parseISO(client.birthday), "dd/MM")
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-6 pr-2 text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Visitas", value: client.visits.toString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Ticket médio", value: client.avgTicket > 0 ? currency(client.avgTicket) : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Total gasto", value: client.total_spent > 0 ? currency(client.total_spent) : "—" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 md:pl-2 md:border-l md:border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "icon", variant: "ghost", className: "h-9 w-9 rounded-xl text-primary hover:bg-primary/10", title: "Agendar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/agenda", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }) }) }),
      client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "icon", variant: "ghost", className: "h-9 w-9 rounded-xl text-emerald-600 hover:bg-emerald-500/10", title: "WhatsApp", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/55${client.phone.replace(/\D/g, "")}`, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onView, size: "icon", variant: "ghost", className: "h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary", title: "Ver detalhes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onEdit, size: "icon", variant: "ghost", className: "h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary", title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-9 w-9 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-600", title: "Remover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir cliente?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "O cliente e seu histórico serão removidos permanentemente." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-xl", children: "Cancelar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: onDelete, children: "Excluir" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function Metric({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold tabular-nums", children: value })
  ] });
}
function EmptyState({
  hasQuery,
  onClear,
  onNew
}) {
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-16 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 text-muted-foreground/50" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold tracking-tight", children: hasQuery ? "Nenhum cliente encontrado" : "Sua base está vazia" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: hasQuery ? "Ajuste a busca ou os filtros ativos." : "Cadastre seu primeiro cliente para começar." }),
    hasQuery ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onClear, variant: "outline", className: "mt-6 rounded-xl gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      "Limpar filtros"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onNew, className: "mt-6 rounded-xl gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      "Cadastrar cliente"
    ] })
  ] });
}
export {
  ClientsPageWrapper as component
};
