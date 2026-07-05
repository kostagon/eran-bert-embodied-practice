import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import Courses from "@/components/Courses";
import SomaticPractice from "@/components/SomaticPractice";
import Regulation from "@/components/Regulation";
import Programs from "@/components/Programs";
import Performance from "@/components/Performance";
import BlogShowcase from "@/components/BlogShowcase";
import Retreats from "@/components/Retreats";
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
      <Courses />
      <SomaticPractice />
      <Regulation />
      <Performance />
      <Programs />
      <BlogShowcase />
      <Retreats />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

