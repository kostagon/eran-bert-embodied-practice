import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useSiteContent } from "@/hooks/useSiteContent";

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useSiteContent();

  const services = [1, 2, 3, 4, 5].map((i) => ({
    title: t(`services.s${i}_title`),
    description: t(`services.s${i}_text`),
  }));

  return (
    <section id="services" className="py-24 md:py-40 section-padding">
      <ScrollReveal>
        <div className="mb-16 md:mb-24">
          <div className="editorial-divider mb-8" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t("services.title")}
          </h2>
        </div>
      </ScrollReveal>

      <div className="max-w-4xl">
        {services.map((service, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div
              className="border-t border-border/60 cursor-pointer group"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between py-6 md:py-8 gap-4">
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-foreground group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <span
                  className="text-muted-foreground text-2xl transition-transform duration-300 shrink-0"
                  style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden
                >
                  +
                </span>
              </div>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-base text-muted-foreground leading-relaxed pb-8 max-w-lg">
                      {service.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        ))}
        <div className="border-t border-border/60" />
      </div>
    </section>
  );
};

export default Services;
