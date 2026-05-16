import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/hooks/useLanguage";

type Program = {
  id: string; title: string; short_description: string;
  image_url: string | null; external_url: string | null; sort_order: number;
};

const Programs = () => {
  const { t } = useSiteContent();
  const { isRTL } = useLanguage();
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    supabase
      .from("programs")
      .select("id,title,short_description,image_url,external_url,sort_order")
      .eq("status", "active")
      .order("sort_order")
      .then(({ data }) => setPrograms((data ?? []) as Program[]));
  }, []);

  return (
    <section id="programs" className="py-24 md:py-40 section-padding bg-card">
      <ScrollReveal>
        <div className="mb-16 md:mb-24">
          <div className="editorial-divider mb-8" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t("programs.title")}
          </h2>
          <p className="font-body text-base text-muted-foreground mt-4 max-w-lg">
            {t("programs.subtitle")}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {programs.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 0.1}>
            <div className="group">
              {p.image_url && (
                <div className="overflow-hidden mb-5 aspect-[4/3]">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <span className="font-body text-xs text-muted-foreground/60 tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl md:text-2xl text-foreground mt-3 mb-3 group-hover:text-accent transition-colors duration-300">
                {p.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {p.short_description}
              </p>
              {p.external_url && (
                <a
                  href={p.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 font-body text-xs tracking-widest text-accent hover:underline"
                >
                  <span>{t("programs.cta")}</span>
                  <span aria-hidden>{isRTL ? "←" : "→"}</span>
                </a>
              )}
              <div className="mt-6 w-8 h-px bg-border group-hover:w-16 group-hover:bg-accent/40 transition-all duration-700" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Programs;
