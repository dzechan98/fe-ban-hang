import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";
import { Loading } from "@/components/loading";

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signOut: () => void;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signOut = () => {
    SignOutUser();
    setCurrentUser(null);
    navigate(ROUTES.signin);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, loading, setLoading, signOut }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): UserContextType => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthProvider;
