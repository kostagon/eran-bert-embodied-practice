import { useLanguage } from "@/hooks/useLanguage";
import { LANG_CONFIG, Lang } from "@/i18n/translations";

const order: Lang[] = ["he", "en"];

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`inline-flex items-center gap-2 font-body text-xs tracking-widest ${className}`}>
      {order.map((l, i) => (
        <span key={l} className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-label={LANG_CONFIG[l].label}
            aria-pressed={lang === l}
            className={`uppercase transition-colors duration-300 ${
              lang === l ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
            }`}
          >
            {l}
          </button>
          {i < order.length - 1 && <span className="text-muted-foreground/30">/</span>}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
