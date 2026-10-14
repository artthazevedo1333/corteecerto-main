import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProductFormProps {
  product?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const { t } = useTranslation();
  const isEditing = !!product;

  const productSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    sku: z.string().optional(),
    description: z.string().optional(),
    current_stock: z.coerce.number().min(0, "Estoque não pode ser negativo"),
    min_stock: z.coerce.number().min(0, "Mínimo não pode ser negativo"),
    purchase_price: z.coerce.number().min(0, "Preço de custo não pode ser negativo"),
    selling_price: z.coerce.number().min(0, "Preço de venda não pode ser negativo"),
  });

  type ProductFormValues = z.infer<typeof productSchema>;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      sku: product?.sku || "",
      description: product?.description || "",
      current_stock: product?.current_stock || 0,
      min_stock: product?.min_stock || 5,
      purchase_price: product?.purchase_price || 0,
      selling_price: product?.selling_price || 0,
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const payload = {
        ...values,
        user_id: user.id,
        updated_at: new Date().toISOString(),
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
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar produto");
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
                Nome do Produto
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Pomada Modeladora"
                  {...field}
                  className="h-12 text-lg font-bold"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  SKU / Código
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Código de barras ou interno"
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
            name="min_stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  Estoque Mínimo
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="h-12 text-lg font-bold" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="purchase_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  Preço de Custo (R$)
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
            name="selling_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  Preço de Venda (R$)
                </FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} className="h-12 text-lg font-bold" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="current_stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Estoque Atual (Unidades)
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} className="h-12 text-lg font-bold" />
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
            CANCELAR
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex-1 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isEditing ? (
              "SALVAR"
            ) : (
              "CADASTRAR PRODUTO"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
