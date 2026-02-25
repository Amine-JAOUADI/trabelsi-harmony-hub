import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import PackageCard from "@/components/PackageCard";
import Footer from "@/components/Footer";
import { packages, musicStyles, testimonials } from "@/data/packages";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />

    {/* About */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Notre histoire</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Une tradition d'excellence
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Depuis plus de 20 ans, la Troupe Trabelsi accompagne les plus beaux événements de Tunisie.
            Notre orchestre d'artistes passionnés allie traditions musicales ancestrales et touches modernes
            pour créer des moments inoubliables. Chaque soirée est une œuvre unique, orchestrée avec
            passion et professionnalisme.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Music Styles */}
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Nos spécialités</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Styles Musicaux</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {musicStyles.map((style, i) => (
            <motion.div
              key={style.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-secondary/50 rounded-lg p-5 text-center hover:bg-secondary transition-colors"
            >
              <div className="text-3xl mb-2">{style.icon}</div>
              <h3 className="font-semibold text-sm text-foreground">{style.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
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
              to="/devis"
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
