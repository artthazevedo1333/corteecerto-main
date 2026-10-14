-- Add slug to profiles for public URLs
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Function to generate a slug from barbearia name
CREATE OR REPLACE FUNCTION public.generate_slug(name TEXT) RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Add status to appointments
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
    CREATE TYPE appointment_status AS ENUM ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');
  END IF;
END $$;

ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS status appointment_status DEFAULT 'scheduled';
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS customer_phone TEXT;

-- Enable RLS and Grant permissions for existing tables if not already done
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT ON public.appointments TO anon;

-- Policy for anon to read profiles by slug
CREATE POLICY "Anyone can read profile by slug" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Anyone can read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Anyone can create appointment" ON public.appointments FOR INSERT WITH CHECK (true);
