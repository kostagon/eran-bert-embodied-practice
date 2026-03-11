import ScrollReveal from "./ScrollReveal";
import handsImage from "@/assets/hands-detail.jpg";

const Intro = () => {
  return (
    <section id="intro" className="py-24 md:py-40 section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Text — takes 7 cols */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <ScrollReveal>
            <div className="editorial-divider mb-8" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug mb-8 text-foreground">
              הקשר בין גוף לתודעה הוא לא רעיון — הוא חוויה
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
              במשך שנים של תרגול, הבנתי שמערכת העצבים היא המורה הגדול ביותר שלנו.
              תנועה, נשימה ולחימה הן לא רק כלים טכניים — הן דרך להקשיב לעצמנו,
              לווסת את הפנים, ולגלות יציבות שלא תלויה בנסיבות.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
              אני עובד עם אנשים שמחפשים עומק — אנשי ביצוע, מטפלים, מדריכים ואנשים
              שפשוט מבקשים לחזור הביתה, לגוף. העבודה הזו משלבת מסורות לחימה עתיקות
              עם הבנה מודרנית של טראומה, ויסות ומודעות גופנית.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <blockquote className="border-r-2 border-accent/40 pr-6 py-2">
              <p className="font-display text-xl md:text-2xl text-foreground/80 italic leading-relaxed">
                ״הניצחון האמיתי הוא הניצחון על עצמך״
              </p>
            </blockquote>
          </ScrollReveal>
        </div>

        {/* Image — takes 5 cols */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <ScrollReveal delay={0.2}>
            <div className="overflow-hidden">
              <img
                src={handsImage}
                alt="ידיים בתרגול — מודעות גופנית"
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
