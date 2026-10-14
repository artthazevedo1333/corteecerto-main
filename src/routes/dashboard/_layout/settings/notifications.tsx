import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Bell,
  Package,
  Calendar,
  AlertTriangle,
  Save,
  Loader2,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import {
  TEMPLATE_LABELS,
  TEMPLATE_DEFAULTS,
  getAllTemplates,
  saveTemplates,
  resetTemplates,
  type WaTemplateKey,
} from "@/lib/wa-templates";

export const Route = createFileRoute("/dashboard/_layout/settings/notifications")({
  component: NotificationSettingsPageWrapper,
});

function NotificationSettingsPageWrapper() {
  return (
    <ErrorBoundary>
      <NotificationSettingsPage />
    </ErrorBoundary>
  );
}

function NotificationSettingsPage() {
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
      toast.error("Erro ao carregar preferências");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          notification_preferences: profile.notification_preferences,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (error) throw error;
      toast.success("Preferências atualizadas!");
    } catch (error: any) {
      toast.error("Erro ao salvar alterações");
    } finally {
      setSaving(false);
    }
  };

  const togglePreference = (key: string) => {
    const newPrefs = { ...profile.notification_preferences };
    newPrefs[key] = !newPrefs[key];
    setProfile({ ...profile, notification_preferences: newPrefs });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-pulse">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <div className="text-xl font-black text-muted-foreground uppercase tracking-widest">
          Carregando preferências...
        </div>
      </div>
    );

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-20">
      <header>
        <h1 className="text-3xl font-black tracking-tight uppercase italic">
          Notificações & Alertas
        </h1>
        <p className="text-muted-foreground font-medium text-lg">
          Escolha quais avisos você deseja receber no sistema.
        </p>
      </header>

      <div className="grid gap-6">
        <PreferenceCard
          icon={<Calendar className="h-6 w-6 text-primary" />}
          title="Lembretes de Agenda"
          description="Avisos sobre próximos horários e mudanças nos agendamentos."
          checked={profile?.notification_preferences?.reminders}
          onCheckedChange={() => togglePreference("reminders")}
        />

        <PreferenceCard
          icon={<Package className="h-6 w-6 text-orange-500" />}
          title="Alertas de Estoque"
          description="Avisos automáticos quando um produto atingir o nível crítico de estoque."
          checked={profile?.notification_preferences?.stock_alerts}
          onCheckedChange={() => togglePreference("stock_alerts")}
        />

        <PreferenceCard
          icon={<AlertTriangle className="h-6 w-6 text-yellow-500" />}
          title="Clientes em Risco"
          description="Notificações sobre clientes frequentes que não aparecem há mais de 30 dias."
          checked={profile?.notification_preferences?.risk_clients}
          onCheckedChange={() => togglePreference("risk_clients")}
        />
      </div>

      <WhatsAppTemplates />

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          className="h-16 px-10 rounded-2xl font-black text-lg uppercase italic shadow-2xl shadow-primary/20 gap-3 w-full md:w-auto"
          disabled={saving}
        >
          {saving ? <Loader2 className="h-6 w-6 animate-spin" /> : <Save className="h-6 w-6" />}
          SALVAR PREFERÊNCIAS
        </Button>
      </div>
    </div>
  );
}

function WhatsAppTemplates() {
  const [tpl, setTpl] = useState(() => getAllTemplates());
  const keys: WaTemplateKey[] = ["confirm", "reminder", "cancel", "thanks"];

  const update = (k: WaTemplateKey, v: string) => setTpl((prev) => ({ ...prev, [k]: v }));
  const save = () => {
    saveTemplates(tpl);
    toast.success("Templates salvos");
  };
  const reset = () => {
    resetTemplates();
    setTpl({ ...TEMPLATE_DEFAULTS });
    toast.success("Templates restaurados");
  };

  return (
    <Card className="rounded-[2rem] border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-black uppercase italic tracking-tight">
          <MessageCircle className="h-6 w-6 text-green-500" />
          Templates de WhatsApp
        </CardTitle>
        <p className="text-sm text-muted-foreground font-medium">
          Personalize as mensagens automáticas. Variáveis: <code>{"{cliente}"}</code>,{" "}
          <code>{"{data}"}</code>, <code>{"{hora}"}</code>, <code>{"{servico}"}</code>
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {keys.map((k) => (
          <div key={k} className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              {TEMPLATE_LABELS[k]}
            </Label>
            <Textarea
              value={tpl[k]}
              onChange={(e) => update(k, e.target.value)}
              rows={3}
              className="rounded-xl font-medium"
            />
          </div>
        ))}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button onClick={save} className="h-12 rounded-xl font-black gap-2">
            <Save className="h-4 w-4" /> SALVAR TEMPLATES
          </Button>
          <Button onClick={reset} variant="outline" className="h-12 rounded-xl font-black gap-2">
            <RotateCcw className="h-4 w-4" /> RESTAURAR PADRÃO
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PreferenceCard({
  icon,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: () => void;
}) {
  return (
    <Card className="rounded-[2rem] border-border bg-card shadow-sm hover:border-primary/20 transition-all overflow-hidden">
      <CardContent className="p-8 flex items-center justify-between gap-6">
        <div className="flex items-start gap-6">
          <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center border border-border shrink-0 mt-1">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-black uppercase italic tracking-tight">{title}</h3>
            <p className="text-muted-foreground font-medium text-base leading-tight mt-1">
              {description}
            </p>
          </div>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} className="scale-125" />
      </CardContent>
    </Card>
  );
}
