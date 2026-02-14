import AnimatedPhoneMockup from "@/components/AnimatedPhoneMockup";
import appFeed from "@/assets/app-feed.png";
import appMessaging from "@/assets/app-messaging.png";
import appRevenue from "@/assets/app-revenue.png";
import creator3 from "@/assets/creator-3.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const YourWorldSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-glow bg-beige py-20 md:py-32 lg:py-40 overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container max-w-7xl mx-auto px-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="flex flex-col items-center text-center">
          {/* Animated phone mockup */}
          <div className="relative mb-16">
            <AnimatedPhoneMockup
              images={[appFeed, appMessaging, appRevenue]}
              alt="Your world to create"
              className="w-[240px] sm:w-[280px]"
              interval={2500}
            />
            {/* Floating creator bubble */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background rounded-full px-4 py-2 shadow-lg flex items-center gap-2 z-20">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={creator3} alt="Creator" className="w-full h-full object-cover" />
              </div>
              <span className="font-sans text-xs font-semibold text-foreground whitespace-nowrap">Your world to create</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourWorldSection;
