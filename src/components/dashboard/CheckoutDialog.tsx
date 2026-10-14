import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  CreditCard,
  DollarSign,
  Wallet,
  Loader2,
  Plus,
  Minus,
  Package,
  X,
  Printer,
} from "lucide-react";
import { printReceipt } from "@/lib/print-receipt";

interface CheckoutDialogProps {
  appointment: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface CartProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}

export function CheckoutDialog({
  appointment,
  open,
  onOpenChange,
  onSuccess,
}: CheckoutDialogProps) {
  const servicePrice = Number(appointment?.service?.price) || 0;
  const [paymentMethod, setPaymentMethod] = useState("money");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    if (!open) return;
    setCart([]);
    setShowProducts(false);
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("products")
        .select("id, name, selling_price, sale_price, current_stock")
        .eq("user_id", user.id)
        .gt("current_stock", 0)
        .order("name");
      setProducts(data || []);
    })();
  }, [open]);

  const productsTotal = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const total = servicePrice + productsTotal;

  const addToCart = (product: any) => {
    const price = Number(product.selling_price ?? product.sale_price) || 0;
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        if (existing.quantity >= product.current_stock) {
          toast.error("Estoque insuficiente");
          return prev;
        }
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price, stock: product.current_stock, quantity: 1 },
      ];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((p) => {
          if (p.id !== id) return p;
          const next = p.quantity + delta;
          if (next > p.stock) {
            toast.error("Estoque insuficiente");
            return p;
          }
          return { ...p, quantity: next };
        })
        .filter((p) => p.quantity > 0),
    );
  };

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // 1. Mark appointment as completed
      const { error: aptError } = await supabase
        .from("appointments")
        .update({ status: "completed" })
        .eq("id", appointment.id);
      if (aptError) throw aptError;

      // 2. Service revenue
      const { error: finError } = await supabase.from("financial_records").insert({
        user_id: user.id,
        amount: servicePrice,
        type: "income",
        category: "service",
        description: `Atendimento: ${appointment.client?.name || appointment.customer_name || "Cliente Avulso"} - ${appointment.service?.name}`,
        appointment_id: appointment.id,
        date: new Date().toISOString(),
      });
      if (finError) throw finError;

      // 3. Products: financial record + stock decrement
      for (const item of cart) {
        await supabase.from("financial_records").insert({
          user_id: user.id,
          amount: item.price * item.quantity,
          type: "income",
          category: "product",
          description: `Venda de produto: ${item.name} x${item.quantity}`,
          appointment_id: appointment.id,
          date: new Date().toISOString(),
        });

        await supabase
          .from("products")
          .update({ current_stock: item.stock - item.quantity })
          .eq("id", item.id);
      }

      // 4. Update client stats
      if (appointment.client_id) {
        const { data: client } = await supabase
          .from("clients")
          .select("total_spent")
          .eq("id", appointment.client_id)
          .single();
        const currentTotal = Number(client?.total_spent) || 0;
        await supabase
          .from("clients")
          .update({
            last_visit: new Date().toISOString(),
            total_spent: currentTotal + total,
          })
          .eq("id", appointment.client_id);
      }

      toast.success("Atendimento finalizado!");
      try {
        printReceipt({
          clientName: appointment.client?.name || appointment.customer_name || "Cliente",
          serviceName: appointment.service?.name,
          servicePrice,
          products: cart.map((c) => ({ name: c.name, quantity: c.quantity, price: c.price })),
          total,
          paymentMethod:
            paymentMethod === "money" ? "Dinheiro" : paymentMethod === "card" ? "Cartão" : "Pix",
        });
      } catch (receiptError) {
        console.warn("Não foi possível imprimir o recibo:", receiptError);
      }
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Erro ao finalizar atendimento");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 bg-primary text-primary-foreground">
          <DialogTitle className="text-2xl font-black uppercase tracking-tight italic">
            Finalizar Atendimento
          </DialogTitle>
          <p className="text-primary-foreground/80 font-medium">
            Confirme os detalhes do pagamento.
          </p>
        </DialogHeader>

        <div className="p-6 space-y-5">
          {/* Service line */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Serviço
              </p>
              <p className="font-bold">{appointment?.service?.name || "—"}</p>
            </div>
            <p className="font-black text-lg">R$ {servicePrice.toFixed(2)}</p>
          </div>

          {/* Products in cart */}
          {cart.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-black uppercase tracking-widest opacity-70">
                Produtos
              </Label>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">R$ {item.price.toFixed(2)} un.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      aria-label={`Diminuir quantidade de ${item.name}`}
                      className="h-8 w-8 rounded-lg"
                      onClick={() => updateQty(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" aria-hidden="true" />
                    </Button>
                    <span className="w-6 text-center font-black" aria-live="polite">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      aria-label={`Aumentar quantidade de ${item.name}`}
                      className="h-8 w-8 rounded-lg"
                      onClick={() => updateQty(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add product */}
          {products.length > 0 && (
            <div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 rounded-xl gap-2 font-black uppercase text-xs"
                onClick={() => setShowProducts((v) => !v)}
              >
                {showProducts ? <X className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                {showProducts ? "Fechar Produtos" : "Adicionar Produto"}
              </Button>
              {showProducts && (
                <div className="mt-2 max-h-40 overflow-y-auto border border-border rounded-xl divide-y">
                  {products.map((p) => {
                    const price = Number(p.selling_price ?? p.sale_price) || 0;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => addToCart(p)}
                        className="w-full flex items-center justify-between p-3 hover:bg-secondary/50 text-left"
                      >
                        <div>
                          <p className="font-bold text-sm">{p.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Estoque: {p.current_stock}
                          </p>
                        </div>
                        <p className="font-black text-sm">R$ {price.toFixed(2)}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border-2 border-primary/20">
            <span className="font-black uppercase tracking-widest text-sm">Total</span>
            <span className="text-3xl font-black italic">R$ {total.toFixed(2)}</span>
          </div>

          {/* Payment method */}
          <div className="space-y-3">
            <Label className="text-sm font-black uppercase tracking-widest opacity-70">
              Forma de Pagamento
            </Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div>
                <RadioGroupItem value="money" id="money" className="peer sr-only" />
                <Label
                  htmlFor="money"
                  className="flex flex-col items-center rounded-2xl border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <DollarSign className="mb-2 h-6 w-6" />
                  <span className="text-[10px] font-black uppercase">Dinheiro</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
                <Label
                  htmlFor="pix"
                  className="flex flex-col items-center rounded-2xl border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <Wallet className="mb-2 h-6 w-6" />
                  <span className="text-[10px] font-black uppercase">PIX</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="card" id="card" className="peer sr-only" />
                <Label
                  htmlFor="card"
                  className="flex flex-col items-center rounded-2xl border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <CreditCard className="mb-2 h-6 w-6" />
                  <span className="text-[10px] font-black uppercase">Cartão</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            className="w-full h-16 text-xl font-black uppercase tracking-tight rounded-2xl shadow-xl shadow-primary/20"
            onClick={handleCheckout}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "CONCLUIR E RECEBER"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
