import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-4">
          {/* Logo Image */}
          <img
            src="/assets/logo.jpg" // Reference the logo directly from public/assets
            alt="Virtual Police Station"
            className="w-12 h-12 rounded-full object-cover"
          />
          {/* Website Name */}
          <div className="text-2xl font-semibold text-emerald-400">
            Virtual Police Station
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-emerald-400 transition-all">
            Home
          </Link>
          <Link to="/about" className="hover:text-emerald-400 transition-all">
            About
          </Link>
          <Link to="/contact" className="hover:text-emerald-400 transition-all">
            Contact Us
          </Link>

          {!user ? (
            <Link
              to="/signup"
              className="hover:text-emerald-400 transition-all"
            >
              Login / Signup
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white focus:outline-none"
              >
                <FaUser className="text-2xl text-emerald-400" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none text-white"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-gray-800 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-gray-800 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-gray-800 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-gray-800 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 hover:bg-gray-800 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
