-- Fully lock down the base table for anon; only authenticated owner can read/write.
DROP POLICY IF EXISTS "Anon reads via availability view only" ON public.schedule_blocks;

-- Recreate the public view as SECURITY DEFINER (default) so anon can read
-- only the safe columns without any policy on the base table.
DROP VIEW IF EXISTS public.schedule_blocks_public;
CREATE VIEW public.schedule_blocks_public AS
  SELECT user_id, start_time, end_time
  FROM public.schedule_blocks;

GRANT SELECT ON public.schedule_blocks_public TO anon, authenticated;

-- Belt-and-braces: ensure anon has no direct column access on the base table.
REVOKE ALL ON public.schedule_blocks FROM anon;