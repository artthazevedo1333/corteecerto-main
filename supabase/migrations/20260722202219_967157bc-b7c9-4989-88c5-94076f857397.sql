-- Habilita pg_cron e agenda expiração de trials e suspensão de inadimplentes.
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

-- Remove agendamentos antigos (idempotente)
DO $$
BEGIN
  PERFORM cron.unschedule('cc-expire-overdue-trials');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  PERFORM cron.unschedule('cc-suspend-overdue-subscriptions');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Roda a cada hora
SELECT cron.schedule(
  'cc-expire-overdue-trials',
  '0 * * * *',
  $$SELECT public.expire_overdue_trials();$$
);

SELECT cron.schedule(
  'cc-suspend-overdue-subscriptions',
  '15 * * * *',
  $$SELECT public.suspend_overdue_subscriptions();$$
);