import React from "react";
import AdminLayout from "./AdminLayout";
import "./AdminDashboard.css";

const recentAppointments = [
  { name: "John Doe", date: "25 May 2024", time: "10:00 AM", status: "Pending" },
  { name: "Jane Smith", date: "25 May 2024", time: "11:00 AM", status: "Pending" },
  { name: "Michael Lee", date: "25 May 2024", time: "12:00 PM", status: "Confirmed" },
  { name: "Sarah Wilson", date: "25 May 2024", time: "01:00 PM", status: "Pending" },
];

const bloodInventory = [
  { type: "A+", units: 12 },
  { type: "A-", units: 4 },
  { type: "B+", units: 8 },
  { type: "B-", units: 2 },
  { type: "O+", units: 15 },
  { type: "O-", units: 3 },
  { type: "AB+", units: 6 },
  { type: "AB-", units: 1 },
];

const MAX_UNITS = 15;
const LOW_THRESHOLD = 5;

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("");
}

export default function AdminDashboard() {
  return (
    <AdminLayout active="Dashboard">
      <div className="topline">
        <div>
          <div className="eyebrow">Overview</div>
          <h1>Admin dashboard</h1>
          <p className="sub-text">Live snapshot of donors, appointments, and blood stock.</p>
        </div>
        <button className="btn-dark">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export report
        </button>
      </div>

      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
          </div>
          <div><div className="kpi-val">150</div><div className="kpi-lbl">Total donors</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
          </div>
          <div><div className="kpi-val">25</div><div className="kpi-lbl">Today's appointments</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon crimson">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z" /></svg>
          </div>
          <div><div className="kpi-val">80 units</div><div className="kpi-lbl">Blood in stock</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" /></svg>
          </div>
          <div><div className="kpi-val">10</div><div className="kpi-lbl">Blood requests</div></div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22, alignItems: "start" }}>
        {/* Recent appointments */}
        <div className="card">
          <div className="card-head">
            <h3>Recent appointments</h3>
            <span className="view-all">View all →</span>
          </div>
          <table>
            <thead>
              <tr><th>Donor</th><th>Date</th><th>Time</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recentAppointments.map((appt, i) => (
                <tr key={i}>
                  <td><div className="donor-cell"><div className="mini-avatar">{initials(appt.name)}</div>{appt.name}</div></td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td><span className={`status-pill ${appt.status.toLowerCase()}`}><span className="dot"></span>{appt.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Blood inventory */}
        <div className="card">
          <div className="card-head">
            <h3>Blood inventory</h3>
            <span className="view-all">View all →</span>
          </div>
          <div style={{ padding: "14px 24px 22px" }}>
            {bloodInventory.map((item) => {
              const isLow = item.units <= LOW_THRESHOLD;
              const pct = Math.min((item.units / MAX_UNITS) * 100, 100);
              return (
                <div key={item.type} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
                  <span className={`bg-badge ${isLow ? "low" : ""}`}>{item.type}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                      <span>{item.type}</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--ink-soft)" }}>
                        {String(item.units).padStart(2, "0")} unit{item.units === 1 ? "" : "s"}
                      </span>
                    </div>
                    <div style={{ height: 6, background: "#EEF2F5", borderRadius: 100, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 100,
                          width: `${pct}%`,
                          background: isLow ? "var(--crimson)" : "var(--teal)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}