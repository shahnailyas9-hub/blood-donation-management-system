import React from "react";
import InfoPageLayout from "./InfoPageLayout";

export default function PrivacyPolicy() {
  return (
    <InfoPageLayout>
      <div className="page-head">
        <div className="eyebrow">Legal</div>
        <h1>Privacy policy</h1>
        <p>Last updated: January 2026. Here's how LifeCare Hospital collects, uses, and protects your information.</p>
      </div>

      <div className="info-card">
        <h2>Information we collect</h2>
        <p>
          When you register as a donor or submit a blood request, we collect
          details such as your name, contact information, blood group, age,
          location, and relevant health history necessary to determine
          donation eligibility.
        </p>
      </div>

      <div className="info-card">
        <h2>How we use your information</h2>
        <ul>
          <li>To confirm your eligibility to donate blood</li>
          <li>To match donors with hospital blood requests</li>
          <li>To send you appointment reminders and urgent request notifications</li>
          <li>To maintain accurate donation history records</li>
        </ul>
      </div>

      <div className="info-card">
        <h2>How we protect your data</h2>
        <p>
          All donor and health records are encrypted and stored securely.
          Access is restricted to authorized LifeCare staff only, and medical
          information is never shared with third parties without your
          consent, except where required by law.
        </p>
      </div>

      <div className="info-card">
        <h2>Your rights</h2>
        <ul>
          <li>You can request a copy of the personal data we hold about you</li>
          <li>You can ask us to correct inaccurate information</li>
          <li>You can request that your account and data be deleted, subject to legal record-keeping requirements for medical donations</li>
        </ul>
      </div>

      <div className="info-card">
        <h2>Contact us</h2>
        <p>
          If you have questions about this policy or how your data is
          handled, contact us at{" "}
          <a href="mailto:bloodbank@lifecarehospital.lk" style={{ color: "var(--teal)", fontWeight: 600 }}>
            bloodbank@lifecarehospital.lk
          </a>{" "}
          or call +94 11 234 5678.
        </p>
      </div>
    </InfoPageLayout>
  );
}