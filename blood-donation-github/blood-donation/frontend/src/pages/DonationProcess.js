import React from "react";
import InfoPageLayout from "./InfoPageLayout";

const steps = [
  {
    title: "Register",
    desc: "Create a donor account or book an appointment online in under 3 minutes.",
  },
  {
    title: "Health screening",
    desc: "A quick questionnaire and physical check (blood pressure, pulse, hemoglobin) confirms you're eligible to donate that day.",
  },
  {
    title: "Donation",
    desc: "The donation itself takes about 8–10 minutes. You'll be seated comfortably the whole time.",
  },
  {
    title: "Rest & refreshments",
    desc: "Relax for 10–15 minutes afterward with a snack and something to drink before you head out.",
  },
  {
    title: "Recovery",
    desc: "Most people resume normal activity the same day. Avoid heavy lifting or exercise for 24 hours.",
  },
];

export default function DonationProcess() {
  return (
    <InfoPageLayout>
      <div className="page-head">
        <div className="eyebrow">Donor info</div>
        <h1>Donation process</h1>
        <p>Here's exactly what to expect, start to finish — most visits take under 45 minutes total.</p>
      </div>

      <div className="info-card">
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, i) => (
            <div key={step.title} style={{ display: "flex", gap: 18, paddingBottom: i < steps.length - 1 ? 26 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "var(--crimson)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: "var(--border)", marginTop: 4 }}></div>
                )}
              </div>
              <div style={{ paddingBottom: 4 }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 16, color: "var(--navy)", marginBottom: 4 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-card">
        <h2>Before you arrive</h2>
        <ul>
          <li>Eat a healthy meal within a few hours of your appointment</li>
          <li>Drink plenty of water the day before and the day of</li>
          <li>Bring a valid photo ID</li>
          <li>Get a good night's sleep beforehand</li>
        </ul>
      </div>
    </InfoPageLayout>
  );
}