import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Mic2,
  Music,
  Palette,
  BookOpen,
  Camera,
  Video,
  Info,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const categories = [
  { id: "podcast", label: "Podcast", icon: Mic2 },
  { id: "music", label: "Music", icon: Music },
  { id: "art", label: "Art & Design", icon: Palette },
  { id: "writing", label: "Writing", icon: BookOpen },
  { id: "photo", label: "Photography", icon: Camera },
  { id: "video", label: "Video", icon: Video },
];

type Tier = { id: string; name: string; price: string; perks: string };

const defaultTiers: Tier[] = [
  { id: "t1", name: "Supporter", price: "3", perks: "Early access to posts" },
  { id: "t2", name: "Insider", price: "8", perks: "Behind-the-scenes + monthly Q&A" },
];

const stepTitles = ["Category", "Details", "Tiers", "Preview"];

const Create = () => {
  const [step, setStep] = useState(0);

  // Step 1
  const [category, setCategory] = useState<string>("");

  // Step 2
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // Step 3
  const [tiers, setTiers] = useState<Tier[]>(defaultTiers);

  const progress = ((step + 1) / stepTitles.length) * 100;
  const activeCategory = categories.find((c) => c.id === category);

  const canNext = () => {
    if (step === 0) return !!category;
    if (step === 1) return !!name && !!email;
    if (step === 2) return tiers.length > 0 && tiers.every((t) => t.name && t.price);
    return true;
  };

  const goNext = () => {
    if (!canNext()) {
      toast({
        title: "A few details missing",
        description:
          step === 0
            ? "Pick a category to continue."
            : step === 1
              ? "Add your name and email to continue."
              : "Each tier needs a name and price.",
        variant: "destructive",
      });
      return;
    }
    setStep((s) => Math.min(s + 1, stepTitles.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    toast({
      title: "You're on the list!",
      description: `Welcome ${name}. We'll send setup instructions to ${email}.`,
    });
    setStep(0);
    setCategory("");
    setName("");
    setHandle("");
    setEmail("");
    setBio("");
    setTiers(defaultTiers);
  };

  const addTier = () => {
    if (tiers.length >= 3) return;
    setTiers([...tiers, { id: `t${Date.now()}`, name: "", price: "", perks: "" }]);
  };

  const removeTier = (id: string) => setTiers(tiers.filter((t) => t.id !== id));

  const updateTier = (id: string, key: keyof Tier, value: string) =>
    setTiers(tiers.map((t) => (t.id === id ? { ...t, [key]: value } : t)));

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <section className="bg-dark pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="container max-w-5xl mx-auto px-5 sm:px-6 relative">
          <Link
            to="/"
            className="font-sans text-xs uppercase tracking-[0.18em] text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          >
            ← Back to home
          </Link>
          <h1 className="font-serif text-[clamp(2.25rem,7vw,4.5rem)] font-bold text-primary-foreground leading-[0.95] mt-5 mb-4">
            Build your{" "}
            <span className="italic text-primary font-light">creator page</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-primary-foreground/70 max-w-xl leading-relaxed">
            Four quick steps. No code, no fuss — your community will be ready to share in minutes.
          </p>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-12 md:py-20">
        <div className="container max-w-6xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: stepper + content */}
          <div className="lg:col-span-3">
            {/* Stepper */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Step {step + 1} of {stepTitles.length}
                </p>
                <p className="font-sans text-xs font-semibold text-foreground">
                  {stepTitles[step]}
                </p>
              </div>
              <Progress value={progress} className="h-1.5 bg-muted" />
              <div className="hidden sm:flex items-center justify-between mt-3">
                {stepTitles.map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => i < step && setStep(i)}
                    className={cn(
                      "font-sans text-[11px] uppercase tracking-wider transition-colors",
                      i === step
                        ? "text-foreground font-semibold"
                        : i < step
                          ? "text-foreground/50 hover:text-foreground"
                          : "text-muted-foreground/50",
                    )}
                  >
                    {i + 1}. {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-6 md:p-10 min-h-[420px]">
              {/* Step 0: Category */}
              {step === 0 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">
                      What do you create?
                    </h2>
                    <p className="font-sans text-sm text-muted-foreground">
                      We'll tailor your page layout and tier suggestions.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 rounded-xl border p-5 transition-all duration-200",
                          category === c.id
                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                            : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                        )}
                      >
                        <c.icon className="h-5 w-5" />
                        <span className="font-sans text-sm font-semibold leading-none">
                          {c.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Details */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">
                      Tell us about you
                    </h2>
                    <p className="font-sans text-sm text-muted-foreground">
                      All fields are editable later.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="name"
                        className="font-sans text-sm font-semibold text-foreground mb-2 block"
                      >
                        Display name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Chen"
                        className="rounded-lg h-11"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="handle"
                        className="font-sans text-sm font-semibold text-foreground mb-2 block"
                      >
                        Page URL
                      </Label>
                      <div className="flex items-center rounded-lg border border-input bg-background h-11 overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                        <span className="font-sans text-sm text-muted-foreground pl-3 pr-1">
                          bakking.com/
                        </span>
                        <input
                          id="handle"
                          value={handle}
                          onChange={(e) =>
                            setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                          }
                          placeholder="sarah"
                          className="flex-1 bg-transparent border-0 outline-none font-sans text-sm h-full pr-3"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="font-sans text-sm font-semibold text-foreground mb-2 block"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="rounded-lg h-11"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="bio"
                      className="font-sans text-sm font-semibold text-foreground mb-2 block"
                    >
                      Short bio{" "}
                      <span className="font-normal text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="What kind of work will you share with your community?"
                      rows={4}
                      className="rounded-lg resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Tiers */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">
                      Set up membership tiers
                    </h2>
                    <p className="font-sans text-sm text-muted-foreground">
                      Up to 3 tiers on Starter, unlimited on Pro. Tweak anytime.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {tiers.map((tier, idx) => (
                      <div
                        key={tier.id}
                        className="border border-border rounded-xl p-4 md:p-5 space-y-3 bg-muted/20"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                            Tier {idx + 1}
                          </p>
                          {tiers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTier(tier.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Remove tier"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <Label className="font-sans text-xs font-semibold text-foreground mb-1.5 block">
                              Name
                            </Label>
                            <Input
                              value={tier.name}
                              onChange={(e) => updateTier(tier.id, "name", e.target.value)}
                              placeholder="Supporter"
                              className="rounded-lg h-10"
                            />
                          </div>
                          <div>
                            <Label className="font-sans text-xs font-semibold text-foreground mb-1.5 block">
                              Price (£/mo)
                            </Label>
                            <Input
                              type="number"
                              min="1"
                              value={tier.price}
                              onChange={(e) => updateTier(tier.id, "price", e.target.value)}
                              placeholder="5"
                              className="rounded-lg h-10"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="font-sans text-xs font-semibold text-foreground mb-1.5 block">
                            Perks
                          </Label>
                          <Input
                            value={tier.perks}
                            onChange={(e) => updateTier(tier.id, "perks", e.target.value)}
                            placeholder="Early access, behind-the-scenes…"
                            className="rounded-lg h-10"
                          />
                        </div>
                      </div>
                    ))}

                    {tiers.length < 3 && (
                      <button
                        type="button"
                        onClick={addTier}
                        className="w-full border border-dashed border-border rounded-xl p-4 font-sans text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="h-4 w-4" /> Add another tier
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Preview */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">
                      Looking good
                    </h2>
                    <p className="font-sans text-sm text-muted-foreground">
                      Here's a quick preview. Hit publish when you're ready.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border overflow-hidden bg-background">
                    <div className="bg-dark p-6 md:p-8 relative">
                      <div className="absolute top-0 right-0 w-[260px] h-[180px] bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
                      <div className="relative flex items-start gap-4">
                        <div className="h-14 w-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                          {activeCategory ? (
                            <activeCategory.icon className="h-6 w-6 text-primary" />
                          ) : (
                            <Sparkles className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground truncate">
                            {name || "Your name"}
                          </h3>
                          <p className="font-sans text-xs text-primary-foreground/60 mt-0.5 truncate">
                            bakking.com/{handle || "your-handle"} ·{" "}
                            {activeCategory?.label ?? "Creator"}
                          </p>
                          {bio && (
                            <p className="font-sans text-sm text-primary-foreground/80 mt-3 leading-relaxed line-clamp-3">
                              {bio}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 md:p-6">
                      <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                        Membership tiers
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {tiers.map((tier) => (
                          <div
                            key={tier.id}
                            className="border border-border rounded-lg p-4 bg-muted/20"
                          >
                            <p className="font-sans text-sm font-bold text-foreground">
                              {tier.name || "Tier"}
                            </p>
                            <p className="font-serif text-2xl font-bold text-primary mt-1">
                              £{tier.price || "0"}
                              <span className="font-sans text-xs text-muted-foreground font-normal">
                                /mo
                              </span>
                            </p>
                            {tier.perks && (
                              <p className="font-sans text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                                {tier.perks}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-muted/40 border border-border rounded-lg p-3">
                    <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Standard creator fees apply to paid memberships.{" "}
                      <Link
                        to="/pricing"
                        className="text-foreground font-semibold underline"
                      >
                        See pricing
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={goBack}
                disabled={step === 0}
                className="rounded-full font-sans"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
              </Button>
              {step < stepTitles.length - 1 ? (
                <Button
                  type="button"
                  size="lg"
                  onClick={goNext}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 px-8 font-sans font-semibold"
                >
                  Continue <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="lg"
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 px-8 font-sans font-semibold"
                >
                  Publish my page <Check className="ml-1.5 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Right: sidebar */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="bg-foreground text-primary-foreground rounded-2xl p-6 md:p-7">
              <h3 className="font-serif text-2xl font-bold mb-4">What you get</h3>
              <ul className="space-y-3">
                {[
                  "A custom page in minutes — no code needed",
                  "Up to 3 membership tiers (unlimited on Pro)",
                  "Direct messaging with your biggest fans",
                  "Get paid in GBP, EUR or USD",
                  "Cancel any time — your audience stays yours",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-primary-foreground/85 leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-2xl p-6">
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                Are you a charity instead?
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                Charities pay 0% on donations and get UK Gift Aid built in.
              </p>
              <Button asChild variant="outline" className="rounded-full w-full">
                <Link to="/charities">Browse charity onboarding</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Create;
