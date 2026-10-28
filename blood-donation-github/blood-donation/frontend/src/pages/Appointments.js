import React, { useState } from "react";
import "./Appointments.css";

export default function Appointments() {
  const [date, setDate] = useState("2026-06-10");
  const [time, setTime] = useState("11:00 AM");
  const [donationType, setDonationType] = useState("Plasma");
  const [location, setLocation] = useState("Kandy Branch");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your booking API / state logic
    console.log({ date, time, donationType, location, notes });
  };

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
          <a href="#">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="9" rx="1.5" />
              <rect x="14" y="3" width="7" height="5" rx="1.5" />
              <rect x="14" y="12" width="7" height="9" rx="1.5" />
              <rect x="3" y="16" width="7" height="5" rx="1.5" />
            </svg>
            Dashboard
          </a>
          <a href="#" className="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M8 3v4M16 3v4M3 10h18" />
            </svg>
            Appointments
          </a>
          <a href="#">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z" />
            </svg>
            Donation History
          </a>
          <a href="#">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
            Notifications
          </a>

          <div className="nav-group-label">Account</div>
          <a href="#">
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
        <div className="eyebrow">Schedule a visit</div>
        <h1>Book an appointment</h1>
        <p className="sub-text">
          Pick a date, time, and donation type — we'll confirm it right away.
        </p>

        <div className="layout">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="row2">
              <div className="field">
                <label htmlFor="date">Select date</label>
                <input
                  id="date"
                  className="input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="time">Select time</label>
                <select
                  id="time"
                  className="input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>1:00 PM</option>
                  <option>3:00 PM</option>
                </select>
              </div>
            </div>

            <div className="row2">
              <div className="field">
                <label htmlFor="donationType">Donation type</label>
                <select
                  id="donationType"
                  className="input"
                  value={donationType}
                  onChange={(e) => setDonationType(e.target.value)}
                >
                  <option>Whole Blood</option>
                  <option>Plasma</option>
                  <option>Platelets</option>
                  <option>Power Red</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  className="input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>LifeCare Hospital</option>
                  <option>Kandy Branch</option>
                  <option>Galle Branch</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="notes">
                Notes <span className="hint">(optional)</span>
              </label>
              <textarea
                id="notes"
                className="input"
                placeholder="Any additional information..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">
              Confirm appointment
            </button>
          </form>

          <div className="side-col">
            <div className="info-card">
              <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0223A" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                Appointment guidelines
              </h3>
              {[
                "Eat a healthy meal before donating",
                "Drink plenty of water",
                "Bring a valid ID",
                "Get enough sleep before donating",
              ].map((tip) => (
                <div className="check-item" key={tip}>
                  <div className="check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  {tip}
                </div>
              ))}
            </div>

            <div className="info-card help-card">
              <h3>Need help?</h3>
              <p>
                Our support team is available if you have questions before
                your visit.
              </p>
              <div className="call-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +94 11 234 5678
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}