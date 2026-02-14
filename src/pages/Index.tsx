import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CreativityFandomSection from "@/components/CreativityFandomSection";
import TestimonialSection from "@/components/TestimonialSection";
import CreativeControlSection from "@/components/CreativeControlSection";
import CreatorsFansSection from "@/components/CreatorsFansSection";
import PassionsBusinessSection from "@/components/PassionsBusinessSection";
import YourWorldSection from "@/components/YourWorldSection";
import SignUpSection from "@/components/SignUpSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <CreativityFandomSection />
        <TestimonialSection />
        <CreativeControlSection />
        <CreatorsFansSection />
        <PassionsBusinessSection />
        <YourWorldSection />
        <SignUpSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
