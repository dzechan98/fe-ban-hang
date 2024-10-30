import { createContext, useContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserResponse as User } from "@api/users";
import { useGetMe } from "@api/users";
import { ROUTES } from "@router/constants";

type AuthContextType = {
  user?: User | null;
  isLoading: boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = localStorage.getItem("accessToken");
  const { data, error } = useGetMe(accessToken);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate(ROUTES.login);
  };

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
  }, [data, error, accessToken]);

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
