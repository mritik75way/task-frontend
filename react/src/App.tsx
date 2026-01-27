import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
    }
  }, []);

  return (
    <ErrorBoundary
      fallback={
        <div className="text-center">
          <h1>Oops!</h1>
          <p>Something went wrong.</p>
        </div>
      }
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
