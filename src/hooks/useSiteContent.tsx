import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, string>;

const Ctx = createContext<{
  content: ContentMap;
  t: (key: string, fallback?: string) => string;
  refresh: () => Promise<void>;
  loading: boolean;
}>({ content: {}, t: (_k, f) => f ?? "", refresh: async () => {}, loading: true });

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
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

  const t = useCallback((key: string, fallback = "") => content[key] ?? fallback, [content]);

  return <Ctx.Provider value={{ content, t, refresh, loading }}>{children}</Ctx.Provider>;
};

export const useSiteContent = () => useContext(Ctx);
