import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setIsMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on route change
  useEffect(() => closeMenu(), [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all ${isScrolled ? "bg-white/90 shadow-md py-2" : "bg-white/60 py-4"} backdrop-blur-md`}>
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-extrabold text-blue-700 hover:text-purple-600 transition">
          StashU
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className={`hover:text-purple-600 transition ${location.pathname === "/" ? "font-bold" : ""}`}>Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="hover:text-purple-600 transition">Dashboard</Link>
              <Link to="/profile" className="hover:text-purple-600 transition">Profile</Link>
            </>
          )}
          {!isAuthenticated ? (
            <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-600 transition">Get Started</Link>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-blue-600">Hi, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-blue-200 shadow-lg">
          <Link to="/" onClick={closeMenu} className="block px-4 py-3 hover:bg-blue-50 transition">Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="block px-4 py-3 hover:bg-blue-50 transition">Dashboard</Link>
              <Link to="/profile" onClick={closeMenu} className="block px-4 py-3 hover:bg-blue-50 transition">Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-3 hover:bg-blue-50 transition">Logout</button>
            </>
          )}
          {!isAuthenticated && <Link to="/auth" onClick={closeMenu} className="block px-4 py-3 bg-blue-600 text-white rounded-lg mx-4 my-2 text-center hover:bg-blue-700 transition">Get Started</Link>}
        </div>
      )}
    </nav>
  );
}