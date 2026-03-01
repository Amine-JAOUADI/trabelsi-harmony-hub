import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Music, User, Star as StarIcon, Clock } from "lucide-react";
import Footer from "@/components/Footer";
import { packages, singers, stars } from "@/data/packages";

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const pkg = packages.find((p) => p.id === id);

  const [selectedSingers, setSelectedSingers] = useState<string[]>([]);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);

  const availableSingers = useMemo(
    () => singers.filter((s) => pkg?.availableSingers.includes(s.id)),
    [pkg]
  );

  const totalPrice = useMemo(() => {
    if (!pkg) return 0;
    const singerExtra = selectedSingers.reduce((sum, sid) => {
      const s = singers.find((x) => x.id === sid);
      return sum + (s?.premiumPrice || 0);
    }, 0);
    const starExtra = selectedStars.reduce((sum, sid) => {
      const s = stars.find((x) => x.id === sid);
      return sum + (s?.price || 0);
    }, 0);
    return pkg.basePrice + singerExtra + starExtra;
  }, [pkg, selectedSingers, selectedStars]);

  const toggleSinger = (id: string) =>
    setSelectedSingers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < (pkg?.singers || 0) ? [...prev, id] : prev
    );

  const toggleStar = (id: string) =>
    setSelectedStars((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Package introuvable</h1>
          <Link to="/packages" className="text-primary hover:underline text-sm">
            Retour aux packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 pb-20">
        <Link to="/packages" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8">
          <ArrowLeft size={16} /> Retour aux packages
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-serif text-4xl font-bold text-foreground">{pkg.name}</h1>
                {pkg.isPopular && (
                  <span className="bg-gradient-gold text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{pkg.description}</p>
            </motion.div>

            {/* Segments */}
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock size={18} className="text-primary" /> Ordonnancement de la soirée
              </h2>
              <div className="space-y-3">
                {pkg.segments.map((seg, i) => (
                  <motion.div
                    key={seg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-card border border-border rounded-lg p-4 flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground">{seg.label}</p>
                      <p className="text-xs text-muted-foreground">{seg.description}</p>
                    </div>
                    <span className="text-xs text-primary font-medium">{seg.duration}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Singers */}
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                <User size={18} className="text-primary" /> Choisissez vos chanteurs
              </h2>
              <p className="text-xs text-muted-foreground mb-4">
                Sélectionnez jusqu'à {pkg.singers} chanteurs ({selectedSingers.length}/{pkg.singers})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableSingers.map((s) => {
                  const selected = selectedSingers.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleSinger(s.id)}
                      className={`flex items-center gap-3 p-4 rounded-lg border text-left transition-all ${
                        selected
                          ? "border-primary bg-primary/5"
                          : "border-border bg-gradient-card hover:border-primary/30"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <User size={16} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.specialty}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {s.isPremium && (
                          <p className="text-xs text-primary font-medium">+{s.premiumPrice} DT</p>
                        )}
                        {selected && <Check size={16} className="text-primary ml-auto" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stars */}
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                <StarIcon size={18} className="text-primary" /> Invités spéciaux
              </h2>
              <p className="text-xs text-muted-foreground mb-4">
                Ajoutez des stars à votre soirée pour un moment exceptionnel
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stars.map((s) => {
                  const selected = selectedStars.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleStar(s.id)}
                      className={`flex items-center gap-3 p-4 rounded-lg border text-left transition-all ${
                        selected
                          ? "border-primary bg-primary/5"
                          : "border-border bg-gradient-card hover:border-primary/30"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <StarIcon size={18} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-primary">{s.price.toLocaleString()} DT</p>
                        {selected && <Check size={16} className="text-primary ml-auto mt-1" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Quote summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-card border border-border rounded-xl p-6 shadow-gold">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">Récapitulatif</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package {pkg.name}</span>
                  <span className="text-foreground font-medium">{pkg.basePrice.toLocaleString()} DT</span>
                </div>

                {selectedSingers.map((sid) => {
                  const s = singers.find((x) => x.id === sid);
                  if (!s?.isPremium) return null;
                  return (
                    <div key={sid} className="flex justify-between">
                      <span className="text-muted-foreground">{s.name} (premium)</span>
                      <span className="text-foreground font-medium">+{s.premiumPrice} DT</span>
                    </div>
                  );
                })}

                {selectedStars.map((sid) => {
                  const s = stars.find((x) => x.id === sid);
                  if (!s) return null;
                  return (
                    <div key={sid} className="flex justify-between">
                      <span className="text-muted-foreground">{s.name}</span>
                      <span className="text-foreground font-medium">+{s.price.toLocaleString()} DT</span>
                    </div>
                  );
                })}

                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total estimatif</span>
                    <span className="text-2xl font-bold text-gradient-gold">{totalPrice.toLocaleString()} DT</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Devis final confirmé par le manager</p>
                </div>
              </div>

              <Link
                to={`/reserver?package=${pkg.id}&singers=${selectedSingers.join(",")}&stars=${selectedStars.join(",")}`}
                className="block text-center bg-gradient-gold text-primary-foreground py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity mt-6"
              >
                Envoyer ma configuration
              </Link>

              <Link
                to="/calendrier"
                className="block text-center border border-primary/30 text-primary py-3 rounded-md font-medium text-sm hover:bg-primary/10 transition-colors mt-3"
              >
                Vérifier disponibilité
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PackageDetail;
