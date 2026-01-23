import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppInitializer from "./AppInitializer";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => {
        console.error(" rvice Worker registration failed:", err);
      });
  }
}, []);

  return (
    <BrowserRouter>
      <AppInitializer>
        <AppRoutes />
      </AppInitializer>
    </BrowserRouter>
  );
};

export default App;
