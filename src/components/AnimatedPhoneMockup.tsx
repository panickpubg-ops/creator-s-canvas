import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AnimatedPhoneMockupProps {
  images: string[];
  alt: string;
  className?: string;
  badge?: string;
  interval?: number;
}

const AnimatedPhoneMockup = ({
  images,
  alt,
  className,
  badge,
  interval = 3000,
}: AnimatedPhoneMockupProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || images.length <= 1) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }, interval);
    return () => clearInterval(timer);
  }, [isVisible, images.length, interval]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="phone-mockup hover-tilt">
        <div className="phone-mockup-inner relative overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={alt}
            className={cn(
              "w-full transition-all duration-500",
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            )}
            loading="lazy"
          />
          {/* Simulated touch indicator */}
          {isVisible && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground/20 animate-pulse" />
          )}
        </div>
      </div>
      {badge && (
        <Badge className="absolute -top-2 -right-2 bg-accent-red text-primary-foreground border-0 shadow-lg animate-badge-pop z-30 font-sans text-[10px]">
          {badge}
        </Badge>
      )}
    </div>
  );
};

export default AnimatedPhoneMockup;
