import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppInitializer from "./AppInitializer";

const App = () => {
  return (
    <BrowserRouter>
      <AppInitializer>
        <AppRoutes />
      </AppInitializer>
    </BrowserRouter>
  );
};

export default App;
