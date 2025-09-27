import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PolaroidMemories from "@/components/PolaroidMemories";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

const Index = () => {
  const { memoryId } = useParams();
  
  // Monitor performance metrics
  usePerformanceMonitor();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Memories - College Fest Gallery",
    "description": "Vintage-inspired photo gallery for college fest memories",
    "url": "https://memories-app.lovable.app/",
    "mainEntity": {
      "@type": "ImageGallery",
      "name": "College Fest Photo Gallery",
      "description": "Collection of polaroid-style college fest memories"
    }
  };

  return (
    <>
      <SEOHead 
        title="Memories - Relive Your College Fest Moments | Retro Photo Gallery"
        description="Memories is a vintage-inspired web app for storing and browsing college fest photos. Discover polaroid-style memories, upcoming events, and relive your golden college moments."
        schemaData={schemaData}
      />
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <PolaroidMemories sharedMemoryId={memoryId} />
        <EventsSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
