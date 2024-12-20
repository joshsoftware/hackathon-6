import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function LandingScreen() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LandingScreen;
