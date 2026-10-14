'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner'; // Ou 'use-toast' do shadcn, dependendo da sua config
import { 
  Plus, 
  Trash2, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Save,
  Loader2
} from 'lucide-react';

// Shadcn UI Components (Ajuste os imports conforme a estrutura do seu projeto)
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// --- Types ---
type Service = { id: string; name: string; price: number };
type Product = { id: string; name: string; unit_measure: string; cost_price: number };
type FormulaItem = { id: string; product_id: string; quantity: number | string };
type CmvReport = {
  service_id: string;
  service_name: string;
  total_revenue: number;
  total_cogs: number;
  net_profit: number;
  margin_percentage: number;
  services_done: number;
};

export default function ServiceFormulasAndCmv() {
  // --- States ---
  const [activeTab, setActiveTab] = useState('formulas');
  
  // Data States
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Formulas States
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [formulaItems, setFormulaItems] = useState<FormulaItem[]>([]);
  const [isLoadingFormulas, setIsLoadingFormulas] = useState(false);
  const [isSavingFormulas, setIsSavingFormulas] = useState(false);

  // CMV States
  const [cmvPeriod, setCmvPeriod] = useState<string>('7_days');
  const [cmvData, setCmvData] = useState<CmvReport[]>([]);
  const [isLoadingCmv, setIsLoadingCmv] = useState(false);

  // --- Data Fetching ---
  const fetchBaseData = async () => {
    try {
      const [servicesRes, productsRes] = await Promise.all([
        supabase.from('services').select('id, name, price').order('name'),
        supabase.from('products').select('id, name, unit_measure, cost_price').order('name') // Tabela de estoque
      ]);

      if (servicesRes.error) throw servicesRes.error;
      if (productsRes.error) throw productsRes.error;

      setServices(servicesRes.data || []);
      setProducts(productsRes.data || []);
    } catch (error: any) {
      toast.error('Erro ao carregar dados base: ' + error.message);
    }
  };

  useEffect(() => {
    fetchBaseData();
  }, []);

  // Fetch formulas when a service is selected
  useEffect(() => {
    if (!selectedServiceId) {
      setFormulaItems([]);
      return;
    }

    const fetchServiceFormulas = async () => {
      setIsLoadingFormulas(true);
      try {
        const { data, error } = await supabase
          .from('service_formulas') // Nome presumido da sua tabela de junção
          .select('id, product_id, quantity')
          .eq('service_id', selectedServiceId);

        if (error) throw error;
        
        // Mapeia adicionando um ID temporário se não existir, para a key do React
        setFormulaItems(data?.map(item => ({
          id: item.id || crypto.randomUUID(),
          product_id: item.product_id,
          quantity: item.quantity
        })) || []);
      } catch (error: any) {
        toast.error('Erro ao carregar a fórmula: ' + error.message);
      } finally {
        setIsLoadingFormulas(false);
      }
    };

    fetchServiceFormulas();
  }, [selectedServiceId]);

  // Fetch CMV Report when tab is active or period changes
  const fetchCmvReport = useCallback(async () => {
    if (activeTab !== 'cmv') return;
    
    setIsLoadingCmv(true);
    try {
      // Define as datas baseadas no seletor
      const endDate = new Date();
      const startDate = new Date();
      if (cmvPeriod === 'today') startDate.setDate(endDate.getDate());
      else if (cmvPeriod === '7_days') startDate.setDate(endDate.getDate() - 7);
      else if (cmvPeriod === '3_months') startDate.setMonth(endDate.getMonth() - 3);

      const { data, error } = await supabase.rpc('get_service_cmv_report', {
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0]
      });

      if (error) throw error;
      setCmvData(data || []);
    } catch (error: any) {
      toast.error('Erro ao gerar relatório CMV: ' + error.message);
    } finally {
      setIsLoadingCmv(false);
    }
  }, [activeTab, cmvPeriod]);

  useEffect(() => {
    fetchCmvReport();
  }, [fetchCmvReport]);

  // --- Handlers: Fórmulas ---
  const handleAddFormulaItem = () => {
    setFormulaItems(prev => [
      ...prev, 
      { id: crypto.randomUUID(), product_id: '', quantity: '' }
    ]);
  };

  const handleRemoveFormulaItem = (id: string) => {
    setFormulaItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateFormulaItem = (id: string, field: keyof FormulaItem, value: any) => {
    setFormulaItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSaveFormulas = async () => {
    if (!selectedServiceId) return;

    // Validação básica
    const invalidItems = formulaItems.filter(item => !item.product_id || Number(item.quantity) <= 0);
    if (invalidItems.length > 0) {
      toast.warning('Preencha corretamente todos os produtos e quantidades maiores que zero.');
      return;
    }

    setIsSavingFormulas(true);
    try {
      // 1. Remove as fórmulas antigas (estratégia replace-all)
      const { error: deleteError } = await supabase
        .from('service_formulas')
        .delete()
        .eq('service_id', selectedServiceId);
        
      if (deleteError) throw deleteError;

      // 2. Insere as novas fórmulas
      if (formulaItems.length > 0) {
        const payload = formulaItems.map(item => ({
          service_id: selectedServiceId,
          product_id: item.product_id,
          quantity: Number(item.quantity)
        }));

        const { error: insertError } = await supabase
          .from('service_formulas')
          .insert(payload);

        if (insertError) throw insertError;
      }

      toast.success('Fórmula de consumo salva com sucesso!');
    } catch (error: any) {
      toast.error('Erro ao salvar fórmula: ' + error.message);
    } finally {
      setIsSavingFormulas(false);
    }
  };

  // --- Helpers ---
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
  
  const formatPercent = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 1 }).format((value || 0) / 100);

  // CMV Totals Calculation
  const totalCmvRevenue = cmvData.reduce((acc, curr) => acc + curr.total_revenue, 0);
  const totalCmvCogs = cmvData.reduce((acc, curr) => acc + curr.total_cogs, 0);
  const totalCmvProfit = totalCmvRevenue - totalCmvCogs;
  const averageMargin = totalCmvRevenue > 0 ? (totalCmvProfit / totalCmvRevenue) * 100 : 0;

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Estoque & Lucratividade</h2>
        <p className="text-muted-foreground">
          Gerencie as fórmulas de consumo dos serviços e analise o Custo da Mercadoria Vendida (CMV).
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="formulas">Fórmulas de Consumo</TabsTrigger>
          <TabsTrigger value="cmv">Relatório CMV (Lucro Real)</TabsTrigger>
        </TabsList>

        {/* --- ABA 1: CONFIGURADOR DE FÓRMULAS --- */}
        <TabsContent value="formulas" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurador por Serviço</CardTitle>
              <CardDescription>
                Associe produtos do estoque que são consumidos na realização de um serviço.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex flex-col gap-2 max-w-sm">
                <label className="text-sm font-medium">Selecione o Serviço</label>
                <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um serviço..." />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(srv => (
                      <SelectItem key={srv.id} value={srv.id}>{srv.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedServiceId && (
                <div className="border rounded-lg p-4 bg-muted/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Insumos do Serviço</h3>
                    <Button onClick={handleAddFormulaItem} variant="outline" size="sm" className="gap-2">
                      <Plus className="h-4 w-4" /> Adicionar Insumo
                    </Button>
                  </div>

                  {isLoadingFormulas ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : formulaItems.length === 0 ? (
                    <div className="text-center p-6 border border-dashed rounded-lg text-muted-foreground">
                      Nenhum insumo configurado para este serviço. Clique em adicionar.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formulaItems.map((item, index) => (
                        <div key={item.id} className="flex items-end gap-3 fade-in slide-in-from-bottom-2">
                          <div className="flex-1 space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">Produto do Estoque</label>
                            <Select 
                              value={item.product_id} 
                              onValueChange={(val) => handleUpdateFormulaItem(item.id, 'product_id', val)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o produto" />
                              </SelectTrigger>
                              <SelectContent>
                                {products.map(prod => (
                                  <SelectItem key={prod.id} value={prod.id}>
                                    {prod.name} ({prod.unit_measure}) - {formatCurrency(prod.cost_price)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="w-32 space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">Qtde Consumida</label>
                            <Input 
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="Ex: 0.5"
                              value={item.quantity}
                              onChange={(e) => handleUpdateFormulaItem(item.id, 'quantity', e.target.value)}
                            />
                          </div>

                          <Button 
                            variant="destructive" 
                            size="icon" 
                            onClick={() => handleRemoveFormulaItem(item.id)}
                            className="shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 flex justify-end border-t">
                    <Button 
                      onClick={handleSaveFormulas} 
                      disabled={isSavingFormulas || isLoadingFormulas}
                      className="gap-2 w-full sm:w-auto"
                    >
                      {isSavingFormulas ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Salvar Fórmula
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- ABA 2: RELATÓRIO CMV --- */}
        <TabsContent value="cmv" className="space-y-4 pt-4">
          <div className="flex items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">Desempenho de Custo Real</h3>
              <p className="text-sm text-muted-foreground">Faturamento vs Custo de Produtos Consumidos</p>
            </div>
            <Select value={cmvPeriod} onValueChange={setCmvPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="7_days">Últimos 7 dias</SelectItem>
                <SelectItem value="3_months">Últimos 3 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoadingCmv ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
            </div>
          ) : (
            <>
              {/* Cards de Resumo */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Faturamento (Serviços)</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalCmvRevenue)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Custo Insumos (CMV)</CardTitle>
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">{formatCurrency(totalCmvCogs)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Lucro Bruto Real</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-500">{formatCurrency(totalCmvProfit)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Margem Média</CardTitle>
                    <Activity className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-500">{formatPercent(averageMargin)}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabela de Detalhamento por Serviço */}
              <Card>
                <CardHeader>
                  <CardTitle>Detalhamento por Serviço</CardTitle>
                  <CardDescription>Visualize quais serviços entregam a melhor e pior margem no período.</CardDescription>
                </CardHeader>
                <CardContent>
                  {cmvData.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Nenhum dado financeiro encontrado para o período selecionado.
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Serviço</TableHead>
                            <TableHead className="text-right">Qtd. Realizada</TableHead>
                            <TableHead className="text-right">Faturamento</TableHead>
                            <TableHead className="text-right">Custo (CMV)</TableHead>
                            <TableHead className="text-right">Lucro</TableHead>
                            <TableHead className="text-right">Margem %</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cmvData.map((row) => (
                            <TableRow key={row.service_id}>
                              <TableCell className="font-medium">{row.service_name}</TableCell>
                              <TableCell className="text-right">{row.services_done}</TableCell>
                              <TableCell className="text-right text-muted-foreground">{formatCurrency(row.total_revenue)}</TableCell>
                              <TableCell className="text-right text-destructive">{formatCurrency(row.total_cogs)}</TableCell>
                              <TableCell className="text-right text-emerald-500 font-medium">{formatCurrency(row.net_profit)}</TableCell>
                              <TableCell className="text-right">
                                <Badge variant={row.margin_percentage > 50 ? 'default' : row.margin_percentage > 20 ? 'secondary' : 'destructive'}>
                                  {formatPercent(row.margin_percentage)}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}