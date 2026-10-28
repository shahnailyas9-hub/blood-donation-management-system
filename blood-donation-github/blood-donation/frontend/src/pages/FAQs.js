import React, { useState } from "react";
import InfoPageLayout from "./InfoPageLayout";

const faqs = [
  {
    q: "Does donating blood hurt?",
    a: "Most donors feel only a brief pinch when the needle is inserted. The donation itself is painless and takes about 8–10 minutes.",
  },
  {
    q: "How often can I donate?",
    a: "Whole blood donors can typically donate every 3–4 months. Platelet donors may be able to donate more frequently — our staff will confirm your specific interval.",
  },
  {
    q: "Is there any risk of infection?",
    a: "No. All needles and equipment are sterile, single-use, and disposed of immediately after your donation.",
  },
  {
    q: "What should I eat before donating?",
    a: "Have a balanced meal a few hours before your appointment and avoid fatty foods. Stay well hydrated the day before and the day of.",
  },
  {
    q: "Can I donate if I'm taking medication?",
    a: "It depends on the medication. Bring a list of what you're taking to your appointment and our staff will confirm your eligibility.",
  },
  {
    q: "How long does the whole visit take?",
    a: "Including registration, screening, donation, and rest afterward, most visits take 30–45 minutes total. The donation itself is only 8–10 minutes.",
  },
  {
    q: "What happens to my blood after I donate?",
    a: "It's tested, processed, and matched to patients in need — often within 24–48 hours of your donation.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <InfoPageLayout>
      <div className="page-head">
        <div className="eyebrow">Donor info</div>
        <h1>Frequently asked questions</h1>
        <p>Answers to the questions we hear most from first-time and returning donors.</p>
      </div>

      <div className="info-card" style={{ padding: 0 }}>
        {faqs.map((item, i) => (
          <div
            key={item.q}
            style={{
              borderBottom: i < faqs.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <button
              onClick={() => toggle(i)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "22px 36px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                fontFamily: "'Fraunces', serif",
                fontSize: 15.5,
                fontWeight: 600,
                color: "var(--navy)",
              }}
            >
              <span>{item.q}</span>
              <span
                style={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: openIndex === i ? "var(--crimson)" : "var(--bg)",
                  color: openIndex === i ? "#fff" : "var(--ink-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  transition: "transform .15s ease",
                  transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>
            {openIndex === i && (
              <div style={{ padding: "0 36px 22px", fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7 }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
}