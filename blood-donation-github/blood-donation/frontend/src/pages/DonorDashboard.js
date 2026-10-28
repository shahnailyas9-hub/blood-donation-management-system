import React from "react";
import { useNavigate } from "react-router-dom";
import "./DonorDashboard.css";

export default function DonorDashboard() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/donor-dashboard" },
    { label: "Appointments", path: "/appointments" },
    { label: "Donation History", path: "/donation-history" },
    { label: "Notifications", path: "/notifications" },
  ];

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
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
            <div className="name">LifeCare</div>
            <div className="sub">Blood Donation Center</div>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={item.label === "Dashboard" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
            >
              {item.label === "Dashboard" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="9" rx="1.5" />
                  <rect x="14" y="3" width="7" height="5" rx="1.5" />
                  <rect x="14" y="12" width="7" height="9" rx="1.5" />
                  <rect x="3" y="16" width="7" height="5" rx="1.5" />
                </svg>
              )}
              {item.label === "Appointments" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M8 3v4M16 3v4M3 10h18" />
                </svg>
              )}
              {item.label === "Donation History" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z" />
                </svg>
              )}
              {item.label === "Notifications" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
              )}
              {item.label}
            </a>
          ))}

          <div className="nav-group-label">Account</div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21V9m6 12V3M3 21h18" />
            </svg>
            Log out
          </a>
        </nav>

        <div className="sidebar-foot">
          <div className="user-chip">
            <div className="user-avatar">JD</div>
            <div className="user-meta">
              <div className="u-name">John Doe</div>
              <div className="u-type">Verified Donor</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        <div className="topline">
          <div className="greeting">
            <div className="eyebrow">Donor overview</div>
            <h1>Welcome back, John </h1>
            <p>
              You're eligible to donate again in 41 days. Every unit you give
              helps up to 3 patients.
            </p>
          </div>
          <button className="book-btn" onClick={() => navigate("/appointments")}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Book an appointment
          </button>
        </div>

        <div className="grid-top">
          {/* Impact ring */}
          <div className="impact-card">
            <div className="ring-wrap">
              <svg width="150" height="150" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r="64" fill="none" stroke="#EDF1F4" strokeWidth="14" />
                <circle
                  cx="75"
                  cy="75"
                  r="64"
                  fill="none"
                  stroke="#C0223A"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="402.1"
                  strokeDashoffset="115"
                  transform="rotate(-90 75 75)"
                />
              </svg>
              <div className="ring-center">
                <div className="val">1,200</div>
                <div className="lbl">ml donated</div>
              </div>
            </div>
            <div className="impact-copy">
              <div className="h">Your lifetime impact</div>
              <p>
                You've given 3 donations toward LifeCare's 2,000ml annual
                milestone. 800ml to go.
              </p>
              <div className="impact-stats">
                <div>
                  <div className="n">3</div>
                  <div className="l">Donations</div>
                </div>
                <div>
                  <div className="n">9</div>
                  <div className="l">Lives touched</div>
                </div>
                <div>
                  <div className="n">2</div>
                  <div className="l">Upcoming</div>
                </div>
              </div>
            </div>
          </div>

          {/* Blood type card */}
          <div className="bt-card">
            <div>
              <div className="bt-eyebrow">Your blood group</div>
              <div className="bt-value">O+</div>
              <div className="bt-note">
                The most requested type at LifeCare — your donations are
                always in demand.
              </div>
            </div>
            <div className="bt-pill">
              <span className="dot"></span> Eligible from Aug 11, 2026
            </div>
          </div>
        </div>

        <div className="grid-bottom">
          {/* Upcoming appointment */}
          <div className="card">
            <div className="card-head">
              <h3>Upcoming appointment</h3>
              <span className="tag confirmed">Confirmed</span>
            </div>
            <div className="appt-row">
              <div className="appt-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M8 3v4M16 3v4M3 10h18" />
                </svg>
              </div>
              <div className="appt-detail">
                <div className="d-date">Saturday, May 25 · 10:00 AM</div>
                <div className="d-meta">
                  Whole Blood donation · LifeCare Hospital, Colombo
                </div>
              </div>
            </div>
            <button className="ghost-btn" onClick={() => navigate("/appointments")}>
              View appointment details
            </button>
          </div>

          {/* Recent donation */}
          <div className="card">
            <div className="card-head">
              <h3>Recent donation</h3>
              <span className="tag complete">Completed</span>
            </div>
            <div className="recent-row">
              <div className="r-date">10 Feb 2024</div>
              <div className="r-type">Whole Blood</div>
              <div className="r-amt">450 ml</div>
            </div>
            <div className="recent-row">
              <div className="r-date">15 Oct 2023</div>
              <div className="r-type">Whole Blood</div>
              <div className="r-amt">450 ml</div>
            </div>
            <div className="recent-row">
              <div className="r-date">20 Jun 2023</div>
              <div className="r-type">Platelets</div>
              <div className="r-amt">1 unit</div>
            </div>
            <button className="ghost-btn" onClick={() => navigate("/donation-history")}>
              View full history
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="card notif-card">
          <div className="card-head">
            <h3>Notifications</h3>
          </div>

          <div className="notif">
            <div className="notif-dot urgent"></div>
            <div className="notif-body">
              <div className="n-title">Urgent: A+ blood needed</div>
              <div className="n-sub">
                Colombo General Hospital has an emergency request nearby.
              </div>
            </div>
            <div className="notif-time">2 min ago</div>
          </div>

          <div className="notif">
            <div className="notif-dot info"></div>
            <div className="notif-body">
              <div className="n-title">Appointment confirmed</div>
              <div className="n-sub">
                Your donation slot for tomorrow 10:00 AM is set.
              </div>
            </div>
            <div className="notif-time">1 hour ago</div>
          </div>

          <div className="notif">
            <div className="notif-dot done"></div>
            <div className="notif-body">
              <div className="n-title">Thank you for donating</div>
              <div className="n-sub">
                Your contribution last week is already helping patients.
              </div>
            </div>
            <div className="notif-time">2 days ago</div>
          </div>
        </div>
      </main>
    </div>
  );
}