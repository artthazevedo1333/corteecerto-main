-- Fix function search path
ALTER FUNCTION public.generate_slug(text) SET search_path = public;

-- Profiles Security Hardening
DROP POLICY IF EXISTS "Anyone can read profile by slug" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can manage their own profiles" ON public.profiles;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Services Security Hardening
DROP POLICY IF EXISTS "Anyone can read services" ON public.services;
DROP POLICY IF EXISTS "Users can manage their own services" ON public.services;

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own services" 
ON public.services FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Appointments Security Hardening
DROP POLICY IF EXISTS "Anyone can create appointment" ON public.appointments;
DROP POLICY IF EXISTS "Users can manage their own appointments" ON public.appointments;

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own appointments" 
ON public.appointments FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Verify and reinforce other tables
-- Clients
DROP POLICY IF EXISTS "Users can manage their own clients" ON public.clients;
CREATE POLICY "Users can manage their own clients" 
ON public.clients FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Financial Records
DROP POLICY IF EXISTS "Users can manage their own financial records" ON public.financial_records;
CREATE POLICY "Users can manage their own financial records" 
ON public.financial_records FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Products
DROP POLICY IF EXISTS "Users can manage their own products" ON public.products;
CREATE POLICY "Users can manage their own products" 
ON public.products FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- VIP Plans
DROP POLICY IF EXISTS "Users can manage their own VIP plans" ON public.vip_plans;
CREATE POLICY "Users can manage their own VIP plans" 
ON public.vip_plans FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Customer Memberships
DROP POLICY IF EXISTS "Users can manage their customers' memberships" ON public.customer_memberships;
CREATE POLICY "Users can manage their customers' memberships" 
ON public.customer_memberships FOR ALL 
USING (EXISTS (
    SELECT 1 FROM public.clients 
    WHERE clients.id = customer_memberships.client_id 
    AND clients.user_id = auth.uid()
))
WITH CHECK (EXISTS (
    SELECT 1 FROM public.clients 
    WHERE clients.id = customer_memberships.client_id 
    AND clients.user_id = auth.uid()
));

-- Ensure Grants are set (Supabase usually handles this but good to be explicit for new/reset tables)
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
