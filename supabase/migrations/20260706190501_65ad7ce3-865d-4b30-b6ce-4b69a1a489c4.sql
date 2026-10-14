-- Remove exposição pública de detalhes dos blocos de agenda (títulos, notas).
-- Acesso anônimo à disponibilidade, se necessário, deve ser feito via server function
-- retornando apenas start/end de forma agregada.
DROP POLICY IF EXISTS "Anon reads availability only" ON public.schedule_blocks;
REVOKE SELECT ON public.schedule_blocks FROM anon;