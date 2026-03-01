import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import Footer from "@/components/Footer";
// L'import corrigé :
import { spectacles } from "@/data/packages"; 

const chanteurs =[
  {
    id: "1",
    name: "Mohamed Ali Barakat",
    description: "lena bech nhot description de style musicale",
    instagram: "https://www.instagram.com/mohamed_ali_baraket/",
    facebook: "https://www.facebook.com/barakotta7music/",
    image: "/images/chanteurs/chanteur1.png",
  },
  {
    id: "2",
    name: "Saif Agrebi",
    description: "lena bech nhot description de style musicale",
    instagram: "https://www.instagram.com/saif_agrebi_officiel/",
    facebook: "https://www.facebook.com/saif.agrebi.161/",
    image: "/images/chanteurs/chanteur2.png",
  },
  {
    id: "3",
    name: "Haider Brahim",
    description: "lena bech nhot description de style musicale",
    instagram: "https://www.instagram.com/haider_brahim_officiel/",
    facebook: "https://www.facebook.com/ha.der.9849912",
    image: "/images/chanteurs/chanteur3.png",
  },
];

const NosTroupe = () => {
  const [musiciensImgError, setMusiciensImgError] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Découvrez notre troupe
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Nos Chanteurs */}
      <section className="py-16 md:py-24 bg-card">
        <div className="w-full px-4 md:px-6">
          <div className="text-center mb-14 md:mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Nos artistes</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Nos Chanteurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-6xl mx-auto">
            {chanteurs.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col border border-border rounded-xl overflow-hidden bg-secondary/30"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 md:p-6 text-center border-t border-border">
                  <p className="font-semibold text-lg text-foreground">{c.name}</p>
                  <p className="text-sm text-foreground mt-1">{c.description}</p>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <a
                      href={c.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href={c.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Musiciens */}
      <section className="py-16 md:py-24">
        <div className="w-full">
          <div className="text-center mb-10 md:mb-12 px-4">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Notre orchestre</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Nos Musiciens</h2>
          </div>
          {/* Full-width image */}
          <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-muted overflow-hidden">
            <img
              src="/images/musiciens.jpg"
              alt="Nos musiciens"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setMusiciensImgError(true)}
            />
            {musiciensImgError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-secondary/40 to-muted">
                <span className="text-muted-foreground text-sm font-medium">Photo orchestre</span>
              </div>
            )}
          </div>
          <div className="container mx-auto px-4 py-8 md:py-10 text-center">
            <p className="text-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Equipe composée de 13 musiciens professionnels : 
            2 percussionnistes (derbouka), 
            2 tabalistes (tabla tunisienne), 
            1 batteur, 
            2 claviéristes (orgue / synthétiseur), 
            2 guitaristes, 
            1 violoniste, 
            1 saxophoniste et 
            1 trompettiste.
            </p>
          </div>
        </div>
      </section>

      {/* Nos Spectacles */}
      <section className="py-16 md:py-24 bg-card">
        <div className="w-full px-4 md:px-6">
          <div className="text-center mb-14 md:mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Nos Shows</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {spectacles.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden rounded-xl border border-border shadow-lg group min-h-[280px] flex items-center justify-center p-6"
              >
                {/* Blurred background image layer */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-[4px] opacity-70 group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${s.image})` }}
                />
                
                {/* Dark overlay to ensure text is highly readable over the blurred image */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-500" />

                {/* Content layer */}
                <div className="relative z-10 text-center text-white">
                  <h3 className="text-2xl font-bold mb-3">{s.name}</h3>
                  <p className="text-sm text-gray-200">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NosTroupe;
