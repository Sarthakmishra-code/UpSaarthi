import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/UpSaarthiLogo.jpeg";

export default function Navbar() {
  const { user, logout, isExpert, isAdmin } = useAuth();

  return (
    <nav className="sticky top-0 z-20 bg-white border-b shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo - Larger & Prominent */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="UpSaarthi Logo"
            className="h-16 w-16 object-contain hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link
            to="/feed"
            className="transition-colors hover:text-indigo-600"
          >
            Feed
          </Link>

          <Link
            to="/experts"
            className="transition-colors hover:text-indigo-600"
          >
            Experts
          </Link>

          {user && (
            <Link
              to="/ask"
              className="rounded-full bg-indigo-50 px-4 py-1.5 text-indigo-600 transition hover:bg-indigo-100"
            >
              Ask
            </Link>
          )}

          {isExpert && (
            <Link
              to="/expert/profile"
              className="text-green-600 hover:underline"
            >
              Expert Dashboard
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="text-red-600 hover:underline"
            >
              Admin Panel
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="rounded-full border border-indigo-500 px-4 py-1.5 text-indigo-600 transition hover:bg-indigo-500 hover:text-white"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="rounded-full px-4 py-1.5 text-gray-600 transition hover:bg-red-50 hover:text-red-500"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
