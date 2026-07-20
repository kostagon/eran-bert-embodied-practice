
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, anon, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, anon, service_role;

-- Timestamp trigger helper, moved to private
CREATE OR REPLACE FUNCTION private.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
REVOKE ALL ON FUNCTION private.set_updated_at() FROM PUBLIC;

-- Recreate triggers to point at private.set_updated_at
DROP TRIGGER IF EXISTS site_content_updated ON public.site_content;
DROP TRIGGER IF EXISTS programs_updated ON public.programs;
DROP TRIGGER IF EXISTS blog_posts_updated ON public.blog_posts;

CREATE TRIGGER site_content_updated BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION private.set_updated_at();
CREATE TRIGGER programs_updated BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION private.set_updated_at();
CREATE TRIGGER blog_posts_updated BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION private.set_updated_at();

-- Repoint every policy from public.has_role -> private.has_role

DROP POLICY IF EXISTS "Admins write posts" ON public.blog_posts;
CREATE POLICY "Admins write posts" ON public.blog_posts
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
CREATE POLICY "Public can read published posts" ON public.blog_posts
  FOR SELECT
  USING (status = 'published' OR private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins write programs" ON public.programs;
CREATE POLICY "Admins write programs" ON public.programs
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Public can read active programs" ON public.programs;
CREATE POLICY "Public can read active programs" ON public.programs
  FOR SELECT
  USING (status = 'active' OR private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins write site content" ON public.site_content;
CREATE POLICY "Admins write site content" ON public.site_content
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins delete cms-media" ON storage.objects;
CREATE POLICY "Admins delete cms-media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins list cms-media" ON storage.objects;
CREATE POLICY "Admins list cms-media" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins update cms-media" ON storage.objects;
CREATE POLICY "Admins update cms-media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins upload cms-media" ON storage.objects;
CREATE POLICY "Admins upload cms-media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role));

-- Fix cms_media_public_select_bypass: drop the "OR true" tautology.
DROP POLICY IF EXISTS "Public read cms-media files" ON storage.objects;
CREATE POLICY "Public read cms-media files" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'cms-media');

-- user_roles_self_grant: RESTRICTIVE policies so a non-admin can never
-- write to user_roles even if a future PERMISSIVE policy is added.
CREATE POLICY "Only admins can insert user roles" ON public.user_roles
  AS RESTRICTIVE
  FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Only admins can update user roles" ON public.user_roles
  AS RESTRICTIVE
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Only admins can delete user roles" ON public.user_roles
  AS RESTRICTIVE
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Block anon writes on user roles" ON public.user_roles
  AS RESTRICTIVE
  FOR ALL TO anon
  USING (false)
  WITH CHECK (false);

-- Remove the now-unreferenced public helpers so they cannot be called
-- via the Data API.
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP FUNCTION IF EXISTS public.set_updated_at();
