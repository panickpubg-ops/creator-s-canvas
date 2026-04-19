import { Link } from "react-router-dom";
import { ArrowUpRight, Mic2, HeartHandshake, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const AudienceSplitSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-cream py-12 md:py-16 lg:py-20 overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container max-w-7xl mx-auto px-5 sm:px-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
            Pick your path
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            What brings you here?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Creator card */}
          <Link
            to="/create"
            className="group relative bg-background rounded-2xl border border-border hover:border-primary/40 p-6 md:p-8 transition-all duration-500 hover-lift overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 h-40 w-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
            <div className="relative flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mic2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    I'm a creator
                  </h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                </div>
                <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                  Build a membership, share exclusive work, and earn a living from your biggest fans.
                </p>
                <div className="inline-flex items-center gap-1.5 font-sans text-xs text-muted-foreground/80">
                  <span>Standard platform fees apply to creator memberships</span>
                  <TooltipProvider delayDuration={150}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={(e) => e.preventDefault()}
                          className="inline-flex items-center justify-center h-4 w-4 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="More about creator fees"
                        >
                          <Info className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px] text-xs leading-relaxed">
                        Bakking takes a small percentage of paid memberships to keep the platform running. See full details on our{" "}
                        <Link to="/pricing" className="underline font-semibold">pricing page</Link>.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </Link>

          {/* Charity card */}
          <Link
            to="/charities"
            className="group relative bg-foreground text-primary-foreground rounded-2xl border border-foreground hover:border-primary p-6 md:p-8 transition-all duration-500 hover-lift overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 h-40 w-40 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors duration-500" />
            <div className="relative flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                    I want to donate
                  </h3>
                  <ArrowUpRight className="h-5 w-5 text-primary-foreground/60 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                </div>
                <p className="font-sans text-sm md:text-base text-primary-foreground/70 leading-relaxed mb-4">
                  Give to vetted UK charities — Zakat, Fitrana, Fidya and more — with every penny reaching them.
                </p>
                <span className="inline-flex items-center gap-1.5 bg-primary/15 text-primary font-sans text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  0% fees · 100% to charity
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AudienceSplitSection;
