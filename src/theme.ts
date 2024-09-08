import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#7C3AED",
    },
    secondary: {
      main: "#e546e5",
    },
    success: {
      main: "#00b300",
      contrastText: "#fff",
    },
    error: {
      main: "#cc0000",
    },
    warning: {
      main: "#ff5500",
    },
    info: {
      main: "#24a0ed",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
        sizeSmall: {
          padding: "4px 12px",
        },
        sizeMedium: {
          padding: "6px 24px",
        },
        sizeLarge: {
          padding: "8px 36px",
        },
        startIcon: {
          marginRight: "4px",
        },
        endIcon: {
          marginLeft: "4px",
        },
      },
    },
  },
});
