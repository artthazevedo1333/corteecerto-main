-- 1. Alteração na tabela de Agendamentos
ALTER TABLE public.appointments
  ADD COLUMN upfront_payment_required BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN upfront_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  ADD COLUMN upfront_paid BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN payment_intent_id TEXT;

-- 2. Criação da tabela de Configurações de No-Show
CREATE TABLE public.no_show_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  deposit_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  cancellation_window_hours INTEGER NOT NULL DEFAULT 0,
  refund_policy_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Habilitando RLS na nova tabela
ALTER TABLE public.no_show_policies ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de RLS estritas

-- O Dono da barbearia gerencia (CRUD) a sua própria política de No-Show
CREATE POLICY "Donos gerenciam sua propria politica de no-show"
  ON public.no_show_policies
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- O cliente público (anon) e usuários logados conseguem ler a política
CREATE POLICY "Publico pode ler as politicas de no-show"
  ON public.no_show_policies
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. Trigger para atualização automática da coluna updated_at
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_no_show_policies_updated_at
  BEFORE UPDATE ON public.no_show_policies
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();