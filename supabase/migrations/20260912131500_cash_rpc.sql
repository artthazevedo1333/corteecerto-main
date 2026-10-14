-- Migration: RPCs para Frente de Caixa e Movimentações Financeiras

-- ==============================================================================
-- 1. Função: open_cash_register
-- Objetivo: Abrir o caixa para a barbearia, impedindo duplicidade de caixas 
-- abertos e criando o registro de suprimento inicial (se houver saldo).
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.open_cash_register(
    p_business_id UUID,
    p_initial_balance NUMERIC,
    p_user_id UUID
) RETURNS UUID AS $$
DECLARE
    v_register_id UUID;
    v_open_count INT;
BEGIN
    -- 1. Verifica se já existe um caixa aberto para o negócio
    SELECT COUNT(*) INTO v_open_count 
    FROM public.cash_registers 
    WHERE business_id = p_business_id AND status = 'open';
    
    IF v_open_count > 0 THEN
        RAISE EXCEPTION 'Já existe um caixa aberto para esta barbearia. É necessário fechá-lo antes de abrir um novo.';
    END IF;
    
    -- 2. Cria o novo registro de caixa
    INSERT INTO public.cash_registers (
        business_id, 
        status, 
        initial_balance, 
        opened_by
    ) VALUES (
        p_business_id, 
        'open', 
        COALESCE(p_initial_balance, 0.00), 
        p_user_id
    ) RETURNING id INTO v_register_id;
    
    -- 3. Registra a transação de abertura no fluxo de movimentações (Ledger)
    -- Isso insere o fundo de caixa como um suprimento para bater a matemática no final do dia
    IF COALESCE(p_initial_balance, 0) > 0 THEN
        INSERT INTO public.cash_transactions (
            cash_register_id, type, payment_method, amount, description, performed_by
        ) VALUES (
            v_register_id, 'supply', 'cash', p_initial_balance, 'Saldo inicial de abertura do caixa', p_user_id
        );
    END IF;

    RETURN v_register_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==============================================================================
-- 2. Função: close_cash_register
-- Objetivo: Fechar o caixa e calcular o saldo físico (dinheiro) esperado.
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.close_cash_register(
    p_cash_register_id UUID,
    p_final_balance_counted NUMERIC,
    p_user_id UUID
) RETURNS void AS $$
DECLARE
    v_cash_in NUMERIC;
    v_cash_out NUMERIC;
    v_expected_balance NUMERIC;
BEGIN
    -- 1. Verifica se o caixa existe e está aberto
    IF NOT EXISTS (
        SELECT 1 FROM public.cash_registers 
        WHERE id = p_cash_register_id AND status = 'open'
    ) THEN
        RAISE EXCEPTION 'Caixa não encontrado ou já se encontra fechado.';
    END IF;

    -- 2. Calcula as Entradas em DINHEIRO FÍSICO
    -- Vendas em dinheiro + Suprimentos (inclui o saldo inicial inserido no open_cash_register) + Gorjetas em dinheiro
    SELECT COALESCE(SUM(amount), 0.00) INTO v_cash_in
    FROM public.cash_transactions
    WHERE cash_register_id = p_cash_register_id
      AND payment_method = 'cash'
      AND type IN ('sale', 'supply', 'tip');
      
    -- 3. Calcula as Saídas em DINHEIRO FÍSICO (Sangrias/Retiradas)
    SELECT COALESCE(SUM(amount), 0.00) INTO v_cash_out
    FROM public.cash_transactions
    WHERE cash_register_id = p_cash_register_id
      AND payment_method = 'cash'
      AND type = 'bleed';
      
    -- O Saldo Esperado é puramente (Total de Entradas em Caixa - Total de Saídas em Caixa)
    v_expected_balance := v_cash_in - v_cash_out;
    
    -- 4. Atualiza o caixa com os valores finais e encerra o status
    UPDATE public.cash_registers
    SET status = 'closed',
        closed_at = now(),
        closed_by = p_user_id,
        final_balance_expected = v_expected_balance,
        final_balance_counted = p_final_balance_counted
    WHERE id = p_cash_register_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==============================================================================
-- 3. Função: process_split_payment
-- Objetivo: Processar pagamentos híbridos para uma venda, separando gorjetas.
-- Utiliza arrays JSONB. Exemplo de uso pelo Frontend:
-- p_payments = '[{"method": "cash", "amount": 50}, {"method": "pix", "amount": 30}]'
-- p_tips     = '[{"method": "pix", "amount": 10}]'
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.process_split_payment(
    p_cash_register_id UUID,
    p_appointment_id UUID,
    p_performed_by UUID,
    p_payments JSONB,
    p_tips JSONB DEFAULT '[]'::JSONB
) RETURNS void AS $$
DECLARE
    v_item JSONB;
    v_method TEXT;
    v_amount NUMERIC;
BEGIN
    -- 1. Verifica se o caixa informado está aberto
    IF NOT EXISTS (
        SELECT 1 FROM public.cash_registers 
        WHERE id = p_cash_register_id AND status = 'open'
    ) THEN
        RAISE EXCEPTION 'Operação negada. O caixa informado não está aberto.';
    END IF;

    -- 2. Processa a lista de pagamentos referentes ao serviço/produto (Vendas)
    IF p_payments IS NOT NULL AND jsonb_array_length(p_payments) > 0 THEN
        FOR v_item IN SELECT * FROM jsonb_array_elements(p_payments)
        LOOP
            v_method := v_item->>'method';
            v_amount := (v_item->>'amount')::NUMERIC;
            
            IF v_amount > 0 THEN
                INSERT INTO public.cash_transactions (
                    cash_register_id,
                    appointment_id,
                    type,
                    payment_method,
                    amount,
                    description,
                    performed_by
                ) VALUES (
                    p_cash_register_id,
                    p_appointment_id,
                    'sale',
                    v_method,
                    v_amount,
                    'Pagamento de agendamento/serviço',
                    p_performed_by
                );
            END IF;
        END LOOP;
    END IF;

    -- 3. Processa a lista isolada de gorjetas (Tips)
    IF p_tips IS NOT NULL AND jsonb_array_length(p_tips) > 0 THEN
        FOR v_item IN SELECT * FROM jsonb_array_elements(p_tips)
        LOOP
            v_method := v_item->>'method';
            v_amount := (v_item->>'amount')::NUMERIC;
            
            IF v_amount > 0 THEN
                INSERT INTO public.cash_transactions (
                    cash_register_id,
                    appointment_id,
                    type,
                    payment_method,
                    amount,
                    description,
                    performed_by
                ) VALUES (
                    p_cash_register_id,
                    p_appointment_id,
                    'tip',
                    v_method,
                    v_amount,
                    'Gorjeta recebida',
                    p_performed_by
                );
            END IF;
        END LOOP;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;