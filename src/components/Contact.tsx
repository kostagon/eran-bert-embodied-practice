import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — connect to backend
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-24 md:py-40 section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <ScrollReveal>
            <div className="editorial-divider mb-8" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              צור קשר
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
              לאימון אישי, סדנאות, הכשרות או שיתופי פעולה — אשמח לשמוע.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <a
              href="mailto:info@eranbert.com"
              className="font-body text-sm text-foreground/70 hover:text-accent transition-colors duration-300"
            >
              info@eranbert.com
            </a>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="font-body text-xs text-muted-foreground tracking-wide mb-2 block">שם</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-body text-foreground transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground tracking-wide mb-2 block">אימייל</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-body text-foreground transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground tracking-wide mb-2 block">הודעה</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-body text-foreground resize-none transition-colors duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="self-start bg-foreground text-primary-foreground px-8 py-3.5 text-sm font-body tracking-wide hover:bg-charcoal-light transition-colors duration-300 mt-4"
            >
              שליחה
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
