import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import "./BloodRequests.css";

const initialRequests = [
  { id: 1, org: "Colombo General Hospital", bg: "A+", units: "4 units", urgency: "Urgent", when: "2 hrs ago", status: "Pending" },
  { id: 2, org: "Kandy District Hospital", bg: "O-", units: "2 units", urgency: "Urgent", when: "5 hrs ago", status: "Pending" },
  { id: 3, org: "National Hospital Sri Lanka", bg: "B+", units: "6 units", urgency: "Routine", when: "1 day ago", status: "Fulfilled" },
  { id: 4, org: "Galle Teaching Hospital", bg: "AB-", units: "1 unit", urgency: "Routine", when: "2 days ago", status: "Fulfilled" },
  { id: 5, org: "Jaffna Hospital", bg: "O+", units: "3 units", urgency: "Urgent", when: "3 days ago", status: "Fulfilled" },
];

export default function BloodRequests() {
  const [requests, setRequests] = useState(initialRequests);

  const fulfill = (id) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Fulfilled" } : r)));
  };

  const totalCount = requests.length;
  const urgentPending = requests.filter((r) => r.urgency === "Urgent" && r.status === "Pending").length;
  const fulfilledCount = requests.filter((r) => r.status === "Fulfilled").length;

  return (
    <AdminLayout active="Blood Requests">
      <div className="topline">
        <div>
          <div className="eyebrow">Emergency &amp; routine</div>
          <h1>Blood requests</h1>
          <p className="sub-text">Incoming requests from partner hospitals across Sri Lanka.</p>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon crimson">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" /></svg>
          </div>
          <div><div className="kpi-val">{totalCount}</div><div className="kpi-lbl">Total requests</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.86l-8.14 14.1A1.5 1.5 0 0 0 3.5 20h17a1.5 1.5 0 0 0 1.34-2.04l-8.14-14.1a1.5 1.5 0 0 0-2.6 0z" /></svg>
          </div>
          <div><div className="kpi-val">{urgentPending}</div><div className="kpi-lbl">Urgent &amp; pending</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <div><div className="kpi-val">{fulfilledCount}</div><div className="kpi-lbl">Fulfilled</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z" /></svg>
          </div>
          <div><div className="kpi-val">16 units</div><div className="kpi-lbl">Total requested</div></div>
        </div>
      </div>

      <div className="card table-card">
        <div className="card-head">
          <h3>Incoming requests</h3>
          <button className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            New request
          </button>
        </div>
        <table>
          <thead>
            <tr><th>Requesting hospital</th><th>Blood group</th><th>Units</th><th>Urgency</th><th>Requested</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.org}</td>
                <td><span className="bg-badge">{r.bg}</span></td>
                <td>{r.units}</td>
                <td><span className={`status-pill ${r.urgency === "Urgent" ? "urgent" : "info"}`}><span className="dot"></span>{r.urgency}</span></td>
                <td>{r.when}</td>
                <td><span className={`status-pill ${r.status.toLowerCase()}`}><span className="dot"></span>{r.status}</span></td>
                <td>
                  <div className="action-icons">
                    <button
                      className="icon-btn primary"
                      title="Mark fulfilled"
                      onClick={() => fulfill(r.id)}
                      disabled={r.status === "Fulfilled"}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                    </button>
                    <button className="icon-btn" title="View details">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}