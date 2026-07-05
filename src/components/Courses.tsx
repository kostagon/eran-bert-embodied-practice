import ScrollReveal from "./ScrollReveal";
import { useSiteContent } from "@/hooks/useSiteContent";

const Courses = () => {
  const { t } = useSiteContent();
  const courses = [1, 2, 3, 4, 5].map((i) => ({
    title: t(`courses.c${i}_title`),
    text: t(`courses.c${i}_text`),
  }));

  return (
    <section id="courses" className="py-24 md:py-40 section-padding">
      <ScrollReveal>
        <div className="mb-16 md:mb-24 max-w-2xl">
          <div className="editorial-divider mb-8" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            {t("courses.title")}
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("courses.subtitle")}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14 lg:gap-x-20 max-w-6xl">
        {courses.map((c, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <article className="group">
              <span className="font-body text-xs text-muted-foreground/60 tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl md:text-2xl text-foreground mt-3 mb-4 group-hover:text-accent transition-colors duration-500">
                {c.title}
              </h3>
              <p className="font-body text-base text-muted-foreground leading-relaxed max-w-lg">
                {c.text}
              </p>
              <div className="mt-6 w-8 h-px bg-border group-hover:w-20 group-hover:bg-accent/40 transition-all duration-700" />
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Courses;
