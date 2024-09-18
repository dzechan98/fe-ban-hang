import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { styled } from "@mui/material";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  "&.active": {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

interface NavigateProps extends NavLinkProps {
  children: React.ReactNode;
}

export const Navigate: React.FC<NavigateProps> = ({ children, ...props }) => {
  return <StyledNavLink {...props}>{children}</StyledNavLink>;
};
