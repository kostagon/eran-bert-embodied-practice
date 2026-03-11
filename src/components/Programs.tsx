import ScrollReveal from "./ScrollReveal";

const programs = [
  {
    title: "אמנות הלחימה הרגישה",
    subtitle: "שילוב מסורות לחימה עם מודעות סומטית",
  },
  {
    title: "ויסות דרך תנועה",
    subtitle: "כלים גופניים לוויסות מערכת העצבים",
  },
  {
    title: "תרגול רגיש טראומה",
    subtitle: "גישה מותאמת לעבודה עם טראומה דרך הגוף",
  },
  {
    title: "ניהול מתח וחשיבה אסטרטגית",
    subtitle: "תרגול לביצועים תחת לחץ",
  },
  {
    title: "הכשרות למדריכים ואנשי טיפול",
    subtitle: "כלים מעשיים לשילוב הגוף בעבודה מקצועית",
  },
];

const Programs = () => {
  return (
    <section id="programs" className="py-24 md:py-40 section-padding bg-card">
      <ScrollReveal>
        <div className="mb-16 md:mb-24">
          <div className="editorial-divider mb-8" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            תוכניות והכשרות
          </h2>
          <p className="font-body text-base text-muted-foreground mt-4 max-w-lg">
            תוכניות נבחרות, כל אחת מעוצבת בקפידה כדי לתת מענה לצורך ייחודי.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {programs.map((program, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="group">
              <span className="font-body text-xs text-muted-foreground/60 tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl md:text-2xl text-foreground mt-3 mb-3 group-hover:text-accent transition-colors duration-300">
                {program.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {program.subtitle}
              </p>
              <div className="mt-6 w-8 h-px bg-border group-hover:w-16 group-hover:bg-accent/40 transition-all duration-700" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Programs;
