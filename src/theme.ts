import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        sizeMedium: {
          height: "40px",
        },
        sizeLarge: {
          height: "56px",
        },
      },
    },
  },
});
