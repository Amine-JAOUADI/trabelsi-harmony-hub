import { Link } from "react-router-dom";
// Added "Mail" to the imports below
import { Facebook, Instagram, Phone, MapPin, User, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Column 1: Brand Info + Logo */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/icon/troupeIcon.jpg"
              alt="Logo Troupe Trabelsi"
              className="w-12 h-12 object-cover rounded-xl border border-border shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <h3 className="font-serif text-xl font-bold text-gradient-gold">Troupe Trabelsi</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed text-center md:text-left">
            L'excellence musicale pour vos événements prestigieux en Tunisie.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 mt-1">
            <a
              href="https://www.facebook.com/wagdi.trabelsi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/troupetrabelsi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">Navigation</h4>
          <div className="flex flex-col gap-2.5">
            {[
              { label: "Accueil", path: "/" },
              { label: "Notre Troupe", path: "/notre-troupe" },
              { label: "Packages", path: "/packages" },
              { label: "Disponibilités", path: "/calendrier" },
              { label: "Réserver", path: "/reserver" },
            ].map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Contact */}
        <div className="sm:col-span-2 md:col-span-2">
          <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">Contact & Infos</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Manager */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <User size={15} className="text-primary" />
              </div>
              <div className="text-sm">
                <span className="block font-medium text-foreground mb-1">Manager</span>
                <span className="block text-muted-foreground">Wajdi Trabelsi</span>
                <a
                  href="https://www.facebook.com/wagdi.trabelsi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors mt-1"
                >
                  <Facebook size={13} /> Profil Facebook
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Phone size={15} className="text-primary" />
              </div>
              <div className="text-sm">
                <span className="block font-medium text-foreground mb-1">Téléphone</span>
                <a href="tel:24739679" className="block text-muted-foreground hover:text-primary transition-colors">24 739 679</a>
                <a href="tel:22751841" className="block text-muted-foreground hover:text-primary transition-colors">22 751 841</a>
              </div>
            </div>

            {/* Email - NEW SECTION */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Mail size={15} className="text-primary" />
              </div>
              <div className="text-sm">
                <span className="block font-medium text-foreground mb-1">Email</span>
                <a 
                  href="mailto:Contact@TroupeTrabelsi.com" 
                  className="block text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  Contact@TroupeTrabelsi.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <MapPin size={15} className="text-primary" />
              </div>
              <div className="text-sm">
                <span className="block font-medium text-foreground mb-1">Adresses</span>
                <span className="block text-muted-foreground">Avenue Habib Bourguiba, ksar hellal</span>
                <span className="block text-muted-foreground">2ème bureau : Sousse</span>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Instagram size={15} className="text-primary" />
              </div>
              <div className="text-sm">
                <span className="block font-medium text-foreground mb-1">Instagram</span>
                <a
                  href="https://www.instagram.com/troupetrabelsi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  @troupetrabelsi
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Troupe Trabelsi. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;