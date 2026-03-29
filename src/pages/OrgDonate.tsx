import { useState } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Shield,
  CreditCard,
  ChevronRight,
  Star,
  MapPin,
  Calendar,
} from "lucide-react";
import { charityTypes } from "@/data/charityTypes";
import { getOrganizationById } from "@/data/organizations";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

const OrgDonate = () => {
  const { orgId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const org = getOrganizationById(orgId || "");

  // Filter charity types to only those this org supports
  const orgCauses = org
    ? charityTypes.filter((c) => org.causes.includes(c.id))
    : charityTypes;

  const initialType = searchParams.get("type") || orgCauses[0]?.id || "zakat";
  const [activeType, setActiveType] = useState(initialType);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const charity = orgCauses.find((c) => c.id === activeType) || orgCauses[0];
  const donationValue = customAmount ? parseFloat(customAmount) : selectedAmount;

  if (!org) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Organisation not found</h1>
          <p className="font-sans text-sm text-muted-foreground mb-4">The charity you're looking for doesn't exist.</p>
          <Link to="/charities">
            <Button variant="outline" className="rounded-full font-sans">Browse Charities</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDonate = () => {
    if (!donationValue || donationValue <= 0) return;
    navigate(`/checkout?org=${org.id}&type=${charity.id}&amount=${donationValue}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ORG-BRANDED NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-serif text-lg font-bold text-foreground">Bakking</Link>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
                <img src={org.logo} alt={org.name} className="h-5 w-5 object-contain" />
              </div>
              <span className="font-sans text-xs font-semibold text-foreground hidden sm:inline">{org.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/charities">
              <Button variant="ghost" size="sm" className="text-muted-foreground font-sans text-xs hidden sm:inline-flex">
                All Charities
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ORG BANNER + HERO */}
      <section className="pt-14 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={charity.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pt-14"
          >
            <img src={charity.image} alt={charity.heroTitle} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-5 py-12 sm:py-16 lg:py-24 min-h-[50vh] sm:min-h-[55vh] flex flex-col justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={charity.id + "-content"}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={stagger}
              className="max-w-xl"
            >
              {/* Org branding badge */}
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center overflow-hidden">
                  <img src={org.logo} alt={org.name} className="h-7 w-7 sm:h-8 sm:w-8 object-contain" />
                </div>
                <div>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-primary-foreground">{org.name}</p>
                  <div className="flex items-center gap-2">
                    {org.badge && (
                      <Badge className="bg-primary-foreground/15 text-primary-foreground/80 border-0 font-sans text-[9px] backdrop-blur-sm px-2 py-0">
                        <Shield className="h-2.5 w-2.5 mr-0.5" /> {org.badge}
                      </Badge>
                    )}
                    <span className="flex items-center gap-0.5 text-[10px] text-primary-foreground/50">
                      <Star className="h-2.5 w-2.5 fill-primary text-primary" /> {org.rating}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.05] mb-4"
              >
                {charity.heroTitle}
              </motion.h1>

              {/* Preset amounts */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-3">
                {charity.presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={cn(
                      "px-4 sm:px-5 py-2.5 rounded-lg font-sans text-sm font-bold border-2 transition-all",
                      selectedAmount === amt && !customAmount
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary-foreground/30 text-primary-foreground hover:border-primary-foreground/60 bg-primary-foreground/10 backdrop-blur-sm"
                    )}
                  >
                    £{amt}
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="£ Other"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  className="w-24 sm:w-28 px-3 py-2.5 rounded-lg font-sans text-sm font-bold border-2 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 bg-primary-foreground/10 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors"
                />
              </motion.div>

              <motion.p variants={fadeUp} className="font-sans text-xs sm:text-sm text-primary-foreground/60 mb-5">
                {charity.impactExample}
              </motion.p>

              <motion.div variants={fadeUp}>
                <Button
                  onClick={handleDonate}
                  disabled={!donationValue || donationValue <= 0}
                  size="lg"
                  className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-8 shadow-xl shadow-primary/30 group disabled:opacity-50"
                >
                  Donate now
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 font-sans text-[10px] text-primary-foreground/50">
                  <Shield className="h-3 w-3" /> Secure
                </div>
                <div className="flex items-center gap-1.5 font-sans text-[10px] text-primary-foreground/50">
                  <CreditCard className="h-3 w-3" /> Visa · Mastercard
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CAUSE SELECTOR BAR */}
      <section className="bg-secondary border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5 py-3">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <span className="font-sans text-xs font-semibold text-foreground whitespace-nowrap">Choose cause</span>
            <Separator orientation="vertical" className="h-5" />
            {orgCauses.map((type) => (
              <button
                key={type.id}
                onClick={() => { setActiveType(type.id); setSelectedAmount(null); setCustomAmount(""); }}
                className={cn(
                  "flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-sans text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all shrink-0",
                  activeType === type.id
                    ? "bg-foreground text-background shadow-md"
                    : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <span>{type.emoji}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-5 py-3 sm:py-4">
        <div className="flex items-center gap-1.5 font-sans text-[10px] sm:text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/charities" className="hover:text-foreground transition-colors">Charities</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/org/${org.id}/donate`} className="hover:text-foreground transition-colors">{org.name}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{charity.label}</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="pb-16 sm:pb-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left: Content */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div key={charity.id + "-body"} initial="hidden" animate="visible" variants={stagger}>
                  {/* Description */}
                  <motion.div variants={fadeUp} className="space-y-4 sm:space-y-5 mb-10">
                    {charity.description.map((p, i) => (
                      <p
                        key={i}
                        className={cn(
                          "font-sans leading-[1.8]",
                          i === 0
                            ? "text-base sm:text-lg lg:text-xl text-foreground font-medium"
                            : "text-sm sm:text-base text-muted-foreground"
                        )}
                      >
                        {p}
                      </p>
                    ))}
                  </motion.div>

                  {/* Resources */}
                  {charity.resources && charity.resources.length > 0 && (
                    <motion.div variants={fadeUp} className="mb-10">
                      <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-5">
                        {charity.label} resources
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {charity.resources.map((res) => (
                          <a
                            key={res.title}
                            href={res.link}
                            className="group flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 hover:bg-secondary transition-all"
                          >
                            <span className="font-sans text-sm font-medium text-foreground">{res.title}</span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* About the org */}
                  <motion.div variants={fadeUp} className="mb-10">
                    <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4">
                      About {org.name}
                    </h2>
                    <div className="p-5 rounded-2xl bg-secondary/50 border border-border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-card border border-border flex items-center justify-center overflow-hidden">
                          <img src={org.logo} alt={org.name} className="h-8 w-8 object-contain" />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-semibold text-foreground">{org.name}</p>
                          <p className="font-sans text-[11px] text-muted-foreground">{org.tagline}</p>
                        </div>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">{org.description}</p>
                      <div className="flex flex-wrap items-center gap-4 font-sans text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {org.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Est. {org.established}</span>
                        <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary" /> {org.rating}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* FAQ */}
                  <motion.div variants={fadeUp}>
                    <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-5">
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="space-y-2">
                      {charity.faqItems.map((faq, i) => (
                        <AccordionItem
                          key={i}
                          value={`faq-${i}`}
                          className="border border-border rounded-xl px-4 sm:px-5 data-[state=open]:bg-secondary/30"
                        >
                          <AccordionTrigger className="font-sans text-sm sm:text-base font-semibold text-foreground py-4 hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="font-sans text-sm text-muted-foreground leading-relaxed pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Sticky donate sidebar */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-lg"
                >
                  {/* Org mini branding */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                    <div className="h-6 w-6 rounded-md overflow-hidden bg-secondary flex items-center justify-center">
                      <img src={org.logo} alt={org.name} className="h-4 w-4 object-contain" />
                    </div>
                    <span className="font-sans text-[11px] font-medium text-muted-foreground">Donating to {org.name}</span>
                    {org.badge && (
                      <Badge variant="outline" className="ml-auto font-sans text-[9px] px-1.5 py-0">
                        <Shield className="h-2.5 w-2.5 mr-0.5" /> {org.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{charity.emoji}</span>
                    <h3 className="font-serif text-lg font-bold text-foreground">{charity.label}</h3>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground mb-5">{charity.heroSubtitle}</p>

                  <p className="font-sans text-xs font-medium text-foreground mb-2">Select amount</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {charity.presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                        className={cn(
                          "rounded-lg py-2.5 font-sans text-sm font-bold border-2 transition-all",
                          selectedAmount === amt && !customAmount
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-foreground hover:border-primary/30"
                        )}
                      >
                        £{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                    className="w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors mb-4"
                  />

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleDonate}
                      disabled={!donationValue || donationValue <= 0}
                      className="w-full rounded-full h-12 text-sm font-sans font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-lg shadow-primary/25 disabled:opacity-50"
                    >
                      Donate £{donationValue || 0}
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
                </motion.div>

                {/* Other causes */}
                <div className="mt-6 space-y-2">
                  <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider">Other ways to give</p>
                  {orgCauses
                    .filter((t) => t.id !== activeType)
                    .slice(0, 3)
                    .map((type) => (
                      <button
                        key={type.id}
                        onClick={() => { setActiveType(type.id); setSelectedAmount(null); setCustomAmount(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all text-left group"
                      >
                        <span className="text-lg">{type.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{type.label}</p>
                          <p className="font-sans text-[10px] text-muted-foreground truncate">{type.heroSubtitle}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-foreground py-10 sm:py-14">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center overflow-hidden">
                  <img src={org.logo} alt={org.name} className="h-5 w-5 object-contain" />
                </div>
                <span className="font-sans text-xs font-semibold text-primary-foreground">{org.name}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground leading-tight mb-3">
                Make a difference with {org.name}
              </h2>
              <p className="font-sans text-sm text-primary-foreground/60 leading-relaxed">
                {org.tagline}. Join {org.beneficiaries} people who have already been helped.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {charity.presetAmounts.slice(0, 3).map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={cn(
                      "px-5 py-2.5 rounded-lg font-sans text-sm font-bold border-2 transition-all",
                      selectedAmount === amt && !customAmount
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary-foreground/20 text-primary-foreground hover:border-primary-foreground/40"
                    )}
                  >
                    £{amt}
                  </button>
                ))}
              </div>
              <Button
                onClick={handleDonate}
                disabled={!donationValue || donationValue <= 0}
                className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-6 gap-2 shadow-lg shadow-primary/30 disabled:opacity-50"
              >
                Donate now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground border-t border-border/10 py-6">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Link to="/" className="font-serif text-lg font-bold text-primary-foreground">Bakking</Link>
              <Separator orientation="vertical" className="h-4 bg-primary-foreground/20" />
              <span className="font-sans text-xs text-primary-foreground/40">{org.name}</span>
            </div>
            <div className="flex items-center gap-4 font-sans text-[10px] text-primary-foreground/40">
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">Terms</a>
              <Link to="/charities" className="hover:text-primary-foreground/70 transition-colors">All Charities</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrgDonate;
