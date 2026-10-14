import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Store,
  MapPin,
  Phone,
  Instagram,
  Clock,
  Save,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/dashboard/_layout/settings/business")({
  component: BusinessSettingsPageWrapper,
});

function BusinessSettingsPageWrapper() {
  return (
    <ErrorBoundary>
      <BusinessSettingsPage />
    </ErrorBoundary>
  );
}

const DAYS = [
  { id: "mon", label: "Segunda" },
  { id: "tue", label: "Terça" },
  { id: "wed", label: "Quarta" },
  { id: "thu", label: "Quinta" },
  { id: "fri", label: "Sexta" },
  { id: "sat", label: "Sábado" },
  { id: "sun", label: "Domingo" },
];

function BusinessSettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast.error("Erro ao carregar dados da barbearia");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          barber_shop_name: profile.barber_shop_name,
          business_address: profile.business_address,
          business_city: profile.business_city,
          business_state: profile.business_state,
          business_zip: profile.business_zip,
          business_phone: profile.business_phone,
          business_whatsapp: profile.business_whatsapp,
          business_instagram: profile.business_instagram,
          opening_hours: profile.opening_hours,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (error) throw error;
      toast.success("Dados da unidade salvos!");
    } catch (error: any) {
      toast.error("Erro ao salvar alterações");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-pulse">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <div className="text-xl font-black text-muted-foreground uppercase tracking-widest">
          Carregando unidade...
        </div>
      </div>
    );

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <header>
        <h1 className="text-3xl font-black tracking-tight uppercase italic">
          {profile?.barber_shop_name || "Sua Unidade"}
        </h1>
        <p className="text-muted-foreground font-medium text-lg">
          Gerencie os detalhes públicos e horários da sua barbearia.
        </p>
      </header>

      <form onSubmit={handleSave} className="grid gap-8">
        {/* Basic Info */}
        <Card className="rounded-[2rem] border-border bg-card shadow-sm overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" /> Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Nome da Barbearia
                </Label>
                <Input
                  value={profile?.barber_shop_name || ""}
                  onChange={(e) => setProfile({ ...profile, barber_shop_name: e.target.value })}
                  placeholder="Ex: Barber Shop Professional"
                  className="h-12 font-bold rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Logo da Unidade
                </Label>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center border border-border">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl h-12 font-black uppercase text-xs"
                  >
                    ALTERAR LOGO
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Telefone Fixo
                </Label>
                <Input
                  value={profile?.business_phone || ""}
                  onChange={(e) => setProfile({ ...profile, business_phone: e.target.value })}
                  className="h-12 font-bold rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  WhatsApp de Contato
                </Label>
                <Input
                  value={profile?.business_whatsapp || ""}
                  onChange={(e) => setProfile({ ...profile, business_whatsapp: e.target.value })}
                  className="h-12 font-bold rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Instagram (@usuario)
                </Label>
                <Input
                  value={profile?.business_instagram || ""}
                  onChange={(e) => setProfile({ ...profile, business_instagram: e.target.value })}
                  className="h-12 font-bold rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Info */}
        <Card className="rounded-[2rem] border-border bg-card shadow-sm overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" /> Endereço
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                Endereço Completo
              </Label>
              <Input
                value={profile?.business_address || ""}
                onChange={(e) => setProfile({ ...profile, business_address: e.target.value })}
                placeholder="Ex: Av. Principal, 123 - Centro"
                className="h-12 font-bold rounded-xl"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Cidade
                </Label>
                <Input
                  value={profile?.business_city || ""}
                  onChange={(e) => setProfile({ ...profile, business_city: e.target.value })}
                  className="h-12 font-bold rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Estado
                </Label>
                <Input
                  value={profile?.business_state || ""}
                  onChange={(e) => setProfile({ ...profile, business_state: e.target.value })}
                  className="h-12 font-bold rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  CEP
                </Label>
                <Input
                  value={profile?.business_zip || ""}
                  onChange={(e) => setProfile({ ...profile, business_zip: e.target.value })}
                  className="h-12 font-bold rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Opening Hours */}
        <Card className="rounded-[2rem] border-border bg-card shadow-sm overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" /> Horário de Funcionamento
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            {DAYS.map((day) => (
              <div
                key={day.id}
                className="flex items-center justify-between p-4 bg-secondary/20 rounded-2xl border border-border"
              >
                <div className="flex items-center gap-4">
                  <Switch
                    checked={profile?.opening_hours?.[day.id]?.active}
                    onCheckedChange={(checked) => {
                      const newHours = { ...profile.opening_hours };
                      newHours[day.id] = { ...newHours[day.id], active: checked };
                      setProfile({ ...profile, opening_hours: newHours });
                    }}
                  />
                  <span className="font-black uppercase italic text-sm tracking-tight w-24">
                    {day.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={profile?.opening_hours?.[day.id]?.open || "09:00"}
                    disabled={!profile?.opening_hours?.[day.id]?.active}
                    onChange={(e) => {
                      const newHours = { ...profile.opening_hours };
                      newHours[day.id] = { ...newHours[day.id], open: e.target.value };
                      setProfile({ ...profile, opening_hours: newHours });
                    }}
                    className="w-24 h-10 font-bold"
                  />
                  <span className="text-muted-foreground">às</span>
                  <Input
                    type="time"
                    value={profile?.opening_hours?.[day.id]?.close || "18:00"}
                    disabled={!profile?.opening_hours?.[day.id]?.active}
                    onChange={(e) => {
                      const newHours = { ...profile.opening_hours };
                      newHours[day.id] = { ...newHours[day.id], close: e.target.value };
                      setProfile({ ...profile, opening_hours: newHours });
                    }}
                    className="w-24 h-10 font-bold"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            className="h-16 rounded-2xl font-black text-lg uppercase italic shadow-2xl shadow-primary/20 gap-3 w-full md:w-auto"
            disabled={saving}
          >
            {saving ? <Loader2 className="h-6 w-6 animate-spin" /> : <Save className="h-6 w-6" />}
            SALVAR ALTERAÇÕES DA UNIDADE
          </Button>
        </div>
      </form>
    </div>
  );
}
