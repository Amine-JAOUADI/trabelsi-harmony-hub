import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import Footer from "@/components/Footer";
import { packages, singers, stars } from "@/data/packages";

const Devis = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get("package") || "";
  const singerIds = searchParams.get("singers")?.split(",").filter(Boolean) || [];
  const starIds = searchParams.get("stars")?.split(",").filter(Boolean) || [];
  const preDate = searchParams.get("date") || "";

  const [selectedPackage, setSelectedPackage] = useState(packageId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(preDate);
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const pkg = packages.find((p) => p.id === selectedPackage);

  const total = useMemo(() => {
    if (!pkg) return 0;
    const singerExtra = singerIds.reduce((sum, sid) => {
      const s = singers.find((x) => x.id === sid);
      return sum + (s?.premiumPrice || 0);
    }, 0);
    const starExtra = starIds.reduce((sum, sid) => {
      const s = stars.find((x) => x.id === sid);
      return sum + (s?.price || 0);
    }, 0);
    return pkg.basePrice + singerExtra + starExtra;
  }, [pkg, singerIds, starIds]);

  // Guest-based recommendation
  const recommended = useMemo(() => {
    const g = parseInt(guests);
    if (!g) return null;
    if (g <= 100) return "silver";
    if (g <= 250) return "gold";
    if (g <= 500) return "platinum";
    return "diamond";
  }, [guests]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md px-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-3">Demande envoyée !</h1>
          <p className="text-muted-foreground mb-6">
            Notre équipe vous contactera dans les plus brefs délais pour confirmer votre réservation.
          </p>
          <a href="/" className="text-primary hover:underline text-sm">Retour à l'accueil</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Votre projet</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Demander un Devis</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Remplissez le formulaire ci-dessous pour recevoir un devis personnalisé.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Package selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Package</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {packages.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPackage(p.id)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    selectedPackage === p.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-gradient-card hover:border-primary/30"
                  } ${recommended === p.id ? "ring-1 ring-primary/50" : ""}`}
                >
                  <p className="font-semibold text-sm text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.basePrice.toLocaleString()} DT</p>
                  {recommended === p.id && (
                    <p className="text-xs text-primary mt-1">Recommandé</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Guest count */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Nombre d'invités</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Ex: 200"
              className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {recommended && recommended !== selectedPackage && (
              <p className="text-xs text-primary mt-1">
                💡 Pour {guests} invités, nous recommandons le package {packages.find(p => p.id === recommended)?.name}
              </p>
            )}
          </div>

          {/* Contact info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nom complet</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Téléphone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="+216 XX XXX XXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date souhaitée</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Message (optionnel)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              placeholder="Décrivez votre événement, vos préférences musicales..."
            />
          </div>

          {/* Price summary */}
          {pkg && (
            <div className="bg-gradient-card border border-border rounded-xl p-5">
              <h3 className="font-serif text-lg font-bold text-foreground mb-3">Estimation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package {pkg.name}</span>
                  <span className="text-foreground">{pkg.basePrice.toLocaleString()} DT</span>
                </div>
                {singerIds.map((sid) => {
                  const s = singers.find((x) => x.id === sid);
                  if (!s?.isPremium) return null;
                  return (
                    <div key={sid} className="flex justify-between">
                      <span className="text-muted-foreground">{s.name}</span>
                      <span className="text-foreground">+{s.premiumPrice} DT</span>
                    </div>
                  );
                })}
                {starIds.map((sid) => {
                  const s = stars.find((x) => x.id === sid);
                  if (!s) return null;
                  return (
                    <div key={sid} className="flex justify-between">
                      <span className="text-muted-foreground">{s.name}</span>
                      <span className="text-foreground">+{s.price.toLocaleString()} DT</span>
                    </div>
                  );
                })}
                <div className="border-t border-border pt-2 flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total estimatif</span>
                  <span className="text-xl font-bold text-gradient-gold">{total.toLocaleString()} DT</span>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-gold text-primary-foreground py-3.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity shadow-gold flex items-center justify-center gap-2"
          >
            <Send size={16} /> Envoyer ma demande
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Devis;
