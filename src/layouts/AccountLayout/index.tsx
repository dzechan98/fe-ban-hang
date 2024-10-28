import { useAuth } from "@contexts/UserContext";
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "@router/constants";

const menu = [
  {
    key: 1,
    icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    title: "Hồ sơ của tôi",
    path: ROUTES.account.profile,
  },
  {
    key: 2,
    icon: <ShoppingBagOutlinedIcon fontSize="small" />,
    title: "Đơn mua",
    path: ROUTES.account.purchase,
  },
];

const AccountLayout = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Stack gap={2} direction="row">
      <Box p={1} minWidth={240}>
        <Stack direction="row" gap={1} alignItems="center" pb={2}>
          <Avatar
            src={user?.image}
            sx={{
              width: 45,
              height: 45,
            }}
            alt="avatar-user"
          />
          <Box>
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {user?.name}
            </Typography>
            <Button
              size="small"
              startIcon={<EditIcon />}
              sx={{
                "&:hover": {
                  background: "none",
                },
              }}
              onClick={() => navigate(ROUTES.account.editProfile)}
            >
              Sửa hồ sơ
            </Button>
          </Box>
        </Stack>
        <Divider />
        <MenuList>
          {menu.map((item) => (
            <MenuItem key={item.key} onClick={() => navigate(item.path)}>
              <ListItemIcon
                sx={{
                  color: pathname === item.path ? "primary.main" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{
                  ".MuiListItemText-primary": {
                    color: pathname === item.path ? "primary.main" : "inherit",
                  },
                }}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Box>
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default AccountLayout;
