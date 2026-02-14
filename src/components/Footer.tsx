import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Creators: ["Podcasters", "Video creators", "Musicians", "Visual artists", "Communities", "Writers & journalists", "Gaming creators", "Nonprofits", "Tutorials and education", "Local businesses", "All"],
  Product: ["Lite", "Pro", "Premium", "Pricing", "Commerce"],
  Resources: ["Blog", "Starter kits", "Community", "Events", "Creator research", "Policy"],
  Company: ["About", "Press", "Careers", "Partner program", "Privacy", "Terms"],
};

const Footer = () => {
  return (
    <footer className="bg-dark py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-sans text-xs font-semibold text-on-dark/40 uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-sans text-sm text-on-dark/60 hover:text-on-dark transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-on-dark/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg font-bold text-on-dark">Creatorly</span>
          <p className="font-sans text-xs text-on-dark/30">© 2026 Creatorly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
