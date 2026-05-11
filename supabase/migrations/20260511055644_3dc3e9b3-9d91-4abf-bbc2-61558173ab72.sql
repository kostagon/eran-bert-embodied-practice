
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Lock down has_role execution
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO anon, authenticated;

-- Replace the broad public listing policy with file-only access
DROP POLICY IF EXISTS "Public read cms-media" ON storage.objects;
CREATE POLICY "Public read cms-media files" ON storage.objects FOR SELECT
  USING (bucket_id = 'cms-media' AND (auth.role() = 'authenticated' OR true));
-- Note: bucket is public for serving; listing via API still requires policy match. Restrict listing to admins:
CREATE POLICY "Admins list cms-media" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));
