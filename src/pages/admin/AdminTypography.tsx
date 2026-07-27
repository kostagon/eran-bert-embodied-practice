import { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useTypography } from "@/hooks/useTypography";
import {
  CustomFont,
  DEFAULT_FONTS,
  FONT_CATALOG,
  FontRole,
  buildStack,
  ensureGoogleFonts,
  findFont,
  formatFromUrl,
} from "@/lib/fonts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const roleLabels: Record<FontRole, { en: string; he: string; hint: string }> = {
  heading: { en: "Heading font", he: "גופן כותרות", hint: "H1–H6, hero titles, section titles" },
  body: { en: "Body font", he: "גופן גוף הטקסט", hint: "Paragraphs, lists, labels, inputs, buttons" },
};

const AdminTypography = () => {
  const { fonts, customFonts, save, setPreview, preview } = useTypography();
  const [draft, setDraft] = useState(fonts);
  const [custom, setCustom] = useState<CustomFont[]>(customFonts);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setDraft(fonts), [fonts]);
  useEffect(() => setCustom(customFonts), [customFonts]);

  // Live preview across the whole admin + site shell
  useEffect(() => {
    setPreview(draft);
    return () => setPreview(null);
  }, [draft, setPreview]);

  // Load every catalog font so the picker renders each name in its own typeface
  useEffect(() => {
    ensureGoogleFonts("eb-google-fonts-picker", FONT_CATALOG.map((f) => f.family));
  }, []);

  const options = useMemo(
    () => [
      ...FONT_CATALOG.map((f) => ({ family: f.family, hebrew: f.hebrew, weights: f.weights ?? [400], custom: false })),
      ...custom.map((c) => ({ family: c.family, hebrew: false, weights: [c.weight ?? 400], custom: true })),
    ],
    [custom]
  );

  const dirty =
    draft.heading !== fonts.heading ||
    draft.body !== fonts.body ||
    JSON.stringify(custom) !== JSON.stringify(customFonts);

  const onSave = async () => {
    setSaving(true);
    const { error } = await save(draft, custom);
    setSaving(false);
    if (error) return toast.error(error);
    toast.success("Typography saved / הטיפוגרפיה נשמרה");
  };

  const onUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!["woff2", "woff", "ttf", "otf"].includes(ext)) {
      setUploading(false);
      return toast.error("Supported formats: .woff2, .woff, .ttf, .otf");
    }
    const path = `fonts/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("cms-media").upload(path, file, { upsert: true });
    if (error) {
      setUploading(false);
      return toast.error(error.message);
    }
    const { data } = supabase.storage.from("cms-media").getPublicUrl(path);
    const family = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    setCustom((p) => [...p, { family, url: data.publicUrl, format: formatFromUrl(data.publicUrl), weight: 400, category: "sans" }]);
    setUploading(false);
    toast.success(`Uploaded "${family}" — remember to save`);
  };

  return (
    <AdminLayout>
      <div className="flex items-start justify-between gap-6 flex-wrap mb-10">
        <div>
          <h1 className="font-display text-3xl mb-2">Typography · טיפוגרפיה</h1>
          <p className="font-body text-sm text-muted-foreground max-w-xl">
            Change the site fonts globally. Sizes, weights, spacing and the responsive scale stay exactly as they are.
            Fonts without Hebrew glyphs fall back automatically to a Hebrew-compatible face.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setDraft(DEFAULT_FONTS); }}
            className="font-body text-xs px-4 py-2 border border-border text-muted-foreground hover:text-foreground"
          >
            Reset to defaults
          </button>
          <button
            onClick={onSave}
            disabled={!dirty || saving}
            className="font-body text-xs bg-foreground text-primary-foreground px-6 py-2 disabled:opacity-40"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl">
        {(["heading", "body"] as FontRole[]).map((role) => (
          <section key={role}>
            <h2 className="font-display text-xl mb-1">
              {roleLabels[role].en} · {roleLabels[role].he}
            </h2>
            <p className="font-body text-xs text-muted-foreground mb-4">{roleLabels[role].hint}</p>

            <div className="border border-border max-h-[420px] overflow-y-auto divide-y divide-border/50">
              {options.map((o) => {
                const selected = draft[role] === o.family;
                return (
                  <button
                    key={`${role}-${o.family}`}
                    onClick={() => setDraft((p) => ({ ...p, [role]: o.family }))}
                    className={`w-full text-start px-4 py-3 transition-colors ${
                      selected ? "bg-foreground text-primary-foreground" : "hover:bg-muted/60"
                    }`}
                  >
                    <span className="block text-lg" style={{ fontFamily: buildStack(o.family, custom) }}>
                      {o.family} — אבגד Aa
                    </span>
                    <span className={`block text-[10px] font-body mt-1 ${selected ? "opacity-70" : "text-muted-foreground"}`}>
                      {o.custom ? "custom upload" : o.hebrew ? "Hebrew + Latin" : "Latin only · Hebrew falls back"} ·{" "}
                      {o.weights.join(", ")}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Custom font upload */}
      <section className="mt-12 max-w-6xl">
        <h2 className="font-display text-xl mb-3">Custom fonts</h2>
        <input
          ref={fileRef}
          type="file"
          accept=".woff2,.woff,.ttf,.otf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); e.target.value = ""; }}
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="font-body text-xs px-4 py-2 border border-border hover:border-accent disabled:opacity-40"
        >
          {uploading ? "Uploading..." : "Upload .woff2 / .woff / .ttf / .otf"}
        </button>
        {custom.length > 0 && (
          <ul className="mt-4 divide-y divide-border/50 border border-border">
            {custom.map((c, i) => (
              <li key={c.url} className="flex items-center justify-between gap-4 px-4 py-3">
                <input
                  value={c.family}
                  onChange={(e) =>
                    setCustom((p) => p.map((x, idx) => (idx === i ? { ...x, family: e.target.value } : x)))
                  }
                  className="bg-transparent border-b border-border focus:border-accent outline-none font-body text-sm py-1"
                />
                <span className="text-lg" style={{ fontFamily: buildStack(c.family, custom) }}>אבגד Aa 123</span>
                <button
                  onClick={() => setCustom((p) => p.filter((_, idx) => idx !== i))}
                  className="font-body text-xs text-destructive"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Live preview */}
      <section className="mt-12 max-w-4xl border border-border p-8 bg-card">
        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">
          Live preview {preview && dirty ? "· unsaved" : ""}
        </p>
        <div dir="rtl" className="mb-10">
          <h3 className="font-display text-4xl mb-3">נוכחות תחת לחץ</h3>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            האימון אינו רק לימוד של מכות ובעיטות — הוא מעבדה לנוכחות, ויסות עצמי וחוסן. אנחנו מתאמנים לאט כדי להיות חלקים,
            וחלקים כדי להיות מהירים.
          </p>
        </div>
        <div dir="ltr">
          <h3 className="font-display text-4xl mb-3">Presence Under Pressure</h3>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Training is not only about strikes and kicks — it is a laboratory for presence, self-regulation and
            resilience. Slow is smooth, smooth is fast.
          </p>
        </div>
        <p className="font-body text-[11px] text-muted-foreground mt-8">
          Heading stack: {buildStack(draft.heading, custom)} {findFont(draft.heading)?.hebrew === false && "· Hebrew falls back"}
          <br />
          Body stack: {buildStack(draft.body, custom)}
        </p>
      </section>
    </AdminLayout>
  );
};

export default AdminTypography;
