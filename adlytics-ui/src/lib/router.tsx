import { createBrowserRouter } from "react-router-dom";
import { RoutePath } from "./route";
import LandingScreen from "../screens/LandingScreen";
import Home from "../screens/Home";


export const router = createBrowserRouter([
  {
    path: RoutePath.indexRoute,
    element: <LandingScreen />,
    children: [
      {
        path: "",
        element: <Home />, // to import home component
      },
    ],
  },
]);
