REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user_subscription() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.suspend_overdue_subscriptions() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.expire_overdue_trials() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.apply_payment_confirmed(uuid, subscription_plan, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.apply_payment_failed(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.cancel_user_subscription(uuid) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.suspend_overdue_subscriptions() TO service_role;
GRANT EXECUTE ON FUNCTION public.expire_overdue_trials() TO service_role;
GRANT EXECUTE ON FUNCTION public.apply_payment_confirmed(uuid, subscription_plan, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.apply_payment_failed(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.cancel_user_subscription(uuid) TO service_role;