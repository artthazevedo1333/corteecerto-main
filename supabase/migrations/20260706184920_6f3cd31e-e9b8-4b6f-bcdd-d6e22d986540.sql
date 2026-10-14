CREATE TABLE IF NOT EXISTS public.promotional_licenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  plan public.subscription_plan NOT NULL DEFAULT 'starter',
  max_uses integer,
  expires_at timestamptz,
  months_granted integer NOT NULL DEFAULT 1,
  lifetime boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT promotional_licenses_code_format CHECK (code = upper(code) AND code ~ '^[A-Z0-9_-]{3,40}$'),
  CONSTRAINT promotional_licenses_max_uses_positive CHECK (max_uses IS NULL OR max_uses > 0),
  CONSTRAINT promotional_licenses_months_granted_nonnegative CHECK (months_granted >= 0)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.promotional_licenses TO authenticated;
GRANT ALL ON public.promotional_licenses TO service_role;

ALTER TABLE public.promotional_licenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage promotional licenses"
ON public.promotional_licenses
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_promotional_licenses_updated_at
BEFORE UPDATE ON public.promotional_licenses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.promotional_license_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id uuid NOT NULL REFERENCES public.promotional_licenses(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  redeemed_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (license_id, user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.promotional_license_redemptions TO authenticated;
GRANT ALL ON public.promotional_license_redemptions TO service_role;

ALTER TABLE public.promotional_license_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage promotional license redemptions"
ON public.promotional_license_redemptions
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid NOT NULL,
  target_user_id uuid,
  action text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.admin_audit_logs TO authenticated;
GRANT ALL ON public.admin_audit_logs TO service_role;

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs"
ON public.admin_audit_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create audit logs"
ON public.admin_audit_logs
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS idx_promotional_licenses_code ON public.promotional_licenses (code);
CREATE INDEX IF NOT EXISTS idx_promotional_license_redemptions_license_id ON public.promotional_license_redemptions (license_id);
CREATE INDEX IF NOT EXISTS idx_promotional_license_redemptions_user_id ON public.promotional_license_redemptions (user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_admin_user_id ON public.admin_audit_logs (admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_target_user_id ON public.admin_audit_logs (target_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON public.admin_audit_logs (created_at DESC);