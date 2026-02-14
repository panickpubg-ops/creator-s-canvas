import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-dark py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-6">
        {/* CTA */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-on-dark leading-[0.95] mb-6">
            Ready to own your
            <br />
            <span className="italic">creative future?</span>
          </h2>
          <Button className="bg-accent-red text-primary-foreground hover:bg-accent-red/90 rounded-full px-10 py-6 text-base font-semibold">
            Get started for free
          </Button>
        </div>

        <Separator className="bg-primary-foreground/10 mb-12" />

        {/* Footer links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-sans text-sm font-semibold text-on-dark mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Mobile App", "Integrations"].map((l) => (
                <li key={l}><a href="#" className="font-sans text-sm text-on-dark/50 hover:text-on-dark transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold text-on-dark mb-4">Creators</h4>
            <ul className="space-y-2">
              {["Podcasters", "Musicians", "Artists", "Writers"].map((l) => (
                <li key={l}><a href="#" className="font-sans text-sm text-on-dark/50 hover:text-on-dark transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold text-on-dark mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Blog", "Help Center", "Community", "Creator Academy"].map((l) => (
                <li key={l}><a href="#" className="font-sans text-sm text-on-dark/50 hover:text-on-dark transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold text-on-dark mb-4">Company</h4>
            <ul className="space-y-2">
              {["About", "Careers", "Press", "Legal"].map((l) => (
                <li key={l}><a href="#" className="font-sans text-sm text-on-dark/50 hover:text-on-dark transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg font-bold text-on-dark">Creatorly</span>
          <p className="font-sans text-xs text-on-dark/40">© 2026 Creatorly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
