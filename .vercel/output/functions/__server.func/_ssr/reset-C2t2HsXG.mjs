import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { C as Card, f as CardHeader, g as CardTitle, h as CardDescription, e as CardContent, I as Input, d as Button, i as CardFooter } from "./router-DONcpGkq.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { F as Scissors, L as LoaderCircle, k as CircleCheck, C as CircleAlert, W as EyeOff, Y as Eye } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = reactExports.useState(false);
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [show, setShow] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [done, setDone] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);
  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      const {
        error: error2
      } = await supabase.auth.updateUser({
        password
      });
      if (error2) throw error2;
      setDone(true);
      toast.success("Senha atualizada com sucesso!");
      setTimeout(() => navigate({
        to: "/dashboard"
      }), 1200);
    } catch (err) {
      setError(err.message || "Erro ao atualizar senha.");
      toast.error("Falha ao redefinir.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-primary/10 p-4 ring-1 ring-primary/20 shadow-xl shadow-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-10 w-10 text-primary" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black tracking-tighter uppercase italic", children: "Corte Certo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium mt-2", children: "Defina sua nova senha" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card shadow-2xl rounded-3xl overflow-hidden border-t-4 border-t-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-black uppercase tracking-tight", children: "Nova Senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "font-medium", children: "Escolha uma senha forte para proteger sua conta." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8", children: !ready ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-muted-foreground py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Validando link..." })
      ] }) : done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-green-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase", children: "Senha atualizada!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Redirecionando..." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleReset, className: "space-y-4", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/10 border border-destructive/20 p-3 rounded-xl flex gap-2 items-center text-destructive text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pw", className: "text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1", children: "Nova senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "pw", type: show ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), className: "bg-secondary/50 border-border h-12 text-base font-medium rounded-xl pr-12", disabled: loading, required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow(!show), className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 20 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pw2", className: "text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1", children: "Confirmar senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "pw2", type: show ? "text" : "password", value: confirm, onChange: (e) => setConfirm(e.target.value), className: "bg-secondary/50 border-border h-12 text-base font-medium rounded-xl", disabled: loading, required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "w-full h-14 text-lg font-black rounded-xl shadow-lg shadow-primary/20", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : "REDEFINIR SENHA" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "border-t border-border bg-secondary/20 py-6 justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/auth"
      }), className: "text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest", children: "Voltar para o login" }) })
    ] })
  ] }) });
}
export {
  ResetPasswordPage as component
};
