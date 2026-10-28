import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import "./Donors.css";

const initialDonors = [
  { id: 1, name: "John Doe", email: "john@example.com", bloodGroup: "O+", status: "Approved", joined: "20 May 2024" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", bloodGroup: "A+", status: "Pending", joined: "18 May 2024" },
  { id: 3, name: "Michael Lee", email: "michael@example.com", bloodGroup: "B+", status: "Approved", joined: "15 May 2024" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", bloodGroup: "O-", status: "Approved", joined: "10 May 2024" },
  { id: 5, name: "David Brown", email: "david@example.com", bloodGroup: "AB+", status: "Pending", joined: "08 May 2024" },
  { id: 6, name: "Emily Davis", email: "emily@example.com", bloodGroup: "A-", status: "Approved", joined: "02 May 2024" },
];

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("");
}

export default function Donors() {
  const [donors] = useState(initialDonors);
  const [search, setSearch] = useState("");

  const filtered = donors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase())
  );

  const approvedCount = donors.filter((d) => d.status === "Approved").length;
  const pendingCount = donors.filter((d) => d.status === "Pending").length;

  return (
    <AdminLayout active="Donors">
      <div className="topline">
        <div>
          <div className="eyebrow">Donor management</div>
          <h1>Donors</h1>
          <p className="sub-text">View, approve, and manage all registered donors.</p>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
          </div>
          <div><div className="kpi-val">{donors.length}</div><div className="kpi-lbl">Total donors</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <div><div className="kpi-val">{approvedCount}</div><div className="kpi-lbl">Approved</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
          </div>
          <div><div className="kpi-val">{pendingCount}</div><div className="kpi-lbl">Pending review</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
          </div>
          <div><div className="kpi-val">14</div><div className="kpi-lbl">New this month</div></div>
        </div>
      </div>

      <div className="card table-card">
        <div className="card-head">
          <h3>All donors</h3>
          <button className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            Add donor
          </button>
        </div>
        <div className="search-row">
          <input
            className="search-input"
            placeholder="Search donors by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="filter-select"><option>All blood groups</option></select>
          <select className="filter-select"><option>All statuses</option></select>
        </div>
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Blood group</th><th>Status</th><th>Joined on</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id}>
                <td><div className="donor-cell"><div className="mini-avatar">{initials(d.name)}</div>{d.name}</div></td>
                <td>{d.email}</td>
                <td><span className="bg-badge">{d.bloodGroup}</span></td>
                <td><span className={`status-pill ${d.status.toLowerCase()}`}><span className="dot"></span>{d.status}</span></td>
                <td>{d.joined}</td>
                <td>
                  <div className="action-icons">
                    <button className="icon-btn primary" title="View">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>
                    </button>
                    <button className="icon-btn" title="Edit">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                    </button>
                    <button className="icon-btn danger" title="Delete">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Showing {filtered.length} of {donors.length} donors</span>
          <div className="page-btns">
            <button className="page-btn">←</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">→</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}