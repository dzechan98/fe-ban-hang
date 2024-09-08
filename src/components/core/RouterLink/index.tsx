import { Link, LinkProps } from "@mui/material";
import { forwardRef } from "react";
import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
} from "react-router-dom";

export type RouterLinkProps = LinkProps & ReactRouterLinkProps;

export const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <Link ref={ref} component={ReactRouterLink} {...props} />
);
