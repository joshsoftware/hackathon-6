import { useNavigate } from "react-router-dom";
import logo from "../../assets/adlytics-neon-logo.jpg";
import { RoutePath } from "../../lib/route";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white px-8 shadow-lg h-20 border-b-4 border-teal-500 drop-shadow-2xl z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto h-full">
        <div
          onClick={() => handleNavigation(RoutePath.indexRoute)}
          className="text-2xl font-bold text-teal-500 hover:text-teal-600 transition duration-300 cursor-pointer"
        >
          <img src={logo} alt="Adlytics Logo" className="h-20 w-25" />
        </div>

        <div className="flex space-x-12">
          <div
            onClick={() => handleNavigation(RoutePath.indexRoute)}
            className="text-xl font-medium text-gray-300 hover:text-teal-500 hover:scale-105 transition duration-300 cursor-pointer"
          >
            Home
          </div>
          <div
            onClick={() => handleNavigation(RoutePath.dashboardRoute)}
            className="text-xl font-medium text-gray-300 hover:text-teal-500 hover:scale-105 transition duration-300 cursor-pointer"
          >
            Dashboard
          </div>
          <div
            onClick={() => handleNavigation(RoutePath.forMeRoute)}
            className="text-xl font-medium text-gray-300 hover:text-teal-500 hover:scale-105 transition duration-300 cursor-pointer"
          >
            For Me
          </div>
          <div
            onClick={() => handleNavigation(RoutePath.profileRoute)}
            className="text-xl font-medium text-gray-300 hover:text-teal-500 hover:scale-105 transition duration-300 cursor-pointer"
          >
            My Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
