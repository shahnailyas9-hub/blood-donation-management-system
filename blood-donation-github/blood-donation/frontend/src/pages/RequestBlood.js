import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RequestBlood.css";

const initialState = {
  requesterName: "",
  phone: "",
  relation: "Self",
  bloodGroup: "",
  units: "",
  location: "",
  urgency: "Urgent",
  notes: "",
};

const URGENCY_OPTIONS = [
  { value: "Critical", label: "Critical", desc: "Needed within the hour", className: "critical" },
  { value: "Urgent", label: "Urgent", desc: "Needed within 24 hours", className: "urgent" },
  { value: "Routine", label: "Routine", desc: "Needed within a few days", className: "routine" },
];

function generateRequestId() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `BR-${num}`;
}

export default function RequestBlood() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const selectUrgency = (value) => {
    setForm((prev) => ({ ...prev, urgency: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.requesterName || !form.phone) {
      setError("Please enter your name and phone number.");
      return;
    }
    if (!form.bloodGroup || !form.units) {
      setError("Please select a blood group and number of units needed.");
      return;
    }
    if (!form.location) {
      setError("Please enter the hospital or location.");
      return;
    }

    // TODO: replace with your real API call.
    // Example:
    // const res = await fetch("/api/blood-requests", { method: "POST", body: JSON.stringify(form) });
    console.log("Submitting blood request:", form);

    const newRequestId = generateRequestId();

    // Navigate to the standalone confirmation page, passing the details
    // along via route state so it survives as its own URL.
    navigate("/request-blood-confirm", {
      state: {
        requestId: newRequestId,
        bloodGroup: form.bloodGroup,
        units: form.units,
        urgency: form.urgency,
        location: form.location,
      },
    });
  };

  return (
    <div className="request-blood-page">
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
        <div className="page-head">
          <div className="eyebrow">Emergency &amp; routine requests</div>
          <h1>Request blood</h1>
          <p>Tell us what's needed and we'll notify matching donors nearby right away.</p>
        </div>

        <form className="request-card" onSubmit={handleSubmit} noValidate>
          {error && <div className="form-error">{error}</div>}

          <div className="section">
            <div className="section-title">
              <div className="section-icon crimson">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </div>
              <h3>Your information</h3>
            </div>
            <div className="row2">
              <div className="field">
                <label htmlFor="requesterName">Full name</label>
                <input id="requesterName" name="requesterName" className="input" placeholder="Enter your full name" value={form.requesterName} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" name="phone" className="input" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} />
              </div>
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="relation">Relation to patient</label>
                <select id="relation" name="relation" className="input" value={form.relation} onChange={handleChange}>
                  <option>Self</option>
                  <option>Family member</option>
                  <option>Hospital staff</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="divider-line" />

          <div className="section">
            <div className="section-title">
              <div className="section-icon teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z" />
                </svg>
              </div>
              <h3>Request details</h3>
            </div>
            <div className="row2">
              <div className="field">
                <label htmlFor="bloodGroup">Blood group needed</label>
                <select id="bloodGroup" name="bloodGroup" className="input" value={form.bloodGroup} onChange={handleChange}>
                  <option value="">Select blood group</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="units">Units needed</label>
                <input id="units" name="units" type="number" min="1" className="input" placeholder="e.g. 2" value={form.units} onChange={handleChange} />
              </div>
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="location">Hospital / location</label>
                <input id="location" name="location" className="input" placeholder="e.g. Colombo General Hospital" value={form.location} onChange={handleChange} />
              </div>
            </div>

            <div className="field">
              <label>Urgency level</label>
              <div className="urgency-row">
                {URGENCY_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`urgency-card ${opt.className} ${form.urgency === opt.value ? "selected" : ""}`}
                    onClick={() => selectUrgency(opt.value)}
                  >
                    <span className="dot"></span>
                    <span className="u-label">{opt.label}</span>
                    <span className="u-desc">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="notes">Additional notes (optional)</label>
              <textarea id="notes" name="notes" placeholder="Patient condition, doctor's name, or anything else that helps" value={form.notes} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit request</button>

          <div className="hotline-note">
            Can't wait? Call our emergency hotline now: <a href="tel:+94771234567">+94 77 123 4567</a>
          </div>
        </form>
      </div>
    </div>
  );
}