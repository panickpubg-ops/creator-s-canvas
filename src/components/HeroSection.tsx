import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import heroCollage1 from "@/assets/hero-collage-1.jpg";
import heroCollage2 from "@/assets/hero-collage-2.jpg";
import heroCollage3 from "@/assets/hero-collage-3.jpg";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";

const rotatingWords = ["podcasts", "creativity", "music", "art", "writing"];

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
        {/* Main background image — full bleed, slight zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroCollage1}
            alt="Creator podcasting"
            className="w-full h-full object-cover grayscale scale-110"
            loading="eager"
          />
        </div>
        {/* Floating overlapping polaroid-style cards */}
        <div className={cn(
          "absolute top-[12%] right-[-8%] w-[55%] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl rotate-6 border-[3px] border-primary-foreground/10 z-10 transition-all duration-700 ease-out",
          heroLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"
        )} style={{ transitionDelay: "200ms" }}>
          <img
            src={heroCollage2}
            alt="Artist creator"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className={cn(
          "absolute top-[6%] left-[-5%] w-[40%] aspect-square rounded-xl overflow-hidden shadow-2xl -rotate-12 border-[3px] border-primary-foreground/10 z-10 transition-all duration-700 ease-out",
          heroLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"
        )} style={{ transitionDelay: "500ms" }}>
          <img
            src={heroCollage3}
            alt="Musician creator"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        {/* Heavy cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/20 z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent z-20" />
      </div>

      {/* ===== DESKTOP: Original parallax collage grid ===== */}
      <div className="absolute inset-0 hidden sm:grid grid-cols-3 gap-1 opacity-70">
        <div className="relative overflow-hidden">
          <img
            src={heroCollage1}
            alt="Creator podcasting"
            className="w-full h-full object-cover grayscale transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${offset * 0.6}px) scale(1.1)` }}
            loading="eager"
          />
        </div>
        <div className="relative overflow-hidden flex flex-col gap-1">
          <div className="flex-1 overflow-hidden">
            <img
              src={heroCollage2}
              alt="Artist creator"
              className="w-full h-full object-cover grayscale transition-transform duration-100 ease-out"
              style={{ transform: `translateY(${offset * -0.4}px) scale(1.1)` }}
              loading="eager"
            />
          </div>
        </div>
        <div className="relative overflow-hidden">
          <img
            src={heroCollage3}
            alt="Musician creator"
            className="w-full h-full object-cover transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${offset * 0.8}px) scale(1.1)` }}
            loading="eager"
          />
          <div className="absolute inset-0 flex items-start justify-end p-6">
            <div className="text-right">
              <p className="font-sans text-xs text-primary-foreground/60 max-w-[200px] leading-relaxed">
                Join the creators who are building something real, on their own terms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/30 hidden sm:block" />

      {/* Bottom content */}
      <div className="relative z-30 min-h-screen flex flex-col justify-end pb-10 sm:pb-20 md:pb-28">
        <div className="container max-w-7xl mx-auto px-5 sm:px-6">
          {/* Mobile: tagline badge above headline */}
          <div className={cn("sm:hidden mb-4 transition-all duration-700 ease-out", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{ transitionDelay: "700ms" }}>
            <span className="inline-block font-sans text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50 border border-primary-foreground/15 rounded-full px-3 py-1.5 backdrop-blur-sm bg-primary-foreground/5">
              For creators, by creators
            </span>
          </div>
          <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground/60 mb-3 sm:mb-4 animate-bounce hidden sm:block" />
          <h1 className={cn(
            "font-serif text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] font-bold text-primary-foreground leading-[0.85] sm:leading-[0.9] transition-all duration-700 ease-out",
            heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )} style={{ transitionDelay: "900ms" }}>
            Where
            <br />
            <span
              className={`inline-block transition-all duration-400 text-primary ${
                isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              {rotatingWords[wordIndex]}
            </span>{" "}
            <span className="italic font-light">grow</span>
          </h1>
          {/* Mobile-only subtitle */}
          <p className={cn("sm:hidden font-sans text-sm text-primary-foreground/50 mt-5 max-w-[260px] leading-relaxed transition-all duration-700 ease-out", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{ transitionDelay: "1100ms" }}>
            The platform where creators own their audience, their content, and their revenue.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
