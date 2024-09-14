import React, { createContext, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserResponse as User } from "@api/users";
import { ROUTES } from "@router/constants";

type UserContextType = {
  user?: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signOut: () => void;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate(ROUTES.login);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export const useAuth = (): UserContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthProvider;
