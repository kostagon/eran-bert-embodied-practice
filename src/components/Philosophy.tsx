import ScrollReveal from "./ScrollReveal";
import { useSiteContent } from "@/hooks/useSiteContent";

const Philosophy = () => {
  const { t } = useSiteContent();

  const pillars = [1, 2, 3, 4].map((i) => ({
    title: t(`philosophy.pillar_${i}_title`),
    text: t(`philosophy.pillar_${i}_text`),
  }));

  return (
    <section id="philosophy" className="py-24 md:py-40 section-padding bg-card">
      <ScrollReveal>
        <div className="mb-16 md:mb-24 max-w-2xl">
          <div className="editorial-divider mb-8" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            {t("philosophy.title")}
          </h2>
          <p className="font-display text-lg md:text-xl text-foreground/70 italic leading-relaxed">
            {t("philosophy.lead")}
          </p>
        </div>
      </ScrollReveal>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border items-stretch">
        {pillars.map((pillar, i) => (
          <ScrollReveal key={i} delay={i * 0.12} className="h-full">
            <div className="bg-card p-8 md:p-12 lg:p-16 min-h-[280px] h-full flex flex-col group">
              <div className="flex-1">
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-4 group-hover:text-accent transition-colors duration-500">
                  {pillar.title}
                </h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed max-w-md whitespace-pre-line">
                  {pillar.text}
                </p>

              </div>
              <div className="mt-8 w-8 h-px bg-accent/30 group-hover:w-16 transition-all duration-700 shrink-0" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Philosophy;
