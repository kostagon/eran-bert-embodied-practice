import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().trim().email("אימייל לא תקין").max(255),
  password: z.string().min(6, "סיסמה חייבת להיות לפחות 6 תווים").max(100),
});

const Auth = () => {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const rawNext = params.get("next") ?? "";
  const nextPath = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/admin";
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { if (!loading && user) nav(nextPath); }, [user, loading, nav, nextPath]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}${nextPath}` },
        });
        if (error) throw error;
        toast.success("נרשמת בהצלחה. בדוק/י אימייל לאישור.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav(nextPath);
      }
    } catch (err: any) {
      toast.error(err.message || "שגיאה");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-padding bg-background">
      <div className="w-full max-w-md">
        <Link to="/" className="font-display text-sm tracking-[0.25em] text-foreground block mb-12 text-center">
          ERAN BERT
        </Link>
        <div className="editorial-divider mb-8" />
        <h1 className="font-display text-3xl text-foreground mb-2">
          {mode === "signin" ? "כניסת מנהל" : "הרשמה"}
        </h1>
        <p className="font-body text-sm text-muted-foreground mb-10">
          גישה לניהול תוכן האתר.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div>
            <label className="font-body text-xs text-muted-foreground tracking-wide mb-2 block">אימייל</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-body text-foreground" />
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground tracking-wide mb-2 block">סיסמה</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-body text-foreground" />
          </div>
          <button type="submit" disabled={submitting}
            className="bg-foreground text-primary-foreground py-3.5 text-sm font-body tracking-wide hover:bg-charcoal-light transition-colors disabled:opacity-50">
            {submitting ? "..." : mode === "signin" ? "כניסה" : "הרשמה"}
          </button>
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
            {mode === "signin" ? "אין לך חשבון? הירשם/י" : "כבר יש לך חשבון? כניסה"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
