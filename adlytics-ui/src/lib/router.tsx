import { createBrowserRouter } from "react-router-dom";
import { RoutePath } from "./route";
import LandingScreen from "../screens/LandingScreen";
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";
import ForMe from "../screens/ForMe";
import Profile from "../screens/Profile";

export const router = createBrowserRouter([
  {
    path: RoutePath.indexRoute,
    element: <LandingScreen />,
    children: [
      {
        path: "",
        element: <Home />, 
      },
      {
        path: RoutePath.dashboardRoute,
        element: <Dashboard />,
      },
      {
        path: RoutePath.forMeRoute,
        element: <ForMe />,
      },
      {
        path: RoutePath.profileRoute,
        element: <Profile />,
      },
    ],
  },
]);
