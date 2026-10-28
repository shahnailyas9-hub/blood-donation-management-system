import React from "react";
import { useNavigate } from "react-router-dom";
import "./InfoPageLayout.css";

export default function InfoPageLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="info-page-layout">
      <nav className="navbar">
        <div className="brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <div className="brand-mark">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 2 5 11 5 15.5C5 19.09 8.13 22 12 22C15.87 22 19 19.09 19 15.5C19 11 12 2 12 2Z"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="brand-text">
            <div className="name">LifeCare Hospital</div>
            <div className="sub">Blood Donation Center</div>
          </div>
        </div>
        <button className="btn-outline" onClick={() => navigate("/")}>
          ← Back to home
        </button>
      </nav>

      <main className="info-main">{children}</main>

      <footer className="info-footer">
        <div>© 2026 LifeCare Hospital Blood Donation Center. All Rights Reserved.</div>
        <div>
          <span className="heart">♥</span> Every drop counts. Every donor matters.
        </div>
      </footer>
    </div>
  );
}