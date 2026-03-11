import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Search,
  Heart,
  Users,
  Clock,
  ArrowRight,
  Droplets,
  GraduationCap,
  Stethoscope,
  UtensilsCrossed,
  Home,
  Baby,
  Globe,
  Sparkles,
  ChevronRight,
  ArrowUpDown,
  TrendingUp,
} from "lucide-react";
import { campaigns } from "@/data/campaigns";

const categories = [
  { id: "all", label: "All Causes", icon: Globe },
  { id: "water", label: "Clean Water", icon: Droplets },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "medical", label: "Healthcare", icon: Stethoscope },
  { id: "food", label: "Food Relief", icon: UtensilsCrossed },
  { id: "shelter", label: "Shelter", icon: Home },
  { id: "orphans", label: "Orphan Care", icon: Baby },
];

const impactNumbers = [
  { value: "2.4M+", label: "Lives Impacted" },
  { value: "$18M", label: "Total Raised" },
  { value: "350+", label: "Active Campaigns" },
  { value: "98%", label: "Funds Delivered" },
];

type SortOption = "featured" | "most-funded" | "ending-soon" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "most-funded", label: "Most Funded" },
  { value: "ending-soon", label: "Ending Soon" },
  { value: "newest", label: "Newest" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const Campaigns = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [likedCampaigns, setLikedCampaigns] = useState<Set<string>>(new Set());

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedCampaigns((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = campaigns.filter((c) => {
      const matchCategory = activeCategory === "all" || c.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    switch (sortBy) {
      case "most-funded":
        result = [...result].sort((a, b) => (b.raised / b.goal) - (a.raised / a.goal));
        break;
      case "ending-soon":
        result = [...result].sort((a, b) => a.daysLeft - b.daysLeft);
        break;
      case "newest":
        result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "featured":
      default:
        result = [...result].sort((a, b) => {
          if (a.featured && a.urgent) return -1;
          if (b.featured && b.urgent) return 1;
          if (a.featured) return -1;
          if (b.featured) return 1;
          if (a.urgent) return -1;
          if (b.urgent) return 1;
          return 0;
        });
        break;
    }
    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const featuredCampaign = campaigns.find((c) => c.featured && c.urgent);

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
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground font-sans text-xs hidden sm:inline-flex">
                Home
              </Button>
            </Link>
            <Button
              size="sm"
              className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-4 sm:px-5 text-xs shadow-lg shadow-primary/20"
            >
              Start a Campaign
            </Button>
          </div>
        </div>
      </motion.header>

      {/* HERO */}
      <section className="pt-14">
        <div className="relative overflow-hidden bg-foreground">
          {featuredCampaign && (
            <Link to={`/campaign/${featuredCampaign.id}`} className="block">
              <div className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={featuredCampaign.image}
                  alt={featuredCampaign.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
                <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-5 pb-10 sm:pb-16 pt-32">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="max-w-2xl"
                  >
                    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                      <Badge className="bg-primary text-primary-foreground border-0 font-sans text-[10px] uppercase tracking-widest px-3 py-1">
                        <Sparkles className="h-3 w-3 mr-1" /> Featured
                      </Badge>
                      {featuredCampaign.urgent && (
                        <Badge className="bg-destructive text-destructive-foreground border-0 font-sans text-[10px] uppercase tracking-widest px-3 py-1">
                          <Clock className="h-3 w-3 mr-1" /> Urgent
                        </Badge>
                      )}
                    </motion.div>
                    <motion.h1
                      variants={fadeUp}
                      className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-3 sm:mb-4"
                    >
                      {featuredCampaign.title}
                    </motion.h1>
                    <motion.p
                      variants={fadeUp}
                      className="font-sans text-primary-foreground/70 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl"
                    >
                      {featuredCampaign.excerpt}
                    </motion.p>
                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                      <div className="flex-1 max-w-xs w-full">
                        <div className="flex justify-between font-sans text-xs text-primary-foreground/60 mb-2">
                          <span className="font-semibold text-primary-foreground">
                            ${featuredCampaign.raised.toLocaleString()}
                          </span>
                          <span>of ${featuredCampaign.goal.toLocaleString()}</span>
                        </div>
                        <Progress
                          value={(featuredCampaign.raised / featuredCampaign.goal) * 100}
                          className="h-2 bg-primary-foreground/10"
                        />
                        <div className="flex gap-4 mt-2 font-sans text-xs text-primary-foreground/50">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> {featuredCampaign.donors} donors
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {featuredCampaign.daysLeft} days left
                          </span>
                        </div>
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
          )}
        </div>
      </section>

      {/* IMPACT STRIP */}
      <section className="border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border"
          >
            {impactNumbers.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="py-6 sm:py-8 md:py-10 text-center"
              >
                <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="font-sans text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FILTERS + SEARCH + SORT */}
      <section className="sticky top-14 z-40 bg-background/90 backdrop-blur-xl border-b border-border/40">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5 py-3 sm:py-4">
          <div className="flex flex-col gap-3">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-sans text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all",
                      isActive
                        ? "bg-foreground text-background shadow-md"
                        : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
            {/* Search + Sort row */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 rounded-full bg-secondary border-0 font-sans text-xs"
                />
              </div>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[140px] sm:w-[160px] h-9 rounded-full bg-secondary border-0 font-sans text-xs">
                  <ArrowUpDown className="h-3 w-3 mr-1.5 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="font-sans text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPAIGNS GRID */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery + sortBy}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
            >
              {filtered.map((campaign) => (
                <motion.div key={campaign.id} variants={scaleIn} layout>
                  <Link to={`/campaign/${campaign.id}`} className="block group">
                    <Card className="overflow-hidden border-border/50 bg-card shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={campaign.image}
                          alt={campaign.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <Badge className="bg-background/90 text-foreground border-0 font-sans text-[10px] backdrop-blur-sm">
                            {categories.find((c) => c.id === campaign.category)?.label}
                          </Badge>
                          {campaign.urgent && (
                            <Badge className="bg-destructive text-destructive-foreground border-0 font-sans text-[10px]">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        {/* Like */}
                        <button
                          onClick={(e) => toggleLike(campaign.id, e)}
                          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4 transition-all",
                              likedCampaigns.has(campaign.id)
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                        </button>
                        {/* Location */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 font-sans text-[10px] text-primary-foreground/80 bg-foreground/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          <Globe className="h-3 w-3" />
                          {campaign.location}
                        </div>
                      </div>
                      <CardContent className="p-4 sm:p-5">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {campaign.title}
                        </h3>
                        <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                          {campaign.excerpt}
                        </p>
                        {/* Progress */}
                        <div className="space-y-2">
                          <Progress
                            value={(campaign.raised / campaign.goal) * 100}
                            className="h-1.5"
                          />
                          <div className="flex items-center justify-between">
                            <div className="font-sans">
                              <span className="text-sm font-bold text-foreground">
                                ${campaign.raised.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-muted-foreground ml-1">
                                of ${campaign.goal.toLocaleString()}
                              </span>
                            </div>
                            <span className="font-sans text-[10px] text-muted-foreground">
                              {Math.round((campaign.raised / campaign.goal) * 100)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between font-sans text-[10px] text-muted-foreground pt-1">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" /> {campaign.donors} donors
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {campaign.daysLeft} days left
                            </span>
                          </div>
                        </div>
                        {/* CTA */}
                        <div className="mt-4 flex items-center justify-between">
                          <Button
                            size="sm"
                            className="rounded-full bg-primary text-primary-foreground font-sans text-xs px-5 shadow-md shadow-primary/15"
                          >
                            Donate
                          </Button>
                          <span className="font-sans text-[10px] text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                            Learn more <ChevronRight className="h-3 w-3" />
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 sm:py-20"
            >
              <Search className="h-10 sm:h-12 w-10 sm:w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-2">No campaigns found</h3>
              <p className="font-sans text-sm text-muted-foreground">
                Try adjusting your filters or search terms.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-foreground">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5 py-12 sm:py-16 md:py-20 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-background mb-3 sm:mb-4"
            >
              Ready to Make a Difference?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-sans text-background/60 max-w-md mx-auto mb-6 sm:mb-8 text-sm sm:text-base"
            >
              Start your own campaign and rally your community around the causes that matter most.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                size="lg"
                className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-8 shadow-xl shadow-primary/30"
              >
                Start a Campaign
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-border text-background font-sans font-semibold px-8 hover:bg-background/10"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 sm:py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <span className="font-serif text-sm font-bold text-foreground">Bakking</span>
          <span className="font-sans text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bakking. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Campaigns;
