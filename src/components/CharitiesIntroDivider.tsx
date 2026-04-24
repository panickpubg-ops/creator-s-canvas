import { HeartHandshake, ArrowDown, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const CharitiesIntroDivider = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [hovered, setHovered] = useState(false);

  const handleScroll = () => {
    const el = document.getElementById("charity-features");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-cream py-14 md:py-20 overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container max-w-3xl mx-auto px-5 sm:px-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <button
          type="button"
          onClick={handleScroll}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group w-full text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-cream rounded-2xl"
          aria-label="Scroll to charity sections"
        >
          {/* Tiny hint chip */}
          <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
            <span
              className={cn(
                "h-px bg-border transition-all duration-500",
                hovered ? "w-10" : "w-6"
              )}
            />
            <Sparkles
              className={cn(
                "h-3.5 w-3.5 transition-all duration-500",
                hovered ? "text-primary rotate-12 scale-110" : "text-muted-foreground"
              )}
            />
            <span className="font-sans text-[11px] uppercase tracking-[0.22em] font-semibold">
              A quick note
            </span>
            <Sparkles
              className={cn(
                "h-3.5 w-3.5 transition-all duration-500",
                hovered ? "text-primary -rotate-12 scale-110" : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "h-px bg-border transition-all duration-500",
                hovered ? "w-10" : "w-6"
              )}
            />
          </div>

          {/* Headline with subtle interaction */}
          <h2 className="mt-5 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            We back creators{" "}
            <span className="inline-flex items-center gap-1.5 align-baseline">
              <span>and</span>
              <HeartHandshake
                className={cn(
                  "inline h-6 w-6 md:h-7 md:w-7 text-primary transition-all duration-500",
                  hovered ? "scale-110 -rotate-6" : ""
                )}
                aria-hidden
              />
            </span>{" "}
            <span className="relative italic">
              charities
              <span
                className={cn(
                  "absolute left-0 -bottom-1 h-[3px] bg-primary/70 rounded-full transition-all duration-500 ease-out",
                  hovered ? "w-full" : "w-0"
                )}
              />
            </span>
            .
          </h2>

          <p className="mt-3 font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            What follows is our charity story — partners, promise and live causes.
          </p>

          {/* Animated down indicator */}
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.18em] text-foreground/70 group-hover:text-primary transition-colors duration-300">
            <span>See the charity side</span>
            <span
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background transition-all duration-300",
                hovered
                  ? "border-primary/50 bg-primary/5 translate-y-0.5"
                  : "translate-y-0"
              )}
            >
              <ArrowDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-700",
                  hovered ? "translate-y-0.5 animate-bounce" : ""
                )}
              />
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default CharitiesIntroDivider;
