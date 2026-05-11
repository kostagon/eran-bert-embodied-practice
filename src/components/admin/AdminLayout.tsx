import { ReactNode } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const tabs = [
  { to: "/admin", label: "תוכן האתר" },
  { to: "/admin/programs", label: "תוכניות" },
  { to: "/admin/blog", label: "כתיבה" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { pathname } = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center font-body text-muted-foreground">טוען...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center section-padding gap-4">
      <h1 className="font-display text-2xl">אין לך הרשאת מנהל</h1>
      <p className="font-body text-sm text-muted-foreground max-w-md text-center">
        המשתמש שלך מחובר אך אינו מסומן כמנהל. בקש/י מהבעלים להוסיף לך תפקיד admin בטבלת user_roles.
      </p>
      <button onClick={signOut} className="font-body text-xs underline">התנתק/י</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="section-padding flex items-center justify-between h-16">
          <Link to="/" className="font-display text-sm tracking-[0.25em]">ERAN BERT · CMS</Link>
          <button onClick={signOut} className="font-body text-xs text-muted-foreground hover:text-foreground">התנתק/י</button>
        </div>
        <nav className="section-padding flex gap-8 border-t border-border/40">
          {tabs.map((t) => (
            <Link key={t.to} to={t.to}
              className={`py-4 text-sm font-body transition-colors ${pathname === t.to ? "text-foreground border-b border-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {t.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="section-padding py-10">{children}</main>
    </div>
  );
};

export default AdminLayout;
