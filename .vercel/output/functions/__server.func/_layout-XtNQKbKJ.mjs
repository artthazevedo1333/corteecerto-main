import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { d as useNavigate, e as useLocation, L as Link, O as Outlet } from "./_libs/tanstack__react-router.mjs";
import { s as supabase } from "./_ssr/client-DsJMwvTf.mjs";
import { u as useModules } from "./_ssr/use-modules-Coxz0RSf.mjs";
import { d as Button, I as Input, C as Card, c as cn } from "./_ssr/router-DONcpGkq.mjs";
import { u as useSubscription } from "./_ssr/use-subscription-DyCgx5h8.mjs";
import { P as PLAN_LABELS, e as effectiveFeaturesForSubscription, m as minPlanForFeature, T as TIER_LABELS, F as FEATURE_LABELS } from "./_ssr/subscription-D6ZG8HOt.mjs";
import { D as Dialog, b as DialogContent } from "./_ssr/dialog-2PAumXzc.mjs";
import { L as Label } from "./_ssr/label-nYamNITy.mjs";
import { P as Progress } from "./_ssr/progress-CiZLcE5d.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "./_libs/radix-ui__react-checkbox.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { a as useQueryClient } from "./_libs/tanstack__react-query.mjs";
import { S as Sheet, a as SheetTrigger, b as SheetContent } from "./_ssr/sheet-DBHRoVkj.mjs";
import { Z as LayoutDashboard, _ as Zap, $ as MessageSquareHeart, J as Calendar, U as Users, a0 as CreditCard, O as Package, F as Scissors, s as Crown, a1 as Percent, a2 as Globe, N as ChartColumn, a as Heart, a3 as UserPlus, l as Sparkles, a4 as Grid3x3, Q as Settings, i as Shield, a5 as LogOut, a6 as Menu, a7 as Building2, a8 as Clock, a9 as User, aa as PartyPopper, k as CircleCheck, A as ArrowLeft, ab as ArrowRight, ac as Lock, g as Check } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "./_libs/isbot.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-avatar.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/zod.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-progress.mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
function SubscriptionGate({ children }) {
  const { subscription, isLoading, hasAccess } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname.startsWith("/dashboard/subscription")) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse text-muted-foreground text-sm uppercase tracking-widest", children: "Verificando assinatura…" }) });
  }
  if (hasAccess) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };
  const statusLabel = {
    overdue: "Pagamento em atraso",
    suspended: "Acesso suspenso",
    cancelled: "Assinatura cancelada",
    trial: "Período de avaliação encerrado"
  };
  const label = subscription ? statusLabel[subscription.status] ?? "Acesso encerrado" : "Sem assinatura ativa";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg rounded-3xl border border-border bg-card shadow-xl p-8 md:p-10 text-center animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-8 w-8 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-3.5 w-3.5" }),
      subscription ? PLAN_LABELS[subscription.plan] : "Corte Certo",
      " · ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight mb-3", children: "Seu período de acesso terminou" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mb-8 leading-relaxed", children: "Renove sua assinatura para continuar utilizando o Corte Certo e manter sua barbearia rodando sem interrupções." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "flex-1 h-12 rounded-xl gap-2 shadow-sm",
          onClick: () => navigate({ to: "/dashboard/subscription" }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
            "Assinar agora"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          variant: "outline",
          className: "flex-1 h-12 rounded-xl gap-2",
          onClick: handleSignOut,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            "Sair da conta"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-xs text-muted-foreground", children: "Precisa de ajuda? Fale com nosso suporte." })
  ] }) });
}
function FeatureGate({ feature, children }) {
  const { subscription, isLoading } = useSubscription();
  const navigate = useNavigate();
  if (isLoading) return null;
  if (effectiveFeaturesForSubscription(subscription).includes(feature)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  }
  const requiredTier = minPlanForFeature(feature);
  const featureName = FEATURE_LABELS[feature];
  const tierName = TIER_LABELS[requiredTier];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center p-4 animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-lg rounded-3xl border-border bg-card p-8 md:p-10 text-center shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-8 w-8 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3.5 w-3.5" }),
      "Recurso exclusivo do plano ",
      tierName
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl md:text-3xl font-bold tracking-tight mb-3", children: [
      featureName,
      " está disponível no plano ",
      tierName
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-base mb-8 leading-relaxed", children: [
      "Faça upgrade da sua assinatura para desbloquear",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: featureName }),
      " e todos os recursos do plano",
      " ",
      tierName,
      ". Sua barbearia merece o próximo nível."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "flex-1 h-12 rounded-xl gap-2 shadow-sm",
          onClick: () => navigate({ to: "/dashboard/subscription" }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
            "Ver planos e fazer upgrade"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          variant: "outline",
          className: "flex-1 h-12 rounded-xl",
          onClick: () => navigate({ to: "/dashboard" }),
          children: "Voltar"
        }
      )
    ] })
  ] }) });
}
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const STORAGE_KEY = "cc:onboarding:draft:v1";
const DAYS = [
  { key: "mon", label: "Segunda" },
  { key: "tue", label: "Terça" },
  { key: "wed", label: "Quarta" },
  { key: "thu", label: "Quinta" },
  { key: "fri", label: "Sexta" },
  { key: "sat", label: "Sábado" },
  { key: "sun", label: "Domingo" }
];
const DEFAULT_HOURS = {
  mon: { open: "09:00", close: "19:00", closed: false },
  tue: { open: "09:00", close: "19:00", closed: false },
  wed: { open: "09:00", close: "19:00", closed: false },
  thu: { open: "09:00", close: "19:00", closed: false },
  fri: { open: "09:00", close: "19:00", closed: false },
  sat: { open: "09:00", close: "17:00", closed: false },
  sun: { open: "09:00", close: "13:00", closed: true }
};
const DEFAULT_SERVICES = [
  { name: "Corte", price: "45", duration: "30", enabled: true },
  { name: "Barba", price: "30", duration: "20", enabled: true },
  { name: "Corte + Barba", price: "70", duration: "50", enabled: true }
];
const DEFAULT_DRAFT = {
  step: 0,
  shopName: "",
  brandColor: "#F59E0B",
  address: "",
  hours: DEFAULT_HOURS,
  services: DEFAULT_SERVICES,
  professionalName: "",
  useSelfAsPro: true
};
function loadDraft() {
  if (typeof window === "undefined") return DEFAULT_DRAFT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DRAFT;
    return { ...DEFAULT_DRAFT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_DRAFT;
  }
}
function saveDraft(d) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  } catch {
  }
}
function OnboardingWizard({ open, userId, userName, onComplete }) {
  const [draft, setDraft] = reactExports.useState(() => loadDraft());
  const [saving, setSaving] = reactExports.useState(false);
  const qc = useQueryClient();
  reactExports.useEffect(() => {
    saveDraft(draft);
  }, [draft]);
  const totalSteps = 6;
  const progress = (draft.step + 1) / totalSteps * 100;
  const update = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const next = () => update({ step: Math.min(draft.step + 1, totalSteps - 1) });
  const back = () => update({ step: Math.max(draft.step - 1, 0) });
  const persistProfile = async (patch) => {
    const { error } = await supabase.from("profiles").update(patch).eq("id", userId);
    if (error) throw error;
  };
  const handleStepSave = async () => {
    setSaving(true);
    try {
      if (draft.step === 1) {
        await persistProfile({
          barber_shop_name: draft.shopName.trim() || "Minha Barbearia",
          brand_color: draft.brandColor,
          business_address: draft.address.trim() || null
        });
      } else if (draft.step === 2) {
        await persistProfile({ opening_hours: draft.hours });
      } else if (draft.step === 3) {
        const toInsert = draft.services.filter((s) => s.enabled && s.name.trim()).map((s) => ({
          user_id: userId,
          name: s.name.trim(),
          price: Number(s.price) || 0,
          duration_minutes: Number(s.duration) || 30,
          color: draft.brandColor,
          active: true
        }));
        if (toInsert.length) {
          const { error } = await supabase.from("services").insert(toInsert);
          if (error) throw error;
        }
      } else if (draft.step === 4) {
        if (!draft.useSelfAsPro && draft.professionalName.trim()) {
          await persistProfile({ full_name: draft.professionalName.trim() });
        }
      }
      return true;
    } catch (err) {
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
      await persistProfile({ onboarding_completed_at: (/* @__PURE__ */ new Date()).toISOString() });
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
  const stepIcon = reactExports.useMemo(() => {
    const icons = [Scissors, Building2, Clock, Sparkles, User, PartyPopper];
    const I = icons[draft.step] ?? Scissors;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(I, { className: "h-7 w-7 text-primary" });
  }, [draft.step]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg p-0 gap-0 border-border rounded-3xl overflow-hidden [&>button]:hidden",
      onEscapeKeyDown: (e) => e.preventDefault(),
      onPointerDownOutside: (e) => e.preventDefault(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-6 pb-4 border-b border-border bg-gradient-to-b from-primary/5 to-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/20", children: stepIcon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: [
                "Etapa ",
                Math.min(draft.step + 1, totalSteps),
                " de ",
                totalSteps
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold tracking-tight truncate", children: [
                "Boas-vindas",
                "Sua barbearia",
                "Horários",
                "Serviços",
                "Profissional",
                "Tudo pronto"
              ][draft.step] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-1.5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6 max-h-[60vh] overflow-y-auto", children: [
          draft.step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4 py-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 ring-1 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-10 w-10 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold tracking-tight", children: [
              "Bem-vindo ao Corte Certo",
              userName ? `, ${userName.split(" ")[0]}` : "",
              "!"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "Vamos preparar seu sistema em menos de 2 minutos.",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Configure sua barbearia e comece a atender hoje mesmo."
            ] })
          ] }),
          draft.step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "shopName", children: "Nome da barbearia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "shopName",
                  placeholder: "Ex.: Barbearia do Zé",
                  value: draft.shopName,
                  onChange: (e) => update({ shopName: e.target.value }),
                  className: "h-12"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brandColor", children: "Cor principal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "brandColor",
                    type: "color",
                    value: draft.brandColor,
                    onChange: (e) => update({ brandColor: e.target.value }),
                    className: "h-12 w-16 rounded-lg border border-border cursor-pointer bg-transparent"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: draft.brandColor,
                    onChange: (e) => update({ brandColor: e.target.value }),
                    className: "h-12 flex-1 font-mono"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Endereço (opcional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "address",
                  placeholder: "Rua, número, bairro, cidade",
                  value: draft.address,
                  onChange: (e) => update({ address: e.target.value }),
                  className: "h-12"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Você pode preencher tudo depois em Configurações." })
          ] }),
          draft.step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: DAYS.map((d) => {
            const h = draft.hours[d.key];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        checked: !h.closed,
                        onCheckedChange: (v) => update({
                          hours: { ...draft.hours, [d.key]: { ...h, closed: !v } }
                        })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate", children: d.label })
                  ] }),
                  h.closed ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Fechado" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "time",
                        value: h.open,
                        onChange: (e) => update({
                          hours: {
                            ...draft.hours,
                            [d.key]: { ...h, open: e.target.value }
                          }
                        }),
                        className: "h-9 w-24 text-xs"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "às" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "time",
                        value: h.close,
                        onChange: (e) => update({
                          hours: {
                            ...draft.hours,
                            [d.key]: { ...h, close: e.target.value }
                          }
                        }),
                        className: "h-9 w-24 text-xs"
                      }
                    )
                  ] })
                ]
              },
              d.key
            );
          }) }),
          draft.step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Marque os serviços que já oferece. Você poderá editar valores e adicionar mais depois." }),
            draft.services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    checked: s.enabled,
                    onCheckedChange: (v) => {
                      const arr = [...draft.services];
                      arr[i] = { ...s, enabled: !!v };
                      update({ services: arr });
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: s.name,
                    onChange: (e) => {
                      const arr = [...draft.services];
                      arr[i] = { ...s, name: e.target.value };
                      update({ services: arr });
                    },
                    className: "h-10 flex-1 font-medium"
                  }
                )
              ] }),
              s.enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Preço (R$)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      value: s.price,
                      onChange: (e) => {
                        const arr = [...draft.services];
                        arr[i] = { ...s, price: e.target.value };
                        update({ services: arr });
                      },
                      className: "h-9"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Duração (min)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      value: s.duration,
                      onChange: (e) => {
                        const arr = [...draft.services];
                        arr[i] = { ...s, duration: e.target.value };
                        update({ services: arr });
                      },
                      className: "h-9"
                    }
                  )
                ] })
              ] })
            ] }, i)),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => update({ services: draft.services.map((s) => ({ ...s, enabled: false })) }),
                className: "text-xs text-muted-foreground hover:text-foreground underline underline-offset-4",
                children: "Fazer isso depois"
              }
            )
          ] }),
          draft.step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Quem irá atender? Se for apenas você, use seu próprio usuário." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => update({ useSelfAsPro: true, professionalName: "" }),
                className: `w-full rounded-xl border p-4 text-left transition-all ${draft.useSelfAsPro ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border hover:border-primary/40"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: "Usar meu usuário atual" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      userName || "Você",
                      " será o profissional"
                    ] })
                  ] }),
                  draft.useSelfAsPro && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-primary ml-auto shrink-0" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => update({ useSelfAsPro: false }),
                className: `w-full rounded-xl border p-4 text-left transition-all ${!draft.useSelfAsPro ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border hover:border-primary/40"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold mb-2", children: "Cadastrar outro nome" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Nome do profissional",
                      value: draft.professionalName,
                      onChange: (e) => update({ professionalName: e.target.value, useSelfAsPro: false }),
                      className: "h-10"
                    }
                  )
                ]
              }
            )
          ] }),
          draft.step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4 py-6 animate-fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-24 w-24 place-items-center rounded-full bg-green-500/10 ring-1 ring-green-500/20 animate-scale-in", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-green-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Seu sistema está pronto!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Tudo configurado. Você já pode agendar clientes, controlar o financeiro e acompanhar sua barbearia crescendo." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-border bg-secondary/30 flex items-center justify-between gap-3", children: [
          draft.step > 0 && draft.step < 5 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: back, disabled: saving, className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Voltar"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
          draft.step < 5 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleAdvance,
              disabled: saving,
              size: "lg",
              className: "gap-2 rounded-xl shadow-sm",
              children: [
                draft.step === 0 ? "Começar" : "Continuar",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleFinish,
              disabled: saving,
              size: "lg",
              className: "w-full gap-2 rounded-xl shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "h-4 w-4" }),
                "Ir para o Painel"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = reactExports.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = reactExports.useState(false);
  const [userEmail, setUserEmail] = reactExports.useState(null);
  const [onboarding, setOnboarding] = reactExports.useState(null);
  const checkOnboarding = async (userId, fullName) => {
    const {
      data
    } = await supabase.from("profiles").select("onboarding_completed_at, barber_shop_name").eq("id", userId).maybeSingle();
    const done = data?.onboarding_completed_at || data?.barber_shop_name;
    if (!done) setOnboarding({
      userId,
      userName: fullName
    });
    else setOnboarding(null);
  };
  reactExports.useEffect(() => {
    const checkUser = async () => {
      const {
        data: {
          session
        },
        error
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email ?? null);
      }
      if (error) {
        console.error("[Auth] Session check failed:", error);
        toast.error("Sua sessão expirou. Por favor, entre novamente.");
        navigate({
          to: "/auth",
          search: (old) => ({
            ...old
          })
        });
        return;
      }
      if (!session) {
        setTimeout(async () => {
          const retryRes = await supabase.auth.getSession();
          const retrySession = retryRes?.data?.session ?? null;
          if (retrySession?.user) {
            setUserEmail(retrySession.user.email ?? null);
          }
          if (!retrySession) {
            navigate({
              to: "/auth",
              search: (old) => ({
                ...old
              })
            });
          }
        }, 1500);
      } else {
        const {
          data: profile,
          error: profileError
        } = await supabase.from("profiles").select("id").eq("id", session.user.id).single();
        if (profileError && profileError.code === "PGRST116") {
          console.warn("[Auth] Profile missing after trigger, creating manually...");
          await supabase.from("profiles").upsert({
            id: session.user.id,
            full_name: session.user.user_metadata?.full_name || "Barbeiro"
          });
        }
        await checkOnboarding(session.user.id, session.user.user_metadata?.full_name ?? null);
      }
      setLoading(false);
    };
    checkUser();
    const subRes = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUserEmail(null);
        navigate({
          to: "/auth",
          search: (old) => ({
            ...old
          })
        });
      } else if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        setUserEmail(session?.user?.email ?? null);
        setLoading(false);
      }
    });
    return () => subRes?.data?.subscription?.unsubscribe();
  }, [navigate]);
  const handleSignOut = async () => {
    const {
      error
    } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erro ao sair da conta");
    } else {
      toast.success("Até logo!");
      navigate({
        to: "/auth",
        search: (old) => ({
          ...old
        })
      });
    }
  };
  const {
    isEnabled,
    isLoading: isModulesLoading
  } = useModules();
  const isSupremeAdmin = userEmail?.toLowerCase()?.trim() === "azevedoarthur120@gmail.com";
  if (loading || isModulesLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse text-primary font-bold text-xl uppercase tracking-widest", children: loading ? "Autenticando..." : "Carregando perfil..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-48 bg-secondary overflow-hidden rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary animate-progress origin-left" }) })
    ] }) });
  }
  const allNavItems = [
    {
      label: "Início",
      icon: LayoutDashboard,
      to: "/dashboard",
      module: null
    },
    {
      label: "Modo Barbeiro",
      icon: Zap,
      to: "/dashboard/barber-mode",
      module: null
    },
    // NOVO ITEM: Comunidade
    {
      label: "Comunidade",
      icon: MessageSquareHeart,
      to: "/dashboard/community",
      module: null
    },
    {
      label: "Agenda",
      icon: Calendar,
      to: "/dashboard/agenda",
      module: "agenda"
    },
    {
      label: "Clientes",
      icon: Users,
      to: "/dashboard/clients",
      module: "clients"
    },
    {
      label: "Financeiro",
      icon: CreditCard,
      to: "/dashboard/finance",
      module: "finance"
    },
    {
      label: "Estoque",
      icon: Package,
      to: "/dashboard/inventory",
      module: "inventory"
    },
    {
      label: "Serviços",
      icon: Scissors,
      to: "/dashboard/services",
      module: "services"
    },
    {
      label: "Planos VIP",
      icon: Crown,
      to: "/dashboard/vip-plans",
      module: "vip"
    },
    {
      label: "Comissões",
      icon: Percent,
      to: "/dashboard/commissions",
      module: "commissions"
    },
    {
      label: "Agendamento Online",
      icon: Globe,
      to: "/dashboard/booking",
      module: "online-booking"
    },
    {
      label: "Relatórios",
      icon: ChartColumn,
      to: "/dashboard/reports",
      module: "reports"
    },
    {
      label: "CRM",
      icon: Heart,
      to: "/dashboard/crm",
      module: "crm"
    },
    {
      label: "Recuperação",
      icon: UserPlus,
      to: "/dashboard/recovery",
      module: "recovery"
    },
    {
      label: "IA do Negócio",
      icon: Sparkles,
      to: "/dashboard/ai",
      module: "ai"
    },
    {
      label: "Módulos",
      icon: Grid3x3,
      to: "/dashboard/modules",
      module: null
    },
    {
      label: "Assinatura",
      icon: Crown,
      to: "/dashboard/subscription",
      module: null
    },
    {
      label: "Configurações",
      icon: Settings,
      to: "/dashboard/settings",
      module: null
    }
  ];
  const navItems = allNavItems.filter((item) => !item.module || isEnabled(item.module));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground flex flex-col lg:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex flex-col w-64 border-r border-border bg-card h-screen sticky top-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 items-center px-6 border-b border-border shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold tracking-tight", children: "Corte Certo" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar", children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, activeProps: {
        className: "bg-primary text-primary-foreground shadow-sm"
      }, className: "flex items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: item.label })
      ] }, item.to)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border mt-auto space-y-1.5", children: [
        isSupremeAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "Painel Master" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Sair" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-card px-4 lg:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold tracking-tight", children: "Corte Certo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: isMobileMenuOpen, onOpenChange: setIsMobileMenuOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Abrir menu", className: "text-muted-foreground min-h-11 min-w-11", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6", "aria-hidden": "true" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "left", className: "w-72 border-border bg-card p-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 items-center px-6 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold", children: "Menu" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 overflow-y-auto p-4 space-y-1.5 max-h-[calc(100vh-140px)] custom-scrollbar", children: [
            navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, onClick: () => setIsMobileMenuOpen(false), activeProps: {
              className: "bg-primary text-primary-foreground shadow-sm"
            }, className: "flex items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: item.label })
            ] }, item.to)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 mt-4 border-t border-border space-y-1.5", children: [
              isSupremeAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", onClick: () => setIsMobileMenuOpen(false), className: "flex items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Painel Master" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Sair" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full pt-16 lg:pt-0 overflow-y-auto min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto p-4 md:p-8 max-w-7xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionGate, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RouteFeatureGate, { pathname: location.pathname, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) }) }) }),
    onboarding && /* @__PURE__ */ jsxRuntimeExports.jsx(OnboardingWizard, { open: true, userId: onboarding.userId, userName: onboarding.userName, onComplete: () => setOnboarding(null) })
  ] });
}
const ROUTE_FEATURE = [{
  prefix: "/dashboard/agenda",
  feature: "agenda"
}, {
  prefix: "/dashboard/clients",
  feature: "clients"
}, {
  prefix: "/dashboard/services",
  feature: "services"
}, {
  prefix: "/dashboard/inventory",
  feature: "inventory"
}, {
  prefix: "/dashboard/finance",
  feature: "finance"
}, {
  prefix: "/dashboard/commissions",
  feature: "commissions"
}, {
  prefix: "/dashboard/booking",
  feature: "online-booking"
}, {
  prefix: "/dashboard/vip-plans",
  feature: "vip"
}, {
  prefix: "/dashboard/reports",
  feature: "reports"
}, {
  prefix: "/dashboard/crm",
  feature: "crm"
}, {
  prefix: "/dashboard/recovery",
  feature: "recovery"
}, {
  prefix: "/dashboard/ai",
  feature: "ai"
}];
function RouteFeatureGate({
  pathname,
  children
}) {
  const match = ROUTE_FEATURE.find((r) => pathname.startsWith(r.prefix));
  if (!match) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureGate, { feature: match.feature, children });
}
export {
  DashboardLayout as component
};
