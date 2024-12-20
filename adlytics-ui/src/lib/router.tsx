import { createBrowserRouter } from "react-router-dom";
import { RoutePath } from "./route";
import LandingScreen from "../screens/LandingScreen";

export const router = createBrowserRouter([
  {
    path: RoutePath.indexRoute,
    element: <LandingScreen />,
  },
]);
