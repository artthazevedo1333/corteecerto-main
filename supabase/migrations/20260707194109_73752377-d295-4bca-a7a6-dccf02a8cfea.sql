-- Auto-assign owner role to the first user when none exists
CREATE OR REPLACE FUNCTION public.assign_first_owner()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'owner'::public.app_role) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'owner'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.assign_first_owner() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created_assign_owner ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_owner
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.assign_first_owner();

-- Backfill: if no owner exists yet but there are users, promote the oldest one.
DO $$
DECLARE
  first_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'owner'::public.app_role) THEN
    SELECT id INTO first_user_id FROM auth.users ORDER BY created_at ASC LIMIT 1;
    IF first_user_id IS NOT NULL THEN
      INSERT INTO public.user_roles (user_id, role)
      VALUES (first_user_id, 'owner'::public.app_role)
      ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
  END IF;
END $$;

-- Tighten user_roles policies: only owners can mutate roles.
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Owners can manage roles" ON public.user_roles;

CREATE POLICY "Owners can insert roles" ON public.user_roles
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'owner'::public.app_role));

CREATE POLICY "Owners can update roles" ON public.user_roles
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'owner'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'owner'::public.app_role));

CREATE POLICY "Owners can delete roles" ON public.user_roles
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'owner'::public.app_role));