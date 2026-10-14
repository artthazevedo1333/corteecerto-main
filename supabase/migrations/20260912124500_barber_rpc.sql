-- Migration: Create RPC functions for reading and updating barber shifts

-- ==============================================================================
-- 1. FUNCTION: get_barber_working_hours
-- Retorna os turnos do barbeiro formatados em um array JSON.
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.get_barber_working_hours(p_barber_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSONB;
BEGIN
    SELECT jsonb_agg(
        jsonb_build_object(
            'id', id,
            'owner_id', owner_id,
            'barber_id', barber_id,
            'day_of_week', day_of_week,
            'start_time', start_time,
            'lunch_start_time', lunch_start_time,
            'lunch_end_time', lunch_end_time,
            'end_time', end_time,
            'is_day_off', is_day_off
        ) ORDER BY day_of_week
    ) INTO v_result
    FROM public.barber_shifts
    WHERE barber_id = p_barber_id;

    -- Retorna o array JSON ou um array vazio caso o barbeiro não tenha turnos
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- Permissões estritas: Apenas usuários autenticados podem executar
REVOKE EXECUTE ON FUNCTION public.get_barber_working_hours(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_barber_working_hours(UUID) TO authenticated;


-- ==============================================================================
-- 2. FUNCTION: update_barber_working_hours
-- Salva ou atualiza a escala de trabalho, com validações de horário e segurança.
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.update_barber_working_hours(
    p_barber_id UUID,
    p_owner_id UUID,
    p_shifts JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_caller_id UUID := auth.uid();
    v_shift RECORD;
BEGIN
    -- Verificação de Autorização: O usuário autenticado deve ser o dono ou o próprio barbeiro
    IF v_caller_id IS NULL OR (v_caller_id != p_owner_id AND v_caller_id != p_barber_id) THEN
        RAISE EXCEPTION 'Acesso negado. Apenas o dono da barbearia ou o próprio barbeiro podem alterar a escala.';
    END IF;

    -- Iterar sobre o array JSON recebido
    FOR v_shift IN 
        SELECT * FROM jsonb_to_recordset(p_shifts) AS x(
            day_of_week INTEGER,
            start_time TIME,
            lunch_start_time TIME,
            lunch_end_time TIME,
            end_time TIME,
            is_day_off BOOLEAN
        )
    LOOP
        -- Validação 1: Dia da semana deve ser entre 0 (Dom) e 6 (Sáb)
        IF v_shift.day_of_week < 0 OR v_shift.day_of_week > 6 THEN
            RAISE EXCEPTION 'Dia da semana inválido: % (deve ser entre 0 e 6).', v_shift.day_of_week;
        END IF;

        -- Validações aplicáveis apenas para dias de trabalho (is_day_off = false)
        IF NOT COALESCE(v_shift.is_day_off, false) THEN
            
            -- Validação 2: Horários de expediente são obrigatórios
            IF v_shift.start_time IS NULL OR v_shift.end_time IS NULL THEN
                RAISE EXCEPTION 'Dias de trabalho devem ter horário de início e fim definidos (Dia %).', v_shift.day_of_week;
            END IF;

            -- Validação 3: Horário de início não pode ser maior ou igual ao de término
            IF v_shift.start_time >= v_shift.end_time THEN
                RAISE EXCEPTION 'O horário de início não pode ser maior ou igual ao horário de término (Dia %).', v_shift.day_of_week;
            END IF;

            -- Validação 4: Lógica e consistência dos horários de almoço (se fornecidos)
            IF v_shift.lunch_start_time IS NOT NULL AND v_shift.lunch_end_time IS NOT NULL THEN
                IF v_shift.lunch_start_time <= v_shift.start_time THEN
                    RAISE EXCEPTION 'O início do almoço deve ser após o início do expediente (Dia %).', v_shift.day_of_week;
                END IF;
                
                IF v_shift.lunch_end_time <= v_shift.lunch_start_time THEN
                    RAISE EXCEPTION 'O fim do almoço deve ser após o início do almoço (Dia %).', v_shift.day_of_week;
                END IF;
                
                IF v_shift.lunch_end_time >= v_shift.end_time THEN
                    RAISE EXCEPTION 'O fim do almoço deve ser antes do término do expediente (Dia %).', v_shift.day_of_week;
                END IF;
            END IF;
        END IF;

        -- UPSERT: Insere o novo turno ou atualiza se já existir para aquele dia e barbeiro
        INSERT INTO public.barber_shifts (
            owner_id,
            barber_id,
            day_of_week,
            start_time,
            lunch_start_time,
            lunch_end_time,
            end_time,
            is_day_off,
            updated_at
        ) VALUES (
            p_owner_id,
            p_barber_id,
            v_shift.day_of_week,
            v_shift.start_time,
            v_shift.lunch_start_time,
            v_shift.lunch_end_time,
            v_shift.end_time,
            COALESCE(v_shift.is_day_off, false),
            now()
        )
        ON CONFLICT (barber_id, day_of_week)
        DO UPDATE SET
            start_time = EXCLUDED.start_time,
            lunch_start_time = EXCLUDED.lunch_start_time,
            lunch_end_time = EXCLUDED.lunch_end_time,
            end_time = EXCLUDED.end_time,
            is_day_off = EXCLUDED.is_day_off,
            updated_at = now();

    END LOOP;
END;
$$;

-- Permissões estritas: Apenas usuários autenticados podem executar
REVOKE EXECUTE ON FUNCTION public.update_barber_working_hours(UUID, UUID, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_barber_working_hours(UUID, UUID, JSONB) TO authenticated;