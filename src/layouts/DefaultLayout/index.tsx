import { Header, Main } from "@components/core";
import { useAuth } from "@contexts/UserContext";
import { Box } from "@mui/material";
import { ROUTES } from "@router/constants";
import { Navigate, Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  const { user } = useAuth();

  if (user?.isAdmin) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  return (
    <Box width="100%">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Box>
  );
};
