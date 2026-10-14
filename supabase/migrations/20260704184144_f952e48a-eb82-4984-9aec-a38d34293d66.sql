-- Recreate view with security_invoker so it uses the caller's permissions.
DROP VIEW IF EXISTS public.schedule_blocks_public;
CREATE VIEW public.schedule_blocks_public
WITH (security_invoker = on) AS
  SELECT user_id, start_time, end_time
  FROM public.schedule_blocks;

GRANT SELECT ON public.schedule_blocks_public TO anon, authenticated;

-- Grant anon SELECT ONLY on the three safe columns of the base table so the
-- security_invoker view works. Title and notes remain inaccessible to anon.
GRANT SELECT (user_id, start_time, end_time) ON public.schedule_blocks TO anon;

-- Recreate the narrow anon RLS policy (SELECT still gated by column grants above).
DROP POLICY IF EXISTS "Anon reads availability only" ON public.schedule_blocks;
CREATE POLICY "Anon reads availability only"
  ON public.schedule_blocks FOR SELECT
  TO anon
  USING (true);