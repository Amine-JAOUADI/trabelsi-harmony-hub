import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold text-gradient-gold mb-3">Troupe Trabelsi</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            L'excellence musicale pour vos événements prestigieux en Tunisie.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">Navigation</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Packages", path: "/packages" },
              { label: "Disponibilités", path: "/calendrier" },
              { label: "Devis", path: "/devis" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">Contact</h4>
          <p className="text-sm text-muted-foreground">contact@troupetrabelsi.tn</p>
          <p className="text-sm text-muted-foreground">+216 XX XXX XXX</p>
          <p className="text-sm text-muted-foreground">Tunis, Tunisie</p>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Troupe Trabelsi. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
