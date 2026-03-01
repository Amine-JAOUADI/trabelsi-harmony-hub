import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background image */}
    <img
      src={heroBg}
      alt="Troupe Trabelsi en concert"
      className="absolute inset-0 w-full h-full object-cover"
      loading="eager"
    />
    {/* Overlay */}
    <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />

    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
          ✦ Excellence Musicale ✦
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
          Troupe Trabelsi
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
         ✨La seule adresse pour que vos soirées de rêve deviennent réalité✨
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          to="/packages"
          className="bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity shadow-gold"
        >
          Découvrir nos packages
        </Link>
        <Link
          to="/calendrier"
          className="border border-primary/40 text-primary px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-primary/10 transition-colors"
        >
          Voir disponibilités
        </Link>
        <Link
          to="/reserver"
          className="text-muted-foreground hover:text-foreground px-8 py-3.5 text-sm font-medium transition-colors underline underline-offset-4"
        >
          Demander un devis
        </Link>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <div className="w-5 h-8 rounded-full border-2 border-primary/30 flex items-start justify-center p-1">
        <div className="w-1 h-2 bg-primary rounded-full" />
      </div>
    </motion.div>
  </section>
);

export default HeroSection;
