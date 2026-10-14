import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, d as Button, I as Input, T as Textarea } from "./router-DONcpGkq.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-2PAumXzc.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-B1Aan_F-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-D_QTIlY3.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C6am6R5Y.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { P as Plus, ao as Wallet, p as TrendingUp, l as Sparkles, aw as ArrowDownRight, a1 as Percent, F as Scissors, m as TriangleAlert, O as Package, D as DollarSign, y as ArrowUpRight, T as Trash2, ax as Receipt, r as Search, ay as Minus, L as LoaderCircle } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, d as Area, B as BarChart, a as Bar } from "../_libs/recharts.mjs";
import { o as object, s as string, _ as _enum, n as number } from "../_libs/zod.mjs";
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
import "../_libs/i18next.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const financeSchema = object({
  amount: number().min(0.01, "Valor deve ser maior que zero"),
  type: _enum(["income", "expense"]),
  category: string().min(1, "Selecione uma categoria"),
  description: string().min(1, "Descrição é obrigatória"),
  date: string().min(1, "Selecione uma data")
});
const priceOf = (p) => Number(p.selling_price ?? p.sale_price ?? 0) || 0;
const costOf = (p) => Number(p.cost_price ?? p.purchase_price ?? 0) || 0;
function FinanceForm({ onSuccess, onCancel }) {
  const [origin, setOrigin] = reactExports.useState("service");
  const [products, setProducts] = reactExports.useState([]);
  const [cart, setCart] = reactExports.useState([]);
  const [search, setSearch] = reactExports.useState("");
  const [paymentMethod, setPaymentMethod] = reactExports.useState("pix");
  const [productNote, setProductNote] = reactExports.useState("");
  const [productDate, setProductDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [submittingProducts, setSubmittingProducts] = reactExports.useState(false);
  const form = useForm({
    resolver: u(financeSchema),
    defaultValues: {
      amount: 0,
      type: "income",
      category: "service",
      description: "",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    }
  });
  reactExports.useEffect(() => {
    if (origin !== "product" || products.length > 0) return;
    (async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("products").select(
        "id, name, current_stock, min_stock, sale_price, selling_price, cost_price, purchase_price"
      ).eq("user_id", user.id).order("name");
      setProducts(data || []);
    })();
  }, [origin, products.length]);
  const filteredProducts = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products.slice(0, 8);
    return products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
  }, [products, search]);
  const cartTotal = reactExports.useMemo(
    () => cart.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0),
    [cart]
  );
  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === p.id);
      if (existing) {
        if (existing.quantity + 1 > p.current_stock) {
          toast.error(`Estoque insuficiente. Disponível: ${p.current_stock}`);
          return prev;
        }
        return prev.map((i) => i.productId === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      if (p.current_stock < 1) {
        toast.error("Estoque insuficiente. Disponível: 0");
        return prev;
      }
      return [
        ...prev,
        {
          productId: p.id,
          name: p.name,
          quantity: 1,
          unitPrice: priceOf(p),
          stock: p.current_stock,
          minStock: p.min_stock,
          cost: costOf(p)
        }
      ];
    });
    setSearch("");
  };
  const updateQty = (id, delta) => {
    setCart(
      (prev) => prev.map((i) => {
        if (i.productId !== id) return i;
        const next = i.quantity + delta;
        if (next > i.stock) {
          toast.error(`Estoque insuficiente. Disponível: ${i.stock}`);
          return i;
        }
        return { ...i, quantity: next };
      }).filter((i) => i.quantity > 0)
    );
  };
  const updatePrice = (id, value) => {
    setCart(
      (prev) => prev.map((i) => i.productId === id ? { ...i, unitPrice: Math.max(0, value) } : i)
    );
  };
  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.productId !== id));
  };
  const handleSellProducts = async () => {
    if (cart.length === 0) {
      toast.error("Adicione ao menos um produto");
      return;
    }
    for (const item of cart) {
      if (item.quantity > item.stock) {
        toast.error(`Estoque insuficiente para ${item.name}. Disponível: ${item.stock}`);
        return;
      }
    }
    setSubmittingProducts(true);
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");
      const total = cartTotal;
      const summary = cart.map((i) => `${i.name} x${i.quantity}`).join(", ");
      const paymentLabel = paymentMethod === "pix" ? "PIX" : paymentMethod === "money" ? "Dinheiro" : paymentMethod === "card" ? "Cartão" : "Outro";
      const description = `Venda de Produto — ${summary} · Pagamento: ${paymentLabel}` + (productNote.trim() ? ` · Obs: ${productNote.trim()}` : "");
      const { error: finErr } = await supabase.from("financial_records").insert({
        user_id: user.id,
        type: "income",
        category: "product",
        amount: total,
        description,
        date: productDate
      });
      if (finErr) throw finErr;
      const lowStockWarns = [];
      const lastUnitWarns = [];
      for (const item of cart) {
        const newStock = item.stock - item.quantity;
        const { error: updErr } = await supabase.from("products").update({ current_stock: newStock }).eq("id", item.productId).eq("user_id", user.id);
        if (updErr) throw updErr;
        if (newStock === 0) lastUnitWarns.push(item.name);
        else if (newStock <= item.minStock) lowStockWarns.push(item.name);
      }
      toast.success("Venda registrada e estoque atualizado");
      lowStockWarns.forEach((n) => toast.warning(`⚠ ${n} atingiu o estoque mínimo.`));
      lastUnitWarns.forEach(
        (n) => toast.warning(`⚠ Última unidade de ${n} vendida. Considere repor.`)
      );
      onSuccess();
    } catch (error) {
      toast.error(error.message || "Erro ao registrar venda");
    } finally {
      setSubmittingProducts(false);
    }
  };
  const onSubmit = async (values) => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");
      const { error } = await supabase.from("financial_records").insert({ ...values, user_id: user.id });
      if (error) throw error;
      toast.success("Lançamento registrado!");
      onSuccess();
    } catch (error) {
      toast.error(error.message || "Erro ao registrar lançamento");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-black uppercase tracking-widest", children: "Origem da Receita" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: origin,
          onValueChange: (v) => {
            setOrigin(v);
            if (v === "service") {
              form.setValue("type", "income");
              form.setValue("category", "service");
            } else if (v === "other") {
              form.setValue("type", "income");
              form.setValue("category", "other");
            }
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 text-lg font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "service", className: "font-bold", children: "Serviço" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "product", className: "font-bold", children: "Produto" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", className: "font-bold", children: "Outra Receita / Despesa" })
            ] })
          ]
        }
      )
    ] }),
    origin === "product" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-black uppercase tracking-widest", children: "Produto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Buscar produto no estoque...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "h-12 pl-9 text-base font-bold"
            }
          )
        ] }),
        products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Nenhum produto cadastrado no estoque." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-56 overflow-y-auto border border-border rounded-xl divide-y", children: filteredProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-3 text-sm text-muted-foreground text-center", children: "Nenhum produto encontrado." }) : filteredProducts.map((p) => {
          const price = priceOf(p);
          const cost = costOf(p);
          const profit = price - cost;
          const disabled = p.current_stock < 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled,
              onClick: () => addToCart(p),
              className: "w-full text-left p-3 hover:bg-secondary/60 disabled:opacity-50 disabled:cursor-not-allowed",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                    "Em estoque: ",
                    p.current_stock,
                    " un · Custo R$ ",
                    cost.toFixed(2),
                    " · Lucro R$ ",
                    profit.toFixed(2)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-black text-sm", children: [
                    "R$ ",
                    price.toFixed(2)
                  ] }),
                  disabled && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-red-600", children: "Sem estoque" })
                ] })
              ] })
            },
            p.id
          );
        }) })
      ] }),
      cart.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-black uppercase tracking-widest", children: "Itens da venda" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: cart.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-3 rounded-xl border border-border bg-secondary/40 space-y-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                    "Estoque: ",
                    item.stock,
                    " un"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    variant: "ghost",
                    className: "h-8 w-8",
                    onClick: () => removeItem(item.productId),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-red-600" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto,1fr,auto] items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "icon",
                      variant: "outline",
                      className: "h-8 w-8 rounded-lg",
                      onClick: () => updateQty(item.productId, -1),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center font-black", children: item.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "icon",
                      variant: "outline",
                      className: "h-8 w-8 rounded-lg",
                      onClick: () => updateQty(item.productId, 1),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground", children: "R$" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      step: "0.01",
                      min: "0",
                      value: item.unitPrice,
                      onChange: (e) => updatePrice(item.productId, parseFloat(e.target.value) || 0),
                      className: "h-8 text-sm font-bold"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black tabular-nums", children: [
                  "R$ ",
                  (item.unitPrice * item.quantity).toFixed(2)
                ] })
              ] })
            ]
          },
          item.productId
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-primary/5 border-2 border-primary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black uppercase tracking-widest text-xs", children: "Total da venda" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-black italic", children: [
            "R$ ",
            cartTotal.toFixed(2)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-black uppercase tracking-widest", children: "Pagamento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: paymentMethod, onValueChange: setPaymentMethod, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 text-base font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pix", className: "font-bold", children: "PIX" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "money", className: "font-bold", children: "Dinheiro" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "card", className: "font-bold", children: "Cartão" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", className: "font-bold", children: "Outro" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-black uppercase tracking-widest", children: "Data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: productDate,
              onChange: (e) => setProductDate(e.target.value),
              className: "h-12 text-base font-bold"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-black uppercase tracking-widest", children: "Observação" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Opcional",
            value: productNote,
            onChange: (e) => setProductNote(e.target.value),
            className: "min-h-[60px] font-medium"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
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
            type: "button",
            onClick: handleSellProducts,
            disabled: submittingProducts || cart.length === 0,
            className: "flex-1 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 gap-2",
            children: submittingProducts ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
              " Registrar Venda"
            ] })
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            control: form.control,
            name: "type",
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Tipo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 text-lg font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "income", className: "font-bold text-green-600", children: "Receita (+)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "expense", className: "font-bold text-red-600", children: "Despesa (-)" })
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
            name: "category",
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Categoria" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 text-lg font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "service", className: "font-bold", children: "Serviço" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rent", className: "font-bold", children: "Aluguel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "supplies", className: "font-bold", children: "Insumos" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "marketing", className: "font-bold", children: "Marketing" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", className: "font-bold", children: "Outros" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "amount",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Valor (R$)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                step: "0.01",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Descrição" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Ex: Pagamento aluguel Junho",
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
          name: "date",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-sm font-black uppercase tracking-widest", children: "Data" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...field, className: "h-12 text-lg font-bold" }) }),
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
            children: form.formState.isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : "LANÇAR"
          }
        )
      ] })
    ] }) })
  ] });
}
function FinancePageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FinancePage, {}) });
}
function FinancePage() {
  const {
    t
  } = useTranslation();
  const [records, setRecords] = reactExports.useState([]);
  const [monthRecords, setMonthRecords] = reactExports.useState([]);
  const [todayRecords, setTodayRecords] = reactExports.useState([]);
  const [appointments, setAppointments] = reactExports.useState([]);
  const [services, setServices] = reactExports.useState([]);
  const [products, setProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("month");
  reactExports.useEffect(() => {
    fetchAll();
  }, [filter]);
  const fetchAll = async () => {
    setLoading(true);
    try {
      const now = /* @__PURE__ */ new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      let listStart = null;
      if (filter === "today") listStart = startOfDay;
      else if (filter === "week") {
        const d = /* @__PURE__ */ new Date();
        d.setDate(d.getDate() - 7);
        listStart = d.toISOString();
      } else if (filter === "month") listStart = startOfMonth;
      let listQuery = supabase.from("financial_records").select("*").order("date", {
        ascending: false
      }).limit(100);
      if (listStart) listQuery = listQuery.gte("date", listStart);
      const [listRes, monthRes, todayRes, apptRes, svcRes, prodRes] = await Promise.all([listQuery, supabase.from("financial_records").select("*").gte("date", startOfMonth), supabase.from("financial_records").select("*").gte("date", startOfDay), supabase.from("appointments").select("id, status, start_time, service_id, services(name, price)").gte("start_time", startOfMonth), supabase.from("services").select("id, name, price"), supabase.from("products").select("id, name, current_stock, min_stock, sale_price, cost_price")]);
      if (listRes.error) throw listRes.error;
      setRecords(listRes.data || []);
      setMonthRecords(monthRes.data || []);
      setTodayRecords(todayRes.data || []);
      setAppointments(apptRes.data || []);
      setServices(svcRes.data || []);
      setProducts(prodRes.data || []);
    } catch (error) {
      toast.error("Erro ao carregar financeiro");
    } finally {
      setLoading(false);
    }
  };
  const deleteRecord = async (id) => {
    try {
      const {
        error
      } = await supabase.from("financial_records").delete().eq("id", id);
      if (error) throw error;
      toast.success("Lançamento removido");
      fetchAll();
    } catch {
      toast.error("Erro ao remover lançamento");
    }
  };
  const kpis = reactExports.useMemo(() => {
    const sum = (rows, type) => rows.filter((r) => r.type === type).reduce((a, r) => a + Number(r.amount || 0), 0);
    const todayIncome = sum(todayRecords, "income");
    const monthIncome = sum(monthRecords, "income");
    const monthExpense = sum(monthRecords, "expense");
    const profit = monthIncome - monthExpense;
    const completed = appointments.filter((a) => a.status === "completed");
    const servicesDone = completed.length;
    const avgTicket = servicesDone > 0 ? monthIncome / servicesDone : 0;
    const margin = monthIncome > 0 ? profit / monthIncome * 100 : 0;
    return {
      todayIncome,
      monthIncome,
      monthExpense,
      profit,
      servicesDone,
      avgTicket,
      margin
    };
  }, [monthRecords, todayRecords, appointments]);
  const dailySeries = reactExports.useMemo(() => {
    const days = {};
    const now = /* @__PURE__ */ new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const key = String(i).padStart(2, "0");
      days[key] = {
        day: key,
        income: 0,
        expense: 0
      };
    }
    monthRecords.forEach((r) => {
      const d = new Date(r.date);
      const key = String(d.getDate()).padStart(2, "0");
      if (!days[key]) return;
      if (r.type === "income") days[key].income += Number(r.amount || 0);
      else days[key].expense += Number(r.amount || 0);
    });
    return Object.values(days);
  }, [monthRecords]);
  const topServices = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    appointments.filter((a) => a.status === "completed" && a.services).forEach((a) => {
      const name = a.services.name;
      const price = Number(a.services.price || 0);
      const cur = map.get(name) || {
        name,
        count: 0,
        revenue: 0,
        ticket: 0
      };
      cur.count += 1;
      cur.revenue += price;
      cur.ticket = cur.revenue / cur.count;
      map.set(name, cur);
    });
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [appointments]);
  const productHighlights = reactExports.useMemo(() => {
    const withRevenue = products.map((p) => ({
      ...p,
      revenue: Number(p.sale_price || 0) * Math.max(0, Number(p.current_stock || 0))
    }));
    const lowStock = products.filter((p) => Number(p.current_stock || 0) <= Number(p.min_stock || 0)).slice(0, 5);
    const topRevenue = [...withRevenue].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    return {
      lowStock,
      topRevenue
    };
  }, [products]);
  const categoryBreakdown = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    records.forEach((r) => {
      const key = r.category || "Sem categoria";
      const cur = map.get(key) || {
        income: 0,
        expense: 0
      };
      if (r.type === "income") cur.income += Number(r.amount || 0);
      else cur.expense += Number(r.amount || 0);
      map.set(key, cur);
    });
    return Array.from(map.entries()).map(([name, v]) => ({
      name,
      ...v
    }));
  }, [records]);
  const fmt = (n) => n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-[28px] font-semibold tracking-tight", children: "Financeiro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Entradas, saídas e resultado do mês." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterTabs, { value: filter, onChange: setFilter }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isAddDialogOpen, onOpenChange: setIsAddDialogOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "h-10 rounded-xl gap-2 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Nova movimentação"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] p-6 rounded-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-lg font-semibold", children: "Nova movimentação" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FinanceForm, { onSuccess: () => {
              setIsAddDialogOpen(false);
              fetchAll();
            }, onCancel: () => setIsAddDialogOpen(false) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Hoje", value: fmt(kpis.todayIncome), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4" }), tone: "neutral" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Mês", value: fmt(kpis.monthIncome), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }), tone: "positive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Lucro estimado", value: fmt(kpis.profit), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }), tone: kpis.profit >= 0 ? "positive" : "negative", sub: `Margem ${kpis.margin.toFixed(0)}%` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Despesas", value: fmt(kpis.monthExpense), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "h-4 w-4" }), tone: "negative" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Ticket médio", value: fmt(kpis.avgTicket), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "h-4 w-4" }), tone: "neutral" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Serviços", value: String(kpis.servicesDone), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-4 w-4" }), tone: "neutral", sub: "Concluídos no mês" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Evolução do mês", subtitle: "Entradas x saídas por dia", className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[260px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: dailySeries, margin: {
        top: 10,
        right: 10,
        left: -10,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gIncome", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "hsl(142 71% 45%)", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "hsl(142 71% 45%)", stopOpacity: 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gExpense", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "hsl(0 84% 60%)", stopOpacity: 0.25 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "hsl(0 84% 60%)", stopOpacity: 0 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "hsl(var(--border))", strokeDasharray: "3 3", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", tick: {
          fontSize: 11,
          fill: "hsl(var(--muted-foreground))"
        }, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fontSize: 11,
          fill: "hsl(var(--muted-foreground))"
        }, tickLine: false, axisLine: false, width: 50 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 12,
          fontSize: 12
        }, formatter: (v) => fmt(Number(v)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "income", stroke: "hsl(142 71% 45%)", strokeWidth: 2, fill: "url(#gIncome)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "expense", stroke: "hsl(0 84% 60%)", strokeWidth: 2, fill: "url(#gExpense)" })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Top serviços", subtitle: "Maior faturamento no mês", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[260px]", children: topServices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMini, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-5 w-5" }), label: "Sem serviços concluídos" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: topServices, layout: "vertical", margin: {
        top: 5,
        right: 10,
        left: 10,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "hsl(var(--border))", strokeDasharray: "3 3", horizontal: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", tick: {
          fontSize: 11,
          fill: "hsl(var(--muted-foreground))"
        }, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { dataKey: "name", type: "category", width: 90, tick: {
          fontSize: 11,
          fill: "hsl(var(--muted-foreground))"
        }, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 12,
          fontSize: 12
        }, formatter: (v) => fmt(Number(v)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "revenue", fill: "hsl(var(--primary))", radius: [0, 6, 6, 0] })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Serviços em destaque", subtitle: "Mais vendidos e maior ticket", children: topServices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMini, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-5 w-5" }), label: "Nenhum serviço concluído ainda" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: topServices.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 shrink-0 rounded-lg bg-secondary text-xs font-semibold flex items-center justify-center", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: `${s.count} atendimentos · ticket ${fmt(s.ticket)}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-emerald-600 dark:text-emerald-500 tabular-nums", children: fmt(s.revenue) })
      ] }, s.name)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Produtos", subtitle: "Estoque baixo e maior potencial", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 flex items-center gap-1.5 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }),
            " Estoque baixo"
          ] }),
          productHighlights.lowStock.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-2", children: "Tudo em ordem." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: productHighlights.lowStock.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-amber-600 dark:text-amber-500 tabular-nums", children: [
              p.current_stock,
              "/",
              p.min_stock
            ] })
          ] }, p.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5" }),
            " Maior faturamento potencial"
          ] }),
          productHighlights.topRevenue.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sem produtos cadastrados." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: productHighlights.topRevenue.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold tabular-nums", children: fmt(p.revenue) })
          ] }, p.id)) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Movimentações", subtitle: `${records.length} lançamentos no período`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4 text-muted-foreground" }), children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 py-4", children: Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 rounded-xl bg-secondary/40 animate-pulse" }, i)) }) : records.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-6 w-6 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Sem movimentações no período" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Registre entradas e saídas para começar." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setIsAddDialogOpen(true), className: "mt-5 rounded-xl h-9", children: "Lançar primeiro valor" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr,280px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: records.map((r) => {
        const income = r.type === "income";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group flex items-center justify-between py-3 px-2 -mx-2 rounded-xl hover:bg-secondary/40 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${income ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500" : "bg-red-500/10 text-red-600 dark:text-red-500"}`, children: income ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: r.description || r.category || "Lançamento" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                new Date(r.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short"
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5 opacity-40", children: "•" }),
                r.category || "—"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pl-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm font-semibold tabular-nums ${income ? "text-emerald-600 dark:text-emerald-500" : "text-red-600 dark:text-red-500"}`, children: [
              income ? "+" : "−",
              " ",
              fmt(Number(r.amount || 0))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-2xl p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir lançamento?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Esta ação remove o registro do seu fluxo de caixa permanentemente." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-xl", children: "Cancelar" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: () => deleteRecord(r.id), children: "Excluir" })
                ] })
              ] })
            ] })
          ] })
        ] }, r.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-2xl border border-border bg-secondary/30 p-4 h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "Por categoria" }),
        categoryBreakdown.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sem dados." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: categoryBreakdown.slice(0, 6).map((c) => {
          const net = c.income - c.expense;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm truncate", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs font-semibold tabular-nums ${net >= 0 ? "text-emerald-600 dark:text-emerald-500" : "text-red-600 dark:text-red-500"}`, children: [
              net >= 0 ? "+" : "−",
              " ",
              fmt(Math.abs(net))
            ] })
          ] }, c.name);
        }) })
      ] })
    ] }) })
  ] });
}
function FilterTabs({
  value,
  onChange
}) {
  const {
    t
  } = useTranslation();
  const opts = ["today", "week", "month", "all"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex bg-secondary/60 p-1 rounded-xl border border-border", children: opts.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(v), className: `px-3.5 h-8 rounded-lg text-xs font-medium transition-all ${value === v ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: v === "today" ? "Hoje" : v === "week" ? "Semana" : v === "month" ? "Mês" : "Tudo" }, v)) });
}
function Kpi({
  label,
  value,
  icon,
  sub,
  tone
}) {
  const toneCls = tone === "positive" ? "text-emerald-600 dark:text-emerald-500" : tone === "negative" ? "text-red-600 dark:text-red-500" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl md:text-2xl font-semibold tracking-tight tabular-nums ${toneCls}`, children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: sub })
  ] });
}
function Panel({
  title,
  subtitle,
  children,
  className = "",
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `rounded-2xl border border-border bg-card p-5 shadow-sm ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[15px] font-semibold tracking-tight truncate", children: title }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: subtitle })
      ] })
    ] }) }),
    children
  ] });
}
function EmptyMini({
  icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-secondary flex items-center justify-center mb-2", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: label })
  ] });
}
export {
  FinancePageWrapper as component
};
