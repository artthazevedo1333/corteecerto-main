import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Building2,
  CalendarDays,
  Globe,
  Wallet,
  CreditCard,
  Users,
  Bell,
  Shield,
  Database,
  Search,
  Menu,
  Loader2,
  Camera,
  LogOut,
  ExternalLink,
  Copy,
  Download,
  Upload,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import { RegionSettings } from "@/components/settings/RegionSettings";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/_layout/settings")({
  component: SettingsPageWrapper,
});

function SettingsPageWrapper() {
  return (
    <ErrorBoundary>
      <SettingsCenter />
    </ErrorBoundary>
  );
}

type SectionKey =
  | "empresa"
  | "agenda"
  | "online"
  | "financeiro"
  | "assinatura"
  | "equipe"
  | "notificacoes"
  | "seguranca"
  | "dados";

type CategoryDef = {
  key: SectionKey;
  label: string;
  description: string;
  icon: ReactNode;
  keywords: string[];
};

const CATEGORIES: CategoryDef[] = [
  {
    key: "empresa",
    label: "Empresa",
    description: "Identidade, endereço e marca",
    icon: <Building2 className="h-4 w-4" />,
    keywords: [
      "nome",
      "logo",
      "logotipo",
      "capa",
      "telefone",
      "endereço",
      "cidade",
      "estado",
      "descrição",
      "cor",
      "marca",
      "identidade",
    ],
  },
  {
    key: "agenda",
    label: "Agenda",
    description: "Horários e regras de atendimento",
    icon: <CalendarDays className="h-4 w-4" />,
    keywords: [
      "horário",
      "horarios",
      "funcionamento",
      "intervalos",
      "antecedência",
      "confirmação",
      "agenda",
    ],
  },
  {
    key: "online",
    label: "Agendamento Online",
    description: "Link público e página de agendamento",
    icon: <Globe className="h-4 w-4" />,
    keywords: ["link", "público", "online", "compartilhar", "tema", "capa", "mensagem"],
  },
  {
    key: "financeiro",
    label: "Financeiro",
    description: "Moeda, categorias e pagamentos",
    icon: <Wallet className="h-4 w-4" />,
    keywords: ["moeda", "data", "categorias", "pagamento", "financeiro", "métodos"],
  },
  {
    key: "assinatura",
    label: "Assinatura",
    description: "Plano, cobrança e histórico",
    icon: <CreditCard className="h-4 w-4" />,
    keywords: ["plano", "assinatura", "cobrança", "cancelar", "histórico", "pagamentos", "premium"],
  },
  {
    key: "equipe",
    label: "Equipe",
    description: "Profissionais, permissões e funções",
    icon: <Users className="h-4 w-4" />,
    keywords: ["equipe", "profissionais", "permissões", "funções", "membros", "barbeiros"],
  },
  {
    key: "notificacoes",
    label: "Notificações",
    description: "Lembretes e mensagens automáticas",
    icon: <Bell className="h-4 w-4" />,
    keywords: [
      "notificações",
      "lembretes",
      "confirmações",
      "cancelamentos",
      "mensagens",
      "whatsapp",
    ],
  },
  {
    key: "seguranca",
    label: "Segurança",
    description: "Senha, sessões e acessos",
    icon: <Shield className="h-4 w-4" />,
    keywords: ["senha", "sessões", "acessos", "logout", "segurança", "dispositivos"],
  },
  {
    key: "dados",
    label: "Dados",
    description: "Exportar, importar e excluir",
    icon: <Database className="h-4 w-4" />,
    keywords: ["exportar", "importar", "backup", "excluir", "dados"],
  },
];

function SettingsCenter() {
  const [active, setActive] = useState<SectionKey>("empresa");
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.includes(q)),
    );
  }, [query]);

  // If search yields matches and current active isn't in results, jump to first match
  useEffect(() => {
    if (query.trim() && filtered.length > 0 && !filtered.find((c) => c.key === active)) {
      setActive(filtered[0].key);
    }
  }, [query, filtered, active]);

  const Sidebar = (
    <nav className="space-y-1">
      {filtered.map((c) => (
        <button
          key={c.key}
          onClick={() => {
            setActive(c.key);
            setMobileOpen(false);
          }}
          className={cn(
            "w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors border",
            active === c.key
              ? "bg-primary/10 border-primary/20 text-foreground"
              : "border-transparent hover:bg-secondary/60 text-muted-foreground hover:text-foreground",
          )}
        >
          <span
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border",
              active === c.key
                ? "bg-primary/15 text-primary border-primary/20"
                : "bg-secondary text-muted-foreground border-border",
            )}
          >
            {c.icon}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold truncate text-foreground">{c.label}</span>
            <span className="block text-[11px] text-muted-foreground truncate">
              {c.description}
            </span>
          </span>
        </button>
      ))}
      {filtered.length === 0 && (
        <p className="text-xs text-muted-foreground px-3 py-4">Nenhuma configuração encontrada.</p>
      )}
    </nav>
  );

  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Header */}
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight">Configurações</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Centro administrativo da sua barbearia.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar configuração..."
              className="pl-9 h-10 rounded-xl"
            />
          </div>
          {/* Mobile sidebar trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Abrir categorias"
                className="md:hidden h-11 w-11 rounded-xl"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-4">
              <h2 className="text-sm font-semibold mb-3">Categorias</h2>
              {Sidebar}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden md:block sticky top-4 self-start">
          <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">{Sidebar}</div>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <div className="rounded-2xl border border-border bg-card shadow-sm p-5 md:p-6">
            {active === "empresa" && <CompanySection />}
            {active === "agenda" && <AgendaSection />}
            {active === "online" && <OnlineSection />}
            {active === "financeiro" && <FinanceiroSection />}
            {active === "assinatura" && <AssinaturaSection />}
            {active === "equipe" && <EquipeSection />}
            {active === "notificacoes" && <NotificacoesSection />}
            {active === "seguranca" && <SegurancaSection />}
            {active === "dados" && <DadosSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-5">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </header>
  );
}

function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

function LinkRow({
  to,
  title,
  description,
  icon,
}: {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/40 transition-colors"
    >
      <span className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
    </Link>
  );
}

/* ---------------- Empresa ---------------- */

function CompanySection() {
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        setEmail(user.email || "");
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        setProfile(
          data || {
            id: user.id,
            full_name: user.user_metadata?.full_name || "",
            barber_shop_name: "",
          },
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: profile.id,
        full_name: profile.full_name,
        barber_shop_name: profile.barber_shop_name,
        business_phone: profile.business_phone,
        business_address: profile.business_address,
        business_city: profile.business_city,
        business_state: profile.business_state,
        business_description: profile.business_description,
        brand_color: profile.brand_color,
        brand_color_secondary: profile.brand_color_secondary,
        cover_url: profile.cover_url,
        updated_at: new Date().toISOString(),
      } as any);

      if (error) throw error;
      toast.success("Dados da empresa atualizados");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingBlock />;

  const initials =
    (profile?.barber_shop_name || profile?.full_name || email || "B")
      .split(" ")
      .map((s: string) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "B";

  return (
    <>
      <SectionHeader title="Empresa" subtitle="Identidade visual e informações da barbearia." />
      <form onSubmit={save} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-secondary/40 border border-border">
          <div className="relative">
            <div
              className="h-20 w-20 rounded-2xl bg-card border border-border flex items-center justify-center overflow-hidden shadow-sm"
              style={profile?.brand_color ? { borderColor: profile.brand_color } : undefined}
            >
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Logo" className="h-full w-full object-cover" />
              ) : (
                <span
                  className="text-xl font-semibold"
                  style={{ color: profile?.brand_color || "hsl(var(--primary))" }}
                >
                  {initials}
                </span>
              )}
            </div>
            <button
              type="button"
              className="absolute -bottom-1.5 -right-1.5 h-8 w-8 rounded-lg bg-primary text-primary-foreground shadow-md flex items-center justify-center border-2 border-card"
              aria-label="Alterar logotipo"
              onClick={() => toast.info("Upload de imagem em breve")}
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="text-center sm:text-left min-w-0">
            <p className="text-base font-semibold truncate">
              {profile?.barber_shop_name || "Sua barbearia"}
            </p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome da empresa">
            <Input
              value={profile?.barber_shop_name || ""}
              onChange={(e) => setProfile({ ...profile, barber_shop_name: e.target.value })}
              placeholder="Ex.: Corte Certo Barber"
            />
          </Field>
          <Field label="Telefone">
            <Input
              value={profile?.business_phone || ""}
              onChange={(e) => setProfile({ ...profile, business_phone: e.target.value })}
              placeholder="(11) 90000-0000"
            />
          </Field>
          <Field label="Endereço" className="sm:col-span-2">
            <Input
              value={profile?.business_address || ""}
              onChange={(e) => setProfile({ ...profile, business_address: e.target.value })}
              placeholder="Rua, número, bairro"
            />
          </Field>
          <Field label="Cidade">
            <Input
              value={profile?.business_city || ""}
              onChange={(e) => setProfile({ ...profile, business_city: e.target.value })}
              placeholder="Sua cidade"
            />
          </Field>
          <Field label="Estado">
            <Input
              value={profile?.business_state || ""}
              onChange={(e) => setProfile({ ...profile, business_state: e.target.value })}
              placeholder="UF"
            />
          </Field>
          <Field label="Descrição" className="sm:col-span-2">
            <Textarea
              value={profile?.business_description || ""}
              onChange={(e) => setProfile({ ...profile, business_description: e.target.value })}
              placeholder="Conte um pouco sobre a sua barbearia"
              rows={3}
            />
          </Field>
          <Field label="Cor principal">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={profile?.brand_color || "#f59e0b"}
                onChange={(e) => setProfile({ ...profile, brand_color: e.target.value })}
                className="h-10 w-14 rounded-lg border border-border bg-card cursor-pointer"
              />
              <Input
                value={profile?.brand_color || ""}
                onChange={(e) => setProfile({ ...profile, brand_color: e.target.value })}
                placeholder="#F59E0B"
              />
            </div>
          </Field>
          <Field label="Cor secundária">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={profile?.brand_color_secondary || "#0f172a"}
                onChange={(e) => setProfile({ ...profile, brand_color_secondary: e.target.value })}
                className="h-10 w-14 rounded-lg border border-border bg-card cursor-pointer"
              />
              <Input
                value={profile?.brand_color_secondary || ""}
                onChange={(e) => setProfile({ ...profile, brand_color_secondary: e.target.value })}
                placeholder="#0F172A"
              />
            </div>
          </Field>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="h-10 rounded-xl px-5">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Salvando
              </>
            ) : (
              "Salvar alterações"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}

/* ---------------- Agenda ---------------- */

type Hours = {
  enabled: boolean;
  open: string;
  close: string;
};
const DAYS: { key: string; label: string }[] = [
  { key: "mon", label: "Seg" },
  { key: "tue", label: "Ter" },
  { key: "wed", label: "Qua" },
  { key: "thu", label: "Qui" },
  { key: "fri", label: "Sex" },
  { key: "sat", label: "Sáb" },
  { key: "sun", label: "Dom" },
];

function AgendaSection() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return setLoading(false);
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      setProfile(data || { id: user.id });
      setLoading(false);
    })();
  }, []);

  const hours: Record<string, Hours> = useMemo(() => {
    const raw = profile?.opening_hours || {};
    const out: Record<string, Hours> = {};
    for (const d of DAYS) {
      out[d.key] = raw[d.key] || { enabled: d.key !== "sun", open: "09:00", close: "19:00" };
    }
    return out;
  }, [profile]);

  const setHours = (key: string, patch: Partial<Hours>) => {
    setProfile({
      ...profile,
      opening_hours: { ...hours, [key]: { ...hours[key], ...patch } },
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          opening_hours: hours,
          booking_min_notice_min: Number(profile?.booking_min_notice_min ?? 30),
          booking_max_advance_days: Number(profile?.booking_max_advance_days ?? 30),
          booking_auto_confirm: !!profile?.booking_auto_confirm,
          booking_break_min: Number(profile?.booking_break_min ?? 0),
          updated_at: new Date().toISOString(),
        } as any)

        .eq("id", profile.id);
      if (error) throw error;
      toast.success("Regras da agenda atualizadas");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingBlock />;

  return (
    <>
      <SectionHeader title="Agenda" subtitle="Horários de funcionamento e regras de agendamento." />
      <div className="space-y-6">
        <div className="rounded-xl border border-border divide-y divide-border">
          {DAYS.map((d) => {
            const h = hours[d.key];
            return (
              <div key={d.key} className="flex items-center gap-3 p-3">
                <div className="w-14 text-sm font-medium">{d.label}</div>
                <Switch
                  checked={h.enabled}
                  onCheckedChange={(v) => setHours(d.key, { enabled: v })}
                />
                <div className="flex items-center gap-2 ml-auto">
                  <Input
                    type="time"
                    value={h.open}
                    disabled={!h.enabled}
                    onChange={(e) => setHours(d.key, { open: e.target.value })}
                    className="h-9 w-28"
                  />
                  <span className="text-muted-foreground text-xs">até</span>
                  <Input
                    type="time"
                    value={h.close}
                    disabled={!h.enabled}
                    onChange={(e) => setHours(d.key, { close: e.target.value })}
                    className="h-9 w-28"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Intervalo entre agendamentos (min)">
            <Input
              type="number"
              value={profile?.booking_break_min ?? 0}
              onChange={(e) => setProfile({ ...profile, booking_break_min: e.target.value })}
            />
          </Field>
          <Field label="Antecedência mínima (min)">
            <Input
              type="number"
              value={profile?.booking_min_notice_min ?? 30}
              onChange={(e) => setProfile({ ...profile, booking_min_notice_min: e.target.value })}
            />
          </Field>
          <Field label="Antecedência máxima (dias)">
            <Input
              type="number"
              value={profile?.booking_max_advance_days ?? 30}
              onChange={(e) => setProfile({ ...profile, booking_max_advance_days: e.target.value })}
            />
          </Field>
          <div className="flex items-center justify-between rounded-xl border border-border p-3">
            <div>
              <p className="text-sm font-medium">Confirmação automática</p>
              <p className="text-xs text-muted-foreground">
                Agendamentos são confirmados sem revisão manual.
              </p>
            </div>
            <Switch
              checked={!!profile?.booking_auto_confirm}
              onCheckedChange={(v) => setProfile({ ...profile, booking_auto_confirm: v })}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={save} disabled={saving} className="h-10 rounded-xl px-5">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Salvar alterações
          </Button>
        </div>
      </div>
    </>
  );
}

/* ---------------- Agendamento Online ---------------- */

function OnlineSection() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return setLoading(false);
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      setProfile(data || { id: user.id });
      setLoading(false);
    })();
  }, []);

  const publicUrl = useMemo(() => {
    if (typeof window === "undefined" || !profile?.public_slug) return "";
    return `${window.location.origin}/booking/${profile.public_slug}`;
  }, [profile?.public_slug]);

  const save = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          booking_enabled: !!profile?.booking_enabled,
          booking_public_message: profile?.booking_public_message || null,
          booking_theme: profile?.booking_theme || "auto",
          booking_cover_url: profile?.booking_cover_url || null,
          updated_at: new Date().toISOString(),
        } as any)

        .eq("id", profile.id);
      if (error) throw error;
      toast.success("Página pública atualizada");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingBlock />;

  return (
    <>
      <SectionHeader
        title="Agendamento Online"
        subtitle="Página pública para seus clientes agendarem."
      />
      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-xl border border-border p-4">
          <div>
            <p className="text-sm font-medium">Agendamento online ativo</p>
            <p className="text-xs text-muted-foreground">
              Permite receber agendamentos pelo link público.
            </p>
          </div>
          <Switch
            checked={!!profile?.booking_enabled}
            onCheckedChange={(v) => setProfile({ ...profile, booking_enabled: v })}
          />
        </div>

        {publicUrl && (
          <div className="rounded-xl border border-border p-4 flex items-center gap-3">
            <Globe className="h-4 w-4 text-primary shrink-0" />
            <code className="text-xs truncate flex-1">{publicUrl}</code>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(publicUrl);
                toast.success("Link copiado");
              }}
            >
              <Copy className="h-3.5 w-3.5 mr-1.5" /> Copiar
            </Button>
          </div>
        )}

        <Field label="Mensagem pública">
          <Textarea
            value={profile?.booking_public_message || ""}
            onChange={(e) => setProfile({ ...profile, booking_public_message: e.target.value })}
            rows={3}
            placeholder="Mensagem exibida na sua página de agendamento."
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tema da página">
            <select
              value={profile?.booking_theme || "auto"}
              onChange={(e) => setProfile({ ...profile, booking_theme: e.target.value })}
              className="h-10 rounded-xl border border-border bg-background px-3 text-sm w-full"
            >
              <option value="auto">Automático</option>
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
            </select>
          </Field>
          <Field label="URL da imagem de capa">
            <Input
              value={profile?.booking_cover_url || ""}
              onChange={(e) => setProfile({ ...profile, booking_cover_url: e.target.value })}
              placeholder="https://..."
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <Button onClick={save} disabled={saving} className="h-10 rounded-xl px-5">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Salvar alterações
          </Button>
        </div>
      </div>
    </>
  );
}

/* ---------------- Financeiro ---------------- */

function FinanceiroSection() {
  return (
    <>
      <SectionHeader title="Financeiro" subtitle="Preferências de moeda, datas e pagamentos." />
      <div className="space-y-4">
        <RegionSettings />
        <div className="grid gap-3">
          <LinkRow
            to="/dashboard/finance"
            title="Categorias e lançamentos"
            description="Gerencie categorias e regras de fluxo."
            icon={<Wallet className="h-4 w-4" />}
          />
          <LinkRow
            to="/dashboard/commissions"
            title="Comissões"
            description="Configure comissões por profissional."
            icon={<Users className="h-4 w-4" />}
          />
        </div>
      </div>
    </>
  );
}

/* ---------------- Assinatura ---------------- */

function AssinaturaSection() {
  return (
    <>
      <SectionHeader title="Assinatura" subtitle="Plano, cobrança e histórico de pagamentos." />
      <div className="grid gap-3">
        <LinkRow
          to="/dashboard/subscription"
          title="Gerenciar assinatura"
          description="Plano atual, status, próxima cobrança e histórico."
          icon={<CreditCard className="h-4 w-4" />}
        />
        <LinkRow
          to="/dashboard/vip-plans"
          title="Planos VIP dos clientes"
          description="Ofereça assinaturas mensais aos seus clientes."
          icon={<CreditCard className="h-4 w-4" />}
        />
      </div>
    </>
  );
}

/* ---------------- Equipe ---------------- */

function EquipeSection() {
  return (
    <>
      <SectionHeader title="Equipe" subtitle="Profissionais, permissões e funções." />
      <div className="grid gap-3">
        <LinkRow
          to="/dashboard/commissions"
          title="Profissionais e comissões"
          description="Cadastre profissionais e defina suas comissões."
          icon={<Users className="h-4 w-4" />}
        />
        <LinkRow
          to="/admin"
          title="Permissões e funções"
          description="Papéis administrativos e acesso ao painel."
          icon={<Shield className="h-4 w-4" />}
        />
      </div>
    </>
  );
}

/* ---------------- Notificações ---------------- */

function NotificacoesSection() {
  return (
    <>
      <SectionHeader
        title="Notificações"
        subtitle="Lembretes, confirmações e mensagens automáticas."
      />
      <div className="grid gap-3">
        <LinkRow
          to="/dashboard/settings/communications"
          title="Central de Comunicação"
          description="Ative ou desative cada aviso automático por evento."
          icon={<Bell className="h-4 w-4" />}
        />
        <LinkRow
          to="/dashboard/settings/notifications"
          title="Preferências de notificação"
          description="Escolha o que deseja receber."
          icon={<Bell className="h-4 w-4" />}
        />
        <LinkRow
          to="/dashboard/settings/notifications"
          title="Templates de WhatsApp"
          description="Personalize confirmações, lembretes e agradecimentos."
          icon={<Bell className="h-4 w-4" />}
        />
      </div>
    </>
  );
}

/* ---------------- Segurança ---------------- */

function SegurancaSection() {
  return (
    <>
      <SectionHeader title="Segurança" subtitle="Sua conta protegida." />
      <div className="grid gap-3">
        <LinkRow
          to="/dashboard/settings/security"
          title="Senha e sessões"
          description="Alterar senha e revisar dispositivos conectados."
          icon={<Shield className="h-4 w-4" />}
        />
      </div>
      <div className="mt-6 flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4">
        <div>
          <p className="text-sm font-medium">Sair da conta</p>
          <p className="text-xs text-muted-foreground">Encerra sua sessão neste dispositivo.</p>
        </div>
        <Button
          variant="outline"
          className="h-10 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
          onClick={() => supabase.auth.signOut()}
        >
          <LogOut className="h-4 w-4 mr-2" /> Sair
        </Button>
      </div>
    </>
  );
}

/* ---------------- Dados ---------------- */

function DadosSection() {
  const exportData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const [clients, appointments, services, financial, products] = await Promise.all([
        supabase.from("clients").select("*").eq("user_id", user.id),
        supabase.from("appointments").select("*").eq("user_id", user.id),
        supabase.from("services").select("*").eq("user_id", user.id),
        supabase.from("financial_records").select("*").eq("user_id", user.id),
        supabase.from("products").select("*").eq("user_id", user.id),
      ]);
      const payload = {
        exported_at: new Date().toISOString(),
        clients: clients.data ?? [],
        appointments: appointments.data ?? [],
        services: services.data ?? [],
        financial_records: financial.data ?? [],
        products: products.data ?? [],
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `corte-certo-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Backup gerado com sucesso");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao exportar dados");
    }
  };

  return (
    <>
      <SectionHeader title="Dados" subtitle="Exportar, importar e gerenciar seus dados." />
      <div className="grid gap-3">
        <button
          onClick={exportData}
          className="group flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/40 transition-colors text-left"
        >
          <span className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
            <Download className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Exportar dados</p>
            <p className="text-xs text-muted-foreground">
              Baixe um arquivo JSON com todos os seus dados.
            </p>
          </div>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0" />
        </button>

        <button
          onClick={() => toast.info("Importação de dados em breve")}
          className="group flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/40 transition-colors text-left"
        >
          <span className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
            <Upload className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Importar dados</p>
            <p className="text-xs text-muted-foreground">Traga dados de outra ferramenta.</p>
          </div>
        </button>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4">
          <div>
            <p className="text-sm font-medium">Excluir empresa</p>
            <p className="text-xs text-muted-foreground">
              Ação irreversível. Entre em contato com o suporte para prosseguir.
            </p>
          </div>
          <Button
            variant="outline"
            className="h-10 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
            onClick={() => toast.info("Solicite exclusão em suporte@cortecerto.app")}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Excluir
          </Button>
        </div>
      </div>
    </>
  );
}

/* ---------------- misc ---------------- */

function LoadingBlock() {
  return (
    <div className="flex items-center justify-center py-16 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin mr-2" />
      <span className="text-sm">Carregando…</span>
    </div>
  );
}
