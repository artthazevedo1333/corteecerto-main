import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Upload, User } from "lucide-react";

const clientSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().optional(),
  birthday: z.string().optional(),
  instagram: z.string().optional(),
  notes: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientFormProps {
  client?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ClientForm({ client, onSuccess, onCancel }: ClientFormProps) {
  const isEditing = !!client;
  const [photoUrl, setPhotoUrl] = useState<string | null>(client?.photo_url || null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      phone: client?.phone || "",
      birthday: client?.birthday || "",
      instagram: client?.instagram || "",
      notes: client?.notes || "",
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const ext = file.name.split(".").pop();
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("client-photos")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: signed } = await supabase.storage
        .from("client-photos")
        .createSignedUrl(path, 60 * 60 * 24 * 365);

      setPhotoUrl(signed?.signedUrl || path);
      toast.success("Foto enviada");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao enviar foto");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: ClientFormValues) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const payload = {
        ...values,
        user_id: user.id,
        birthday: values.birthday || null,
        photo_url: photoUrl,
        updated_at: new Date().toISOString(),
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
    } catch (error: any) {
      console.error("Error saving client:", error);
      toast.error(error.message || "Erro ao salvar cliente");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-border">
            {photoUrl && <AvatarImage src={photoUrl} alt="Foto" />}
            <AvatarFallback className="bg-secondary">
              <User className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
              disabled={uploading}
            />
            <div className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-border bg-background hover:bg-secondary font-black uppercase text-xs tracking-widest">
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {photoUrl ? "Trocar Foto" : "Adicionar Foto"}
            </div>
          </label>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Nome Completo
              </FormLabel>
              <FormControl>
                <Input placeholder="Ex: João Silva" {...field} className="h-12 text-lg font-bold" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  WhatsApp
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(00) 00000-0000"
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
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-black uppercase tracking-widest">
                  Aniversário
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="h-12 text-lg font-bold" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Instagram
              </FormLabel>
              <FormControl>
                <Input placeholder="@usuario" {...field} className="h-12 text-lg font-bold" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-black uppercase tracking-widest">
                Observações
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex: Prefere corte baixo, alérgico a tal produto..."
                  {...field}
                  className="min-h-[80px] text-base font-medium"
                />
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
            ) : isEditing ? (
              "SALVAR"
            ) : (
              "CADASTRAR"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
