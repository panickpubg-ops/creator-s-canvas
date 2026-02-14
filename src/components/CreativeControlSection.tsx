import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share } from "lucide-react";
import heroCollage3 from "@/assets/hero-collage-3.jpg";
import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import AnimatedPhoneMockup from "@/components/AnimatedPhoneMockup";
import appMessaging from "@/assets/app-messaging.png";
import appFeed from "@/assets/app-feed.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const CreativeControlSection = () => {
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
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left side - scattered social cards */}
          <div className="col-span-12 lg:col-span-5 relative min-h-[400px] md:min-h-[500px]">
            {/* Card 1 */}
            <Card className="absolute top-0 left-0 w-[220px] sm:w-[260px] shadow-lg border-border/30 bg-background z-10 hover-lift">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-accent-red/20 text-accent-red text-[10px] font-sans font-bold">SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-sans text-xs font-semibold text-foreground">Sarah Chen</p>
                    <p className="font-sans text-[10px] text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <p className="font-sans text-xs text-foreground/80 mb-2">Just released my new Music Video. Let me know what you think 🎶</p>
                <div className="rounded-lg overflow-hidden mb-2">
                  <img src={heroCollage3} alt="Post" className="w-full h-28 object-cover" />
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                  <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  <Share className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="absolute bottom-0 left-4 sm:left-8 w-[200px] sm:w-[240px] shadow-lg border-border/30 bg-background z-20 hover-lift">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-beige text-foreground text-[10px] font-sans font-bold">MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-sans text-xs font-semibold text-foreground">Marcus Rivera</p>
                    <p className="font-sans text-[10px] text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img src={creator2} alt="Post" className="w-full h-32 object-cover" />
                </div>
              </CardContent>
            </Card>

            {/* Animated phone mockup */}
            <div className="absolute top-8 right-0 z-30 hidden md:block">
              <AnimatedPhoneMockup
                images={[appMessaging, appFeed]}
                alt="App messaging"
                className="w-[140px]"
                badge="3 new messages"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="col-span-12 lg:col-span-7 lg:pl-12">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] mb-10">
              Complete
              <br />
              creative
              <br />
              control
            </h2>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="rounded-xl overflow-hidden">
                <img src={creator1} alt="Creator" className="w-full h-48 object-cover" />
              </div>
              <Card className="border-border/30 bg-background shadow-md hover-lift">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-accent-red/20 text-accent-red text-[10px] font-sans font-bold">AT</AvatarFallback>
                    </Avatar>
                    <p className="font-sans text-xs font-semibold text-foreground">Chronicles of the Mist</p>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    Behind-the-scenes of tomorrow's premiere — exclusive for supporters only.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="font-sans text-base text-muted-foreground max-w-lg mt-10 leading-relaxed">
              With Bakking, you get complete control over everything — your content, your audience, your pricing, and your creative direction. No algorithms. No middlemen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeControlSection;
