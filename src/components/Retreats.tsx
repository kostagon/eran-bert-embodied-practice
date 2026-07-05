import ScrollReveal from "./ScrollReveal";
import retreatImage from "@/assets/retreat-space.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const Retreats = () => {
  const { t } = useSiteContent();
  const words = [1, 2, 3, 4, 5, 6].map((i) => t(`retreats.word_${i}`));

  return (
    <section id="retreats" className="py-24 md:py-40 overflow-hidden">

      <ScrollReveal>
        <div className="section-padding mb-16 md:mb-24">
          <div className="overflow-hidden">
            <img
              src={retreatImage}
              alt={t("retreats.title")}
              className="w-full h-[300px] md:h-[500px] object-cover grayscale-[10%]"
            />
          </div>
        </div>
      </ScrollReveal>

      <div className="section-padding">
        <div className="max-w-3xl">
          <ScrollReveal><div className="editorial-divider mb-8" /></ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-8">
              {t("retreats.title")}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              {t("retreats.lead")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-10 max-w-xl">
              {t("retreats.body")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-body text-sm text-muted-foreground/60">
              {words.map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Retreats;
