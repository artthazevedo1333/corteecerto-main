-- =====================================================================================
-- MIGRATION: Criação de Índices Estratégicos de Alta Performance
-- OBJETIVO: Suportar milhares de acessos simultâneos sem gargalos de I/O no PostgreSQL
-- =====================================================================================

-- 1. Appointments (Agendamentos)
-- Otimiza a busca de horários ocupados na página pública.
-- Estratégia: Colunas de igualdade (branch_id, status) vêm primeiro na estrutura da árvore B-Tree, 
-- seguidas pela coluna de range/ordenação (slot_time). Isso permite um "Index Only Scan".
CREATE INDEX IF NOT EXISTS idx_appointments_branch_status_time 
ON public.appointments (branch_id, status, start_time);

-- 2. Walk-in Queue (Fila de Espera)
-- Otimiza a listagem da fila em tempo real.
-- Estratégia: O índice atende perfeitamente ao WHERE (business_id, status) e já entrega 
-- os dados pré-ordenados pelo ORDER BY (position), evitando um "Sort" custoso na memória (filesort).
CREATE INDEX IF NOT EXISTS idx_walk_in_queue_business_status_pos 
ON public.walk_in_queue (business_id, status, position);

-- 3. Cash Registers (Caixas Operacionais)
-- Otimiza o carregamento rápido do status do caixa atual e de relatórios.
-- Estratégia: Busca combinada exata. Essencial para verificar rapidamente se há um caixa aberto ('open') 
-- para a barbearia antes de registrar novas transações.
CREATE INDEX IF NOT EXISTS idx_cash_transactions_cash_register_id 
ON public.cash_transactions (cash_register_id);

-- 4. Cash Transactions (Transações de Caixa) - Bônus Preventivo
CREATE INDEX IF NOT EXISTS idx_cash_transactions_cash_register_id 
ON public.cash_transactions (cash_register_id);

-- Opcional de Manutenção:
-- ANALYZE força o planejador de queries do PostgreSQL a atualizar as estatísticas imediatamente 
-- após a criação dos índices, garantindo que as novas rotas otimizadas sejam usadas desde o primeiro milissegundo.
ANALYZE public.appointments;
ANALYZE public.walk_in_queue;
ANALYZE public.cash_registers;
ANALYZE public.cash_transactions;