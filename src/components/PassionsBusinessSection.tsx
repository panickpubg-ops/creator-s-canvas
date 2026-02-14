import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TrendingUp, DollarSign, Users, ArrowUpRight } from "lucide-react";
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
          let start = 0;
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
  const [period, setPeriod] = useState("month");

  return (
    <section className="bg-beige py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left content */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-light leading-[0.95] mb-8">
              Turning
              <br />
              passions into
              <br />
              <span className="italic">businesses.</span>
            </h2>
            <p className="font-sans text-lg text-muted-foreground max-w-md leading-relaxed">
              Real revenue tools, real analytics, real growth. See exactly where your
              income comes from and where it's going.
            </p>
          </div>

          {/* Right revenue dashboard */}
          <div className="lg:col-span-7">
            <Card className="border-border/50 bg-cream shadow-xl overflow-hidden">
              <CardContent className="p-0">
                {/* Dashboard header */}
                <div className="p-6 pb-4 flex items-center justify-between border-b border-border/50">
                  <div>
                    <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-1">Total earnings</p>
                    <p className="font-serif text-4xl font-bold text-on-light">
                      $<AnimatedNumber target={14142} />
                    </p>
                  </div>
                  <Badge className="bg-accent-red/10 text-accent-red border-none font-sans text-xs font-semibold flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +23% this month
                  </Badge>
                </div>

                {/* Tabs */}
                <div className="px-6 pt-4">
                  <Tabs defaultValue="revenue">
                    <TabsList className="bg-beige/80 border border-border/50 p-1 rounded-full mb-4">
                      <TabsTrigger value="revenue" className="rounded-full text-xs font-sans">Revenue</TabsTrigger>
                      <TabsTrigger value="supporters" className="rounded-full text-xs font-sans">Supporters</TabsTrigger>
                      <TabsTrigger value="content" className="rounded-full text-xs font-sans">Content</TabsTrigger>
                    </TabsList>

                    <TabsContent value="revenue" className="space-y-4">
                      {/* Period toggle */}
                      <ToggleGroup type="single" value={period} onValueChange={(v) => v && setPeriod(v)} className="justify-start">
                        <ToggleGroupItem value="week" className="text-xs font-sans rounded-full h-7 px-3">Week</ToggleGroupItem>
                        <ToggleGroupItem value="month" className="text-xs font-sans rounded-full h-7 px-3">Month</ToggleGroupItem>
                        <ToggleGroupItem value="year" className="text-xs font-sans rounded-full h-7 px-3">Year</ToggleGroupItem>
                      </ToggleGroup>

                      {/* Revenue bars */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-sans text-xs text-muted-foreground">Pro Tier</span>
                            <span className="font-sans text-xs font-semibold text-on-light">$8,240</span>
                          </div>
                          <Progress value={72} className="h-2 bg-beige" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-sans text-xs text-muted-foreground">Premium Tier</span>
                            <span className="font-sans text-xs font-semibold text-on-light">$4,350</span>
                          </div>
                          <Progress value={48} className="h-2 bg-beige" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-sans text-xs text-muted-foreground">Starter Tier</span>
                            <span className="font-sans text-xs font-semibold text-on-light">$1,552</span>
                          </div>
                          <Progress value={22} className="h-2 bg-beige" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="supporters" className="pb-2">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="border-border/30 bg-beige/30">
                          <CardContent className="p-4 text-center">
                            <Users className="h-5 w-5 text-accent-red mx-auto mb-2" />
                            <p className="font-serif text-2xl font-bold text-on-light"><AnimatedNumber target={1247} /></p>
                            <p className="font-sans text-xs text-muted-foreground">Active supporters</p>
                          </CardContent>
                        </Card>
                        <Card className="border-border/30 bg-beige/30">
                          <CardContent className="p-4 text-center">
                            <TrendingUp className="h-5 w-5 text-accent-red mx-auto mb-2" />
                            <p className="font-serif text-2xl font-bold text-on-light">+<AnimatedNumber target={89} /></p>
                            <p className="font-sans text-xs text-muted-foreground">New this month</p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    <TabsContent value="content" className="pb-2">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="border-border/30 bg-beige/30">
                          <CardContent className="p-4 text-center">
                            <p className="font-serif text-2xl font-bold text-on-light"><AnimatedNumber target={342} /></p>
                            <p className="font-sans text-xs text-muted-foreground">Posts published</p>
                          </CardContent>
                        </Card>
                        <Card className="border-border/30 bg-beige/30">
                          <CardContent className="p-4 text-center">
                            <p className="font-serif text-2xl font-bold text-on-light"><AnimatedNumber target={98} />%</p>
                            <p className="font-sans text-xs text-muted-foreground">Engagement rate</p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Phone mockup inline */}
                <div className="px-6 pb-6 pt-4 flex justify-center">
                  <div className="phone-mockup hover-tilt w-[180px] sm:w-[200px]">
                    <div className="phone-mockup-inner">
                      <img src={appRevenue} alt="Revenue dashboard" className="w-full" loading="lazy" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassionsBusinessSection;
