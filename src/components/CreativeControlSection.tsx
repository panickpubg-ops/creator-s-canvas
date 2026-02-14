import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share } from "lucide-react";
import heroCollage3 from "@/assets/hero-collage-3.jpg";
import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import appMessaging from "@/assets/app-messaging.png";

const CreativeControlSection = () => {
  return (
    <section className="bg-cream py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left side - scattered social cards */}
          <div className="col-span-12 lg:col-span-5 relative min-h-[400px] md:min-h-[500px]">
            {/* Card 1 - top left */}
            <Card className="absolute top-0 left-0 w-[220px] sm:w-[260px] shadow-lg border-border/30 bg-background z-10">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-accent-red/20 text-accent-red text-[10px] font-sans font-bold">SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-sans text-xs font-semibold text-on-light">Sarah Chen</p>
                    <p className="font-sans text-[10px] text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <p className="font-sans text-xs text-on-light/80 mb-2">Just released my new Music Video. Let me know what you think 🎶</p>
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

            {/* Card 2 - bottom left */}
            <Card className="absolute bottom-0 left-4 sm:left-8 w-[200px] sm:w-[240px] shadow-lg border-border/30 bg-background z-20">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-beige text-on-light text-[10px] font-sans font-bold">MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-sans text-xs font-semibold text-on-light">Marcus Rivera</p>
                    <p className="font-sans text-[10px] text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img src={creator2} alt="Post" className="w-full h-32 object-cover" />
                </div>
              </CardContent>
            </Card>

            {/* Phone mockup - right side */}
            <div className="absolute top-8 right-0 z-30 hidden md:block">
              <div className="phone-mockup w-[140px]">
                <div className="phone-mockup-inner">
                  <img src={appMessaging} alt="App interface" className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - headline */}
          <div className="col-span-12 lg:col-span-7 lg:pl-12">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-on-light leading-[0.9] mb-8">
              Complete
              <br />
              creative
              <br />
              control
            </h2>

            {/* Right side image */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="rounded-xl overflow-hidden">
                <img src={creator1} alt="Creator" className="w-full h-48 object-cover" />
              </div>
              <Card className="border-border/30 bg-background shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-accent-red/20 text-accent-red text-[10px] font-sans font-bold">AT</AvatarFallback>
                    </Avatar>
                    <p className="font-sans text-xs font-semibold text-on-light">Chronicles of the Mist</p>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    Behind-the-scenes of tomorrow's premiere — exclusive for supporters only.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="font-sans text-base text-muted-foreground max-w-lg mt-8 leading-relaxed">
              With Creatorly, you get complete control over everything — your content, your audience, your pricing, and your creative direction. No algorithms. No middlemen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeControlSection;
