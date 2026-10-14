-- Migration: Create barber_shifts and barber_services tables with RLS

-- 1. Create barber_shifts table
CREATE TABLE public.barber_shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  barber_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Domingo, 6 = Sábado
  start_time TIME,
  lunch_start_time TIME,
  lunch_end_time TIME,
  end_time TIME,
  is_day_off BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(barber_id, day_of_week)
);

-- 2. Create barber_services table
CREATE TABLE public.barber_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  barber_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(barber_id, service_id)
);

-- 3. Enable RLS
ALTER TABLE public.barber_shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barber_services ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for barber_shifts

-- O dono da barbearia (owner_id) tem acesso total às escalas que ele gerencia
CREATE POLICY "Owner can manage all barber shifts"
  ON public.barber_shifts
  FOR ALL
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- O barbeiro (barber_id) só pode visualizar suas próprias escalas
CREATE POLICY "Barber can view their own shifts"
  ON public.barber_shifts
  FOR SELECT
  USING (auth.uid() = barber_id);


-- 5. RLS Policies for barber_services

-- O dono da barbearia (owner_id) tem acesso total aos serviços vinculados
CREATE POLICY "Owner can manage all barber services"
  ON public.barber_services
  FOR ALL
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- O barbeiro (barber_id) só pode visualizar os serviços em que está habilitado
CREATE POLICY "Barber can view their own services"
  ON public.barber_services
  FOR SELECT
  USING (auth.uid() = barber_id);