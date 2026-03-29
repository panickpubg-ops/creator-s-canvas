export interface Organization {
  id: string;
  name: string;
  logo: string;
  banner: string;
  tagline: string;
  description: string;
  accentColor: string; // HSL values for theming
  website: string;
  established: string;
  location: string;
  totalRaised: string;
  beneficiaries: string;
  rating: number;
  featured: boolean;
  causes: string[]; // IDs from charityTypes
  badge?: string;
}

export const organizations: Organization[] = [
  {
    id: "islamic-relief",
    name: "Islamic Relief",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Islamic_Relief_logo.svg/1200px-Islamic_Relief_logo.svg.png",
    banner: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80",
    tagline: "Inspired by faith, driven by compassion",
    description:
      "Islamic Relief is one of the world's largest faith-based humanitarian agencies, providing aid in over 45 countries. From emergency relief to long-term development, we work to transform communities and save lives.",
    accentColor: "145 63% 42%",
    website: "https://www.islamic-relief.org.uk",
    established: "1984",
    location: "Birmingham, UK",
    totalRaised: "£1.2B+",
    beneficiaries: "120M+",
    rating: 4.8,
    featured: true,
    causes: ["zakat", "fitrana", "fidya", "water", "where-most-needed"],
    badge: "Verified",
  },
  {
    id: "human-appeal",
    name: "Human Appeal",
    logo: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=200&q=80",
    banner: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400&q=80",
    tagline: "Saving lives, empowering communities",
    description:
      "Human Appeal is a faith-based charity that aims to strengthen humanity's fight against poverty, social injustice, and natural disaster through the provision of immediate relief and sustainable development programs.",
    accentColor: "200 85% 45%",
    website: "https://humanappeal.org.uk",
    established: "1991",
    location: "Manchester, UK",
    totalRaised: "£500M+",
    beneficiaries: "30M+",
    rating: 4.7,
    featured: true,
    causes: ["zakat", "fitrana", "fidya", "water", "where-most-needed"],
    badge: "Verified",
  },
  {
    id: "penny-appeal",
    name: "Penny Appeal",
    logo: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=200&q=80",
    banner: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1400&q=80",
    tagline: "Small change, big difference",
    description:
      "Penny Appeal is a British-based international humanitarian charity providing poverty relief across Asia, the Middle East, and Africa by offering water solutions, orphan care, and emergency food provisions.",
    accentColor: "35 95% 55%",
    website: "https://pennyappeal.org",
    established: "2009",
    location: "Wakefield, UK",
    totalRaised: "£150M+",
    beneficiaries: "15M+",
    rating: 4.6,
    featured: false,
    causes: ["zakat", "fitrana", "water", "where-most-needed"],
  },
  {
    id: "muslim-aid",
    name: "Muslim Aid",
    logo: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&q=80",
    banner: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1400&q=80",
    tagline: "Responding to poverty and suffering worldwide",
    description:
      "Muslim Aid is an international relief and development agency working in over 70 countries. We respond to emergencies, provide healthcare, education, and sustainable livelihoods, all inspired by Islamic values of compassion and justice.",
    accentColor: "262 70% 50%",
    website: "https://www.muslimaid.org",
    established: "1985",
    location: "London, UK",
    totalRaised: "£400M+",
    beneficiaries: "50M+",
    rating: 4.5,
    featured: false,
    causes: ["zakat", "fitrana", "fidya", "water", "where-most-needed"],
    badge: "Verified",
  },
  {
    id: "ummah-welfare",
    name: "Ummah Welfare Trust",
    logo: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=200&q=80",
    banner: "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=1400&q=80",
    tagline: "100% donation policy — every penny reaches those in need",
    description:
      "Ummah Welfare Trust is a UK-based international relief and development charity with a 100% donation policy. All administrative costs are covered separately, ensuring every penny of your donation reaches those in need.",
    accentColor: "170 60% 40%",
    website: "https://uwt.org",
    established: "2001",
    location: "Bolton, UK",
    totalRaised: "£300M+",
    beneficiaries: "25M+",
    rating: 4.9,
    featured: true,
    causes: ["zakat", "fitrana", "fidya", "water", "where-most-needed"],
    badge: "100% Policy",
  },
];

export const getOrganizationById = (id: string): Organization | undefined =>
  organizations.find((org) => org.id === id);
