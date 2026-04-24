import { Link } from "react-router-dom";
import { ArrowUpRight, Mic2, HeartHandshake, Info, Sparkles, Building2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type Path = {
  to: string;
  icon: typeof Mic2;
  title: string;
  body: string;
  variant: "light" | "dark";
  badge?: { label: string; tone: "muted" | "accent" };
  tooltip?: { text: string; linkLabel: string; linkTo: string };
};

const paths: Path[] = [
  {
    to: "/create",
    icon: Mic2,
    title: "I'm a creator",
    body: "Build a membership, share exclusive work, and earn from your biggest fans.",
    variant: "light",
    badge: { label: "Standard platform fees apply", tone: "muted" },
    tooltip: {
      text: "Bakking takes a small percentage of paid memberships to keep the platform running. See full details on our",
      linkLabel: "pricing page",
      linkTo: "/pricing",
    },
  },
  {
    to: "/campaigns",
    icon: Sparkles,
    title: "I'm a fan or subscriber",
    body: "Subscribe to creators you love and unlock exclusive content, perks and community.",
    variant: "light",
    badge: { label: "Free to join", tone: "muted" },
  },
  {
    to: "/charities",
    icon: HeartHandshake,
    title: "I want to donate",
    body: "Give to vetted UK charities — Zakat, Fitrana, Fidya and more — with every penny reaching them.",
    variant: "dark",
    badge: { label: "0% fees · 100% to charity", tone: "accent" },
  },
  {
    to: "/charities",
    icon: Building2,
    title: "I represent a charity",
    body: "List your charity, run campaigns and receive donations directly — we never take a cut.",
    variant: "dark",
    badge: { label: "0% platform fees, always", tone: "accent" },
  },
];

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
          <p className="font-sans text-sm md:text-base text-muted-foreground mt-3 max-w-xl mx-auto">
            Bakking is for creators, fans, donors and charities. Find your starting point.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {paths.map((p) => {
            const Icon = p.icon;
            const isDark = p.variant === "dark";
            return (
              <Link
                key={p.title}
                to={p.to}
                className={cn(
                  "group relative rounded-2xl border p-6 md:p-7 transition-all duration-500 hover-lift overflow-hidden",
                  isDark
                    ? "bg-foreground text-primary-foreground border-foreground hover:border-primary"
                    : "bg-background text-foreground border-border hover:border-primary/40"
                )}
              >
                <div
                  className={cn(
                    "absolute -top-12 -right-12 h-40 w-40 rounded-full blur-2xl transition-colors duration-500",
                    isDark ? "bg-primary/20 group-hover:bg-primary/30" : "bg-primary/5 group-hover:bg-primary/10"
                  )}
                />
                <div className="relative flex items-start gap-4">
                  <div
                    className={cn(
                      "h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0",
                      isDark ? "bg-primary/20" : "bg-primary/10"
                    )}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight">
                        {p.title}
                      </h3>
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary transition-all duration-300 flex-shrink-0",
                          isDark ? "text-primary-foreground/60" : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <p
                      className={cn(
                        "font-sans text-sm leading-relaxed mb-4",
                        isDark ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}
                    >
                      {p.body}
                    </p>
                    {p.badge && (
                      <div className="inline-flex items-center gap-1.5">
                        <span
                          className={cn(
                            "inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full",
                            p.badge.tone === "accent"
                              ? "bg-primary/15 text-primary"
                              : isDark
                                ? "bg-primary-foreground/10 text-primary-foreground/80"
                                : "bg-secondary text-muted-foreground"
                          )}
                        >
                          {p.badge.label}
                        </span>
                        {p.tooltip && (
                          <TooltipProvider delayDuration={150}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  onClick={(e) => e.preventDefault()}
                                  className="inline-flex items-center justify-center h-5 w-5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                                  aria-label="More about creator fees"
                                >
                                  <Info className="h-3.5 w-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-[240px] text-xs leading-relaxed">
                                {p.tooltip.text}{" "}
                                <Link to={p.tooltip.linkTo} className="underline font-semibold">
                                  {p.tooltip.linkLabel}
                                </Link>
                                .
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudienceSplitSection;
