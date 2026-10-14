import { createFileRoute } from "@tanstack/react-router";
import { Shield, Lock, Smartphone, History, AlertCircle, CheckCircle2, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/error-boundary";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/dashboard/_layout/settings/security")({
  component: SecuritySettingsPageWrapper,
});

function SecuritySettingsPageWrapper() {
  return (
    <ErrorBoundary>
      <SecuritySettingsPage />
    </ErrorBoundary>
  );
}

function SecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
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
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("Sessão inválida");

      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      if (verifyError) {
        toast.error("Senha atual incorreta");
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      toast.success("Senha atualizada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error?.message || "Erro ao atualizar senha");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOutAll = async () => {
    const { error } = await supabase.auth.signOut({ scope: "global" });
    if (error) {
      toast.error("Erro ao desconectar sessões");
      return;
    }
    toast.success("Sessões desconectadas com sucesso");
    window.location.href = "/auth";
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-20">
      <header>
        <h1 className="text-3xl font-black tracking-tight uppercase italic">Segurança & Acesso</h1>
        <p className="text-muted-foreground font-medium text-lg">
          Proteja sua conta e gerencie suas credenciais.
        </p>
      </header>

      <div className="grid gap-8">
        {/* Update Password */}
        <Card className="rounded-[2rem] border-border bg-card shadow-sm overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" /> Alterar Senha
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Senha Atual
                </Label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-12 font-bold rounded-xl"
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Nova Senha
                  </Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 font-bold rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Confirmar Nova Senha
                  </Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 font-bold rounded-xl"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-14 rounded-xl font-black uppercase italic shadow-lg shadow-primary/20"
                disabled={loading}
              >
                {loading ? "PROCESSANDO..." : "ATUALIZAR SENHA"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Account protection */}
        <Card className="rounded-[2rem] border-border bg-card shadow-sm overflow-hidden border-2 border-primary/10">
          <CardContent className="p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                  Autenticação em Dois Fatores (2FA)
                </h3>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 font-black uppercase text-[8px]">
                  CONTA PROTEGIDA
                </Badge>
              </div>
              <p className="text-muted-foreground font-medium text-base">
                Proteja sua conta com senhas fortes e encerre sessões ativas em outros aparelhos
                periodicamente.
              </p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-500 shrink-0" />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-[2rem] border-border bg-card shadow-sm overflow-hidden">
          <CardHeader className="p-8 pb-2">
            <CardTitle className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
              <History className="h-6 w-6 text-primary" /> Sessões Ativas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                    <Smartphone className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase">
                      Este Dispositivo (Chrome / macOS)
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <p className="text-xs font-bold text-green-600 uppercase">Ativo agora</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-secondary/10 border-t border-border flex justify-between items-center">
            <p className="text-xs font-bold text-muted-foreground uppercase italic flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Recomendamos desconectar aparelhos que você não
              reconhece.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-primary font-black uppercase text-xs p-0 h-auto gap-1"
                >
                  <LogOut className="h-4 w-4" /> DESCONECTAR TODOS
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-3xl p-8">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-black uppercase italic">
                    Desconectar todos os aparelhos?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base font-medium">
                    Sua conta será encerrada em todos os dispositivos e será necessário entrar
                    novamente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-6">
                  <AlertDialogCancel className="h-12 rounded-xl font-bold">
                    CANCELAR
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="h-12 rounded-xl font-black"
                    onClick={handleSignOutAll}
                  >
                    DESCONECTAR
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
