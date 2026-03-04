import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Phone, Mail, Calendar, Users, MessageSquare, Check, Ban, Clock, ChevronRight, X } from "lucide-react";
import { useAdminData, Demand } from "@/contexts/AdminDataContext";
import { packages, singers, stars } from "@/data/packages";

const STATUS = {
  pending:   { label: "En attente", badge: "text-amber-400 bg-amber-400/10", dot: "bg-amber-400" },
  confirmed: { label: "Confirmé",   badge: "text-emerald-400 bg-emerald-400/10", dot: "bg-emerald-400" },
  cancelled: { label: "Annulé",     badge: "text-red-400 bg-red-400/10", dot: "bg-red-400" },
};

// ── Detail sheet ───────────────────────────────────────────────
const DemandSheet = ({ demand, onClose }: { demand: Demand; onClose: () => void }) => {
  const { updateDemand } = useAdminData();
  const pkg = packages.find(p => p.id === demand.packageId);
  const demSingers = singers.filter(s => demand.singers.includes(s.id));
  const demStars   = stars.filter(s => demand.stars.includes(s.id));
  const total = (pkg?.basePrice || 0)
    + demSingers.reduce((s, x) => s + (x.premiumPrice || 0), 0)
    + demStars.reduce((s, x) => s + x.price, 0);

  const set = (status: Demand["status"]) => { updateDemand({ ...demand, status }); onClose(); };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        className="bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        <div className="px-4 pb-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-foreground leading-tight">{demand.name}</h2>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS[demand.status].badge}`}>
                {STATUS[demand.status].label}
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary mt-0.5">
              <X size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Contact quick links */}
          <div className="grid grid-cols-2 gap-2">
            <a href={`tel:${demand.phone}`}
              className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-secondary/80 transition">
              <Phone size={14} className="text-primary shrink-0" />
              <span className="truncate text-xs">{demand.phone}</span>
            </a>
            <a href={`mailto:${demand.email}`}
              className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-secondary/80 transition">
              <Mail size={14} className="text-primary shrink-0" />
              <span className="truncate text-xs">{demand.email}</span>
            </a>
          </div>

          {/* Info pills */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-secondary rounded-lg px-2.5 py-1.5 text-xs text-foreground">
              <Calendar size={12} className="text-primary" /> {demand.date}
            </div>
            <div className="flex items-center gap-1.5 bg-secondary rounded-lg px-2.5 py-1.5 text-xs text-foreground">
              <Users size={12} className="text-primary" /> {demand.guests} invités
            </div>
          </div>

          {/* Package + price */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Package</p>
                <p className="font-semibold text-sm text-foreground">{pkg?.name}</p>
                {demSingers.length > 0 && <p className="text-xs text-muted-foreground mt-0.5">{demSingers.map(s => s.name).join(", ")}</p>}
                {demStars.length > 0 && <p className="text-xs text-muted-foreground">Stars : {demStars.map(s => s.name).join(", ")}</p>}
              </div>
              <p className="text-lg font-bold text-primary">{total.toLocaleString()} DT</p>
            </div>
          </div>

          {/* Message */}
          {demand.message && (
            <div className="flex gap-2 bg-secondary rounded-xl p-3">
              <MessageSquare size={14} className="text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">{demand.message}</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-1">
            {demand.status !== "confirmed" && (
              <button onClick={() => set("confirmed")}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-emerald-600 transition active:scale-95">
                <Check size={16} /> Confirmer la réservation
              </button>
            )}
            {demand.status !== "cancelled" && (
              <button onClick={() => set("cancelled")}
                className="w-full flex items-center justify-center gap-2 bg-secondary border border-border text-red-400 rounded-xl py-3 text-sm font-semibold hover:bg-red-400/10 transition active:scale-95">
                <Ban size={16} /> Annuler
              </button>
            )}
            {demand.status !== "pending" && (
              <button onClick={() => set("pending")}
                className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition py-2">
                <Clock size={13} /> Remettre en attente
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Main page ──────────────────────────────────────────────────
const AdminDemands = () => {
  const { demands } = useAdminData();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Demand["status"]>("all");
  const [selected, setSelected] = useState<Demand | null>(null);

  const filtered = demands.filter(d => {
    const q = search.toLowerCase();
    const matchQ = d.name.toLowerCase().includes(q) || d.date.includes(q) || d.email.toLowerCase().includes(q);
    return matchQ && (filter === "all" || d.status === filter);
  });

  const counts = {
    all: demands.length,
    pending: demands.filter(d => d.status === "pending").length,
    confirmed: demands.filter(d => d.status === "confirmed").length,
    cancelled: demands.filter(d => d.status === "cancelled").length,
  };

  return (
    <div className="space-y-3">
      <h1 className="font-serif text-xl font-bold text-foreground">Demandes</h1>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Nom, email, date..."
          className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(["all", "pending", "confirmed", "cancelled"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
            }`}>
            {f === "all" ? "Tout" : STATUS[f].label} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8">Aucune demande trouvée</p>
        )}
        {filtered.map((d, i) => {
          const pkg = packages.find(p => p.id === d.packageId);
          const s = STATUS[d.status];
          return (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelected(d)}
              className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-3 text-left hover:border-primary/30 transition active:scale-[0.99]"
            >
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.dot}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.date} · {d.guests} inv. · {pkg?.name}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && <DemandSheet demand={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default AdminDemands;
