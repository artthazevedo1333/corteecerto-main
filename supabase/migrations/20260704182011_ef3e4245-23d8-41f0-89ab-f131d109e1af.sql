
-- Phase 1: base fields for services personalization, client profile enrichment, and schedule blocks

ALTER TABLE public.services 
  ADD COLUMN IF NOT EXISTS color text NOT NULL DEFAULT '#3b82f6',
  ADD COLUMN IF NOT EXISTS active boolean NOT NULL DEFAULT true;

ALTER TABLE public.clients 
  ADD COLUMN IF NOT EXISTS photo_url text,
  ADD COLUMN IF NOT EXISTS instagram text;

CREATE TABLE IF NOT EXISTS public.schedule_blocks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  title text NOT NULL,
  block_type text NOT NULL DEFAULT 'block', -- 'block' | 'vacation' | 'lunch'
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.schedule_blocks TO authenticated;
GRANT SELECT ON public.schedule_blocks TO anon; -- so public booking page can see blocked slots
GRANT ALL ON public.schedule_blocks TO service_role;

ALTER TABLE public.schedule_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own schedule blocks"
  ON public.schedule_blocks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view schedule blocks for booking"
  ON public.schedule_blocks
  FOR SELECT
  TO anon
  USING (true);

CREATE TRIGGER update_schedule_blocks_updated_at
  BEFORE UPDATE ON public.schedule_blocks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_schedule_blocks_user_time
  ON public.schedule_blocks(user_id, start_time, end_time);
