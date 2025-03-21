import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Tooltip,
  Badge,
  Popover,
  Stack,
  Avatar,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ROUTES } from "@router/constants";
import { Logo, RouterLink } from "@components/core";
import { Search } from "./Search";
import { usePopover } from "@hooks/usePopover";
import { useAuth } from "@contexts/UserContext";
import { MenuAccount } from "./MenuAccount";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useCart } from "@contexts/CartContext";
import { CartPreview } from "@components/modules";

export const Header = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  const authPopover = usePopover("auth");
  const cartPopover = usePopover("cart");

  const handleClickAccount = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (user) {
      authPopover.handleOpen(e);
    }
  };

  const handleShowPreviewCart = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (user) {
      cartPopover.handleOpen(e);
    }
  };

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Stack flexGrow={1}>
            <Stack
              direction="row"
              paddingTop={1}
              justifyContent="space-between"
            >
              <Stack direction="row" columnGap={1} alignItems="center">
                <Typography fontSize="13px">Kênh người bán</Typography>
                <Typography fontSize="13px">Tải ứng dụng</Typography>
                <Stack direction="row" alignItems="center" columnGap={0.75}>
                  <Typography fontSize="13px">Kết nối</Typography>
                  <RouterLink to={ROUTES.home}>
                    <FacebookIcon sx={{ color: "white", fontSize: "16px" }} />
                  </RouterLink>
                  <RouterLink to={ROUTES.home}>
                    <InstagramIcon sx={{ color: "white", fontSize: "16px" }} />
                  </RouterLink>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                columnGap={1}
                alignItems="center"
                sx={{ cursor: "pointer" }}
                onClick={handleClickAccount}
              >
                {user ? (
                  <Tooltip title="Tài khoản">
                    <Stack direction="row" columnGap={1} alignItems="center">
                      <Avatar
                        src={user.image}
                        alt="user-avatar"
                        sx={{
                          width: 24,
                          height: 24,
                        }}
                      />
                      <Typography fontSize="13px">{user.name}</Typography>
                    </Stack>
                  </Tooltip>
                ) : (
                  <>
                    <RouterLink to={ROUTES.register}>
                      <Typography fontSize="13px" color="white">
                        Đăng ký
                      </Typography>
                    </RouterLink>
                    <RouterLink to={ROUTES.login}>
                      <Typography fontSize="13px" color="white">
                        Đăng nhập
                      </Typography>
                    </RouterLink>
                  </>
                )}
              </Stack>
            </Stack>
            <Stack direction="row" paddingY={2}>
              <Logo size="large" showTitle color="white" />
              <Box sx={{ flexGrow: 1, paddingX: 10 }}>
                <Search />
              </Box>
              <Box onClick={handleShowPreviewCart}>
                <Tooltip title="Giỏ hàng">
                  <IconButton>
                    <Badge badgeContent={cart?.items.length ?? 0} color="error">
                      <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </Toolbar>
        <Popover
          open={authPopover.open}
          anchorEl={authPopover.anchorEl}
          onClose={authPopover.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuAccount />
        </Popover>
        <Popover
          open={cartPopover.open}
          anchorEl={cartPopover.anchorEl}
          onClose={cartPopover.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <CartPreview onClosePopup={cartPopover.handleClose} />
        </Popover>
      </Container>
    </AppBar>
  );
};
