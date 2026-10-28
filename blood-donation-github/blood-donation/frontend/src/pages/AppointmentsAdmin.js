import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import "./AppointmentsAdmin.css";

const initialAppointments = [
  { id: 1, name: "John Doe", date: "25 May 2024", time: "10:00 AM", type: "Whole Blood", location: "LifeCare Hospital", status: "Pending" },
  { id: 2, name: "Jane Smith", date: "25 May 2024", time: "11:00 AM", type: "Plasma", location: "Kandy Branch", status: "Pending" },
  { id: 3, name: "Michael Lee", date: "25 May 2024", time: "12:00 PM", type: "Platelets", location: "LifeCare Hospital", status: "Confirmed" },
  { id: 4, name: "Sarah Wilson", date: "25 May 2024", time: "01:00 PM", type: "Whole Blood", location: "Galle Branch", status: "Confirmed" },
  { id: 5, name: "David Brown", date: "26 May 2024", time: "09:30 AM", type: "Whole Blood", location: "LifeCare Hospital", status: "Pending" },
];

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("");
}

export default function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState(initialAppointments);

  const confirm = (id) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Confirmed" } : a)));
  };
  const cancel = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const pendingCount = appointments.filter((a) => a.status === "Pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "Confirmed").length;

  return (
    <AdminLayout active="Appointments">
      <div className="topline">
        <div>
          <div className="eyebrow">Scheduling</div>
          <h1>Appointments</h1>
          <p className="sub-text">Review, confirm, and manage upcoming donation appointments.</p>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
          </div>
          <div><div className="kpi-val">{appointments.length}</div><div className="kpi-lbl">Today's appointments</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
          </div>
          <div><div className="kpi-val">{pendingCount}</div><div className="kpi-lbl">Pending confirmation</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <div><div className="kpi-val">{confirmedCount}</div><div className="kpi-lbl">Confirmed</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon crimson">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </div>
          <div><div className="kpi-val">2</div><div className="kpi-lbl">Cancelled this week</div></div>
        </div>
      </div>

      <div className="card table-card">
        <div className="card-head"><h3>All appointments</h3></div>
        <div className="search-row">
          <input className="search-input" placeholder="Search by donor name..." />
          <select className="filter-select"><option>All locations</option></select>
          <select className="filter-select"><option>All statuses</option></select>
        </div>
        <table>
          <thead>
            <tr><th>Donor</th><th>Date</th><th>Time</th><th>Type</th><th>Location</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td><div className="donor-cell"><div className="mini-avatar">{initials(a.name)}</div>{a.name}</div></td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.type}</td>
                <td>{a.location}</td>
                <td><span className={`status-pill ${a.status.toLowerCase()}`}><span className="dot"></span>{a.status}</span></td>
                <td>
                  <div className="action-icons">
                    <button className="icon-btn primary" title="Confirm" onClick={() => confirm(a.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                    </button>
                    <button className="icon-btn danger" title="Cancel" onClick={() => cancel(a.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
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