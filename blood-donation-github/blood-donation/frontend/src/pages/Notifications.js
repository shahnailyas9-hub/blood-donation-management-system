import React, { useState } from "react";
import "./Notifications.css";

const initialNotifications = [
  {
    id: 1,
    kind: "urgent",
    title: "New blood request — A+ needed urgently",
    body: "Colombo General Hospital has an emergency request for A+ blood nearby. Your blood type may be able to help.",
    tag: "Urgent",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    kind: "info",
    title: "Appointment confirmed",
    body: "Your donation appointment is confirmed for tomorrow at 10:00 AM at LifeCare Hospital.",
    tag: "Appointment",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    kind: "done",
    title: "Thank you for donating",
    body: "You donated blood successfully last week. Your contribution is already helping patients in need.",
    tag: "Completed",
    time: "2 days ago",
    read: false,
  },
];

const icons = {
  urgent: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.3 3.86l-8.14 14.1A1.5 1.5 0 0 0 3.5 20h17a1.5 1.5 0 0 0 1.34-2.04l-8.14-14.1a1.5 1.5 0 0 0-2.6 0z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  ),
  done: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
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
          <a href="#">
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
          <a href="#" className="active">
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
            <div className="eyebrow">Stay updated</div>
            <h1>Notifications</h1>
            <p className="sub-text">
              Requests, confirmations, and updates from LifeCare.
            </p>
          </div>
          <button className="mark-read" onClick={markAllAsRead}>
            Mark all as read
          </button>
        </div>

        <div className="n-list">
          {notifications.map((n) => (
            <div className={`n-card ${n.kind} ${n.read ? "read" : ""}`} key={n.id}>
              <div className={`n-icon ${n.kind}`}>{icons[n.kind]}</div>
              <div className="n-body">
                <div className="n-top">
                  <div className="n-title">{n.title}</div>
                  <div className="n-time">{n.time}</div>
                </div>
                <div className="n-sub">{n.body}</div>
                <span className={`n-tag ${n.kind}`}>{n.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}