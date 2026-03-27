export interface CharityType {
  id: string;
  label: string;
  emoji: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string[];
  presetAmounts: number[];
  impactExample: string;
  resources?: { title: string; link: string }[];
  faqItems: { question: string; answer: string }[];
  image: string;
  color: string;
}

export const charityTypes: CharityType[] = [
  {
    id: "zakat",
    label: "Zakat",
    emoji: "🕌",
    heroTitle: "Zakat is our Sacred Duty",
    heroSubtitle: "Purify your wealth. Transform lives.",
    description: [
      "Zakat is not merely charity. It is worship. It is justice. It is our sacred duty.",
      "It is part of the pillars of your faith, which is above everything else. And from your zakat, it reaches those in need, those in poverty, those who are striving. It purifies both the giver and the receiver.",
      "This sacred practice is a community's shared responsibility. It is about fulfilling a right that Allah has ordained upon us.",
      "Your Zakat can provide food, shelter, education, and healthcare to those who need it most. Every contribution makes a meaningful difference in someone's life.",
    ],
    presetAmounts: [100, 250, 500, 1000],
    impactExample: "£100 can provide two families with a Ramadan food pack",
    resources: [
      { title: "Zakat calculator", link: "#" },
      { title: "Nisab", link: "#" },
      { title: "Zakat Policy", link: "#" },
      { title: "Zakat on gold", link: "#" },
      { title: "Zakat scholar service", link: "#" },
      { title: "Zakat Hub", link: "#" },
    ],
    faqItems: [
      { question: "What is Zakat?", answer: "Zakat is one of the Five Pillars of Islam. It is a mandatory act of charity requiring Muslims to give 2.5% of their qualifying wealth to those in need." },
      { question: "Who is eligible to receive Zakat?", answer: "There are eight categories of people eligible to receive Zakat, as outlined in the Quran: the poor, the needy, Zakat administrators, those whose hearts need reconciliation, those in bondage, those in debt, in the cause of Allah, and the wayfarer." },
      { question: "How is Zakat calculated?", answer: "Zakat is calculated at 2.5% of your total qualifying wealth that has been held for one lunar year, provided it exceeds the Nisab threshold." },
    ],
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1200&q=80",
    color: "primary",
  },
  {
    id: "fitrana",
    label: "Fitrana",
    emoji: "🌙",
    heroTitle: "Give Fitrana This Ramadan",
    heroSubtitle: "Ensure every family can celebrate Eid with dignity.",
    description: [
      "Fitrana (Zakat al-Fitr) is a charitable donation of food that must be given before Eid prayer, at the end of Ramadan.",
      "It is obligatory upon every Muslim who possesses food in excess of their needs. The purpose of Fitrana is to purify the fasting person from any indecent act or speech and to help the poor and needy.",
      "By giving Fitrana, you ensure that even the most vulnerable families can enjoy the blessings of Eid al-Fitr. It brings joy and unity to the entire community.",
      "The amount of Fitrana is equivalent to approximately 2.25kg of staple food per person in your household.",
    ],
    presetAmounts: [5, 10, 25, 50],
    impactExample: "£5 provides Fitrana for one person",
    faqItems: [
      { question: "When should Fitrana be paid?", answer: "Fitrana should be paid before the Eid al-Fitr prayer. It is best to pay it a day or two before Eid to ensure it reaches those in need in time." },
      { question: "Who must pay Fitrana?", answer: "Every Muslim who has food in excess of their needs must pay Fitrana for themselves and their dependents, including children." },
      { question: "How much is Fitrana?", answer: "The amount is equivalent to approximately 2.25kg of staple food per person. The monetary equivalent varies by region and food prices." },
    ],
    image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=1200&q=80",
    color: "primary",
  },
  {
    id: "fidya",
    label: "Fidya",
    emoji: "🤲",
    heroTitle: "Pay Your Fidya",
    heroSubtitle: "For those unable to fast, feed those in need.",
    description: [
      "Fidya is a donation made when a person is unable to fast during Ramadan due to illness, old age, or other valid reasons, with no prospect of being able to make up the fasts later.",
      "For each day of fasting missed, the person must feed one poor person. This ensures that even if you cannot fast, you can still earn the blessings of Ramadan through charity.",
      "Fidya is different from Kaffarah — it is for those who genuinely cannot fast due to long-term conditions, pregnancy, nursing, or old age.",
      "Your Fidya contribution goes directly to providing meals for those who need it most.",
    ],
    presetAmounts: [5, 10, 30, 60],
    impactExample: "£5 provides Fidya for one missed fast",
    faqItems: [
      { question: "What is the difference between Fidya and Kaffarah?", answer: "Fidya is for those who cannot fast due to valid long-term reasons. Kaffarah is a penalty for deliberately breaking a fast without a valid reason." },
      { question: "How much is Fidya per day?", answer: "Fidya for each missed fast is the cost of feeding one poor person two meals, which is typically around £5 per day." },
      { question: "Can I pay Fidya in advance?", answer: "Yes, you can pay your Fidya for the entire month of Ramadan in advance if you know you will be unable to fast." },
    ],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    color: "primary",
  },
  {
    id: "water",
    label: "Water",
    emoji: "💧",
    heroTitle: "Provide Clean Water",
    heroSubtitle: "Every drop counts. Every life matters.",
    description: [
      "Access to clean, safe drinking water is a fundamental human right — yet 785 million people worldwide lack even a basic drinking water service.",
      "Your donation can help build wells, install water filtration systems, and create sustainable water infrastructure in communities that need it most.",
      "A single water well can serve an entire village of 500+ people for over 20 years. It's one of the most impactful charitable investments you can make.",
      "Water is life — and your generosity can bring that life to families who have walked miles every day just to collect water that may not even be safe to drink.",
    ],
    presetAmounts: [25, 50, 100, 500],
    impactExample: "£100 can help build a water well serving 500+ people",
    faqItems: [
      { question: "Where are the water projects located?", answer: "Our water projects span Sub-Saharan Africa, South Asia, and the Middle East — regions with the most acute water scarcity." },
      { question: "How long does a well last?", answer: "Our deep-bore wells are built to last 20+ years with proper maintenance, which we train local communities to perform." },
      { question: "Can I dedicate a water well?", answer: "Yes, you can dedicate a water well in the name of a loved one. We will send you a certificate and updates on the well's construction." },
    ],
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&q=80",
    color: "primary",
  },
  {
    id: "where-most-needed",
    label: "Where Most Needed",
    emoji: "🌍",
    heroTitle: "Give Where Most Needed",
    heroSubtitle: "Let us direct your generosity where it matters most.",
    description: [
      "Sometimes the greatest impact comes from allowing your donation to be directed where it's needed most urgently.",
      "Our team on the ground continuously assesses the most pressing needs across our projects — from emergency food relief to medical supplies, from education programs to shelter for displaced families.",
      "By choosing 'Where Most Needed', you give us the flexibility to respond rapidly to crises and fill gaps in funding that might otherwise leave vulnerable communities without support.",
      "Every penny of your donation goes directly to the cause. We ensure full transparency with regular updates on how your generosity is making a difference.",
    ],
    presetAmounts: [25, 50, 100, 250],
    impactExample: "Your donation goes where the need is greatest",
    faqItems: [
      { question: "How do you decide where funds go?", answer: "Our field teams assess needs daily. Funds are allocated based on urgency, impact potential, and gaps in existing funding." },
      { question: "Will I know how my money was used?", answer: "Yes, we send regular impact reports showing exactly how 'Where Most Needed' funds were distributed and the lives they touched." },
      { question: "Is this eligible for Zakat?", answer: "Yes, 'Where Most Needed' donations can be allocated as Zakat-eligible if you specify this preference during checkout." },
    ],
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80",
    color: "primary",
  },
];

export const getCharityTypeById = (id: string): CharityType | undefined =>
  charityTypes.find((c) => c.id === id);
