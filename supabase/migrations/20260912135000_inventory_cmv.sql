-- Migration: Estoque Operacional e CMV (Consumo de Produtos)

-- 1. Criação da Tabela de Receita do Serviço (Service Formulas)
CREATE TABLE public.service_formulas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity_used NUMERIC(10,4) NOT NULL CHECK (quantity_used > 0),
    business_id UUID NOT NULL, -- Coluna para vínculo direto de segurança (Tenant)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Criação da Tabela de Histórico de Consumo Interno (Stock Consumption Logs)
CREATE TABLE public.stock_consumption_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity NUMERIC(10,4) NOT NULL CHECK (quantity > 0),
    cost_price_at_time NUMERIC(10,2) NOT NULL,
    business_id UUID NOT NULL, -- Coluna para vínculo direto de segurança (Tenant)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Criação de Índices para Performance
CREATE INDEX idx_service_formulas_service_id ON public.service_formulas(service_id);
CREATE INDEX idx_service_formulas_product_id ON public.service_formulas(product_id);
CREATE INDEX idx_service_formulas_business_id ON public.service_formulas(business_id);

CREATE INDEX idx_stock_consumption_logs_appointment_id ON public.stock_consumption_logs(appointment_id);
CREATE INDEX idx_stock_consumption_logs_product_id ON public.stock_consumption_logs(product_id);
CREATE INDEX idx_stock_consumption_logs_business_id ON public.stock_consumption_logs(business_id);

-- 4. Habilitando RLS (Row Level Security)
ALTER TABLE public.service_formulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_consumption_logs ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de RLS para service_formulas

-- SELECT: Donos e Barbeiros da mesma barbearia podem visualizar
CREATE POLICY "Visualização de fórmulas permitida para a equipe"
ON public.service_formulas
FOR SELECT
USING (
    business_id = auth.uid() 
    OR 
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE public.profiles.id = auth.uid()
    )
);


-- INSERT: Apenas o Dono pode criar
CREATE POLICY "Apenas o dono pode criar fórmulas"
ON public.service_formulas
FOR INSERT
WITH CHECK (business_id = auth.uid());

-- UPDATE: Apenas o Dono pode alterar
CREATE POLICY "Apenas o dono pode atualizar fórmulas"
ON public.service_formulas
FOR UPDATE
USING (business_id = auth.uid())
WITH CHECK (business_id = auth.uid());

-- DELETE: Apenas o Dono pode remover
CREATE POLICY "Apenas o dono pode deletar fórmulas"
ON public.service_formulas
FOR DELETE
USING (business_id = auth.uid());


-- 6. Políticas de RLS para stock_consumption_logs

-- SELECT: Visualização dos logs (Donos e equipe)
CREATE POLICY "Visualização do histórico de consumo permitida para a equipe"
ON public.stock_consumption_logs
FOR SELECT
USING (
    business_id = auth.uid() 
    OR 
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE public.profiles.id = auth.uid()
    )
);


-- INSERT: Sistema/Dono/Barbeiro pode registrar a baixa ao concluir o atendimento
CREATE POLICY "Permite inserção de log de consumo para o atendimento"
ON public.stock_consumption_logs
FOR INSERT
WITH CHECK (
    business_id = auth.uid() 
    OR 
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE public.profiles.id = auth.uid()
    )
);

-- UPDATE/DELETE: Bloqueado (Logs de consumo/CMV são históricos imutáveis)
-- Nenhuma política de UPDATE ou DELETE é criada, negando a ação por padrão.