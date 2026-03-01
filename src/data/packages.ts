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
  { id: "s1", name: "Saif Agrebi", specialty: "Occidental", photo: "", isPremium: false, premiumPrice: 0 },
  { id: "s2", name: "Saif Agrebi", specialty: "Orientale", photo: "", isPremium: false, premiumPrice: 0 },
  { id: "s3", name: "Haider Brahim", specialty: "Hadhra", photo: "", isPremium: false, premiumPrice: 0 },
  { id: "s4", name: "Nom1 Prenom1", specialty: "DJ Live & Occidental", photo: "", isPremium: true, premiumPrice: 400 },
  { id: "s5", name: "Nom2 Prenom2", specialty: "Tarab Classique", photo: "", isPremium: true, premiumPrice: 500 },
  { id: "s6", name: "Nom3 Prenom3", specialty: "Mezoued & Populaire", photo: "", isPremium: true, premiumPrice: 500 },
  { id: "s7", name: "Nom1 Prenom1", specialty: "DJ Live & Occidental", photo: "", isPremium: false, premiumPrice: 0  },
  { id: "s8", name: "Nom2 Prenom2", specialty: "Tarab Classique", photo: "", isPremium: false, premiumPrice: 0 },
  { id: "s9", name: "Nom3 Prenom3", specialty: "Mezoued & Populaire", photo: "", isPremium: false, premiumPrice: 0 },
];

export const stars: Star[] = [
  { id: "st1", name: "Lotfi Bouchnak", photo: "", price: 4000, description: "Légende vivante du Tarab tunisien" },
  { id: "st2", name: "Saber Rebai", photo: "", price: 5000, description: "Star internationale de la chanson arabe" },
  { id: "st3", name: "Latifa Arfaoui", photo: "", price: 4000, description: "Voix emblématique de la musique tunisienne" },
  { id: "st4", name: "Hamza Namira", photo: "", price: 3000, description: "Artiste pop arabe de renommée mondiale" },
  { id: "st5", name: "Yousra Mahnouch", photo: "", price: 4000, description: "Chanteuse populaire tunisienne" },
  { id: "st6", name: "Hedi Habbouba", photo: "", price: 4500, description: "Maître du mezoued et de la musique populaire" },
  { id: "st7", name: "Amina Fakhet", photo: "", price: 5500, description: "Voix féminine incontournable de la scène tunisienne" },
  { id: "st8", name: "Adnane Chaouachi", photo: "", price: 3000, description: "Chanteur de musique orientale et traditionnelle" },
  { id: "st9", name: "Sonia Mbarek", photo: "", price: 3500, description: "Chanteuse de musique classique et andalouse" },
  { id: "st10", name: "Fethi Zghonda", photo: "", price: 2500, description: "Chanteur de musique populaire et festive" },
  { id: "st11", name: "Chirine Lajmi", photo: "", price: 4500, description: "Chanteuse de musique populaire et orientale" },
  { id: "st12", name: "Naoum Al Khoury", photo: "", price: 4000, description: "Chanteur de musique libanaise et levantine" },
  { id: "st13", name: "Dorsaf Hamdani", photo: "", price: 5000, description: "Chanteuse de musique classique et soufie" },
  { id: "st14", name: "Khaled Selmi", photo: "", price: 3000, description: "Chanteur de musique populaire et festive" },
  { id: "st15", name: "Houcine efrit", photo: "", price: 3500, description: "Chanteur de musique populaire et traditionnelle" },
];

export const packages: Package[] = [
  {
    id: "silver",
    name: "Silver",
    basePrice: 4000,
    singers: 3,
    musicians: 13,
    shows: ["Intro MP3", "Spectacle Hadhra", "Décoration lumière"],
    description: "13 musiciens, 3 chanteurs. Intro MP3, spectacle Hadhra, décoration lumière.",
    segments: [
      { id: "seg1", label: "Intro MP3", duration: "25 min", description: "Entrée en musique mp3 (vous pouvez choisir votre intro)" },
      { id: "seg2", label: "Chanteur 1", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg3", label: "Spectacle Hadhra", duration: "30 min", description: "Chants soufis et percussions" },
      { id: "seg4", label: "Chanteur 2", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg5", label: "Chanteur 3", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg6", label: "Décoration lumière", duration: "Soirée", description: "Ambiance lumineuse tout au long de l'événement" },
    ],
    availableSingers: ["s1", "s2", "s3", "s4"],
  },
  {
    id: "bronze",
    name: "Bronze",
    basePrice: 5000,
    singers: 3,
    isPopular: true,
    musicians: 13,
    shows: ["Intro violoniste", "Dabka Souriya", "Décoration lumière"],
    description: "13 musiciens, 3 chanteurs. Intro violoniste, dabka souriya, décoration lumière.",
    segments: [
      { id: "seg1", label: "Intro violoniste", duration: "20 min", description: "Entrée avec violon" },
      { id: "seg2", label: "Chanteur 1", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg3", label: "Dabka Souriya", duration: "30 min", description: "Danse en groupe – ambiance levantine" },      
      { id: "seg4", label: "Chanteur 2", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg5", label: "Chanteur 3", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg6", label: "Décoration lumière", duration: "Soirée", description: "Ambiance lumineuse tout au long de l'événement" },
    ],
    availableSingers: ["s1", "s2", "s3", "s4", "s6"],
  },
  {
    id: "gold",
    name: "Gold",
    basePrice: 5200,
    singers: 3,
    musicians: 13,
    shows: ["Intro violoniste", "Spectacle Ziyara", "Spectacle Hadhra", "Décoration lumière"],
    isRecommended: true,
    description: "13 musiciens, 3 chanteurs. Intro violoniste, spectacle Ziyara, spectacle Hadhra, décoration lumière.",
    segments: [
      { id: "seg1", label: "Intro violoniste", duration: "20 min", description: "Entrée avec violon" },
      { id: "seg2", label: "Chanteur 1", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg3", label: "Spectacle Ziyara", duration: "20 min", description: "Madalih religieuses – ambiance mystique" },
      { id: "seg4", label: "Chanteur 2", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg5", label: "Spectacle Hadhra", duration: "30 min", description: "Chants soufis – percussions – atmosphère spirituelle" },
      { id: "seg6", label: "Chanteur 3", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg7", label: "Décoration lumière", duration: "Soirée", description: "Ambiance lumineuse tout au long de l'événement" },
    ],
    availableSingers: ["s1", "s2", "s3", "s4", "s5", "s6"],
  },
  {
    id: "diamant",
    name: "Diamant",
    basePrice: 6400,
    singers: 3,
    musicians: 13,
    shows: ["Intro violoniste", "Dabka Souriya", "Spectacle Nouba", "Spectacle Ziyara", "Spectacle Hadhra", "Décoration lumière", "Étincelle"],
    description: "13 musiciens, 3 chanteurs. Intro violoniste, dabka souriya, spectacle Nouba, Ziyara, Hadhra, décoration lumière, étincelle.",
    segments: [
      { id: "seg1", label: "Intro violoniste", duration: "20 min", description: "Entrée avec violon" },
      { id: "seg2", label: "Chanteur 1", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg3", label: "Spectacle Dabka Souriya", duration: "20 min", description: "Danse en groupe – ambiance levantine" },
      { id: "seg4", label: "Spectacle Nouba", duration: "20 min", description: "Show traditionnel – costumes tunisiens – patrimoine musical" },
      { id: "seg5", label: "Chanteur 2", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg5", label: "Spectacle Ziyara", duration: "20 min", description: "Madalih religieuses – spectacle soufi – ambiance mystique" },
      { id: "seg6", label: "Spectacle Hadhra", duration: "20 min", description: "Chants soufis – percussions – atmosphère spirituelle" },
      { id: "seg7", label: "Chanteur 3", duration: "45 min maximum", description: "Découvrez un chanteur de votre choix parmi nos artistes" },
      { id: "seg7", label: "Décoration lumière", duration: "Soirée", description: "Ambiance lumineuse tout au long de l'événement" },
      { id: "seg8", label: "Étincelle", duration: "10 min", description: "Clou du spectacle" },
    ],
    availableSingers: ["s1", "s2", "s3", "s7", "s8", "s9"],
  },
];

export const musicStyles = [
  { name: "Chaâbi Tunisien", description: "Rythme traditionnel moderne – esprit festif" },
  { name: "Oriental", description: "Danse orientale – ambiance mariage" },
  { name: "Dabke Libanaise / Syrienne", description: "Danse en groupe – ambiance levantine" },
  { name: "Malouf / Tarab Tunisien", description: "Musique andalouse – patrimoine classique" },
  { name: "Pop Arabe", description: "Romantique moderne – entrée des mariés" },
  { name: "International / Pop occidentale", description: "Dancefloor – hits internationaux" },
];

// On ajoute l'interface pour bien typer les données
export interface Spectacle {
  name: string;
  description: string;
  image: string;
}

// On ajoute la propriété "image" qui pointe vers le dossier public/images/
export const spectacles: Spectacle[] =[
  { 
    name: "Spectacle Nouba", 
    description: "Show traditionnel – costumes tunisiens – patrimoine musical",
    image: "/images/spectacles/nouba.jpg" // Assure-toi de nommer ton image 'nouba.jpg' dans public/images/
  },
  { 
    name: "Spectacle Hadra", 
    description: "Chants soufis – percussions – atmosphère spirituelle",
    image: "/images/spectacles/hadra.jpg" // Assure-toi de nommer ton image 'hadra.jpg'
  },
  { 
    name: "Spectacle Ziyara", 
    description: "Madalih religieuses – spectacle soufi – ambiance mystique",
    image: "/images/spectacles/ziyara.jpg" // Assure-toi de nommer ton image 'ziyara.jpg'
  },
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
