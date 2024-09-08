import { Box, BoxProps, Container } from "@mui/material";

export interface MainProps extends BoxProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children, ...rest }) => {
  return (
    <Box component="main" flexGrow={1} {...rest}>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh", mt: 2 }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};
