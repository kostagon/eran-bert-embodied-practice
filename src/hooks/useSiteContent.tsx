import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { translations, Lang } from "@/i18n/translations";
import { useLanguage } from "@/hooks/useLanguage";

type ContentMap = Record<Lang, Record<string, string>>;

const Ctx = createContext<{
  content: ContentMap;
  t: (key: string, fallback?: string) => string;
  refresh: () => Promise<void>;
  loading: boolean;
}>({ content: { he: {}, en: {} }, t: (_k, f) => f ?? "", refresh: async () => {}, loading: true });

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const { lang } = useLanguage();
  const [content, setContent] = useState<ContentMap>({ he: {}, en: {} });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data } = await supabase.from("site_content").select("key,value,lang");
    const map: ContentMap = { he: {}, en: {} };
    (data ?? []).forEach((r: { key: string; value: string; lang: string }) => {
      const l = (r.lang === "en" ? "en" : "he") as Lang;
      if (r.value && r.value.trim().length > 0) map[l][r.key] = r.value;
    });
    setContent(map);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Resolution: CMS[lang] → dictionary[lang] → dictionary[he] → fallback
  const t = useCallback(
    (key: string, fallback = "") =>
      content[lang]?.[key] ?? translations[lang][key] ?? translations.he[key] ?? fallback,
    [content, lang]
  );

  return <Ctx.Provider value={{ content, t, refresh, loading }}>{children}</Ctx.Provider>;
};

export const useSiteContent = () => useContext(Ctx);
