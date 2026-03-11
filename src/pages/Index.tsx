import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import Programs from "@/components/Programs";
import Performance from "@/components/Performance";
import Retreats from "@/components/Retreats";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Intro />
      <Philosophy />
      <Services />
      <Programs />
      <Performance />
      <Retreats />
      <BlogPreview />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
