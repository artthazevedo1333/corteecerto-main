import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Ajuste para o caminho do seu client do Supabase
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Play, X, UserPlus, Scissors } from 'lucide-react';

// Tipagens baseadas na sua estrutura
type QueueEntry = {
  id: string;
  client_name: string;
  service_id: string;
  preferred_barber_id?: string | null;
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  estimated_wait_time_mins?: number; // Assumindo que a view/tabela retorna o tempo ou calculamos via frontend
};

type Service = { id: string; name: string; duration_mins: number };
type Barber = { id: string; name: string };

export default function QueueManager() {
  const { toast } = useToast();
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  
  // Estados de Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Estado do Formulário
  const [clientName, setClientName] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('any'); // 'any' significa sem preferência

  // Carregar dados iniciais
  useEffect(() => {
    fetchInitialData();
    
    // Opcional: Inscrição em tempo real para atualizações automáticas na fila
    const channel = supabase
      .channel('queue_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'queue' }, () => {
        fetchQueue(); // Recarrega a fila quando houver mudanças no DB
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    await Promise.all([fetchQueue(), fetchServices(), fetchBarbers()]);
    setIsLoading(false);
  };

  const fetchQueue = async () => {
    // Busca apenas os que estão esperando, ordenados pela ordem de chegada
    const { data, error } = await supabase
      .from('queue')
      .select('*')
      .eq('status', 'waiting')
      .order('created_at', { ascending: true });

    if (error) {
      toast({ title: 'Erro ao buscar fila', description: error.message, variant: 'destructive' });
      return;
    }
    setQueue(data || []);
  };

  const fetchServices = async () => {
    const { data } = await supabase.from('services').select('id, name, duration_mins');
    if (data) setServices(data);
  };

  const fetchBarbers = async () => {
    const { data } = await supabase.from('barbers').select('id, name').eq('is_active', true);
    if (data) setBarbers(data);
  };

  // 1. Ação: Adicionar à fila (RPC add_to_queue)
  const handleAddToQueue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !selectedService) {
      toast({ title: 'Atenção', description: 'Nome e Serviço são obrigatórios.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    const payload = {
      p_client_name: clientName,
      p_service_id: selectedService,
      p_preferred_barber_id: selectedBarber === 'any' ? null : selectedBarber,
    };

    const { error } = await supabase.rpc('add_to_queue', payload);

    if (error) {
      toast({ title: 'Erro ao adicionar à fila', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Sucesso', description: `${clientName} entrou na fila de espera!` });
      // Resetar formulário
      setClientName('');
      setSelectedService('');
      setSelectedBarber('any');
      fetchQueue();
    }
    setIsSubmitting(false);
  };

  // 2. Ação: Iniciar Atendimento (RPC advance_queue)
  const handleStartService = async (entryId: string) => {
    setActionLoadingId(entryId);
    const { error } = await supabase.rpc('advance_queue', { p_entry_id: entryId });
    
    if (error) {
      toast({ title: 'Erro ao iniciar atendimento', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Atendimento Iniciado', description: 'O cliente foi movido para em atendimento.' });
      fetchQueue();
    }
    setActionLoadingId(null);
  };

  // 3. Ação: Cancelar/Remover (RPC cancel_queue_entry)
  const handleCancelEntry = async (entryId: string) => {
    if (!window.confirm('Tem certeza que deseja remover este cliente da fila?')) return;
    
    setActionLoadingId(entryId);
    const { error } = await supabase.rpc('cancel_queue_entry', { p_entry_id: entryId });
    
    if (error) {
      toast({ title: 'Erro ao remover da fila', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Cliente removido', description: 'O cliente foi retirado da fila de espera.' });
      fetchQueue();
    }
    setActionLoadingId(null);
  };

  // Cálculos para o Contador Macro
  const totalWaiting = queue.length;
  // Tempo estimado básico (ex: soma do tempo dos serviços na fila, ou média se você tiver isso na RPC)
  // Como simplificação visual, se tivermos 30 min por serviço em média na fila de espera:
  const estimatedLastWaitTime = queue.length * 30; 

  if (isLoading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando painel da fila...</div>;

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      
      {/* 4. Contador Macro no Topo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Esperando</p>
              <h2 className="text-3xl font-bold">{totalWaiting} clientes</h2>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-500/5 border-orange-500/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 bg-orange-500/10 rounded-full text-orange-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tempo Estimado (Último)</p>
              <h2 className="text-3xl font-bold">{totalWaiting === 0 ? '0' : `~${estimatedLastWaitTime} min`}</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Formulário Rápido de Entrada */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Novo Walk-in
              </CardTitle>
              <CardDescription>Adicione um cliente que acabou de chegar.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddToQueue} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Nome do Cliente</Label>
                  <Input 
                    id="client-name" 
                    placeholder="Ex: João Silva" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Serviço</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((svc) => (
                        <SelectItem key={svc.id} value={svc.id}>
                          {svc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Barbeiro Preferido (Opcional)</Label>
                  <Select value={selectedBarber} onValueChange={setSelectedBarber}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sem preferência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Sem preferência (Qualquer um)</SelectItem>
                      {barbers.map((barber) => (
                        <SelectItem key={barber.id} value={barber.id}>
                          {barber.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                  {isSubmitting ? 'Adicionando...' : 'Colocar na Fila'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* 2. Painel Visual da Fila */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Scissors className="h-5 w-5" /> Fila de Espera Atual
            </h3>
            <Badge variant="secondary">{queue.length} aguardando</Badge>
          </div>

          {queue.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg text-muted-foreground bg-muted/20">
              <Clock className="h-10 w-10 mb-2 opacity-50" />
              <p>A fila está vazia no momento.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {queue.map((entry, index) => {
                const position = index + 1;
                const isNext = position === 1;
                const isHandling = actionLoadingId === entry.id;

                return (
                  <Card key={entry.id} className={`transition-all ${isNext ? 'border-primary/50 shadow-md bg-primary/5' : ''}`}>
                    <div className="flex flex-col sm:flex-row items-center p-4 gap-4">
                      
                      {/* Posição na Fila */}
                      <div className={`flex items-center justify-center h-12 w-12 rounded-full font-bold text-xl flex-shrink-0 ${isNext ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {position}º
                      </div>

                      {/* Informações do Cliente */}
                      <div className="flex-grow text-center sm:text-left">
                        <h4 className="text-lg font-bold">{entry.client_name}</h4>
                        <div className="text-sm text-muted-foreground flex flex-col sm:flex-row gap-1 sm:gap-3 mt-1">
                          <span>
                            <strong>Serviço:</strong> {services.find(s => s.id === entry.service_id)?.name || 'Desconhecido'}
                          </span>
                          {entry.preferred_barber_id && (
                            <span>
                              <strong>Barbeiro:</strong> {barbers.find(b => b.id === entry.preferred_barber_id)?.name || 'Qualquer'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 3. Controles de Ação Rápidos */}
                      <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                        <Button 
                          variant="outline" 
                          className="flex-1 sm:flex-none text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                          size="sm"
                          onClick={() => handleCancelEntry(entry.id)}
                          disabled={isHandling}
                        >
                          <X className="h-4 w-4 mr-1" /> Remover
                        </Button>
                        <Button 
                          className="flex-1 sm:flex-none"
                          size="sm"
                          onClick={() => handleStartService(entry.id)}
                          disabled={isHandling}
                        >
                          <Play className="h-4 w-4 mr-1" /> Atender
                        </Button>
                      </div>

                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}