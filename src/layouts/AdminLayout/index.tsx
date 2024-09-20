import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import { Outlet, useLocation } from "react-router-dom";
import { Logo, Navigate } from "@components/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ROUTES } from "@router/constants";
import { useAuth } from "@contexts/UserContext";
import { capitalizeWords } from "@utils/capitalizeWords";
import { Button, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const listItems = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    path: ROUTES.dashboard,
  },
  {
    title: "Tài khoản",
    icon: GroupIcon,
    path: ROUTES.users.root,
  },
  {
    title: "Sản phẩm",
    icon: InventoryIcon,
    path: ROUTES.products.root,
  },
  {
    title: "Danh mục",
    icon: CategoryIcon,
    path: ROUTES.categories.root,
  },
  {
    title: "Đơn hàng",
    icon: ShoppingCartIcon,
    path: ROUTES.orders,
  },
];

export const AdminLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {user && `Xin chào ${capitalizeWords(user.email.toLowerCase())}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: "100vh",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
      >
        <Stack height="100%" justifyContent="space-between">
          <Stack>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Logo size="large" showTitle />
            </Toolbar>
            <Divider />
            <List>
              {listItems.map(({ title, icon: Icon, path }) => (
                <Navigate key={title} to={path}>
                  <ListItem disablePadding color="inherit">
                    <ListItemButton color="inherit">
                      <ListItemIcon color="white">
                        <Icon
                          color={
                            location.pathname.includes(path)
                              ? "primary"
                              : "inherit"
                          }
                        />
                      </ListItemIcon>
                      <ListItemText primary={title} color="inherit" />
                    </ListItemButton>
                  </ListItem>
                </Navigate>
              ))}
            </List>
          </Stack>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            sx={{
              margin: "10px 20px",
            }}
          >
            Đăng xuất
          </Button>
        </Stack>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
