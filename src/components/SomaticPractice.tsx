import ScrollReveal from "./ScrollReveal";
import { useSiteContent } from "@/hooks/useSiteContent";

const sections = [
  { title: "somatic.intro_title", text: "somatic.intro_text" },
  { title: "somatic.awareness_title", text: "somatic.awareness_text" },
  { title: "somatic.science_title", text: "somatic.science_text" },
  { title: "somatic.practice_title", text: "somatic.practice_text" },
  { title: "somatic.commitment_title", text: "somatic.commitment_text" },
  { title: "somatic.invitation_title", text: "somatic.invitation_text" },
];

const SomaticPractice = () => {
  const { t } = useSiteContent();

  return (
    <section id="somatic" className="py-24 md:py-40 section-padding bg-card">
      <ScrollReveal>
        <div className="max-w-2xl mb-16 md:mb-24">
          <div className="editorial-divider mb-8" />
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            {t("somatic.subtitle")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-balance leading-tight">
            {t("somatic.title")}
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-16 max-w-6xl">
        {sections.map((s, i) => (
          <ScrollReveal key={i} delay={(i % 2) * 0.1} className="lg:col-span-6">
            <article className="border-t border-border/60 pt-8">
              <span className="font-body text-xs text-muted-foreground/50 tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mt-3 mb-5 text-balance">
                {t(s.title)}
              </h3>
              <p className="font-body text-base text-muted-foreground leading-[1.9] max-w-lg whitespace-pre-line">
                {t(s.text)}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default SomaticPractice;
