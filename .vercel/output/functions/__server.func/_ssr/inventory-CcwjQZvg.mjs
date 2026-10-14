import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, d as Button, I as Input } from "./router-DONcpGkq.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-2PAumXzc.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-B1Aan_F-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-D_QTIlY3.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { P as Plus, O as Package, m as TriangleAlert, av as ShoppingCart, p as TrendingUp, r as Search, al as Pencil, T as Trash2, L as LoaderCircle } from "../_libs/lucide-react.mjs";
import { o as object, n as number, s as string } from "../_libs/zod.mjs";
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
import "../_libs/i18next.mjs";
function ProductForm({ product, onSuccess, onCancel }) {
  const { t } = useTranslation();
  const isEditing = !!product;
  const productSchema = object({
    name: string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    sku: string().optional(),
    description: string().optional(),
    current_stock: number().min(0, "Estoque não pode ser negativo"),
    min_stock: number().min(0, "Mínimo não pode ser negativo"),
    purchase_price: number().min(0, "Preço de custo não pode ser negativo"),
    selling_price: number().min(0, "Preço de venda não pode ser negativo")
  });
  const form = useForm({
    resolver: u(productSchema),
    defaultValues: {
      name: product?.name || "",
      sku: product?.sku || "",
      description: product?.description || "",
      current_stock: product?.current_stock || 0,
      min_stock: product?.min_stock || 5,
      purchase_price: product?.purchase_price || 0,
      selling_price: product?.selling_price || 0
    }
  });
  const onSubmit = async (values) => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");
      const payload = {
        ...values,
        user_id: user.id,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (isEditing) {
        const { error } = await supabase.from("products").update(payload).eq("id", product.id);
        if (error) throw error;
        toast.success("Produto atualizado!");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("Produto criado!");
      }
      onSuccess();
    } catch (error) {
      toast.error(error.message || "Erro ao salvar produto");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "name",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Nome do Produto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Ex: Pomada Modeladora",
              ...field,
              className: "h-12 text-lg font-bold"
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
          name: "sku",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "SKU / Código" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Código de barras ou interno",
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
          name: "min_stock",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Estoque Mínimo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", ...field, className: "h-12 text-lg font-bold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "purchase_price",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Preço de Custo (R$)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", ...field, className: "h-12 text-lg font-bold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "selling_price",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Preço de Venda (R$)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", ...field, className: "h-12 text-lg font-bold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "current_stock",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Estoque Atual (Unidades)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", ...field, className: "h-12 text-lg font-bold" }) }),
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
          children: "CANCELAR"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: form.formState.isSubmitting,
          className: "flex-1 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20",
          children: form.formState.isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : isEditing ? "SALVAR" : "CADASTRAR PRODUTO"
        }
      )
    ] })
  ] }) });
}
function InventoryPageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InventoryPage, {}) });
}
function InventoryPage() {
  const {
    t
  } = useTranslation();
  const [products, setProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = reactExports.useState(false);
  const [editingProduct, setEditingProduct] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.from("products").select("*").order("name", {
        ascending: true
      });
      if (error) throw error;
      setProducts(data || []);
    } catch {
      toast.error("Erro ao carregar estoque");
    } finally {
      setLoading(false);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const {
        error
      } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      toast.success("Produto removido");
      fetchProducts();
    } catch {
      toast.error("Erro ao remover produto");
    }
  };
  const priceOf = (p) => Number(p.sale_price ?? p.selling_price ?? 0);
  const costOf = (p) => Number(p.cost_price ?? p.purchase_price ?? 0);
  const kpis = reactExports.useMemo(() => {
    const units = products.reduce((a, p) => a + Number(p.current_stock || 0), 0);
    const lowCount = products.filter((p) => Number(p.current_stock || 0) <= Number(p.min_stock || 0) && Number(p.current_stock || 0) > 0).length;
    const outCount = products.filter((p) => Number(p.current_stock || 0) <= 0).length;
    const stockValue = products.reduce((a, p) => a + costOf(p) * Number(p.current_stock || 0), 0);
    const potentialRevenue = products.reduce((a, p) => a + priceOf(p) * Number(p.current_stock || 0), 0);
    return {
      units,
      lowCount,
      outCount,
      stockValue,
      potentialProfit: potentialRevenue - stockValue
    };
  }, [products]);
  const filtered = reactExports.useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      const matchesTerm = !term || p.name?.toLowerCase().includes(term) || p.sku && String(p.sku).toLowerCase().includes(term);
      if (!matchesTerm) return false;
      const cur = Number(p.current_stock || 0);
      const min = Number(p.min_stock || 0);
      if (filter === "low") return cur > 0 && cur <= min;
      if (filter === "out") return cur <= 0;
      if (filter === "healthy") return cur > min;
      return true;
    });
  }, [products, searchTerm, filter]);
  const fmt = (n) => n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
  const filterOpts = [{
    v: "all",
    label: "Todos",
    count: products.length
  }, {
    v: "low",
    label: "Baixo",
    count: kpis.lowCount
  }, {
    v: "out",
    label: "Sem estoque",
    count: kpis.outCount
  }, {
    v: "healthy",
    label: "Em dia"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-[28px] font-semibold tracking-tight", children: "Estoque" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Controle de produtos e materiais." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isAddDialogOpen, onOpenChange: setIsAddDialogOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "h-10 rounded-xl gap-2 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Novo produto"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] p-6 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-lg font-semibold", children: "Novo produto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProductForm, { onSuccess: () => {
            setIsAddDialogOpen(false);
            fetchProducts();
          }, onCancel: () => setIsAddDialogOpen(false) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Total de itens", value: String(kpis.units), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Estoque baixo", value: String(kpis.lowCount), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }), tone: kpis.lowCount > 0 ? "warning" : "neutral" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Valor em estoque", value: fmt(kpis.stockValue), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Lucro potencial", value: fmt(kpis.potentialProfit), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }), tone: kpis.potentialProfit >= 0 ? "positive" : "negative" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar por nome ou SKU...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-9 h-10 rounded-xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex bg-secondary/60 p-1 rounded-xl border border-border overflow-x-auto no-scrollbar", children: filterOpts.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(o.v), className: `px-3 h-8 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filter === o.v ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
        o.label,
        typeof o.count === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-[10px] text-muted-foreground", children: [
          "(",
          o.count,
          ")"
        ] })
      ] }, o.v)) })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 rounded-2xl bg-secondary/40 animate-pulse" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: products.length === 0 ? "Nenhum produto cadastrado" : "Nenhum resultado encontrado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: products.length === 0 ? "Cadastre seu primeiro produto para começar." : "Tente mudar os filtros ou a busca." }),
      products.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setIsAddDialogOpen(true), className: "mt-5 h-10 rounded-xl", children: "Cadastrar produto" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-3", children: filtered.map((p) => {
      const cur = Number(p.current_stock || 0);
      const min = Number(p.min_stock || 0);
      const price = priceOf(p);
      const cost = costOf(p);
      const margin = price > 0 ? (price - cost) / price * 100 : 0;
      const out = cur <= 0;
      const low = !out && cur <= min;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: `group rounded-2xl border bg-card p-4 md:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${out ? "border-red-500/30" : low ? "border-amber-500/30" : "border-border"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto,minmax(0,1fr),auto] items-center gap-3 md:gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-11 w-11 shrink-0 rounded-xl flex items-center justify-center ${out ? "bg-red-500/10 text-red-600 dark:text-red-500" : low ? "bg-amber-500/10 text-amber-600 dark:text-amber-500" : "bg-secondary text-muted-foreground group-hover:text-primary"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm md:text-[15px] font-semibold truncate", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { out, low })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: [
              "SKU: ",
              p.sku || "—",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5 opacity-40", children: "•" }),
              cur,
              " UN",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5 opacity-40", children: "•" }),
              "Mín. ",
              min
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-6 pr-2 tabular-nums", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "VENDA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: fmt(price) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "MARGEM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-sm font-semibold ${margin >= 30 ? "text-emerald-600 dark:text-emerald-500" : margin >= 15 ? "text-amber-600 dark:text-amber-500" : "text-red-600 dark:text-red-500"}`, children: [
                margin.toFixed(0),
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-start-3 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Editar produto", className: "h-9 w-9 rounded-lg hover:bg-secondary", onClick: () => setEditingProduct(p), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Excluir produto", className: "h-9 w-9 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-2xl p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir produto?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: `Tem certeza que deseja excluir o produto "${p.name}"? Esta ação não pode ser desfeita.` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-xl", children: "Cancelar" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: () => deleteProduct(p.id), children: "Excluir" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:hidden mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs tabular-nums", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "VENDA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: fmt(price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "MARGEM" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-semibold ${margin >= 30 ? "text-emerald-600 dark:text-emerald-500" : margin >= 15 ? "text-amber-600 dark:text-amber-500" : "text-red-600 dark:text-red-500"}`, children: [
            margin.toFixed(0),
            "%"
          ] })
        ] })
      ] }) }, p.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editingProduct, onOpenChange: (open) => !open && setEditingProduct(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] p-6 rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-lg font-semibold", children: "Editar produto" }) }),
      editingProduct && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductForm, { product: editingProduct, onSuccess: () => {
        setEditingProduct(null);
        fetchProducts();
      }, onCancel: () => setEditingProduct(null) })
    ] }) })
  ] });
}
function Kpi({
  label,
  value,
  icon,
  tone = "neutral"
}) {
  const cls = tone === "positive" ? "text-emerald-600 dark:text-emerald-500" : tone === "negative" ? "text-red-600 dark:text-red-500" : tone === "warning" ? "text-amber-600 dark:text-amber-500" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl md:text-2xl font-semibold tracking-tight tabular-nums ${cls}`, children: value })
  ] });
}
function StatusPill({
  out,
  low
}) {
  const {
    t
  } = useTranslation();
  if (out) return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-1.5 h-5 rounded-md bg-red-500/10 text-red-600 dark:text-red-500 text-[10px] font-medium", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }),
    " ESGOTADO"
  ] });
  if (low) return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-1.5 h-5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[10px] font-medium", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }),
    " BAIXO ESTOQUE"
  ] });
  return null;
}
export {
  InventoryPageWrapper as component
};
