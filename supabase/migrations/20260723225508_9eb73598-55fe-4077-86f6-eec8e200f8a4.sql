
-- 1) Consolidate user_roles policies (prevent admin -> owner escalation)
DROP POLICY IF EXISTS "Owners can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Owners can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Owners can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;

CREATE POLICY "Owners manage all roles - insert"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'owner'::public.app_role));

CREATE POLICY "Owners manage all roles - update"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'owner'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'owner'::public.app_role));

CREATE POLICY "Owners manage all roles - delete"
ON public.user_roles FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'owner'::public.app_role));

-- Admins can manage only non-owner roles (admin, support). Never owner.
CREATE POLICY "Admins manage non-owner roles - insert"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  AND role <> 'owner'::public.app_role
);

CREATE POLICY "Admins manage non-owner roles - update"
ON public.user_roles FOR UPDATE TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  AND role <> 'owner'::public.app_role
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  AND role <> 'owner'::public.app_role
);

CREATE POLICY "Admins manage non-owner roles - delete"
ON public.user_roles FOR DELETE TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  AND role <> 'owner'::public.app_role
);

-- 2) webhook_events: allow admins/owners read access for debugging
CREATE POLICY "Admins and owners can view webhook events"
ON public.webhook_events FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  OR public.has_role(auth.uid(), 'owner'::public.app_role)
);
