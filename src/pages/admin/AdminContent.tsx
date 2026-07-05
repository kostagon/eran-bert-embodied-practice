import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import AdminLayout from "@/components/admin/AdminLayout";
import { CMS_SECTIONS, translations, Lang } from "@/i18n/translations";
import { toast } from "sonner";

type Row = { key: string; value: string; lang: string };

const AdminContent = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({}); // `${lang}:${key}` → value
  const [saving, setSaving] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("he");
  const { refresh } = useSiteContent();

  const load = async () => {
    const { data } = await supabase.from("site_content").select("key,value,lang");
    setRows((data ?? []) as Row[]);
  };

  useEffect(() => { load(); }, []);

  const currentValue = (key: string) => {
    const cache = `${lang}:${key}`;
    if (edits[cache] !== undefined) return edits[cache];
    const db = rows.find((r) => r.key === key && r.lang === lang)?.value;
    if (db !== undefined && db !== "") return db;
    return translations[lang][key] ?? translations.he[key] ?? "";
  };

  const isDirty = (key: string) => edits[`${lang}:${key}`] !== undefined;

  const save = async (key: string) => {
    const cache = `${lang}:${key}`;
    const value = edits[cache] ?? currentValue(key);
    setSaving(cache);
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, lang, value }, { onConflict: "key,lang" });
    setSaving(null);
    if (error) return toast.error(error.message);
    toast.success("Saved / נשמר");
    setEdits((p) => { const n = { ...p }; delete n[cache]; return n; });
    load();
    refresh();
  };

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-8 gap-6 flex-wrap">
        <div>
          <h1 className="font-display text-3xl mb-2">Site content · תוכן האתר</h1>
          <p className="font-body text-sm text-muted-foreground">
            Edit every string on the website. Switch language to edit the Hebrew or English version.
          </p>
        </div>
        <div className="inline-flex border border-border">
          {(["he", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-5 py-2 text-xs font-body tracking-widest uppercase transition-colors ${
                lang === l ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l === "he" ? "עברית" : "English"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-14 max-w-3xl">
        {CMS_SECTIONS.map((section) => (
          <div key={section.section}>
            <h2 className="font-display text-xl mb-6 text-foreground/80">{section.label}</h2>
            <div className="space-y-6">
              {section.keys.map(({ key, label, long }) => {
                const value = currentValue(key);
                const dirty = isDirty(key);
                const cache = `${lang}:${key}`;
                const useTextarea = long || value.length > 80 || value.includes("\n");
                return (
                  <div key={key} className="border-b border-border/60 pb-4">
                    <label className="font-body text-xs text-muted-foreground tracking-wide flex items-center justify-between mb-2">
                      <span>{label}</span>
                      <span className="text-muted-foreground/40 ltr:font-mono rtl:font-mono">{key}</span>
                    </label>
                    {useTextarea ? (
                      <textarea
                        dir={lang === "he" ? "rtl" : "ltr"}
                        value={value}
                        rows={Math.max(3, Math.min(10, value.split("\n").length + 1))}
                        onChange={(e) => setEdits((p) => ({ ...p, [cache]: e.target.value }))}
                        className="w-full bg-transparent border border-border focus:border-accent outline-none p-3 font-body text-foreground text-sm"
                      />
                    ) : (
                      <input
                        dir={lang === "he" ? "rtl" : "ltr"}
                        value={value}
                        onChange={(e) => setEdits((p) => ({ ...p, [cache]: e.target.value }))}
                        className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 font-body text-foreground text-sm"
                      />
                    )}
                    {dirty && (
                      <button
                        onClick={() => save(key)}
                        disabled={saving === cache}
                        className="mt-2 text-xs font-body bg-foreground text-primary-foreground px-4 py-1.5 disabled:opacity-50"
                      >
                        {saving === cache ? "Saving..." : "Save"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
