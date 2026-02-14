import testimonialCreator from "@/assets/testimonial-creator.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const TestimonialSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative bg-dark overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={testimonialCreator}
          alt="Creator performing"
          className="w-full h-full object-cover opacity-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/40" />
      </div>

      <div
        ref={ref}
        className={cn(
          "relative z-10 container max-w-7xl mx-auto px-6 py-28 md:py-44 lg:py-60 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-3xl">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-[1.2] mb-10 italic">
            "Creatorly provides a space for artists to sustain ourselves,
            by connecting us directly to our own communities."
          </p>
          <p className="font-sans text-lg sm:text-xl font-bold text-primary-foreground tracking-widest uppercase">
            KAMAUU
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
