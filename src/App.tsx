import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import { SiteContentProvider } from "@/hooks/useSiteContent";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import OAuthConsent from "./pages/OAuthConsent.tsx";
import AdminContent from "./pages/admin/AdminContent.tsx";
import AdminPrograms from "./pages/admin/AdminPrograms.tsx";
import AdminBlog from "./pages/admin/AdminBlog.tsx";
import BlogIndex, { BlogPostPage } from "./pages/Blog.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <SiteContentProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
                <Route path="/admin" element={<AdminContent />} />
                <Route path="/admin/programs" element={<AdminPrograms />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SiteContentProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
