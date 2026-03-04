import { Navigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAdmin();
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
