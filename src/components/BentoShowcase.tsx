import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Users, DollarSign, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { cn } from "@/lib/utils";

interface BentoItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

const BentoItem = ({ icon, title, description, className, children }: BentoItemProps) => {
  const { ref, position, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow();

  return (
    <Card
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden border-border/30 bg-background shadow-md transition-all duration-500 hover:shadow-xl group",
        className
      )}
    >
      {/* Mouse glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(300px circle at ${position.x}px ${position.y}px, hsl(var(--accent-red) / 0.08), transparent 60%)`
            : "none",
        }}
      />
      <CardContent className="relative z-10 p-6 h-full flex flex-col">
        <div className="w-10 h-10 rounded-xl bg-accent-red/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="font-sans text-base font-semibold text-foreground mb-2">{title}</h3>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
        <div className="flex-1 flex items-end">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

const BentoShowcase = () => {
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
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-[0.9] mb-6">
            Everything you need
          </h2>
          <p className="font-sans text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            All the tools to build, grow, and monetize your creative work — in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Large left card */}
          <BentoItem
            icon={<Users className="h-5 w-5 text-accent-red" />}
            title="Build your community"
            description="Grow an engaged audience that supports your work directly."
            className="md:row-span-2"
          >
            <div className="w-full space-y-3">
              {["Alex M.", "Jordan K.", "Sam R."].map((name, i) => (
                <div key={name} className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent-red/15 text-accent-red text-xs font-sans font-bold">
                      {name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-sans text-xs font-semibold text-foreground">{name}</p>
                    <p className="font-sans text-[10px] text-muted-foreground">Joined recently</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-sans">New</Badge>
                </div>
              ))}
            </div>
          </BentoItem>

          {/* Top right cards */}
          <BentoItem
            icon={<DollarSign className="h-5 w-5 text-accent-red" />}
            title="Flexible monetization"
            description="Memberships, one-time purchases, and digital products."
          >
            <div className="flex items-end gap-1 w-full h-16">
              {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-accent-red/60 rounded-t-sm transition-all duration-700 group-hover:bg-accent-red"
                  style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
                />
              ))}
            </div>
          </BentoItem>

          <BentoItem
            icon={<Heart className="h-5 w-5 text-accent-red" />}
            title="Direct relationships"
            description="No algorithms. Your fans see everything you share."
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["SC", "MR", "AT", "JL"].map((initials) => (
                  <Avatar key={initials} className="h-7 w-7 border-2 border-background">
                    <AvatarFallback className="bg-accent-red/15 text-accent-red text-[9px] font-sans font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="font-sans text-xs text-muted-foreground">+2.4k fans</span>
            </div>
          </BentoItem>

          {/* Bottom wide card */}
          <BentoItem
            icon={<Zap className="h-5 w-5 text-accent-red" />}
            title="Powerful creator tools"
            description="Analytics, messaging, scheduling, and more — built for creators who mean business."
            className="md:col-span-2"
          >
            <div className="flex flex-wrap gap-2">
              {["Analytics", "Messaging", "Scheduling", "Tiers", "Payouts", "Embeds"].map((tool) => (
                <Badge
                  key={tool}
                  variant="outline"
                  className="font-sans text-xs border-border/50 text-foreground/70 hover:bg-accent-red/10 hover:text-accent-red hover:border-accent-red/30 transition-colors cursor-default"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </BentoItem>
        </div>
      </div>
    </section>
  );
};

export default BentoShowcase;
