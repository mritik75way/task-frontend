import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../app/hooks";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const {isAuthenticated, loading} = useAppSelector((state) => state.auth);
  
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
