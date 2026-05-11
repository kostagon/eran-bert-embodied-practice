import ScrollReveal from "./ScrollReveal";
import { useSiteContent } from "@/hooks/useSiteContent";

const pillars = [
  {
    title: "איזון פנימי ושליטה עצמית",
    text: "לא שליטה מכוח כוח — אלא מתוך הקשבה. כמו במסורות הלחימה הפנימיות, השליטה האמיתית נולדת מוויתור על ההתנגדות ומכוונון עצמי מדויק של מערכת העצבים.",
  },
  {
    title: "נוכחות והקשבה",
    text: "נוכחות היא לא מושג מופשט — היא יכולת פיזיולוגית. דרך תרגול מבוסס גוף, אנו מפתחים את היכולת לשהות ברגע, להאזין מבפנים, ולהגיב ולא להגיב-יתר.",
  },
  {
    title: "גמישות ותנועה הרמונית",
    text: "תנועה הרמונית היא ביטוי של מערכת עצבים מווסתת. גמישות אמיתית היא לא רק פיזית — היא היכולת לנוע בין מצבים, להתאים, ולזרום עם מה שמגיע.",
  },
  {
    title: "חוסן, ויסות ומערכת העצבים",
    text: "חוסן הוא לא הקשחה — הוא גמישות עמוקה. עבודה סומטית מושכלת מלמדת את הגוף לווסת עוררות, לשמור על בהירות תחת לחץ, ולהתאושש מהר יותר.",
  },
];

const Philosophy = () => {
  const { t } = useSiteContent();
  return (
    <section id="philosophy" className="py-24 md:py-40 section-padding bg-card">
      <ScrollReveal>
        <div className="mb-16 md:mb-24">
          <div className="editorial-divider mb-8" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t("philosophy.title", "פילוסופיה")}
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {pillars.map((pillar, i) => (
          <ScrollReveal key={i} delay={i * 0.12}>
            <div className="bg-card p-8 md:p-12 lg:p-16 min-h-[280px] flex flex-col justify-between group">
              <div>
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-4 group-hover:text-accent transition-colors duration-500">
                  {pillar.title}
                </h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed max-w-md">
                  {pillar.text}
                </p>
              </div>
              <div className="mt-8 w-8 h-px bg-accent/30 group-hover:w-16 transition-all duration-700" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Philosophy;
