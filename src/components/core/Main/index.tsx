import { Footer } from "@components/core";
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
      sx={{ bgcolor: "#f5f5f5", paddingTop: 15, minHeight: "100vh" }}
    >
      <Container maxWidth="lg">
        <Box marginBottom={3}>{children}</Box>
      </Container>
      <Footer />
    </Box>
  );
};
