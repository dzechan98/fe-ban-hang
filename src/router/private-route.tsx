import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@router/constants";
import { LoadingScreen } from "@components/core";
import { useState } from "react";

export const PrivateRoute: React.FC = () => {
  const [data, setData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return data ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
