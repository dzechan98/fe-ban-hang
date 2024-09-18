import logo from "@assets/logo.png";
import { RouterLink } from "@components/core";
import { Typography } from "@mui/material";
import { ROUTES } from "@router/constants";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showTitle?: boolean;
  color?: "white" | "primary.main";
}

enum LogoEnum {
  small = 24,
  medium = 30,
  large = 36,
}

export const Logo = ({
  size = "small",
  showTitle = false,
  color = "primary.main",
}: LogoProps) => {
  return (
    <RouterLink
      to={ROUTES.home}
      color={color}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        height={LogoEnum[size]}
        width={LogoEnum[size]}
        alt="logo"
      />
      {showTitle && (
        <Typography fontSize="18px" fontWeight="600">
          VStore
        </Typography>
      )}
    </RouterLink>
  );
};
