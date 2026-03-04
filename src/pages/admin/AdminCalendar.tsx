import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock, Clock, CheckCircle2, X } from "lucide-react";
import { useAdminData } from "@/contexts/AdminDataContext";

const DAYS   = ["L", "M", "M", "J", "V", "S", "D"];
const MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

const AdminCalendar = () => {
  const { calendarEvents, updateCalendar } = useAdminData();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year,  setYear]  = useState(today.getFullYear());
  const [sel,   setSel]   = useState<string | null>(null);

  const days = useMemo(() => {
    const first = new Date(year, month, 1);
    const last  = new Date(year, month + 1, 0);
    const pad   = (first.getDay() + 6) % 7;
    const arr: (number | null)[] = Array(pad).fill(null);
    for (let d = 1; d <= last.getDate(); d++) arr.push(d);
    return arr;
  }, [month, year]);

  const key = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const status = (d: number): "reserved" | "pending" | "available" => calendarEvents[key(d)] || "available";

  const prev = () => month === 0 ? (setMonth(11), setYear(y => y - 1)) : setMonth(m => m - 1);
  const next = () => month === 11 ? (setMonth(0), setYear(y => y + 1)) : setMonth(m => m + 1);

  const selStatus = sel ? (calendarEvents[sel] || "available") : null;
  const selDay = sel ? new Date(sel + "T00:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : "";

  const cellStyle = {
    available: { bg: "transparent", border: "border-transparent", text: "text-foreground/60" },
    pending:   { bg: "bg-amber-400/15", border: "border-amber-400/40", text: "text-amber-300 font-semibold" },
    reserved:  { bg: "bg-red-400/15",   border: "border-red-400/35",   text: "text-red-400 font-semibold" },
  };

  const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}-`;
  const monthReserved = Object.entries(calendarEvents).filter(([k, v]) => k.startsWith(monthPrefix) && v === "reserved").length;
  const monthPending  = Object.entries(calendarEvents).filter(([k, v]) => k.startsWith(monthPrefix) && v === "pending").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold text-foreground">Agenda</h1>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 rounded-full bg-red-400 inline-block"/> {monthReserved} rés.</span>
          <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"/> {monthPending} att.</span>
        </div>
      </div>

      {/* Calendar card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Month nav */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <button onClick={prev} className="p-1.5 rounded-lg hover:bg-secondary transition active:scale-90">
            <ChevronLeft size={18} />
          </button>
          <h2 className="font-serif text-base font-bold text-foreground capitalize">{MONTHS[month]} {year}</h2>
          <button onClick={next} className="p-1.5 rounded-lg hover:bg-secondary transition active:scale-90">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 px-2 pt-2">
          {DAYS.map((d, i) => <div key={i} className="text-center text-[10px] text-muted-foreground font-medium py-1">{d}</div>)}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1 p-2">
          {days.map((d, i) => {
            if (!d) return <div key={i} />;
            const st = status(d);
            const dk = key(d);
            const cs = cellStyle[st];
            const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isSelected = sel === dk;

            return (
              <button
                key={i}
                onClick={() => setSel(isSelected ? null : dk)}
                className={`
                  aspect-square flex items-center justify-center rounded-xl text-sm border transition-all active:scale-90
                  ${cs.bg} ${cs.border} ${cs.text}
                  ${isSelected ? "ring-2 ring-primary ring-offset-1 ring-offset-card" : ""}
                  ${isToday ? "font-bold" : ""}
                `}
              >
                <span className="relative">
                  {d}
                  {isToday && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 px-4 pb-3 pt-1 border-t border-border">
          {[
            { color: "bg-emerald-400", label: "Disponible" },
            { color: "bg-amber-400",   label: "En attente" },
            { color: "bg-red-400",     label: "Réservé" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${l.color}`} />
              <span className="text-[10px] text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected date action sheet */}
      <AnimatePresence>
        {sel && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground">Date sélectionnée</p>
                <p className="text-sm font-semibold text-foreground capitalize">{selDay}</p>
              </div>
              <button onClick={() => setSel(null)} className="p-1.5 rounded-lg hover:bg-secondary">
                <X size={15} className="text-muted-foreground" />
              </button>
            </div>
            <div className="p-3 grid grid-cols-3 gap-2">
              <button
                onClick={() => { updateCalendar(sel, "reserved"); setSel(null); }}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium transition active:scale-95 ${
                  selStatus === "reserved"
                    ? "bg-red-400/15 border-red-400/50 text-red-400"
                    : "bg-secondary border-border text-muted-foreground hover:text-red-400 hover:border-red-400/30"
                }`}
              >
                <Lock size={16} />
                Réservé
              </button>
              <button
                onClick={() => { updateCalendar(sel, "pending"); setSel(null); }}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium transition active:scale-95 ${
                  selStatus === "pending"
                    ? "bg-amber-400/15 border-amber-400/50 text-amber-400"
                    : "bg-secondary border-border text-muted-foreground hover:text-amber-400 hover:border-amber-400/30"
                }`}
              >
                <Clock size={16} />
                Attente
              </button>
              <button
                onClick={() => { updateCalendar(sel, "remove"); setSel(null); }}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium transition active:scale-95 ${
                  selStatus === "available"
                    ? "bg-emerald-400/15 border-emerald-400/50 text-emerald-400"
                    : "bg-secondary border-border text-muted-foreground hover:text-emerald-400 hover:border-emerald-400/30"
                }`}
              >
                <CheckCircle2 size={16} />
                Libre
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCalendar;
