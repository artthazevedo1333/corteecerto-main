-- ==============================================================================
-- Migration: Auditoria de Segurança e Blindagem de RPCs (Caixa e Filiais)
-- Ações: 
-- 1. Revogação de permissões PUBLIC (Restrição de Execução)
-- 2. Concessão estrita para role 'authenticated'
-- 3. Prevenção de Search Path Hijacking (Injeção de Schema)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- PASSO 1: Configuração do search_path para evitar injeção de schema
-- ------------------------------------------------------------------------------
ALTER FUNCTION public.open_cash_register(UUID, NUMERIC, UUID) SET search_path = public;

ALTER FUNCTION public.close_cash_register(UUID, NUMERIC, UUID) SET search_path = public;

ALTER FUNCTION public.process_split_payment(UUID, UUID, UUID, JSONB, JSONB) SET search_path = public;

-- Obs: Como a assinatura exata não foi fornecida no contexto, referenciamos pelo nome 
-- (válido no PostgreSQL contanto que a função não sofra overload/sobrecarga de parâmetros).
ALTER FUNCTION public.create_new_branch SET search_path = public;


-- ------------------------------------------------------------------------------
-- PASSO 2: Revogação de acesso de execução para a role PUBLIC (Internet/Anônimos)
-- ------------------------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.open_cash_register(UUID, NUMERIC, UUID) FROM PUBLIC;

REVOKE EXECUTE ON FUNCTION public.close_cash_register(UUID, NUMERIC, UUID) FROM PUBLIC;

REVOKE EXECUTE ON FUNCTION public.process_split_payment(UUID, UUID, UUID, JSONB, JSONB) FROM PUBLIC;

REVOKE EXECUTE ON FUNCTION public.create_new_branch FROM PUBLIC;


-- ------------------------------------------------------------------------------
-- PASSO 3: Concessão de execução EXCLUSIVA para usuários autenticados no sistema
-- ------------------------------------------------------------------------------
GRANT EXECUTE ON FUNCTION public.open_cash_register(UUID, NUMERIC, UUID) TO authenticated;

GRANT EXECUTE ON FUNCTION public.close_cash_register(UUID, NUMERIC, UUID) TO authenticated;

GRANT EXECUTE ON FUNCTION public.process_split_payment(UUID, UUID, UUID, JSONB, JSONB) TO authenticated;

GRANT EXECUTE ON FUNCTION public.create_new_branch TO authenticated;