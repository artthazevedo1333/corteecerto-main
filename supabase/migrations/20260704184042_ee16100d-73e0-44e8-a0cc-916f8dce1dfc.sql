-- Restrict public exposure of schedule_blocks (was leaking title/notes to anon).
DROP POLICY IF EXISTS "Public can view schedule blocks for booking" ON public.schedule_blocks;

-- Public availability view: only the fields needed for the booking calendar.
CREATE OR REPLACE VIEW public.schedule_blocks_public
WITH (security_invoker = on) AS
  SELECT user_id, start_time, end_time
  FROM public.schedule_blocks;

GRANT SELECT ON public.schedule_blocks_public TO anon, authenticated;

-- Base table needs an anon SELECT policy so the security_invoker view can read rows
-- while still hiding the sensitive columns from direct SELECTs (only granted columns are exposed).
-- We keep only user_id/start_time/end_time reachable via the view — direct table access from anon
-- is not granted (no GRANT SELECT on the table to anon), so anon cannot read title/notes directly.
REVOKE SELECT ON public.schedule_blocks FROM anon;

-- Allow the view (running as the querying role via security_invoker) to read rows for anon.
CREATE POLICY "Anon reads via availability view only"
  ON public.schedule_blocks FOR SELECT
  TO anon
  USING (true);

-- Note: anon has no column-level SELECT on schedule_blocks, so this policy only
-- takes effect through the view (which projects only safe columns).