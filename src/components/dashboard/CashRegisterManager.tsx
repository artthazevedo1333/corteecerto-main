import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Ajuste o caminho conforme o seu projeto
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from '@/components/ui/dialog';
import { 
  Wallet, ArrowDownToLine, ArrowUpFromLine, 
  Lock, Unlock, DollarSign, Activity, Loader2
} from 'lucide-react';

// Tipagem do Resumo do Caixa
interface CashSummary {
  initialBalance: number;
  totalEntries: number;
  totalBleeds: number;
  currentBalance: number;
}

export default function CashRegisterManager() {
  const { toast } = useToast();
  
  // Estados de Controle
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cashRegisterId, setCashRegisterId] = useState<string | null>(null);
  
  // Estados de Valores
  const [initialCash, setInitialCash] = useState<string>('');
  const [summary, setSummary] = useState<CashSummary>({
    initialBalance: 0,
    totalEntries: 0,
    totalBleeds: 0,
    currentBalance: 0,
  });

  // Estados dos Modais de Movimentação
  const [supplyModalOpen, setSupplyModalOpen] = useState(false);
  const [bleedModalOpen, setBleedModalOpen] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState<string>('');
  const [transactionReason, setTransactionReason] = useState<string>('');

  // Formatação de Moeda BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Busca inicial de status do Caixa
  useEffect(() => {
    fetchCashRegisterStatus();
  }, []);

  const fetchCashRegisterStatus = async () => {
    setIsLoading(true);
    try {
      // Exemplo: Substitua pela sua RPC de buscar caixa atual ou query na tabela
      const { data, error } = await supabase.rpc('get_current_cash_register');
      
      if (error) throw error;

      if (data && data.is_open) {
        setIsOpen(true);
        setCashRegisterId(data.id);
        setSummary({
          initialBalance: data.initial_balance || 0,
          totalEntries: data.total_entries || 0,
          totalBleeds: data.total_bleeds || 0,
          currentBalance: data.current_balance || 0,
        });
      } else {
        setIsOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Erro ao buscar status",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handler de Abertura de Caixa
  const handleOpenRegister = async () => {
    if (!initialCash || isNaN(Number(initialCash))) {
      toast({
        title: "Valor inválido",
        description: "Digite um saldo inicial válido em dinheiro.",
        variant: "destructive",
      });
      return;
    }

    setIsActionLoading(true);
    try {
      const { error } = await supabase.rpc('open_cash_register', {
        p_initial_balance: parseFloat(initialCash)
      });

      if (error) throw error;

      toast({
        title: "Caixa aberto com sucesso!",
        description: `Saldo inicial: ${formatCurrency(parseFloat(initialCash))}`,
      });
      
      setInitialCash('');
      fetchCashRegisterStatus(); // Atualiza a tela
    } catch (error: any) {
      toast({
        title: "Erro ao abrir o caixa",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  // Handler genérico de Movimentação (Suprimento / Sangria)
  const handleMovement = async (type: 'supply' | 'bleed') => {
    if (!transactionAmount || isNaN(Number(transactionAmount))) {
      toast({
        title: "Valor inválido",
        description: "Digite um valor válido para a movimentação.",
        variant: "destructive",
      });
      return;
    }

    setIsActionLoading(true);
    try {
      // Ajuste o nome da sua RPC de acordo com o seu backend
      const rpcName = type === 'supply' ? 'register_cash_supply' : 'register_cash_bleed';
      
      const { error } = await supabase.rpc(rpcName, {
        p_cash_register_id: cashRegisterId,
        p_amount: parseFloat(transactionAmount),
        p_reason: transactionReason || (type === 'supply' ? 'Suprimento Manual' : 'Sangria Manual'),
      });

      if (error) throw error;

      toast({
        title: type === 'supply' ? "Suprimento registrado!" : "Sangria registrada!",
        description: `Valor: ${formatCurrency(parseFloat(transactionAmount))}`,
      });

      // Fechar modal e limpar campos
      setSupplyModalOpen(false);
      setBleedModalOpen(false);
      setTransactionAmount('');
      setTransactionReason('');
      
      fetchCashRegisterStatus(); // Atualiza os saldos visuais
    } catch (error: any) {
      toast({
        title: "Erro na movimentação",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // --- RENDERIZAÇÃO: CAIXA FECHADO ---
  if (!isOpen) {
    return (
      <Card className="max-w-md mx-auto mt-10 border-dashed border-2">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-muted p-3 rounded-full w-fit mb-4">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Caixa Fechado</CardTitle>
          <CardDescription>
            Inicie o turno abrindo o caixa operacional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="initialBalance">Saldo Inicial em Dinheiro (Fundo de Troco)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="initialBalance"
                type="number"
                placeholder="0.00"
                className="pl-9"
                value={initialCash}
                onChange={(e) => setInitialCash(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full font-semibold" 
            size="lg" 
            onClick={handleOpenRegister}
            disabled={isActionLoading}
          >
            {isActionLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Unlock className="w-4 h-4 mr-2" />}
            Abrir Caixa
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // --- RENDERIZAÇÃO: CAIXA ABERTO ---
  return (
    <div className="space-y-6">
      {/* HEADER DE STATUS E AÇÕES RÁPIDAS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Caixa Operacional
              <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">ABERTO</Badge>
            </h2>
            <p className="text-sm text-muted-foreground">O caixa está recebendo movimentações.</p>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {/* MODAL: REGISTRAR SUPRIMENTO */}
          <Dialog open={supplyModalOpen} onOpenChange={setSupplyModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 md:flex-none border-blue-200 hover:bg-blue-50 text-blue-700">
                <ArrowUpFromLine className="w-4 h-4 mr-2" />
                Suprimento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Suprimento</DialogTitle>
                <DialogDescription>Adicione dinheiro extra ao caixa (Ex: reforço de troco).</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Valor do Suprimento (R$)</Label>
                  <Input type="number" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Motivo / Observação</Label>
                  <Input placeholder="Ex: Reforço de troco da gaveta" value={transactionReason} onChange={(e) => setTransactionReason(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSupplyModalOpen(false)}>Cancelar</Button>
                <Button onClick={() => handleMovement('supply')} disabled={isActionLoading}>Confirmar Suprimento</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* MODAL: REGISTRAR SANGRIA */}
          <Dialog open={bleedModalOpen} onOpenChange={setBleedModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 md:flex-none border-red-200 hover:bg-red-50 text-red-700">
                <ArrowDownToLine className="w-4 h-4 mr-2" />
                Sangria
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Sangria</DialogTitle>
                <DialogDescription>Retire dinheiro do caixa (Ex: pagamento de despesas, malote).</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Valor da Sangria (R$)</Label>
                  <Input type="number" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Motivo / Observação</Label>
                  <Input placeholder="Ex: Pagamento fornecedor de bebidas" value={transactionReason} onChange={(e) => setTransactionReason(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setBleedModalOpen(false)}>Cancelar</Button>
                <Button variant="destructive" onClick={() => handleMovement('bleed')} disabled={isActionLoading}>Confirmar Sangria</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* GRID DE RESUMO VISUAL DINÂMICO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Inicial</CardTitle>
            <Wallet className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.initialBalance)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Entradas</CardTitle>
            <ArrowUpFromLine className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(summary.totalEntries)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Sangrias</CardTitle>
            <ArrowDownToLine className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-{formatCurrency(summary.totalBleeds)}</div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground border-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">Saldo Atual Estimado</CardTitle>
            <DollarSign className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(summary.currentBalance)}</div>
            <p className="text-xs text-primary-foreground/70 mt-1">Dinheiro em gaveta</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}