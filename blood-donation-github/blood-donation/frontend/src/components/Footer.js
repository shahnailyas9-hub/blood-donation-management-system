import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-col">
          <h2>🩸 LifeCare Hospital</h2>
          <h3>Blood Donation Center</h3>

          <p className="tagline">
            Saving Lives Through Blood Donation
          </p>

          <p>📍 123 Hospital Road, Colombo, Sri Lanka</p>
          <p>📞 +94 11 234 5678</p>
          <p>✉️ bloodbank@lifecarehospital.lk</p>
        </div>

        <div className="footer-col">
          <h3>QUICK LINKS</h3>

          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Blood Availability</li>
            <li>Become a Donor</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>DONOR INFORMATION</h3>

          <ul>
            <li>Eligibility Criteria</li>
            <li>Donation Process</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>EMERGENCY BLOOD REQUESTS</h3>

          <div className="emergency">
            <p>🚑 Available 24/7</p>

            <p className="hotline">
              Emergency Hotline:
              <br />
              +94 77 123 4567
            </p>
          </div>

          <h3>FOLLOW US</h3>

          <div className="social">
            <span>📘</span>
            <span>📷</span>
            <span>✖️</span>
            <span>💼</span>
          </div>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>
          © 2026 LifeCare Hospital Blood Donation Center.
          All Rights Reserved.
        </p>

        <p className="quote">
          ❤️ Every drop counts. Every donor matters.
        </p>
      </div>
    </footer>
  );
}

export default Footer;