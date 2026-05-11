
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Site content (key/value)
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  label text,
  section text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins write site content" ON public.site_content FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_content_updated BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Programs
CREATE TABLE public.programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  full_description text NOT NULL DEFAULT '',
  image_url text,
  external_url text,
  status text NOT NULL DEFAULT 'active',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active programs" ON public.programs FOR SELECT
  USING (status = 'active' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write programs" ON public.programs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER programs_updated BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Blog posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  post_type text NOT NULL DEFAULT 'text',
  content text NOT NULL DEFAULT '',
  embed_url text,
  external_url text,
  cover_image_url text,
  published_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published posts" ON public.blog_posts FOR SELECT
  USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write posts" ON public.blog_posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER blog_posts_updated BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-media', 'cms-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read cms-media" ON storage.objects FOR SELECT USING (bucket_id = 'cms-media');
CREATE POLICY "Admins upload cms-media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update cms-media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete cms-media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));
