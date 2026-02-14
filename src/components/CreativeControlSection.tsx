import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Users, MessageCircle, Layers, Shield } from "lucide-react";
import appFeed from "@/assets/app-feed.png";
import { useState } from "react";

const features = [
  { icon: Users, title: "Own your audience data", desc: "Full access to your supporter list, emails, and engagement metrics." },
  { icon: MessageCircle, title: "Direct messaging", desc: "Talk to your fans one-on-one without a platform in between." },
  { icon: Layers, title: "Flexible pricing tiers", desc: "Create unlimited membership levels with custom perks." },
  { icon: Shield, title: "No algorithm interference", desc: "Every post reaches every supporter. No throttling, ever." },
];

const CreativeControlSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="bg-cream py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left content */}
          <div className="lg:col-span-6 xl:col-span-7">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-light leading-[0.95] mb-8">
              Complete
              <br />
              creative
              <br />
              <span className="italic">control.</span>
            </h2>
            <p className="font-sans text-lg text-muted-foreground max-w-md mb-12 leading-relaxed">
              Stop renting your audience on someone else's platform. Here, you set the terms,
              you own the relationship, and you keep the creative freedom you deserve.
            </p>

            {/* Feature cards - staggered grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {features.map((f, i) => (
                <Card
                  key={f.title}
                  className={`border-border/50 bg-beige/50 hover-lift cursor-default ${i === 1 ? 'sm:mt-6' : ''} ${i === 3 ? 'sm:mt-6' : ''}`}
                >
                  <CardContent className="p-6">
                    <f.icon className="h-5 w-5 text-accent-red mb-3" />
                    <h3 className="font-sans font-semibold text-sm text-on-light mb-1">{f.title}</h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pricing toggle */}
            <div className="flex items-center gap-3 mb-6">
              <Label htmlFor="billing" className="font-sans text-sm text-muted-foreground">Monthly</Label>
              <Switch id="billing" checked={isYearly} onCheckedChange={setIsYearly} />
              <Label htmlFor="billing" className="font-sans text-sm text-muted-foreground">
                Yearly
                <Badge className="ml-2 bg-accent-red/10 text-accent-red border-none text-[10px] font-semibold">Save 20%</Badge>
              </Label>
            </div>

            {/* Tier tabs */}
            <Tabs defaultValue="pro" className="max-w-md">
              <TabsList className="bg-beige/80 border border-border/50 p-1 rounded-full">
                <TabsTrigger value="starter" className="rounded-full text-xs font-sans">Starter</TabsTrigger>
                <TabsTrigger value="pro" className="rounded-full text-xs font-sans">Pro</TabsTrigger>
                <TabsTrigger value="premium" className="rounded-full text-xs font-sans">Premium</TabsTrigger>
              </TabsList>
              <TabsContent value="starter" className="mt-4">
                <Card className="border-border/50 bg-beige/30">
                  <CardContent className="p-6">
                    <p className="font-serif text-3xl font-bold text-on-light">{isYearly ? '$3' : '$5'}<span className="text-sm font-sans text-muted-foreground">/mo per supporter</span></p>
                    <p className="font-sans text-sm text-muted-foreground mt-2">Exclusive posts, early access, community chat.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pro" className="mt-4">
                <Card className="border-accent-red/30 bg-accent-red/5">
                  <CardContent className="p-6">
                    <Badge className="bg-accent-red text-primary-foreground border-none text-[10px] mb-3">Most popular</Badge>
                    <p className="font-serif text-3xl font-bold text-on-light">{isYearly ? '$8' : '$10'}<span className="text-sm font-sans text-muted-foreground">/mo per supporter</span></p>
                    <p className="font-sans text-sm text-muted-foreground mt-2">Everything in Starter + direct messages, downloads, and behind-the-scenes.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="premium" className="mt-4">
                <Card className="border-border/50 bg-beige/30">
                  <CardContent className="p-6">
                    <p className="font-serif text-3xl font-bold text-on-light">{isYearly ? '$20' : '$25'}<span className="text-sm font-sans text-muted-foreground">/mo per supporter</span></p>
                    <p className="font-sans text-sm text-muted-foreground mt-2">All access + 1-on-1 sessions, custom requests, credits.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right phone mockup */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative">
              <div className="phone-mockup hover-tilt w-[260px] sm:w-[280px] animate-float">
                <div className="phone-mockup-inner">
                  <img src={appFeed} alt="App content feed" className="w-full" loading="lazy" />
                </div>
              </div>
              {/* Floating badges */}
              <Badge className="absolute -top-4 -left-8 bg-accent-red text-primary-foreground border-none shadow-lg animate-badge-pop font-sans text-xs px-3 py-1.5 z-20">
                📸 New post published!
              </Badge>
              <Badge className="absolute bottom-20 -right-6 bg-foreground text-on-dark border-none shadow-lg animate-badge-pop font-sans text-xs px-3 py-1.5 z-20" style={{ animationDelay: '0.3s' }}>
                ✨ 12 new supporters
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeControlSection;
