
-- Enum para status de pagamento
DO $$ BEGIN
  CREATE TYPE public.payment_status AS ENUM ('pending','confirmed','failed','refunded','cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- billing_history
CREATE TABLE IF NOT EXISTS public.billing_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  amount_cents integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'BRL',
  status public.payment_status NOT NULL DEFAULT 'pending',
  gateway text NOT NULL,
  external_id text,
  paid_at timestamptz,
  receipt_url text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.billing_history TO authenticated;
GRANT ALL ON public.billing_history TO service_role;
ALTER TABLE public.billing_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own billing" ON public.billing_history;
CREATE POLICY "Users view own billing" ON public.billing_history
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins manage billing" ON public.billing_history;
CREATE POLICY "Admins manage billing" ON public.billing_history
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS update_billing_history_updated_at ON public.billing_history;
CREATE TRIGGER update_billing_history_updated_at
  BEFORE UPDATE ON public.billing_history
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_billing_history_user ON public.billing_history(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_billing_history_external ON public.billing_history(gateway, external_id);

-- webhook_events (idempotência + auditoria)
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gateway text NOT NULL,
  event_type text NOT NULL,
  external_event_id text,
  payload jsonb NOT NULL,
  processed_at timestamptz,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (gateway, external_event_id)
);

GRANT ALL ON public.webhook_events TO service_role;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
-- Sem policy para authenticated: só service_role.

CREATE INDEX IF NOT EXISTS idx_webhook_events_gateway ON public.webhook_events(gateway, created_at DESC);

-- Aplica pagamento confirmado: ativa/renova assinatura
CREATE OR REPLACE FUNCTION public.apply_payment_confirmed(
  _user_id uuid,
  _plan public.subscription_plan DEFAULT NULL,
  _period_days integer DEFAULT 30
)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _now timestamptz := now();
BEGIN
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
$$;
REVOKE EXECUTE ON FUNCTION public.apply_payment_confirmed(uuid, public.subscription_plan, integer) FROM PUBLIC, anon, authenticated;

-- Marca pagamento falhado -> overdue + grace period 3d
CREATE OR REPLACE FUNCTION public.apply_payment_failed(_user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.subscriptions
  SET
    status = 'overdue',
    grace_period_until = COALESCE(grace_period_until, now() + interval '3 days')
  WHERE user_id = _user_id
    AND status <> 'cancelled';
END;
$$;
REVOKE EXECUTE ON FUNCTION public.apply_payment_failed(uuid) FROM PUBLIC, anon, authenticated;

-- Cancela assinatura
CREATE OR REPLACE FUNCTION public.cancel_user_subscription(_user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.subscriptions
  SET status = 'cancelled', grace_period_until = NULL
  WHERE user_id = _user_id;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.cancel_user_subscription(uuid) FROM PUBLIC, anon, authenticated;

-- Após grace period, muda overdue -> suspended
CREATE OR REPLACE FUNCTION public.suspend_overdue_subscriptions()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.subscriptions
  SET status = 'suspended'
  WHERE status = 'overdue'
    AND grace_period_until IS NOT NULL
    AND grace_period_until < now();
END;
$$;
REVOKE EXECUTE ON FUNCTION public.suspend_overdue_subscriptions() FROM PUBLIC, anon, authenticated;
