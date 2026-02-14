import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import appRevenue from "@/assets/app-revenue.png";
import { useState, useEffect, useRef } from "react";

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
  return (
    <section className="bg-cream py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-on-light leading-[0.9]">
            Turning passions into
            <br />
            <span className="italic">businesses</span>
          </h2>
        </div>

        {/* Three columns: chart + two text blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Revenue chart */}
          <div>
            <Card className="border-border/30 bg-dark shadow-xl overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-accent-red" />
                  <span className="font-sans text-xs text-on-dark/60 uppercase tracking-wider">Insights</span>
                </div>
                <p className="font-serif text-3xl font-bold text-on-dark mb-4">
                  $<AnimatedNumber target={14142} />
                </p>
                {/* Simple chart bars */}
                <div className="flex items-end gap-1 h-24 mb-2">
                  {[40, 55, 35, 65, 50, 80, 60, 75, 90, 70, 85, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-accent-red/80 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <p className="font-sans text-[10px] text-on-dark/40">Monthly earnings</p>
              </CardContent>
            </Card>
            <div className="mt-4">
              <div className="phone-mockup w-[160px] mx-auto">
                <div className="phone-mockup-inner">
                  <img src={appRevenue} alt="Revenue dashboard" className="w-full" loading="lazy" />
                </div>
              </div>
            </div>
          </div>

          {/* More ways to earn */}
          <div>
            <h3 className="font-serif text-xl font-bold text-on-light mb-4">More ways to earn</h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              Whether it's monthly memberships, per-creation pledges, or one-time digital product sales — diversify your income streams and build sustainable revenue from your creative work.
            </p>
            <Button variant="outline" className="rounded-full text-sm font-sans font-semibold border-border px-6 py-4">
              Learn more
            </Button>
          </div>

          {/* Unlock growth */}
          <div>
            <h3 className="font-serif text-xl font-bold text-on-light mb-4">Unlock growth</h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Built-in tools to help you grow — from audience insights and engagement analytics to conversion optimization and marketing integrations. Everything you need to scale your creative business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassionsBusinessSection;
