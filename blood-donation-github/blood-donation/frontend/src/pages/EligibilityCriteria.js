import React from "react";
import InfoPageLayout from "./InfoPageLayout";

export default function EligibilityCriteria() {
  return (
    <InfoPageLayout>
      <div className="page-head">
        <div className="eyebrow">Donor info</div>
        <h1>Eligibility criteria</h1>
        <p>
          Before you donate, please review the requirements below. This helps
          keep both you and recipients safe.
        </p>
      </div>

      <div className="info-card">
        <h2>Basic requirements</h2>
        <ul>
          <li>Age between 18 and 65 years</li>
          <li>Weight of at least 50 kg (110 lbs)</li>
          <li>Hemoglobin level of at least 12.5 g/dL</li>
          <li>Blood pressure and pulse within normal range</li>
          <li>In good general health on the day of donation</li>
        </ul>
      </div>

      <div className="info-card">
        <h2>You may need to wait if you have</h2>
        <ul>
          <li>Donated blood in the last 3 months (whole blood)</li>
          <li>Had a tattoo or piercing in the last 6 months</li>
          <li>Recovered from a cold, flu, or fever in the last 2 weeks</li>
          <li>Been pregnant within the last 6 months</li>
          <li>Traveled to a malaria-risk region recently</li>
        </ul>
      </div>

      <div className="info-card">
        <h2>You may not be eligible if you</h2>
        <ul>
          <li>Have a chronic illness that affects blood quality (e.g. certain heart, liver, or blood conditions)</li>
          <li>Are currently taking specific medications your doctor has flagged as unsafe for donation</li>
          <li>Have tested positive for HIV, Hepatitis B, or Hepatitis C</li>
          <li>Have had major surgery in the last 6 months</li>
        </ul>
      </div>

      <div className="info-card">
        <h2>Not sure if you qualify?</h2>
        <p>
          Every donor is screened individually before donating, including a
          short health questionnaire and a quick physical check. When in
          doubt, register anyway — our staff will confirm your eligibility
          during your appointment.
        </p>
      </div>
    </InfoPageLayout>
  );
}