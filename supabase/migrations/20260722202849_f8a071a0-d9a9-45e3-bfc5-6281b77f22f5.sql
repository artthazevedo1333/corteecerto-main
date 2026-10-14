
-- =========================================================================
-- B) payment_gateway_errors
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.payment_gateway_errors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  gateway TEXT NOT NULL,
  operation TEXT NOT NULL,
  message TEXT NOT NULL,
  external_id TEXT NULL,
  http_status INT NULL,
  payload JSONB NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.payment_gateway_errors TO authenticated;
GRANT ALL ON public.payment_gateway_errors TO service_role;

ALTER TABLE public.payment_gateway_errors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view gateway errors" ON public.payment_gateway_errors;
CREATE POLICY "Admins can view gateway errors"
  ON public.payment_gateway_errors
  FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'owner'::public.app_role)
  );

CREATE INDEX IF NOT EXISTS idx_pge_created_at ON public.payment_gateway_errors (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pge_gateway ON public.payment_gateway_errors (gateway, created_at DESC);

-- =========================================================================
-- C) Advisory locks nas funções de assinatura
-- =========================================================================
CREATE OR REPLACE FUNCTION public.apply_payment_confirmed(_user_id uuid, _plan subscription_plan DEFAULT NULL::subscription_plan, _period_days integer DEFAULT 30)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _now timestamptz := now();
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('subscription:' || _user_id::text));
  UPDATE public.subscriptions
  SET
    status = 'active',
    plan = COALESCE(_plan, plan),
    current_period_start = _now,
    current_period_end = _now + make_interval(days => _period_days),
    grace_period_until = NULL,
    trial_ends_at = NULL
  WHERE user_id = _user_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.apply_payment_failed(_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('subscription:' || _user_id::text));
  UPDATE public.subscriptions
  SET
    status = 'overdue',
    grace_period_until = COALESCE(grace_period_until, now() + interval '3 days')
  WHERE user_id = _user_id
    AND status <> 'cancelled';
END;
$function$;

CREATE OR REPLACE FUNCTION public.cancel_user_subscription(_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('subscription:' || _user_id::text));
  UPDATE public.subscriptions
  SET status = 'cancelled', grace_period_until = NULL
  WHERE user_id = _user_id;
END;
$function$;

-- =========================================================================
-- A) change_plan_after_payment: troca de plano só efetiva com webhook OK
-- =========================================================================
CREATE OR REPLACE FUNCTION public.change_plan_after_payment(
  _user_id uuid,
  _new_plan subscription_plan,
  _period_days integer DEFAULT 30
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _now timestamptz := now();
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('subscription:' || _user_id::text));
  UPDATE public.subscriptions
  SET
    status = 'active',
    plan = _new_plan,
    current_period_start = _now,
    current_period_end = _now + make_interval(days => _period_days),
    grace_period_until = NULL,
    trial_ends_at = NULL
  WHERE user_id = _user_id;
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.change_plan_after_payment(uuid, subscription_plan, integer) FROM PUBLIC, anon, authenticated;

-- =========================================================================
-- E) Índices compostos
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_appointments_user_start ON public.appointments (user_id, start_time);
CREATE INDEX IF NOT EXISTS idx_clients_user_name ON public.clients (user_id, name);
CREATE INDEX IF NOT EXISTS idx_financial_records_user_date ON public.financial_records (user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_services_user_active ON public.services (user_id, active);
CREATE INDEX IF NOT EXISTS idx_billing_history_user_created ON public.billing_history (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions (status);
