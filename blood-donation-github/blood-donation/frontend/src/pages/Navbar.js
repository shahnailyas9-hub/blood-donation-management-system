import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutClick = () => {
    // If already on home page → just scroll
    if (location.pathname === "/") {
      const section = document.getElementById("about");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } 
    // If on another page → go home first, then scroll using hash
    else {
      navigate("/#about");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>🩸 LifeCare Hospital</h2>
        <p>Blood Donation Center</p>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {/* FIXED ABOUT US */}
        <li>
          <button className="nav-link-btn" onClick={handleAboutClick}>
            About Us
          </button>
        </li>

        <li><Link to="/blood">Blood Availability</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      <div className="nav-buttons">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

        <Link to="/register">
          <button className="register-btn">Register</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;