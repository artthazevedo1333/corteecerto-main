-- ==============================================================================
-- Migration: Frente de Caixa (PDV), Fluxo de Caixa Avançado e Pagamentos Híbridos
-- Auditoria de Segurança: Acesso Restrito ao Dono (Business ID)
-- ==============================================================================

-- 1. Tabela de Registros de Caixa (Cash Registers)
CREATE TABLE IF NOT EXISTS public.cash_registers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('open', 'closed')) DEFAULT 'open',
    
    opened_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    closed_at TIMESTAMP WITH TIME ZONE,
    
    initial_balance NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    final_balance_expected NUMERIC(10,2),
    final_balance_counted NUMERIC(10,2),
    
    opened_by UUID NOT NULL REFERENCES auth.users(id),
    closed_by UUID REFERENCES auth.users(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Garante que um negócio não tenha mais de um caixa aberto ao mesmo tempo
DROP INDEX IF EXISTS idx_one_open_register;
CREATE UNIQUE INDEX idx_one_open_register ON public.cash_registers(business_id) WHERE status = 'open';

-- 2. Tabela de Movimentações do Caixa e Pagamentos (Cash Transactions)
CREATE TABLE IF NOT EXISTS public.cash_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cash_register_id UUID NOT NULL REFERENCES public.cash_registers(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    
    -- 'sale' (venda), 'supply' (suprimento/entrada livre), 'bleed' (sangria/retirada), 'tip' (gorjeta)
    type TEXT NOT NULL CHECK (type IN ('sale', 'supply', 'bleed', 'tip')),
    
    -- Método de pagamento
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'credit_card', 'debit_card', 'pix', 'other')),
    
    amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    description TEXT,
    
    -- Quem realizou a operação
    performed_by UUID NOT NULL REFERENCES auth.users(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para performance
DROP INDEX IF EXISTS idx_cash_registers_business_status;
DROP INDEX IF EXISTS idx_cash_transactions_register_id;
DROP INDEX IF EXISTS idx_cash_transactions_appointment_id;

CREATE INDEX idx_cash_registers_business_status ON public.cash_registers(business_id, status);
CREATE INDEX idx_cash_transactions_register_id ON public.cash_transactions(cash_register_id);
CREATE INDEX idx_cash_transactions_appointment_id ON public.cash_transactions(appointment_id);

-- Trigger para atualizar a coluna updated_at automaticamente
CREATE OR REPLACE FUNCTION update_cash_register_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_cash_registers_modtime ON public.cash_registers;
CREATE TRIGGER update_cash_registers_modtime
    BEFORE UPDATE ON public.cash_registers
    FOR EACH ROW
    EXECUTE FUNCTION update_cash_register_modified_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS) - AUDITADO
-- ==========================================

ALTER TABLE public.cash_registers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cash_transactions ENABLE ROW LEVEL SECURITY;

-- Limpeza de políticas antigas (caso esteja rodando sobre uma base existente)
DROP POLICY IF EXISTS "Visualização de caixas permitida para membros da equipe" ON public.cash_registers;
DROP POLICY IF EXISTS "Gestão de caixa para o dono da barbearia" ON public.cash_registers;
DROP POLICY IF EXISTS "Visualização de movimentações permitida para membros da equipe" ON public.cash_transactions;
DROP POLICY IF EXISTS "Barbeiros e gerência podem inserir novas vendas/movimentações no caixa aberto" ON public.cash_transactions;
DROP POLICY IF EXISTS "Edição de movimentações para o dono da barbearia" ON public.cash_transactions;
DROP POLICY IF EXISTS "Exclusão de movimentações para o dono da barbearia" ON public.cash_transactions;

-- --------------------------------------------------------------------------------------
-- POLÍTICAS: CASH REGISTERS (Acesso Exclusivo do Dono)
-- --------------------------------------------------------------------------------------

-- 1. Apenas o dono pode fazer QUALQUER operação (CRUD) nos seus caixas.
-- O uso de 'TO authenticated' bloqueia explicitamente a role 'anon'.
CREATE POLICY "Acesso total aos caixas exclusivamente para o dono"
    ON public.cash_registers
    FOR ALL
    TO authenticated
    USING (business_id = auth.uid())
    WITH CHECK (business_id = auth.uid());

-- --------------------------------------------------------------------------------------
-- POLÍTICAS: CASH TRANSACTIONS (Validação Encadeada e Restrita)
-- --------------------------------------------------------------------------------------

-- 1. Leitura (SELECT): O usuário autenticado só pode ler transações se o caixa pertencer a ele.
CREATE POLICY "Dono pode visualizar transações de seus caixas"
    ON public.cash_transactions
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.cash_registers 
            WHERE id = cash_transactions.cash_register_id 
            AND business_id = auth.uid()
        )
    );

-- 2. Inserção (INSERT): O usuário autenticado só pode inserir se:
--    a) O caixa pertencer a ele (business_id = auth.uid())
--    b) O caixa estiver ABERTO (status = 'open')
CREATE POLICY "Dono pode inserir transações apenas em caixas abertos"
    ON public.cash_transactions
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.cash_registers 
            WHERE id = cash_register_id 
            AND business_id = auth.uid()
            AND status = 'open'
        )
    );

-- 3. Atualização (UPDATE): Apenas se o caixa pertencer ao dono.
CREATE POLICY "Dono pode atualizar transações de seus caixas"
    ON public.cash_transactions
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.cash_registers 
            WHERE id = cash_transactions.cash_register_id 
            AND business_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.cash_registers 
            WHERE id = cash_register_id 
            AND business_id = auth.uid()
        )
    );

-- 4. Exclusão (DELETE): Apenas se o caixa pertencer ao dono.
CREATE POLICY "Dono pode excluir transações de seus caixas"
    ON public.cash_transactions
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.cash_registers 
            WHERE id = cash_transactions.cash_register_id 
            AND business_id = auth.uid()
        )
    );