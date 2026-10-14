-- Migration: Create RPC functions for Branch Management (Multi-Unit)

-- 1. Função para listar todas as filiais ativas da barbearia de um determinado dono
CREATE OR REPLACE FUNCTION public.get_business_branches(p_business_id uuid)
RETURNS SETOF public.branches
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
    -- O SECURITY INVOKER garante que as políticas RLS já criadas sejam respeitadas.
    -- Retorna as filiais que pertencem ao dono (business_id) e que estão ativas.
    RETURN QUERY
    SELECT *
    FROM public.branches
    WHERE business_id = p_business_id
      AND active = true
    ORDER BY created_at ASC;
END;
$$;


-- 2. Função para o dono cadastrar uma nova unidade de forma segura
CREATE OR REPLACE FUNCTION public.create_new_branch(
  p_name text,
  p_address text,
  p_phone text
)
RETURNS public.branches
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    v_owner_id uuid;
    v_new_branch public.branches;
BEGIN
    -- Captura o ID do usuário autenticado no momento (dono da barbearia)
    v_owner_id := auth.uid();

    -- Validação de segurança para garantir que a requisição partiu de um usuário logado
    IF v_owner_id IS NULL THEN
        RAISE EXCEPTION 'Acesso negado: Usuário não autenticado.';
    END IF;

    -- Realiza o insert forçando o business_id a ser o ID do usuário autenticado,
    -- o que previne que alguém crie uma filial em nome de outro dono (exploração de payload).
    INSERT INTO public.branches (business_id, name, address, phone, active)
    VALUES (v_owner_id, p_name, p_address, p_phone, true)
    RETURNING * INTO v_new_branch;

    RETURN v_new_branch;
END;
$$;