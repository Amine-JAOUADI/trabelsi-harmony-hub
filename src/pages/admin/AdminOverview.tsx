import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { useAdminData } from "@/contexts/AdminDataContext";
import { packages } from "@/data/packages";

const AdminOverview = ({ setTab }: { setTab: (t: string) => void }) => {
  const { demands } = useAdminData();

  const pending   = demands.filter(d => d.status === "pending").length;
  const confirmed = demands.filter(d => d.status === "confirmed").length;
  const cancelled = demands.filter(d => d.status === "cancelled").length;
  const revenue   = demands
    .filter(d => d.status === "confirmed")
    .reduce((sum, d) => sum + (packages.find(p => p.id === d.packageId)?.basePrice || 0), 0);

  const stats = [
    { label: "En attente", value: pending,   icon: Clock,        color: "text-amber-400",   bg: "bg-amber-400/10",   tab: "demands" },
    { label: "Confirmés",  value: confirmed, icon: CheckCircle,  color: "text-emerald-400", bg: "bg-emerald-400/10", tab: "demands" },
    { label: "Annulés",    value: cancelled, icon: XCircle,      color: "text-red-400",     bg: "bg-red-400/10",     tab: "demands" },
    { label: "Revenu",     value: `${revenue.toLocaleString()} DT`, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10", tab: null },
  ];

  const recent = [...demands]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);

  const statusStyle = {
    pending:   "text-amber-400 bg-amber-400/10",
    confirmed: "text-emerald-400 bg-emerald-400/10",
    cancelled: "text-red-400 bg-red-400/10",
  };
  const statusLabel = { pending: "Attente", confirmed: "Confirmé", cancelled: "Annulé" };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-xl font-bold text-foreground">Bonjour 👋</h1>
        <p className="text-muted-foreground text-xs mt-0.5">Vue d'ensemble de votre activité</p>
      </div>

      {/* Stats 2x2 grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.button
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => s.tab && setTab(s.tab)}
              className={`bg-card border border-border rounded-xl p-3.5 text-left transition-all active:scale-95 ${s.tab ? "hover:border-primary/30" : ""}`}
            >
              <div className={`inline-flex p-1.5 rounded-lg ${s.bg} mb-2`}>
                <Icon size={15} className={s.color} />
              </div>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Recent demands */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Demandes récentes</span>
          <button onClick={() => setTab("demands")} className="flex items-center gap-1 text-xs text-primary">
            Voir tout <ArrowRight size={12} />
          </button>
        </div>
        {recent.map((d, i) => {
          const pkg = packages.find(p => p.id === d.packageId);
          return (
            <button
              key={d.id}
              onClick={() => setTab("demands")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/40 transition ${i < recent.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.date} · {pkg?.name}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusStyle[d.status]}`}>
                {statusLabel[d.status]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Package breakdown */}
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-sm font-semibold text-foreground mb-3">Packages demandés</p>
        <div className="space-y-2.5">
          {packages.map(pkg => {
            const count = demands.filter(d => d.packageId === pkg.id).length;
            const pct = demands.length ? Math.round((count / demands.length) * 100) : 0;
            return (
              <div key={pkg.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground font-medium">{pkg.name}</span>
                  <span className="text-muted-foreground">{count} · {pct}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="h-full bg-gradient-gold rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
