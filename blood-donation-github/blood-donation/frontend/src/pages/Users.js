import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import "./Users.css";

const initialUsers = [
  { id: 1, name: "Admin User", email: "admin@lifecare.lk", role: "Super Admin", last: "2 hrs ago", status: "Active" },
  { id: 2, name: "Priya Fernando", email: "priya@lifecare.lk", role: "Staff", last: "1 day ago", status: "Active" },
  { id: 3, name: "Kasun Perera", email: "kasun@lifecare.lk", role: "Staff", last: "3 days ago", status: "Active" },
  { id: 4, name: "Nadia Silva", email: "nadia@lifecare.lk", role: "Viewer", last: "2 weeks ago", status: "Inactive" },
];

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("");
}

export default function Users() {
  const [users] = useState(initialUsers);

  const activeCount = users.filter((u) => u.status === "Active").length;
  const inactiveCount = users.filter((u) => u.status === "Inactive").length;
  const superAdminCount = users.filter((u) => u.role === "Super Admin").length;

  return (
    <AdminLayout active="Users">
      <div className="topline">
        <div>
          <div className="eyebrow">Access control</div>
          <h1>Users</h1>
          <p className="sub-text">Manage staff accounts and admin permissions.</p>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
          </div>
          <div><div className="kpi-val">{users.length}</div><div className="kpi-lbl">Staff accounts</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <div><div className="kpi-val">{activeCount}</div><div className="kpi-lbl">Active</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon crimson">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
          </div>
          <div><div className="kpi-val">{inactiveCount}</div><div className="kpi-lbl">Inactive</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82" /></svg>
          </div>
          <div><div className="kpi-val">{superAdminCount}</div><div className="kpi-lbl">Super admins</div></div>
        </div>
      </div>

      <div className="card table-card">
        <div className="card-head">
          <h3>Staff &amp; admin accounts</h3>
          <button className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            Invite user
          </button>
        </div>
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Last login</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td><div className="donor-cell"><div className="mini-avatar">{initials(u.name)}</div>{u.name}</div></td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.last}</td>
                <td><span className={`status-pill ${u.status.toLowerCase()}`}><span className="dot"></span>{u.status}</span></td>
                <td>
                  <div className="action-icons">
                    <button className="icon-btn" title="Edit">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                    </button>
                    <button className="icon-btn danger" title="Remove">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" /></svg>
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