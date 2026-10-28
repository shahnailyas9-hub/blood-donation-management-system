import React from "react";
import AdminLayout from "./AdminLayout";
import "./BloodInventory.css";

const MAX_UNITS = 15;

const inventory = [
  { type: "A+", units: 12, level: "Healthy", updated: "20 Jun 2026" },
  { type: "A-", units: 4, level: "Low stock", updated: "19 Jun 2026" },
  { type: "B+", units: 8, level: "Moderate", updated: "18 Jun 2026" },
  { type: "B-", units: 2, level: "Critical", updated: "17 Jun 2026" },
  { type: "O+", units: 15, level: "Healthy", updated: "20 Jun 2026" },
  { type: "O-", units: 3, level: "Critical", updated: "19 Jun 2026" },
  { type: "AB+", units: 6, level: "Moderate", updated: "16 Jun 2026" },
  { type: "AB-", units: 1, level: "Critical", updated: "15 Jun 2026" },
];

function levelPillClass(level) {
  if (level === "Critical") return "rejected";
  if (level === "Healthy") return "confirmed";
  return "pending";
}

export default function BloodInventory() {
  const totalUnits = inventory.reduce((sum, i) => sum + i.units, 0);
  const lowCount = inventory.filter((i) => i.level === "Low stock" || i.level === "Critical").length;
  const healthyCount = inventory.filter((i) => i.level === "Healthy").length;

  return (
    <AdminLayout active="Blood Inventory">
      <div className="topline">
        <div>
          <div className="eyebrow">Stock management</div>
          <h1>Blood inventory</h1>
          <p className="sub-text">Track units, monitor shortages, and update stock levels.</p>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon crimson">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z" /></svg>
          </div>
          <div><div className="kpi-val">{totalUnits} units</div><div className="kpi-lbl">Total in stock</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.86l-8.14 14.1A1.5 1.5 0 0 0 3.5 20h17a1.5 1.5 0 0 0 1.34-2.04l-8.14-14.1a1.5 1.5 0 0 0-2.6 0z" /></svg>
          </div>
          <div><div className="kpi-val">{lowCount}</div><div className="kpi-lbl">Low stock types</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <div><div className="kpi-val">{healthyCount}</div><div className="kpi-lbl">Healthy types</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
          </div>
          <div><div className="kpi-val">Today</div><div className="kpi-lbl">Last inventory sync</div></div>
        </div>
      </div>

      <div className="card table-card">
        <div className="card-head">
          <h3>Stock by blood type</h3>
          <button className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            Add stock
          </button>
        </div>
        <table>
          <thead>
            <tr><th>Type</th><th>Units available</th><th>Level</th><th>Last updated</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const low = item.level !== "Healthy" && item.units <= 5;
              const pct = Math.min((item.units / MAX_UNITS) * 100, 100);
              return (
                <tr key={item.type}>
                  <td><span className={`bg-badge ${low ? "low" : ""}`}>{item.type}</span></td>
                  <td style={{ minWidth: 220 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {String(item.units).padStart(2, "0")} units
                      </span>
                    </div>
                    <div style={{ height: 6, background: "#EEF2F5", borderRadius: 100, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 100,
                          width: `${pct}%`,
                          background: low ? "var(--crimson)" : "var(--teal)",
                        }}
                      ></div>
                    </div>
                  </td>
                  <td><span className={`status-pill ${levelPillClass(item.level)}`}><span className="dot"></span>{item.level}</span></td>
                  <td>{item.updated}</td>
                  <td>
                    <div className="action-icons">
                      <button className="icon-btn primary" title="Add units">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                      </button>
                      <button className="icon-btn" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}