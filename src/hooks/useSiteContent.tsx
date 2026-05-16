import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { translations } from "@/i18n/translations";
import { useLanguage } from "@/hooks/useLanguage";

type ContentMap = Record<string, string>;

const Ctx = createContext<{
  content: ContentMap;
  t: (key: string, fallback?: string) => string;
  refresh: () => Promise<void>;
  loading: boolean;
}>({ content: {}, t: (_k, f) => f ?? "", refresh: async () => {}, loading: true });

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const { lang } = useLanguage();
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data } = await supabase.from("site_content").select("key,value");
    const map: ContentMap = {};
    data?.forEach((r) => { map[r.key] = r.value; });
    setContent(map);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Resolution order:
  // - English: dictionary[en][key] → CMS value → fallback
  // - Hebrew: CMS value → dictionary[he][key] → fallback
  const t = useCallback(
    (key: string, fallback = "") => {
      if (lang === "en") return translations.en[key] ?? content[key] ?? translations.he[key] ?? fallback;
      return content[key] ?? translations.he[key] ?? fallback;
    },
    [content, lang]
  );

  return <Ctx.Provider value={{ content, t, refresh, loading }}>{children}</Ctx.Provider>;
};

export const useSiteContent = () => useContext(Ctx);
