import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import {
  Heart,
  Share2,
  Users,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  MessageCircle,
  BookOpen,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import campaignHero from "@/assets/campaign-hero.jpg";
import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";

const donationTiers = [
  { amount: 10, label: "Supporter", perks: "Name on thank-you wall" },
  { amount: 25, label: "Patron", perks: "Early access + updates" },
  { amount: 50, label: "Champion", perks: "Exclusive behind-the-scenes" },
  { amount: 100, label: "Visionary", perks: "All perks + private event" },
];

const milestones = [
  { title: "Community Approved", desc: "Plans greenlit by the board", done: true },
  { title: "First $25K Raised", desc: "Foundation phase funded", done: true },
  { title: "Construction Begins", desc: "Target: 80% of goal", done: false },
  { title: "Grand Opening", desc: "Doors open to everyone", done: false },
];

const updates = [
  {
    date: "Feb 28, 2026",
    title: "We just hit $65K!",
    excerpt: "Thanks to 125 incredible donors, we're now 65% toward our goal. Here's what's next…",
  },
  {
    date: "Feb 14, 2026",
    title: "Architect renders revealed",
    excerpt: "We're thrilled to share the first look at the renovated space. The community room will be…",
  },
  {
    date: "Jan 30, 2026",
    title: "Campaign launched!",
    excerpt: "After months of planning, we're officially live. Every contribution brings us closer to…",
  },
];

const Campaign = () => {
  const [selectedTier, setSelectedTier] = useState(1);
  const [liked, setLiked] = useState(false);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.2);
  const { ref: milestonesRef, isVisible: milestonesVisible } = useScrollAnimation(0.2);
  const { ref: updatesRef, isVisible: updatesVisible } = useScrollAnimation(0.2);

  const raised = 65000;
  const goal = 100000;
  const progress = (raised / goal) * 100;
  const daysLeft = 34;
  const donors = 125;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky compact nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="/" className="font-serif text-lg font-bold text-foreground">Bakking</a>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground"
              onClick={() => setLiked(!liked)}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-primary text-primary")} />
              <span className="hidden sm:inline text-xs">Save</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Share</span>
            </Button>
            <Button size="sm" className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-5 text-xs">
              Donate
            </Button>
          </div>
        </div>
      </header>

      {/* Hero – full bleed editorial image */}
      <section className="pt-14">
        <div className="relative w-full aspect-[21/9] sm:aspect-[2.5/1] md:aspect-[3/1] overflow-hidden bg-dark">
          <img
            src={campaignHero}
            alt="Community renovation project"
            className="w-full h-full object-cover opacity-90"
          />
          {/* Dark gradient overlay from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
      </section>

      {/* Main content – asymmetric two-column editorial */}
      <div className="container max-w-6xl mx-auto px-5 -mt-16 sm:-mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column – story */}
          <div className="lg:col-span-7">
            {/* Title card */}
            <div className="bg-background rounded-2xl p-6 sm:p-8 shadow-lg border border-border mb-8">
              <Badge variant="secondary" className="mb-4 font-sans text-xs uppercase tracking-wider">
                <Sparkles className="h-3 w-3 mr-1" /> Community Project
              </Badge>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.1] mb-3">
                Rebuild the Heart<br />
                <span className="italic font-normal text-accent-red">of Our Community</span>
              </h1>
              <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-lg">
                Help us restore and expand our community center to better serve the
                growing needs of our neighborhood — a space for everyone.
              </p>

              <div className="flex items-center gap-3 mt-6">
                <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                  <AvatarImage src={creator1} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">Sarah Chen</p>
                  <p className="font-sans text-xs text-muted-foreground">Community Director · Austin, TX</p>
                </div>
              </div>
            </div>

            {/* About section */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">The Story</h2>
              <div className="font-sans text-sm text-muted-foreground leading-relaxed space-y-4">
                <p>
                  For over 20 years, the community center has been a cornerstone of our
                  neighborhood. It's where children take their first art class, where
                  seniors gather for morning coffee, and where families celebrate milestones.
                </p>
                <p>
                  As our community grows, so does the need for a space that can accommodate
                  more people and programs. The renovation will add new classrooms, upgrade
                  the main hall, and improve accessibility throughout the building.
                </p>
                <p>
                  Every contribution — no matter the size — brings us closer to a space
                  that truly reflects the spirit and diversity of our community.
                </p>
              </div>
            </div>

            {/* How funds will be used – editorial cards */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-5">Where Your Money Goes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { pct: "50%", title: "Main Hall", desc: "Renovation & expansion", icon: BookOpen },
                  { pct: "30%", title: "Classrooms", desc: "3 new learning spaces", icon: Users },
                  { pct: "20%", title: "Accessibility", desc: "Ramps, elevators & more", icon: Sparkles },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group relative bg-secondary rounded-xl p-5 hover-lift cursor-default"
                  >
                    <span className="font-serif text-3xl font-bold text-accent-red">{item.pct}</span>
                    <h3 className="font-sans text-sm font-semibold text-foreground mt-2">{item.title}</h3>
                    <p className="font-sans text-xs text-muted-foreground mt-1">{item.desc}</p>
                    <item.icon className="absolute top-4 right-4 h-5 w-5 text-muted-foreground/30 group-hover:text-accent-red/40 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones – vertical timeline */}
            <div ref={milestonesRef} className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-5">Milestones</h2>
              <div className="relative pl-8 space-y-6">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
                {milestones.map((m, i) => (
                  <div
                    key={m.title}
                    className={cn(
                      "relative transition-all duration-700 ease-out",
                      milestonesVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className="absolute -left-8 top-0.5">
                      {m.done ? (
                        <CheckCircle2 className="h-[22px] w-[22px] text-primary fill-primary/10" />
                      ) : (
                        <Circle className="h-[22px] w-[22px] text-muted-foreground/40" />
                      )}
                    </div>
                    <h3 className={cn("font-sans text-sm font-semibold", m.done ? "text-foreground" : "text-muted-foreground")}>
                      {m.title}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Updates feed */}
            <div ref={updatesRef} className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-5">Updates</h2>
              <div className="space-y-4">
                {updates.map((u, i) => (
                  <div
                    key={u.date}
                    className={cn(
                      "group bg-secondary/60 rounded-xl p-5 hover:bg-secondary transition-all duration-700 ease-out cursor-pointer",
                      updatesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    )}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <span className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">{u.date}</span>
                    <h3 className="font-sans text-sm font-semibold text-foreground mt-1 group-hover:text-accent-red transition-colors">
                      {u.title}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground mt-1 line-clamp-2">{u.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column – sticky donation panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-20">
              {/* Stats card */}
              <div
                ref={statsRef}
                className={cn(
                  "bg-background rounded-2xl p-6 sm:p-8 shadow-lg border border-border mb-6 transition-all duration-700 ease-out",
                  statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                      ${raised.toLocaleString()}
                    </span>
                    <span className="font-sans text-sm text-muted-foreground ml-2">
                      of ${goal.toLocaleString()}
                    </span>
                  </div>
                  <span className="font-sans text-sm font-semibold text-accent-red">{Math.round(progress)}%</span>
                </div>

                <Progress value={progress} className="h-2 mb-4 bg-secondary [&>div]:bg-primary" />

                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span className="font-sans text-sm font-medium">{donors} donors</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span className="font-sans text-sm font-medium">{daysLeft} days left</span>
                  </div>
                </div>
              </div>

              {/* Donation tiers */}
              <div className="bg-background rounded-2xl p-6 sm:p-8 shadow-lg border border-border mb-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">Choose Your Impact</h3>
                <div className="space-y-3">
                  {donationTiers.map((tier, i) => (
                    <button
                      key={tier.amount}
                      onClick={() => setSelectedTier(i)}
                      className={cn(
                        "w-full text-left rounded-xl p-4 border-2 transition-all duration-200 group",
                        selectedTier === i
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/30 bg-background"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-serif text-lg font-bold text-foreground">${tier.amount}</span>
                          <span className="font-sans text-xs font-semibold text-muted-foreground ml-2 uppercase tracking-wider">
                            {tier.label}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            selectedTier === i ? "border-primary bg-primary" : "border-muted-foreground/30"
                          )}
                        >
                          {selectedTier === i && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                        </div>
                      </div>
                      <p className="font-sans text-xs text-muted-foreground mt-1">{tier.perks}</p>
                    </button>
                  ))}
                </div>

                <Button className="w-full mt-5 rounded-full h-12 text-sm font-sans font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Donate ${donationTiers[selectedTier].amount}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <p className="font-sans text-[10px] text-center text-muted-foreground mt-3">
                  Secure payment · Tax-deductible · Instant receipt
                </p>
              </div>

              {/* Community / supporters */}
              <div className="bg-background rounded-2xl p-6 shadow-lg border border-border">
                <h3 className="font-serif text-lg font-bold text-foreground mb-3">Community</h3>
                <div className="flex -space-x-2 mb-3">
                  {[creator1, creator2, creator3].map((src, i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={src} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="h-8 w-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                    <span className="font-sans text-[10px] font-semibold text-muted-foreground">+{donors - 3}</span>
                  </div>
                </div>
                <p className="font-sans text-xs text-muted-foreground">
                  Join {donors} supporters backing this project
                </p>
                <Separator className="my-4" />
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold text-foreground">Have questions?</p>
                    <p className="font-sans text-[10px] text-muted-foreground">Message the organizer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer spacing */}
      <div className="h-20" />

      {/* Simple campaign footer */}
      <footer className="bg-dark py-8">
        <div className="container max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="font-serif text-lg font-bold text-primary-foreground">Bakking</a>
          <p className="font-sans text-xs text-primary-foreground/40">
            © 2026 Bakking. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Campaign;
