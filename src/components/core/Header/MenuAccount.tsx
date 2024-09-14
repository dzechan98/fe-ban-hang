import { ListItemIcon, MenuItem, MenuList, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@router/constants";
import { useAuth } from "@contexts/UserContext";
import { capitalizeWords } from "@utils/capitalizeWords";

export const MenuAccount = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleProfile = () => {
    navigate(ROUTES.profile);
  };

  return (
    <MenuList>
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <PersonOutlineOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <Typography>{capitalizeWords("Tài khoản của tôi")}</Typography>
      </MenuItem>
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <ShoppingBagOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <Typography>{capitalizeWords("Đơn mua")}</Typography>
      </MenuItem>
      <MenuItem onClick={signOut}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <Typography>{capitalizeWords("Đăng xuất")}</Typography>
      </MenuItem>
    </MenuList>
  );
};
