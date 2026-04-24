import { HeartHandshake, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const CharitiesIntroDivider = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-cream py-16 md:py-20 lg:py-24 overflow-hidden border-y border-border/40">
      <div
        ref={ref}
        className={cn(
          "container max-w-4xl mx-auto px-5 sm:px-6 text-center transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-3.5 py-1.5 mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold">
            From here, it's all about charities
          </span>
        </div>

        <div className="flex items-center justify-center mb-5">
          <div className="h-14 w-14 rounded-2xl bg-foreground text-primary flex items-center justify-center">
            <HeartHandshake className="h-6 w-6" />
          </div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
          Everything below is about <span className="italic text-primary">charities only.</span>
        </h2>
        <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          The next sections cover our charity promise, partners and live campaigns. The 0% fee, 100%‑goes‑to‑charity model
          applies <span className="text-foreground font-semibold">only to charity donations</span> — not to creator memberships.
        </p>
      </div>
    </section>
  );
};

export default CharitiesIntroDivider;
