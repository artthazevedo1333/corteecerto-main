DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'webhook_events'
      AND policyname = 'Service role can manage webhook events'
  ) THEN
    CREATE POLICY "Service role can manage webhook events"
    ON public.webhook_events
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;