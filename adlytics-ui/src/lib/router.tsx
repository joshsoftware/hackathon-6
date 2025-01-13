import { createBrowserRouter } from "react-router-dom";
import { RoutePath } from "./route";
import LandingScreen from "../screens/LandingScreen";
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";
import AdSummary from "../screens/AdSummary";
import Profile from "../screens/Profile";
import YourAds from "../screens/YourAds";

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

        path: RoutePath.adSummary,
        element: <AdSummary />,
      },
      {
        path: RoutePath.profileRoute,
        element: <Profile />,
      },
      {
        path: RoutePath.yourAds,
        element: <YourAds />,
      },
    ],
  },
]);
