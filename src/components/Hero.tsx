import { motion } from "framer-motion";
import heroImage from "@/assets/hero-movement.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/hooks/useLanguage";

const Hero = () => {
  const { t } = useSiteContent();
  const { isRTL } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-30 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-background/60" />
      </motion.div>

      <div className="relative z-10 section-padding w-full">
        <div className="max-w-4xl">
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 text-foreground text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl text-charcoal-light max-w-2xl mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.p
            className="font-body text-base text-muted-foreground max-w-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="flex flex-col gap-2 mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-sm md:text-base text-foreground/70 italic">
              {t("hero.quote_1")}
            </p>
            <p className="font-display text-sm md:text-base text-foreground/70 italic">
              {t("hero.quote_2")}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-foreground text-primary-foreground px-8 py-3.5 text-sm font-body tracking-wide hover:bg-charcoal-light transition-colors duration-300"
            >
              <span>{t("hero.cta_primary")}</span>
              <span aria-hidden>{isRTL ? "←" : "→"}</span>
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-3 border border-foreground/30 text-foreground px-8 py-3.5 text-sm font-body tracking-wide hover:border-foreground transition-colors duration-300"
            >
              {t("hero.cta_secondary")}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
