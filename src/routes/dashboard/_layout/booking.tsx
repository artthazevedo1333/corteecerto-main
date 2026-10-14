import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Copy, ExternalLink, Loader2, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";

export const Route = createFileRoute("/dashboard/_layout/booking")({
  component: BookingPage,
});

function BookingPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        setProfile(data);
        setSlug(data.slug || "");
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  const saveSlug = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from("profiles").update({ slug }).eq("id", profile.id);

      if (error) {
        if (error.code === "23505")
          toast.error("Este link já está sendo usado por outro barbeiro.");
        else toast.error("Erro ao salvar link.");
      } else {
        toast.success("Link atualizado!");
        setProfile({ ...profile, slug });
      }
    } catch (e) {
      toast.error("Erro ao salvar link.");
    } finally {
      setSaving(false);
    }
  };

  const bookingUrl = `${window.location.origin}/booking/${profile?.slug || ""}`;

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );

  return (
    <ErrorBoundary>
      <div className="space-y-8 pb-10">
        <header>
          <h1 className="text-3xl font-black tracking-tight uppercase">Agendamento Online</h1>
          <p className="text-muted-foreground font-medium text-lg">
            Configure sua página de agendamento para clientes.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-border bg-card shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-secondary/30 border-b border-border p-6">
              <CardTitle className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary" /> Seu Link Personalizado
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Endereço da sua página
                </Label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center bg-secondary/30 border border-border rounded-xl px-4 h-12 font-bold text-muted-foreground overflow-hidden whitespace-nowrap">
                    cortecerto.app/booking/
                    <input
                      value={slug}
                      onChange={(e) =>
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                      }
                      className="bg-transparent border-none outline-none text-foreground ml-0.5 w-full"
                      placeholder="seu-nome"
                    />
                  </div>
                  <Button
                    onClick={saveSlug}
                    disabled={saving || slug === profile?.slug}
                    className="h-12 px-6 font-black rounded-xl"
                  >
                    {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "SALVAR"}
                  </Button>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                  Dica: use o nome da sua barbearia. Evite caracteres especiais e espaços.
                </p>
              </div>

              {profile?.slug && (
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                        Página Ativa
                      </p>
                      <p className="font-bold text-sm truncate max-w-[200px]">{bookingUrl}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none h-10 gap-2 font-black rounded-lg"
                      onClick={() => {
                        navigator.clipboard.writeText(bookingUrl);
                        toast.success("Link copiado!");
                      }}
                    >
                      <Copy className="h-4 w-4" /> COPIAR
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none h-10 gap-2 font-black rounded-lg"
                      asChild
                    >
                      <a href={bookingUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" /> VER PÁGINA
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <aside className="space-y-6">
            <Card className="border-none bg-primary text-white shadow-xl shadow-primary/20 rounded-3xl overflow-hidden">
              <CardContent className="p-8 space-y-6 text-center">
                <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-white/30 shadow-inner">
                  <Share2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                  Divulgue seu Link
                </h3>
                <p className="font-medium text-white/80 text-sm">
                  Adicione o link na sua bio do Instagram e WhatsApp para seus clientes agendarem
                  sozinhos.
                </p>
                <Button
                  className="w-full bg-white text-primary hover:bg-white/90 h-14 font-black uppercase italic rounded-2xl"
                  onClick={() => {
                    const text = `Salve! Agora você pode agendar seu horário comigo direto pelo link: ${bookingUrl}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
                  }}
                >
                  ENVIAR NO WHATSAPP
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card rounded-3xl overflow-hidden shadow-sm">
              <CardHeader className="p-6 border-b border-border">
                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Status do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Disponibilidade Real</span>
                  <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse"></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Prevenção de Conflitos</span>
                  <span className="text-[10px] font-black bg-green-500/10 text-green-500 px-2 py-0.5 rounded border border-green-500/20">
                    ATIVO
                  </span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </ErrorBoundary>
  );
}
