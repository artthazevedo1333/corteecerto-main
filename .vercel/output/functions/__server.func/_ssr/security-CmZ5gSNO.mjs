import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { E as ErrorBoundary, C as Card, f as CardHeader, g as CardTitle, e as CardContent, I as Input, d as Button, B as Badge, i as CardFooter } from "./router-DONcpGkq.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-B1Aan_F-.mjs";
import { ac as Lock, i as Shield, k as CircleCheck, aJ as History, aK as Smartphone, C as CircleAlert, a5 as LogOut } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
function SecuritySettingsPageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SecuritySettingsPage, {}) });
}
function SecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Preencha todos os campos de senha");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("A nova senha deve ter pelo menos 8 caracteres");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    setLoading(true);
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("Sessão inválida");
      const {
        error: verifyError
      } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      });
      if (verifyError) {
        toast.error("Senha atual incorreta");
        return;
      }
      const {
        error
      } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      toast.success("Senha atualizada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error?.message || "Erro ao atualizar senha");
    } finally {
      setLoading(false);
    }
  };
  const handleSignOutAll = async () => {
    const {
      error
    } = await supabase.auth.signOut({
      scope: "global"
    });
    if (error) {
      toast.error("Erro ao desconectar sessões");
      return;
    }
    toast.success("Sessões desconectadas com sucesso");
    window.location.href = "/auth";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-3xl mx-auto pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight uppercase italic", children: "Segurança & Acesso" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-lg", children: "Proteja sua conta e gerencie suas credenciais." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-border bg-card shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "p-8 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl font-black uppercase italic tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-6 w-6 text-primary" }),
          " Alterar Senha"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdatePassword, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Senha Atual" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), className: "h-12 font-bold rounded-xl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Nova Senha" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "h-12 font-bold rounded-xl" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-black uppercase tracking-widest text-muted-foreground ml-1", children: "Confirmar Nova Senha" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "h-12 font-bold rounded-xl" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full h-14 rounded-xl font-black uppercase italic shadow-lg shadow-primary/20", disabled: loading, children: loading ? "PROCESSANDO..." : "ATUALIZAR SENHA" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[2rem] border-border bg-card shadow-sm overflow-hidden border-2 border-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-10 flex flex-col md:flex-row items-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-10 w-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center md:text-left flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-start gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black uppercase italic tracking-tighter", children: "Autenticação em Dois Fatores (2FA)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/10 text-green-600 border-green-500/20 font-black uppercase text-[8px]", children: "CONTA PROTEGIDA" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-base", children: "Proteja sua conta com senhas fortes e encerre sessões ativas em outros aparelhos periodicamente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8 text-green-500 shrink-0" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-border bg-card shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "p-8 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl font-black uppercase italic tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-6 w-6 text-primary" }),
          " Sessões Ativas"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-6 w-6 text-green-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-sm uppercase", children: "Este Dispositivo (Chrome / macOS)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-green-600 uppercase", children: "Ativo agora" })
            ] })
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "p-6 bg-secondary/10 border-t border-border flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-muted-foreground uppercase italic flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
            " Recomendamos desconectar aparelhos que você não reconhece."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "link", className: "text-primary font-black uppercase text-xs p-0 h-auto gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
              " DESCONECTAR TODOS"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-3xl p-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-xl font-black uppercase italic", children: "Desconectar todos os aparelhos?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-base font-medium", children: "Sua conta será encerrada em todos os dispositivos e será necessário entrar novamente." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "h-12 rounded-xl font-bold", children: "CANCELAR" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "h-12 rounded-xl font-black", onClick: handleSignOutAll, children: "DESCONECTAR" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  SecuritySettingsPageWrapper as component
};
