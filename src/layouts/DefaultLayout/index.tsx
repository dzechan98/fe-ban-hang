import { Header, Main } from "@components/core";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <Box width="100%">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Box>
  );
};
