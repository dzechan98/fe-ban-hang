import { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";
import useTitle from "@hooks/useTitle";

export interface PageProps extends BoxProps {
  children: ReactNode;
  title: string;
}

export const Page = ({ children, title, ...props }: PageProps) => {
  useTitle(title);

  return (
    <Box {...props} height="100%">
      {children}
    </Box>
  );
};
