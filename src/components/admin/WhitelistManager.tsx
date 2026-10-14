import React, { useState } from 'react';
import { useAddAdminToWhitelist, useRemoveAdminFromWhitelist } from '@/lib/communityAndAdminQueries';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ShieldCheck, MailPlus, Loader2 } from 'lucide-react';

export function WhitelistManager() {
  const addAdmin = useAddAdminToWhitelist();
  const removeAdmin = useRemoveAdminFromWhitelist();
  const [email, setEmail] = useState('');

  // Busca reativa da lista de funcionários direto pelo contrato do Supabase Client
  const { data: whitelist, isLoading, refetch } = useQuery({
    queryKey: ['adminWhitelist'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_whitelist')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const handleAddToWhitelist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await addAdmin.mutateAsync(email.toLowerCase().trim());
    setEmail('');
    refetch();
  };

  const handleRemoveFromWhitelist = async (targetEmail: string) => {
    await removeAdmin.mutateAsync(targetEmail);
    refetch();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-sm rounded-3xl border-border overflow-hidden">
      <CardHeader className="border-b bg-muted/20 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <ShieldCheck className="w-5 h-5 text-primary" />
          Whitelist de Funcionários Administrativos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <form onSubmit={handleAddToWhitelist} className="flex items-end gap-3">
          <div className="flex-1 space-y-2">
            <label htmlFor="email-input" className="text-sm font-medium text-foreground">
              Autorizar Novo E-mail
            </label>
            <div className="relative">
              <MailPlus className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email-input"
                type="email"
                placeholder="funcionario@barbearia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 h-11 rounded-xl"
                required
              />
            </div>
          </div>
          <Button type="submit" className="h-11 rounded-xl" disabled={addAdmin.isPending || !email.trim()}>
            {addAdmin.isPending ? 'Adicionando...' : 'Adicionar à Whitelist'}
          </Button>
        </form>

        <div className="border rounded-2xl bg-background overflow-hidden border-border">
          {isLoading ? (
            <div className="p-6 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Carregando lista de acesso...
            </div>
          ) : !whitelist || whitelist.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Nenhum e-mail autorizado na whitelist no momento.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {whitelist.map((entry: any) => (
                <div key={entry.email} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground">{entry.email}</span>
                    <span className="text-xs text-muted-foreground">
                      Adicionado em: {new Date(entry.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveFromWhitelist(entry.email)}
                    disabled={removeAdmin.isPending}
                    className="flex items-center gap-2 h-9 rounded-xl"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
