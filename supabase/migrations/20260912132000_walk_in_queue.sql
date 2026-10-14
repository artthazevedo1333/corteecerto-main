-- Migration: Create Walk-in Queue (Fila de Espera Walk-ins)
-- Author: DBA Sênior

CREATE TABLE IF NOT EXISTS public.walk_in_queue (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    client_name text NOT NULL,
    phone text,
    status text NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'in_service', 'completed', 'canceled')),
    position integer,
    estimated_wait_minutes integer,
    barber_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Índices para otimização de consultas da fila (Performance)
CREATE INDEX IF NOT EXISTS idx_walk_in_queue_business_id ON public.walk_in_queue(business_id);
CREATE INDEX IF NOT EXISTS idx_walk_in_queue_barber_id ON public.walk_in_queue(barber_id);
CREATE INDEX IF NOT EXISTS idx_walk_in_queue_status ON public.walk_in_queue(status);
CREATE INDEX IF NOT EXISTS idx_walk_in_queue_position ON public.walk_in_queue(position) WHERE status = 'waiting';

-- Trigger para atualização automática do campo updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_walk_in_queue_updated_at ON public.walk_in_queue;
CREATE TRIGGER set_walk_in_queue_updated_at
    BEFORE UPDATE ON public.walk_in_queue
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.walk_in_queue ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS: Acesso restrito ao ecossistema da barbearia (Dono e Barbeiros)
-- Assumindo que public.profiles relaciona o auth.uid() com o business_id

CREATE POLICY "Colaboradores podem visualizar a fila da sua barbearia"
    ON public.walk_in_queue
    FOR SELECT
    TO authenticated
    USING (
        business_id IN (
            SELECT business_id FROM public.profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Colaboradores podem adicionar clientes na fila da sua barbearia"
    ON public.walk_in_queue
    FOR INSERT
    TO authenticated
    WITH CHECK (
        business_id IN (
            SELECT business_id FROM public.profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Colaboradores podem atualizar a fila da sua barbearia"
    ON public.walk_in_queue
    FOR UPDATE
    TO authenticated
    USING (
        business_id IN (
            SELECT business_id FROM public.profiles WHERE id = auth.uid()
        )
    )
    WITH CHECK (
        business_id IN (
            SELECT business_id FROM public.profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Colaboradores podem remover clientes da fila da sua barbearia"
    ON public.walk_in_queue
    FOR DELETE
    TO authenticated
    USING (
        business_id IN (
            SELECT business_id FROM public.profiles WHERE id = auth.uid()
        )
    );