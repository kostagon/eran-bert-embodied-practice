import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { LANG_CONFIG, Lang } from "@/i18n/translations";

const STORAGE_KEY = "eb_lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; dir: "rtl" | "ltr"; isRTL: boolean };

const LanguageCtx = createContext<Ctx>({
  lang: "he",
  setLang: () => {},
  dir: "rtl",
  isRTL: true,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "he";
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved === "en" || saved === "he" ? saved : "he";
  });

  useEffect(() => {
    const { dir, htmlLang } = LANG_CONFIG[lang];
    document.documentElement.dir = dir;
    document.documentElement.lang = htmlLang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const dir = LANG_CONFIG[lang].dir;

  return (
    <LanguageCtx.Provider value={{ lang, setLang, dir, isRTL: dir === "rtl" }}>
      {children}
    </LanguageCtx.Provider>
  );
};

export const useLanguage = () => useContext(LanguageCtx);
