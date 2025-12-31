import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Sidebar from "@/components/Sidebar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SplineBackground from "@/components/SplineBackground";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      {/* Fixed Spline Background */}
      <SplineBackground />
      
      {/* Content Layer */}
      <main className="min-h-screen relative z-10 lg:pr-64">
        <Sidebar />
        <div className="fixed top-6 right-6 sm:right-8 lg:right-12 z-50">
          <LanguageSwitcher />
        </div>
      <Hero />
      <BentoGrid />
      <Timeline />
      <Skills />
        <Certificates />
      <Contact />
        <ScrollToTop />
    </main>
    </>
  );
}

