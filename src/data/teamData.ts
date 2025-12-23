// Team data - easy to edit in one place
export const teamInfo = {
  name: "PHANTOM",
  city: "JOHOR",
  country: "MALAYSIA",
  foundedYear: 2018,
  division: "Open",
  trainingDays: "Tue & Thu",
  email: "team@phantomultimate.com",
  tagline: "Ultimate Frisbee Team in JOHOR",
};

export const tournaments = [
  {
    id: 1,
    name: "Regional Championships 2025",
    date: new Date("2025-03-15T09:00:00"),
    location: "[JOHOR] Sports Complex",
    division: "Open",
    notes: "Season opener",
    isPast: false,
    result: null,
  },
  {
    id: 2,
    name: "Spring Showdown",
    date: new Date("2025-04-20T08:00:00"),
    location: "Neighboring City Arena",
    division: "Open",
    notes: "Outdoor tournament",
    isPast: false,
    result: null,
  },
  {
    id: 3,
    name: "Summer Sizzler 2025",
    date: new Date("2025-06-10T10:00:00"),
    location: "Beach Stadium",
    division: "Mixed",
    notes: "Beach ultimate format",
    isPast: false,
    result: null,
  },
  {
    id: 4,
    name: "National Championships 2024",
    date: new Date("2024-11-15T09:00:00"),
    location: "Capital Arena",
    division: "Open",
    notes: "End of season",
    isPast: true,
    result: "3rd Place",
  },
  {
    id: 5,
    name: "Autumn Classic 2024",
    date: new Date("2024-09-22T08:30:00"),
    location: "[CITY] Stadium",
    division: "Open",
    notes: "Home tournament",
    isPast: true,
    result: "Champions",
  },
  {
    id: 6,
    name: "Summer League Finals 2024",
    date: new Date("2024-07-28T10:00:00"),
    location: "Metro Sports Park",
    division: "Open",
    notes: "League finale",
    isPast: true,
    result: "2nd Place",
  },
];

export interface Player {
  id: number;
  name: string;
  number: number;
  role: "Captain" | "Coach" | "Staff" | "Player";
  position: string;
  funFact: string;
  image: string;
  ultiscoreId?: string;
  instagramUsername?: string;
}

export const players: Player[] = [
  { id: 1, name: "Alex Rivera", number: 7, role: "Captain", position: "Handler", funFact: "Can throw 80m forehands", image: "", ultiscoreId: "10275", instagramUsername: "@alex_phantom7" },
  { id: 2, name: "Jordan Chen", number: 23, role: "Captain", position: "Cutter", funFact: "Former track athlete", image: "", ultiscoreId: "10276", instagramUsername: "@jordanchen23" },
  { id: 3, name: "Sam Williams", number: 11, role: "Coach", position: "Head Coach", funFact: "10+ years playing experience", image: "", ultiscoreId: "10277" },
  { id: 4, name: "Casey Morgan", number: 3, role: "Player", position: "Handler", funFact: "Ambidextrous thrower", image: "", instagramUsername: "casey_morgan" },
  { id: 5, name: "Taylor Kim", number: 15, role: "Player", position: "Cutter", funFact: "Highest vertical on team", image: "", ultiscoreId: "10278", instagramUsername: "@taylorkim15" },
  { id: 6, name: "Riley Santos", number: 88, role: "Player", position: "Handler", funFact: "Master of the hammer throw", image: "" },
  { id: 7, name: "Morgan Lee", number: 42, role: "Player", position: "Cutter", funFact: "Never misses morning practice", image: "", instagramUsername: "@morganlee42" },
  { id: 8, name: "Jamie Foster", number: 9, role: "Player", position: "Hybrid", funFact: "Played in 3 countries", image: "", ultiscoreId: "10279" },
  { id: 9, name: "Drew Parker", number: 17, role: "Player", position: "Cutter", funFact: "Known for layout Ds", image: "", ultiscoreId: "10280", instagramUsername: "@drew_parker17" },
  { id: 10, name: "Avery Brooks", number: 21, role: "Player", position: "Handler", funFact: "Team DJ at tournaments", image: "", instagramUsername: "@averybrooks_dj" },
  { id: 11, name: "Quinn Hayes", number: 5, role: "Player", position: "Cutter", funFact: "Fastest player on the team", image: "" },
  { id: 12, name: "Blake Thompson", number: 33, role: "Staff", position: "Assistant Coach", funFact: "Spirit captain 3 years running", image: "", instagramUsername: "@blake_t33" },
];

export const newsArticles = [
  {
    id: 1,
    title: "PHANTOM Secures 3rd Place at Nationals",
    category: "Recap",
    date: "2024-11-18",
    excerpt: "An incredible season comes to a close with our best national finish yet. The team showed incredible spirit and determination throughout the tournament.",
    content: "Full article content here...",
    image: "",
  },
  {
    id: 2,
    title: "Spring Tryouts Announced",
    category: "Announcement",
    date: "2025-01-10",
    excerpt: "Looking for new talent! Open tryouts will be held in February. All skill levels welcome, bring your cleats and positive attitude.",
    content: "Full article content here...",
    image: "",
  },
  {
    id: 3,
    title: "Player Spotlight: Alex Rivera",
    category: "Spotlight",
    date: "2024-12-05",
    excerpt: "Get to know our team captain, their journey in ultimate, and what drives them to lead PHANTOM to success.",
    content: "Full article content here...",
    image: "",
  },
];

export const achievements = [
  { title: "National Champions", year: "2023", description: "First ever national title" },
  { title: "3rd Place Nationals", year: "2024", description: "Consistent top performance" },
  { title: "Regional Champions", year: "2022-2024", description: "Three-peat regional winners" },
  { title: "Spirit Award", year: "2023", description: "Recognized for fair play" },
  { title: "Best Defense", year: "2024", description: "Lowest points conceded" },
  { title: "Community Award", year: "2023", description: "Youth development program" },
];

export const sponsors = [
  { name: "Sponsor Gold 1", tier: "Gold", logo: "" },
  { name: "Sponsor Gold 2", tier: "Gold", logo: "" },
  { name: "Sponsor Silver 1", tier: "Silver", logo: "" },
  { name: "Sponsor Silver 2", tier: "Silver", logo: "" },
  { name: "Sponsor Bronze 1", tier: "Bronze", logo: "" },
  { name: "Sponsor Bronze 2", tier: "Bronze", logo: "" },
  { name: "Sponsor Bronze 3", tier: "Bronze", logo: "" },
];

export const galleryAlbums = [
  {
    id: 1,
    name: "Tournament",
    images: [
      { id: 1, src: "", alt: "Tournament action shot 1" },
      { id: 2, src: "", alt: "Tournament action shot 2" },
      { id: 3, src: "", alt: "Tournament action shot 3" },
    ],
  },
  {
    id: 2,
    name: "Training",
    images: [
      { id: 4, src: "", alt: "Training session 1" },
      { id: 5, src: "", alt: "Training session 2" },
    ],
  },
  {
    id: 3,
    name: "Community",
    images: [
      { id: 6, src: "", alt: "Community event 1" },
      { id: 7, src: "", alt: "Community event 2" },
    ],
  },
];

export const faqItems = [
  {
    question: "Do I need experience to join?",
    answer: "Not at all! We welcome players of all skill levels. Our training sessions include fundamentals for beginners.",
  },
  {
    question: "What should I bring to practice?",
    answer: "Cleats, water bottle, and comfortable athletic clothing. We provide discs for practice.",
  },
  {
    question: "How often do you practice?",
    answer: "We train twice a week (Tuesday and Thursday evenings) with optional weekend sessions.",
  },
  {
    question: "Is there a tryout fee?",
    answer: "Tryouts are completely free. Team membership fees apply only after you join.",
  },
  {
    question: "What is Spirit of the Game?",
    answer: "Ultimate is unique in being self-refereed. Spirit of the Game emphasizes sportsmanship, fair play, and respect for all players.",
  },
];
