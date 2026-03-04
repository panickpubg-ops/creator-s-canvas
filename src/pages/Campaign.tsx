import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
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
  Play,
  Quote,
  Target,
  TrendingUp,
  Award,
  Mail,
  Phone,
  ExternalLink,
  Package,
  Home,
  GraduationCap,
  HeartHandshake,
  Megaphone,
  Shield,
  Globe,
  ArrowUpRight,
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

const donationPresets = [25, 50, 100, 250];

const milestones = [
  { title: "Community Approved", desc: "Plans greenlit by the neighborhood board", done: true, date: "Jan 2026" },
  { title: "First $25K Raised", desc: "Foundation phase funded by early supporters", done: true, date: "Feb 2026" },
  { title: "Architect Onboarded", desc: "Design phase begins with local firm", done: true, date: "Feb 2026" },
  { title: "Construction Begins", desc: "Breaking ground once we hit 80%", done: false, date: "Apr 2026" },
  { title: "Grand Opening", desc: "Doors open to the entire community", done: false, date: "Aug 2026" },
];

const impactStats = [
  { number: "2,400+", label: "People Served Annually", icon: Users },
  { number: "15", label: "Weekly Programs", icon: Calendar },
  { number: "20+", label: "Years of Service", icon: Award },
  { number: "98%", label: "Satisfaction Rate", icon: TrendingUp },
];

const howItWorks = [
  { icon: HeartHandshake, title: "Donate", desc: "Choose an amount and contribute securely" },
  { icon: Package, title: "We Build", desc: "Funds go directly to renovation & programs" },
  { icon: GraduationCap, title: "Community Thrives", desc: "Expanded access for everyone" },
  { icon: Shield, title: "Full Transparency", desc: "Regular updates on every dollar spent" },
];

const newsFeatures = [
  { img: gallery1, tag: "Milestone", title: "We Just Hit $65K — Here's What's Next", date: "Feb 28, 2026", excerpt: "Thanks to 125 incredible donors, we're now 65% toward our goal." },
  { img: gallery2, tag: "Design", title: "First Look: Architect Renders Revealed", date: "Feb 14, 2026", excerpt: "The community room will be twice its current size with floor-to-ceiling windows." },
  { img: gallery3, tag: "Story", title: "Why This Center Matters to Our Neighborhood", date: "Feb 5, 2026", excerpt: "Three generations share their stories of what this space means." },
  { img: gallery4, tag: "Launch", title: "Campaign Officially Live!", date: "Jan 30, 2026", excerpt: "After months of planning, every contribution brings us closer." },
];

const testimonials = [
  { name: "Maria Rodriguez", role: "Parent & Volunteer", text: "This center is where my kids learned to paint. It needs to keep growing for the next generation.", avatar: creator2 },
  { name: "James Wright", role: "Senior Program Member", text: "I've been coming here every morning for 8 years. This renovation will change so many lives.", avatar: creator3 },
  { name: "Sarah Chen", role: "Community Director", text: "Every dollar goes directly to making our space more inclusive and accessible for everyone.", avatar: creator1 },
];

// --- Component ---
const Campaign = () => {
  const [liked, setLiked] = useState(false);
  const [donationAmount, setDonationAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const raised = 65000;
  const goal = 100000;
  const progress = (raised / goal) * 100;
  const daysLeft = 34;
  const donors = 125;

  const openLightbox = (index: number) => { setLightboxIndex(index); setLightboxOpen(true); };
  const nextImage = () => setLightboxIndex((i) => (i + 1) % galleryImages.length);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ===== STICKY NAV ===== */}
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40"
      >
        <div className="container max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="font-serif text-lg font-bold text-foreground">Bakking</a>
            <span className="text-border">/</span>
            <span className="font-sans text-xs text-muted-foreground hidden sm:inline">Campaign</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={() => setLiked(!liked)}>
              <Heart className={cn("h-4 w-4 transition-all", liked && "fill-primary text-primary scale-110")} />
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="sm" className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-5 text-xs shadow-lg shadow-primary/20">
              Donate Now
            </Button>
          </div>
        </div>
      </motion.header>

      {/* ===== HERO: FULL BLEED + OVERLAY DONATION WIDGET ===== */}
      <section ref={heroRef} className="relative min-h-[85vh] overflow-hidden pt-14">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img src={campaignHero} alt="Community center" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/30" />
        </motion.div>

        <div className="relative z-10 h-full container max-w-7xl mx-auto px-5 flex items-end pb-12 sm:pb-20 min-h-[85vh]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-end">
            {/* Left: Hero text */}
            <motion.div
              className="lg:col-span-7"
              initial="hidden" animate="visible" variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <Badge className="bg-primary/20 text-primary-foreground border-primary-foreground/20 backdrop-blur-sm font-sans text-xs mb-5">
                  <Sparkles className="h-3 w-3 mr-1" /> Community Project · Austin, TX
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05] max-w-2xl"
              >
                Rebuild the Heart
                <br />
                <span className="italic font-normal text-accent-red">of Our Community</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="font-sans text-sm sm:text-base text-primary-foreground/70 mt-5 max-w-lg leading-relaxed">
                Help us restore and expand our beloved community center — a space where art, education,
                and togetherness thrive for generations.
              </motion.p>
              <motion.div variants={fadeUp} className="flex items-center gap-4 mt-6">
                <div className="flex -space-x-2">
                  {[creator1, creator2, creator3].map((src, i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-dark">
                      <AvatarImage src={src} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="font-sans text-sm text-primary-foreground/60">
                  <span className="font-semibold text-primary-foreground">{donors}</span> supporters
                </span>
              </motion.div>
            </motion.div>

            {/* Right: Donation widget */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-background/95 backdrop-blur-xl rounded-2xl p-6 sm:p-7 shadow-2xl border border-border">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-3xl font-bold text-foreground">${raised.toLocaleString()}</span>
                  <span className="font-sans text-xs text-muted-foreground">of ${goal.toLocaleString()}</span>
                </div>
                <Progress value={progress} className="h-2 bg-secondary [&>div]:bg-primary [&>div]:rounded-full rounded-full mb-3" />
                <div className="flex items-center gap-4 text-muted-foreground mb-6">
                  <span className="font-sans text-xs"><span className="font-semibold text-foreground">{donors}</span> Donors</span>
                  <span className="font-sans text-xs"><span className="font-semibold text-foreground">{daysLeft}</span> Days Left</span>
                  <span className="font-sans text-xs font-semibold text-accent-red">{Math.round(progress)}% Funded</span>
                </div>

                {/* Amount presets */}
                <p className="font-sans text-xs font-medium text-foreground mb-2">Choose Amount</p>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {donationPresets.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => { setDonationAmount(amt); setCustomAmount(""); }}
                      className={cn(
                        "rounded-lg py-2.5 font-sans text-sm font-semibold border-2 transition-all",
                        donationAmount === amt && !customAmount
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-foreground hover:border-primary/30"
                      )}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Other amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setDonationAmount(0); }}
                  className="w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors mb-4"
                />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full rounded-full h-12 text-sm font-sans font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-lg shadow-primary/25">
                    Donate ${customAmount || donationAmount}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <span className="font-sans text-[10px] text-muted-foreground flex items-center gap-1"><Shield className="h-3 w-3" /> Secure</span>
                  <span className="text-border">·</span>
                  <span className="font-sans text-[10px] text-muted-foreground">Tax-deductible</span>
                  <span className="text-border">·</span>
                  <span className="font-sans text-[10px] text-muted-foreground">Instant receipt</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO EMBED SECTION ===== */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden aspect-video cursor-pointer group"
          >
            <img src={campaignHero} alt="Video thumbnail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/50 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-primary/30"
              >
                <Play className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground ml-1" fill="currentColor" />
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-dark/80 to-transparent">
              <p className="font-serif text-lg sm:text-xl text-primary-foreground font-semibold">Watch Our Story</p>
              <p className="font-sans text-xs text-primary-foreground/60 mt-1">3 min · See the community in action</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== RICH NARRATIVE CONTENT ===== */}
      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main story column */}
            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-2">
                  Stand with Your Community
                </h2>
                <div className="h-1 w-16 bg-primary rounded-full mb-8" />
              </motion.div>

              <motion.div variants={fadeUp} className="font-sans text-base text-muted-foreground leading-[1.8] space-y-5">
                <p className="text-lg text-foreground font-medium leading-relaxed">
                  For over 20 years, the community center has been the heartbeat of our neighborhood —
                  a sanctuary for learning, creativity, and human connection.
                </p>
                <p>
                  It's where children take their first art class, where seniors gather for morning coffee,
                  and where families celebrate milestones together. The building holds thousands of memories —
                  birthday parties, town halls, after-school tutoring, weekend farmers markets.
                </p>
                <p>
                  But our community has outgrown its walls. Programs run at capacity. The roof needs repair.
                  The entrance isn't wheelchair accessible. We need a space that matches the spirit of the
                  people who use it.
                </p>
              </motion.div>

              {/* Inline blockquote */}
              <motion.blockquote
                variants={fadeUp}
                className="relative my-10 pl-6 border-l-4 border-primary"
              >
                <Quote className="absolute -left-3 -top-3 h-6 w-6 text-primary/30" />
                <p className="font-serif text-xl sm:text-2xl text-foreground italic leading-relaxed">
                  "The best investment a community can make is in the spaces where its people come together."
                </p>
                <footer className="font-sans text-sm text-muted-foreground mt-3 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={creator1} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">Sarah Chen</p>
                    <p className="text-xs">Community Director</p>
                  </div>
                </footer>
              </motion.blockquote>

              <motion.div variants={fadeUp} className="font-sans text-base text-muted-foreground leading-[1.8] space-y-5">
                <h3 className="font-serif text-2xl font-bold text-foreground">What the Renovation Includes</h3>
                <p>
                  The renovation will double the main hall capacity, add three new classrooms for children's
                  and adult education, install ramps and an elevator for full accessibility, and create a
                  beautiful community garden out front.
                </p>
                <p>
                  Every contribution — no matter the size — brings us closer to a space that truly reflects
                  the warmth, diversity, and ambition of our community.
                </p>
              </motion.div>

              {/* Budget breakdown */}
              <motion.div variants={fadeUp} className="mt-10 space-y-4">
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">Where Your Money Goes</h3>
                {[
                  { pct: 50, amount: "$50,000", title: "Main Hall Renovation", icon: Home, color: "bg-primary" },
                  { pct: 30, amount: "$30,000", title: "New Classrooms & Programs", icon: BookOpen, color: "bg-accent-red" },
                  { pct: 20, amount: "$20,000", title: "Accessibility Upgrades", icon: Target, color: "bg-foreground" },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", item.color === "bg-primary" ? "bg-primary/10" : item.color === "bg-accent-red" ? "bg-accent-red/10" : "bg-foreground/10")}>
                      <item.icon className={cn("h-5 w-5", item.color === "bg-primary" ? "text-primary" : item.color === "bg-accent-red" ? "text-accent-red" : "text-foreground")} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-sans text-sm font-semibold text-foreground">{item.title}</span>
                        <span className="font-sans text-xs font-bold text-accent-red">{item.amount}</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column: sidebar sticky */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-20 space-y-5">
                {/* Organizer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-2xl p-6 shadow-lg border border-border"
                >
                  <h3 className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Organized by</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                      <AvatarImage src={creator1} />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">Sarah Chen</p>
                      <p className="font-sans text-xs text-muted-foreground">Community Director</p>
                      <p className="font-sans text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" /> Austin, TX · <CheckCircle2 className="h-3 w-3 text-primary" /> Verified
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-full h-10 text-xs font-sans gap-2">
                    <MessageCircle className="h-3.5 w-3.5" /> Message Organizer
                  </Button>
                </motion.div>

                {/* Community / Recent donors */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-background rounded-2xl p-6 shadow-lg border border-border"
                >
                  <h3 className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Recent Supporters</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Alex M.", amount: "$100", time: "2 hours ago", emoji: "💎" },
                      { name: "Jordan K.", amount: "$25", time: "5 hours ago", emoji: "⭐" },
                      { name: "Anonymous", amount: "$50", time: "1 day ago", emoji: "🤝" },
                      { name: "Priya S.", amount: "$250", time: "2 days ago", emoji: "🏛️" },
                    ].map((d) => (
                      <div key={d.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/60 transition-colors">
                        <span className="text-base">{d.emoji}</span>
                        <div className="flex-1">
                          <p className="font-sans text-xs font-medium text-foreground">{d.name}</p>
                          <p className="font-sans text-[10px] text-muted-foreground">{d.time}</p>
                        </div>
                        <span className="font-sans text-xs font-bold text-foreground">{d.amount}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[creator1, creator2, creator3].map((src, i) => (
                        <Avatar key={i} className="h-7 w-7 border-2 border-background">
                          <AvatarImage src={src} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="font-sans text-xs text-muted-foreground">
                      +{donors - 3} more supporters
                    </span>
                  </div>
                </motion.div>

                {/* Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-background rounded-2xl p-6 shadow-lg border border-border"
                >
                  <h3 className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Get in Touch</h3>
                  <div className="space-y-2.5">
                    {[
                      { icon: Mail, value: "hello@bakking.com" },
                      { icon: Phone, value: "(512) 555-0123" },
                      { icon: Globe, value: "community-center.org" },
                    ].map((c) => (
                      <div key={c.value} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        <c.icon className="h-4 w-4 text-primary" />
                        <span className="font-sans text-xs">{c.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMAGE GALLERY SECTION ===== */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">See the Impact</h2>
                <p className="font-sans text-sm text-muted-foreground mt-1">A visual journey through our community</p>
              </div>
              <Button variant="ghost" className="font-sans text-xs text-muted-foreground gap-1 hidden sm:flex">
                View All <ArrowUpRight className="h-3 w-3" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {galleryImages.map((img, i) => (
                <motion.button
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLightbox(i)}
                  className={cn(
                    "relative overflow-hidden rounded-xl group cursor-pointer",
                    i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"
                  )}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-sans text-xs text-primary-foreground font-medium">{img.caption}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== IMPACT STATS BAND ===== */}
      <section className="py-16 sm:py-20 bg-dark">
        <div className="container max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-bold text-primary-foreground mb-2">
              Your Impact in Numbers
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-sm text-primary-foreground/50">
              Every contribution makes a measurable difference
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {impactStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center group"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-serif text-4xl sm:text-5xl font-bold text-primary-foreground">{stat.number}</p>
                <p className="font-sans text-xs text-primary-foreground/50 mt-1 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">How Your Donation Helps</h2>
              <p className="font-sans text-sm text-muted-foreground mt-2">A transparent, accountable process from start to finish</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="relative bg-secondary/40 rounded-2xl p-6 text-center border border-border/50 hover:border-primary/20 transition-all"
                >
                  <div className="absolute top-4 right-4 font-serif text-4xl font-bold text-foreground/5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-sans text-sm font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS (Horizontal scroll) ===== */}
      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-8">
              Voices from Our Community
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="bg-background rounded-2xl p-6 sm:p-7 border border-border shadow-sm hover:shadow-md transition-all"
                >
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="font-sans text-sm text-foreground leading-relaxed mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={t.avatar} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="font-sans text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== MILESTONES TIMELINE ===== */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container max-w-5xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">Project Timeline</h2>
              <p className="font-sans text-sm text-muted-foreground mt-2">Track our progress from concept to completion</p>
            </motion.div>
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-border md:hidden" />

              <div className="space-y-8 md:space-y-0">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.title}
                    variants={fadeUp}
                    className={cn(
                      "relative md:grid md:grid-cols-2 md:gap-12 md:py-6",
                      "pl-10 md:pl-0"
                    )}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 md:top-8 z-10">
                      {m.done ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                        >
                          <CheckCircle2 className="h-6 w-6 text-primary fill-primary/10" />
                        </motion.div>
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground/30" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={cn(
                      i % 2 === 0 ? "md:text-right md:pr-8" : "md:col-start-2 md:pl-8",
                    )}>
                      <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">{m.date}</span>
                      <h3 className={cn("font-sans text-base font-bold mt-0.5", m.done ? "text-foreground" : "text-muted-foreground")}>
                        {m.title}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== NEWS & FEATURES GRID ===== */}
      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">News & Updates</h2>
                <p className="font-sans text-sm text-muted-foreground mt-1">Follow our journey as we build together</p>
              </div>
              <Button variant="outline" className="font-sans text-xs rounded-full gap-1 hidden sm:flex">
                See All <ArrowRight className="h-3 w-3" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {newsFeatures.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary text-primary-foreground font-sans text-[10px] px-2.5 py-0.5">
                        {item.tag}
                      </Badge>
                    </div>
                  </div>
                  <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider">{item.date}</p>
                  <h3 className="font-sans text-sm font-bold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground mt-1.5 line-clamp-2">{item.excerpt}</p>
                  <span className="font-sans text-xs text-primary font-medium mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="h-3 w-3" />
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== LARGE CTA BANNER ===== */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <img src={gallery4} alt="Community" className="w-full h-64 sm:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-14">
              <div className="max-w-lg">
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-primary-foreground leading-tight">
                  Help us build a better future <span className="italic font-normal text-accent-red">together</span>
                </h2>
                <p className="font-sans text-sm text-primary-foreground/60 mt-3 leading-relaxed">
                  Every dollar brings us closer. Every share amplifies our reach. Join the movement.
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <Button className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-7 h-11 shadow-lg shadow-primary/25 gap-2">
                    Donate Now <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="rounded-full text-primary-foreground border-primary-foreground/20 font-sans h-11 px-6 hover:bg-primary-foreground/10">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-dark py-10">
        <div className="container max-w-7xl mx-auto px-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="/" className="font-serif text-lg font-bold text-primary-foreground">Bakking</a>
            <div className="flex items-center gap-6">
              <a href="#" className="font-sans text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors">Terms</a>
              <a href="#" className="font-sans text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors">Privacy</a>
              <a href="#" className="font-sans text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors">Contact</a>
            </div>
            <p className="font-sans text-xs text-primary-foreground/30">© 2026 Bakking. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ===== LIGHTBOX ===== */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-dark border-dark overflow-hidden rounded-2xl">
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
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-dark/80 to-transparent">
              <p className="font-sans text-sm text-primary-foreground font-medium">{galleryImages[lightboxIndex].caption}</p>
              <p className="font-sans text-[10px] text-primary-foreground/50 mt-1">{lightboxIndex + 1} / {galleryImages.length}</p>
            </div>
            <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-dark/60 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-dark/80 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-dark/60 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-dark/80 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Campaign;
