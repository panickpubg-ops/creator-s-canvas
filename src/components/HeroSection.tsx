import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-dark min-h-[90vh] flex items-end overflow-hidden pt-16">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Creator performing on stage"
          className="w-full h-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-20 md:pb-32">
        <div className="max-w-3xl">
          <Badge className="bg-accent-red text-primary-foreground border-none mb-6 text-xs font-sans font-semibold tracking-wide uppercase px-3 py-1">
            For creators who mean it
          </Badge>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-on-dark leading-[0.95] mb-8">
            Where creativity
            <br />
            <span className="italic">builds</span> independence.
          </h1>
          <p className="font-sans text-lg md:text-xl text-on-dark/70 max-w-lg mb-10 leading-relaxed">
            The platform where creators own their audience, monetize their craft,
            and build real businesses — without algorithms getting in the way.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-accent-red text-primary-foreground hover:bg-accent-red/90 rounded-full px-8 py-6 text-base font-semibold">
              Start creating
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-6 text-base font-semibold border-primary-foreground/30 text-on-dark hover:bg-primary-foreground/10">
              Explore creators
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
