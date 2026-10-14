-- Migration: Criação das funções RPC para Cupons e Fidelidade (Retenção)

-- 1. Função RPC para validar cupom e retornar valores de desconto
-- Lança exceções detalhadas que podem ser capturadas pelo frontend
CREATE OR REPLACE FUNCTION validate_and_apply_coupon(
    p_business_id uuid,
    p_code text,
    OUT discount_type text,
    OUT discount_value numeric
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_coupon RECORD;
BEGIN
    -- Busca o cupom ignorando case sensitive no código
    SELECT * INTO v_coupon
    FROM public.coupons
    WHERE business_id = p_business_id 
      AND upper(code) = upper(p_code);

    -- Regras de Validação
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cupom não encontrado.';
    END IF;

    IF NOT v_coupon.active THEN
        RAISE EXCEPTION 'Este cupom não está mais ativo.';
    END IF;

    IF v_coupon.expires_at IS NOT NULL AND v_coupon.expires_at < now() THEN
        RAISE EXCEPTION 'Este cupom já expirou.';
    END IF;

    IF v_coupon.usage_limit IS NOT NULL AND v_coupon.used_count >= v_coupon.usage_limit THEN
        RAISE EXCEPTION 'O limite de uso para este cupom já foi atingido.';
    END IF;

    -- Retorna os dados para o frontend aplicar o cálculo
    -- Nota: O used_count só deve ser incrementado no momento da finalização real da venda/agendamento.
    discount_type := v_coupon.discount_type;
    discount_value := v_coupon.discount_value;
END;
$$;


-- 2. Função RPC para adicionar pontos de fidelidade
-- Busca o cartão pelo telefone; se não existir, cria um novo automaticamente
CREATE OR REPLACE FUNCTION add_loyalty_points(
    p_business_id uuid,
    p_phone text,
    p_points integer,
    p_client_name text DEFAULT 'Cliente' -- Necessário pois client_name é NOT NULL na tabela
)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    v_card_id uuid;
BEGIN
    -- Validação básica
    IF p_points <= 0 THEN
        RAISE EXCEPTION 'A quantidade de pontos deve ser maior que zero.';
    END IF;

    -- Tenta encontrar o cartão de fidelidade existente para a barbearia e telefone informados
    SELECT id INTO v_card_id
    FROM public.loyalty_cards
    WHERE business_id = p_business_id 
      AND phone = p_phone;

    IF NOT FOUND THEN
        -- Se não existir, cria um novo cartão já com os pontos iniciais
        INSERT INTO public.loyalty_cards (business_id, client_name, phone, total_points)
        VALUES (p_business_id, p_client_name, p_phone, p_points)
        RETURNING id INTO v_card_id;
    ELSE
        -- Se existir, atualiza o saldo de pontos
        UPDATE public.loyalty_cards
        SET total_points = total_points + p_points
        WHERE id = v_card_id;
    END IF;

    -- Registra a movimentação no histórico de transações de fidelidade
    INSERT INTO public.loyalty_transactions (loyalty_card_id, points, transaction_type, description)
    VALUES (v_card_id, p_points, 'earn', 'Pontos de fidelidade creditados');
    
END;
$$;