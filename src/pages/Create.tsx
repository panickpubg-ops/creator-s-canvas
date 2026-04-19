import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Mic2, Music, Palette, BookOpen, Camera, Video, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

const benefits = [
  "A custom page in minutes — no code needed",
  "Up to 3 membership tiers (unlimited on Pro)",
  "Direct messaging with your biggest fans",
  "Get paid in GBP, EUR or USD",
  "Cancel any time — your audience stays yours",
];

const Create = () => {
  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !category) {
      toast({ title: "Missing details", description: "Please fill in your name, email and pick a category.", variant: "destructive" });
      return;
    }
    toast({
      title: "You're on the list!",
      description: `Welcome ${name}. We'll send setup instructions to ${email}.`,
    });
    setName(""); setHandle(""); setEmail(""); setBio(""); setCategory("");
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <section className="bg-dark pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="container max-w-5xl mx-auto px-5 sm:px-6 relative">
          <Link to="/" className="font-sans text-xs uppercase tracking-[0.18em] text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            ← Back to home
          </Link>
          <h1 className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] font-bold text-primary-foreground leading-[0.95] mt-5 mb-5">
            Build your{" "}
            <span className="italic text-primary font-light">creator page</span>
            <br />
            in under 5 minutes.
          </h1>
          <p className="font-sans text-base md:text-lg text-primary-foreground/70 max-w-xl leading-relaxed">
            Tell us a bit about your work. We'll set up a beautiful page for your community, with memberships, posts and direct messaging — ready to share.
          </p>
        </div>
      </section>

      {/* Form + benefits */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-background border border-border rounded-2xl p-6 md:p-10 space-y-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">Tell us about you</h2>
              <p className="font-sans text-sm text-muted-foreground">All fields are editable later.</p>
            </div>

            {/* Category */}
            <div>
              <Label className="font-sans text-sm font-semibold text-foreground mb-3 block">What do you create?</Label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 transition-all duration-200",
                      category === c.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    )}
                  >
                    <c.icon className="h-4 w-4" />
                    <span className="font-sans text-[11px] font-medium leading-none">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="font-sans text-sm font-semibold text-foreground mb-2 block">Display name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sarah Chen" className="rounded-lg h-11" />
              </div>
              <div>
                <Label htmlFor="handle" className="font-sans text-sm font-semibold text-foreground mb-2 block">Page URL</Label>
                <div className="flex items-center rounded-lg border border-input bg-background h-11 overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                  <span className="font-sans text-sm text-muted-foreground pl-3 pr-1">bakking.com/</span>
                  <input
                    id="handle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="sarah"
                    className="flex-1 bg-transparent border-0 outline-none font-sans text-sm h-full pr-3"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="font-sans text-sm font-semibold text-foreground mb-2 block">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="rounded-lg h-11" />
            </div>

            <div>
              <Label htmlFor="bio" className="font-sans text-sm font-semibold text-foreground mb-2 block">Short bio <span className="font-normal text-muted-foreground">(optional)</span></Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="What kind of work will you share with your community?" rows={4} className="rounded-lg resize-none" />
            </div>

            <div className="flex items-start gap-2 bg-muted/40 border border-border rounded-lg p-3">
              <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Standard creator fees apply to paid memberships.{" "}
                <Link to="/pricing" className="text-foreground font-semibold underline">See pricing</Link>.
              </p>
            </div>

            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 font-sans font-semibold">
              Create my page <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>

          {/* Benefits sidebar */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="bg-foreground text-primary-foreground rounded-2xl p-6 md:p-7">
              <h3 className="font-serif text-2xl font-bold mb-4">What you get</h3>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-primary-foreground/85 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-2xl p-6">
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">Are you a charity instead?</h3>
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
