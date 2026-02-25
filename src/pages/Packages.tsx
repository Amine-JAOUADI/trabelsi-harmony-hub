import { motion } from "framer-motion";
import PackageCard from "@/components/PackageCard";
import Footer from "@/components/Footer";
import { packages } from "@/data/packages";

const Packages = () => (
  <div className="min-h-screen bg-background pt-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Nos offres</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Packages
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choisissez le package qui correspond à votre vision. Chaque formule est entièrement personnalisable.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
        {packages.map((pkg, i) => (
          <PackageCard key={pkg.id} pkg={pkg} index={i} />
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default Packages;
