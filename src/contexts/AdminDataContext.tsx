import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import {
  packages as defaultPackages,
  singers as defaultSingers,
  stars as defaultStars,
  Package, Singer, Star
} from "@/data/packages";

export interface Demand {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  packageId: string;
  guests: string;
  message: string;
  singers: string[];
  stars: string[];
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

interface AdminDataContextType {
  packages: Package[];
  singers: Singer[];
  stars: Star[];
  demands: Demand[];
  calendarEvents: Record<string, "reserved" | "pending">;
  updatePackage: (pkg: Package) => void;
  updateSinger: (singer: Singer) => void;
  addSinger: (singer: Singer) => void;
  removeSinger: (id: string) => void;
  updateStar: (star: Star) => void;
  addStar: (star: Star) => void;
  removeStar: (id: string) => void;
  updateDemand: (demand: Demand) => void;
  addDemand: (demand: Demand) => void;
  updateCalendar: (date: string, status: "reserved" | "pending" | "remove") => void;
  resetToDefaults: () => void;
}

const KEYS = {
  packages: "trabelsi_packages",
  singers: "trabelsi_singers",
  stars: "trabelsi_stars",
  demands: "trabelsi_demands",
  calendar: "trabelsi_calendar",
};

const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
};

const save = (key: string, value: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

const defaultDemands: Demand[] = [
  { id: "d1", name: "Sami & Leila Ben Youssef", email: "sami.b@gmail.com", phone: "+216 55 123 456", date: "2026-04-11", packageId: "gold", guests: "300", message: "Mariage à Hammamet, salle de 400 personnes.", singers: ["s1", "s2"], stars: ["st2"], status: "pending", createdAt: "2026-02-28T10:30:00Z" },
  { id: "d2", name: "Khaled Marzougui", email: "khaled.m@outlook.com", phone: "+216 22 987 654", date: "2026-05-02", packageId: "silver", guests: "150", message: "Fiançailles à Sfax.", singers: ["s3"], stars: [], status: "confirmed", createdAt: "2026-02-25T14:00:00Z" },
  { id: "d3", name: "Amira & Youssef Triki", email: "amira.triki@gmail.com", phone: "+216 98 456 789", date: "2026-06-06", packageId: "diamant", guests: "500", message: "Grand mariage, besoin du meilleur package.", singers: ["s1", "s2", "s3"], stars: ["st1", "st3"], status: "pending", createdAt: "2026-03-01T09:15:00Z" },
  { id: "d4", name: "Fatma Chaabane", email: "fatma.c@gmail.com", phone: "+216 71 234 567", date: "2026-04-25", packageId: "bronze", guests: "200", message: "Anniversaire de mariage.", singers: ["s2"], stars: ["st10"], status: "cancelled", createdAt: "2026-02-20T16:45:00Z" },
];

const defaultCalendar: Record<string, "reserved" | "pending"> = {
  "2026-03-07": "reserved", "2026-03-14": "reserved", "2026-03-21": "pending",
  "2026-03-28": "reserved", "2026-04-04": "pending", "2026-04-11": "reserved",
  "2026-04-18": "reserved", "2026-04-25": "pending", "2026-05-02": "reserved",
  "2026-05-09": "reserved", "2026-05-16": "reserved", "2026-05-23": "pending",
  "2026-06-06": "reserved", "2026-06-13": "reserved", "2026-06-20": "pending",
  "2026-06-27": "reserved",
};

const AdminDataContext = createContext<AdminDataContextType | null>(null);

export const AdminDataProvider = ({ children }: { children: ReactNode }) => {
  const [packages, setPackages] = useState<Package[]>(() => load(KEYS.packages, defaultPackages));
  const [singers, setSingers] = useState<Singer[]>(() => load(KEYS.singers, defaultSingers));
  const [stars, setStars] = useState<Star[]>(() => load(KEYS.stars, defaultStars));
  const [demands, setDemands] = useState<Demand[]>(() => load(KEYS.demands, defaultDemands));
  const [calendarEvents, setCalendarEvents] = useState<Record<string, "reserved" | "pending">>(() => load(KEYS.calendar, defaultCalendar));

  useEffect(() => { save(KEYS.packages, packages); }, [packages]);
  useEffect(() => { save(KEYS.singers, singers); }, [singers]);
  useEffect(() => { save(KEYS.stars, stars); }, [stars]);
  useEffect(() => { save(KEYS.demands, demands); }, [demands]);
  useEffect(() => { save(KEYS.calendar, calendarEvents); }, [calendarEvents]);

  const updatePackage = useCallback((pkg: Package) => setPackages(p => p.map(x => x.id === pkg.id ? pkg : x)), []);
  const updateSinger = useCallback((s: Singer) => setSingers(p => p.map(x => x.id === s.id ? s : x)), []);
  const addSinger = useCallback((s: Singer) => setSingers(p => [...p, s]), []);
  const removeSinger = useCallback((id: string) => setSingers(p => p.filter(x => x.id !== id)), []);
  const updateStar = useCallback((s: Star) => setStars(p => p.map(x => x.id === s.id ? s : x)), []);
  const addStar = useCallback((s: Star) => setStars(p => [...p, s]), []);
  const removeStar = useCallback((id: string) => setStars(p => p.filter(x => x.id !== id)), []);
  const updateDemand = useCallback((d: Demand) => setDemands(p => p.map(x => x.id === d.id ? d : x)), []);
  const addDemand = useCallback((d: Demand) => setDemands(p => [d, ...p]), []);
  const updateCalendar = useCallback((date: string, status: "reserved" | "pending" | "remove") => {
    setCalendarEvents(prev => {
      const next = { ...prev };
      if (status === "remove") delete next[date];
      else next[date] = status;
      return next;
    });
  }, []);
  const resetToDefaults = useCallback(() => {
    setPackages(defaultPackages); setSingers(defaultSingers); setStars(defaultStars);
    setDemands(defaultDemands); setCalendarEvents(defaultCalendar);
  }, []);

  return (
    <AdminDataContext.Provider value={{
      packages, singers, stars, demands, calendarEvents,
      updatePackage, updateSinger, addSinger, removeSinger,
      updateStar, addStar, removeStar, updateDemand, addDemand,
      updateCalendar, resetToDefaults,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
};
