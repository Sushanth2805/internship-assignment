import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  FiSun,
  FiMoon,
  FiLogOut,
  FiUser,
  FiBook,
  FiPlus,
} from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-100 dark:border-gray-700 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group flex-shrink-0"
          >
            <div className="p-1.5 sm:p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <FiBook className="text-primary-600 dark:text-primary-400 text-xl sm:text-2xl" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
              BookReview
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
              hover:scale-110 active:scale-95
              transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FiSun className="text-xl text-amber-500" />
              ) : (
                <FiMoon className="text-xl text-indigo-600" />
              )}
            </button>

            {user ? (
              <>
                {/* Add Book Button */}
                <Link
                  to="/books/add"
                  className="hidden sm:flex items-center space-x-2 btn-primary"
                >
                  <FiPlus />
                  <span>Add Book</span>
                </Link>

                {/* Profile and Logout Buttons */}
                <div className="flex items-center space-x-2">
                  {/* Profile Button */}
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                    hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 
                    rounded-lg transition-colors duration-200"
                  >
                    <FiUser className="text-base" />
                    <span>Profile</span>
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 
                    hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 
                    rounded-lg transition-colors duration-200"
                  >
                    <FiLogOut className="text-base" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link
                  to="/login"
                  className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-2 sm:px-0"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm sm:text-base px-3 sm:px-5"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
