import { createBrowserRouter } from "react-router-dom";
import { RoutePath } from "./route";
import LandingScreen from "../screens/LandingScreen";
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";
import ForMe from "../screens/ForMe";
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
        // Update the route to include dynamic `adId` in the path
        path: RoutePath.forMeRoute,
        element: <ForMe />, // ForMe component will receive `adId` as a URL param
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
