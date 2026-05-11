import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "sonner";

type Post = {
  id: string; slug: string; title: string; description: string;
  post_type: string; content: string; embed_url: string | null;
  external_url: string | null; cover_image_url: string | null;
  published_at: string; status: string;
};

const empty: Omit<Post, "id"> = {
  slug: "", title: "", description: "", post_type: "text", content: "",
  embed_url: "", external_url: "", cover_image_url: "",
  published_at: new Date().toISOString().slice(0, 10), status: "draft",
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\u0590-\u05FF\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);

const AdminBlog = () => {
  const [items, setItems] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<Post, "id">>(empty);

  const load = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
    setItems((data ?? []) as Post[]);
  };
  useEffect(() => { load(); }, []);

  const startNew = () => { setDraft(empty); setCreating(true); setEditing(null); };
  const startEdit = (p: Post) => {
    setEditing(p);
    setDraft({ ...p, published_at: p.published_at.slice(0, 10) });
    setCreating(false);
  };

  const save = async () => {
    if (!draft.title.trim()) return toast.error("חובה להזין כותרת");
    const slug = draft.slug.trim() || slugify(draft.title);
    const payload = {
      ...draft, slug,
      embed_url: draft.embed_url || null,
      external_url: draft.external_url || null,
      cover_image_url: draft.cover_image_url || null,
      published_at: new Date(draft.published_at).toISOString(),
    };
    if (editing) {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) return toast.error(error.message);
    }
    toast.success("נשמר");
    setEditing(null); setCreating(false); setDraft(empty); load();
  };

  const remove = async (id: string) => {
    if (!confirm("למחוק פוסט זה?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("נמחק"); load();
  };

  const showForm = creating || editing;
  const typeLabel = (t: string) => ({ text: "מאמר", spotify: "Spotify", youtube: "YouTube", external: "קישור חיצוני" }[t] || t);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-3xl">כתיבה ופודקאסטים</h1>
        {!showForm && (
          <button onClick={startNew} className="bg-foreground text-primary-foreground px-5 py-2.5 text-sm font-body">
            + פוסט חדש
          </button>
        )}
      </div>

      {showForm ? (
        <div className="max-w-2xl space-y-5">
          <Field label="כותרת" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v, slug: draft.slug || slugify(v) })} />
          <Field label="Slug (כתובת)" value={draft.slug} onChange={(v) => setDraft({ ...draft, slug: v })} />
          <Field label="תיאור קצר" value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} multiline />

          <div>
            <label className="font-body text-xs text-muted-foreground block mb-2">סוג פוסט</label>
            <select value={draft.post_type} onChange={(e) => setDraft({ ...draft, post_type: e.target.value })}
              className="bg-transparent border-b border-border py-2 font-body text-sm">
              <option value="text">מאמר</option>
              <option value="spotify">Spotify (פרק פודקאסט)</option>
              <option value="youtube">YouTube</option>
              <option value="external">קישור חיצוני</option>
            </select>
          </div>

          {draft.post_type === "text" && (
            <Field label="תוכן הפוסט" value={draft.content} onChange={(v) => setDraft({ ...draft, content: v })} multiline rows={10} />
          )}
          {(draft.post_type === "spotify" || draft.post_type === "youtube") && (
            <Field label={`כתובת ${draft.post_type === "spotify" ? "Spotify" : "YouTube"}`}
              value={draft.embed_url ?? ""} onChange={(v) => setDraft({ ...draft, embed_url: v })} />
          )}
          {draft.post_type === "external" && (
            <Field label="כתובת חיצונית" value={draft.external_url ?? ""} onChange={(v) => setDraft({ ...draft, external_url: v })} />
          )}

          <Field label="כתובת תמונת כותרת (URL)" value={draft.cover_image_url ?? ""} onChange={(v) => setDraft({ ...draft, cover_image_url: v })} />

          <div className="flex gap-6">
            <div>
              <label className="font-body text-xs text-muted-foreground block mb-2">תאריך פרסום</label>
              <input type="date" value={draft.published_at}
                onChange={(e) => setDraft({ ...draft, published_at: e.target.value })}
                className="bg-transparent border-b border-border py-2 font-body text-sm" />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground block mb-2">סטטוס</label>
              <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                className="bg-transparent border-b border-border py-2 font-body text-sm">
                <option value="draft">טיוטה</option>
                <option value="published">פורסם</option>
              </select>
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
          {items.map((p) => (
            <div key={p.id} className="border border-border p-5 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-display text-lg">{p.title}</h3>
                  <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground">{typeLabel(p.post_type)}</span>
                  <span className={`text-xs px-2 py-0.5 ${p.status === "published" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                    {p.status === "published" ? "פורסם" : "טיוטה"}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground">{p.description}</p>
                <p className="font-body text-xs text-muted-foreground/60 mt-1">/{p.slug}</p>
              </div>
              <div className="flex gap-1 text-xs">
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

const Field = ({ label, value, onChange, multiline, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number }) => (
  <div>
    <label className="font-body text-xs text-muted-foreground tracking-wide block mb-2">{label}</label>
    {multiline ? (
      <textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-border focus:border-accent outline-none p-3 font-body text-sm" />
    ) : (
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 font-body text-sm" />
    )}
  </div>
);

export default AdminBlog;
