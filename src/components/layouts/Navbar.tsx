// src/components/layouts/Navbar.tsx
import { Link } from "react-router-dom";
import { FiPieChart, FiUser, FiArrowRight } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-icon">💰</span>
          <span className="logo-text">StashU</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link active">
            <FiPieChart className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="#features" className="nav-link">
            <FiUser className="nav-icon" />
            <span>Features</span>
          </Link>
          <Link to="/about" className="nav-link">
            <FiArrowRight className="nav-icon" />
            <span>About</span>
          </Link>
          <Link to="/auth" className="nav-cta">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}