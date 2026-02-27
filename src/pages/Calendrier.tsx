import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

// Mock availability data
const mockEvents: Record<string, "reserved" | "pending"> = {
  "2026-03-07": "reserved",
  "2026-03-14": "reserved",
  "2026-03-21": "pending",
  "2026-03-28": "reserved",
  "2026-04-04": "pending",
  "2026-04-11": "reserved",
  "2026-04-18": "reserved",
  "2026-04-25": "pending",
  "2026-05-02": "reserved",
  "2026-05-09": "reserved",
  "2026-05-16": "reserved",
  "2026-05-23": "pending",
  "2026-06-06": "reserved",
  "2026-06-13": "reserved",
  "2026-06-20": "pending",
  "2026-06-27": "reserved",
};

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const Calendrier = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = (firstDay.getDay() + 6) % 7; // Monday = 0
    const result: (number | null)[] = Array(startPad).fill(null);
    for (let d = 1; d <= lastDay.getDate(); d++) result.push(d);
    return result;
  }, [month, year]);

  const getStatus = (day: number) => {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return mockEvents[key] || "available";
  };

  const getDateKey = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const selectedStatus = selectedDate ? (mockEvents[selectedDate] || "available") : null;

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Planning</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Disponibilités</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Consultez abcdef notre calendrier et réservez la date idéale pour votre événement.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mb-6 text-xs">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500" /> Disponible</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500" /> En attente</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500" /> Réservé</span>
          </div>

          {/* Calendar header */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-2 rounded-md hover:bg-secondary transition-colors">
              <ChevronLeft size={20} className="text-foreground" />
            </button>
            <h2 className="font-serif text-xl font-bold text-foreground">
              {MONTHS[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-md hover:bg-secondary transition-colors">
              <ChevronRight size={20} className="text-foreground" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs text-muted-foreground font-medium py-2">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const status = getStatus(day);
              const dateKey = getDateKey(day);
              const isSelected = selectedDate === dateKey;
              const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

              return (
                <button
                  key={i}
                  onClick={() => !isPast && status !== "reserved" && setSelectedDate(dateKey)}
                  disabled={isPast || status === "reserved"}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
                    ${isPast ? "text-muted-foreground/30 cursor-not-allowed" : ""}
                    ${status === "available" && !isPast ? "hover:bg-green-500/10 text-foreground cursor-pointer" : ""}
                    ${status === "pending" ? "bg-orange-500/10 text-orange-400 cursor-pointer" : ""}
                    ${status === "reserved" ? "bg-red-500/10 text-red-400 cursor-not-allowed" : ""}
                    ${isSelected ? "ring-2 ring-primary bg-primary/10" : ""}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Selected date */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-gradient-card border border-border rounded-xl p-6 text-center"
            >
              <p className="text-sm text-muted-foreground mb-1">Date sélectionnée</p>
              <p className="text-lg font-bold text-foreground mb-3">
                {new Date(selectedDate).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
              {selectedStatus === "available" && (
                <>
                  <p className="text-green-400 text-sm font-medium mb-4">✓ Cette date est disponible</p>
                  <Link
                    to={`/devis?date=${selectedDate}`}
                    className="inline-block bg-gradient-gold text-primary-foreground px-8 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Continuer vers le devis
                  </Link>
                </>
              )}
              {selectedStatus === "pending" && (
                <p className="text-orange-400 text-sm font-medium">⏳ Cette date est en attente de confirmation</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calendrier;
