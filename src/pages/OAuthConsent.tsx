import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthClient = { name?: string; logo_uri?: string; client_uri?: string };
type AuthDetails = { client?: OAuthClient; redirect_url?: string; redirect_to?: string; scopes?: string[] };
const oauth = (supabase.auth as any).oauth as {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthDetails | null; error: { message: string } | null }>;
};

function safeNext(): string {
  const path = window.location.pathname + window.location.search;
  return path.startsWith("/") && !path.startsWith("//") ? path : "/";
}

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        window.location.href = "/auth?next=" + encodeURIComponent(safeNext());
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) { window.location.href = immediate; return; }
      setDetails(data);
    })();
    return () => { active = false; };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) { setBusy(false); return setError(error.message); }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) { setBusy(false); return setError("No redirect returned by the authorization server."); }
    window.location.href = target;
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-padding bg-background">
      <div className="w-full max-w-md">
        <Link to="/" className="font-display text-sm tracking-[0.25em] text-foreground block mb-12 text-center">
          ERAN BERT
        </Link>
        <div className="editorial-divider mb-8" />
        {error && (
          <div className="font-body text-sm text-destructive mb-6">{error}</div>
        )}
        {!error && !details && (
          <p className="font-body text-sm text-muted-foreground">Loading…</p>
        )}
        {details && (
          <>
            <h1 className="font-display text-3xl text-foreground mb-3">
              Connect {details.client?.name ?? "this app"}
            </h1>
            <p className="font-body text-sm text-muted-foreground mb-10 leading-relaxed">
              {details.client?.name ?? "The requesting app"} is asking to use the Eran Bert site as you.
              It will be able to read the same blog posts, programs, and site content your account can access.
            </p>
            <div className="flex flex-col gap-4">
              <button
                type="button"
                disabled={busy}
                onClick={() => decide(true)}
                className="bg-foreground text-primary-foreground py-3.5 text-sm font-body tracking-wide hover:bg-charcoal-light transition-colors disabled:opacity-50"
              >
                {busy ? "…" : "Approve"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => decide(false)}
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Deny
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthConsent;
