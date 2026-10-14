"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Ajuste o caminho do seu client do Supabase
import { useToast } from "@/components/ui/use-toast"; // Hook padrão do Shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Ticket, 
  Users, 
  Search, 
  Scissors, 
  PlusCircle, 
  Gift, 
  Loader2 
} from "lucide-react";

// Tipagens
interface Coupon {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  expires_at: string;
  usage_count: number;
  active: boolean;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  loyalty_points: number;
}

export default function MarketingSettings() {
  const { toast } = useToast();
  
  // Estados Globais e Métricas
  const [metrics, setMetrics] = useState({ loyalClients: 0, couponsUsedMonth: 0 });
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);

  // Estados dos Cupons
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(true);
  const [isCreatingCoupon, setIsCreatingCoupon] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount_type: "percentage",
    discount_value: "",
    expires_at: "",
  });

  // Estados do Cartão Fidelidade
  const [searchPhone, setSearchPhone] = useState("");
  const [foundClient, setFoundClient] = useState<Client | null>(null);
  const [isSearchingClient, setIsSearchingClient] = useState(false);
  const [isUpdatingPoints, setIsUpdatingPoints] = useState(false);

  useEffect(() => {
    fetchMetrics();
    fetchCoupons();
  }, []);

  // --- BUSCAS E MÉTRICAS ---
  const fetchMetrics = async () => {
    try {
      // Exemplo: Buscar total de clientes com pontos > 0 e cupons usados no mês atual
      // Ajuste as queries conforme a estrutura exata do seu DB
      const { count: loyalCount } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true })
        .gt("loyalty_points", 0);

      // Simulando busca de cupons usados no mês (pode ser uma query na tabela de agendamentos/pagamentos)
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
      const { count: couponsUsed } = await supabase
        .from("coupon_usages") // Ajuste para sua tabela de histórico de uso
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfMonth);

      setMetrics({
        loyalClients: loyalCount || 0,
        couponsUsedMonth: couponsUsed || 0,
      });
    } catch (error) {
      console.error("Erro ao carregar métricas:", error);
    } finally {
      setIsLoadingMetrics(false);
    }
  };

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar cupons",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingCoupons(false);
    }
  };

  // --- AÇÕES DE CUPOM ---
  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingCoupon(true);
    
    try {
      const { data, error } = await supabase.from("coupons").insert([
        {
          code: newCoupon.code.toUpperCase(),
          discount_type: newCoupon.discount_type,
          discount_value: Number(newCoupon.discount_value),
          expires_at: newCoupon.expires_at,
          active: true,
          usage_count: 0,
        },
      ]).select().single();

      if (error) throw error;

      toast({
        title: "Cupom criado!",
        description: `O cupom ${data.code} foi ativado com sucesso.`,
      });
      
      setCoupons([data, ...coupons]);
      setNewCoupon({ code: "", discount_type: "percentage", discount_value: "", expires_at: "" });
    } catch (error: any) {
      toast({
        title: "Erro ao criar cupom",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreatingCoupon(false);
    }
  };

  // --- AÇÕES DE FIDELIDADE ---
  const handleSearchClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPhone) return;
    
    setIsSearchingClient(true);
    setFoundClient(null);

    try {
      const { data, error } = await supabase
        .from("clients")
        .select("id, name, phone, loyalty_points")
        .eq("phone", searchPhone)
        .single();

      if (error) throw error;
      
      if (data) {
        setFoundClient(data);
      } else {
        toast({
          title: "Cliente não encontrado",
          description: "Verifique o número digitado.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro na busca",
        description: "Cliente não encontrado ou número inválido.",
        variant: "destructive",
      });
    } finally {
      setIsSearchingClient(false);
    }
  };

  const handleLoyaltyAction = async (action: "add" | "redeem") => {
    if (!foundClient) return;
    setIsUpdatingPoints(true);

    try {
      if (action === "add") {
        // Chamando a RPC criada na Fase 5
        const { error } = await supabase.rpc("add_loyalty_points", {
          client_id: foundClient.id,
          points_to_add: 1, // Ajuste caso a pontuação seja dinâmica
        });
        if (error) throw error;

        setFoundClient({ ...foundClient, loyalty_points: foundClient.loyalty_points + 1 });
        toast({
          title: "Pontos adicionados!",
          description: "O saldo do cliente foi atualizado com sucesso.",
        });
        
      } else if (action === "redeem") {
        // Zera os pontos ou reduz (ajuste conforme a regra de negócio da barbearia)
        const { error } = await supabase
          .from("clients")
          .update({ loyalty_points: 0 })
          .eq("id", foundClient.id);
          
        if (error) throw error;

        setFoundClient({ ...foundClient, loyalty_points: 0 });
        toast({
          title: "Prêmio resgatado! ✂️",
          description: "Os pontos foram zerados e o corte grátis foi validado.",
        });
      }
      
      // Atualiza a métrica global silenciossamente
      fetchMetrics();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar fidelidade",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPoints(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 3. Resumo de Engajamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Clientes Fidelizados
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoadingMetrics ? <Loader2 className="h-6 w-6 animate-spin" /> : metrics.loyalClients}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Clientes com 1 ou mais pontos</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cupons Utilizados no Mês
            </CardTitle>
            <Ticket className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoadingMetrics ? <Loader2 className="h-6 w-6 animate-spin" /> : metrics.couponsUsedMonth}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Geração de novas retenções</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* 2. Gerenciador do Cartão Fidelidade */}
        <Card className="xl:col-span-5 flex flex-col h-full border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-primary" />
              Cartão Fidelidade
            </CardTitle>
            <CardDescription>
              Busque o cliente pelo telefone para adicionar pontos ou resgatar prêmios.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <form onSubmit={handleSearchClient} className="flex gap-3 mb-6">
              <Input
                placeholder="Telefone (Ex: 11999999999)"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isSearchingClient || !searchPhone}>
                {isSearchingClient ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </form>

            {foundClient ? (
              <div className="bg-muted/30 border border-border/50 p-6 rounded-xl text-center space-y-4 flex-1 flex flex-col justify-center">
                <div>
                  <h3 className="text-xl font-bold">{foundClient.name}</h3>
                  <p className="text-sm text-muted-foreground">{foundClient.phone}</p>
                </div>
                
                <div className="py-4">
                  <span className="text-5xl font-black text-primary">{foundClient.loyalty_points}</span>
                  <span className="text-muted-foreground ml-2">pontos</span>
                </div>

                <div className="flex gap-3 justify-center w-full mt-auto">
                  <Button 
                    className="w-full gap-2" 
                    onClick={() => handleLoyaltyAction("add")}
                    disabled={isUpdatingPoints}
                  >
                    <PlusCircle className="w-4 h-4" />
                    Adicionar Ponto
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full gap-2 border-primary/20 hover:border-primary/50 transition-colors"
                    onClick={() => handleLoyaltyAction("redeem")}
                    disabled={isUpdatingPoints || foundClient.loyalty_points === 0}
                  >
                    <Gift className="w-4 h-4" />
                    Resgatar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border/50 rounded-xl p-8">
                <Users className="w-12 h-12 mb-3 opacity-20" />
                <p>Nenhum cliente selecionado</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 1. Painel de Controle de Cupons */}
        <Card className="xl:col-span-7 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-primary" />
              Gestão de Cupons Promocionais
            </CardTitle>
            <CardDescription>
              Crie códigos de desconto para atrair e reter seus clientes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Formulário de Criação */}
            <form onSubmit={handleCreateCoupon} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end bg-muted/20 p-4 rounded-lg border border-border/50">
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-xs font-medium">Código</label>
                <Input 
                  placeholder="EX: CORTE10" 
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">Tipo</label>
                <Select 
                  value={newCoupon.discount_type} 
                  onValueChange={(val: "percentage" | "fixed") => setNewCoupon({...newCoupon, discount_type: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">Valor</label>
                <Input 
                  type="number" 
                  placeholder="10"
                  value={newCoupon.discount_value}
                  onChange={(e) => setNewCoupon({...newCoupon, discount_value: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-xs font-medium">Expiração</label>
                <Input 
                  type="date"
                  value={newCoupon.expires_at}
                  onChange={(e) => setNewCoupon({...newCoupon, expires_at: e.target.value})}
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-4 mt-2">
                <Button type="submit" className="w-full md:w-auto md:float-right gap-2" disabled={isCreatingCoupon}>
                  {isCreatingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                  Gerar Cupom
                </Button>
              </div>
            </form>

            {/* Tabela de Cupons Ativos */}
            <div className="rounded-md border border-border/50">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Cupom</TableHead>
                    <TableHead>Desconto</TableHead>
                    <TableHead>Expira em</TableHead>
                    <TableHead className="text-right">Usos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingCoupons ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ) : coupons.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Nenhum cupom ativo no momento.
                      </TableCell>
                    </TableRow>
                  ) : (
                    coupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell className="font-medium">{coupon.code}</TableCell>
                        <TableCell>
                          {coupon.discount_type === "percentage" 
                            ? `${coupon.discount_value}%` 
                            : `R$ ${coupon.discount_value.toFixed(2)}`}
                        </TableCell>
                        <TableCell>{new Date(coupon.expires_at).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell className="text-right font-bold text-primary">{coupon.usage_count}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}