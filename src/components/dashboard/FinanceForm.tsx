import { useEffect, useMemo, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Minus, Trash2, Package, Search } from "lucide-react";

const financeSchema = z.object({
  amount: z.coerce.number().min(0.01, "Valor deve ser maior que zero"),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Selecione uma categoria"),
  description: z.string().min(1, "Descrição é obrigatória"),
  date: z.string().min(1, "Selecione uma data"),
});

type FinanceFormValues = z.infer<typeof financeSchema>;

interface FinanceFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type Origin = "service" | "product" | "other";

interface ProductRow {
  id: string;
  name: string;
  current_stock: number;
  min_stock: number;
  sale_price: number | null;
  selling_price: number | null;
  cost_price: number | null;
  purchase_price: number | null;
}

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  stock: number;
  minStock: number;
  cost: number;
}

const priceOf = (p: ProductRow) => Number(p.selling_price ?? p.sale_price ?? 0) || 0;
const costOf = (p: ProductRow) => Number(p.cost_price ?? p.purchase_price ?? 0) || 0;

export function FinanceForm({ onSuccess, onCancel }: FinanceFormProps) {
  const [origin, setOrigin] = useState<Origin>("service");
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [productNote, setProductNote] = useState("");
  const [productDate, setProductDate] = useState(new Date().toISOString().split("T")[0]);
  const [submittingProducts, setSubmittingProducts] = useState(false);

  const form = useForm<FinanceFormValues>({
    resolver: zodResolver(financeSchema),
    defaultValues: {
      amount: 0,
      type: "income",
      category: "service",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  // Load products for product-sale flow (lazy on demand)
  useEffect(() => {
    if (origin !== "product" || products.length > 0) return;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("products")
        .select(
          "id, name, current_stock, min_stock, sale_price, selling_price, cost_price, purchase_price",
        )
        .eq("user_id", user.id)
        .order("name");
      setProducts((data as ProductRow[]) || []);
    })();
  }, [origin, products.length]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products.slice(0, 8);
    return products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
  }, [products, search]);

  const cartTotal = useMemo(
    () => cart.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0),
    [cart],
  );

  const addToCart = (p: ProductRow) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === p.id);
      if (existing) {
        if (existing.quantity + 1 > p.current_stock) {
          toast.error(`Estoque insuficiente. Disponível: ${p.current_stock}`);
          return prev;
        }
        return prev.map((i) => (i.productId === p.id ? { ...i, quantity: i.quantity + 1 } : i));
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
          cost: costOf(p),
        },
      ];
    });
    setSearch("");
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.productId !== id) return i;
          const next = i.quantity + delta;
          if (next > i.stock) {
            toast.error(`Estoque insuficiente. Disponível: ${i.stock}`);
            return i;
          }
          return { ...i, quantity: next };
        })
        .filter((i) => i.quantity > 0),
    );
  };

  const updatePrice = (id: string, value: number) => {
    setCart((prev) =>
      prev.map((i) => (i.productId === id ? { ...i, unitPrice: Math.max(0, value) } : i)),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== id));
  };

  const handleSellProducts = async () => {
    if (cart.length === 0) {
      toast.error("Adicione ao menos um produto");
      return;
    }
    // Validate stock again
    for (const item of cart) {
      if (item.quantity > item.stock) {
        toast.error(`Estoque insuficiente para ${item.name}. Disponível: ${item.stock}`);
        return;
      }
    }
    setSubmittingProducts(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const total = cartTotal;
      const summary = cart.map((i) => `${i.name} x${i.quantity}`).join(", ");
      const paymentLabel =
        paymentMethod === "pix"
          ? "PIX"
          : paymentMethod === "money"
            ? "Dinheiro"
            : paymentMethod === "card"
              ? "Cartão"
              : "Outro";
      const description =
        `Venda de Produto — ${summary} · Pagamento: ${paymentLabel}` +
        (productNote.trim() ? ` · Obs: ${productNote.trim()}` : "");

      // 1) Single financial record
      const { error: finErr } = await supabase.from("financial_records").insert({
        user_id: user.id,
        type: "income",
        category: "product",
        amount: total,
        description,
        date: productDate,
      });
      if (finErr) throw finErr;

      // 2) Decrement stock per product
      const lowStockWarns: string[] = [];
      const lastUnitWarns: string[] = [];
      for (const item of cart) {
        const newStock = item.stock - item.quantity;
        const { error: updErr } = await supabase
          .from("products")
          .update({ current_stock: newStock })
          .eq("id", item.productId)
          .eq("user_id", user.id);
        if (updErr) throw updErr;
        if (newStock === 0) lastUnitWarns.push(item.name);
        else if (newStock <= item.minStock) lowStockWarns.push(item.name);
      }

      toast.success("Venda registrada e estoque atualizado");
      lowStockWarns.forEach((n) => toast.warning(`⚠ ${n} atingiu o estoque mínimo.`));
      lastUnitWarns.forEach((n) =>
        toast.warning(`⚠ Última unidade de ${n} vendida. Considere repor.`),
      );
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Erro ao registrar venda");
    } finally {
      setSubmittingProducts(false);
    }
  };

  const onSubmit = async (values: FinanceFormValues) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase
        .from("financial_records")
        .insert({ ...values, user_id: user.id });

      if (error) throw error;
      toast.success("Lançamento registrado!");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Erro ao registrar lançamento");
    }
  };

  return (
    <div className="space-y-5">
      {/* Origem da Receita */}
      <div className="space-y-2">
        <Label className="text-sm font-black uppercase tracking-widest">Origem da Receita</Label>
        <Select
          value={origin}
          onValueChange={(v: Origin) => {
            setOrigin(v);
            if (v === "service") {
              form.setValue("type", "income");
              form.setValue("category", "service");
            } else if (v === "other") {
              form.setValue("type", "income");
              form.setValue("category", "other");
            }
          }}
        >
          <SelectTrigger className="h-12 text-lg font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="service" className="font-bold">
              Serviço
            </SelectItem>
            <SelectItem value="product" className="font-bold">
              Produto
            </SelectItem>
            <SelectItem value="other" className="font-bold">
              Outra Receita / Despesa
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {origin === "product" ? (
        <div className="space-y-4">
          {/* Search / autocomplete */}
          <div className="space-y-2">
            <Label className="text-sm font-black uppercase tracking-widest">Produto</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produto no estoque..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 pl-9 text-base font-bold"
              />
            </div>
            {products.length === 0 ? (
              <p className="text-xs text-muted-foreground">Nenhum produto cadastrado no estoque.</p>
            ) : (
              <div className="max-h-56 overflow-y-auto border border-border rounded-xl divide-y">
                {filteredProducts.length === 0 ? (
                  <p className="p-3 text-sm text-muted-foreground text-center">
                    Nenhum produto encontrado.
                  </p>
                ) : (
                  filteredProducts.map((p) => {
                    const price = priceOf(p);
                    const cost = costOf(p);
                    const profit = price - cost;
                    const disabled = p.current_stock < 1;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => addToCart(p)}
                        className="w-full text-left p-3 hover:bg-secondary/60 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-bold text-sm truncate">{p.name}</p>
                            <p className="text-[11px] text-muted-foreground">
                              Em estoque: {p.current_stock} un · Custo R$ {cost.toFixed(2)} · Lucro
                              R$ {profit.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-black text-sm">R$ {price.toFixed(2)}</p>
                            {disabled && (
                              <p className="text-[10px] font-bold text-red-600">Sem estoque</p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          {cart.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-black uppercase tracking-widest">Itens da venda</Label>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="p-3 rounded-xl border border-border bg-secondary/40 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-sm truncate">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          Estoque: {item.stock} un
                        </p>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-[auto,1fr,auto] items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-lg"
                          onClick={() => updateQty(item.productId, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-black">{item.quantity}</span>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-lg"
                          onClick={() => updateQty(item.productId, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-muted-foreground">R$</span>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) =>
                            updatePrice(item.productId, parseFloat(e.target.value) || 0)
                          }
                          className="h-8 text-sm font-bold"
                        />
                      </div>
                      <span className="text-sm font-black tabular-nums">
                        R$ {(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border-2 border-primary/20">
                <span className="font-black uppercase tracking-widest text-xs">Total da venda</span>
                <span className="text-2xl font-black italic">R$ {cartTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Payment + date + note */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-sm font-black uppercase tracking-widest">Pagamento</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="h-12 text-base font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix" className="font-bold">
                    PIX
                  </SelectItem>
                  <SelectItem value="money" className="font-bold">
                    Dinheiro
                  </SelectItem>
                  <SelectItem value="card" className="font-bold">
                    Cartão
                  </SelectItem>
                  <SelectItem value="other" className="font-bold">
                    Outro
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-black uppercase tracking-widest">Data</Label>
              <Input
                type="date"
                value={productDate}
                onChange={(e) => setProductDate(e.target.value)}
                className="h-12 text-base font-bold"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-black uppercase tracking-widest">Observação</Label>
            <Textarea
              placeholder="Opcional"
              value={productNote}
              onChange={(e) => setProductNote(e.target.value)}
              className="min-h-[60px] font-medium"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 h-14 font-black uppercase tracking-widest rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSellProducts}
              disabled={submittingProducts || cart.length === 0}
              className="flex-1 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 gap-2"
            >
              {submittingProducts ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Package className="h-4 w-4" /> Registrar Venda
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-black uppercase tracking-widest">
                      Tipo
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-lg font-bold">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="income" className="font-bold text-green-600">
                          Receita (+)
                        </SelectItem>
                        <SelectItem value="expense" className="font-bold text-red-600">
                          Despesa (-)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-black uppercase tracking-widest">
                      Categoria
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-lg font-bold">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="service" className="font-bold">
                          Serviço
                        </SelectItem>
                        <SelectItem value="rent" className="font-bold">
                          Aluguel
                        </SelectItem>
                        <SelectItem value="supplies" className="font-bold">
                          Insumos
                        </SelectItem>
                        <SelectItem value="marketing" className="font-bold">
                          Marketing
                        </SelectItem>
                        <SelectItem value="other" className="font-bold">
                          Outros
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-black uppercase tracking-widest">
                    Valor (R$)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
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
                    Descrição
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Pagamento aluguel Junho"
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-black uppercase tracking-widest">
                    Data
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="h-12 text-lg font-bold" />
                  </FormControl>
                  <FormMessage />
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
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex-1 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "LANÇAR"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
