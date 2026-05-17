import { useEffect, useMemo, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/hooks/useLanguage";
import ScrollReveal from "./ScrollReveal";

type PostType = "text" | "spotify" | "youtube" | "external";
type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  post_type: PostType;
  content: string | null;
  embed_url: string | null;
  external_url: string | null;
  cover_image_url: string | null;
  published_at: string;
};

const ytId = (url: string) => url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];
const spotifyEmbed = (url: string) => url.replace("open.spotify.com/", "open.spotify.com/embed/");

const ALL: PostType[] = ["text", "spotify", "youtube", "external"];

const BlogShowcase = () => {
  const { t } = useSiteContent();
  const { isRTL, lang } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<PostType | "all">("all");
  const [openPost, setOpenPost] = useState<Post | null>(null);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id,slug,title,description,post_type,content,embed_url,external_url,cover_image_url,published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(12)
      .then(({ data }) => setPosts((data ?? []) as Post[]));
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? posts : posts.filter((p) => p.post_type === filter)),
    [posts, filter]
  );

  // Embla — direction-aware
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    direction: isRTL ? "rtl" : "ltr",
    loop: false,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!embla) return;
    const update = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    update();
    embla.on("select", update);
    embla.on("reInit", update);
  }, [embla, visible.length]);

  // Re-init on direction/filter change
  useEffect(() => {
    embla?.reInit({ direction: isRTL ? "rtl" : "ltr" });
  }, [embla, isRTL, filter]);

  const dateFmt = (d: string) =>
    new Date(d).toLocaleDateString(lang === "en" ? "en-GB" : "he-IL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <section id="writing" className="py-24 md:py-40 bg-card overflow-hidden">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12 md:mb-16 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="editorial-divider mb-8" />
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground text-balance">
                {t("blog.title")}
              </h2>
              <p className="font-body text-base md:text-lg text-muted-foreground mt-6 max-w-xl">
                {t("blog.subtitle")}
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {(["all", ...ALL] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`font-body text-xs tracking-widest uppercase transition-colors duration-300 pb-1 border-b ${
                      filter === f
                        ? "text-foreground border-accent"
                        : "text-muted-foreground/60 border-transparent hover:text-foreground"
                    }`}
                  >
                    {f === "all" ? t("blog.filter_all") : t(`blog.type.${f}`)}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="section-padding font-body text-muted-foreground">{t("blog.empty")}</p>
      ) : (
        <>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex section-padding gap-6 md:gap-8">
              {visible.map((p) => (
                <ArticleCard
                  key={p.id}
                  post={p}
                  onOpen={() => setOpenPost(p)}
                  dateLabel={dateFmt(p.published_at)}
                  typeLabel={t(`blog.type.${p.post_type}`)}
                  cta={
                    p.post_type === "text"
                      ? t("blog.read")
                      : p.post_type === "spotify"
                      ? t("blog.listen")
                      : p.post_type === "youtube"
                      ? t("blog.watch")
                      : t("blog.open")
                  }
                />
              ))}
            </div>
          </div>

          <div className="section-padding mt-12 flex items-center justify-between gap-6">
            <div className="font-body text-xs text-muted-foreground/60 tracking-widest">
              {visible.length.toString().padStart(2, "0")} / {posts.length.toString().padStart(2, "0")}
            </div>
            <div className="flex items-center gap-3">
              <CarouselNav
                label={t("blog.prev")}
                disabled={!canPrev}
                onClick={() => embla?.scrollPrev()}
                arrow={isRTL ? "→" : "←"}
              />
              <CarouselNav
                label={t("blog.next")}
                disabled={!canNext}
                onClick={() => embla?.scrollNext()}
                arrow={isRTL ? "←" : "→"}
              />
            </div>
          </div>
        </>
      )}

      <ArticleModal post={openPost} onClose={() => setOpenPost(null)} t={t} dateFmt={dateFmt} />
    </section>
  );
};

const CarouselNav = ({
  label, disabled, onClick, arrow,
}: { label: string; disabled: boolean; onClick: () => void; arrow: string }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className="w-11 h-11 inline-flex items-center justify-center border border-border text-foreground hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300"
  >
    <span aria-hidden className="font-body text-base">{arrow}</span>
  </button>
);

const ArticleCard = ({
  post, onOpen, dateLabel, typeLabel, cta,
}: {
  post: Post; onOpen: () => void;
  dateLabel: string; typeLabel: string; cta: string;
}) => {
  const isExternal = post.post_type === "external" && post.external_url;
  const handleClick = () => {
    if (isExternal) window.open(post.external_url!, "_blank", "noopener");
    else onOpen();
  };

  return (
    <article
      className="group shrink-0 cursor-pointer flex flex-col basis-[82%] sm:basis-[55%] md:basis-[42%] lg:basis-[32%]"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden bg-background aspect-[4/5] mb-5">
        {post.cover_image_url ? (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover grayscale-[15%] group-hover:scale-[1.04] group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary/40 to-card flex items-center justify-center">
            <span className="font-display text-foreground/20 text-6xl">—</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute top-4 start-4 font-body text-[10px] tracking-[0.25em] uppercase text-foreground bg-background/85 backdrop-blur-sm px-3 py-1.5">
          {typeLabel}
        </span>
      </div>

      <div className="flex items-center gap-3 font-body text-xs text-muted-foreground/70 tracking-widest mb-3">
        <span>{dateLabel}</span>
      </div>

      <h3 className="font-display text-foreground group-hover:text-accent transition-colors duration-300 text-balance text-xl md:text-2xl leading-snug line-clamp-2 min-h-[3.5rem]">
        {post.title}
      </h3>

      <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2 min-h-[2.75rem]">
        {post.description || "\u00A0"}
      </p>

      <span className="inline-flex items-center gap-2 mt-5 font-body text-xs tracking-widest uppercase text-foreground/70 group-hover:text-accent transition-colors duration-300 mt-auto pt-5">
        {cta}
        <span className="block w-6 h-px bg-current group-hover:w-12 transition-all duration-500" />
      </span>
    </article>
  );
};

const ArticleModal = ({
  post, onClose, t, dateFmt,
}: {
  post: Post | null;
  onClose: () => void;
  t: (k: string, f?: string) => string;
  dateFmt: (d: string) => string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    scrollRef.current?.scrollTo({ top: 0 });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            ref={scrollRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 overflow-y-auto"
          >
            <div className="min-h-full section-padding py-16 md:py-24">
              <div className="max-w-3xl mx-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
                  aria-label={t("blog.close")}
                >
                  <span aria-hidden>×</span>
                  <span>{t("blog.close")}</span>
                </button>

                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-accent">
                  {t(`blog.type.${post.post_type}`)}
                </span>
                <h2 className="font-display text-3xl md:text-5xl text-foreground mt-4 mb-5 text-balance leading-tight">
                  {post.title}
                </h2>
                <p className="font-body text-xs text-muted-foreground/70 tracking-widest mb-10">
                  {dateFmt(post.published_at)}
                </p>

                {post.cover_image_url && (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full max-h-[60vh] object-cover mb-12 grayscale-[10%]"
                  />
                )}

                {post.description && (
                  <p className="font-display text-lg md:text-2xl text-foreground/80 leading-relaxed mb-12 italic">
                    {post.description}
                  </p>
                )}

                {post.post_type === "text" && post.content && (
                  <div className="font-body text-base md:text-lg text-foreground/90 leading-[1.9] whitespace-pre-wrap max-w-2xl">
                    {post.content}
                  </div>
                )}

                {post.post_type === "spotify" && post.embed_url && (
                  <iframe
                    src={spotifyEmbed(post.embed_url)}
                    className="w-full"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={post.title}
                  />
                )}

                {post.post_type === "youtube" && post.embed_url && (
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId(post.embed_url) || ""}`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={post.title}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogShowcase;
