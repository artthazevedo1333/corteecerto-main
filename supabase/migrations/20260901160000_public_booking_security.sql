-- ============================================================
-- CORTE CERTO
-- PUBLIC BOOKING SECURITY
-- FASE 2 — CAMADA PÚBLICA CONTROLADA
-- ============================================================

-- ============================================================
-- 1. FUNÇÃO PÚBLICA PARA CARREGAR A BARBEARIA
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_public_booking_data(
  _slug TEXT
)
RETURNS TABLE (
  user_id UUID,
  slug TEXT,
  barber_shop_name TEXT,
  full_name TEXT,
  avatar_url TEXT,
  business_address TEXT,
  business_city TEXT,
  business_state TEXT,
  business_phone TEXT,
  business_whatsapp TEXT,
  business_instagram TEXT,
  opening_hours JSONB
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id,
    p.slug,
    p.barber_shop_name,
    p.full_name,
    p.avatar_url,
    p.business_address,
    p.business_city,
    p.business_state,
    p.business_phone,
    p.business_whatsapp,
    p.business_instagram,
    p.opening_hours
  FROM public.profiles p
  WHERE p.slug = _slug
  LIMIT 1;
$$;

REVOKE ALL
ON FUNCTION public.get_public_booking_data(TEXT)
FROM PUBLIC;

GRANT EXECUTE
ON FUNCTION public.get_public_booking_data(TEXT)
TO anon, authenticated;


-- ============================================================
-- 2. FUNÇÃO PÚBLICA PARA SERVIÇOS
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_public_booking_services(
  _user_id UUID
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  price NUMERIC,
  duration_minutes INTEGER,
  color TEXT,
  active BOOLEAN
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    s.id,
    s.name,
    s.description,
    s.price,
    s.duration_minutes,
    s.color,
    s.active
  FROM public.services s
  WHERE s.user_id = _user_id
    AND s.active = true
  ORDER BY s.name;
$$;

REVOKE ALL
ON FUNCTION public.get_public_booking_services(UUID)
FROM PUBLIC;

GRANT EXECUTE
ON FUNCTION public.get_public_booking_services(UUID)
TO anon, authenticated;


-- ============================================================
-- 3. FUNÇÃO PÚBLICA PARA DISPONIBILIDADE
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_public_booking_blocks(
  _user_id UUID
)
RETURNS TABLE (
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    sb.start_time,
    sb.end_time
  FROM public.schedule_blocks sb
  WHERE sb.user_id = _user_id
    AND sb.end_time >= now()
  ORDER BY sb.start_time;
$$;

REVOKE ALL
ON FUNCTION public.get_public_booking_blocks(UUID)
FROM PUBLIC;

GRANT EXECUTE
ON FUNCTION public.get_public_booking_blocks(UUID)
TO anon, authenticated;


-- ============================================================
-- 4. FUNÇÃO PÚBLICA PARA CRIAR AGENDAMENTO
-- ============================================================

CREATE OR REPLACE FUNCTION public.create_public_booking(
  _user_id UUID,
  _service_id UUID,
  _start_time TIMESTAMPTZ,
  _customer_name TEXT,
  _customer_phone TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _appointment_id UUID;
  _duration INTEGER;
  _end_time TIMESTAMPTZ;
BEGIN

  -- ----------------------------------------------------------
  -- Validações básicas
  -- ----------------------------------------------------------

  IF _customer_name IS NULL
     OR length(trim(_customer_name)) < 2 THEN
    RAISE EXCEPTION 'Nome inválido';
  END IF;

  IF _customer_phone IS NULL
     OR length(trim(_customer_phone)) < 8 THEN
    RAISE EXCEPTION 'Telefone inválido';
  END IF;

  IF _start_time <= now() THEN
    RAISE EXCEPTION 'Horário inválido';
  END IF;


  -- ----------------------------------------------------------
  -- Serviço precisa pertencer ao profissional
  -- ----------------------------------------------------------

  SELECT s.duration_minutes
  INTO _duration
  FROM public.services s
  WHERE s.id = _service_id
    AND s.user_id = _user_id
    AND s.active = true;

  IF _duration IS NULL THEN
    RAISE EXCEPTION 'Serviço inválido';
  END IF;


  _end_time :=
    _start_time + make_interval(mins => _duration);


  -- ----------------------------------------------------------
  -- Impede agendamento em horário bloqueado
  -- ----------------------------------------------------------

  IF EXISTS (
    SELECT 1
    FROM public.schedule_blocks sb
    WHERE sb.user_id = _user_id
      AND _start_time < sb.end_time
      AND _end_time > sb.start_time
  ) THEN
    RAISE EXCEPTION 'Horário indisponível';
  END IF;


  -- ----------------------------------------------------------
  -- Impede conflito com outro agendamento
  -- ----------------------------------------------------------

  IF EXISTS (
    SELECT 1
    FROM public.appointments a
    WHERE a.user_id = _user_id
      AND a.status <> 'cancelled'
      AND _start_time < a.end_time
      AND _end_time > a.start_time
  ) THEN
    RAISE EXCEPTION 'Horário já reservado';
  END IF;


  -- ----------------------------------------------------------
  -- Cria o agendamento
  -- ----------------------------------------------------------

  INSERT INTO public.appointments (
    user_id,
    service_id,
    start_time,
    end_time,
    status,
    customer_name,
    customer_phone
  )
  VALUES (
    _user_id,
    _service_id,
    _start_time,
    _end_time,
    'scheduled',
    trim(_customer_name),
    trim(_customer_phone)
  )
  RETURNING id INTO _appointment_id;


  RETURN _appointment_id;

END;
$$;


-- ============================================================
-- 5. SOMENTE A RPC PODE CRIAR AGENDAMENTOS ANÔNIMOS
-- ============================================================

REVOKE INSERT
ON public.appointments
FROM anon;

REVOKE SELECT
ON public.appointments
FROM anon;

REVOKE UPDATE
ON public.appointments
FROM anon;

REVOKE DELETE
ON public.appointments
FROM anon;


REVOKE ALL
ON FUNCTION public.create_public_booking(
  UUID,
  UUID,
  TIMESTAMPTZ,
  TEXT,
  TEXT
)
FROM PUBLIC;

GRANT EXECUTE
ON FUNCTION public.create_public_booking(
  UUID,
  UUID,
  TIMESTAMPTZ,
  TEXT,
  TEXT
)
TO anon, authenticated;


-- ============================================================
-- 6. GARANTE QUE ANON NÃO ACESSE AS TABELAS PRIVADAS
-- ============================================================

REVOKE ALL
ON public.profiles
FROM anon;

REVOKE ALL
ON public.services
FROM anon;

REVOKE ALL
ON public.clients
FROM anon;

REVOKE ALL
ON public.appointments
FROM anon;

REVOKE ALL
ON public.subscriptions
FROM anon;


-- ============================================================
-- FIM
-- ============================================================