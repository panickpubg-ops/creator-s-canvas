import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Sparkles, HeartHandshake, Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const planRows = [
  { feature: "Custom creator/charity page", starter: true, pro: true, charity: true },
  { feature: "Unlimited posts & updates", starter: true, pro: true, charity: true },
  { feature: "Membership tiers", starter: "Up to 3", pro: "Unlimited", charity: "—" },
  { feature: "One-off donations", starter: true, pro: true, charity: true },
  { feature: "Direct messaging with supporters", starter: false, pro: true, charity: true },
  { feature: "Advanced analytics", starter: false, pro: true, charity: true },
  { feature: "Custom branding (logo, colors, banner)", starter: false, pro: true, charity: true },
  { feature: "Priority support", starter: false, pro: true, charity: true },
  { feature: "UK Gift Aid (+25%)", starter: "—", pro: "—", charity: true },
];

const Cell = ({ value }: { value: boolean | string }) => {
  if (value === true) return <Check className="h-4 w-4 text-primary mx-auto" aria-label="Included" />;
  if (value === false) return <X className="h-4 w-4 text-muted-foreground/40 mx-auto" aria-label="Not included" />;
  return <span className="font-sans text-sm text-foreground">{value}</span>;
};

const Pricing = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <section className="bg-dark pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="container max-w-5xl mx-auto px-5 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur border border-primary-foreground/15 text-primary-foreground/90 rounded-full px-3 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold">
              Simple, transparent pricing
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] font-bold text-primary-foreground leading-[0.95] mb-6">
            Free for charities.
            <br />
            <span className="italic font-light text-primary-foreground/95">Fair for creators.</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
            We charge nothing on charity donations — every penny reaches the cause. For creators, we take a small share of paid memberships to keep the platform running.
          </p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {/* Starter */}
            <div className="bg-background rounded-2xl border border-border p-7 md:p-8 flex flex-col">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-5">
                <Mic2 className="h-5 w-5 text-foreground" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">Creator Starter</h2>
              <p className="font-sans text-sm text-muted-foreground mb-5">For creators just getting going</p>
              <div className="mb-1">
                <span className="font-serif text-5xl font-bold text-foreground">8%</span>
                <span className="font-sans text-sm text-muted-foreground ml-2">per membership payment</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground mb-6">+ standard payment processing (~2.9% + 30p)</p>
              <Button asChild variant="outline" className="rounded-full mt-auto">
                <Link to="/create">Start free</Link>
              </Button>
            </div>

            {/* Pro — featured */}
            <div className="bg-foreground text-primary-foreground rounded-2xl border-2 border-primary p-7 md:p-8 flex flex-col relative shadow-xl shadow-primary/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Most popular
              </span>
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-1">Creator Pro</h2>
              <p className="font-sans text-sm text-primary-foreground/60 mb-5">For established creators ready to scale</p>
              <div className="mb-1">
                <span className="font-serif text-5xl font-bold">5%</span>
                <span className="font-sans text-sm text-primary-foreground/60 ml-2">per membership payment</span>
              </div>
              <p className="font-sans text-xs text-primary-foreground/50 mb-6">+ standard payment processing (~2.9% + 30p)</p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-auto">
                <Link to="/create">Start with Pro</Link>
              </Button>
            </div>

            {/* Charity */}
            <div className="bg-background rounded-2xl border border-border p-7 md:p-8 flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-primary-foreground text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                100% donation policy
              </span>
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <HeartHandshake className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">Charity</h2>
              <p className="font-sans text-sm text-muted-foreground mb-5">For registered UK charities</p>
              <div className="mb-1">
                <span className="font-serif text-5xl font-bold text-foreground">0%</span>
                <span className="font-sans text-sm text-muted-foreground ml-2">on donations, forever</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground mb-6">Payment processing covered separately by Bakking</p>
              <Button asChild variant="outline" className="rounded-full mt-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/charities">Register your charity</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Compare what's <span className="italic text-primary">included.</span>
            </h2>
          </div>

          <div className="bg-background rounded-2xl border border-border overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-left font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold px-6 py-4">Feature</th>
                    <th className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold px-6 py-4 text-center">Starter</th>
                    <th className="font-sans text-xs uppercase tracking-wider text-primary font-semibold px-6 py-4 text-center bg-primary/5">Pro</th>
                    <th className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold px-6 py-4 text-center">Charity</th>
                  </tr>
                </thead>
                <tbody>
                  {planRows.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="font-sans text-sm text-foreground px-6 py-4">{row.feature}</td>
                      <td className="px-6 py-4 text-center"><Cell value={row.starter} /></td>
                      <td className="px-6 py-4 text-center bg-primary/5"><Cell value={row.pro} /></td>
                      <td className="px-6 py-4 text-center"><Cell value={row.charity} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile stacked */}
            <div className="md:hidden divide-y divide-border">
              {planRows.map((row) => (
                <div key={row.feature} className="px-5 py-4">
                  <div className="font-sans text-sm font-semibold text-foreground mb-3">{row.feature}</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Starter</div>
                      <Cell value={row.starter} />
                    </div>
                    <div className="bg-primary/5 rounded-lg py-1">
                      <div className="font-sans text-[10px] uppercase tracking-wider text-primary mb-1">Pro</div>
                      <Cell value={row.pro} />
                    </div>
                    <div>
                      <div className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Charity</div>
                      <Cell value={row.charity} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ-ish notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <div className="bg-background border border-border rounded-2xl p-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">Why do creators pay a fee?</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Creator fees fund hosting, support, payments infrastructure and product development. They allow us to keep charity donations completely free.
              </p>
            </div>
            <div className="bg-background border border-border rounded-2xl p-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">How is 0% on charity donations possible?</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Bakking absorbs payment-processing costs for verified charities. Combined with UK Gift Aid, charities receive your full donation plus an extra 25%.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 font-sans font-semibold">
              <Link to="/create">
                Get started <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
