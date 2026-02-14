import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";

const communityPosts = [
  { name: "Sarah Chen", handle: "@sarahcreates", avatar: "SC", text: "Just dropped a new tutorial for my Pro tier supporters! 🎨", time: "2m", likes: 24 },
  { name: "Marcus Rivera", handle: "@marcusmusic", avatar: "MR", text: "Thank you all for 1,000 supporters! This community means everything.", time: "15m", likes: 89 },
  { name: "Aisha Thompson", handle: "@aishafilms", avatar: "AT", text: "Behind-the-scenes of tomorrow's premiere — exclusive to you all.", time: "1h", likes: 42 },
];

const CreatorsFansSection = () => {
  return (
    <section className="bg-dark py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Large headline */}
          <div>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-on-dark leading-[0.9] mb-8">
              Creators.
              <br />
              Fans.
              <br />
              Nothing in
              <br />
              between.
            </h2>
            <p className="font-sans text-base text-on-dark/50 max-w-md mb-8 leading-relaxed">
              No algorithms deciding who sees your work. No middlemen taking your connection. Just you and the people who believe in what you make.
            </p>
            <Button variant="outline" className="rounded-full px-8 py-5 text-sm font-sans font-semibold border-on-dark/30 text-on-dark hover:bg-on-dark/10">
              See how it works
            </Button>

            {/* Social icons row */}
            <div className="flex items-center gap-5 mt-10">
              {["●", "●", "●", "●", "●", "●"].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-on-dark/10 flex items-center justify-center">
                  <span className="text-on-dark/40 text-xs">♪</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Community feed mockup */}
          <div>
            <Card className="bg-background border-border/20 shadow-2xl rounded-2xl overflow-hidden max-w-md ml-auto">
              <CardContent className="p-0">
                <div className="p-5 border-b border-border/30">
                  <h3 className="font-sans text-sm font-bold text-on-light">Community</h3>
                </div>
                <div className="divide-y divide-border/20">
                  {communityPosts.map((post) => (
                    <div key={post.handle} className="p-4 flex gap-3">
                      <Avatar className="h-9 w-9 flex-shrink-0">
                        <AvatarFallback className="bg-accent-red/15 text-accent-red text-xs font-sans font-bold">
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-sans text-sm font-semibold text-on-light">{post.name}</span>
                          <span className="font-sans text-xs text-muted-foreground">{post.time}</span>
                        </div>
                        <p className="font-sans text-sm text-on-light/70 leading-relaxed mb-2">{post.text}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-accent-red transition-colors">
                            <Heart className="h-3.5 w-3.5" />
                            <span className="font-sans text-xs">{post.likes}</span>
                          </button>
                          <button className="text-muted-foreground hover:text-on-light transition-colors">
                            <MessageCircle className="h-3.5 w-3.5" />
                          </button>
                          <button className="text-muted-foreground hover:text-on-light transition-colors">
                            <Share2 className="h-3.5 w-3.5" />
                          </button>
                          <button className="text-muted-foreground hover:text-on-light transition-colors ml-auto">
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
