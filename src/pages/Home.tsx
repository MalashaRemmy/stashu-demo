// src/components/layouts/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../lib/hooks/useAuth"; // Assuming you have a modal for authentication

//import { FiPieChart, FiUser, FiArrowRight } from "react-icons/fi";
//import '../styles/pages/HomePage.css'; // Assuming you have a CSS file for styles
// Navbar component with responsive design and scroll effect
// Uses React Router for navigation and state management for mobile menu

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const handleLinkClick = () => {
    if (isMenuOpen) {
      closeMenu();
    }
  };
  // Handle mobile menu toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); // Close menu on desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as HTMLElement).closest(".navbar")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);
  // Close mobile menu on route change
  useEffect(() => {
    if (isMenuOpen) {
      closeMenu();
    }
  }, [location.pathname]);
  // toggle mobile menu on small screens
  const toggleMobileMenu = () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  };
  //handle click on nav links
  const handleNavLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMenuOpen) {
      closeMenu();
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link to="/" className="logo">

          <span className="logo-text">StashU</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link 
            to="#features" 
            className="nav-link"
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
          >
            About
          </Link>
          <Link 
            to="/auth"
            onClick={handleNavLinkClick}
            className="btn btn-primary"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}