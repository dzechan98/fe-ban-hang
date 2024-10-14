import { LoadingScreen } from "@components/core";
import { Router } from "./router";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCustomYup } from "@hooks/useCustomYup";
import { ToastContainer } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "react-toastify/dist/ReactToastify.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "react-quill/dist/quill.snow.css";

const queryClient = new QueryClient();

function App() {
  useCustomYup();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Suspense fallback={<LoadingScreen />}>
          <Router />
          <ToastContainer />
        </Suspense>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
