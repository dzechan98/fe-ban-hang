import { Box, BoxProps, Container } from "@mui/material";

export interface MainProps extends BoxProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children, ...rest }) => {
  return (
    <Box
      component="main"
      flexGrow={1}
      {...rest}
      sx={{ bgcolor: "#f5f5f5", paddingTop: 10, minHeight: "100vh" }}
    >
      <Container maxWidth="lg">
        <Box>{children}</Box>
      </Container>
    </Box>
  );
};
