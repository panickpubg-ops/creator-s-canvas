import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
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
  Shield,
  Globe,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";
import { getCampaignById, campaigns } from "@/data/campaigns";

const donationPresets = [25, 50, 100, 250];

const howItWorks = [
  { icon: HeartHandshake, title: "Donate", desc: "Choose an amount and contribute securely" },
  { icon: Package, title: "We Build", desc: "Funds go directly to renovation & programs" },
  { icon: GraduationCap, title: "Community Thrives", desc: "Expanded access for everyone" },
  { icon: Shield, title: "Full Transparency", desc: "Regular updates on every dollar spent" },
];

const budgetIcons = [Home, BookOpen, Target];

const Campaign = () => {
  const { id } = useParams<{ id: string }>();
  const campaign = getCampaignById(id || "");

  const [liked, setLiked] = useState(false);
  const [donationAmount, setDonationAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Campaign Not Found</h1>
          <p className="font-sans text-muted-foreground mb-6">The campaign you're looking for doesn't exist.</p>
          <Link to="/campaigns">
            <Button className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-6 gap-2">
              <ArrowLeft className="h-4 w-4" /> Browse Campaigns
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { raised, goal, donors, daysLeft, gallery, milestones, impactStats, testimonials, recentDonors, budgetBreakdown, organizer } = campaign;
  const progress = (raised / goal) * 100;

  const openLightbox = (index: number) => { setLightboxIndex(index); setLightboxOpen(true); };
  const nextImage = () => setLightboxIndex((i) => (i + 1) % gallery.length);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length);

  // Icon mapping for impact stats
  const statIcons = [Users, Calendar, Award, TrendingUp];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ===== STICKY NAV ===== */}
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/" className="font-serif text-lg font-bold text-foreground">Bakking</Link>
            <span className="text-border">/</span>
            <Link to="/campaigns" className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
              Campaigns
            </Link>
            <span className="text-border hidden sm:inline">/</span>
            <span className="font-sans text-xs text-muted-foreground hidden md:inline truncate max-w-[200px]">{campaign.title}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3" onClick={() => setLiked(!liked)}>
              <Heart className={cn("h-4 w-4 transition-all", liked && "fill-primary text-primary scale-110")} />
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="sm" className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-4 sm:px-5 text-xs shadow-lg shadow-primary/20">
              Donate
            </Button>
          </div>
        </div>
      </motion.header>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-[70vh] sm:min-h-[85vh] overflow-hidden pt-14">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/30" />
        </motion.div>

        <div className="relative z-10 h-full container max-w-7xl mx-auto px-4 sm:px-5 flex items-end pb-8 sm:pb-12 lg:pb-20 min-h-[70vh] sm:min-h-[85vh]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 w-full items-end">
            {/* Left: Hero text */}
            <motion.div
              className="lg:col-span-7"
              initial="hidden" animate="visible" variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <Badge className="bg-primary/20 text-primary-foreground border-primary-foreground/20 backdrop-blur-sm font-sans text-xs mb-4 sm:mb-5">
                  <Sparkles className="h-3 w-3 mr-1" /> {campaign.subtitle}
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.05] max-w-2xl"
              >
                {campaign.title}
              </motion.h1>
              <motion.p variants={fadeUp} className="font-sans text-sm sm:text-base text-primary-foreground/70 mt-4 sm:mt-5 max-w-lg leading-relaxed">
                {campaign.excerpt}
              </motion.p>
              <motion.div variants={fadeUp} className="flex items-center gap-4 mt-5 sm:mt-6">
                <div className="flex -space-x-2">
                  {testimonials.slice(0, 3).map((t, i) => (
                    <Avatar key={i} className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-dark">
                      <AvatarImage src={t.avatar} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="font-sans text-xs sm:text-sm text-primary-foreground/60">
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
              <div className="bg-background/95 backdrop-blur-xl rounded-2xl p-5 sm:p-6 lg:p-7 shadow-2xl border border-border">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-foreground">${raised.toLocaleString()}</span>
                  <span className="font-sans text-xs text-muted-foreground">of ${goal.toLocaleString()}</span>
                </div>
                <Progress value={progress} className="h-2 bg-secondary [&>div]:bg-primary [&>div]:rounded-full rounded-full mb-3" />
                <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground mb-5 sm:mb-6">
                  <span className="font-sans text-xs"><span className="font-semibold text-foreground">{donors}</span> Donors</span>
                  <span className="font-sans text-xs"><span className="font-semibold text-foreground">{daysLeft}</span> Days Left</span>
                  <span className="font-sans text-xs font-semibold text-accent-red">{Math.round(progress)}% Funded</span>
                </div>

                <p className="font-sans text-xs font-medium text-foreground mb-2">Choose Amount</p>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {donationPresets.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => { setDonationAmount(amt); setCustomAmount(""); }}
                      className={cn(
                        "rounded-lg py-2 sm:py-2.5 font-sans text-xs sm:text-sm font-semibold border-2 transition-all",
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
                  className="w-full rounded-lg border-2 border-border bg-background px-4 py-2 sm:py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors mb-4"
                />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full rounded-full h-11 sm:h-12 text-sm font-sans font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-lg shadow-primary/25">
                    Donate ${customAmount || donationAmount}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 flex-wrap">
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

      {/* ===== VIDEO EMBED ===== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video cursor-pointer group"
          >
            <img src={campaign.image} alt="Video thumbnail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/50 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-primary/30"
              >
                <Play className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-primary-foreground ml-1" fill="currentColor" />
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-dark/80 to-transparent">
              <p className="font-serif text-base sm:text-lg lg:text-xl text-primary-foreground font-semibold">Watch Our Story</p>
              <p className="font-sans text-[10px] sm:text-xs text-primary-foreground/60 mt-1">3 min · See the community in action</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== RICH NARRATIVE ===== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Main story */}
            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight mb-2">
                  Stand with Your Community
                </h2>
                <div className="h-1 w-16 bg-primary rounded-full mb-6 sm:mb-8" />
              </motion.div>

              <motion.div variants={fadeUp} className="font-sans text-sm sm:text-base text-muted-foreground leading-[1.8] space-y-4 sm:space-y-5">
                {campaign.fullDescription.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-base sm:text-lg text-foreground font-medium leading-relaxed" : ""}>
                    {p}
                  </p>
                ))}
              </motion.div>

              {/* Blockquote */}
              <motion.blockquote
                variants={fadeUp}
                className="relative my-8 sm:my-10 pl-5 sm:pl-6 border-l-4 border-primary"
              >
                <Quote className="absolute -left-3 -top-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/30" />
                <p className="font-serif text-lg sm:text-xl lg:text-2xl text-foreground italic leading-relaxed">
                  "{testimonials[0]?.text}"
                </p>
                <footer className="font-sans text-sm text-muted-foreground mt-3 flex items-center gap-3">
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarImage src={testimonials[0]?.avatar} />
                    <AvatarFallback>{testimonials[0]?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonials[0]?.name}</p>
                    <p className="text-xs">{testimonials[0]?.role}</p>
                  </div>
                </footer>
              </motion.blockquote>

              {/* Budget breakdown */}
              <motion.div variants={fadeUp} className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Where Your Money Goes</h3>
                {budgetBreakdown.map((item, idx) => {
                  const Icon = budgetIcons[idx] || Target;
                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-sans text-xs sm:text-sm font-semibold text-foreground truncate">{item.title}</span>
                          <span className="font-sans text-xs font-bold text-accent-red ml-2">{item.amount}</span>
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
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-20 space-y-4 sm:space-y-5">
                {/* Organizer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-2xl p-5 sm:p-6 shadow-lg border border-border"
                >
                  <h3 className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Organized by</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-background shadow-md">
                      <AvatarImage src={organizer.avatar} />
                      <AvatarFallback>{organizer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-sans text-sm font-semibold text-foreground">{organizer.name}</p>
                      <p className="font-sans text-xs text-muted-foreground">{organizer.role}</p>
                      <p className="font-sans text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" /> {organizer.location} · <CheckCircle2 className="h-3 w-3 text-primary" /> Verified
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-full h-10 text-xs font-sans gap-2">
                    <MessageCircle className="h-3.5 w-3.5" /> Message Organizer
                  </Button>
                </motion.div>

                {/* Recent donors */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-background rounded-2xl p-5 sm:p-6 shadow-lg border border-border"
                >
                  <h3 className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Recent Supporters</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {recentDonors.map((d) => (
                      <div key={d.name} className="flex items-center gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-secondary/60 transition-colors">
                        <span className="text-base">{d.emoji}</span>
                        <div className="flex-1 min-w-0">
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
                      {testimonials.slice(0, 3).map((t, i) => (
                        <Avatar key={i} className="h-6 w-6 sm:h-7 sm:w-7 border-2 border-background">
                          <AvatarImage src={t.avatar} />
                          <AvatarFallback>{t.name[0]}</AvatarFallback>
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
                  className="bg-background rounded-2xl p-5 sm:p-6 shadow-lg border border-border"
                >
                  <h3 className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Get in Touch</h3>
                  <div className="space-y-2.5">
                    {[
                      { icon: Mail, value: "hello@bakking.com" },
                      { icon: Phone, value: "(512) 555-0123" },
                      { icon: Globe, value: "bakking.org" },
                    ].map((c) => (
                      <div key={c.value} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        <c.icon className="h-4 w-4 text-primary shrink-0" />
                        <span className="font-sans text-xs truncate">{c.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">See the Impact</h2>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1">A visual journey through our community</p>
              </div>
              <Button variant="ghost" className="font-sans text-xs text-muted-foreground gap-1 hidden sm:flex">
                View All <ArrowUpRight className="h-3 w-3" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {gallery.map((img, i) => (
                <motion.button
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLightbox(i)}
                  className={cn(
                    "relative overflow-hidden rounded-lg sm:rounded-xl group cursor-pointer",
                    i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"
                  )}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-sans text-[10px] sm:text-xs text-primary-foreground font-medium">{img.caption}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-dark">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-2">
              Your Impact in Numbers
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-xs sm:text-sm text-primary-foreground/50">
              Every contribution makes a measurable difference
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {impactStats.map((stat, idx) => {
              const Icon = statIcons[idx] || TrendingUp;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="text-center group"
                >
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <p className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground">{stat.number}</p>
                  <p className="font-sans text-[10px] sm:text-xs text-primary-foreground/50 mt-1 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">How Your Donation Helps</h2>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-2">A transparent, accountable process from start to finish</p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="relative bg-secondary/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-border/50 hover:border-primary/20 transition-all"
                >
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 font-serif text-2xl sm:text-4xl font-bold text-foreground/5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="font-sans text-xs sm:text-sm font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="font-sans text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 sm:mb-8">
              Voices from Our Community
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {testimonials.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="bg-background rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 border border-border shadow-sm hover:shadow-md transition-all"
                >
                  <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary/20 mb-3 sm:mb-4" />
                  <p className="font-sans text-xs sm:text-sm text-foreground leading-relaxed mb-5 sm:mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                      <AvatarImage src={t.avatar} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-sans text-xs sm:text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="font-sans text-[10px] sm:text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== MILESTONES ===== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-background">
        <div className="container max-w-5xl mx-auto px-4 sm:px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Project Timeline</h2>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-2">Track our progress from concept to completion</p>
            </motion.div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-border md:hidden" />

              <div className="space-y-6 sm:space-y-8 md:space-y-0">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.title}
                    variants={fadeUp}
                    className={cn(
                      "relative md:grid md:grid-cols-2 md:gap-12 md:py-6",
                      "pl-10 md:pl-0"
                    )}
                  >
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 md:top-8 z-10">
                      {m.done ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                        >
                          <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary fill-primary/10" />
                        </motion.div>
                      ) : (
                        <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground/30" />
                      )}
                    </div>

                    <div className={cn(
                      i % 2 === 0 ? "md:text-right md:pr-8" : "md:col-start-2 md:pl-8",
                    )}>
                      <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">{m.date}</span>
                      <h3 className={cn("font-sans text-sm sm:text-base font-bold mt-0.5", m.done ? "text-foreground" : "text-muted-foreground")}>
                        {m.title}
                      </h3>
                      <p className="font-sans text-[10px] sm:text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          >
            <img src={gallery[gallery.length - 1]?.src || campaign.image} alt="Community" className="w-full h-56 sm:h-64 lg:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-8 lg:px-14">
              <div className="max-w-lg">
                <h2 className="font-serif text-xl sm:text-2xl lg:text-4xl font-bold text-primary-foreground leading-tight">
                  Help us build a better future <span className="italic font-normal text-accent-red">together</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-primary-foreground/60 mt-2 sm:mt-3 leading-relaxed">
                  Every dollar brings us closer. Every share amplifies our reach. Join the movement.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <Button className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-6 sm:px-7 h-10 sm:h-11 shadow-lg shadow-primary/25 gap-2 text-xs sm:text-sm">
                    Donate Now <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="rounded-full text-primary-foreground border-primary-foreground/20 font-sans h-10 sm:h-11 px-5 sm:px-6 hover:bg-primary-foreground/10 text-xs sm:text-sm">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-dark py-8 sm:py-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <Link to="/" className="font-serif text-lg font-bold text-primary-foreground">Bakking</Link>
            <div className="flex items-center gap-4 sm:gap-6">
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
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-dark border-dark overflow-hidden rounded-xl sm:rounded-2xl">
          <DialogTitle className="sr-only">Gallery Image</DialogTitle>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                src={gallery[lightboxIndex]?.src}
                alt={gallery[lightboxIndex]?.alt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full aspect-video object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-dark/80 to-transparent">
              <p className="font-sans text-xs sm:text-sm text-primary-foreground font-medium">{gallery[lightboxIndex]?.caption}</p>
              <p className="font-sans text-[10px] text-primary-foreground/50 mt-1">{lightboxIndex + 1} / {gallery.length}</p>
            </div>
            <button onClick={prevImage} className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-dark/60 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-dark/80 transition-colors">
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button onClick={nextImage} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-dark/60 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-dark/80 transition-colors">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Campaign;
