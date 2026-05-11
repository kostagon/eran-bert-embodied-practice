import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

type Post = {
  id: string; slug: string; title: string; description: string;
  post_type: string; content: string; embed_url: string | null;
  external_url: string | null; cover_image_url: string | null;
  published_at: string;
};

const ytId = (url: string) => {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m?.[1];
};
const spotifyEmbed = (url: string) => url.replace("open.spotify.com/", "open.spotify.com/embed/");

export const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle()
      .then(({ data }) => { setPost(data as Post | null); setLoading(false); });
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">טוען...</div>;
  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 section-padding">
      <h1 className="font-display text-3xl">פוסט לא נמצא</h1>
      <Link to="/blog" className="font-body text-sm underline">חזרה לכתיבה</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="pt-32 pb-24 section-padding">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="font-body text-xs text-muted-foreground hover:text-foreground">← כתיבה</Link>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mt-8 mb-6">{post.title}</h1>
          <p className="font-body text-xs text-muted-foreground tracking-widest mb-10">
            {new Date(post.published_at).toLocaleDateString("he-IL")}
          </p>

          {post.cover_image_url && (
            <img src={post.cover_image_url} alt={post.title} className="w-full h-[400px] object-cover mb-10 grayscale-[10%]" />
          )}

          {post.description && (
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10">{post.description}</p>
          )}

          {post.post_type === "text" && (
            <div className="font-body text-base text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</div>
          )}

          {post.post_type === "spotify" && post.embed_url && (
            <iframe src={spotifyEmbed(post.embed_url)} className="w-full" height="352" frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
          )}

          {post.post_type === "youtube" && post.embed_url && ytId(post.embed_url) && (
            <div className="aspect-video">
              <iframe src={`https://www.youtube.com/embed/${ytId(post.embed_url)}`} className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
          )}

          {post.post_type === "external" && post.external_url && (
            <a href={post.external_url} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-foreground text-primary-foreground px-8 py-3.5 text-sm font-body">
              פתח/י קישור →
            </a>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
};

const BlogIndex = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("status", "published").order("published_at", { ascending: false })
      .then(({ data }) => setPosts((data ?? []) as Post[]));
  }, []);

  const renderItem = (p: Post) => {
    const isExternal = p.post_type === "external" && p.external_url;
    const href = isExternal ? p.external_url! : `/blog/${p.slug}`;
    const target = isExternal ? "_blank" : undefined;
    const TypeBadge = ({ children }: { children: string }) => (
      <span className="font-body text-xs text-accent/70 tracking-widest">{children}</span>
    );
    const typeLabel = { text: "מאמר", spotify: "פודקאסט", youtube: "וידאו", external: "קישור" }[p.post_type] || "";

    return (
      <a key={p.id} href={href} target={target} rel={target ? "noopener noreferrer" : undefined}
        className="group block border-t border-border/60 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-2"><TypeBadge>{typeLabel}</TypeBadge></div>
          <div className="md:col-span-7">
            <h2 className="font-display text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors">{p.title}</h2>
            {p.description && <p className="font-body text-sm text-muted-foreground mt-2">{p.description}</p>}
          </div>
          <div className="md:col-span-3 text-left md:text-right">
            <span className="font-body text-xs text-muted-foreground/60">
              {new Date(p.published_at).toLocaleDateString("he-IL")}
            </span>
          </div>
        </div>
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 section-padding">
        <ScrollReveal>
          <div className="mb-16">
            <div className="editorial-divider mb-8" />
            <h1 className="font-display text-4xl md:text-5xl text-foreground">כתיבה ופודקאסטים</h1>
          </div>
        </ScrollReveal>
        <div className="max-w-5xl">
          {posts.map(renderItem)}
          {posts.length > 0 && <div className="border-t border-border/60" />}
          {posts.length === 0 && <p className="font-body text-muted-foreground">אין פוסטים זמינים כרגע.</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogIndex;
