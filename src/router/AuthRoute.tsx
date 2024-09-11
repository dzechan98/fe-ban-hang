import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@router/constants";
import { useGetMe } from "@api/users";
import { LoadingScreen } from "@components/core";

export const AuthRoute: React.FC = () => {
  const { data, isLoading } = useGetMe();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return data ? <Navigate to={ROUTES.home} /> : <Outlet />;
};
