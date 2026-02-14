import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";

const CreativityFandomSection = () => {
  return (
    <section className="bg-cream py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Top row: "Creativity powered" + images */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-end mb-6">
          <div className="col-span-12 md:col-span-4">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-on-light leading-[0.9]">
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

        {/* Bottom row: description + "by fandom" */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-start">
          <div className="col-span-12 md:col-span-6">
            <p className="font-sans text-base text-muted-foreground max-w-md leading-relaxed">
              Creatorly is a membership platform that helps creators run a subscription service, build community, and earn a living from their creative work with their biggest fans.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 text-right">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-on-light leading-[0.9]">
              by <span className="italic">fandom</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativityFandomSection;
