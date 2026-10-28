import React from "react";
import { useNavigate } from "react-router-dom";
// Note: AdminLayout no longer imports its own CSS.
// Each page (Donors.jsx, BloodInventory.jsx, etc.) imports its own
// stylesheet, which includes all the shared sidebar/card/table styles.

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/admin-dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Donors",
    path: "/donors",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    ),
  },
  {
    label: "Blood Inventory",
    path: "/blood-inventory",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z" />
      </svg>
    ),
  },
  {
    label: "Appointments",
    path: "/appointments-admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </svg>
    ),
  },
  {
    label: "Blood Requests",
    path: "/blood-requests",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    ),
  },
  {
    label: "Reports",
    path: "/reports",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 17V9m4 8V5m4 12v-6M5 21h14" />
      </svg>
    ),
  },
  {
    label: "Users",
    path: "/users",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Settings",
    path: "/settings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

/**
 * Shared admin sidebar + page shell.
 * Usage: <AdminLayout active="Donors">...page content...</AdminLayout>
 */
export default function AdminLayout({ active, children }) {
  const navigate = useNavigate();

  return (
    <div className="admin-layout-page">
      <div className="app">
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
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href="#"
                className={active === item.label ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
              >
                {item.icon}
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
              <div className="user-avatar">AD</div>
              <div className="user-meta">
                <div className="u-name">Admin</div>
                <div className="u-type">LifeCare Staff</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="main">{children}</main>
      </div>
    </div>
  );
}