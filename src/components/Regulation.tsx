import ScrollReveal from "./ScrollReveal";
import { useSiteContent } from "@/hooks/useSiteContent";

const Regulation = () => {
  const { t } = useSiteContent();
  const cards = [1, 2, 3, 4].map((i) => ({
    title: t(`regulation.card_${i}_title`),
    text: t(`regulation.card_${i}_text`),
  }));
  const apps = [1, 2, 3, 4, 5].map((i) => ({
    title: t(`regulation.app_${i}_title`),
    text: t(`regulation.app_${i}_text`),
  }));

  return (
    <section id="regulation" className="py-24 md:py-40 section-padding">
      <ScrollReveal>
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="editorial-divider mb-8" />
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            {t("regulation.subtitle")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-balance leading-tight">
            {t("regulation.title")}
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 mb-20 md:mb-28 max-w-6xl">
        <ScrollReveal delay={0.1} className="lg:col-span-7 lg:col-start-1">
          <p className="font-body text-lg md:text-xl text-foreground/85 leading-[1.7] mb-6">
            {t("regulation.body_1")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2} className="lg:col-span-6 lg:col-start-4">
          <p className="font-body text-base text-muted-foreground leading-[1.9] mb-6">
            {t("regulation.body_2")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3} className="lg:col-span-6 lg:col-start-4">
          <p className="font-body text-base text-muted-foreground leading-[1.9]">
            {t("regulation.body_3")}
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border max-w-6xl mb-24 md:mb-32">
        {cards.map((c, i) => (
          <ScrollReveal key={i} delay={i * 0.08} className="h-full">
            <div className="bg-background p-8 md:p-10 h-full flex flex-col group">
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-accent/80 mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg md:text-xl text-foreground mb-4 group-hover:text-accent transition-colors duration-500">
                {c.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {c.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="editorial-divider mb-8" />
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-6">
            {t("regulation.applications_title")}
          </h3>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            {t("regulation.applications_subtitle")}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 max-w-6xl">
        {apps.map((a, i) => (
          <ScrollReveal key={i} delay={i * 0.06}>
            <div className="group">
              <div className="w-6 h-px bg-accent/50 group-hover:w-16 transition-all duration-700 mb-5" />
              <h4 className="font-display text-lg md:text-xl text-foreground mb-3">
                {a.title}
              </h4>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm">
                {a.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Regulation;
