import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import AnimatedPhoneMockup from "@/components/AnimatedPhoneMockup";
import appRevenue from "@/assets/app-revenue.png";
import appFeed from "@/assets/app-feed.png";
import appMessaging from "@/assets/app-messaging.png";
import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const AnimatedNumber = ({ target, prefix = "" }: { target: number; prefix?: string }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{value.toLocaleString()}</span>;
};

const PassionsBusinessSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-glow bg-cream py-20 md:py-32 lg:py-40 overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container max-w-7xl mx-auto px-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Headline */}
        <div className="text-center mb-20 md:mb-24">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9]">
            Turning passions into
            <br />
            <span className="italic">businesses</span>
          </h2>
        </div>

        {/* Patreon-style 2-column: left text + right revenue card with phone */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Text + features */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">More ways to earn</h3>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
              Whether it's monthly memberships, per-creation pledges, or one-time digital product sales — diversify your income streams and build sustainable revenue on Bakking.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-red/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="h-5 w-5 text-accent-red" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-foreground mb-1">Unlock growth</h4>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    Built-in tools to help you grow — from audience insights and engagement analytics to conversion optimization.
                  </p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="rounded-full text-sm font-sans font-semibold border-border text-foreground px-8 py-5">
              Learn more
            </Button>
          </div>

          {/* Right - Revenue card + animated phone */}
          <div className="relative">
            <Card className="border-border/30 bg-dark shadow-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-accent-red" />
                  <span className="font-sans text-xs text-primary-foreground/60 uppercase tracking-wider">Insights</span>
                </div>
                <p className="font-serif text-4xl font-bold text-primary-foreground mb-6">
                  $<AnimatedNumber target={14142} />
                </p>
                <div className="flex items-end gap-1.5 h-28 mb-3">
                  {[40, 55, 35, 65, 50, 80, 60, 75, 90, 70, 85, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-accent-red/80 rounded-t-sm transition-all duration-500"
                      style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="font-sans text-xs text-primary-foreground/40">Monthly earnings</p>
              </CardContent>
            </Card>

            {/* Animated phone overlapping the card */}
            <div className="absolute -bottom-12 -right-4 md:-right-8 z-20">
              <AnimatedPhoneMockup
                images={[appRevenue, appFeed, appMessaging]}
                alt="Revenue dashboard"
                className="w-[140px] md:w-[160px]"
                badge="$420 earned today"
                interval={4000}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassionsBusinessSection;
