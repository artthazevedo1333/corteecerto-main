-- Migration: Criação do Módulo de Retenção e Marketing (Cupons e Fidelidade)

-- 1. Criação da tabela de Cupons (coupons)
CREATE TABLE public.coupons (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    code text NOT NULL,
    discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value numeric(10,2) NOT NULL CHECK (discount_value > 0),
    usage_limit integer, -- Nulo significa uso ilimitado
    used_count integer NOT NULL DEFAULT 0 CHECK (used_count >= 0),
    expires_at timestamptz,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    -- Garante que o código do cupom seja único por barbearia
    CONSTRAINT unique_coupon_per_business UNIQUE (business_id, code)
);

-- 2. Criação da tabela de Cartão Fidelidade (loyalty_cards)
CREATE TABLE public.loyalty_cards (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    client_name text NOT NULL,
    phone text NOT NULL,
    total_points integer NOT NULL DEFAULT 0 CHECK (total_points >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    -- Evita a criação de múltiplos cartões para o mesmo cliente na mesma barbearia
    CONSTRAINT unique_client_loyalty_per_business UNIQUE (business_id, phone)
);

-- 3. Criação da tabela de Histórico de Pontos (loyalty_transactions)
CREATE TABLE public.loyalty_transactions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    loyalty_card_id uuid NOT NULL REFERENCES public.loyalty_cards(id) ON DELETE CASCADE,
    points integer NOT NULL CHECK (points > 0),
    transaction_type text NOT NULL CHECK (transaction_type IN ('earn', 'redeem')),
    description text,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Função e Trigger para atualizar o 'updated_at' na loyalty_cards
CREATE OR REPLACE FUNCTION update_loyalty_cards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_loyalty_cards_updated_at
BEFORE UPDATE ON public.loyalty_cards
FOR EACH ROW
EXECUTE FUNCTION update_loyalty_cards_updated_at();

-- 5. Habilitar Row Level Security (RLS)
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de RLS para Cupons (coupons)

-- Dono da barbearia tem controle total sobre seus próprios cupons
CREATE POLICY "business_owner_all_coupons" 
ON public.coupons 
FOR ALL 
USING (business_id = auth.uid());

-- Cliente público consegue apenas ler cupons que estão ativos e não expirados daquela barbearia
CREATE POLICY "public_read_active_coupons" 
ON public.coupons 
FOR SELECT 
USING (
    active = true 
    AND (expires_at IS NULL OR expires_at > now())
    AND (usage_limit IS NULL OR used_count < usage_limit)
);

-- 7. Políticas de RLS para Cartão Fidelidade (loyalty_cards)

-- Apenas o dono da barbearia pode gerenciar os cartões de fidelidade
CREATE POLICY "business_owner_all_loyalty_cards" 
ON public.loyalty_cards 
FOR ALL 
USING (business_id = auth.uid());

-- 8. Políticas de RLS para Histórico de Pontos (loyalty_transactions)

-- Apenas o dono da barbearia pode inserir/ver transações dos cartões de sua barbearia
CREATE POLICY "business_owner_all_loyalty_transactions" 
ON public.loyalty_transactions 
FOR ALL 
USING (
    loyalty_card_id IN (
        SELECT id FROM public.loyalty_cards WHERE business_id = auth.uid()
    )
);

-- 9. Índices de performance para buscas frequentes
CREATE INDEX idx_coupons_business_code ON public.coupons(business_id, code);
CREATE INDEX idx_loyalty_cards_business_phone ON public.loyalty_cards(business_id, phone);
CREATE INDEX idx_loyalty_transactions_card_id ON public.loyalty_transactions(loyalty_card_id);