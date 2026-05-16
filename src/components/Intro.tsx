import ScrollReveal from "./ScrollReveal";
import handsImage from "@/assets/hands-detail.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const Intro = () => {
  const { t } = useSiteContent();

  return (
    <section id="intro" className="py-24 md:py-40 section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <ScrollReveal>
            <div className="editorial-divider mb-8" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug mb-8 text-foreground text-balance">
              {t("intro.title")}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
              {t("intro.body_1")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
              {t("intro.body_2")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <blockquote className="border-s-2 border-accent/40 ps-6 py-2">
              <p className="font-display text-xl md:text-2xl text-foreground/80 italic leading-relaxed">
                {t("intro.quote")}
              </p>
            </blockquote>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <ScrollReveal delay={0.2}>
            <div className="overflow-hidden">
              <img
                src={handsImage}
                alt={t("intro.title")}
                className="w-full h-[400px] md:h-[550px] object-cover grayscale-[20%]"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Intro;
