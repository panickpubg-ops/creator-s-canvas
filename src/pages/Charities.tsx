import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Search,
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  Users,
  Heart,
  Shield,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Globe,
} from "lucide-react";
import { organizations } from "@/data/organizations";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const Charities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [likedOrgs, setLikedOrgs] = useState<Set<string>>(new Set());

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedOrgs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (!searchQuery) return organizations;
    const q = searchQuery.toLowerCase();
    return organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(q) ||
        org.tagline.toLowerCase().includes(q) ||
        org.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const featuredOrg = organizations.find((o) => o.featured && o.badge);

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-5 h-14 flex items-center justify-between">
          <Link to="/" className="font-serif text-lg font-bold text-foreground">
            Bakking
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/campaigns">
              <Button variant="ghost" size="sm" className="text-muted-foreground font-sans text-xs hidden sm:inline-flex">
                Campaigns
              </Button>
            </Link>
            <Link to="/donate">
              <Button
                size="sm"
                className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-4 sm:px-5 text-xs shadow-lg shadow-primary/20"
              >
                Quick Donate
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* FEATURED HERO */}
      <section className="pt-14">
        {featuredOrg && (
          <div className="relative overflow-hidden bg-foreground">
            <Link to={`/org/${featuredOrg.id}/donate`} className="block">
              <div className="relative min-h-[55vh] sm:min-h-[65vh] flex items-end">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={featuredOrg.banner}
                  alt={featuredOrg.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />
                <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-5 pb-10 sm:pb-16 pt-32">
                  <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
                    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                      <Badge className="bg-primary text-primary-foreground border-0 font-sans text-[10px] uppercase tracking-widest px-3 py-1">
                        <Sparkles className="h-3 w-3 mr-1" /> Featured Charity
                      </Badge>
                      {featuredOrg.badge && (
                        <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 font-sans text-[10px] uppercase tracking-widest px-3 py-1 backdrop-blur-sm">
                          <Shield className="h-3 w-3 mr-1" /> {featuredOrg.badge}
                        </Badge>
                      )}
                    </motion.div>
                    <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center overflow-hidden">
                        <img src={featuredOrg.logo} alt={featuredOrg.name} className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
                      </div>
                      <div>
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground leading-[1.1]">
                          {featuredOrg.name}
                        </h1>
                        <p className="font-sans text-sm text-primary-foreground/60 mt-1">{featuredOrg.tagline}</p>
                      </div>
                    </motion.div>
                    <motion.p variants={fadeUp} className="font-sans text-primary-foreground/70 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                      {featuredOrg.description}
                    </motion.p>
                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-6 font-sans text-xs text-primary-foreground/50">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" /> Est. {featuredOrg.established}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" /> {featuredOrg.beneficiaries} helped
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {featuredOrg.rating}
                        </span>
                      </div>
                      <Button
                        size="lg"
                        className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-8 shadow-xl shadow-primary/30 group"
                      >
                        Donate Now
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </section>

      {/* IMPACT STATS */}
      <section className="border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border"
          >
            {[
              { value: "5+", label: "Trusted Charities" },
              { value: "240M+", label: "Lives Impacted" },
              { value: "£2.5B+", label: "Total Raised" },
              { value: "100%", label: "Transparent" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="py-6 sm:py-8 md:py-10 text-center">
                <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="font-sans text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="sticky top-14 z-40 bg-background/90 backdrop-blur-xl border-b border-border/40">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search charities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 rounded-full bg-secondary border-0 font-sans text-xs"
              />
            </div>
            <div className="font-sans text-xs text-muted-foreground whitespace-nowrap">
              {filtered.length} {filtered.length === 1 ? "charity" : "charities"}
            </div>
          </div>
        </div>
      </section>

      {/* ORG GRID */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-6 sm:mb-8">
            <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Choose a Charity
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-sm text-muted-foreground">
              Select a trusted organisation and donate to the cause that matters most to you.
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={searchQuery}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
            >
              {filtered.map((org) => (
                <motion.div key={org.id} variants={scaleIn} layout>
                  <Link to={`/org/${org.id}/donate`} className="block group">
                    <Card className="overflow-hidden border-border/50 bg-card shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                      {/* Banner */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={org.banner}
                          alt={org.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        {/* Badge */}
                        {org.badge && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-background/90 text-foreground border-0 font-sans text-[10px] backdrop-blur-sm">
                              <Shield className="h-3 w-3 mr-1" />
                              {org.badge}
                            </Badge>
                          </div>
                        )}
                        {/* Like */}
                        <button
                          onClick={(e) => toggleLike(org.id, e)}
                          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4 transition-all",
                              likedOrgs.has(org.id) ? "fill-primary text-primary" : "text-muted-foreground"
                            )}
                          />
                        </button>
                        {/* Logo overlay */}
                        <div className="absolute -bottom-6 left-4">
                          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-card border-2 border-background shadow-lg flex items-center justify-center overflow-hidden">
                            <img src={org.logo} alt={org.name} className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
                          </div>
                        </div>
                      </div>

                      <CardContent className="pt-8 pb-5 px-4 sm:px-5">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-serif text-base sm:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                            {org.name}
                          </h3>
                          <div className="flex items-center gap-0.5 shrink-0 ml-2">
                            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                            <span className="font-sans text-xs font-semibold text-foreground">{org.rating}</span>
                          </div>
                        </div>
                        <p className="font-sans text-[11px] text-muted-foreground mb-3">{org.tagline}</p>

                        {/* Stats */}
                        <div className="flex items-center gap-3 mb-4 font-sans text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {org.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> Est. {org.established}
                          </span>
                        </div>

                        {/* Causes pills */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {org.causes.slice(0, 4).map((cause) => (
                            <span
                              key={cause}
                              className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-sans text-[10px] font-medium capitalize"
                            >
                              {cause.replace(/-/g, " ")}
                            </span>
                          ))}
                          {org.causes.length > 4 && (
                            <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-sans text-[10px] font-medium">
                              +{org.causes.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Raised + CTA */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div>
                            <span className="font-sans text-sm font-bold text-foreground">{org.totalRaised}</span>
                            <span className="font-sans text-[10px] text-muted-foreground ml-1">raised</span>
                          </div>
                          <span className="font-sans text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                            Donate <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Globe className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-sans text-sm text-muted-foreground">No charities found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-foreground py-10 sm:py-14">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5 text-center">
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground mb-3">
            Can't decide? Donate where most needed
          </h2>
          <p className="font-sans text-sm text-primary-foreground/60 mb-6 max-w-lg mx-auto">
            Your contribution will be directed to the most urgent causes across all our partner charities.
          </p>
          <Link to="/donate?type=where-most-needed">
            <Button size="lg" className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-8 shadow-xl shadow-primary/30 group">
              Donate Now <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground border-t border-border/10 py-6">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/" className="font-serif text-lg font-bold text-primary-foreground">
              Bakking
            </Link>
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

export default Charities;
