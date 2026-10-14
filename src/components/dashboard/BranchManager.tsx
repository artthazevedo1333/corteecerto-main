"use client"

import React, { useState, useEffect } from "react"
import { Building2, Plus, Loader } from 'lucide-react';
import { toast } from "sonner"
import { supabase } from '@/integrations/supabase/client';
 // Ajuste para o caminho do seu client do Supabase
// Componentes do Shadcn UI (Certifique-se de tê-los instalados via CLI)
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Tipagem baseada no retorno esperado da sua RPC
type Branch = {
  id: string
  name: string
  address?: string
  phone?: string
}

export function BranchManager() {
  // Estados da Lista e Seleção
  const [branches, setBranches] = useState<Branch[]>([])
  const [activeBranchId, setActiveBranchId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // Estados do Modal e Formulário
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({ name: "", address: "", phone: "" })

  const supabase = createClient() 

  useEffect(() => {
    fetchBranches()
  }, [])

  const fetchBranches = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.rpc('get_business_branches')

      if (error) throw error

      if (data && data.length > 0) {
        setBranches(data)
        
        // Verifica se já existe uma filial salva previamente na máquina do usuário
        const savedBranchId = localStorage.getItem("active_branch_id")
        
        if (savedBranchId && data.find((b: Branch) => b.id === savedBranchId)) {
          setActiveBranchId(savedBranchId)
        } else {
          // Se não houver, define a primeira retornada como padrão
          setActiveBranchId(data[0].id)
          localStorage.setItem("active_branch_id", data[0].id)
        }
      }
    } catch (error: any) {
      toast.error("Erro ao carregar filiais", {
        description: error.message || "Não foi possível conectar com o servidor."
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBranchChange = (branchId: string) => {
    setActiveBranchId(branchId)
    localStorage.setItem("active_branch_id", branchId)
    
    toast.success("Unidade alterada", {
      description: "O painel foi atualizado para a nova filial."
    })

    // DICA PRO: Despacha um evento global para que outros componentes (Agenda, Fila, etc) 
    // saibam que a filial mudou e refaçam seus fetchs sem precisar de um reload (opcional).
    window.dispatchEvent(new CustomEvent('branchChanged', { detail: { branchId } }))
    
    // Alternativa simples: window.location.reload()
  }

  const handleCreateBranch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.warning("Atenção", { description: "O nome da filial é obrigatório." })
      return
    }

    setIsCreating(true)
    try {
      // Ajuste os nomes dos parâmetros ('p_name', etc) conforme definido na sua RPC no Supabase
      const { error } = await supabase.rpc('create_new_branch', {
        p_name: formData.name,
        p_address: formData.address,
        p_phone: formData.phone
      })

      if (error) throw error

      toast.success("Sucesso!", { description: "Nova filial criada com sucesso." })
      
      // Limpa o form e fecha o modal
      setFormData({ name: "", address: "", phone: "" })
      setIsDialogOpen(false)

      // Atualiza a lista de filiais silenciosamente
      await fetchBranches()
    } catch (error: any) {
      toast.error("Erro ao criar filial", {
        description: error.message
      })
    } finally {
      setIsCreating(false)
    }
  }

  // Skeleton/Loading state enquanto busca a lista inicial
  if (isLoading && branches.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground text-sm h-9 border border-transparent">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="hidden sm:inline-block">Carregando unidades...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {/* SELETOR DE FILIAIS */}
      <Select value={activeBranchId} onValueChange={handleBranchChange}>
        <SelectTrigger className="w-[200px] lg:w-[240px] bg-background border-muted/50 h-9 transition-all hover:bg-accent focus:ring-1 focus:ring-ring">
          <div className="flex items-center gap-2 truncate">
            <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
            <SelectValue placeholder="Selecione uma filial" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {branches.map((branch) => (
            <SelectItem key={branch.id} value={branch.id} className="cursor-pointer">
              {branch.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* BOTÃO + MODAL PARA ADICIONAR NOVA FILIAL */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9 shrink-0 border-muted/50 text-muted-foreground hover:text-foreground"
            title="Adicionar nova filial"
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Adicionar Filial</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleCreateBranch}>
            <DialogHeader>
              <DialogTitle>Nova Filial</DialogTitle>
              <DialogDescription>
                Adicione uma nova unidade de atendimento ao seu negócio.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-sm font-medium">
                  Nome <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Ex: Unidade Centro"
                  className="col-span-3"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isCreating}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right text-sm font-medium">
                  Endereço
                </Label>
                <Input
                  id="address"
                  placeholder="Ex: Av. Paulista, 1000"
                  className="col-span-3"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={isCreating}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right text-sm font-medium">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  className="col-span-3"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isCreating}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsDialogOpen(false)} 
                disabled={isCreating}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Filial"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}