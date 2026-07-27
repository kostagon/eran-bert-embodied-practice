export type FontRole = "heading" | "body";

export type FontDef = {
  /** CSS family name */
  family: string;
  /** Google Fonts family name (undefined for system / custom fonts) */
  google?: string;
  /** Weights to request from Google Fonts */
  weights?: number[];
  /** Whether the typeface ships Hebrew glyphs */
  hebrew: boolean;
  category: "serif" | "sans" | "mono" | "display";
};

/** Hebrew-safe fallbacks appended to every stack so Hebrew never breaks. */
export const HEBREW_FALLBACK: Record<"serif" | "sans", string> = {
  serif: `'Frank Ruhl Libre', 'David Libre', Georgia, serif`,
  sans: `'Heebo', 'Assistant', 'Arial Hebrew', system-ui, sans-serif`,
};

export const DEFAULT_FONTS: Record<FontRole, string> = {
  heading: "Frank Ruhl Libre",
  body: "Heebo",
};

export const FONT_CATALOG: FontDef[] = [
  // Hebrew-capable
  { family: "Frank Ruhl Libre", google: "Frank Ruhl Libre", weights: [300, 400, 500, 700], hebrew: true, category: "serif" },
  { family: "Heebo", google: "Heebo", weights: [300, 400, 500, 600, 700], hebrew: true, category: "sans" },
  { family: "Assistant", google: "Assistant", weights: [300, 400, 500, 600, 700], hebrew: true, category: "sans" },
  { family: "Rubik", google: "Rubik", weights: [300, 400, 500, 600, 700], hebrew: true, category: "sans" },
  { family: "Alef", google: "Alef", weights: [400, 700], hebrew: true, category: "sans" },
  { family: "David Libre", google: "David Libre", weights: [400, 500, 700], hebrew: true, category: "serif" },
  { family: "Suez One", google: "Suez One", weights: [400], hebrew: true, category: "display" },
  { family: "Amatic SC", google: "Amatic SC", weights: [400, 700], hebrew: true, category: "display" },
  { family: "Secular One", google: "Secular One", weights: [400], hebrew: true, category: "display" },
  { family: "Noto Serif Hebrew", google: "Noto Serif Hebrew", weights: [300, 400, 500, 700], hebrew: true, category: "serif" },
  { family: "Noto Sans Hebrew", google: "Noto Sans Hebrew", weights: [300, 400, 500, 700], hebrew: true, category: "sans" },
  // Latin-only (Hebrew falls back automatically)
  { family: "Inter", google: "Inter", weights: [300, 400, 500, 600, 700], hebrew: false, category: "sans" },
  { family: "Cormorant Garamond", google: "Cormorant Garamond", weights: [300, 400, 500, 600, 700], hebrew: false, category: "serif" },
  { family: "Playfair Display", google: "Playfair Display", weights: [400, 500, 600, 700], hebrew: false, category: "serif" },
  { family: "Libre Baskerville", google: "Libre Baskerville", weights: [400, 700], hebrew: false, category: "serif" },
  { family: "EB Garamond", google: "EB Garamond", weights: [400, 500, 600, 700], hebrew: false, category: "serif" },
  { family: "Work Sans", google: "Work Sans", weights: [300, 400, 500, 600, 700], hebrew: false, category: "sans" },
  { family: "DM Sans", google: "DM Sans", weights: [300, 400, 500, 700], hebrew: false, category: "sans" },
  { family: "Manrope", google: "Manrope", weights: [300, 400, 500, 600, 700], hebrew: false, category: "sans" },
  { family: "Space Grotesk", google: "Space Grotesk", weights: [300, 400, 500, 700], hebrew: false, category: "sans" },
  { family: "JetBrains Mono", google: "JetBrains Mono", weights: [300, 400, 500, 700], hebrew: false, category: "mono" },
];

export type CustomFont = {
  family: string;
  url: string;
  format: string;
  weight?: number;
  category?: "serif" | "sans";
};

export const findFont = (family: string): FontDef | undefined =>
  FONT_CATALOG.find((f) => f.family === family);

/** Full CSS font stack with Hebrew-safe fallbacks appended. */
export const buildStack = (family: string, custom: CustomFont[] = []): string => {
  const def = findFont(family);
  const customDef = custom.find((c) => c.family === family);
  const category = def?.category ?? customDef?.category ?? "sans";
  const fallback = category === "serif" || category === "display" ? HEBREW_FALLBACK.serif : HEBREW_FALLBACK.sans;
  return `'${family}', ${fallback}`;
};

export const googleHref = (families: string[]): string | null => {
  const specs = families
    .map(findFont)
    .filter((f): f is FontDef => !!f?.google)
    .map((f) => `family=${encodeURIComponent(f.google!).replace(/%20/g, "+")}:wght@${(f.weights ?? [400]).join(";")}`);
  if (!specs.length) return null;
  return `https://fonts.googleapis.com/css2?${Array.from(new Set(specs)).join("&")}&display=swap`;
};

/** Injects (or updates) a <link> tag for the given Google families. */
export const ensureGoogleFonts = (id: string, families: string[]) => {
  const href = googleHref(families);
  let el = document.getElementById(id) as HTMLLinkElement | null;
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.id = id;
    el.rel = "stylesheet";
    document.head.appendChild(el);
  }
  if (el.href !== href) el.href = href;
};

/** Injects @font-face rules for uploaded custom fonts. */
export const ensureCustomFontFaces = (id: string, fonts: CustomFont[]) => {
  let el = document.getElementById(id) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = fonts
    .map(
      (f) => `@font-face{font-family:'${f.family}';src:url('${f.url}') format('${f.format}');font-weight:${
        f.weight ?? 400
      };font-display:swap;}`
    )
    .join("\n");
};

export const formatFromUrl = (url: string): string => {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
  if (ext === "woff2") return "woff2";
  if (ext === "woff") return "woff";
  if (ext === "otf") return "opentype";
  return "truetype";
};
