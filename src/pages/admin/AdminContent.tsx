import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "sonner";

type Row = { key: string; value: string; label: string | null; section: string | null };

const AdminContent = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const { refresh } = useSiteContent();

  useEffect(() => {
    supabase.from("site_content").select("*").order("section").order("key").then(({ data }) => {
      setRows((data ?? []) as Row[]);
    });
  }, []);

  const save = async (key: string) => {
    setSaving(key);
    const value = edits[key] ?? rows.find((r) => r.key === key)?.value ?? "";
    const { error } = await supabase.from("site_content").update({ value }).eq("key", key);
    setSaving(null);
    if (error) return toast.error(error.message);
    toast.success("נשמר");
    setRows((prev) => prev.map((r) => r.key === key ? { ...r, value } : r));
    setEdits((p) => { const n = { ...p }; delete n[key]; return n; });
    refresh();
  };

  const grouped = rows.reduce<Record<string, Row[]>>((acc, r) => {
    const s = r.section || "כללי";
    (acc[s] ||= []).push(r); return acc;
  }, {});

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl mb-2">תוכן האתר</h1>
      <p className="font-body text-sm text-muted-foreground mb-10">ערוך/י כותרות, כותרות משנה, כפתורים וטקסטי קישור.</p>
      <div className="space-y-12 max-w-3xl">
        {Object.entries(grouped).map(([section, items]) => (
          <div key={section}>
            <h2 className="font-display text-xl mb-6 text-foreground/80 capitalize">{section}</h2>
            <div className="space-y-6">
              {items.map((r) => {
                const current = edits[r.key] ?? r.value;
                const dirty = edits[r.key] !== undefined && edits[r.key] !== r.value;
                const long = r.value.length > 80;
                return (
                  <div key={r.key} className="border-b border-border/60 pb-4">
                    <label className="font-body text-xs text-muted-foreground tracking-wide block mb-2">
                      {r.label || r.key} <span className="text-muted-foreground/40">· {r.key}</span>
                    </label>
                    {long ? (
                      <textarea value={current} rows={3}
                        onChange={(e) => setEdits((p) => ({ ...p, [r.key]: e.target.value }))}
                        className="w-full bg-transparent border border-border focus:border-accent outline-none p-3 font-body text-foreground text-sm" />
                    ) : (
                      <input value={current}
                        onChange={(e) => setEdits((p) => ({ ...p, [r.key]: e.target.value }))}
                        className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 font-body text-foreground text-sm" />
                    )}
                    {dirty && (
                      <button onClick={() => save(r.key)} disabled={saving === r.key}
                        className="mt-2 text-xs font-body bg-foreground text-primary-foreground px-4 py-1.5 disabled:opacity-50">
                        {saving === r.key ? "שומר..." : "שמור"}
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
