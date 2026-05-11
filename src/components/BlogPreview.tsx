import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";

type Post = {
  id: string; slug: string; title: string; description: string;
  post_type: string; external_url: string | null;
};

const typeLabels: Record<string, string> = {
  text: "מאמר", spotify: "פודקאסט", youtube: "וידאו", external: "קישור",
};

const BlogPreview = () => {
  const { t } = useSiteContent();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase.from("blog_posts").select("id,slug,title,description,post_type,external_url")
      .eq("status", "published").order("published_at", { ascending: false }).limit(5)
      .then(({ data }) => setPosts((data ?? []) as Post[]));
  }, []);

  return (
    <section className="py-24 md:py-40 section-padding bg-card">
      <ScrollReveal>
        <div className="mb-16 md:mb-24">
          <div className="editorial-divider mb-8" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t("blog.title", "כתיבה ומחשבות")}
          </h2>
        </div>
      </ScrollReveal>

      <div className="max-w-3xl">
        {posts.map((p, i) => {
          const isExternal = p.post_type === "external" && p.external_url;
          const inner = (
            <div className="border-t border-border/60 py-5 md:py-6 flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="font-body text-xs text-accent/60 tracking-widest min-w-[60px]">
                  {typeLabels[p.post_type] || ""}
                </span>
                <h3 className="font-body text-base md:text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                  {p.title}
                </h3>
              </div>
              <span className="font-body text-sm text-muted-foreground/40 group-hover:text-accent transition-colors duration-300">→</span>
            </div>
          );
          return (
            <ScrollReveal key={p.id} delay={i * 0.08}>
              {isExternal ? (
                <a href={p.external_url!} target="_blank" rel="noopener noreferrer">{inner}</a>
              ) : (
                <Link to={`/blog/${p.slug}`}>{inner}</Link>
              )}
            </ScrollReveal>
          );
        })}
        {posts.length > 0 && <div className="border-t border-border/60" />}
        {posts.length > 0 && (
          <Link to="/blog" className="inline-block mt-10 font-body text-sm text-muted-foreground hover:text-foreground">
            כל הכתיבה →
          </Link>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;
