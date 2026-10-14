-- Migration: Funções RPC para Automação de Estoque e Relatório de CMV

-- NOTA: Esta migration assume que a sua tabela `public.products` possui:
-- 1. Uma coluna de quantidade em estoque (aqui chamada de `stock`).
-- 2. Uma coluna de preço de custo (aqui chamada de `cost_price`).
-- Caso os nomes sejam diferentes na sua base, ajuste-os nas linhas de UPDATE e SELECT abaixo.

-- ====================================================================================
-- 1. Função: Baixa Automática de Estoque (Trigger/Chamada Manual ao concluir agendamento)
-- ====================================================================================
CREATE OR REPLACE FUNCTION public.trigger_service_stock_deduction(p_appointment_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    v_service_id UUID;
    v_business_id UUID;
    v_formula RECORD;
    v_product_cost NUMERIC;
BEGIN
    -- 1. Obter os dados do agendamento
    SELECT service_id, business_id 
    INTO v_service_id, v_business_id
    FROM public.appointments
    WHERE id = p_appointment_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Agendamento não encontrado.';
    END IF;

    -- 2. Validação de Segurança: Apenas o Dono ou membro da Equipe (via profiles)
    IF v_business_id != auth.uid() AND NOT EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Acesso negado: Você não tem permissão para operar nesta barbearia.';
    END IF;

    -- 3. Iterar sobre a fórmula do serviço correspondente
    FOR v_formula IN 
        SELECT product_id, quantity_used
        FROM public.service_formulas
        WHERE service_id = v_service_id
    LOOP
        -- 4. Dar baixa no estoque e capturar o preço de custo atual do produto
        -- Substitua 'stock' pelo nome real da sua coluna de estoque se for diferente.
        UPDATE public.products
        SET stock = stock - v_formula.quantity_used
        WHERE id = v_formula.product_id
        RETURNING cost_price INTO v_product_cost;

        -- 5. Registrar o histórico imutável de consumo (CMV)
        INSERT INTO public.stock_consumption_logs (
            appointment_id,
            product_id,
            quantity,
            cost_price_at_time,
            business_id
        ) VALUES (
            p_appointment_id,
            v_formula.product_id,
            v_formula.quantity_used,
            COALESCE(v_product_cost, 0), -- Previne erro caso o produto não tenha custo cadastrado
            v_business_id
        );
    END LOOP;
END;
$$;


-- ====================================================================================
-- 2. Função: Relatório de Custo de Mercadoria Vendida (CMV) para o Frontend
-- ====================================================================================
CREATE OR REPLACE FUNCTION public.get_service_cmv_report(
    p_business_id UUID,
    p_start_date TIMESTAMPTZ,
    p_end_date TIMESTAMPTZ
)
RETURNS TABLE (
    product_id UUID,
    product_name TEXT,
    total_quantity_used NUMERIC,
    total_cost NUMERIC
)
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
    -- 1. Validação de Segurança: Apenas o Dono ou membro da Equipe (via profiles)
    IF p_business_id != auth.uid() AND NOT EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Acesso negado: Você não tem permissão para visualizar dados desta barbearia.';
    END IF;

    -- 2. Retornar a query consolidada
    RETURN QUERY
    SELECT 
        scl.product_id,
        p.name::TEXT AS product_name,
        SUM(scl.quantity)::NUMERIC AS total_quantity_used,
        SUM(scl.quantity * scl.cost_price_at_time)::NUMERIC AS total_cost
    FROM public.stock_consumption_logs scl
    JOIN public.products p ON p.id = scl.product_id
    WHERE scl.business_id = p_business_id
      AND scl.created_at >= p_start_date
      AND scl.created_at <= p_end_date
    GROUP BY scl.product_id, p.name
    ORDER BY total_cost DESC; -- Ordena do maior custo para o menor
END;
$$;