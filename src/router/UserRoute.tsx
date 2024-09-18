import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetMe } from "@api/users";
import { useAuth } from "@contexts/UserContext";
import { ROUTES } from "@router/constants";

export const UserRoute: React.FC = () => {
  const { setUser } = useAuth();

  const { data } = useGetMe(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <Outlet />;
};
