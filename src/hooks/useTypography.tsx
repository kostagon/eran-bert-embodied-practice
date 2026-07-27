import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  buildStack,
  CustomFont,
  DEFAULT_FONTS,
  ensureCustomFontFaces,
  ensureGoogleFonts,
  FontRole,
} from "@/lib/fonts";

export const TYPO_KEYS = {
  heading: "theme.font.heading",
  body: "theme.font.body",
  custom: "theme.font.custom",
} as const;

type Fonts = Record<FontRole, string>;

type Ctx = {
  fonts: Fonts;
  customFonts: CustomFont[];
  loading: boolean;
  /** Temporary, unsaved preview (null = show saved values) */
  preview: Fonts | null;
  setPreview: (f: Fonts | null) => void;
  save: (f: Fonts, custom?: CustomFont[]) => Promise<{ error: string | null }>;
  refresh: () => Promise<void>;
};

const TypographyCtx = createContext<Ctx>({
  fonts: DEFAULT_FONTS,
  customFonts: [],
  loading: true,
  preview: null,
  setPreview: () => {},
  save: async () => ({ error: null }),
  refresh: async () => {},
});

export const TypographyProvider = ({ children }: { children: ReactNode }) => {
  const [fonts, setFonts] = useState<Fonts>(DEFAULT_FONTS);
  const [customFonts, setCustomFonts] = useState<CustomFont[]>([]);
  const [preview, setPreview] = useState<Fonts | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data } = await supabase
      .from("site_content")
      .select("key,value")
      .in("key", [TYPO_KEYS.heading, TYPO_KEYS.body, TYPO_KEYS.custom]);
    const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
    setFonts({
      heading: map[TYPO_KEYS.heading]?.trim() || DEFAULT_FONTS.heading,
      body: map[TYPO_KEYS.body]?.trim() || DEFAULT_FONTS.body,
    });
    try {
      const parsed = map[TYPO_KEYS.custom] ? JSON.parse(map[TYPO_KEYS.custom]) : [];
      setCustomFonts(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCustomFonts([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const active = preview ?? fonts;

  // Apply CSS variables + load webfonts
  useEffect(() => {
    ensureCustomFontFaces("eb-custom-fonts", customFonts);
    ensureGoogleFonts("eb-google-fonts", [active.heading, active.body]);
    const root = document.documentElement;
    root.style.setProperty("--font-heading", buildStack(active.heading, customFonts));
    root.style.setProperty("--font-body", buildStack(active.body, customFonts));
  }, [active.heading, active.body, customFonts]);

  const save = useCallback(
    async (next: Fonts, custom?: CustomFont[]) => {
      const rows = [
        { key: TYPO_KEYS.heading, lang: "he", value: next.heading, section: "theme", label: "Heading font" },
        { key: TYPO_KEYS.body, lang: "he", value: next.body, section: "theme", label: "Body font" },
        {
          key: TYPO_KEYS.custom,
          lang: "he",
          value: JSON.stringify(custom ?? customFonts),
          section: "theme",
          label: "Custom uploaded fonts",
        },
      ];
      const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key,lang" });
      if (error) return { error: error.message };
      setFonts(next);
      if (custom) setCustomFonts(custom);
      setPreview(null);
      return { error: null };
    },
    [customFonts]
  );

  const value = useMemo(
    () => ({ fonts, customFonts, loading, preview, setPreview, save, refresh }),
    [fonts, customFonts, loading, preview, save, refresh]
  );

  return <TypographyCtx.Provider value={value}>{children}</TypographyCtx.Provider>;
};

export const useTypography = () => useContext(TypographyCtx);
