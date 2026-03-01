import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import PackageCard from "@/components/PackageCard";
import Footer from "@/components/Footer";
import { packages, musicStyles, spectacles, testimonials } from "@/data/packages";

// Fonction pour récupérer la bonne image selon le style musical
const getStyleImage = (name: string) => {
  switch (name) {
    case "Chaâbi Tunisien":
      return "/images/styles-musicaux/mezwed.jpg";
    case "Oriental":
      return "/images/styles-musicaux/orientale.jpg";
    case "Dabke Libanaise / Syrienne":
      return "/images/styles-musicaux/dabka.jpg";
    case "Malouf / Tarab Tunisien":
      return "/images/styles-musicaux/malouf_tunisien.jpg";
    case "Pop Arabe":
      return "/images/styles-musicaux/pop_arabe.jpg";
    case "International / Pop occidentale":
      return "/images/styles-musicaux/pop_occidentale.jpg";
    default:
      return "";
  }
};

// Fonction pour récupérer l'image du spectacle (utilise celle de packages.ts si elle existe, sinon utilise une URL en dur)
const getSpectacleImage = (name: string, image?: string) => {
  if (image) return image;
  if (name.includes("Nouba")) return "/images/spectacles/nouba.jpg";
  if (name.includes("Hadra") || name.includes("Hadra")) return "/images/spectacles/hadra.jpg";
  if (name.includes("Ziyara")) return "/images/spectacles/ziyara.jpg";
  return "";
};

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />

    {/* About */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Notre histoire</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            L’art de sublimer vos célébrations
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Plus de X ans d’expertise dans l’organisation de mariages, fiançailles, soirées privées et cérémonies en Tunisie.
            Une prise en charge complète : animation musicale live, gestion artistique et décoration.
            Un seul objectif : faire de votre événement un moment inoubliable.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Nos spécialités: Styles Musicaux + Spectacles */}
    <section className="py-20 md:py-28 bg-card">
      <div className="w-full px-4 md:px-6">
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-primary font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-5">Nos spécialités</h2>
          <p className="text-foreground/80 font-serif text-2xl md:text-3xl">Styles Musicaux</p>
        </div>
        
        {/* Grille Styles Musicaux */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-border bg-secondary/30">
          {musicStyles.map((style, i) => (
            <motion.div
              key={style.name}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`
                relative overflow-hidden group
                min-h-[280px] md:min-h-[340px] flex flex-col items-center justify-center p-10 md:p-14 text-center
                ${i % 3 !== 2 ? "md:border-r border-border" : ""}
                ${i < 3 ? "border-b border-border" : "border-b md:border-b-0 border-border"}
              `}
            >
              {/* Image de fond avec flou */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-[4px] opacity-70 group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${getStyleImage(style.name)}')` }}
              />
              
              {/* Voile sombre pour la lisibilité */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-500" />

              {/* Contenu Texte */}
              <div className="relative z-10 text-white">
                <h3 className="font-semibold text-xl md:text-2xl mb-3">{style.name}</h3>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">{style.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center py-10 md:py-12">
          <p className="text-foreground/80 font-serif text-2xl md:text-3xl">Spectacles</p>
        </div>

        {/* Grille Spectacles */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-border bg-secondary/30">
          {spectacles.map((spec, i) => (
            <motion.div
              key={spec.name}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`
                relative overflow-hidden group
                min-h-[280px] md:min-h-[340px] flex flex-col items-center justify-center p-10 md:p-14 text-center
                ${i !== 2 ? "md:border-r border-border" : "border-b md:border-b-0 border-border"}
              `}
            >
              {/* Image de fond avec flou */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-[4px] opacity-70 group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${getSpectacleImage(spec.name, (spec as any).image)}')` }}
              />
              
              {/* Voile sombre pour la lisibilité */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-500" />

              {/* Contenu Texte */}
              <div className="relative z-10 text-white">
                <h3 className="font-semibold text-xl md:text-2xl mb-3">{spec.name}</h3>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">{spec.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Packages Preview */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Nos offres</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Packages Sur Mesure
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Témoignages</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Ils nous font confiance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-gradient-card border border-border rounded-xl p-6"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
              <p className="font-semibold text-sm text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.event}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Réservez votre date
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Les meilleures dates partent vite. Vérifiez la disponibilité et réservez dès maintenant.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/calendrier"
              className="bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity shadow-gold"
            >
              Vérifier disponibilité
            </Link>
            <Link
              to="/reserver"
              className="border border-primary/40 text-primary px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-primary/10 transition-colors"
            >
              Demander un devis
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;