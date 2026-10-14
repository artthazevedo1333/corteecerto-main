-- ============================================================
-- CORTE CERTO
-- LOTE 2 — PUBLIC BOOKING SECURE API (AUDITED)
-- ============================================================

-- ============================================================
-- 1. DADOS PÚBLICOS DA BARBEARIA
-- ============================================================

DROP FUNCTION IF EXISTS public.get_public_booking_data(text);

CREATE OR REPLACE FUNCTION public.get_public_booking_data(
  p_slug text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile record;
  v_services jsonb;
BEGIN
  SELECT 
    id,
    barber_shop_name,
    avatar_url,
    business_address,
    business_city,
    business_state,
    business_phone,
    business_whatsapp,
    business_instagram,
    opening_hours,
    COALESCE(business_timezone, 'America/Fortaleza') as business_timezone
  INTO v_profile
  FROM public.profiles
  WHERE slug = lower(trim(p_slug))
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'BARBERSHOP_NOT_FOUND';
  END IF;

  SELECT COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'id', s.id,
        'name', s.name,
        'description', s.description,
        'price', s.price,
        'duration_minutes', s.duration_minutes
      )
      ORDER BY s.name
    ),
    '[]'::jsonb
  )
  INTO v_services
  FROM public.services s
  WHERE s.user_id = v_profile.id
    AND s.active = true;

  RETURN jsonb_build_object(
    'profile', jsonb_build_object(
      'id', v_profile.id,
      'barber_shop_name', v_profile.barber_shop_name,
      'avatar_url', v_profile.avatar_url,
      'business_address', v_profile.business_address,
      'business_city', v_profile.business_city,
      'business_state', v_profile.business_state,
      'business_phone', v_profile.business_phone,
      'business_whatsapp', v_profile.business_whatsapp,
      'business_instagram', v_profile.business_instagram,
      'business_timezone', v_profile.business_timezone,
      'opening_hours', COALESCE(v_profile.opening_hours, '{}'::jsonb)
    ),
    'services', v_services
  );
END;
$$;


-- ============================================================
-- 2. HORÁRIOS OCUPADOS DO DIA
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_public_booking_busy_slots(
  p_slug text,
  p_date date
)
RETURNS TABLE (
  start_time timestamptz,
  end_time timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_tz text;
  v_day_start timestamptz;
  v_day_end timestamptz;
BEGIN
  SELECT id, COALESCE(business_timezone, 'America/Fortaleza')
  INTO v_user_id, v_tz
  FROM public.profiles
  WHERE slug = lower(trim(p_slug))
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'BARBERSHOP_NOT_FOUND';
  END IF;

  v_day_start := (p_date::timestamp AT TIME ZONE v_tz);
  v_day_end := ((p_date + 1)::timestamp AT TIME ZONE v_tz);

  RETURN QUERY
  SELECT 
    a.start_time,
    a.end_time
  FROM public.appointments a
  WHERE a.user_id = v_user_id
    AND a.status NOT IN ('cancelled', 'no_show')
    AND a.start_time < v_day_end
    AND a.end_time > v_day_start

  UNION ALL

  SELECT 
    sb.start_time,
    sb.end_time
  FROM public.schedule_blocks sb
  WHERE sb.user_id = v_user_id
    AND sb.start_time < v_day_end
    AND sb.end_time > v_day_start

  ORDER BY start_time;
END;
$$;


-- ============================================================
-- 3. CRIAÇÃO SEGURA DO AGENDAMENTO
-- ============================================================

CREATE OR REPLACE FUNCTION public.create_public_booking(
  p_slug text,
  p_service_id uuid,
  p_start_time timestamptz,
  p_customer_name text,
  p_customer_phone text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_tz text;
  v_service record;
  v_start timestamptz;
  v_end timestamptz;
  v_existing boolean;
  v_blocked boolean;
  v_local_date date;
  v_local_time time;
  v_day_key text;
  v_day_config jsonb;
  v_open_time time;
  v_close_time time;
  v_appointment_id uuid;
BEGIN
  -- ----------------------------------------------------------
  -- Validação básica
  -- ----------------------------------------------------------
  IF trim(COALESCE(p_customer_name, '')) = '' THEN
    RAISE EXCEPTION 'CUSTOMER_NAME_REQUIRED';
  END IF;

  IF trim(COALESCE(p_customer_phone, '')) = '' THEN
    RAISE EXCEPTION 'CUSTOMER_PHONE_REQUIRED';
  END IF;

  IF p_start_time IS NULL THEN
    RAISE EXCEPTION 'START_TIME_REQUIRED';
  END IF;

  -- ----------------------------------------------------------
  -- Localiza a barbearia pelo slug E aplica FOR UPDATE 
  -- para travar concorrência (Race Condition / Double Booking)
  -- ----------------------------------------------------------
  SELECT id, COALESCE(business_timezone, 'America/Fortaleza')
  INTO v_user_id, v_tz
  FROM public.profiles
  WHERE slug = lower(trim(p_slug))
  LIMIT 1
  FOR UPDATE; -- << Bloqueio Transacional adicionado aqui

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'BARBERSHOP_NOT_FOUND';
  END IF;

  -- ----------------------------------------------------------
  -- Valida o serviço
  -- ----------------------------------------------------------
  SELECT 
    id,
    name,
    duration_minutes,
    active
  INTO v_service
  FROM public.services
  WHERE id = p_service_id
    AND user_id = v_user_id
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'SERVICE_NOT_FOUND';
  END IF;

  IF v_service.active IS NOT TRUE THEN
    RAISE EXCEPTION 'SERVICE_INACTIVE';
  END IF;

  IF v_service.duration_minutes IS NULL 
     OR v_service.duration_minutes <= 0 
     OR v_service.duration_minutes > 480 THEN
    RAISE EXCEPTION 'INVALID_SERVICE_DURATION';
  END IF;

  -- ----------------------------------------------------------
  -- Calcula início/fim
  -- ----------------------------------------------------------
  v_start := p_start_time;
  v_end := v_start + make_interval(mins => v_service.duration_minutes);

  -- ----------------------------------------------------------
  -- Impede agendamento no passado
  -- ----------------------------------------------------------
  IF v_start <= now() THEN
    RAISE EXCEPTION 'BOOKING_IN_PAST';
  END IF;

  -- ----------------------------------------------------------
  -- Horário local da barbearia (usando o timezone dinâmico)
  -- ----------------------------------------------------------
  v_local_date := (v_start AT TIME ZONE v_tz)::date;
  v_local_time := (v_start AT TIME ZONE v_tz)::time;

  v_day_key := 
    CASE extract(isodow FROM v_local_date)
      WHEN 1 THEN 'mon'
      WHEN 2 THEN 'tue'
      WHEN 3 THEN 'wed'
      WHEN 4 THEN 'thu'
      WHEN 5 THEN 'fri'
      WHEN 6 THEN 'sat'
      WHEN 7 THEN 'sun'
    END;

  SELECT opening_hours -> v_day_key
  INTO v_day_config
  FROM public.profiles
  WHERE id = v_user_id;

  IF v_day_config IS NULL 
     OR COALESCE((v_day_config ->> 'active')::boolean, false) IS NOT TRUE THEN
    RAISE EXCEPTION 'BARBERSHOP_CLOSED';
  END IF;

  v_open_time := (v_day_config ->> 'open')::time;
  v_close_time := (v_day_config ->> 'close')::time;

  IF v_open_time IS NULL OR v_close_time IS NULL THEN
    RAISE EXCEPTION 'INVALID_OPENING_HOURS';
  END IF;

  IF v_local_time < v_open_time 
     OR (v_end AT TIME ZONE v_tz)::time > v_close_time THEN
    RAISE EXCEPTION 'OUTSIDE_OPENING_HOURS';
  END IF;

  -- ----------------------------------------------------------
  -- Impede conflito com agendamentos existentes
  -- ----------------------------------------------------------
  SELECT EXISTS (
    SELECT 1 
    FROM public.appointments a
    WHERE a.user_id = v_user_id
      AND a.status NOT IN ('cancelled', 'no_show')
      AND a.start_time < v_end
      AND a.end_time > v_start
  )
  INTO v_existing;

  IF v_existing THEN
    RAISE EXCEPTION 'TIME_ALREADY_BOOKED';
  END IF;

  -- ----------------------------------------------------------
  -- Impede conflito com bloqueios (pausas, horários indisponíveis)
  -- ----------------------------------------------------------
  SELECT EXISTS (
    SELECT 1 
    FROM public.schedule_blocks sb
    WHERE sb.user_id = v_user_id
      AND sb.start_time < v_end
      AND sb.end_time > v_start
  )
  INTO v_blocked;

  IF v_blocked THEN
    RAISE EXCEPTION 'TIME_BLOCKED';
  END IF;

  -- ----------------------------------------------------------
  -- Criação do Agendamento
  -- ----------------------------------------------------------
  INSERT INTO public.appointments (
    user_id,
    service_id,
    customer_name,
    customer_phone,
    start_time,
    end_time,
    status
  )
  VALUES (
    v_user_id,
    v_service.id,
    trim(p_customer_name),
    trim(p_customer_phone),
    v_start,
    v_end,
    'scheduled'
  )
  RETURNING id INTO v_appointment_id;

  RETURN jsonb_build_object(
    'appointment_id', v_appointment_id,
    'service_id', v_service.id,
    'service_name', v_service.name,
    'start_time', v_start,
    'end_time', v_end
  );
END;
$$;


-- ============================================================
-- 4. PERMISSÕES E SEGURANÇA
-- ============================================================

-- Revogação total para limpar permissões padrões
REVOKE ALL ON FUNCTION public.get_public_booking_data(text) FROM PUBLIC, authenticated, anon;
REVOKE ALL ON FUNCTION public.get_public_booking_busy_slots(text, date) FROM PUBLIC, authenticated, anon;
REVOKE ALL ON FUNCTION public.create_public_booking(text, uuid, timestamptz, text, text) FROM PUBLIC, authenticated, anon;

-- Acesso concedido EXCLUSIVAMENTE ao role anon (acesso sem autenticação do front-end)
GRANT EXECUTE ON FUNCTION public.get_public_booking_data(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_booking_busy_slots(text, date) TO anon;
GRANT EXECUTE ON FUNCTION public.create_public_booking(text, uuid, timestamptz, text, text) TO anon;