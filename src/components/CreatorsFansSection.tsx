import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import appMessaging from "@/assets/app-messaging.png";

const communityPosts = [
  { name: "Sarah Chen", handle: "@sarahcreates", avatar: "SC", text: "Just dropped a new tutorial for my Pro tier supporters! 🎨", time: "2m" },
  { name: "Marcus Rivera", handle: "@marcusmusic", avatar: "MR", text: "Thank you all for 1,000 supporters! This community means everything.", time: "15m" },
  { name: "Aisha Thompson", handle: "@aishafilms", avatar: "AT", text: "Behind-the-scenes of tomorrow's premiere — exclusive to you all.", time: "1h" },
];

const CreatorsFansSection = () => {
  return (
    <section className="bg-dark py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left phone mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start relative order-2 lg:order-1">
            <div className="relative">
              <div className="phone-mockup hover-tilt w-[260px] sm:w-[280px] animate-float">
                <div className="phone-mockup-inner">
                  <img src={appMessaging} alt="App messaging interface" className="w-full" loading="lazy" />
                </div>
              </div>
              <Badge className="absolute -top-3 right-0 bg-accent-red text-primary-foreground border-none shadow-lg animate-badge-pop font-sans text-xs px-3 py-1.5 z-20">
                💬 New message from supporter
              </Badge>
              <Badge className="absolute bottom-16 -left-8 bg-beige text-on-light border-none shadow-lg animate-badge-pop font-sans text-xs px-3 py-1.5 z-20" style={{ animationDelay: '0.2s' }}>
                🎉 +1 new subscriber
              </Badge>
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-dark leading-[0.95] mb-8">
              Creators.
              <br />
              Fans.
              <br />
              <span className="italic">Nothing</span> in
              <br />
              between.
            </h2>
            <p className="font-sans text-lg text-on-dark/60 max-w-md mb-12 leading-relaxed">
              No algorithms deciding who sees your work. No middlemen taking your
              connection. Just you and the people who believe in what you make.
            </p>

            {/* Community feed preview */}
            <div className="space-y-4 max-w-md">
              {communityPosts.map((post) => (
                <Card key={post.handle} className="bg-primary-foreground/5 border-primary-foreground/10 backdrop-blur-sm">
                  <CardContent className="p-4 flex gap-3">
                    <Avatar className="h-9 w-9 flex-shrink-0">
                      <AvatarFallback className="bg-accent-red/20 text-accent-red text-xs font-sans font-semibold">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-sans text-sm font-semibold text-on-dark">{post.name}</span>
                        <span className="font-sans text-xs text-on-dark/40">{post.time}</span>
                      </div>
                      <p className="font-sans text-sm text-on-dark/70 leading-relaxed">{post.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorsFansSection;
