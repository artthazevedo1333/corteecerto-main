import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { R as Route$q, C as Card, f as CardHeader, g as CardTitle, h as CardDescription, e as CardContent, I as Input, d as Button, i as CardFooter, c as cn } from "./router-DONcpGkq.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as Progress } from "./progress-CiZLcE5d.mjs";
import { F as Scissors, V as Mail, C as CircleAlert, L as LoaderCircle, A as ArrowLeft, X, W as EyeOff, Y as Eye } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-progress.mjs";
function safeNext(next) {
  if (!next) return null;
  if (!next.startsWith("/") || next.startsWith("//")) return null;
  return next;
}
function AuthPage() {
  const {
    mode,
    next
  } = Route$q.useSearch();
  safeNext(next) ?? "/dashboard";
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = reactExports.useState(mode === "login");
  const [loading, setLoading] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [passwordStrength, setPasswordStrength] = reactExports.useState(0);
  const [needsConfirmation, setNeedsConfirmation] = reactExports.useState(false);
  const [confirmingEmail, setConfirmingEmail] = reactExports.useState("");
  const [authError, setAuthError] = reactExports.useState(null);
  const [forgotMode, setForgotMode] = reactExports.useState(false);
  const [resetSent, setResetSent] = reactExports.useState(false);
  const handleForgotPassword = async () => {
    setAuthError(null);
    if (!email || !email.includes("@")) {
      setAuthError("Informe seu e-mail para receber o link de recuperação.");
      return;
    }
    setLoading(true);
    try {
      const {
        error
      } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset`
      });
      if (error) throw error;
      setResetSent(true);
      toast.success("E-mail de recuperação enviado!");
    } catch (error) {
      setAuthError(error.message || "Erro ao enviar recuperação.");
      toast.error("Falha ao enviar recuperação.");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "USER_UPDATED" || event === "INITIAL_SESSION")) {
        navigate({
          to: "/dashboard"
        });
      }
    });
    if (window.location.hash || window.location.search.includes("type=recovery") || window.location.search.includes("type=signup")) ;
    return () => subscription.unsubscribe();
  }, [navigate]);
  reactExports.useEffect(() => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 10) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    setPasswordStrength(strength);
  }, [password]);
  const validateFields = () => {
    setAuthError(null);
    if (!email || !email.includes("@")) {
      setAuthError("Por favor, insira um e-mail válido.");
      return false;
    }
    if (password.length < 6) {
      setAuthError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    if (!isLogin && !fullName.trim()) {
      setAuthError("Por favor, insira seu nome completo.");
      return false;
    }
    return true;
  };
  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setLoading(true);
    setAuthError(null);
    try {
      if (isLogin) {
        const {
          data,
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          console.error("[Auth] Login error details:", error);
          if (error.message.toLowerCase().includes("invalid login credentials") || error.message.toLowerCase().includes("invalid credentials")) {
            throw new Error("E-mail ou senha incorretos.");
          }
          if (error.message.includes("Email not confirmed")) {
            setConfirmingEmail(email);
            setNeedsConfirmation(true);
            throw new Error("Sua conta ainda não foi confirmada. Verifique seu e-mail.");
          }
          if (error.status === 400 || error.message.includes("User not found")) {
            throw new Error("Não encontramos uma conta com este e-mail.");
          }
          throw error;
        }
        if (false) ;
        toast.success("Login realizado com sucesso!");
        navigate({
          to: "/dashboard"
        });
      } else {
        const {
          data,
          error: signUpError
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: fullName
            }
          }
        });
        if (signUpError) {
          console.error("[Auth] Signup error details:", signUpError);
          if (signUpError.message.includes("User already registered")) {
            throw new Error("Este e-mail já está cadastrado. Tente fazer login.");
          }
          if (signUpError.message.includes("Database error")) {
            throw new Error("Erro de banco de dados ao criar perfil. Tente novamente.");
          }
          throw signUpError;
        }
        if (false) ;
        if (data.user && data.session) {
          toast.success("Conta criada e confirmada!");
          navigate({
            to: "/dashboard"
          });
        } else {
          if (false) ;
          setConfirmingEmail(email);
          setNeedsConfirmation(true);
          toast.success("Conta criada! Verifique seu e-mail.");
        }
      }
    } catch (error) {
      console.error("[Auth] Caught error:", error);
      setAuthError(error.message || "Ocorreu um erro inesperado. Tente novamente.");
      toast.error(error.message || "Erro na autenticação.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const {
        error
      } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("[Auth] OAuth error:", error);
      setAuthError("Erro ao entrar com Google: " + error.message);
      toast.error("Erro no login social.");
    } finally {
      setLoading(false);
    }
  };
  const handleResendConfirmation = async () => {
    if (!confirmingEmail) return;
    setLoading(true);
    setAuthError(null);
    try {
      const {
        error
      } = await supabase.auth.resend({
        type: "signup",
        email: confirmingEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
      toast.success("E-mail de confirmação enviado novamente!");
    } catch (error) {
      console.error("[Auth] Resend error:", error);
      setAuthError("Erro ao reenviar e-mail: " + error.message);
      toast.error("Falha ao reenviar confirmação.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background p-4 text-foreground selection:bg-primary selection:text-primary-foreground font-sans", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-primary/10 p-4 ring-1 ring-primary/20 shadow-xl shadow-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-10 w-10 text-primary" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black tracking-tighter uppercase italic", children: "Corte Certo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium mt-2", children: "O sistema definitivo para sua barbearia." })
    ] }),
    forgotMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card shadow-2xl rounded-3xl overflow-hidden border-t-4 border-t-primary animate-in slide-in-from-bottom-4 duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-2 text-center pb-2 pt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-7 w-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-black tracking-tight uppercase", children: "Recuperar Acesso" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-muted-foreground font-medium px-4", children: resetSent ? "Enviamos um link de redefinição para o seu e-mail." : "Informe seu e-mail e enviaremos um link seguro para redefinir sua senha." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 space-y-4", children: [
        !resetSent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fp-email", className: "text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1", children: "E-mail" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "fp-email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "seu@email.com", className: "bg-secondary/50 border-border h-12 text-base font-medium rounded-xl focus:ring-primary/20", disabled: loading })
        ] }),
        authError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/10 border border-destructive/20 p-3 rounded-lg flex gap-2 items-center text-destructive text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: authError })
        ] }),
        !resetSent ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleForgotPassword, disabled: loading, className: "w-full h-14 text-lg font-black rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : "ENVIAR LINK DE RECUPERAÇÃO" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 border border-primary/20 p-4 rounded-xl text-center text-sm font-medium text-foreground", children: "Verifique sua caixa de entrada (e a pasta de spam). O link expira em 1 hora." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "flex justify-center border-t border-border bg-secondary/20 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setForgotMode(false);
        setResetSent(false);
        setAuthError(null);
      }, className: "text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3 w-3" }),
        " Voltar para o login"
      ] }) })
    ] }) : needsConfirmation ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card shadow-2xl rounded-3xl overflow-hidden border-t-4 border-t-primary animate-in slide-in-from-bottom-4 duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-4 text-center pb-2 pt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2 animate-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-black tracking-tight uppercase", children: "Confirmação Enviada" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "text-muted-foreground font-medium px-4 text-base", children: [
          "Quase lá! Enviamos um link de ativação para:",
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-black text-foreground break-all bg-secondary/50 p-3 rounded-xl border border-border/50", children: confirmingEmail })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 items-start text-blue-600 dark:text-blue-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-relaxed", children: "Você precisa clicar no link do e-mail para ativar sua conta e liberar seu acesso ao sistema." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground", children: [
          "Não recebeu? Verifique a pasta de ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Spam" }),
          " ou",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Promoções" }),
          "."
        ] }),
        authError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/10 border border-destructive/20 p-3 rounded-lg flex gap-2 items-center text-destructive text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: authError })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleResendConfirmation, variant: "outline", className: "w-full h-14 font-black rounded-xl border-primary/20 hover:bg-primary/5 transition-all active:scale-[0.98]", disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mr-2" }) : "REENVIAR E-MAIL AGORA" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "flex flex-col gap-4 justify-center border-t border-border bg-secondary/20 py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setNeedsConfirmation(false);
          setIsLogin(false);
          setAuthError(null);
        }, className: "text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3 w-3" }),
          " E-mail errado? Corrigir"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => {
          setNeedsConfirmation(false);
          setIsLogin(true);
          setAuthError(null);
        }, className: "text-primary font-black uppercase tracking-widest hover:bg-transparent", children: "Voltar para o Login" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card shadow-2xl rounded-3xl overflow-hidden border-t-4 border-t-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-1 text-center pb-2 pt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-black tracking-tight uppercase", children: isLogin ? "BEM-VINDO DE VOLTA" : "CRIAR SUA CONTA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-muted-foreground font-medium px-4", children: isLogin ? "Entre com suas credenciais para gerenciar sua barbearia" : "Comece hoje mesmo a organizar sua agenda e clientes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
        authError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex gap-3 items-center text-destructive text-sm font-bold animate-in slide-in-from-top-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: authError })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAuth, className: "space-y-4", children: [
          !isLogin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1", children: "Nome Completo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", placeholder: "Ex: João Barbeiro", value: fullName, onChange: (e) => setFullName(e.target.value), className: "bg-secondary/50 border-border h-12 text-base font-medium rounded-xl focus:ring-primary/20", required: true, disabled: loading })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1", children: "E-mail Profissional" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "seu@email.com", value: email, onChange: (e) => setEmail(e.target.value), className: "bg-secondary/50 border-border h-12 text-base font-medium rounded-xl focus:ring-primary/20", required: true, disabled: loading })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between ml-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", title: "password", className: "text-sm font-bold uppercase tracking-wider text-muted-foreground", children: "Senha" }),
              isLogin && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                setForgotMode(true);
                setResetSent(false);
                setAuthError(null);
              }, className: "text-xs font-bold text-primary hover:underline", children: "Esqueceu?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), className: "bg-secondary/50 border-border h-12 text-base font-medium rounded-xl focus:ring-primary/20 pr-12", required: true, disabled: loading }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", disabled: loading, children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 20 }) })
            ] }),
            !isLogin && password.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-2 animate-in fade-in slide-in-from-top-1 duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-[10px] font-bold uppercase tracking-widest px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("transition-colors", passwordStrength <= 20 ? "text-destructive" : passwordStrength <= 60 ? "text-yellow-500" : "text-green-500"), children: [
                  "Força:",
                  " ",
                  passwordStrength <= 20 ? "Fraca" : passwordStrength <= 60 ? "Média" : "Forte"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  passwordStrength,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: passwordStrength, className: "h-1 bg-secondary/50" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full h-14 text-lg font-black mt-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]", disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PROCESSANDO..." })
          ] }) : isLogin ? "ENTRAR NO SISTEMA" : "CRIAR MINHA CONTA AGORA" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full border-t border-border" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-4 text-muted-foreground font-black tracking-widest", children: "Ou acessar com" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full border-border bg-secondary/30 hover:bg-secondary text-foreground h-14 font-black rounded-xl transition-all active:scale-[0.98]", onClick: handleGoogleSignIn, disabled: loading, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "mr-3 h-5 w-5", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
          ] }),
          "GOOGLE"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "flex justify-center border-t border-border bg-secondary/20 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-bold", children: [
        isLogin ? "Novo por aqui?" : "Já possui conta?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setIsLogin(!isLogin);
          setAuthError(null);
        }, className: "text-primary hover:underline font-black ml-1 uppercase transition-all", disabled: loading, children: isLogin ? "Criar conta" : "Fazer login" })
      ] }) })
    ] })
  ] }) });
}
export {
  AuthPage as component
};
