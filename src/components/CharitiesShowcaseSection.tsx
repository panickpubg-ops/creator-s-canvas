import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { organizations } from "@/data/organizations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const CharitiesShowcaseSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const featured = organizations.slice(0, 6);

  return (
    <section className="bg-cream py-20 md:py-28 lg:py-36 overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container max-w-7xl mx-auto px-5 sm:px-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 md:mb-14">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1.5 mb-5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold">
                Vetted charity partners
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[0.95]">
              Give to charities you{" "}
              <span className="italic text-primary">trust.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              We partner with the UK's most respected humanitarian organisations. Pick a cause, donate in seconds — every penny goes straight to the charity.
            </p>
            <Button asChild variant="ghost" className="group text-foreground hover:text-primary hover:bg-transparent p-0 h-auto font-sans font-semibold">
              <Link to="/charities">
                Browse all charities
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Charity grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featured.map((org, i) => (
            <Link
              key={org.id}
              to={`/org/${org.id}/donate`}
              className={cn(
                "group relative bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover-lift",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              {/* Banner */}
              <div className="relative h-32 sm:h-36 overflow-hidden">
                <img
                  src={org.banner}
                  alt={`${org.name} banner`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-70"
                  style={{ backgroundColor: `hsl(${org.accentColor})` }}
                />
                {org.badge && (
                  <span className="absolute top-3 right-3 bg-background/95 backdrop-blur text-foreground text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {org.badge}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
                  {org.name}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-snug mb-4 line-clamp-2">
                  {org.tagline}
                </p>

                {/* Stats row */}
                <div className="flex items-center justify-between text-xs font-sans text-muted-foreground border-t border-border pt-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="font-semibold text-foreground">{org.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate max-w-[110px]">{org.location}</span>
                  </div>
                  <span className="font-semibold text-foreground">{org.totalRaised}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharitiesShowcaseSection;
