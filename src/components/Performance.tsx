import ScrollReveal from "./ScrollReveal";
import oceanImage from "@/assets/ocean-presence.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const Performance = () => {
  const { t } = useSiteContent();
  const audiences = [1, 2, 3, 4, 5].map((i) => t(`performance.aud_${i}`));

  return (
    <section className="py-24 md:py-40 section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-5">
          <ScrollReveal>
            <div className="overflow-hidden">
              <img
                src={oceanImage}
                alt={t("performance.title")}
                className="w-full h-[400px] md:h-[600px] object-cover grayscale-[20%]"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7">
          <ScrollReveal><div className="editorial-divider mb-8" /></ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              {t("performance.title")}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              {t("performance.body")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-3 mb-10">
              {audiences.map((a, i) => (
                <span
                  key={i}
                  className="font-body text-sm border border-border/80 text-muted-foreground px-4 py-2 hover:border-accent/40 hover:text-foreground transition-all duration-300"
                >
                  {a}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="font-body text-sm text-muted-foreground/70 max-w-md leading-relaxed">
              {t("performance.footnote")}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Performance;
