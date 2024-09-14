import logo from "@assets/logo.png";
import { RouterLink } from "@components/core";
import { ROUTES } from "@router/constants";

interface LogoProps {
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
}

enum LogoEnum {
  small = 24,
  medium = 30,
  large = 36,
}

export const Logo = ({ size = "small", children }: LogoProps) => {
  return (
    <RouterLink
      to={ROUTES.home}
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
      {children}
    </RouterLink>
  );
};
