import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Scissors,
  Building2,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  PartyPopper,
  User,
} from "lucide-react";

const STORAGE_KEY = "cc:onboarding:draft:v1";

type OpeningHour = { open: string; close: string; closed: boolean };

interface Draft {
  step: number;
  shopName: string;
  brandColor: string;
  address: string;
  hours: Record<string, OpeningHour>;
  services: { name: string; price: string; duration: string; enabled: boolean }[];
  professionalName: string;
  useSelfAsPro: boolean;
}

const DAYS = [
  { key: "mon", label: "Segunda" },
  { key: "tue", label: "Terça" },
  { key: "wed", label: "Quarta" },
  { key: "thu", label: "Quinta" },
  { key: "fri", label: "Sexta" },
  { key: "sat", label: "Sábado" },
  { key: "sun", label: "Domingo" },
];

const DEFAULT_HOURS: Record<string, OpeningHour> = {
  mon: { open: "09:00", close: "19:00", closed: false },
  tue: { open: "09:00", close: "19:00", closed: false },
  wed: { open: "09:00", close: "19:00", closed: false },
  thu: { open: "09:00", close: "19:00", closed: false },
  fri: { open: "09:00", close: "19:00", closed: false },
  sat: { open: "09:00", close: "17:00", closed: false },
  sun: { open: "09:00", close: "13:00", closed: true },
};

const DEFAULT_SERVICES = [
  { name: "Corte", price: "45", duration: "30", enabled: true },
  { name: "Barba", price: "30", duration: "20", enabled: true },
  { name: "Corte + Barba", price: "70", duration: "50", enabled: true },
];

const DEFAULT_DRAFT: Draft = {
  step: 0,
  shopName: "",
  brandColor: "#F59E0B",
  address: "",
  hours: DEFAULT_HOURS,
  services: DEFAULT_SERVICES,
  professionalName: "",
  useSelfAsPro: true,
};

function loadDraft(): Draft {
  if (typeof window === "undefined") return DEFAULT_DRAFT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DRAFT;
    return { ...DEFAULT_DRAFT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_DRAFT;
  }
}

function saveDraft(d: Draft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  } catch {
    // ignore
  }
}

interface Props {
  open: boolean;
  userId: string;
  userName?: string | null;
  onComplete: () => void;
}

export function OnboardingWizard({ open, userId, userName, onComplete }: Props) {
  const [draft, setDraft] = useState<Draft>(() => loadDraft());
  const [saving, setSaving] = useState(false);
  const qc = useQueryClient();

  useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  const totalSteps = 6; // welcome + 5 conteúdo (finalização é a 6ª)
  const progress = ((draft.step + 1) / totalSteps) * 100;

  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const next = () => update({ step: Math.min(draft.step + 1, totalSteps - 1) });
  const back = () => update({ step: Math.max(draft.step - 1, 0) });

  const persistProfile = async (patch: Record<string, unknown>) => {
    const { error } = await (supabase.from("profiles") as any).update(patch).eq("id", userId);
    if (error) throw error;
  };

  const handleStepSave = async (): Promise<boolean> => {
    setSaving(true);
    try {
      if (draft.step === 1) {
        await persistProfile({
          barber_shop_name: draft.shopName.trim() || "Minha Barbearia",
          brand_color: draft.brandColor,
          business_address: draft.address.trim() || null,
        });
      } else if (draft.step === 2) {
        await persistProfile({ opening_hours: draft.hours });
      } else if (draft.step === 3) {
        const toInsert = draft.services
          .filter((s) => s.enabled && s.name.trim())
          .map((s) => ({
            user_id: userId,
            name: s.name.trim(),
            price: Number(s.price) || 0,
            duration_minutes: Number(s.duration) || 30,
            color: draft.brandColor,
            active: true,
          }));
        if (toInsert.length) {
          const { error } = await supabase.from("services").insert(toInsert);
          if (error) throw error;
        }
      } else if (draft.step === 4) {
        // Sem tabela de profissionais neste projeto — o dono já é o profissional.
        // Se o usuário digitou um nome diferente, atualizamos full_name.
        if (!draft.useSelfAsPro && draft.professionalName.trim()) {
          await persistProfile({ full_name: draft.professionalName.trim() });
        }
      }
      return true;
    } catch (err: any) {
      console.error("[onboarding] save error", err);
      toast.error("Não foi possível salvar. Tente novamente.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleAdvance = async () => {
    if (draft.step >= 1 && draft.step <= 4) {
      const ok = await handleStepSave();
      if (!ok) return;
    }
    next();
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      await persistProfile({ onboarding_completed_at: new Date().toISOString() });
      localStorage.removeItem(STORAGE_KEY);
      qc.invalidateQueries();
      toast.success("Tudo pronto! Bem-vindo ao Corte Certo.");
      onComplete();
    } catch (err) {
      console.error("[onboarding] finish error", err);
      toast.error("Erro ao finalizar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const stepIcon = useMemo(() => {
    const icons = [Scissors, Building2, Clock, Sparkles, User, PartyPopper];
    const I = icons[draft.step] ?? Scissors;
    return <I className="h-7 w-7 text-primary" />;
  }, [draft.step]);

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-lg p-0 gap-0 border-border rounded-3xl overflow-hidden [&>button]:hidden"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              {stepIcon}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Etapa {Math.min(draft.step + 1, totalSteps)} de {totalSteps}
              </div>
              <div className="text-lg font-bold tracking-tight truncate">
                {
                  [
                    "Boas-vindas",
                    "Sua barbearia",
                    "Horários",
                    "Serviços",
                    "Profissional",
                    "Tudo pronto",
                  ][draft.step]
                }
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
          {draft.step === 0 && (
            <div className="text-center space-y-4 py-6">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 ring-1 ring-primary/20">
                <Scissors className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Bem-vindo ao Corte Certo{userName ? `, ${userName.split(" ")[0]}` : ""}!
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Vamos preparar seu sistema em menos de 2 minutos.
                <br />
                Configure sua barbearia e comece a atender hoje mesmo.
              </p>
            </div>
          )}

          {draft.step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopName">Nome da barbearia</Label>
                <Input
                  id="shopName"
                  placeholder="Ex.: Barbearia do Zé"
                  value={draft.shopName}
                  onChange={(e) => update({ shopName: e.target.value })}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brandColor">Cor principal</Label>
                <div className="flex items-center gap-3">
                  <input
                    id="brandColor"
                    type="color"
                    value={draft.brandColor}
                    onChange={(e) => update({ brandColor: e.target.value })}
                    className="h-12 w-16 rounded-lg border border-border cursor-pointer bg-transparent"
                  />
                  <Input
                    value={draft.brandColor}
                    onChange={(e) => update({ brandColor: e.target.value })}
                    className="h-12 flex-1 font-mono"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço (opcional)</Label>
                <Input
                  id="address"
                  placeholder="Rua, número, bairro, cidade"
                  value={draft.address}
                  onChange={(e) => update({ address: e.target.value })}
                  className="h-12"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Você pode preencher tudo depois em Configurações.
              </p>
            </div>
          )}

          {draft.step === 2 && (
            <div className="space-y-2">
              {DAYS.map((d) => {
                const h = draft.hours[d.key];
                return (
                  <div
                    key={d.key}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Checkbox
                        checked={!h.closed}
                        onCheckedChange={(v) =>
                          update({
                            hours: { ...draft.hours, [d.key]: { ...h, closed: !v } },
                          })
                        }
                      />
                      <span className="font-medium truncate">{d.label}</span>
                    </div>
                    {h.closed ? (
                      <span className="text-xs text-muted-foreground">Fechado</span>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="time"
                          value={h.open}
                          onChange={(e) =>
                            update({
                              hours: {
                                ...draft.hours,
                                [d.key]: { ...h, open: e.target.value },
                              },
                            })
                          }
                          className="h-9 w-24 text-xs"
                        />
                        <span className="text-muted-foreground text-xs">às</span>
                        <Input
                          type="time"
                          value={h.close}
                          onChange={(e) =>
                            update({
                              hours: {
                                ...draft.hours,
                                [d.key]: { ...h, close: e.target.value },
                              },
                            })
                          }
                          className="h-9 w-24 text-xs"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {draft.step === 3 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Marque os serviços que já oferece. Você poderá editar valores e adicionar mais
                depois.
              </p>
              {draft.services.map((s, i) => (
                <div key={i} className="rounded-xl border border-border p-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={s.enabled}
                      onCheckedChange={(v) => {
                        const arr = [...draft.services];
                        arr[i] = { ...s, enabled: !!v };
                        update({ services: arr });
                      }}
                    />
                    <Input
                      value={s.name}
                      onChange={(e) => {
                        const arr = [...draft.services];
                        arr[i] = { ...s, name: e.target.value };
                        update({ services: arr });
                      }}
                      className="h-10 flex-1 font-medium"
                    />
                  </div>
                  {s.enabled && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Preço (R$)</Label>
                        <Input
                          type="number"
                          value={s.price}
                          onChange={(e) => {
                            const arr = [...draft.services];
                            arr[i] = { ...s, price: e.target.value };
                            update({ services: arr });
                          }}
                          className="h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Duração (min)</Label>
                        <Input
                          type="number"
                          value={s.duration}
                          onChange={(e) => {
                            const arr = [...draft.services];
                            arr[i] = { ...s, duration: e.target.value };
                            update({ services: arr });
                          }}
                          className="h-9"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  update({ services: draft.services.map((s) => ({ ...s, enabled: false })) })
                }
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                Fazer isso depois
              </button>
            </div>
          )}

          {draft.step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Quem irá atender? Se for apenas você, use seu próprio usuário.
              </p>
              <button
                type="button"
                onClick={() => update({ useSelfAsPro: true, professionalName: "" })}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  draft.useSelfAsPro
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">Usar meu usuário atual</div>
                    <div className="text-xs text-muted-foreground">
                      {userName || "Você"} será o profissional
                    </div>
                  </div>
                  {draft.useSelfAsPro && (
                    <CheckCircle2 className="h-5 w-5 text-primary ml-auto shrink-0" />
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => update({ useSelfAsPro: false })}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  !draft.useSelfAsPro
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="font-semibold mb-2">Cadastrar outro nome</div>
                <Input
                  placeholder="Nome do profissional"
                  value={draft.professionalName}
                  onChange={(e) =>
                    update({ professionalName: e.target.value, useSelfAsPro: false })
                  }
                  className="h-10"
                />
              </button>
            </div>
          )}

          {draft.step === 5 && (
            <div className="text-center space-y-4 py-6 animate-fade-in">
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-green-500/10 ring-1 ring-green-500/20 animate-scale-in">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Seu sistema está pronto!</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tudo configurado. Você já pode agendar clientes, controlar o financeiro e acompanhar
                sua barbearia crescendo.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-secondary/30 flex items-center justify-between gap-3">
          {draft.step > 0 && draft.step < 5 ? (
            <Button variant="ghost" onClick={back} disabled={saving} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          ) : (
            <span />
          )}
          {draft.step < 5 ? (
            <Button
              onClick={handleAdvance}
              disabled={saving}
              size="lg"
              className="gap-2 rounded-xl shadow-sm"
            >
              {draft.step === 0 ? "Começar" : "Continuar"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={saving}
              size="lg"
              className="w-full gap-2 rounded-xl shadow-sm"
            >
              <PartyPopper className="h-4 w-4" />
              Ir para o Painel
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
