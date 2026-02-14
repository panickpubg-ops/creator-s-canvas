import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import AnimatedPhoneMockup from "@/components/AnimatedPhoneMockup";
import appFeed from "@/assets/app-feed.png";
import appMessaging from "@/assets/app-messaging.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const communityPosts = [
  { name: "Sarah Chen", handle: "@sarahcreates", avatar: "SC", text: "Just dropped a new tutorial for my Pro tier supporters! 🎨", time: "2m", likes: 24 },
  { name: "Marcus Rivera", handle: "@marcusmusic", avatar: "MR", text: "Thank you all for 1,000 supporters! This community means everything.", time: "15m", likes: 89 },
  { name: "Aisha Thompson", handle: "@aishafilms", avatar: "AT", text: "Behind-the-scenes of tomorrow's premiere — exclusive to you all.", time: "1h", likes: 42 },
];

const CreatorsFansSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-dark py-20 md:py-32 lg:py-40 overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container max-w-7xl mx-auto px-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Animated phone + headline */}
          <div>
            <div className="mb-12 flex justify-center lg:justify-start">
              <AnimatedPhoneMockup
                images={[appFeed, appMessaging]}
                alt="Community feed"
                className="w-[200px] sm:w-[240px]"
                badge="New supporter!"
              />
            </div>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[0.9] mb-10">
              Creators.
              <br />
              Fans.
              <br />
              Nothing in
              <br />
              between.
            </h2>
            <p className="font-sans text-base text-primary-foreground/60 max-w-md mb-10 leading-relaxed">
              No algorithms deciding who sees your work. No middlemen taking your connection. Just you and the people who believe in what you make.
            </p>
            <Button variant="outline" className="rounded-full px-8 py-5 text-sm font-sans font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              See how it works
            </Button>
          </div>

          {/* Right - Community feed */}
          <div>
            <Card className="bg-background border-border/20 shadow-2xl rounded-2xl overflow-hidden max-w-md ml-auto">
              <CardContent className="p-0">
                <div className="p-5 border-b border-border/30">
                  <h3 className="font-sans text-sm font-bold text-foreground">Community</h3>
                </div>
                <div className="divide-y divide-border/20">
                  {communityPosts.map((post) => (
                    <div key={post.handle} className="p-5 flex gap-3">
                      <Avatar className="h-9 w-9 flex-shrink-0">
                        <AvatarFallback className="bg-accent-red/15 text-accent-red text-xs font-sans font-bold">
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-sans text-sm font-semibold text-foreground">{post.name}</span>
                          <span className="font-sans text-xs text-muted-foreground">{post.time}</span>
                        </div>
                        <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-3">{post.text}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-accent-red transition-colors">
                            <Heart className="h-3.5 w-3.5" />
                            <span className="font-sans text-xs">{post.likes}</span>
                          </button>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <MessageCircle className="h-3.5 w-3.5" />
                          </button>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Share2 className="h-3.5 w-3.5" />
                          </button>
                          <button className="text-muted-foreground hover:text-foreground transition-colors ml-auto">
                            <Bookmark className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorsFansSection;
