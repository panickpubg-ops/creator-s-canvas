import campaignHero from "@/assets/campaign-hero.jpg";
import campaignWater from "@/assets/campaign-water.jpg";
import campaignEducation from "@/assets/campaign-education.jpg";
import campaignMedical from "@/assets/campaign-medical.jpg";
import campaignFood from "@/assets/campaign-food.jpg";
import campaignShelter from "@/assets/campaign-shelter.jpg";
import campaignOrphan from "@/assets/campaign-orphan.jpg";
import gallery1 from "@/assets/campaign-gallery-1.jpg";
import gallery2 from "@/assets/campaign-gallery-2.jpg";
import gallery3 from "@/assets/campaign-gallery-3.jpg";
import gallery4 from "@/assets/campaign-gallery-4.jpg";
import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";

export interface CampaignData {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  fullDescription: string[];
  image: string;
  category: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  featured: boolean;
  urgent: boolean;
  location: string;
  organizer: { name: string; role: string; avatar: string; location: string };
  gallery: { src: string; alt: string; caption: string }[];
  milestones: { title: string; desc: string; done: boolean; date: string }[];
  impactStats: { number: string; label: string }[];
  testimonials: { name: string; role: string; text: string; avatar: string }[];
  recentDonors: { name: string; amount: string; time: string; emoji: string }[];
  budgetBreakdown: { pct: number; amount: string; title: string }[];
  createdAt: string;
}

export const campaigns: CampaignData[] = [
  {
    id: "community-center",
    title: "Rebuild the Heart of Our Community",
    subtitle: "Community Project · Austin, TX",
    excerpt: "Transforming a historic space into a modern hub for 2,400+ residents with expanded programs and accessibility.",
    fullDescription: [
      "For over 20 years, the community center has been the heartbeat of our neighborhood — a sanctuary for learning, creativity, and human connection.",
      "It's where children take their first art class, where seniors gather for morning coffee, and where families celebrate milestones together. The building holds thousands of memories — birthday parties, town halls, after-school tutoring, weekend farmers markets.",
      "But our community has outgrown its walls. Programs run at capacity. The roof needs repair. The entrance isn't wheelchair accessible. We need a space that matches the spirit of the people who use it.",
    ],
    image: campaignHero,
    category: "shelter",
    raised: 65000,
    goal: 100000,
    donors: 125,
    daysLeft: 34,
    featured: true,
    urgent: false,
    location: "Austin, TX",
    organizer: { name: "Sarah Chen", role: "Community Director", avatar: creator1, location: "Austin, TX" },
    gallery: [
      { src: campaignHero, alt: "Community center main hall", caption: "The main hall — ready for transformation" },
      { src: gallery1, alt: "Renovation in progress", caption: "Historic brick interior awaiting new life" },
      { src: gallery2, alt: "Community art program", caption: "Our youth art programs bring color to the neighborhood" },
      { src: gallery3, alt: "Architectural renders", caption: "The architect's vision for the new center" },
      { src: gallery4, alt: "Community meeting", caption: "Where every voice matters" },
    ],
    milestones: [
      { title: "Community Approved", desc: "Plans greenlit by the neighborhood board", done: true, date: "Jan 2026" },
      { title: "First $25K Raised", desc: "Foundation phase funded by early supporters", done: true, date: "Feb 2026" },
      { title: "Architect Onboarded", desc: "Design phase begins with local firm", done: true, date: "Feb 2026" },
      { title: "Construction Begins", desc: "Breaking ground once we hit 80%", done: false, date: "Apr 2026" },
      { title: "Grand Opening", desc: "Doors open to the entire community", done: false, date: "Aug 2026" },
    ],
    impactStats: [
      { number: "2,400+", label: "People Served Annually" },
      { number: "15", label: "Weekly Programs" },
      { number: "20+", label: "Years of Service" },
      { number: "98%", label: "Satisfaction Rate" },
    ],
    testimonials: [
      { name: "Maria Rodriguez", role: "Parent & Volunteer", text: "This center is where my kids learned to paint. It needs to keep growing for the next generation.", avatar: creator2 },
      { name: "James Wright", role: "Senior Program Member", text: "I've been coming here every morning for 8 years. This renovation will change so many lives.", avatar: creator3 },
      { name: "Sarah Chen", role: "Community Director", text: "Every dollar goes directly to making our space more inclusive and accessible for everyone.", avatar: creator1 },
    ],
    recentDonors: [
      { name: "Alex M.", amount: "$100", time: "2 hours ago", emoji: "💎" },
      { name: "Jordan K.", amount: "$25", time: "5 hours ago", emoji: "⭐" },
      { name: "Anonymous", amount: "$50", time: "1 day ago", emoji: "🤝" },
      { name: "Priya S.", amount: "$250", time: "2 days ago", emoji: "🏛️" },
    ],
    budgetBreakdown: [
      { pct: 50, amount: "$50,000", title: "Main Hall Renovation" },
      { pct: 30, amount: "$30,000", title: "New Classrooms & Programs" },
      { pct: 20, amount: "$20,000", title: "Accessibility Upgrades" },
    ],
    createdAt: "2026-01-15",
  },
  {
    id: "clean-water-wells",
    title: "Clean Water for Rural Villages",
    subtitle: "Water Access · Sub-Saharan Africa",
    excerpt: "Building sustainable water wells to provide safe drinking water for communities facing severe water scarcity.",
    fullDescription: [
      "Access to clean water is a basic human right, yet millions of people in sub-Saharan Africa walk miles every day just to collect water that may not even be safe to drink.",
      "Our project focuses on building deep-bore wells equipped with hand pumps in remote villages where water scarcity affects every aspect of daily life — from health and hygiene to education and economic opportunity.",
      "Each well serves approximately 500 people and is built to last 20+ years. We work with local communities to ensure maintenance and sustainability long after construction is complete.",
    ],
    image: campaignWater,
    category: "water",
    raised: 42000,
    goal: 75000,
    donors: 312,
    daysLeft: 21,
    featured: false,
    urgent: true,
    location: "Sub-Saharan Africa",
    organizer: { name: "Amara Diallo", role: "Water Access Director", avatar: creator2, location: "Dakar, Senegal" },
    gallery: [
      { src: campaignWater, alt: "Water well construction", caption: "Building hope, one well at a time" },
      { src: gallery1, alt: "Community gathering", caption: "Villagers celebrating a new water source" },
      { src: gallery2, alt: "Children at the well", caption: "Clean water changes everything for children" },
      { src: gallery3, alt: "Engineering survey", caption: "Our team surveying the next well site" },
      { src: gallery4, alt: "Training session", caption: "Training locals to maintain the wells" },
    ],
    milestones: [
      { title: "Sites Surveyed", desc: "Geological surveys completed in 8 villages", done: true, date: "Dec 2025" },
      { title: "First Well Complete", desc: "Village of Kouroussa now has clean water", done: true, date: "Jan 2026" },
      { title: "50% Funded", desc: "Community rallied to pass the halfway mark", done: true, date: "Feb 2026" },
      { title: "Wells 2-4 Begin", desc: "Construction starts in three more villages", done: false, date: "Mar 2026" },
      { title: "All 8 Wells Active", desc: "Every target village has clean water access", done: false, date: "Jun 2026" },
    ],
    impactStats: [
      { number: "4,000+", label: "People to Be Served" },
      { number: "8", label: "Wells Planned" },
      { number: "20+", label: "Year Lifespan" },
      { number: "100%", label: "Community Owned" },
    ],
    testimonials: [
      { name: "Fatima Keita", role: "Village Elder", text: "My granddaughter no longer walks 3 hours for water. She goes to school instead.", avatar: creator1 },
      { name: "Dr. Oumar Sy", role: "Public Health Worker", text: "Waterborne diseases dropped 70% in villages with our wells.", avatar: creator3 },
      { name: "Amara Diallo", role: "Project Lead", text: "Every well is a promise kept to a community that has waited too long.", avatar: creator2 },
    ],
    recentDonors: [
      { name: "Linda T.", amount: "$200", time: "1 hour ago", emoji: "💧" },
      { name: "Mohammed A.", amount: "$50", time: "3 hours ago", emoji: "🌍" },
      { name: "Anonymous", amount: "$100", time: "8 hours ago", emoji: "🤲" },
      { name: "Grace W.", amount: "$75", time: "1 day ago", emoji: "💙" },
    ],
    budgetBreakdown: [
      { pct: 60, amount: "$45,000", title: "Well Construction" },
      { pct: 25, amount: "$18,750", title: "Equipment & Pumps" },
      { pct: 15, amount: "$11,250", title: "Training & Maintenance" },
    ],
    createdAt: "2025-12-01",
  },
  {
    id: "education-for-all",
    title: "Schools Where There Are None",
    subtitle: "Education · South Asia",
    excerpt: "Providing quality education and school supplies to children in underserved communities across South Asia.",
    fullDescription: [
      "In rural South Asia, millions of children lack access to basic education. Schools are overcrowded, understaffed, or simply don't exist in many villages.",
      "Our initiative builds modular classroom units, trains local teachers, and supplies books, technology, and nutritious school meals to ensure every child has the chance to learn.",
      "Education is the most powerful tool for breaking the cycle of poverty. With your support, we can open doors that will remain open for generations.",
    ],
    image: campaignEducation,
    category: "education",
    raised: 28000,
    goal: 50000,
    donors: 189,
    daysLeft: 45,
    featured: false,
    urgent: false,
    location: "South Asia",
    organizer: { name: "Priya Sharma", role: "Education Program Lead", avatar: creator1, location: "Mumbai, India" },
    gallery: [
      { src: campaignEducation, alt: "Classroom learning", caption: "A new classroom full of eager minds" },
      { src: gallery2, alt: "Students with books", caption: "First shipment of textbooks arrives" },
      { src: gallery3, alt: "Teacher training", caption: "Local teachers completing certification" },
      { src: gallery4, alt: "School celebration", caption: "Opening day celebrations" },
      { src: gallery1, alt: "Building progress", caption: "Construction of our third school unit" },
    ],
    milestones: [
      { title: "Land Secured", desc: "Community donated land for the first school", done: true, date: "Nov 2025" },
      { title: "Teachers Trained", desc: "12 local teachers completed training", done: true, date: "Jan 2026" },
      { title: "First School Opens", desc: "120 students enrolled on day one", done: false, date: "Mar 2026" },
      { title: "Expand to 3 Villages", desc: "Build schools in neighboring communities", done: false, date: "Jun 2026" },
      { title: "Full Program Launch", desc: "500 students across 5 schools", done: false, date: "Sep 2026" },
    ],
    impactStats: [
      { number: "500+", label: "Students to Enroll" },
      { number: "5", label: "Schools Planned" },
      { number: "12", label: "Teachers Trained" },
      { number: "95%", label: "Attendance Rate" },
    ],
    testimonials: [
      { name: "Anjali Patel", role: "Parent", text: "My daughter dreams of being a doctor now. Before this school, she had never held a textbook.", avatar: creator2 },
      { name: "Ravi Kumar", role: "Teacher", text: "Teaching here is the most rewarding thing I've ever done.", avatar: creator3 },
      { name: "Priya Sharma", role: "Program Lead", text: "Education doesn't just change one life — it transforms entire communities.", avatar: creator1 },
    ],
    recentDonors: [
      { name: "David L.", amount: "$150", time: "4 hours ago", emoji: "📚" },
      { name: "Sarah M.", amount: "$50", time: "12 hours ago", emoji: "🎓" },
      { name: "Anonymous", amount: "$25", time: "1 day ago", emoji: "✏️" },
      { name: "Chen W.", amount: "$100", time: "2 days ago", emoji: "🌟" },
    ],
    budgetBreakdown: [
      { pct: 45, amount: "$22,500", title: "School Construction" },
      { pct: 30, amount: "$15,000", title: "Teacher Salaries & Training" },
      { pct: 25, amount: "$12,500", title: "Books & Supplies" },
    ],
    createdAt: "2025-11-15",
  },
  {
    id: "mobile-clinics",
    title: "Mobile Medical Clinics",
    subtitle: "Healthcare · Middle East",
    excerpt: "Bringing essential healthcare to displaced families through fully-equipped mobile clinics and trained medical volunteers.",
    fullDescription: [
      "Across the Middle East, millions of displaced families live without access to basic healthcare. Children go unvaccinated, chronic conditions go untreated, and preventable diseases claim lives daily.",
      "Our mobile clinics bring doctors, medicine, and medical equipment directly to refugee camps and underserved communities — providing free consultations, vaccinations, and emergency care.",
      "Each mobile unit serves up to 200 patients per day and carries a full pharmacy, diagnostic equipment, and a trained medical team of 6 professionals.",
    ],
    image: campaignMedical,
    category: "medical",
    raised: 91000,
    goal: 120000,
    donors: 478,
    daysLeft: 12,
    featured: true,
    urgent: true,
    location: "Middle East",
    organizer: { name: "Dr. Layla Hassan", role: "Medical Director", avatar: creator2, location: "Amman, Jordan" },
    gallery: [
      { src: campaignMedical, alt: "Mobile clinic in action", caption: "Our clinic reaches where hospitals can't" },
      { src: gallery1, alt: "Medical team", caption: "Our dedicated team of volunteer doctors" },
      { src: gallery3, alt: "Patient care", caption: "Providing critical care to families" },
      { src: gallery4, alt: "Medicine distribution", caption: "Essential medicines reaching those in need" },
      { src: gallery2, alt: "Child vaccination", caption: "Protecting children through immunization" },
    ],
    milestones: [
      { title: "First Clinic Deployed", desc: "Mobile unit serving 3 refugee camps", done: true, date: "Oct 2025" },
      { title: "10,000 Patients Treated", desc: "Major milestone in community health", done: true, date: "Jan 2026" },
      { title: "Second Clinic Funded", desc: "Expanding reach to northern regions", done: true, date: "Feb 2026" },
      { title: "Third Clinic Launch", desc: "Covering all target communities", done: false, date: "Apr 2026" },
      { title: "Permanent Clinic Built", desc: "Transitioning to a fixed location", done: false, date: "Jul 2026" },
    ],
    impactStats: [
      { number: "10,000+", label: "Patients Treated" },
      { number: "3", label: "Mobile Clinics" },
      { number: "200/day", label: "Patients Served" },
      { number: "6", label: "Medical Staff Per Unit" },
    ],
    testimonials: [
      { name: "Yasmin Al-Rashid", role: "Mother of Three", text: "The mobile clinic saved my son's life. We had no other way to reach a doctor.", avatar: creator1 },
      { name: "Dr. Omar Khalil", role: "Volunteer Physician", text: "Every day I see the difference we make. These families have been forgotten by the world.", avatar: creator3 },
      { name: "Dr. Layla Hassan", role: "Medical Director", text: "Healthcare is not a luxury. It's a right we must fight to deliver.", avatar: creator2 },
    ],
    recentDonors: [
      { name: "Robert K.", amount: "$500", time: "30 min ago", emoji: "🏥" },
      { name: "Fatima N.", amount: "$100", time: "2 hours ago", emoji: "💊" },
      { name: "Anonymous", amount: "$250", time: "6 hours ago", emoji: "🩺" },
      { name: "James P.", amount: "$75", time: "1 day ago", emoji: "❤️" },
    ],
    budgetBreakdown: [
      { pct: 40, amount: "$48,000", title: "Medical Equipment & Vehicles" },
      { pct: 35, amount: "$42,000", title: "Medicine & Supplies" },
      { pct: 25, amount: "$30,000", title: "Staff & Operations" },
    ],
    createdAt: "2025-10-01",
  },
  {
    id: "emergency-food",
    title: "Emergency Food Relief",
    subtitle: "Food Security · Global",
    excerpt: "Distributing nutritious food packages to families affected by conflict and natural disasters worldwide.",
    fullDescription: [
      "Around the world, 345 million people face acute food insecurity. Conflict, climate change, and economic instability have pushed families to the brink of starvation.",
      "Our emergency food relief program delivers nutrient-rich food packages containing rice, lentils, cooking oil, fortified flour, and vitamins — enough to sustain a family of five for one month.",
      "We partner with local organizations to ensure food reaches the most vulnerable — women, children, the elderly, and people with disabilities — quickly and efficiently.",
    ],
    image: campaignFood,
    category: "food",
    raised: 156000,
    goal: 200000,
    donors: 892,
    daysLeft: 60,
    featured: false,
    urgent: false,
    location: "Global",
    organizer: { name: "Ahmed El-Amin", role: "Relief Operations Lead", avatar: creator3, location: "Geneva, Switzerland" },
    gallery: [
      { src: campaignFood, alt: "Food distribution", caption: "Monthly food packages being prepared" },
      { src: gallery4, alt: "Volunteers packing", caption: "Our volunteer team in action" },
      { src: gallery1, alt: "Delivery truck", caption: "Reaching remote communities" },
      { src: gallery2, alt: "Family receiving food", caption: "A family receives their monthly supply" },
      { src: gallery3, alt: "Warehouse operations", caption: "Our distribution center at full capacity" },
    ],
    milestones: [
      { title: "First 1,000 Families Fed", desc: "Initial distribution in three countries", done: true, date: "Sep 2025" },
      { title: "5,000 Families Reached", desc: "Expanded to 7 countries", done: true, date: "Dec 2025" },
      { title: "75% Funded", desc: "Community support continues to grow", done: true, date: "Feb 2026" },
      { title: "10,000 Families Target", desc: "Scaling operations across 12 countries", done: false, date: "May 2026" },
      { title: "Sustainable Supply Chain", desc: "Long-term partnerships established", done: false, date: "Aug 2026" },
    ],
    impactStats: [
      { number: "5,000+", label: "Families Fed" },
      { number: "7", label: "Countries Reached" },
      { number: "30 days", label: "Per Food Package" },
      { number: "100%", label: "Goes to Food" },
    ],
    testimonials: [
      { name: "Halima Yusuf", role: "Mother of Five", text: "When the food package arrived, my children smiled for the first time in weeks.", avatar: creator1 },
      { name: "Carlos Mendez", role: "Distribution Volunteer", text: "Seeing the relief on people's faces makes every early morning worth it.", avatar: creator3 },
      { name: "Ahmed El-Amin", role: "Operations Lead", text: "No family should go to bed hungry. We won't stop until that's a reality.", avatar: creator2 },
    ],
    recentDonors: [
      { name: "Michelle R.", amount: "$300", time: "1 hour ago", emoji: "🍞" },
      { name: "Ali H.", amount: "$50", time: "4 hours ago", emoji: "🌾" },
      { name: "Anonymous", amount: "$150", time: "12 hours ago", emoji: "🤲" },
      { name: "Emma S.", amount: "$25", time: "1 day ago", emoji: "💛" },
    ],
    budgetBreakdown: [
      { pct: 70, amount: "$140,000", title: "Food Procurement" },
      { pct: 20, amount: "$40,000", title: "Logistics & Distribution" },
      { pct: 10, amount: "$20,000", title: "Local Partnerships" },
    ],
    createdAt: "2025-09-01",
  },
  {
    id: "orphan-sponsorship",
    title: "Sponsor an Orphan's Future",
    subtitle: "Orphan Care · East Africa",
    excerpt: "Providing loving care, education, and a stable home environment for orphaned children in need.",
    fullDescription: [
      "In East Africa, millions of children have lost one or both parents to disease, conflict, or natural disasters. Without support, these children face exploitation, child labor, and a future without hope.",
      "Our orphan sponsorship program provides comprehensive care — safe housing, nutritious meals, quality education, healthcare, and emotional support through trained caregivers.",
      "Each sponsored child receives individualized attention and a pathway to independence. Many of our graduates go on to university and return to mentor the next generation.",
    ],
    image: campaignOrphan,
    category: "orphans",
    raised: 34000,
    goal: 80000,
    donors: 156,
    daysLeft: 90,
    featured: false,
    urgent: false,
    location: "East Africa",
    organizer: { name: "Grace Mwangi", role: "Program Director", avatar: creator1, location: "Nairobi, Kenya" },
    gallery: [
      { src: campaignOrphan, alt: "Children playing", caption: "Joy and laughter at our care center" },
      { src: gallery2, alt: "Learning together", caption: "Education is the foundation of our program" },
      { src: gallery3, alt: "New dormitory", caption: "Safe, comfortable living spaces" },
      { src: gallery1, alt: "Art class", caption: "Creative expression through art programs" },
      { src: gallery4, alt: "Graduation ceremony", caption: "Celebrating milestones together" },
    ],
    milestones: [
      { title: "Care Center Opened", desc: "First 20 children welcomed into the program", done: true, date: "Aug 2025" },
      { title: "50 Children Sponsored", desc: "Growing family of supporters and children", done: true, date: "Dec 2025" },
      { title: "School Partnership", desc: "Partnered with local schools for education", done: true, date: "Jan 2026" },
      { title: "100 Children Goal", desc: "Expanding capacity with new dormitory", done: false, date: "May 2026" },
      { title: "Vocational Training", desc: "Skills programs for older children", done: false, date: "Sep 2026" },
    ],
    impactStats: [
      { number: "50", label: "Children Sponsored" },
      { number: "100%", label: "School Enrollment" },
      { number: "3", label: "Meals Per Day" },
      { number: "24/7", label: "Care & Support" },
    ],
    testimonials: [
      { name: "Samuel Ochieng", role: "Program Graduate", text: "This program gave me a family when I had none. Now I'm studying engineering.", avatar: creator3 },
      { name: "Sister Agnes", role: "Caregiver", text: "Every child deserves to feel loved and safe. That's what we provide here.", avatar: creator2 },
      { name: "Grace Mwangi", role: "Program Director", text: "When you sponsor a child, you're not just changing one life — you're changing a whole community.", avatar: creator1 },
    ],
    recentDonors: [
      { name: "Patricia L.", amount: "$100", time: "3 hours ago", emoji: "👶" },
      { name: "Omar B.", amount: "$50", time: "8 hours ago", emoji: "🌟" },
      { name: "Anonymous", amount: "$250", time: "1 day ago", emoji: "🏠" },
      { name: "Yuki T.", amount: "$30", time: "2 days ago", emoji: "💜" },
    ],
    budgetBreakdown: [
      { pct: 40, amount: "$32,000", title: "Housing & Care" },
      { pct: 35, amount: "$28,000", title: "Education & Tuition" },
      { pct: 25, amount: "$20,000", title: "Healthcare & Nutrition" },
    ],
    createdAt: "2025-08-01",
  },
  {
    id: "shelter-homes",
    title: "Build Homes, Build Hope",
    subtitle: "Housing · Southeast Asia",
    excerpt: "Constructing safe, permanent housing for families displaced by natural disasters and conflict.",
    fullDescription: [
      "In Southeast Asia, devastating typhoons, floods, and earthquakes leave thousands of families without shelter every year. Temporary camps become permanent homes for people who deserve better.",
      "Our program builds disaster-resilient homes using local materials and labor. Each home is designed to withstand future storms and includes water collection systems and solar lighting.",
      "Beyond shelter, we build communities — with shared spaces, gardens, and infrastructure that give families not just a house, but a future.",
    ],
    image: campaignShelter,
    category: "shelter",
    raised: 72000,
    goal: 150000,
    donors: 234,
    daysLeft: 55,
    featured: false,
    urgent: false,
    location: "Southeast Asia",
    organizer: { name: "Marco Santos", role: "Construction Lead", avatar: creator3, location: "Manila, Philippines" },
    gallery: [
      { src: campaignShelter, alt: "New homes built", caption: "Families moving into their new homes" },
      { src: gallery1, alt: "Construction crew", caption: "Local workers building disaster-proof homes" },
      { src: gallery4, alt: "Community garden", caption: "Shared gardens foster community bonds" },
      { src: gallery3, alt: "Solar installation", caption: "Every home includes solar lighting" },
      { src: gallery2, alt: "Happy family", caption: "A family in their permanent home" },
    ],
    milestones: [
      { title: "Land & Permits", desc: "Government approved our housing site", done: true, date: "Oct 2025" },
      { title: "10 Homes Built", desc: "First families moved in before monsoon", done: true, date: "Jan 2026" },
      { title: "Community Center", desc: "Shared space for gatherings and classes", done: true, date: "Feb 2026" },
      { title: "30 Homes Total", desc: "Phase 2 construction underway", done: false, date: "May 2026" },
      { title: "Full Village Complete", desc: "50 families in permanent homes", done: false, date: "Oct 2026" },
    ],
    impactStats: [
      { number: "50", label: "Homes Planned" },
      { number: "10", label: "Homes Built So Far" },
      { number: "200+", label: "People Housed" },
      { number: "100%", label: "Disaster-Resilient" },
    ],
    testimonials: [
      { name: "Rosa Aquino", role: "New Homeowner", text: "For the first time in 3 years, my children sleep under a real roof. I can't stop crying.", avatar: creator1 },
      { name: "Engineer Jay Cruz", role: "Construction Team", text: "These homes are built to last. Every nail is driven with purpose.", avatar: creator3 },
      { name: "Marco Santos", role: "Construction Lead", text: "Shelter is dignity. When you build a home, you rebuild a life.", avatar: creator2 },
    ],
    recentDonors: [
      { name: "Kevin L.", amount: "$200", time: "2 hours ago", emoji: "🏗️" },
      { name: "Mei Lin C.", amount: "$75", time: "6 hours ago", emoji: "🏠" },
      { name: "Anonymous", amount: "$100", time: "1 day ago", emoji: "🌏" },
      { name: "Thomas R.", amount: "$50", time: "2 days ago", emoji: "🔨" },
    ],
    budgetBreakdown: [
      { pct: 55, amount: "$82,500", title: "Construction Materials" },
      { pct: 30, amount: "$45,000", title: "Labor & Equipment" },
      { pct: 15, amount: "$22,500", title: "Infrastructure & Solar" },
    ],
    createdAt: "2025-10-15",
  },
];

export const getCampaignById = (id: string) => campaigns.find((c) => c.id === id);
