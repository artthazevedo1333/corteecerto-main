-- 1. Função: calculate_required_deposit
-- Calcula o valor do sinal baseado no preço do serviço e na política de no-show
CREATE OR REPLACE FUNCTION public.calculate_required_deposit(
  p_business_id uuid,
  p_service_id uuid
)
RETURNS DECIMAL(10,2) AS $$
DECLARE
  v_service_price DECIMAL(10,2);
  v_deposit_percentage DECIMAL(5,2);
  v_required_amount DECIMAL(10,2);
BEGIN
  -- Busca o preço do serviço (assumindo que a tabela se chama 'services' e a coluna 'price')
  SELECT price INTO v_service_price
  FROM public.services
  WHERE id = p_service_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Serviço não encontrado.';
  END IF;

  -- Busca a porcentagem de sinal configurada pelo barbeiro/dono da barbearia
  SELECT deposit_percentage INTO v_deposit_percentage
  FROM public.no_show_policies
  WHERE user_id = p_business_id;

  -- Se não existir política, consideramos 0%
  IF NOT FOUND OR v_deposit_percentage IS NULL THEN
    v_deposit_percentage := 0.00;
  END IF;

  -- Calcula o valor exato do sinal
  v_required_amount := (v_service_price * v_deposit_percentage) / 100.0;

  -- Retorna arredondado para 2 casas decimais
  RETURN ROUND(v_required_amount, 2);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 2. Função: validate_cancellation_refund
-- Verifica se o cancelamento está sendo feito dentro da janela permitida para reembolso
CREATE OR REPLACE FUNCTION public.validate_cancellation_refund(
  p_appointment_id uuid
)
RETURNS BOOLEAN AS $$
DECLARE
  v_appointment_time TIMESTAMP WITH TIME ZONE;
  v_business_id UUID;
  v_cancellation_window_hours INTEGER;
  v_limit_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Busca a data do agendamento e o ID do dono da barbearia
  -- Substitua 'scheduled_at' e 'business_id' pelos nomes reais das colunas na sua tabela 'appointments'
  SELECT scheduled_at, business_id INTO v_appointment_time, v_business_id
  FROM public.appointments
  WHERE id = p_appointment_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Agendamento não encontrado.';
  END IF;

  -- Busca a janela de tolerância para cancelamento
  SELECT cancellation_window_hours INTO v_cancellation_window_hours
  FROM public.no_show_policies
  WHERE user_id = v_business_id;

  -- Se não existir política ou a janela for 0, o cliente sempre tem direito a reembolso
  IF NOT FOUND OR v_cancellation_window_hours IS NULL OR v_cancellation_window_hours = 0 THEN
    RETURN true;
  END IF;

  -- Subtrai a janela de horas da data do agendamento para achar o limite
  v_limit_time := v_appointment_time - (v_cancellation_window_hours || ' hours')::INTERVAL;

  -- Retorna TRUE (tem reembolso) se o momento do cancelamento for anterior ou igual ao limite
  -- Retorna FALSE (retém o sinal) se passou do limite
  IF now() <= v_limit_time THEN
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;