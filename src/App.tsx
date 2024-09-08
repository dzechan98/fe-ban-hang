import { LoadingScreen } from "@components/core";
import { Router } from "./router";
import { Suspense } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Router />
    </Suspense>
  );
}

export default App;
