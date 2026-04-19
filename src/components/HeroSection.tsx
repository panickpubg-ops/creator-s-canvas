import { useState, useEffect } from "react";
import { ChevronDown, Heart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroCollage1 from "@/assets/hero-collage-1.jpg";
import heroCollage2 from "@/assets/hero-collage-2.jpg";
import heroCollage3 from "@/assets/hero-collage-3.jpg";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";

const rotatingWords = ["Ummah", "community", "neighbours", "people"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { ref: parallaxRef, offset } = useParallax(0.4);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={parallaxRef} className="relative bg-dark min-h-screen overflow-hidden">
      {/* ===== MOBILE: Dramatic overlapping mosaic ===== */}
      <div className="absolute inset-0 sm:hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroCollage1}
            alt="Community giving"
            className="w-full h-full object-cover grayscale scale-110"
            loading="eager"
          />
        </div>
        <div className={cn(
          "absolute top-[10%] right-[-8%] w-[55%] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl rotate-6 border-[3px] border-primary-foreground/10 z-10 transition-all duration-700 ease-out",
          heroLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"
        )} style={{ transitionDelay: "200ms" }}>
          <img src={heroCollage2} alt="Charity work" className="w-full h-full object-cover" loading="eager" />
        </div>
        <div className={cn(
          "absolute top-[5%] left-[-5%] w-[38%] aspect-square rounded-xl overflow-hidden shadow-2xl -rotate-12 border-[3px] border-primary-foreground/10 z-10 transition-all duration-700 ease-out",
          heroLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"
        )} style={{ transitionDelay: "500ms" }}>
          <img src={heroCollage3} alt="Volunteers" className="w-full h-full object-cover" loading="eager" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/75 to-dark/30 z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/50 to-transparent z-20" />
      </div>

      {/* ===== DESKTOP: Parallax collage grid ===== */}
      <div className="absolute inset-0 hidden sm:grid grid-cols-3 gap-1 opacity-70">
        <div className="relative overflow-hidden">
          <img
            src={heroCollage1}
            alt="Community giving"
            className="w-full h-full object-cover grayscale transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${offset * 0.6}px) scale(1.1)` }}
            loading="eager"
          />
        </div>
        <div className="relative overflow-hidden">
          <img
            src={heroCollage2}
            alt="Charity work"
            className="w-full h-full object-cover grayscale transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${offset * -0.4}px) scale(1.1)` }}
            loading="eager"
          />
        </div>
        <div className="relative overflow-hidden">
          <img
            src={heroCollage3}
            alt="Volunteers"
            className="w-full h-full object-cover transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${offset * 0.8}px) scale(1.1)` }}
            loading="eager"
          />
        </div>
      </div>

      {/* Cinematic overlay (desktop) */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/30 hidden sm:block" />

      {/* ===== Top floating trust badge ===== */}
      <div className={cn(
        "absolute top-24 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 ease-out",
        heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      )} style={{ transitionDelay: "400ms" }}>
        <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.18em] text-primary-foreground/90 font-medium">
            100% goes to charity
          </span>
        </div>
      </div>

      {/* ===== Bottom content ===== */}
      <div className="relative z-30 min-h-screen flex flex-col justify-end pb-12 sm:pb-20 md:pb-28">
        <div className="container max-w-7xl mx-auto px-5 sm:px-6">
          {/* Mobile: kicker */}
          <div className={cn("sm:hidden mb-4 transition-all duration-700 ease-out", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{ transitionDelay: "700ms" }}>
            <span className="inline-block font-sans text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60 border border-primary-foreground/15 rounded-full px-3 py-1.5 backdrop-blur-sm bg-primary-foreground/5">
              The donation platform with zero fees
            </span>
          </div>

          <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground/60 mb-3 sm:mb-4 animate-bounce hidden sm:block" />

          {/* Headline — fluid sizing prevents word overlap */}
          <h1 className={cn(
            "font-serif font-bold text-primary-foreground leading-[0.9] transition-all duration-700 ease-out",
            // Fluid clamp avoids overlap between word swaps + container width
            "text-[clamp(2.75rem,11vw,8.5rem)]",
            heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )} style={{ transitionDelay: "900ms" }}>
            Back your{" "}
            <span
              className={`inline-block transition-all duration-400 text-primary ${
                isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              {rotatingWords[wordIndex]}
            </span>
            <br />
            <span className="italic font-light text-primary-foreground/95">with every penny.</span>
          </h1>

          {/* Subhead — visible on all viewports */}
          <p className={cn(
            "font-sans text-sm sm:text-base md:text-lg text-primary-foreground/70 mt-5 sm:mt-7 max-w-[280px] sm:max-w-xl leading-relaxed transition-all duration-700 ease-out",
            heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "1100ms" }}>
            Bakking is the donation platform built for the Ummah. Give to vetted charities — Zakat, Fitrana, Fidya & more — and{" "}
            <span className="text-primary-foreground font-semibold">100% reaches those in need.</span> We don't take a cut.
          </p>

          {/* CTAs */}
          <div className={cn(
            "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-7 sm:mt-9 transition-all duration-700 ease-out",
            heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "1300ms" }}>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 font-sans font-semibold shadow-lg shadow-primary/20">
              <Link to="/charities">
                <Heart className="h-4 w-4 mr-1" />
                Donate now
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-6 h-12 font-sans font-medium border border-primary-foreground/20 backdrop-blur-sm">
              <Link to="/campaigns">Browse campaigns</Link>
            </Button>
          </div>

          {/* Social proof strip */}
          <div className={cn(
            "flex flex-wrap items-center gap-x-6 gap-y-2 mt-7 sm:mt-10 transition-all duration-700 ease-out",
            heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "1500ms" }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {[heroCollage1, heroCollage2, heroCollage3].map((src, i) => (
                  <div key={i} className="h-7 w-7 rounded-full border-2 border-dark overflow-hidden bg-muted">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="font-sans text-xs text-primary-foreground/70">
                <span className="font-semibold text-primary-foreground">12,400+</span> donors this week
              </span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-primary-foreground/20" />
            <span className="font-sans text-xs text-primary-foreground/70">
              <span className="font-semibold text-primary-foreground">£2.4M</span> raised for vetted UK charities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
