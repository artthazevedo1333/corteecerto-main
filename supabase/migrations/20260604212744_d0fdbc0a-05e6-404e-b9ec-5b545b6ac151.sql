-- Add enabled_modules to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS enabled_modules JSONB DEFAULT '["agenda", "clients", "services"]'::jsonb;

-- Update products for inventory module
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS purchase_price DECIMAL(12,2) DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS selling_price DECIMAL(12,2) DEFAULT 0;

-- Create vip_plans table
CREATE TABLE IF NOT EXISTS public.vip_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    includes JSONB NOT NULL DEFAULT '[]'::jsonb,
    validity_days INTEGER NOT NULL DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.vip_plans TO authenticated;
GRANT ALL ON public.vip_plans TO service_role;
ALTER TABLE public.vip_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own VIP plans" ON public.vip_plans FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create customer_memberships table
CREATE TABLE IF NOT EXISTS public.customer_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES public.vip_plans(id) ON DELETE CASCADE,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_memberships TO authenticated;
GRANT ALL ON public.customer_memberships TO service_role;
ALTER TABLE public.customer_memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their customers' memberships" ON public.customer_memberships 
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.clients 
        WHERE public.clients.id = public.customer_memberships.client_id 
        AND public.clients.user_id = auth.uid()
    )
) WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.clients 
        WHERE public.clients.id = public.customer_memberships.client_id 
        AND public.clients.user_id = auth.uid()
    )
);

-- Helper triggers for updated_at (CREATE OR REPLACE if exists)
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_vip_plans_updated_at') THEN
        CREATE TRIGGER update_vip_plans_updated_at BEFORE UPDATE ON public.vip_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_customer_memberships_updated_at') THEN
        CREATE TRIGGER update_customer_memberships_updated_at BEFORE UPDATE ON public.customer_memberships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
