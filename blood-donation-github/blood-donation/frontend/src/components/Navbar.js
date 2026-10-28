import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <div>
          <h2>🩸 LifeCare Hospital</h2>
          <p>Blood Donation Center</p>
        </div>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
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