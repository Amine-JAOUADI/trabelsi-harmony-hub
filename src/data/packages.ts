export interface Singer {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  isPremium: boolean;
  premiumPrice: number;
}

export interface Star {
  id: string;
  name: string;
  photo: string;
  price: number;
  description: string;
}

export interface Segment {
  id: string;
  label: string;
  duration: string;
  description: string;
}

export interface Package {
  id: string;
  name: string;
  basePrice: number;
  singers: number;
  musicians: number;
  shows: string[];
  description: string;
  isPopular?: boolean;
  isRecommended?: boolean;
  segments: Segment[];
  availableSingers: string[];
}

export const singers: Singer[] = [
  { id: "s1", name: "Ahmed Ben Ali", specialty: "Tarab & Malouf", photo: "", isPremium: false, premiumPrice: 0 },
  { id: "s2", name: "Sami Trabelsi", specialty: "Nouba & Hadhra", photo: "", isPremium: false, premiumPrice: 0 },
  { id: "s3", name: "Yassine Gharbi", specialty: "Dabka & Oriental", photo: "", isPremium: true, premiumPrice: 500 },
  { id: "s4", name: "Karim Mansouri", specialty: "DJ Live & Occidental", photo: "", isPremium: false, premiumPrice: 0 },
  { id: "s5", name: "Mohamed Sahli", specialty: "Tarab Classique", photo: "", isPremium: true, premiumPrice: 800 },
  { id: "s6", name: "Nabil Jaziri", specialty: "Mezoued & Populaire", photo: "", isPremium: false, premiumPrice: 0 },
];

export const stars: Star[] = [
  { id: "st1", name: "Lotfi Bouchnak", photo: "", price: 5000, description: "Légende vivante du Tarab tunisien" },
  { id: "st2", name: "Saber Rebai", photo: "", price: 8000, description: "Star internationale de la chanson arabe" },
  { id: "st3", name: "Latifa Arfaoui", photo: "", price: 6000, description: "Voix emblématique de la musique tunisienne" },
  { id: "st4", name: "Hamza Namira", photo: "", price: 10000, description: "Artiste pop arabe de renommée mondiale" },
];

export const packages: Package[] = [
  {
    id: "silver",
    name: "Silver",
    basePrice: 3500,
    singers: 2,
    musicians: 4,
    shows: ["Hadhra", "Nouba"],
    description: "L'essentiel pour une soirée mémorable avec les classiques de la musique tunisienne.",
    segments: [
      { id: "seg1", label: "Entrée des mariés", duration: "20 min", description: "Accueil musical solennel" },
      { id: "seg2", label: "Segment Tarab", duration: "45 min", description: "Musique classique arabe" },
      { id: "seg3", label: "Segment Hadhra", duration: "30 min", description: "Rythmes traditionnels" },
      { id: "seg4", label: "DJ Set", duration: "60 min", description: "Ambiance festive moderne" },
    ],
    availableSingers: ["s1", "s2", "s6"],
  },
  {
    id: "gold",
    name: "Gold",
    basePrice: 6000,
    singers: 3,
    musicians: 6,
    shows: ["Hadhra", "Nouba", "Dabka", "DJ Live"],
    isPopular: true,
    description: "Le choix préféré de nos clients. Un spectacle complet mêlant tradition et modernité.",
    segments: [
      { id: "seg1", label: "Entrée des mariés", duration: "25 min", description: "Accueil musical grandiose" },
      { id: "seg2", label: "Segment Tarab", duration: "45 min", description: "Musique classique arabe" },
      { id: "seg3", label: "Segment Dabka", duration: "30 min", description: "Danse traditionnelle festive" },
      { id: "seg4", label: "First Dance", duration: "10 min", description: "Moment romantique des mariés" },
      { id: "seg5", label: "Segment Hadhra", duration: "30 min", description: "Rythmes sacrés" },
      { id: "seg6", label: "DJ Live Set", duration: "90 min", description: "Mix live avec musiciens" },
    ],
    availableSingers: ["s1", "s2", "s3", "s4", "s6"],
  },
  {
    id: "platinum",
    name: "Platinum",
    basePrice: 10000,
    singers: 4,
    musicians: 8,
    shows: ["Hadhra", "Nouba", "Dabka", "DJ Live", "Occidental", "Tarab Premium"],
    isRecommended: true,
    description: "L'excellence absolue. Un spectacle sur mesure pour les événements les plus prestigieux.",
    segments: [
      { id: "seg1", label: "Entrée des mariés", duration: "30 min", description: "Cérémonie musicale d'exception" },
      { id: "seg2", label: "Segment Tarab Premium", duration: "60 min", description: "Les grands classiques par nos meilleurs artistes" },
      { id: "seg3", label: "Segment Dabka", duration: "30 min", description: "Performance de danse spectaculaire" },
      { id: "seg4", label: "Segment Nouba", duration: "30 min", description: "Tradition andalouse raffinée" },
      { id: "seg5", label: "First Dance", duration: "15 min", description: "Moment romantique orchestré" },
      { id: "seg6", label: "Segment Hadhra", duration: "30 min", description: "Transe mystique intense" },
      { id: "seg7", label: "Set Occidental", duration: "30 min", description: "Répertoire international" },
      { id: "seg8", label: "DJ Live Set", duration: "120 min", description: "DJ avec orchestre complet" },
    ],
    availableSingers: ["s1", "s2", "s3", "s4", "s5", "s6"],
  },
  {
    id: "diamond",
    name: "Diamond",
    basePrice: 18000,
    singers: 6,
    musicians: 12,
    shows: ["Tout inclus", "Stars invitées", "Spectacle pyrotechnique"],
    description: "Le summum du luxe. Spectacle total avec stars invitées et effets spéciaux.",
    segments: [
      { id: "seg1", label: "Entrée des mariés", duration: "45 min", description: "Cérémonie royale avec orchestre complet" },
      { id: "seg2", label: "Segment Tarab d'exception", duration: "60 min", description: "Les plus grands classiques" },
      { id: "seg3", label: "Performance Star invitée", duration: "45 min", description: "Artiste de renommée" },
      { id: "seg4", label: "Segment Dabka & Folklore", duration: "30 min", description: "Show de danse complet" },
      { id: "seg5", label: "First Dance", duration: "15 min", description: "Moment cinématique" },
      { id: "seg6", label: "Segment Hadhra Mystique", duration: "30 min", description: "Transe collective" },
      { id: "seg7", label: "Concert Occidental", duration: "45 min", description: "Répertoire international live" },
      { id: "seg8", label: "Grand DJ Live Finale", duration: "120 min", description: "Fête spectaculaire avec effets" },
    ],
    availableSingers: ["s1", "s2", "s3", "s4", "s5", "s6"],
  },
];

export const musicStyles = [
  { name: "Tarab", icon: "🎵", description: "Musique classique arabe raffinée" },
  { name: "Nouba", icon: "🎶", description: "Tradition andalouse tunisienne" },
  { name: "Dabka", icon: "💃", description: "Danse folklorique festive" },
  { name: "Hadhra", icon: "🔔", description: "Rythmes mystiques traditionnels" },
  { name: "Occidental", icon: "🎸", description: "Répertoire international" },
  { name: "DJ Live", icon: "🎧", description: "Mix électronique avec orchestre" },
  { name: "Mezoued", icon: "🪘", description: "Musique populaire tunisienne" },
  { name: "Malouf", icon: "🎻", description: "Patrimoine musical tunisien" },
];

export const testimonials = [
  {
    id: "t1",
    name: "Salma & Mehdi",
    event: "Mariage – Tunis",
    text: "La Troupe Trabelsi a transformé notre mariage en une nuit inoubliable. L'ambiance était magique du début à la fin !",
    rating: 5,
  },
  {
    id: "t2",
    name: "Amira & Youssef",
    event: "Mariage – Sousse",
    text: "Un professionnalisme exceptionnel. Nos invités parlent encore de la soirée. Le package Gold était parfait.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Famille Ben Amor",
    event: "Fiançailles – Sfax",
    text: "Des artistes talentueux, une organisation impeccable. La Troupe Trabelsi est tout simplement la meilleure.",
    rating: 5,
  },
];
