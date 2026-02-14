import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const SignUpSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-dark py-24 md:py-32 lg:py-40 overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container max-w-7xl mx-auto px-6 text-center transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[0.9] mb-6">
          Ready to create
          <br />
          <span className="italic">on your terms?</span>
        </h2>
        <p className="font-sans text-lg text-primary-foreground/60 max-w-xl mx-auto mb-10 leading-relaxed">
          Join thousands of creators who are building sustainable businesses with their communities. Get started for free.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-8">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded-full px-6 h-12 font-sans focus-visible:ring-accent-red"
          />
          <Button className="bg-accent-red hover:bg-accent-red/90 text-primary-foreground rounded-full px-8 h-12 font-sans font-semibold whitespace-nowrap w-full sm:w-auto">
            Start my page
          </Button>
        </div>
        <p className="font-sans text-xs text-primary-foreground/30">
          Free to start · No credit card required · Set up in minutes
        </p>
      </div>
    </section>
  );
};

export default SignUpSection;
