import appFeed from "@/assets/app-feed.png";
import creator3 from "@/assets/creator-3.jpg";

const YourWorldSection = () => {
  return (
    <section className="bg-beige py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Phone mockup with creator image */}
          <div className="relative mb-12">
            <div className="phone-mockup w-[240px] sm:w-[280px] hover-tilt">
              <div className="phone-mockup-inner">
                <img src={appFeed} alt="Your world to create" className="w-full" loading="lazy" />
              </div>
            </div>
            {/* Floating creator bubble */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background rounded-full px-4 py-2 shadow-lg flex items-center gap-2 z-20">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={creator3} alt="Creator" className="w-full h-full object-cover" />
              </div>
              <span className="font-sans text-xs font-semibold text-on-light whitespace-nowrap">Your world to create</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourWorldSection;
