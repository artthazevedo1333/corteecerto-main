ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS monthly_goal NUMERIC DEFAULT 0;
COMMENT ON COLUMN public.profiles.monthly_goal IS 'Meta financeira mensal do barbeiro';