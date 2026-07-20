import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description: "List blog posts (writing, podcast, video, external link) from the Eran Bert site. Returns id, slug, title, description, post_type, status, published_at.",
  inputSchema: {
    status: z.enum(["published", "draft", "all"]).optional().describe("Filter by status. Defaults to 'published'."),
    limit: z.number().int().min(1).max(100).optional().describe("Max rows. Default 50."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const sb = supabaseForUser(ctx);
    let q = sb.from("blog_posts")
      .select("id,slug,title,description,post_type,status,published_at,cover_image_url,external_url,embed_url")
      .order("published_at", { ascending: false })
      .limit(limit ?? 50);
    if (!status || status === "published") q = q.eq("status", "published");
    else if (status === "draft") q = q.eq("status", "draft");
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: { posts: data } };
  },
});
