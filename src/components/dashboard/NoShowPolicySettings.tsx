'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase' // Ajuste o caminho do seu client do Supabase
import { useToast } from '@/components/ui/use-toast' // Ajuste conforme seu setup do Shadcn

// Componentes do Shadcn UI (Ajuste os caminhos de importação conforme sua estrutura)
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Info, Save, ShieldCheck, AlertCircle } from 'lucide-react'

export default function NoShowPolicySettings() {
  const { toast } = useToast()

  // Estados do Formulário
  const [requireDeposit, setRequireDeposit] = useState(false)
  const [depositPercentage, setDepositPercentage] = useState<number>(30)
  const [cancellationWindow, setCancellationWindow] = useState<number>(2)
  const [refundPolicy, setRefundPolicy] = useState<string>(
    'Cancelamentos feitos com menos de 2 horas de antecedência não terão o sinal reembolsado.'
  )

  // Estados de UI
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Valor base simulado para o resumo de impacto financeiro
  const baseServiceValue = 50 
  const calculatedDeposit = (baseServiceValue * (depositPercentage || 0)) / 100

  // 1. Carregar configurações atuais do Supabase
  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsLoading(true)
        // Substitua 'barbershop_settings' pela sua tabela real e adicione o filtro do ID da barbearia
        const { data, error } = await supabase
          .from('barbershop_settings')
          .select('require_deposit, deposit_percentage, cancellation_window, refund_policy')
          .single()

        if (error) {
          // Ignora erro caso não tenha registro ainda (PGRST116 = zero rows)
          if (error.code !== 'PGRST116') throw error
        } else if (data) {
          setRequireDeposit(data.require_deposit)
          setDepositPercentage(data.deposit_percentage)
          setCancellationWindow(data.cancellation_window)
          setRefundPolicy(data.refund_policy)
        }
      } catch (error) {
        console.error('Erro ao buscar configurações:', error)
        toast({
          title: 'Erro ao carregar',
          description: 'Não foi possível carregar as políticas de No-Show.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [toast])

  // 2. Salvar configurações no Supabase
  const handleSave = async () => {
    try {
      setIsSaving(true)
      
      const payload = {
        require_deposit: requireDeposit,
        deposit_percentage: depositPercentage,
        cancellation_window: cancellationWindow,
        refund_policy: refundPolicy,
        updated_at: new Date().toISOString(),
      }

      // Substitua pela lógica real do seu backend (ex: usar upsert ou match com ID do user logado)
      const { error } = await supabase
        .from('barbershop_settings')
        .update(payload)
        .eq('id', 1) // ID mockado - substitua pelo ID da barbearia autenticada

      if (error) throw error

      toast({
        title: 'Sucesso!',
        description: 'Políticas de no-show atualizadas com sucesso.',
      })
    } catch (error) {
      console.error('Erro ao salvar:', error)
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao atualizar suas políticas.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-border/60 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">Proteção de Receita (No-Show)</CardTitle>
        </div>
        <CardDescription>
          Configure regras de pagamento antecipado para reduzir faltas e proteger seu faturamento.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Switch Ativar/Desativar */}
        <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-card">
          <div className="space-y-0.5">
            <Label className="text-base font-semibold">Exigir Sinal Antecipado</Label>
            <p className="text-sm text-muted-foreground">
              Os clientes deverão pagar uma porcentagem para confirmar o agendamento online.
            </p>
          </div>
          <Switch 
            checked={requireDeposit} 
            onCheckedChange={setRequireDeposit} 
          />
        </div>

        {/* Formulário de Configuração (Desabilitado visualmente se o switch estiver desligado) */}
        <div className={`space-y-6 transition-opacity duration-300 ${!requireDeposit ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="depositPercentage">Porcentagem do Depósito (%)</Label>
              <div className="relative">
                <Input
                  id="depositPercentage"
                  type="number"
                  min={1}
                  max={100}
                  value={depositPercentage}
                  onChange={(e) => setDepositPercentage(Number(e.target.value))}
                  className="pl-3"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancellationWindow">Janela de Cancelamento Gratuito (Horas)</Label>
              <Input
                id="cancellationWindow"
                type="number"
                min={0}
                value={cancellationWindow}
                onChange={(e) => setCancellationWindow(Number(e.target.value))}
                placeholder="Ex: 2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="refundPolicy">Termos da Política de Reembolso</Label>
            <Textarea
              id="refundPolicy"
              rows={3}
              value={refundPolicy}
              onChange={(e) => setRefundPolicy(e.target.value)}
              placeholder="Descreva as regras que o cliente verá ao agendar..."
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Este texto será exibido na tela de checkout do aplicativo do cliente.
            </p>
          </div>

          {/* Resumo de Impacto Financeiro (Aparece apenas se ativado) */}
          {requireDeposit && (
            <div className="bg-primary/5 border border-primary/20 rounded-md p-4 flex gap-3">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-primary-foreground mb-1">Impacto Prático</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Se um cliente agendar um corte de <strong>R$ {baseServiceValue.toFixed(2)}</strong>, ele pagará <strong>R$ {calculatedDeposit.toFixed(2)}</strong> agora para garantir o horário. Caso ele cancele faltando menos de <strong>{cancellationWindow} horas</strong> para o atendimento, você retém o valor do sinal.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Alerta de Desativação */}
        {!requireDeposit && (
          <div className="bg-muted p-4 rounded-md flex items-center gap-3 text-muted-foreground">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">A proteção contra no-show está desativada. Os clientes podem agendar sem compromisso financeiro.</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end pt-4 border-t border-border/50">
        <Button 
          onClick={handleSave} 
          disabled={isSaving || isLoading}
          className="w-full sm:w-auto"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {isSaving ? 'Salvando...' : 'Salvar Configurações'}
        </Button>
      </CardFooter>
    </Card>
  )
}