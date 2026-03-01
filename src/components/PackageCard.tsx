import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Music, Users, Star } from "lucide-react";
import type { Package } from "@/data/packages";

interface PackageCardProps {
  pkg: Package;
  index: number;
}

const PackageCard = ({ pkg, index }: PackageCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className={`relative bg-gradient-card rounded-xl border border-border p-6 md:p-8 flex flex-col ${
      pkg.isPopular ? "shadow-gold ring-1 ring-primary/30" : ""
    }`}
  >
    {pkg.isPopular && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
        Le plus populaire
      </span>
    )}
    {pkg.isRecommended && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
        Recommandé
      </span>
    )}

    <h3 className="font-serif text-2xl font-bold text-foreground mb-1">{pkg.name}</h3>
    <p className="text-muted-foreground text-sm mb-5">{pkg.description}</p>

    <div className="text-3xl font-bold text-gradient-gold mb-1">
      {pkg.basePrice.toLocaleString()} DT
    </div>
    <p className="text-xs text-muted-foreground mb-6">à partir de</p>

    <div className="space-y-3 mb-8 flex-1">
      <div className="flex items-center gap-3 text-sm text-foreground">
        <Users size={16} className="text-primary" />
        <span>{pkg.singers} chanteurs · {pkg.musicians} musiciens</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-foreground">
        <Music size={16} className="text-primary" />
        <span>{pkg.shows.join(", ")}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-foreground">
        <Star size={16} className="text-primary" />
        <span>{pkg.segments.length} segments musicaux</span>
      </div>
    </div>

    <Link
      to={`/packages/${pkg.id}`}
      className="block text-center bg-gradient-gold text-primary-foreground py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
    >
      Voir détails
    </Link>
  </motion.div>
);

export default PackageCard;
