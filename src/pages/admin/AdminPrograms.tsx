import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "sonner";

type Program = {
  id: string; title: string; short_description: string; full_description: string;
  image_url: string | null; external_url: string | null; status: string; sort_order: number;
};

const empty: Omit<Program, "id"> = {
  title: "", short_description: "", full_description: "",
  image_url: "", external_url: "", status: "active", sort_order: 0,
};

const AdminPrograms = () => {
  const [items, setItems] = useState<Program[]>([]);
  const [editing, setEditing] = useState<Program | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<Program, "id">>(empty);

  const load = async () => {
    const { data } = await supabase.from("programs").select("*").order("sort_order");
    setItems((data ?? []) as Program[]);
  };
  useEffect(() => { load(); }, []);

  const startNew = () => { setDraft({ ...empty, sort_order: items.length + 1 }); setCreating(true); setEditing(null); };
  const startEdit = (p: Program) => { setEditing(p); setDraft(p); setCreating(false); };

  const save = async () => {
    if (!draft.title.trim()) return toast.error("חובה להזין כותרת");
    const payload = { ...draft, image_url: draft.image_url || null, external_url: draft.external_url || null };
    if (editing) {
      const { error } = await supabase.from("programs").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase.from("programs").insert(payload);
      if (error) return toast.error(error.message);
    }
    toast.success("נשמר");
    setEditing(null); setCreating(false); setDraft(empty);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("למחוק תוכנית זו?")) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("נמחק"); load();
  };

  const move = async (p: Program, dir: -1 | 1) => {
    const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex((x) => x.id === p.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    await supabase.from("programs").update({ sort_order: swap.sort_order }).eq("id", p.id);
    await supabase.from("programs").update({ sort_order: p.sort_order }).eq("id", swap.id);
    load();
  };

  const showForm = creating || editing;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-3xl">תוכניות</h1>
        {!showForm && (
          <button onClick={startNew} className="bg-foreground text-primary-foreground px-5 py-2.5 text-sm font-body">
            + תוכנית חדשה
          </button>
        )}
      </div>

      {showForm ? (
        <div className="max-w-2xl space-y-5">
          <Field label="כותרת" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
          <Field label="תיאור קצר" value={draft.short_description} onChange={(v) => setDraft({ ...draft, short_description: v })} />
          <Field label="תיאור מלא" value={draft.full_description} onChange={(v) => setDraft({ ...draft, full_description: v })} multiline />
          <Field label="כתובת תמונה (URL)" value={draft.image_url ?? ""} onChange={(v) => setDraft({ ...draft, image_url: v })} />
          <Field label="קישור חיצוני (להרשמה)" value={draft.external_url ?? ""} onChange={(v) => setDraft({ ...draft, external_url: v })} />
          <div className="flex gap-6">
            <div>
              <label className="font-body text-xs text-muted-foreground block mb-2">סטטוס</label>
              <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                className="bg-transparent border-b border-border py-2 font-body text-sm">
                <option value="active">פעיל</option>
                <option value="hidden">מוסתר</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground block mb-2">סדר</label>
              <input type="number" value={draft.sort_order}
                onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
                className="bg-transparent border-b border-border py-2 font-body text-sm w-24" />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={save} className="bg-foreground text-primary-foreground px-6 py-2.5 text-sm font-body">שמור</button>
            <button onClick={() => { setEditing(null); setCreating(false); setDraft(empty); }}
              className="border border-border px-6 py-2.5 text-sm font-body">ביטול</button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 max-w-3xl">
          {items.map((p, i) => (
            <div key={p.id} className="border border-border p-5 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-body text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-lg">{p.title}</h3>
                  <span className={`text-xs px-2 py-0.5 ${p.status === "active" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                    {p.status === "active" ? "פעיל" : "מוסתר"}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground">{p.short_description}</p>
              </div>
              <div className="flex gap-1 text-xs">
                <button onClick={() => move(p, -1)} className="px-2 py-1 hover:bg-muted">↑</button>
                <button onClick={() => move(p, 1)} className="px-2 py-1 hover:bg-muted">↓</button>
                <button onClick={() => startEdit(p)} className="px-3 py-1 hover:bg-muted">ערוך</button>
                <button onClick={() => remove(p.id)} className="px-3 py-1 text-destructive hover:bg-destructive/10">מחק</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

const Field = ({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) => (
  <div>
    <label className="font-body text-xs text-muted-foreground tracking-wide block mb-2">{label}</label>
    {multiline ? (
      <textarea value={value} rows={4} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-border focus:border-accent outline-none p-3 font-body text-sm" />
    ) : (
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 font-body text-sm" />
    )}
  </div>
);

export default AdminPrograms;
