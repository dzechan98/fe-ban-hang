import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        sizeMedium: {
          height: "48px",
        },
        sizeLarge: {
          height: "56px",
        },
      },
    },
  },
});
