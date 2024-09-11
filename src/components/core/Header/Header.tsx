import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Tooltip,
  Badge,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@router/constants";
import { RouterLink } from "@components/core";
import { Search } from "./Search";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <RouterLink
            to={ROUTES.home}
            underline="none"
            color="success"
            display="flex"
            alignItems="center"
          >
            <AdbIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </RouterLink>
          <Box sx={{ flexGrow: 1, paddingX: 10 }}>
            <Search />
          </Box>
          <Box>
            <Tooltip title="Tài khoản">
              <IconButton onClick={() => navigate(ROUTES.login)}>
                <PersonOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Giỏ hàng">
              <IconButton>
                <Badge badgeContent="4" color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
