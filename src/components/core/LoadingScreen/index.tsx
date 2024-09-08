import { Box, CircularProgress } from "@mui/material";

export const LoadingScreen = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      right={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
};
