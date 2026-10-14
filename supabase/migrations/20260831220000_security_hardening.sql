-- ============================================================
-- CORTE CERTO — SECURITY HARDENING
-- FASE 1 — ISOLAMENTO DE DADOS PRIVADOS
-- Mantém o agendamento público funcionando
-- ============================================================


-- ============================================================
-- 1. PROFILES
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read profile by slug"
ON public.profiles;

DROP POLICY IF EXISTS "Anyone can read profiles"
ON public.profiles;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone"
ON public.profiles;

DROP POLICY IF EXISTS "Users can read own profile"
ON public.profiles;

DROP POLICY IF EXISTS "Users can update own profile"
ON public.profiles;


-- Usuário autenticado pode visualizar apenas o próprio perfil
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);


CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- ============================================================
-- 2. CLIENTS — PRIVADO
-- ============================================================

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view clients"
ON public.clients;

DROP POLICY IF EXISTS "Clients are viewable by everyone"
ON public.clients;

DROP POLICY IF EXISTS "Users can view own clients"
ON public.clients;

DROP POLICY IF EXISTS "Users can insert own clients"
ON public.clients;

DROP POLICY IF EXISTS "Users can update own clients"
ON public.clients;

DROP POLICY IF EXISTS "Users can delete own clients"
ON public.clients;


CREATE POLICY "Users can view own clients"
ON public.clients
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);


CREATE POLICY "Users can insert own clients"
ON public.clients
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);


CREATE POLICY "Users can update own clients"
ON public.clients
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);


CREATE POLICY "Users can delete own clients"
ON public.clients
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- ============================================================
-- 3. APPOINTMENTS
-- ============================================================

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create appointments"
ON public.appointments;

DROP POLICY IF EXISTS "Anyone can read appointments"
ON public.appointments;

DROP POLICY IF EXISTS "Anyone can insert appointments"
ON public.appointments;

DROP POLICY IF EXISTS "Anyone can create appointment"
ON public.appointments;

DROP POLICY IF EXISTS "Users can view own appointments"
ON public.appointments;

DROP POLICY IF EXISTS "Users can create own appointments"
ON public.appointments;

DROP POLICY IF EXISTS "Users can update own appointments"
ON public.appointments;

DROP POLICY IF EXISTS "Users can delete own appointments"
ON public.appointments;


-- Usuário autenticado administra seus próprios agendamentos
CREATE POLICY "Users can view own appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);


CREATE POLICY "Users can create own appointments"
ON public.appointments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);


CREATE POLICY "Users can update own appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);


CREATE POLICY "Users can delete own appointments"
ON public.appointments
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- ============================================================
-- 4. SERVICES
-- ============================================================

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read services"
ON public.services;

DROP POLICY IF EXISTS "Public services are viewable by everyone"
ON public.services;

DROP POLICY IF EXISTS "Users can view own services"
ON public.services;

DROP POLICY IF EXISTS "Users can insert own services"
ON public.services;

DROP POLICY IF EXISTS "Users can update own services"
ON public.services;

DROP POLICY IF EXISTS "Users can delete own services"
ON public.services;


-- Serviços continuam privados por enquanto.
-- O acesso público será tratado através de uma camada
-- pública controlada na próxima etapa.


CREATE POLICY "Users can view own services"
ON public.services
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);


CREATE POLICY "Users can insert own services"
ON public.services
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);


CREATE POLICY "Users can update own services"
ON public.services
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);


CREATE POLICY "Users can delete own services"
ON public.services
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- ============================================================
-- 5. SUBSCRIPTIONS — PRIVADO
-- ============================================================

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read subscriptions"
ON public.subscriptions;

DROP POLICY IF EXISTS "Users can view own subscription"
ON public.subscriptions;


CREATE POLICY "Users can view own subscription"
ON public.subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);


-- ============================================================
-- 6. BLOQUEAR ACESSO ANÔNIMO
-- ============================================================

REVOKE ALL
ON public.profiles
FROM anon;

REVOKE ALL
ON public.clients
FROM anon;

REVOKE ALL
ON public.appointments
FROM anon;

REVOKE ALL
ON public.services
FROM anon;

REVOKE ALL
ON public.subscriptions
FROM anon;