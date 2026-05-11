import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useSiteContent } from "@/hooks/useSiteContent";

const services = [
  {
    title: "אימון אישי",
    description: "מסלול אימון מותאם אישית המשלב תנועה, נשימה ועבודה סומטית. לפיתוח חוסן גופני ורגשי, ויסות מערכת העצבים ומודעות עצמית מעמיקה.",
  },
  {
    title: "סדנאות קבוצתיות",
    description: "סדנאות חוויתיות המשלבות אומנויות לחימה, תרגול סומטי ועבודת מודעות. מותאמות לקבוצות מקצועיות, ארגונים וקהילות.",
  },
  {
    title: "הכשרות מקצועיות",
    description: "תוכניות הכשרה למדריכים, מטפלים ואנשי מקצוע המבקשים לשלב גישות גופניות בעבודתם. מבוססות על ידע סומטי, מסורות לחימה ומחקר עדכני.",
  },
  {
    title: "הרצאות וקורסים",
    description: "הרצאות מעוררות השראה וקורסים מובנים בנושאי גוף-נפש, ויסות רגשי, חוסן ומנהיגות מגולמת. לכנסים, ארגונים ומוסדות.",
  },
  {
    title: "ריטריטים",
    description: "חוויות צלילה עמוקות של מספר ימים, המשלבות תרגול, שקט, טבע ועבודה פנימית. מרחב לאיפוס, חידוש ואינטגרציה.",
  },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useSiteContent();

  return (
    <section id="services" className="py-24 md:py-40 section-padding">
      <ScrollReveal>
        <div className="mb-16 md:mb-24">
          <div className="editorial-divider mb-8" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t("services.title", "שירותים")}
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
              <div className="flex items-center justify-between py-6 md:py-8">
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-foreground group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <span className="text-muted-foreground text-2xl transition-transform duration-300"
                  style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
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
