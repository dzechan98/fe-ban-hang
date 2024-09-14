import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@router/constants";
import { useGetMe } from "@api/users";

export const AuthRoute: React.FC = () => {
  const { data } = useGetMe(localStorage.getItem("accessToken"));

  return data ? <Navigate to={ROUTES.home} /> : <Outlet />;
};
