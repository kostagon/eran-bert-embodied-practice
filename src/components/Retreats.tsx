import ScrollReveal from "./ScrollReveal";
import retreatImage from "@/assets/retreat-space.jpg";

const Retreats = () => {
  return (
    <section className="py-24 md:py-40 overflow-hidden">
      {/* Full-width image */}
      <ScrollReveal>
        <div className="section-padding mb-16 md:mb-24">
          <div className="overflow-hidden">
            <img
              src={retreatImage}
              alt="מרחב ריטריט — שקט וטבע"
              className="w-full h-[300px] md:h-[500px] object-cover grayscale-[10%]"
            />
          </div>
        </div>
      </ScrollReveal>

      <div className="section-padding">
        <div className="max-w-3xl">
          <ScrollReveal>
            <div className="editorial-divider mb-8" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-8">
              ריטריטים
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              מרחב של מספר ימים לצלילה עמוקה — הרחק מהרעש.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-10 max-w-xl">
              הריטריטים שלי הם הזדמנות לעצירה אמיתית. שילוב של תרגול גופני,
              שקט, טבע, נשימה ועבודה פנימית. זה מרחב לאיפוס, לחידוש הקשר עם
              הגוף ולאינטגרציה של מה שהצטבר. לא בריחה מהמציאות — אלא חזרה אל עצמך.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-body text-sm text-muted-foreground/60">
              {["עומק", "שקט", "נשימה", "איפוס", "אינטגרציה", "גילום"].map((word, i) => (
                <span key={i}>{word}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Retreats;
