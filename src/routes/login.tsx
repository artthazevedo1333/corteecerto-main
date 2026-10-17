import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scissors, Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Acesso autorizado.");
      // Agora envia para o Dashboard corretamente
      navigate({ to: '/dashboard' });
    } catch (error: any) {
      toast.error("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-amber-500/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-3 rounded-2xl shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)]">
            <Scissors className="h-8 w-8 text-zinc-950" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tighter">
          Acesso Restrito
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Ainda não tem o sistema?{' '}
          <a href="/register" className="text-amber-500 hover:text-amber-400 font-semibold transition-colors">
            Crie sua conta
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900/50 py-8 px-4 shadow-[0_0_40px_-15px_rgba(245,158,11,0.1)] sm:rounded-3xl border border-white/10 sm:px-10 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email" className="text-zinc-300">E-mail</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-950 border-white/10 text-white h-12 focus-visible:ring-amber-500"
                  placeholder="barbearia@exemplo.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-zinc-300">Senha</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-950 border-white/10 text-white h-12 pr-10 focus-visible:ring-amber-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar no Sistema'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}