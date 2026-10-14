import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, C as Card, f as CardHeader, g as CardTitle, e as CardContent, d as Button } from "./router-DONcpGkq.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { L as LoaderCircle, aE as Link2, a2 as Globe, am as Copy, au as ExternalLink, e as Share2 } from "../_libs/lucide-react.mjs";
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
function BookingPage() {
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [slug, setSlug] = reactExports.useState("");
  reactExports.useEffect(() => {
    async function loadProfile() {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        data
      } = await supabase.from("profiles").select("*").eq("id", user.id).single();
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
      const {
        error
      } = await supabase.from("profiles").update({
        slug
      }).eq("id", profile.id);
      if (error) {
        if (error.code === "23505") toast.error("Este link já está sendo usado por outro barbeiro.");
        else toast.error("Erro ao salvar link.");
      } else {
        toast.success("Link atualizado!");
        setProfile({
          ...profile,
          slug
        });
      }
    } catch (e) {
      toast.error("Erro ao salvar link.");
    } finally {
      setSaving(false);
    }
  };
  const bookingUrl = `${window.location.origin}/booking/${profile?.slug || ""}`;
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-10 w-10 animate-spin text-primary" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight uppercase", children: "Agendamento Online" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-lg", children: "Configure sua página de agendamento para clientes." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 border-border bg-card shadow-sm rounded-3xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "bg-secondary/30 border-b border-border p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl font-black uppercase italic tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-5 w-5 text-primary" }),
          " Seu Link Personalizado"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Endereço da sua página" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center bg-secondary/30 border border-border rounded-xl px-4 h-12 font-bold text-muted-foreground overflow-hidden whitespace-nowrap", children: [
                "cortecerto.app/booking/",
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: slug, onChange: (e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")), className: "bg-transparent border-none outline-none text-foreground ml-0.5 w-full", placeholder: "seu-nome" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveSlug, disabled: saving || slug === profile?.slug, className: "h-12 px-6 font-black rounded-xl", children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : "SALVAR" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-muted-foreground uppercase ml-1", children: "Dica: use o nome da sua barbearia. Evite caracteres especiais e espaços." })
          ] }),
          profile?.slug && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-white border border-primary/20 flex items-center justify-center text-primary shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-primary", children: "Página Ativa" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate max-w-[200px]", children: bookingUrl })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "flex-1 sm:flex-none h-10 gap-2 font-black rounded-lg", onClick: () => {
                navigator.clipboard.writeText(bookingUrl);
                toast.success("Link copiado!");
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
                " COPIAR"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "flex-1 sm:flex-none h-10 gap-2 font-black rounded-lg", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: bookingUrl, target: "_blank", rel: "noreferrer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
                " VER PÁGINA"
              ] }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none bg-primary text-white shadow-xl shadow-primary/20 rounded-3xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 space-y-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-white/30 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-8 w-8 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black uppercase italic tracking-tighter", children: "Divulgue seu Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-white/80 text-sm", children: "Adicione o link na sua bio do Instagram e WhatsApp para seus clientes agendarem sozinhos." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-white text-primary hover:bg-white/90 h-14 font-black uppercase italic rounded-2xl", onClick: () => {
            const text = `Salve! Agora você pode agendar seu horário comigo direto pelo link: ${bookingUrl}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
          }, children: "ENVIAR NO WHATSAPP" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card rounded-3xl overflow-hidden shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "p-6 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-black uppercase tracking-widest flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }),
            " Status do Sistema"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Disponibilidade Real" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Prevenção de Conflitos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black bg-green-500/10 text-green-500 px-2 py-0.5 rounded border border-green-500/20", children: "ATIVO" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  BookingPage as component
};
