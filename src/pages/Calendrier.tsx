import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Lock, CheckCircle2 } from "lucide-react";
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
    const startPad = (firstDay.getDay() + 6) % 7;
    const result: (number | null)[] = Array(startPad).fill(null);
    for (let d = 1; d <= lastDay.getDate(); d++) result.push(d);
    return result;
  }, [month, year]);

  const getStatus = (day: number): "reserved" | "pending" | "available" => {
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

  const selectedStatus = selectedDate ? ((mockEvents[selectedDate] || "available") as "reserved" | "pending" | "available") : null;

  const cellBg: Record<string, string> = {
    available: "rgba(34, 197, 94, 0.18)",
    pending:   "rgba(245, 158, 11, 0.25)",
    reserved:  "rgba(220, 38, 38, 0.15)",
  };
  const cellBorder: Record<string, string> = {
    available: "rgba(34, 197, 94, 0.5)",
    pending:   "rgba(245, 158, 11, 0.5)",
    reserved:  "rgba(220, 38, 38, 0.4)",
  };
  const cellHoverBg: Record<string, string> = {
    available: "rgba(34, 197, 94, 0.30)",
    pending:   "rgba(245, 158, 11, 0.30)",
    reserved:  "rgba(220, 38, 38, 0.18)",
  };
  const cellSolidColor: Record<string, string> = {
    available: "rgb(34, 197, 94)",
    pending:   "rgb(245, 158, 11)",
    reserved:  "rgb(220, 38, 38)",
  };

  const legendBorder: Record<string, string> = {
    available: "rgba(34, 197, 94, 0.4)",
    pending:   "rgba(245, 158, 11, 0.4)",
    reserved:  "rgba(220, 38, 38, 0.35)",
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 pb-12">

        {/* Header — more compact */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">Disponibilités</h1>
          <p className="text-muted-foreground mx-auto text-base">
            Consultez notre calendrier et réservez la date idéale pour votre événement.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">

          {/* Légende — more compact */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm"
              style={{ background: "hsl(var(--card))", border: `1px solid ${legendBorder.available}` }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgb(34, 197, 94)" }} />
              <span className="text-xs font-medium" style={{ color: "rgb(34, 197, 94)" }}>Disponible</span>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm"
              style={{ background: "hsl(var(--card))", border: `1px solid ${legendBorder.pending}` }}
            >
              <Clock size={13} style={{ color: "rgb(245, 158, 11)" }} />
              <span className="text-xs font-medium" style={{ color: "rgb(245, 158, 11)" }}>En attente</span>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm"
              style={{ background: "hsl(var(--card))", border: `1px solid ${legendBorder.reserved}` }}
            >
              <Lock size={13} style={{ color: "rgb(220, 38, 38)" }} />
              <span className="text-xs font-medium" style={{ color: "rgb(220, 38, 38)" }}>Réservé</span>
            </div>
          </div>

          {/* Calendar header — more compact */}
          <div className="flex items-center justify-between mb-4 bg-card border shadow-sm px-4 py-3 rounded-2xl">
            <button onClick={prevMonth} className="p-1.5 rounded-xl hover:bg-secondary hover:text-primary transition-colors">
              <ChevronLeft size={22} />
            </button>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground capitalize">
              {MONTHS[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-1.5 rounded-xl hover:bg-secondary hover:text-primary transition-colors">
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs md:text-sm text-muted-foreground font-semibold py-1.5">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid — smaller cells */}
          <div className="grid grid-cols-7 gap-1.5 md:gap-2">
            {days.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;

              const status = getStatus(day);
              const dateKey = getDateKey(day);
              const isSelected = selectedDate === dateKey;
              const dateObj = new Date(year, month, day);
              const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isClickable = !isPast && status !== "reserved";

              const baseClasses = "group relative flex flex-col items-center justify-center aspect-square md:aspect-auto md:h-[58px] w-full max-w-[60px] md:max-w-none mx-auto rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ";

              if (isSelected) {
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(null)}
                    className={baseClasses + "shadow-lg scale-105 z-20"}
                    style={{ background: cellSolidColor[status], borderColor: cellSolidColor[status] }}
                  >
                    <span className="text-sm md:text-base font-semibold z-10 text-white">{day}</span>
                  </button>
                );
              }

              if (isPast) {
                return (
                  <button key={i} disabled
                    className={baseClasses + "cursor-not-allowed"}
                    style={{ background: "transparent", borderColor: "transparent" }}
                  >
                    <span className="text-sm md:text-base font-semibold text-muted-foreground/25">{day}</span>
                  </button>
                );
              }

              return (
                <button
                  key={i}
                  onClick={() => isClickable && setSelectedDate(dateKey)}
                  disabled={!isClickable}
                  className={baseClasses + (isClickable ? "hover:scale-105 hover:shadow-md z-10 cursor-pointer " : "cursor-not-allowed ")}
                  style={{ background: cellBg[status], borderColor: cellBorder[status] }}
                  onMouseEnter={(e) => {
                    if (isClickable) (e.currentTarget as HTMLButtonElement).style.background = cellHoverBg[status];
                  }}
                  onMouseLeave={(e) => {
                    if (isClickable) (e.currentTarget as HTMLButtonElement).style.background = cellBg[status];
                  }}
                >
                  {isToday && (
                    <span
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: cellSolidColor[status] }}
                    />
                  )}

                  <span className="text-sm md:text-base font-semibold z-10 text-white">
                    {day}
                  </span>

                  <div className="absolute bottom-1 flex items-center justify-center w-full">
                    {status === "pending" && <Clock size={11} style={{ color: "rgb(245, 158, 11)" }} />}
                    {status === "reserved" && <Lock size={10} style={{ color: "rgb(220, 38, 38)" }} />}
                    {status === "available" && (
                      <div
                        className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "white" }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected date panel */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-6 bg-card border border-border rounded-2xl p-6 text-center shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">Date sélectionnée</p>
                <p className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4">
                  {new Date(selectedDate).toLocaleDateString("fr-FR", {
                    weekday: "long", day: "numeric", month: "long", year: "numeric",
                  })}
                </p>

                {selectedStatus === "available" && (
                  <div className="flex flex-col items-center">
                    <div
                      className="flex items-center gap-2 font-medium mb-4 px-4 py-1.5 rounded-full text-sm"
                      style={{
                        color: "rgb(34, 197, 94)",
                        background: "rgba(34, 197, 94, 0.12)",
                        border: "1px solid rgba(34, 197, 94, 0.35)",
                      }}
                    >
                      <CheckCircle2 size={16} />
                      <span>Excellente nouvelle, cette date est libre !</span>
                    </div>
                    <Link
                      to={`/reserver?date=${selectedDate}`}
                      className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all hover:scale-105 hover:shadow-lg w-full md:w-auto"
                    >
                      Continuer vers la réservation
                    </Link>
                  </div>
                )}

                {selectedStatus === "pending" && (
                  <div
                    className="flex flex-col md:flex-row items-center justify-center gap-4 p-5 rounded-xl text-left max-w-2xl mx-auto"
                    style={{
                      background: "rgba(245, 158, 11, 0.08)",
                      border: "1px solid rgba(245, 158, 11, 0.35)",
                    }}
                  >
                    <div className="p-2.5 rounded-full" style={{ background: "rgba(245, 158, 11, 0.15)" }}>
                      <Clock size={24} style={{ color: "rgb(245, 158, 11)" }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1" style={{ color: "rgb(245, 158, 11)" }}>
                        Date en attente de confirmation
                      </h4>
                      <p className="text-sm" style={{ color: "rgba(245, 158, 11, 0.75)" }}>
                        Quelqu'un a posé une option sur cette date. Vous pouvez nous contacter pour être placé sur liste d'attente au cas où elle se libère.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calendrier;