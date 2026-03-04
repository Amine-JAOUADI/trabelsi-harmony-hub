import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Index from "./pages/Index";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import Reserver from "./pages/Reserver";
import Calendrier from "./pages/Calendrier";
import NosTroupe from "./pages/NosTroupe";
import NotFound from "./pages/NotFound";

// Admin pages
import { AdminProvider } from "./contexts/AdminContext";
import { AdminDataProvider } from "./contexts/AdminDataContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Layout
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <AdminDataProvider>  {/* Make sure this wraps BrowserRouter */}
          <BrowserRouter>
            <ScrollToTop />
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes (avec Navbar) */}
              <Route path="/" element={<><Navbar /><Index /></>} />
              <Route path="/packages" element={<><Navbar /><Packages /></>} />
              <Route path="/packages/:id" element={<><Navbar /><PackageDetail /></>} />
              <Route path="/reserver" element={<><Navbar /><Reserver /></>} />
              <Route path="/calendrier" element={<><Navbar /><Calendrier /></>} />
              <Route path="/notre-troupe" element={<><Navbar /><NosTroupe /></>} />

              {/* Admin routes (sans Navbar) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

              <Route path="*" element={<><Navbar /><NotFound /></>} />
            </Routes>
          </BrowserRouter>
        </AdminDataProvider>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;