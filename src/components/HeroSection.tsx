import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import heroCollage1 from "@/assets/hero-collage-1.jpg";
import heroCollage2 from "@/assets/hero-collage-2.jpg";
import heroCollage3 from "@/assets/hero-collage-3.jpg";
import { useParallax } from "@/hooks/useParallax";

const rotatingWords = ["podcasts", "creativity", "music", "art", "writing"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref: parallaxRef, offset } = useParallax(0.4);

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
      {/* Image collage grid with parallax */}
      <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 gap-1 opacity-70">
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
        <div className="relative overflow-hidden hidden sm:block">
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

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/30" />

      {/* Bottom content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-16 sm:pb-20 md:pb-28">
        <div className="container max-w-7xl mx-auto px-5 sm:px-6">
          <div>
            <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground/60 mb-3 sm:mb-4 animate-bounce" />
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] font-bold text-primary-foreground leading-[0.9]">
              Where
              <br />
              <span
                className={`inline-block transition-all duration-400 ${
                  isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
                }`}
              >
                {rotatingWords[wordIndex]}
              </span>{" "}
              <span className="italic">grow</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
