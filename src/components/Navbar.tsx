import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-sans font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Create on Creatorly
            </a>
            <a href="#" className="text-sm font-sans font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Explore
            </a>
            <a href="#" className="text-sm font-sans font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              How it works
            </a>
          </nav>
        </div>
        <span className="font-serif text-xl font-bold text-primary-foreground tracking-tight absolute left-1/2 -translate-x-1/2">
          Creatorly
        </span>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-sm font-sans font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-transparent">
            Log in
          </Button>
          <Button size="sm" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 text-sm font-sans font-semibold rounded-full px-6">
            Start my page
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
