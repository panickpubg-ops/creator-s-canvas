import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Heart,
  Share2,
  Users,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  MessageCircle,
  BookOpen,
  Sparkles,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Quote,
  Target,
  TrendingUp,
  Award,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import campaignHero from "@/assets/campaign-hero.jpg";
import gallery1 from "@/assets/campaign-gallery-1.jpg";
import gallery2 from "@/assets/campaign-gallery-2.jpg";
import gallery3 from "@/assets/campaign-gallery-3.jpg";
import gallery4 from "@/assets/campaign-gallery-4.jpg";
import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";

// --- Data ---
const galleryImages = [
  { src: campaignHero, alt: "Community center main hall", caption: "The main hall — ready for transformation" },
  { src: gallery1, alt: "Renovation in progress", caption: "Historic brick interior awaiting new life" },
  { src: gallery2, alt: "Community art program", caption: "Our youth art programs bring color to the neighborhood" },
  { src: gallery3, alt: "Architectural renders", caption: "The architect's vision for the new center" },
  { src: gallery4, alt: "Community meeting", caption: "Where every voice matters" },
];

const donationTiers = [
  { amount: 10, label: "Supporter", perks: "Name on the digital thank-you wall", emoji: "🤝" },
  { amount: 25, label: "Patron", perks: "Early access to updates + Supporter badge", emoji: "⭐" },
  { amount: 50, label: "Champion", perks: "Behind-the-scenes content + all above", emoji: "🏆" },
  { amount: 100, label: "Visionary", perks: "Private launch event invite + all above", emoji: "💎" },
  { amount: 250, label: "Founding Member", perks: "Named plaque on community wall + all above", emoji: "🏛️" },
];

const milestones = [
  { title: "Community Approved", desc: "Plans greenlit by the neighborhood board", done: true, date: "Jan 2026" },
  { title: "First $25K Raised", desc: "Foundation phase funded by early supporters", done: true, date: "Feb 2026" },
  { title: "Architect Onboarded", desc: "Design phase begins with local firm", done: true, date: "Feb 2026" },
  { title: "Construction Begins", desc: "Breaking ground once we hit 80%", done: false, date: "Apr 2026" },
  { title: "Grand Opening", desc: "Doors open to the entire community", done: false, date: "Aug 2026" },
];

const updates = [
  { date: "Feb 28, 2026", title: "We just hit $65K!", excerpt: "Thanks to 125 incredible donors, we're now 65% toward our goal. The momentum is incredible and we can't wait to share what's next.", tag: "Milestone" },
  { date: "Feb 14, 2026", title: "Architect renders revealed", excerpt: "We're thrilled to share the first look at the renovated space. The community room will be twice its current size with floor-to-ceiling windows.", tag: "Design" },
  { date: "Jan 30, 2026", title: "Campaign launched!", excerpt: "After months of planning, we're officially live. Every contribution — big or small — brings us closer to the community center we all deserve.", tag: "Launch" },
];

const testimonials = [
  { name: "Maria Rodriguez", role: "Parent & Volunteer", text: "This center is where my kids learned to paint. It needs to keep growing for the next generation.", avatar: creator2 },
  { name: "James Wright", role: "Senior Program Member", text: "I've been coming here every morning for 8 years. This renovation will change so many lives.", avatar: creator3 },
  { name: "Sarah Chen", role: "Community Director", text: "Every dollar goes directly to making our space more inclusive and accessible for everyone.", avatar: creator1 },
];

const impactStats = [
  { number: "2,400+", label: "People served annually", icon: Users },
  { number: "15", label: "Weekly programs & events", icon: Calendar },
  { number: "20+", label: "Years in the community", icon: Award },
  { number: "98%", label: "Satisfaction rate", icon: TrendingUp },
];

// --- Component ---
const Campaign = () => {
  const [selectedTier, setSelectedTier] = useState(1);
  const [liked, setLiked] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const raised = 65000;
  const goal = 100000;
  const progress = (raised / goal) * 100;
  const daysLeft = 34;
  const donors = 125;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => setLightboxIndex((i) => (i + 1) % galleryImages.length);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);

  // Stagger children helper
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  } as const;
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Sticky Nav */}
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
      >
        <div className="container max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="/" className="font-serif text-lg font-bold text-foreground">Bakking</a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground" onClick={() => setLiked(!liked)}>
              <Heart className={cn("h-4 w-4 transition-all", liked && "fill-primary text-primary scale-110")} />
              <span className="hidden sm:inline text-xs">Save</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Share</span>
            </Button>
            <Button size="sm" className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-5 text-xs shadow-lg shadow-primary/20">
              Donate Now
            </Button>
          </div>
        </div>
      </motion.header>

      {/* =================== HERO =================== */}
      <section ref={heroRef} className="relative h-[70vh] sm:h-[80vh] overflow-hidden pt-14">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img src={campaignHero} alt="Community center" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/10" />
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-end pb-10 sm:pb-16 px-5"
        >
          <div className="container max-w-6xl mx-auto">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <Badge className="bg-primary/20 text-primary-foreground border-primary-foreground/20 backdrop-blur-sm font-sans text-xs mb-4">
                  <Sparkles className="h-3 w-3 mr-1" /> Community Project · Austin, TX
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05] max-w-3xl"
              >
                Rebuild the Heart
                <br />
                <span className="italic font-normal text-accent-red">of Our Community</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="font-sans text-sm sm:text-base text-primary-foreground/70 mt-4 max-w-xl leading-relaxed">
                Help us restore and expand our beloved community center — a place where
                art, education, and togetherness thrive for generations to come.
              </motion.p>
              <motion.div variants={fadeUp} className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-primary-foreground/20">
                    <AvatarImage src={creator1} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <span className="font-sans text-sm text-primary-foreground/80 font-medium">Sarah Chen</span>
                </div>
                <span className="text-primary-foreground/30">·</span>
                <span className="font-sans text-sm text-primary-foreground/50 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Austin, TX
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* =================== FLOATING STATS BAR =================== */}
      <div className="container max-w-6xl mx-auto px-5 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-background rounded-2xl p-5 sm:p-6 shadow-xl border border-border"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-foreground">${raised.toLocaleString()}</span>
                <span className="font-sans text-sm text-muted-foreground">raised of ${goal.toLocaleString()}</span>
              </div>
              <Progress value={progress} className="h-2.5 bg-secondary [&>div]:bg-primary [&>div]:rounded-full rounded-full" />
            </div>
            <div className="flex items-center gap-6 sm:gap-8 text-muted-foreground shrink-0">
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-foreground">{donors}</p>
                <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">Donors</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-foreground">{daysLeft}</p>
                <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">Days Left</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-accent-red">{Math.round(progress)}%</p>
                <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">Funded</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =================== MAIN CONTENT =================== */}
      <div className="container max-w-6xl mx-auto px-5 mt-10 sm:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-14">

            {/* IMAGE GALLERY – Masonry-style */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-5">Gallery</motion.h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {galleryImages.map((img, i) => (
                  <motion.button
                    key={i}
                    variants={fadeUp}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openLightbox(i)}
                    className={cn(
                      "relative overflow-hidden rounded-xl group cursor-pointer",
                      i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"
                    )}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-sans text-xs text-primary-foreground font-medium">{img.caption}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.section>

            {/* TABBED CONTENT */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}>
              <Tabs defaultValue="story" className="w-full">
                <motion.div variants={fadeUp}>
                  <TabsList className="w-full bg-secondary rounded-full p-1 h-auto mb-6 grid grid-cols-3">
                    <TabsTrigger value="story" className="rounded-full font-sans text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm py-2">
                      The Story
                    </TabsTrigger>
                    <TabsTrigger value="impact" className="rounded-full font-sans text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm py-2">
                      Impact
                    </TabsTrigger>
                    <TabsTrigger value="budget" className="rounded-full font-sans text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm py-2">
                      Budget
                    </TabsTrigger>
                  </TabsList>
                </motion.div>

                <TabsContent value="story" className="mt-0">
                  <motion.div variants={fadeUp} className="font-sans text-sm text-muted-foreground leading-relaxed space-y-4">
                    <p className="text-base text-foreground font-medium leading-relaxed">
                      For over 20 years, the community center has been the heartbeat of our neighborhood.
                    </p>
                    <p>
                      It's where children take their first art class, where seniors gather for morning coffee, and where families celebrate
                      milestones together. The building holds thousands of memories — birthday parties, town halls, after-school tutoring,
                      weekend farmers markets.
                    </p>
                    <p>
                      But our community has outgrown its walls. Programs run at capacity. The roof needs repair. The entrance isn't
                      wheelchair accessible. We need a space that matches the spirit of the people who use it.
                    </p>
                    <p>
                      The renovation will double the main hall capacity, add three new classrooms for children's and adult education,
                      install ramps and an elevator for full accessibility, and create a beautiful community garden out front.
                    </p>
                    <p>
                      Every contribution — no matter the size — brings us closer to a space that truly reflects the warmth, diversity,
                      and ambition of our community.
                    </p>
                  </motion.div>
                </TabsContent>

                <TabsContent value="impact" className="mt-0">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {impactStats.map((stat) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-secondary rounded-xl p-5 text-center"
                      >
                        <stat.icon className="h-5 w-5 text-accent-red mx-auto mb-2" />
                        <p className="font-serif text-2xl font-bold text-foreground">{stat.number}</p>
                        <p className="font-sans text-[11px] text-muted-foreground mt-1">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    The renovated center will increase capacity by 60%, adding programs in digital literacy, language learning,
                    job training, and arts education. We project serving over 4,000 community members annually within the first year.
                  </p>
                </TabsContent>

                <TabsContent value="budget" className="mt-0">
                  <div className="space-y-4">
                    {[
                      { pct: 50, amount: "$50,000", title: "Main Hall Renovation", desc: "Structural repairs, expanded seating, new HVAC, and lighting", icon: BookOpen },
                      { pct: 30, amount: "$30,000", title: "New Classrooms", desc: "Three dedicated learning spaces for children and adults", icon: Users },
                      { pct: 20, amount: "$20,000", title: "Accessibility", desc: "ADA-compliant ramps, elevator, and accessible restrooms", icon: Target },
                    ].map((item) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group relative bg-secondary rounded-xl p-5 overflow-hidden"
                      >
                        <div className="absolute bottom-0 left-0 h-1 bg-primary/30 w-full">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${item.pct}%` }} />
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-sans text-sm font-semibold text-foreground">{item.title}</h3>
                              <span className="font-sans text-xs font-bold text-accent-red">{item.amount}</span>
                            </div>
                            <p className="font-sans text-xs text-muted-foreground mt-1">{item.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.section>

            {/* TESTIMONIALS */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-5">What People Say</motion.h2>
              <div className="space-y-4">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={t.name}
                    variants={fadeUp}
                    whileHover={{ x: 4 }}
                    className="bg-secondary/60 rounded-xl p-5 sm:p-6 border border-border/50"
                  >
                    <Quote className="h-5 w-5 text-primary/40 mb-3" />
                    <p className="font-sans text-sm text-foreground leading-relaxed italic">"{t.text}"</p>
                    <div className="flex items-center gap-3 mt-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={t.avatar} />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-sans text-xs font-semibold text-foreground">{t.name}</p>
                        <p className="font-sans text-[10px] text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* MILESTONES TIMELINE */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-6">Project Timeline</motion.h2>
              <div className="relative pl-8 space-y-8">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
                {milestones.map((m, i) => (
                  <motion.div key={m.title} variants={fadeUp} className="relative">
                    <div className="absolute -left-8 top-0.5">
                      {m.done ? (
                        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}>
                          <CheckCircle2 className="h-[22px] w-[22px] text-primary fill-primary/10" />
                        </motion.div>
                      ) : (
                        <Circle className="h-[22px] w-[22px] text-muted-foreground/30" />
                      )}
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">{m.date}</span>
                    <h3 className={cn("font-sans text-sm font-semibold mt-0.5", m.done ? "text-foreground" : "text-muted-foreground")}>
                      {m.title}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* UPDATES FEED */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-5">Latest Updates</motion.h2>
              <div className="space-y-4">
                {updates.map((u) => (
                  <motion.div
                    key={u.date}
                    variants={fadeUp}
                    whileHover={{ y: -2, boxShadow: "0 8px 30px -10px rgba(0,0,0,0.1)" }}
                    className="bg-background rounded-xl p-5 border border-border cursor-pointer transition-colors hover:border-primary/30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="font-sans text-[10px] px-2 py-0 h-5 rounded-full">{u.tag}</Badge>
                      <span className="font-sans text-[10px] text-muted-foreground">{u.date}</span>
                    </div>
                    <h3 className="font-sans text-sm font-semibold text-foreground">{u.title}</h3>
                    <p className="font-sans text-xs text-muted-foreground mt-1 line-clamp-2">{u.excerpt}</p>
                    <button className="font-sans text-xs text-primary font-medium mt-2 flex items-center gap-1 hover:gap-2 transition-all">
                      Read more <ArrowRight className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* CONTACT */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="pb-10">
              <motion.h2 variants={fadeUp} className="font-serif text-2xl font-bold text-foreground mb-5">Get In Touch</motion.h2>
              <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Mail, label: "Email", value: "hello@bakking.com" },
                  { icon: Phone, label: "Phone", value: "(512) 555-0123" },
                  { icon: MapPin, label: "Location", value: "Austin, TX 78701" },
                  { icon: ExternalLink, label: "Website", value: "community-center.org" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3 bg-secondary/60 rounded-xl p-4 hover:bg-secondary transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <c.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">{c.label}</p>
                      <p className="font-sans text-xs font-medium text-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.section>
          </div>

          {/* =================== RIGHT COLUMN =================== */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-20 space-y-5">
              {/* Donation tiers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-background rounded-2xl p-6 sm:p-7 shadow-xl border border-border"
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">Choose Your Impact</h3>
                <p className="font-sans text-xs text-muted-foreground mb-5">Select a tier and make a difference today</p>
                <div className="space-y-2.5">
                  {donationTiers.map((tier, i) => (
                    <motion.button
                      key={tier.amount}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedTier(i)}
                      className={cn(
                        "w-full text-left rounded-xl p-4 border-2 transition-all duration-200",
                        selectedTier === i
                          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                          : "border-border hover:border-primary/20 bg-background"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{tier.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-lg font-bold text-foreground">${tier.amount}</span>
                            <span className="font-sans text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{tier.label}</span>
                          </div>
                          <p className="font-sans text-[11px] text-muted-foreground mt-0.5">{tier.perks}</p>
                        </div>
                        <div className={cn(
                          "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
                          selectedTier === i ? "border-primary bg-primary scale-110" : "border-muted-foreground/30"
                        )}>
                          {selectedTier === i && <motion.div layoutId="tier-dot" className="h-2 w-2 rounded-full bg-primary-foreground" />}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full mt-5 rounded-full h-12 text-sm font-sans font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-lg shadow-primary/20">
                    Donate ${donationTiers[selectedTier].amount}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
                <p className="font-sans text-[10px] text-center text-muted-foreground mt-3">
                  🔒 Secure payment · Tax-deductible · Instant receipt
                </p>
              </motion.div>

              {/* Organizer card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-background rounded-2xl p-6 shadow-lg border border-border"
              >
                <h3 className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-4">Organized by</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                    <AvatarImage src={creator1} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foreground">Sarah Chen</p>
                    <p className="font-sans text-xs text-muted-foreground">Community Director</p>
                    <p className="font-sans text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" /> Austin, TX
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full rounded-full h-9 text-xs font-sans gap-2">
                  <MessageCircle className="h-3.5 w-3.5" /> Message Organizer
                </Button>
              </motion.div>

              {/* Community */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-background rounded-2xl p-6 shadow-lg border border-border"
              >
                <h3 className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-4">Community</h3>
                <div className="flex -space-x-2 mb-3">
                  {[creator1, creator2, creator3].map((src, i) => (
                    <motion.div key={i} initial={{ scale: 0, x: -10 }} whileInView={{ scale: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}>
                      <Avatar className="h-9 w-9 border-2 border-background">
                        <AvatarImage src={src} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </motion.div>
                  ))}
                  <div className="h-9 w-9 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                    <span className="font-sans text-[10px] font-semibold text-muted-foreground">+{donors - 3}</span>
                  </div>
                </div>
                <p className="font-sans text-xs text-muted-foreground mb-4">
                  Join <span className="font-semibold text-foreground">{donors} supporters</span> backing this project
                </p>
                <Separator className="mb-4" />
                <div className="space-y-2">
                  {[
                    { name: "Alex M.", amount: "$100", time: "2 hours ago" },
                    { name: "Jordan K.", amount: "$25", time: "5 hours ago" },
                    { name: "Anonymous", amount: "$50", time: "1 day ago" },
                  ].map((d) => (
                    <div key={d.name} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center">
                          <span className="font-sans text-[9px] font-bold text-muted-foreground">{d.name[0]}</span>
                        </div>
                        <span className="font-sans text-xs text-foreground">{d.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-sans text-xs font-semibold text-foreground">{d.amount}</span>
                        <p className="font-sans text-[9px] text-muted-foreground">{d.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* =================== FOOTER =================== */}
      <footer className="bg-dark py-8 mt-16">
        <div className="container max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="font-serif text-lg font-bold text-primary-foreground">Bakking</a>
          <p className="font-sans text-xs text-primary-foreground/40">© 2026 Bakking. All rights reserved.</p>
        </div>
      </footer>

      {/* =================== LIGHTBOX =================== */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-dark border-dark overflow-hidden rounded-2xl">
          <DialogTitle className="sr-only">Gallery Image</DialogTitle>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full aspect-video object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/80 to-transparent">
              <p className="font-sans text-sm text-primary-foreground">{galleryImages[lightboxIndex].caption}</p>
              <p className="font-sans text-[10px] text-primary-foreground/50 mt-1">{lightboxIndex + 1} / {galleryImages.length}</p>
            </div>
            <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-dark/60 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-dark/80 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-dark/60 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-dark/80 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Campaign;
