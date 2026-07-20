import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import listPrograms from "./tools/list-programs";
import getSiteContent from "./tools/get-site-content";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "eran-bert-mcp",
  title: "Eran Bert",
  version: "0.1.0",
  instructions:
    "Read-only tools for the Eran Bert site: browse published blog posts (writing, podcast, video, external links), read a single post's full markdown by slug, list training programs, and fetch bilingual site copy. Callers act as their signed-in user under the app's row-level security policies.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listBlogPosts, getBlogPost, listPrograms, getSiteContent],
});
