import React from "react";
import AdminLayout from "./AdminLayout";
import "./Reports.css";

const monthly = [
  { month: "Jan", value: 60 },
  { month: "Feb", value: 75 },
  { month: "Mar", value: 50 },
  { month: "Apr", value: 90 },
  { month: "May", value: 65 },
  { month: "Jun", value: 100 },
];

const distribution = [
  { name: "O+", pct: 32, color: "#0C7C7C" },
  { name: "A+", pct: 24, color: "#4C9E9E" },
  { name: "B+", pct: 18, color: "#D98E2E" },
  { name: "O-", pct: 10, color: "#C0223A" },
  { name: "AB+", pct: 8, color: "#6753C9" },
  { name: "Other", pct: 8, color: "#94A3AF" },
];

export default function Reports() {
  return (
    <AdminLayout active="Reports">
      <div className="topline">
        <div>
          <div className="eyebrow">Analytics</div>
          <h1>Reports</h1>
          <p className="sub-text">Donation trends and blood group distribution over time.</p>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon crimson">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z" /></svg>
          </div>
          <div><div className="kpi-val">440</div><div className="kpi-lbl">Donations (YTD)</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
          </div>
          <div><div className="kpi-val">150</div><div className="kpi-lbl">Active donors</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" /></svg>
          </div>
          <div><div className="kpi-val">1,320</div><div className="kpi-lbl">Lives estimated helped</div></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 17V9m4 8V5m4 12v-6M5 21h14" /></svg>
          </div>
          <div><div className="kpi-val">+18%</div><div className="kpi-lbl">Growth vs last year</div></div>
        </div>
      </div>

      <div className="grid-main" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22, alignItems: "start" }}>
        <div className="card">
          <div className="card-head">
            <h3>Monthly donations</h3>
            <button className="btn-ghost">Export CSV</button>
          </div>
          <div style={{ display: "flex", gap: 18, padding: "28px 26px 22px", alignItems: "flex-end" }}>
            {monthly.map((m) => (
              <div key={m.month} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
                <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: "var(--ink-soft)" }}>{m.value}</div>
                <div style={{ width: "100%", height: 160, display: "flex", alignItems: "flex-end" }}>
                  <div
                    style={{
                      width: "100%",
                      height: `${m.value}%`,
                      background: "linear-gradient(180deg, var(--crimson), #9A1A2E)",
                      borderRadius: "6px 6px 0 0",
                    }}
                  ></div>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", fontWeight: 600 }}>{m.month}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Blood group distribution</h3></div>
          <div style={{ padding: "22px 26px 26px" }}>
            {distribution.map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }}></div>
                <div style={{ flex: 1, fontSize: 13, color: "var(--ink)" }}>{d.name}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: "var(--ink-soft)" }}>{d.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}