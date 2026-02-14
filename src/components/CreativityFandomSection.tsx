import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const CreativityFandomSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-glow bg-cream py-20 md:py-32 lg:py-40 overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container max-w-7xl mx-auto px-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Top row */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-end mb-8">
          <div className="col-span-12 md:col-span-4">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9]">
              Creativity
              <br />
              powered
            </h2>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img src={creator1} alt="Creator filming" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="rounded-xl overflow-hidden aspect-square">
              <img src={creator2} alt="Podcasters" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img src={creator3} alt="Writer" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
          <div className="col-span-12 md:col-span-6">
            <p className="font-sans text-base text-muted-foreground max-w-md leading-relaxed">
              Bakking is a membership platform that helps creators run a subscription service, build community, and earn a living from their creative work with their biggest fans.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 text-right">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9]">
              by <span className="italic">fandom</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativityFandomSection;
