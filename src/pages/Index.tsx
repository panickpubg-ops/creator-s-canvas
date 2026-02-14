import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CreativeControlSection from "@/components/CreativeControlSection";
import CreatorsFansSection from "@/components/CreatorsFansSection";
import PassionsBusinessSection from "@/components/PassionsBusinessSection";
import YourWorldSection from "@/components/YourWorldSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <CreativeControlSection />
        <CreatorsFansSection />
        <PassionsBusinessSection />
        <YourWorldSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
