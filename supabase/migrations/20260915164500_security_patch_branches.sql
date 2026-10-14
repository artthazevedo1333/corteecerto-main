-- ==============================================================================
-- MIGRAÇÃO: 20260912140000_multi_branch.sql
-- DESCRIÇÃO: Criação da estrutura de filiais com RLS e Trava Anti-IDOR
-- ==============================================================================

-- 1. Criação da Tabela de Filiais (Camada Intermediária)
CREATE TABLE IF NOT EXISTS public.branches (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name text NOT NULL,
    address text,
    phone text,
    active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índice de performance para RLS e Queries de relacionamento
CREATE INDEX IF NOT EXISTS idx_branches_business_id ON public.branches(business_id);

-- Habilitar a Segurança em Nível de Linha (RLS)
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS ESTritas CRUD PARA BRANCHES (Isolamento total e bloqueio de "anon")
CREATE POLICY "branches_select_policy" 
    ON public.branches
    FOR SELECT TO authenticated
    USING (business_id = auth.uid());

CREATE POLICY "branches_insert_policy" 
    ON public.branches
    FOR INSERT TO authenticated
    WITH CHECK (business_id = auth.uid());

CREATE POLICY "branches_update_policy" 
    ON public.branches
    FOR UPDATE TO authenticated
    USING (business_id = auth.uid())
    WITH CHECK (business_id = auth.uid());

CREATE POLICY "branches_delete_policy" 
    ON public.branches
    FOR DELETE TO authenticated
    USING (business_id = auth.uid());


-- ==============================================================================
-- 2. Migração Arquitetural nas Tabelas Principais
-- ==============================================================================

ALTER TABLE public.appointments
    ADD COLUMN IF NOT EXISTS branch_id uuid REFERENCES public.branches(id) ON DELETE CASCADE;

ALTER TABLE public.cash_registers
    ADD COLUMN IF NOT EXISTS branch_id uuid REFERENCES public.branches(id) ON DELETE CASCADE;

ALTER TABLE public.walk_in_queue
    ADD COLUMN IF NOT EXISTS branch_id uuid REFERENCES public.branches(id) ON DELETE CASCADE;

-- Índices nas novas FKs para impedir lentidão e timeout nas Subqueries do RLS (Prevenção DoS)
CREATE INDEX IF NOT EXISTS idx_appointments_branch_id ON public.appointments(branch_id);
CREATE INDEX IF NOT EXISTS idx_cash_registers_branch_id ON public.cash_registers(branch_id);
CREATE INDEX IF NOT EXISTS idx_walk_in_queue_branch_id ON public.walk_in_queue(branch_id);


-- ==============================================================================
-- 3. Políticas de RLS Adaptadas para o Novo Relacionamento (Trava Antifraude)
-- ==============================================================================

-- AVISO DE AUDITORIA: 
-- A lógica agora exige que, caso o branch_id seja fornecido, sua propriedade 
-- seja estritamente validada. O fallback pro legado só ocorre se branch_id IS NULL.

-- RLS para appointments
DROP POLICY IF EXISTS "owner_access_branch_appointments" ON public.appointments;
CREATE POLICY "owner_access_branch_appointments"
    ON public.appointments
    FOR ALL TO authenticated
    USING (
        (branch_id IS NOT NULL AND branch_id IN (SELECT id FROM public.branches WHERE business_id = auth.uid()))
        OR 
        (branch_id IS NULL AND user_id = auth.uid())
    )
    WITH CHECK (
        (branch_id IS NOT NULL AND branch_id IN (SELECT id FROM public.branches WHERE business_id = auth.uid()))
        OR 
        (branch_id IS NULL AND user_id = auth.uid())
    );

-- RLS para cash_registers
DROP POLICY IF EXISTS "owner_access_branch_cash_registers" ON public.cash_registers;
CREATE POLICY "owner_access_branch_cash_registers"
    ON public.cash_registers
    FOR ALL TO authenticated
    USING (
        (branch_id IS NOT NULL AND branch_id IN (SELECT id FROM public.branches WHERE business_id = auth.uid()))
        OR 
        (branch_id IS NULL AND business_id = auth.uid())
    )
    WITH CHECK (
        (branch_id IS NOT NULL AND branch_id IN (SELECT id FROM public.branches WHERE business_id = auth.uid()))
        OR 
        (branch_id IS NULL AND business_id = auth.uid())
    );

-- RLS para walk_in_queue
DROP POLICY IF EXISTS "owner_access_branch_walk_in_queue" ON public.walk_in_queue;
CREATE POLICY "owner_access_branch_walk_in_queue"
    ON public.walk_in_queue
    FOR ALL TO authenticated
    USING (
        (branch_id IS NOT NULL AND branch_id IN (SELECT id FROM public.branches WHERE business_id = auth.uid()))
        OR 
        (branch_id IS NULL AND business_id = auth.uid())
    )
    WITH CHECK (
        (branch_id IS NOT NULL AND branch_id IN (SELECT id FROM public.branches WHERE business_id = auth.uid()))
        OR 
        (branch_id IS NULL AND business_id = auth.uid())
    );

-- ==============================================================================
-- 4. Opcional: Gatilho de Atualização
-- ==============================================================================
-- Descomente caso a função já exista no banco
/*
CREATE TRIGGER set_branches_updated_at
    BEFORE UPDATE ON public.branches
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
*/