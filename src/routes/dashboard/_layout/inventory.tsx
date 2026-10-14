import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  ShoppingCart,
  TrendingUp,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import { ProductForm } from "@/components/dashboard/ProductForm";

export const Route = createFileRoute("/dashboard/_layout/inventory")({
  component: InventoryPageWrapper,
});

function InventoryPageWrapper() {
  return (
    <ErrorBoundary>
      <InventoryPage />
    </ErrorBoundary>
  );
}

type FilterKey = "all" | "low" | "out" | "healthy";

function InventoryPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      setProducts(data || []);
    } catch {
      toast.error("Erro ao carregar estoque");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      toast.success("Produto removido");
      fetchProducts();
    } catch {
      toast.error("Erro ao remover produto");
    }
  };

  const priceOf = (p: any) => Number(p.sale_price ?? p.selling_price ?? 0);
  const costOf = (p: any) => Number(p.cost_price ?? p.purchase_price ?? 0);

  const kpis = useMemo(() => {
    const units = products.reduce((a, p) => a + Number(p.current_stock || 0), 0);
    const lowCount = products.filter(
      (p) =>
        Number(p.current_stock || 0) <= Number(p.min_stock || 0) &&
        Number(p.current_stock || 0) > 0,
    ).length;
    const outCount = products.filter((p) => Number(p.current_stock || 0) <= 0).length;
    const stockValue = products.reduce((a, p) => a + costOf(p) * Number(p.current_stock || 0), 0);
    const potentialRevenue = products.reduce(
      (a, p) => a + priceOf(p) * Number(p.current_stock || 0),
      0,
    );
    return {
      units,
      lowCount,
      outCount,
      stockValue,
      potentialProfit: potentialRevenue - stockValue,
    };
  }, [products]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      const matchesTerm =
        !term ||
        p.name?.toLowerCase().includes(term) ||
        (p.sku && String(p.sku).toLowerCase().includes(term));
      if (!matchesTerm) return false;

      const cur = Number(p.current_stock || 0);
      const min = Number(p.min_stock || 0);
      if (filter === "low") return cur > 0 && cur <= min;
      if (filter === "out") return cur <= 0;
      if (filter === "healthy") return cur > min;
      return true;
    });
  }, [products, searchTerm, filter]);

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

  const filterOpts: { v: FilterKey; label: string; count?: number }[] = [
    { v: "all", label: "Todos", count: products.length },
    { v: "low", label: "Baixo", count: kpis.lowCount },
    { v: "out", label: "Sem estoque", count: kpis.outCount },
    { v: "healthy", label: "Em dia" },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight">Estoque</h1>
          <p className="text-sm text-muted-foreground mt-1">Controle de produtos e materiais.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-10 rounded-xl gap-2 shadow-sm">
              <Plus className="h-4 w-4" /> Novo produto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-6 rounded-2xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-lg font-semibold">Novo produto</DialogTitle>
            </DialogHeader>
            <ProductForm
              onSuccess={() => {
                setIsAddDialogOpen(false);
                fetchProducts();
              }}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Kpi
          label="Total de itens"
          value={String(kpis.units)}
          icon={<Package className="h-4 w-4" />}
        />
        <Kpi
          label="Estoque baixo"
          value={String(kpis.lowCount)}
          icon={<AlertTriangle className="h-4 w-4" />}
          tone={kpis.lowCount > 0 ? "warning" : "neutral"}
        />
        <Kpi
          label="Valor em estoque"
          value={fmt(kpis.stockValue)}
          icon={<ShoppingCart className="h-4 w-4" />}
        />
        <Kpi
          label="Lucro potencial"
          value={fmt(kpis.potentialProfit)}
          icon={<TrendingUp className="h-4 w-4" />}
          tone={kpis.potentialProfit >= 0 ? "positive" : "negative"}
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 rounded-xl"
          />
        </div>
        <div className="inline-flex bg-secondary/60 p-1 rounded-xl border border-border overflow-x-auto no-scrollbar">
          {filterOpts.map((o) => (
            <button
              key={o.v}
              onClick={() => setFilter(o.v)}
              className={`px-3 h-8 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                filter === o.v
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {o.label}
              {typeof o.count === "number" && (
                <span className="ml-1.5 text-[10px] text-muted-foreground">({o.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="grid gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-secondary/40 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center mb-3">
            <Package className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">
            {products.length === 0 ? "Nenhum produto cadastrado" : "Nenhum resultado encontrado"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {products.length === 0
              ? "Cadastre seu primeiro produto para começar."
              : "Tente mudar os filtros ou a busca."}
          </p>
          {products.length === 0 && (
            <Button onClick={() => setIsAddDialogOpen(true)} className="mt-5 h-10 rounded-xl">
              Cadastrar produto
            </Button>
          )}
        </div>
      ) : (
        <ul className="grid gap-3">
          {filtered.map((p) => {
            const cur = Number(p.current_stock || 0);
            const min = Number(p.min_stock || 0);
            const price = priceOf(p);
            const cost = costOf(p);
            const margin = price > 0 ? ((price - cost) / price) * 100 : 0;
            const out = cur <= 0;
            const low = !out && cur <= min;

            return (
              <li key={p.id}>
                <article
                  className={`group rounded-2xl border bg-card p-4 md:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${
                    out ? "border-red-500/30" : low ? "border-amber-500/30" : "border-border"
                  }`}
                >
                  <div className="grid grid-cols-[auto,minmax(0,1fr),auto] items-center gap-3 md:gap-5">
                    <div
                      className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center ${
                        out
                          ? "bg-red-500/10 text-red-600 dark:text-red-500"
                          : low
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-500"
                            : "bg-secondary text-muted-foreground group-hover:text-primary"
                      }`}
                    >
                      <Package className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="text-sm md:text-[15px] font-semibold truncate">{p.name}</h3>
                        <StatusPill out={out} low={low} />
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        SKU: {p.sku || "—"}
                        <span className="mx-1.5 opacity-40">•</span>
                        {cur} UN
                        <span className="mx-1.5 opacity-40">•</span>
                        Mín. {min}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-6 pr-2 tabular-nums">
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          VENDA
                        </p>
                        <p className="text-sm font-semibold">{fmt(price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          MARGEM
                        </p>
                        <p
                          className={`text-sm font-semibold ${
                            margin >= 30
                              ? "text-emerald-600 dark:text-emerald-500"
                              : margin >= 15
                                ? "text-amber-600 dark:text-amber-500"
                                : "text-red-600 dark:text-red-500"
                          }`}
                        >
                          {margin.toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    <div className="col-start-3 flex items-center gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Editar produto"
                        className="h-9 w-9 rounded-lg hover:bg-secondary"
                        onClick={() => setEditingProduct(p)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Excluir produto"
                            className="h-9 w-9 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl p-6">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir produto?</AlertDialogTitle>
                            <AlertDialogDescription>
                              {`Tem certeza que deseja excluir o produto "${p.name}"? Esta ação não pode ser desfeita.`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-4">
                            <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => deleteProduct(p.id)}
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {/* Mobile-only price row */}
                  <div className="sm:hidden mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs tabular-nums">
                    <span className="text-muted-foreground">VENDA</span>
                    <span className="font-semibold">{fmt(price)}</span>
                    <span className="text-muted-foreground">MARGEM</span>
                    <span
                      className={`font-semibold ${
                        margin >= 30
                          ? "text-emerald-600 dark:text-emerald-500"
                          : margin >= 15
                            ? "text-amber-600 dark:text-amber-500"
                            : "text-red-600 dark:text-red-500"
                      }`}
                    >
                      {margin.toFixed(0)}%
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent className="sm:max-w-[500px] p-6 rounded-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold">Editar produto</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onSuccess={() => {
                setEditingProduct(null);
                fetchProducts();
              }}
              onCancel={() => setEditingProduct(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Kpi({
  label,
  value,
  icon,
  tone = "neutral",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone?: "neutral" | "positive" | "negative" | "warning";
}) {
  const cls =
    tone === "positive"
      ? "text-emerald-600 dark:text-emerald-500"
      : tone === "negative"
        ? "text-red-600 dark:text-red-500"
        : tone === "warning"
          ? "text-amber-600 dark:text-amber-500"
          : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <span className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
          {icon}
        </span>
      </div>
      <p className={`text-xl md:text-2xl font-semibold tracking-tight tabular-nums ${cls}`}>
        {value}
      </p>
    </div>
  );
}

function StatusPill({ out, low }: { out: boolean; low: boolean }) {
  const { t } = useTranslation();
  if (out)
    return (
      <span className="inline-flex items-center gap-1 px-1.5 h-5 rounded-md bg-red-500/10 text-red-600 dark:text-red-500 text-[10px] font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-current" /> ESGOTADO
      </span>
    );
  if (low)
    return (
      <span className="inline-flex items-center gap-1 px-1.5 h-5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[10px] font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-current" /> BAIXO ESTOQUE
      </span>
    );
  return null;
}
