import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};
