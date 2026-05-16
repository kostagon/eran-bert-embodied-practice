import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { t } = useSiteContent();
  return (
    <footer className="py-12 section-padding border-t border-border/40">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-display text-sm tracking-[0.25em] text-foreground">
            {t("footer.brand")}
          </span>
          <p className="font-body text-xs text-muted-foreground/60 mt-2">
            {t("footer.tagline")}
          </p>
        </div>
        <div className="font-body text-xs text-muted-foreground/40">
          © {new Date().getFullYear()} — {t("footer.brand")} · {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
