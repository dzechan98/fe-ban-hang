import { LoadingScreen } from "@components/core";
import { Router } from "./router";
import { Suspense } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCustomYup } from "@hooks/useCustomYup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  useCustomYup();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingScreen />}>
        <Router />
        <ToastContainer />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
