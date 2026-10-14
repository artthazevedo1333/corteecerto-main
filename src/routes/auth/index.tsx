import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Scissors,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  Loader2,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      mode: (search.mode as string) || "login",
      next: typeof search.next === "string" ? search.next : undefined,
    };
  },
  component: AuthPage,
});

/**
 * Only same-origin relative paths are accepted as post-login destinations,
 * evitando open redirect a partir da query string.
 */
function safeNext(next: string | undefined): string | null {
  if (!next) return null;
  if (!next.startsWith("/") || next.startsWith("//")) return null;
  return next;
}

function AuthPage() {
  const { mode, next } = Route.useSearch();
  const redirectPath = safeNext(next) ?? "/dashboard";
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [confirmingEmail, setConfirmingEmail] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleForgotPassword = async () => {
    setAuthError(null);
    if (!email || !email.includes("@")) {
      setAuthError("Informe seu e-mail para receber o link de recuperação.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset`,
      });
      if (error) throw error;
      setResetSent(true);
      toast.success("E-mail de recuperação enviado!");
    } catch (error: any) {
      setAuthError(error.message || "Erro ao enviar recuperação.");
      toast.error("Falha ao enviar recuperação.");
    } finally {
      setLoading(false);
    }
  };

  // Monitor auth state to redirect if confirmed/logged in while on this page
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (import.meta.env.DEV) console.log(`[Auth] Event: ${event}`, session?.user?.id);
      if (
        session &&
        (event === "SIGNED_IN" || event === "USER_UPDATED" || event === "INITIAL_SESSION")
      ) {
        if (import.meta.env.DEV)
          console.log("[Auth] Session detected, redirecting to dashboard...");
        navigate({ to: "/dashboard" });
      }
    });

    // Handle hash params from email confirmation
    if (
      window.location.hash ||
      window.location.search.includes("type=recovery") ||
      window.location.search.includes("type=signup")
    ) {
      if (import.meta.env.DEV) console.log("[Auth] Detected return from email link");
    }

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    // Password strength calculation
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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    setAuthError(null);
    if (import.meta.env.DEV)
      console.log(`[Auth] Initing ${isLogin ? "login" : "signup"} flow for:`, email);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("[Auth] Login error details:", error);

          if (
            error.message.toLowerCase().includes("invalid login credentials") ||
            error.message.toLowerCase().includes("invalid credentials")
          ) {
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
          // Fallback to real Supabase error if not caught
          throw error;
        }

        if (import.meta.env.DEV) console.log("[Auth] Login successful", data.user?.id);
        toast.success("Login realizado com sucesso!");
        navigate({ to: "/dashboard" });
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: fullName,
            },
          },
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

        if (import.meta.env.DEV)
          console.log("[Auth] Signup call finished", {
            userId: data.user?.id,
            session: !!data.session,
          });

        if (data.user && data.session) {
          toast.success("Conta criada e confirmada!");
          navigate({ to: "/dashboard" });
        } else {
          if (import.meta.env.DEV)
            console.log("[Auth] Confirmation required, showing success screen");
          setConfirmingEmail(email);
          setNeedsConfirmation(true);
          toast.success("Conta criada! Verifique seu e-mail.");
        }
      }
    } catch (error: any) {
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
    if (import.meta.env.DEV) console.log("[Auth] Initiating Google OAuth");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
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
    if (import.meta.env.DEV) console.log("[Auth] Resending confirmation to:", confirmingEmail);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: confirmingEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      toast.success("E-mail de confirmação enviado novamente!");
    } catch (error: any) {
      console.error("[Auth] Resend error:", error);
      setAuthError("Erro ao reenviar e-mail: " + error.message);
      toast.error("Falha ao reenviar confirmação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-2xl bg-primary/10 p-4 ring-1 ring-primary/20 shadow-xl shadow-primary/5">
              <Scissors className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Corte Certo</h1>
          <p className="text-muted-foreground font-medium mt-2">
            O sistema definitivo para sua barbearia.
          </p>
        </div>

        {forgotMode ? (
          <Card className="border-border bg-card shadow-2xl rounded-3xl overflow-hidden border-t-4 border-t-primary animate-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="space-y-2 text-center pb-2 pt-8">
              <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-1">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl font-black tracking-tight uppercase">
                Recuperar Acesso
              </CardTitle>
              <CardDescription className="text-muted-foreground font-medium px-4">
                {resetSent
                  ? "Enviamos um link de redefinição para o seu e-mail."
                  : "Informe seu e-mail e enviaremos um link seguro para redefinir sua senha."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              {!resetSent && (
                <div className="space-y-2">
                  <Label
                    htmlFor="fp-email"
                    className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1"
                  >
                    E-mail
                  </Label>
                  <Input
                    id="fp-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="bg-secondary/50 border-border h-12 text-base font-medium rounded-xl focus:ring-primary/20"
                    disabled={loading}
                  />
                </div>
              )}
              {authError && (
                <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg flex gap-2 items-center text-destructive text-sm font-bold">
                  <AlertCircle className="h-4 w-4" />
                  <span>{authError}</span>
                </div>
              )}
              {!resetSent ? (
                <Button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="w-full h-14 text-lg font-black rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "ENVIAR LINK DE RECUPERAÇÃO"
                  )}
                </Button>
              ) : (
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl text-center text-sm font-medium text-foreground">
                  Verifique sua caixa de entrada (e a pasta de spam). O link expira em 1 hora.
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t border-border bg-secondary/20 py-6">
              <button
                onClick={() => {
                  setForgotMode(false);
                  setResetSent(false);
                  setAuthError(null);
                }}
                className="text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-3 w-3" /> Voltar para o login
              </button>
            </CardFooter>
          </Card>
        ) : needsConfirmation ? (
          <Card className="border-border bg-card shadow-2xl rounded-3xl overflow-hidden border-t-4 border-t-primary animate-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="space-y-4 text-center pb-2 pt-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2 animate-bounce">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-black tracking-tight uppercase">
                Confirmação Enviada
              </CardTitle>
              <CardDescription className="text-muted-foreground font-medium px-4 text-base">
                Quase lá! Enviamos um link de ativação para:
                <div className="mt-2 font-black text-foreground break-all bg-secondary/50 p-3 rounded-xl border border-border/50">
                  {confirmingEmail}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 items-start text-blue-600 dark:text-blue-400">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium leading-relaxed">
                    Você precisa clicar no link do e-mail para ativar sua conta e liberar seu acesso
                    ao sistema.
                  </p>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Não recebeu? Verifique a pasta de <strong>Spam</strong> ou{" "}
                  <strong>Promoções</strong>.
                </p>

                {authError && (
                  <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg flex gap-2 items-center text-destructive text-sm font-bold">
                    <X className="h-4 w-4" />
                    <span>{authError}</span>
                  </div>
                )}

                <Button
                  onClick={handleResendConfirmation}
                  variant="outline"
                  className="w-full h-14 font-black rounded-xl border-primary/20 hover:bg-primary/5 transition-all active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    "REENVIAR E-MAIL AGORA"
                  )}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 justify-center border-t border-border bg-secondary/20 py-6">
              <button
                onClick={() => {
                  setNeedsConfirmation(false);
                  setIsLogin(false);
                  setAuthError(null);
                }}
                className="text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-3 w-3" /> E-mail errado? Corrigir
              </button>
              <Button
                variant="ghost"
                onClick={() => {
                  setNeedsConfirmation(false);
                  setIsLogin(true);
                  setAuthError(null);
                }}
                className="text-primary font-black uppercase tracking-widest hover:bg-transparent"
              >
                Voltar para o Login
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-border bg-card shadow-2xl rounded-3xl overflow-hidden border-t-4 border-t-primary">
            <CardHeader className="space-y-1 text-center pb-2 pt-8">
              <CardTitle className="text-2xl font-black tracking-tight uppercase">
                {isLogin ? "BEM-VINDO DE VOLTA" : "CRIAR SUA CONTA"}
              </CardTitle>
              <CardDescription className="text-muted-foreground font-medium px-4">
                {isLogin
                  ? "Entre com suas credenciais para gerenciar sua barbearia"
                  : "Comece hoje mesmo a organizar sua agenda e clientes"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {authError && (
                <div className="mb-6 bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex gap-3 items-center text-destructive text-sm font-bold animate-in slide-in-from-top-2">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1"
                    >
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ex: João Barbeiro"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-secondary/50 border-border h-12 text-base font-medium rounded-xl focus:ring-primary/20"
                      required
                      disabled={loading}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1"
                  >
                    E-mail Profissional
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary/50 border-border h-12 text-base font-medium rounded-xl focus:ring-primary/20"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label
                      htmlFor="password"
                      title="password"
                      className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Senha
                    </Label>
                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => {
                          setForgotMode(true);
                          setResetSent(false);
                          setAuthError(null);
                        }}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Esqueceu?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-secondary/50 border-border h-12 text-base font-medium rounded-xl focus:ring-primary/20 pr-12"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {!isLogin && password.length > 0 && (
                    <div className="space-y-2 mt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest px-1">
                        <span
                          className={cn(
                            "transition-colors",
                            passwordStrength <= 20
                              ? "text-destructive"
                              : passwordStrength <= 60
                                ? "text-yellow-500"
                                : "text-green-500",
                          )}
                        >
                          Força:{" "}
                          {passwordStrength <= 20
                            ? "Fraca"
                            : passwordStrength <= 60
                              ? "Média"
                              : "Forte"}
                        </span>
                        <span className="text-muted-foreground">{passwordStrength}%</span>
                      </div>
                      <Progress value={passwordStrength} className="h-1 bg-secondary/50" />
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-black mt-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>PROCESSANDO...</span>
                    </div>
                  ) : isLogin ? (
                    "ENTRAR NO SISTEMA"
                  ) : (
                    "CRIAR MINHA CONTA AGORA"
                  )}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-4 text-muted-foreground font-black tracking-widest">
                    Ou acessar com
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-border bg-secondary/30 hover:bg-secondary text-foreground h-14 font-black rounded-xl transition-all active:scale-[0.98]"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                GOOGLE
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-border bg-secondary/20 py-6">
              <p className="text-muted-foreground text-sm font-bold">
                {isLogin ? "Novo por aqui?" : "Já possui conta?"}{" "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setAuthError(null);
                  }}
                  className="text-primary hover:underline font-black ml-1 uppercase transition-all"
                  disabled={loading}
                >
                  {isLogin ? "Criar conta" : "Fazer login"}
                </button>
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
