import React, { createContext, useContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserResponse as User } from "@api/users";
import { ROUTES } from "@router/constants";
import { useGetMe } from "@api/users";

type AuthContextType = {
  user?: User | null;
  isLoading: boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const { data, error } = useGetMe(accessToken);

  useEffect(() => {
    if (accessToken) {
      if (data) {
        setUser(data);
        setIsLoading(false);
        return;
      }

      if (error) {
        signOut();
      }
      return;
    }

    setIsLoading(false);
    navigate(ROUTES.login);
  }, [data, error, accessToken, navigate]);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate(ROUTES.login);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
