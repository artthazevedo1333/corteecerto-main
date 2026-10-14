REVOKE EXECUTE ON FUNCTION public.apply_payment_confirmed(uuid, subscription_plan, integer) FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.apply_payment_failed(uuid) FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.cancel_user_subscription(uuid) FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.suspend_overdue_subscriptions() FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.expire_overdue_trials() FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_subscription() FROM authenticated, anon, public;