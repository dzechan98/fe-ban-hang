import { Stack, Typography } from "@mui/material";
import authBanner from "@assets/login-background.png";
import { ROUTES } from "@router/constants";
import { Logo, RouterLink } from "@components/core";

interface AuthLayoutProps {
  isLogin: boolean;
  children: React.ReactNode;
}

export const AuthLayout = ({ isLogin, children }: AuthLayoutProps) => {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundImage: `url(${authBanner})`,
        backgroundRepeat: "no-repeat",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        width={500}
        alignItems="center"
        gap={2.5}
        boxShadow={3}
        sx={{
          borderRadius: 2,
          padding: "40px",
        }}
      >
        <Logo size="large" showTitle />
        <Typography fontSize="24px" fontWeight="600" color="primary">
          {isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}
        </Typography>
        {children}
        <Stack direction="row" gap={0.5}>
          <Typography fontSize="14px">
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
          </Typography>
          <RouterLink to={isLogin ? ROUTES.register : ROUTES.login}>
            <Typography fontSize="14px" fontWeight="600">
              {isLogin ? "Đăng ký tài khoản mới" : "Đăng nhập ngay"}
            </Typography>
          </RouterLink>
        </Stack>
      </Stack>
    </Stack>
  );
};
