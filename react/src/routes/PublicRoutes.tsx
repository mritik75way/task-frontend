import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useAppSelector } from "../app/hooks";

interface Props {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <Spin size="large" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/folders/root" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;