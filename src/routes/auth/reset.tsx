import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scissors, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/reset")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase parses the recovery link and emits PASSWORD_RECOVERY
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    // Fallback: if session already exists, allow reset
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
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
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
      toast.success("Senha atualizada com sucesso!");
      setTimeout(() => navigate({ to: "/dashboard" }), 1200);
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar senha.");
      toast.error("Falha ao redefinir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-2xl bg-primary/10 p-4 ring-1 ring-primary/20 shadow-xl shadow-primary/5">
              <Scissors className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Corte Certo</h1>
          <p className="text-muted-foreground font-medium mt-2">Defina sua nova senha</p>
        </div>

        <Card className="border-border bg-card shadow-2xl rounded-3xl overflow-hidden border-t-4 border-t-primary">
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-2xl font-black uppercase tracking-tight">
              Nova Senha
            </CardTitle>
            <CardDescription className="font-medium">
              Escolha uma senha forte para proteger sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {!ready ? (
              <div className="flex items-center justify-center gap-2 text-muted-foreground py-6">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-medium">Validando link...</span>
              </div>
            ) : done ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <p className="font-black uppercase">Senha atualizada!</p>
                <p className="text-sm text-muted-foreground">Redirecionando...</p>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-xl flex gap-2 items-center text-destructive text-sm font-bold">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}
                <div className="space-y-2">
                  <Label
                    htmlFor="pw"
                    className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1"
                  >
                    Nova senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="pw"
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-secondary/50 border-border h-12 text-base font-medium rounded-xl pr-12"
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {show ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="pw2"
                    className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1"
                  >
                    Confirmar senha
                  </Label>
                  <Input
                    id="pw2"
                    type={show ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="bg-secondary/50 border-border h-12 text-base font-medium rounded-xl"
                    disabled={loading}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 text-lg font-black rounded-xl shadow-lg shadow-primary/20"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "REDEFINIR SENHA"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="border-t border-border bg-secondary/20 py-6 justify-center">
            <button
              onClick={() => navigate({ to: "/auth" })}
              className="text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest"
            >
              Voltar para o login
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
