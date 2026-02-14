import { Card, CardContent } from "@/components/ui/card";
import cardCommunity from "@/assets/card-community.jpg";
import cardMonetize from "@/assets/card-monetize.jpg";
import cardFuture from "@/assets/card-future.jpg";

const cards = [
  { title: "Build your community", desc: "Create a space where your most passionate fans connect with you and each other.", image: cardCommunity },
  { title: "Monetize your craft", desc: "Turn your creative work into sustainable income with flexible membership tiers.", image: cardMonetize },
  { title: "Own your future", desc: "No algorithms, no middlemen. Your audience, your rules, your independence.", image: cardFuture },
];

const YourWorldSection = () => {
  return (
    <section className="bg-cream py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Centered editorial headline */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-light leading-[0.95] mb-6">
            Your world
            <br />
            to <span className="italic">create.</span>
          </h2>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            Everything you need to turn your passion into a thriving, independent creative business.
          </p>
        </div>

        {/* Three cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, i) => (
            <Card
              key={card.title}
              className="group border-none bg-transparent shadow-none hover-lift cursor-default overflow-hidden rounded-2xl"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-[320px] sm:h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              </div>
              <CardContent className="p-0 pt-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-on-light mb-2">{card.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YourWorldSection;
