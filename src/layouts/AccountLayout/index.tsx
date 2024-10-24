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
import { Outlet, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "@router/constants";

const AccountLayout = () => {
  const { user } = useAuth();
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
              variant="h2"
              fontSize="14px"
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
          <MenuItem>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Hồ sơ của tôi</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ShoppingBagOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Đơn mua</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ShoppingBagOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Đổi mật khẩu</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ShoppingBagOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Đơn mua</ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default AccountLayout;
