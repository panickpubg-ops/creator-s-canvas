import { ShieldCheck, Heart, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const stats = [
  { value: "100%", label: "of your donation goes to charity" },
  { value: "0%", label: "platform fees, ever" },
  { value: "12+", label: "vetted UK charity partners" },
  { value: "+25%", label: "free with UK Gift Aid" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Every penny reaches them",
    body:
      "We don't take a cut from your donation. Our running costs are covered separately so 100% of what you give goes to the charity you chose.",
  },
  {
    icon: Heart,
    title: "Built for Zakat, Fitrana & Fidya",
    body:
      "Calculate, give and track your obligatory and voluntary giving in one place — across multiple causes and trusted partner charities.",
  },
  {
    icon: Users,
    title: "Trusted by 12,000+ donors",
    body:
      "Join a growing community giving together every week. See real-time impact from every campaign you back.",
  },
];

const ZeroFeesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-dark py-20 md:py-28 lg:py-36 overflow-hidden relative">
      {/* Subtle accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div
        ref={ref}
        className={cn(
          "container max-w-7xl mx-auto px-5 sm:px-6 relative transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Top: hook headline */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur border border-primary-foreground/15 text-primary-foreground/90 rounded-full px-3 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold">
              Why Bakking
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[0.95] mb-6">
            We take{" "}
            <span className="italic text-primary">nothing.</span>
            <br />
            They get <span className="italic">everything.</span>
          </h2>
          <p className="font-sans text-base md:text-lg text-primary-foreground/65 leading-relaxed max-w-2xl">
            Most donation platforms quietly take 5–10% in fees. Bakking takes 0%. Your full donation — plus an extra 25% from UK Gift Aid — goes directly to the charity you chose.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary-foreground/10 rounded-2xl overflow-hidden mb-16 md:mb-20">
          {stats.map((s) => (
            <div key={s.label} className="bg-dark p-5 md:p-7">
              <div className="font-serif text-3xl md:text-5xl font-bold text-primary-foreground leading-none mb-2">
                {s.value}
              </div>
              <div className="font-sans text-xs md:text-sm text-primary-foreground/60 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={cn(
                "bg-primary-foreground/5 backdrop-blur border border-primary-foreground/10 rounded-2xl p-6 md:p-7 hover:border-primary/30 hover:bg-primary-foreground/[0.07] transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-primary-foreground leading-tight mb-2">
                {f.title}
              </h3>
              <p className="font-sans text-sm text-primary-foreground/60 leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 font-sans font-semibold">
            <Link to="/charities">Find a charity</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-6 h-12 font-sans font-medium border border-primary-foreground/20">
            <Link to="/campaigns">See live campaigns</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ZeroFeesSection;
