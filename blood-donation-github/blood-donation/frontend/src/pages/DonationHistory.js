import React from "react";
import "./DonationHistory.css";

const donations = [
  { date: "10 Feb 2024", type: "Whole Blood", bloodGroup: "O+", amount: "450 ml", location: "LifeCare Hospital", status: "Completed" },
  { date: "15 Oct 2023", type: "Whole Blood", bloodGroup: "O+", amount: "450 ml", location: "LifeCare Hospital", status: "Completed" },
  { date: "20 Jun 2023", type: "Platelets", bloodGroup: "O+", amount: "1 unit", location: "LifeCare Hospital", status: "Completed" },
  { date: "05 Mar 2023", type: "Whole Blood", bloodGroup: "O+", amount: "450 ml", location: "LifeCare Hospital", status: "Completed" },
];

const summary = {
  totalDonations: 4,
  totalVolume: "1,800 ml",
  bloodGroup: "O+",
  livesHelped: 12,
};

export default function DonationHistory() {
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
          <a href="#">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M8 3v4M16 3v4M3 10h18" />
            </svg>
            Appointments
          </a>
          <a href="#" className="active">
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
        <div className="topline">
          <div>
            <div className="eyebrow">Your record</div>
            <h1>Donation history</h1>
            <p className="sub-text">
              Every donation you've made at LifeCare, all in one place.
            </p>
          </div>
        </div>

        <div className="summary-row">
          <div className="stat-card">
            <div className="s-val">{summary.totalDonations}</div>
            <div className="s-lbl">Total donations</div>
          </div>
          <div className="stat-card">
            <div className="s-val">{summary.totalVolume}</div>
            <div className="s-lbl">Total volume given</div>
          </div>
          <div className="stat-card">
            <div className="s-val">{summary.bloodGroup}</div>
            <div className="s-lbl">Blood group</div>
          </div>
          <div className="stat-card">
            <div className="s-val">{summary.livesHelped}</div>
            <div className="s-lbl">Lives estimated helped</div>
          </div>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Blood group</th>
                <th>Amount</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d, i) => (
                <tr key={i}>
                  <td>{d.date}</td>
                  <td>
                    <span className="type-pill">
                      <span className="type-dot"></span>
                      {d.type}
                    </span>
                  </td>
                  <td>
                    <span className="bg-badge">{d.bloodGroup}</span>
                  </td>
                  <td className="amt">{d.amount}</td>
                  <td>{d.location}</td>
                  <td>
                    <span className="status-pill">
                      <span className="dot"></span>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}