import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, FileText, CalendarDays, Package, Users, LogOut, Bell } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useAdminData } from "@/contexts/AdminDataContext";
import { useNavigate } from "react-router-dom";

import AdminOverview from "@/pages/admin/AdminOverview";
import AdminDemands from "@/pages/admin/AdminDemands";
import AdminCalendar from "@/pages/admin/AdminCalendar";
import AdminPackages from "@/pages/admin/AdminPackages";
import AdminArtists from "@/pages/admin/AdminArtists";

const tabs = [
  { id: "overview", label: "Accueil", icon: LayoutDashboard },
  { id: "demands",  label: "Demandes", icon: FileText },
  { id: "calendar", label: "Agenda", icon: CalendarDays },
  { id: "packages", label: "Packages", icon: Package },
  { id: "artists",  label: "Artistes", icon: Users },
];

const AdminDashboard = () => {
  const { logout } = useAdmin();
  const { demands } = useAdminData();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");

  const pending = demands.filter(d => d.status === "pending").length;

  const renderPage = () => {
    switch (active) {
      case "overview": return <AdminOverview setTab={setActive} />;
      case "demands":  return <AdminDemands />;
      case "calendar": return <AdminCalendar />;
      case "packages": return <AdminPackages />;
      case "artists":  return <AdminArtists />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top header */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border flex items-center justify-between px-4 h-12 shrink-0">
        <span className="font-serif font-bold text-foreground text-sm">
          Trabelsi <span className="text-primary">Admin</span>
        </span>
        <div className="flex items-center gap-1">
          {pending > 0 && (
            <button onClick={() => setActive("demands")} className="relative p-2 rounded-lg hover:bg-secondary transition">
              <Bell size={17} className="text-muted-foreground" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">{pending}</span>
            </button>
          )}
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-400 px-2 py-1.5 rounded-lg hover:bg-red-400/10 transition"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="p-4 max-w-2xl mx-auto w-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom tab bar (mobile-first) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur border-t border-border">
        <div className="flex items-stretch max-w-2xl mx-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            const hasBadge = tab.id === "demands" && pending > 0;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors relative ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="relative">
                  <Icon size={isActive ? 20 : 18} strokeWidth={isActive ? 2.5 : 1.8} />
                  {hasBadge && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-primary text-primary-foreground text-[8px] font-bold rounded-full flex items-center justify-center">
                      {pending}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;
