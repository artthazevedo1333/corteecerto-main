-- Migration: Create RPC Functions for Walk-in Queue Management
-- Description: Funções para adicionar à fila, avançar e cancelar clientes (reorganizando posições)

-- 1. Função: Adicionar cliente à fila (Calculando a próxima posição)
CREATE OR REPLACE FUNCTION public.add_to_queue(
    p_business_id uuid,
    p_client_name text,
    p_phone text,
    p_barber_id uuid,
    p_service_id uuid
) 
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
    v_next_position integer;
    v_new_id uuid;
BEGIN
    -- Obter a última posição atual na fila daquela barbearia para clientes aguardando
    SELECT COALESCE(MAX(position), 0) + 1
    INTO v_next_position
    FROM public.walk_in_queue
    WHERE business_id = p_business_id 
      AND status = 'waiting';

    -- Inserir o novo cliente na fila com a posição calculada
    INSERT INTO public.walk_in_queue (
        business_id, 
        client_name, 
        phone, 
        barber_id, 
        service_id, 
        status, 
        position
    ) VALUES (
        p_business_id, 
        p_client_name, 
        p_phone, 
        p_barber_id, 
        p_service_id, 
        'waiting', 
        v_next_position
    ) RETURNING id INTO v_new_id;

    RETURN v_new_id;
END;
$$;


-- 2. Função: Avançar a fila (Move de 'waiting' para 'in_service' e ajusta posições)
CREATE OR REPLACE FUNCTION public.advance_queue(
    p_id uuid
) 
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    v_business_id uuid;
    v_current_position integer;
BEGIN
    -- Capturar o business_id e a posição atual (aplicando lock na linha para concorrência)
    SELECT business_id, position
    INTO v_business_id, v_current_position
    FROM public.walk_in_queue
    WHERE id = p_id AND status = 'waiting'
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cliente não encontrado ou já não está mais na fila de espera.';
    END IF;

    -- Atualizar o status do cliente atual para 'in_service' e remover sua posição da fila
    UPDATE public.walk_in_queue
    SET status = 'in_service',
        position = NULL
    WHERE id = p_id;

    -- Reorganizar a fila: subtrair 1 da posição de todos que estavam atrás desse cliente
    UPDATE public.walk_in_queue
    SET position = position - 1
    WHERE business_id = v_business_id
      AND status = 'waiting'
      AND position > v_current_position;

END;
$$;


-- 3. Função: Cancelar entrada na fila (Move de 'waiting' para 'canceled' e ajusta posições)
CREATE OR REPLACE FUNCTION public.cancel_queue_entry(
    p_id uuid
) 
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    v_business_id uuid;
    v_current_position integer;
BEGIN
    -- Capturar o business_id e a posição atual (aplicando lock na linha para concorrência)
    SELECT business_id, position
    INTO v_business_id, v_current_position
    FROM public.walk_in_queue
    WHERE id = p_id AND status = 'waiting'
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cliente não encontrado ou já não está mais na fila de espera.';
    END IF;

    -- Atualizar o status do cliente para 'canceled' e remover sua posição
    UPDATE public.walk_in_queue
    SET status = 'canceled',
        position = NULL
    WHERE id = p_id;

    -- Reorganizar a fila: subtrair 1 da posição de todos que estavam atrás desse cliente
    UPDATE public.walk_in_queue
    SET position = position - 1
    WHERE business_id = v_business_id
      AND status = 'waiting'
      AND position > v_current_position;

END;
$$;