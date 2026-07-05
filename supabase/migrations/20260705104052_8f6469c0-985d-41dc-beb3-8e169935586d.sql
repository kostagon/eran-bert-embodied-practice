
-- Add language column to site_content so CMS can store both Hebrew and English values
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'he';
ALTER TABLE public.site_content DROP CONSTRAINT IF EXISTS site_content_pkey;
ALTER TABLE public.site_content ADD PRIMARY KEY (key, lang);
