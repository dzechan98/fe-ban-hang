import { useAuth } from "@contexts/UserContext";
import { ROUTES } from "@router/constants";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  adminRoute?: boolean;
}

export const PrivateRoute = ({ adminRoute = false }: PrivateRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to={ROUTES.login} />;
  }

  if (adminRoute && !user.isAdmin) {
    return <Navigate to={ROUTES.home} />;
  }

  return <Outlet />;
};
