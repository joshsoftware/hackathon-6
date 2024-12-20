import { Link } from "react-router-dom";
import logo from "../../assets/adlytics-neon-logo.jpg";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white px-8 shadow-lg h-20 border-b-4 border-teal-500 drop-shadow-2xl z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto h-full">
        <div className="text-2xl font-bold text-teal-500 hover:text-teal-600 transition duration-300 cursor-pointer">
          <img src={logo} alt="Adlytics Logo" className="h-20 w-25" />
        </div>

        <div className="flex space-x-12">
          <Link
            to="/home"
            className="text-xl font-medium text-gray-300 hover:text-teal-500 hover:scale-105 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-xl font-medium text-gray-300 hover:text-teal-500 hover:scale-105 transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/forme"
            className="text-xl font-medium text-gray-300 hover:text-teal-500 hover:scale-105 transition duration-300"
          >
            For Me
          </Link>
          <Link
            to="/myprofile"
            className="text-xl font-medium text-gray-300 hover:text-teal-500 hover:scale-105 transition duration-300"
          >
            My Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
