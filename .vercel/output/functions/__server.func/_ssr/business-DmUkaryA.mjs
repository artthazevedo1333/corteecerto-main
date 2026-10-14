import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, C as Card, f as CardHeader, g as CardTitle, e as CardContent, I as Input, d as Button } from "./router-DONcpGkq.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as Switch } from "./switch-Dj_mi93B.mjs";
import { L as LoaderCircle, aN as Store, I as Image, ad as MapPin, a8 as Clock, aL as Save } from "../_libs/lucide-react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
function BusinessSettingsPageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessSettingsPage, {}) });
}
const DAYS = [{
  id: "mon",
  label: "Segunda"
}, {
  id: "tue",
  label: "Terça"
}, {
  id: "wed",
  label: "Quarta"
}, {
  id: "thu",
  label: "Quinta"
}, {
  id: "fri",
  label: "Sexta"
}, {
  id: "sat",
  label: "Sábado"
}, {
  id: "sun",
  label: "Domingo"
}];
function BusinessSettingsPage() {
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        data,
        error
      } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      toast.error("Erro ao carregar dados da barbearia");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const {
        error
      } = await supabase.from("profiles").update({
        barber_shop_name: profile.barber_shop_name,
        business_address: profile.business_address,
        business_city: profile.business_city,
        business_state: profile.business_state,
        business_zip: profile.business_zip,
        business_phone: profile.business_phone,
        business_whatsapp: profile.business_whatsapp,
        business_instagram: profile.business_instagram,
        opening_hours: profile.opening_hours,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", profile.id);
      if (error) throw error;
      toast.success("Dados da unidade salvos!");
    } catch (error) {
      toast.error("Erro ao salvar alterações");
    } finally {
      setSaving(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary mb-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-black text-muted-foreground uppercase tracking-widest", children: "Carregando unidade..." })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-4xl mx-auto pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight uppercase italic", children: profile?.barber_shop_name || "Sua Unidade" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-lg", children: "Gerencie os detalhes públicos e horários da sua barbearia." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "grid gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-border bg-card shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "p-8 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl font-black uppercase italic tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-6 w-6 text-primary" }),
          " Informações Básicas"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Nome da Barbearia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.barber_shop_name || "", onChange: (e) => setProfile({
                ...profile,
                barber_shop_name: e.target.value
              }), placeholder: "Ex: Barber Shop Professional", className: "h-12 font-bold rounded-xl" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Logo da Unidade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-secondary flex items-center justify-center border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-6 w-6 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "rounded-xl h-12 font-black uppercase text-xs", children: "ALTERAR LOGO" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Telefone Fixo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_phone || "", onChange: (e) => setProfile({
                ...profile,
                business_phone: e.target.value
              }), className: "h-12 font-bold rounded-xl" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "WhatsApp de Contato" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_whatsapp || "", onChange: (e) => setProfile({
                ...profile,
                business_whatsapp: e.target.value
              }), className: "h-12 font-bold rounded-xl" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Instagram (@usuario)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_instagram || "", onChange: (e) => setProfile({
                ...profile,
                business_instagram: e.target.value
              }), className: "h-12 font-bold rounded-xl" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-border bg-card shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "p-8 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl font-black uppercase italic tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-6 w-6 text-primary" }),
          " Endereço"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Endereço Completo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_address || "", onChange: (e) => setProfile({
              ...profile,
              business_address: e.target.value
            }), placeholder: "Ex: Av. Principal, 123 - Centro", className: "h-12 font-bold rounded-xl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Cidade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_city || "", onChange: (e) => setProfile({
                ...profile,
                business_city: e.target.value
              }), className: "h-12 font-bold rounded-xl" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Estado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_state || "", onChange: (e) => setProfile({
                ...profile,
                business_state: e.target.value
              }), className: "h-12 font-bold rounded-xl" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "CEP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_zip || "", onChange: (e) => setProfile({
                ...profile,
                business_zip: e.target.value
              }), className: "h-12 font-bold rounded-xl" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-border bg-card shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "p-8 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl font-black uppercase italic tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-6 w-6 text-primary" }),
          " Horário de Funcionamento"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8 space-y-4", children: DAYS.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-secondary/20 rounded-2xl border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: profile?.opening_hours?.[day.id]?.active, onCheckedChange: (checked) => {
              const newHours = {
                ...profile.opening_hours
              };
              newHours[day.id] = {
                ...newHours[day.id],
                active: checked
              };
              setProfile({
                ...profile,
                opening_hours: newHours
              });
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black uppercase italic text-sm tracking-tight w-24", children: day.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: profile?.opening_hours?.[day.id]?.open || "09:00", disabled: !profile?.opening_hours?.[day.id]?.active, onChange: (e) => {
              const newHours = {
                ...profile.opening_hours
              };
              newHours[day.id] = {
                ...newHours[day.id],
                open: e.target.value
              };
              setProfile({
                ...profile,
                opening_hours: newHours
              });
            }, className: "w-24 h-10 font-bold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "às" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: profile?.opening_hours?.[day.id]?.close || "18:00", disabled: !profile?.opening_hours?.[day.id]?.active, onChange: (e) => {
              const newHours = {
                ...profile.opening_hours
              };
              newHours[day.id] = {
                ...newHours[day.id],
                close: e.target.value
              };
              setProfile({
                ...profile,
                opening_hours: newHours
              });
            }, className: "w-24 h-10 font-bold" })
          ] })
        ] }, day.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "h-16 rounded-2xl font-black text-lg uppercase italic shadow-2xl shadow-primary/20 gap-3 w-full md:w-auto", disabled: saving, children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-6 w-6" }),
        "SALVAR ALTERAÇÕES DA UNIDADE"
      ] }) })
    ] })
  ] });
}
export {
  BusinessSettingsPageWrapper as component
};
