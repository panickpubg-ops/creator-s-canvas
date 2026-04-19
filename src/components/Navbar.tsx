import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/charities" className="text-sm font-sans font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Charities
            </Link>
            <Link to="/campaigns" className="text-sm font-sans font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Campaigns
            </Link>
            <a href="#why-bakking" className="text-sm font-sans font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              How it works
            </a>
          </nav>
        </div>
        <Link to="/" className="font-serif text-xl font-bold text-primary-foreground tracking-tight absolute left-1/2 -translate-x-1/2">
          Bakking
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-sm font-sans font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-transparent">
            Log in
          </Button>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-sans font-semibold rounded-full px-5 sm:px-6">
            <Link to="/charities">Donate</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
