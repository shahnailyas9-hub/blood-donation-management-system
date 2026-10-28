import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import "./Settings.css";

export default function Settings() {
  const [hospitalName, setHospitalName] = useState("LifeCare Hospital");
  const [contactEmail, setContactEmail] = useState("bloodbank@lifecarehospital.lk");
  const [hotline, setHotline] = useState("+94 77 123 4567");
  const [address, setAddress] = useState("123 Hospital Road, Colombo, Sri Lanka");

  const [notifs, setNotifs] = useState({
    urgentRequests: true,
    newDonors: true,
    appointmentReminders: false,
    weeklyReport: true,
  });

  const toggleNotif = (key) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Wire this up to your settings-save API
    console.log({ hospitalName, contactEmail, hotline, address });
  };

  return (
    <AdminLayout active="Settings">
      <div className="topline">
        <div>
          <div className="eyebrow">Configuration</div>
          <h1>Settings</h1>
          <p className="sub-text">Manage hospital details and notification preferences.</p>
        </div>
      </div>

      <div className="grid-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "start" }}>
        <form className="card" onSubmit={handleSave}>
          <div className="card-head"><h3>Hospital information</h3></div>
          <div style={{ padding: "20px 26px 26px" }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 7 }}>
                Hospital name
              </label>
              <input
                className="search-input"
                style={{ width: "100%" }}
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 7 }}>
                Contact email
              </label>
              <input
                className="search-input"
                style={{ width: "100%" }}
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 7 }}>
                Emergency hotline
              </label>
              <input
                className="search-input"
                style={{ width: "100%" }}
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 7 }}>
                Address
              </label>
              <input
                className="search-input"
                style={{ width: "100%" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Save changes</button>
          </div>
        </form>

        <div className="card">
          <div className="card-head"><h3>Notification preferences</h3></div>
          <div style={{ padding: "8px 26px 26px" }}>
            {[
              { key: "urgentRequests", title: "Urgent blood requests", desc: "Get notified immediately for critical shortages" },
              { key: "newDonors", title: "New donor registrations", desc: "Email when a new donor signs up" },
              { key: "appointmentReminders", title: "Appointment reminders", desc: "Daily digest of upcoming appointments" },
              { key: "weeklyReport", title: "Weekly inventory report", desc: "Summary email every Monday" },
            ].map((item, i, arr) => (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--navy)" }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{item.desc}</div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={notifs[item.key]}
                    onChange={() => toggleNotif(item.key)}
                  />
                  <span className="toggle-track"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}