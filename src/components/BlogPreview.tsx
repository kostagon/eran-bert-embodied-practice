import ScrollReveal from "./ScrollReveal";

const topics = [
  { title: "על תנועה ומודעות", tag: "תנועה" },
  { title: "לחימה כתרגול פנימי", tag: "לחימה" },
  { title: "ויסות רגשי דרך הגוף", tag: "ויסות" },
  { title: "גוף, תודעה והקשר ביניהם", tag: "סומטיקה" },
  { title: "חוסן בעידן של חוסר ודאות", tag: "חוסן" },
];

const BlogPreview = () => {
  return (
    <section className="py-24 md:py-40 section-padding bg-card">
      <ScrollReveal>
        <div className="mb-16 md:mb-24">
          <div className="editorial-divider mb-8" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            כתיבה ומחשבות
          </h2>
        </div>
      </ScrollReveal>

      <div className="max-w-3xl">
        {topics.map((topic, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="border-t border-border/60 py-5 md:py-6 flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="font-body text-xs text-accent/60 tracking-widest min-w-[60px]">
                  {topic.tag}
                </span>
                <h3 className="font-body text-base md:text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                  {topic.title}
                </h3>
              </div>
              <span className="font-body text-sm text-muted-foreground/40 group-hover:text-accent transition-colors duration-300">
                →
              </span>
            </div>
          </ScrollReveal>
        ))}
        <div className="border-t border-border/60" />
      </div>
    </section>
  );
};

export default BlogPreview;
