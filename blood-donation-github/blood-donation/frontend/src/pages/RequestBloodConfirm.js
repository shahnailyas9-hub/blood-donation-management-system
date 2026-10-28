import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./RequestBloodConfirm.css";

export default function RequestBloodConfirm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Data passed from RequestBlood.jsx via navigate("/request-blood-confirm", { state: {...} })
  const { requestId, bloodGroup, units, urgency, location: hospitalLocation } =
    location.state || {};

  // If someone lands here directly (no state, e.g. refresh or bookmark),
  // there's no request to confirm — send them back to the form.
  if (!requestId) {
    return (
      <div className="request-blood-confirm-page">
        <nav className="navbar">
          <div className="brand">
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

        <div className="page-wrap">
          <div className="confirm-card">
            <h2>No request found</h2>
            <p>
              It looks like you opened this page directly. Submit a blood
              request first to see a confirmation here.
            </p>
            <div className="confirm-actions">
              <button className="submit-btn" onClick={() => navigate("/request-blood")}>
                Go to request form
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="request-blood-confirm-page">
      <nav className="navbar">
        <div className="brand">
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

      <div className="page-wrap">
        <div className="confirm-card">
          <div className="confirm-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2>Request received</h2>
          <div className="confirm-id">Request #{requestId}</div>
          <p>
            We've notified matching donors near{" "}
            <strong>{hospitalLocation || "your location"}</strong>. You'll get
            an update as soon as a donor is found.
          </p>

          <div className="confirm-summary">
            <div>
              <span>Blood group</span>
              <strong>{bloodGroup || "—"}</strong>
            </div>
            <div>
              <span>Units needed</span>
              <strong>{units || "—"}</strong>
            </div>
            <div>
              <span>Urgency</span>
              <strong>{urgency || "—"}</strong>
            </div>
          </div>

          <div className="hotline-note">
            Need help right now? Call our emergency hotline:{" "}
            <a href="tel:+94771234567">+94 77 123 4567</a>
          </div>

          <div className="confirm-actions">
            <button className="btn-outline" onClick={() => navigate("/request-blood")}>
              Submit another request
            </button>
            <button className="submit-btn" onClick={() => navigate("/")}>
              Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}