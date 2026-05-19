// src/components/Navbar.jsx
// Top navigation bar with auth controls

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-blue-400 ${
        location.pathname === to ? "text-blue-400" : "text-slate-400"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="font-display font-bold text-white text-lg hidden sm:block">
              SmartComplaint
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                {navLink("/dashboard", "Dashboard")}
                {navLink("/complaints", "Complaints")}
                {navLink("/submit", "Submit")}
                <span className="text-slate-600">|</span>
                <span className="text-sm text-slate-400 hidden sm:block">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {navLink("/login", "Login")}
                <Link
                  to="/signup"
                  className="btn-primary text-sm py-2 px-4"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
