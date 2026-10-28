import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function HomePage() {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const availabilityRef = useRef(null);
  const footerRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-inner">
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
              <div className="name">LifeCare Hospital</div>
              <div className="sub">Blood Donation Center</div>
            </div>
          </div>

          <div className="nav-links">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo(aboutRef); }}>About Us</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo(availabilityRef); }}>Blood Availability</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo(footerRef); }}>Contact Us</a>
          </div>

          <div className="nav-actions">
            <button className="btn-outline" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn-crimson" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="hero-eyebrow">
              <span className="dot"></span> Emergency requests answered in minutes
            </div>
            <h1>
              Donate Blood,
              <br />
              <span>Save Lives</span> Today
            </h1>
            <p>
              One donation can help up to three patients. Join a network of
              verified donors making a real difference across Sri Lanka —
              safely, quickly, and whenever it's needed most.
            </p>
            <div className="hero-actions">
              <button className="btn-primary-lg" onClick={() => navigate("/register")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Become a Donor
              </button>
              <button className="btn-secondary-lg" onClick={() => navigate("/request-blood")}>
                Request Blood
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <div className="num">12,400+</div>
                <div className="lbl">Donations made</div>
              </div>
              <div>
                <div className="num">150+</div>
                <div className="lbl">Active donors</div>
              </div>
              <div>
                <div className="num">24/7</div>
                <div className="lbl">Emergency response</div>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="pulse-ring"></div>
            <div className="drop-hero">
              <svg viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="dropGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#C0223A" />
                    <stop offset="100%" stopColor="#7A1425" />
                  </linearGradient>
                </defs>
                <path
                  d="M100 15 C100 15 40 100 40 140 C40 173.14 66.86 190 100 190 C133.14 190 160 173.14 160 140 C160 100 100 15 100 15 Z"
                  fill="url(#dropGrad)"
                />
                <path
                  d="M70 130 C70 130 78 150 100 150"
                  stroke="rgba(255,255,255,.35)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <div className="art-card art-1">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                <div className="t">Donor Verified</div>
                <div className="s">ID + eligibility checked</div>
              </div>
            </div>
            <div className="art-card art-2">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <div className="t">Live Matching</div>
                <div className="s">Nearest hospital in seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
            </svg>
            Trusted by 40+ partner hospitals
          </div>
          <div className="trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Fully verified &amp; secure records
          </div>
          <div className="trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            Average match time: 8 minutes
          </div>
        </div>
      </div>

      {/* About / Features */}
      <section className="section" ref={aboutRef}>
        <div className="wrap">
          <div className="section-head">
            <div className="section-eyebrow">Why LifeCare</div>
            <h2>Every drop counts</h2>
            <p>
              Our Blood Donation Management System connects donors and
              patients quickly during emergencies — built to be fast, safe,
              and reliable when it matters most.
            </p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon fi-crimson">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h3>Fast donor search</h3>
              <p>Find eligible donors near any hospital in seconds, filtered by blood type and location.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon fi-teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z" />
                </svg>
              </div>
              <h3>All blood groups</h3>
              <p>From O- to AB+, we track live inventory across every type at every branch.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon fi-amber">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v4M12 17h.01" />
                  <path d="M10.3 3.86l-8.14 14.1A1.5 1.5 0 0 0 3.5 20h17a1.5 1.5 0 0 0 1.34-2.04l-8.14-14.1a1.5 1.5 0 0 0-2.6 0z" />
                </svg>
              </div>
              <h3>Emergency requests</h3>
              <p>Urgent hospital requests are broadcast instantly to nearby eligible donors.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon fi-green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>Secure donor records</h3>
              <p>Every profile and donation history is encrypted and privacy-protected.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon fi-crimson">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3>Verified donors</h3>
              <p>Every donor is ID-checked and screened for eligibility before approval.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon fi-teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
                </svg>
              </div>
              <h3>Save more lives</h3>
              <p>One donation can support up to three patients in critical need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blood availability */}
      <section className="avail-section" ref={availabilityRef}>
        <div className="wrap">
          <div className="section-head">
            <div className="section-eyebrow">Live inventory</div>
            <h2>Blood availability</h2>
            <p>Real-time stock across all LifeCare branches, updated as donations come in.</p>
          </div>
          <div className="avail-grid">
            {[
              { bg: "A+", units: "12 units available", pct: 80, status: "Healthy", low: false },
              { bg: "A-", units: "04 units available", pct: 27, status: "Low stock", low: true },
              { bg: "B+", units: "08 units available", pct: 53, status: "Healthy", low: false },
              { bg: "B-", units: "02 units available", pct: 13, status: "Critical", low: true },
              { bg: "O+", units: "15 units available", pct: 100, status: "Healthy", low: false },
              { bg: "O-", units: "03 units available", pct: 20, status: "Critical", low: true },
              { bg: "AB+", units: "06 units available", pct: 40, status: "Moderate", low: false },
              { bg: "AB-", units: "01 unit available", pct: 7, status: "Critical", low: true },
            ].map((item) => (
              <div className="avail-card" key={item.bg}>
                <div className="bg">{item.bg}</div>
                <div className="units">{item.units}</div>
                <div className="bar-track">
                  <div
                    className={`bar-fill ${item.low ? "low" : ""}`}
                    style={{ width: `${item.pct}%` }}
                  ></div>
                </div>
                <span className={`status ${item.low ? "low" : "healthy"}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="cta-banner">
          <div className="cta-text">
            <h2>Ready to save a life today?</h2>
            <p>
              Registration takes less than 3 minutes. Your next donation could
              be someone's second chance.
            </p>
          </div>
          <button className="cta-btn" onClick={() => navigate("/register")}>
            Become a Donor →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef}>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
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
                  <div className="name">LifeCare Hospital</div>
                </div>
              </div>
              <p>
                Saving lives through blood donation. Connecting donors and
                patients across Sri Lanka since 2019.
              </p>
              <div className="footer-contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                123 Hospital Road, Colombo, Sri Lanka
              </div>
              <div className="footer-contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +94 11 234 5678
              </div>
              <div className="social-row">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.98H7.9V12h2.6V9.8c0-2.56 1.53-3.98 3.87-3.98 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.89h-2.4v6.98A10 10 0 0 0 22 12z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2H21l-6.6 7.55L22 22h-6.9l-5.4-6.7L3.4 22H1.3l7.05-8.07L1 2h7.1l4.9 6.13L18.9 2zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20z" />
                  </svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.4 9.4 0 0 1 12 6.8c.85 0 1.7.11 2.5.34 1.9-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>Home</a>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollTo(aboutRef); }}>About Us</a>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollTo(availabilityRef); }}>Blood Availability</a>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollTo(footerRef); }}>Contact Us</a>
            </div>

            <div className="footer-col">
              <h4>Donor Info</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/eligibility-criteria"); }}>Eligibility Criteria</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/donation-process"); }}>Donation Process</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/faqs"); }}>FAQs</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/privacy-policy"); }}>Privacy Policy</a>
            </div>

            <div className="footer-col">
              <h4>Emergency Requests</h4>
              <div className="footer-emergency">
                <div className="t">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 9v4M12 17h.01" />
                    <path d="M10.3 3.86l-8.14 14.1A1.5 1.5 0 0 0 3.5 20h17a1.5 1.5 0 0 0 1.34-2.04l-8.14-14.1a1.5 1.5 0 0 0-2.6 0z" />
                  </svg>
                  Available 24/7
                </div>
                <div className="n">+94 77 123 4567</div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© 2026 LifeCare Hospital Blood Donation Center. All Rights Reserved.</div>
            <div>
              <span className="heart">♥</span> Every drop counts. Every donor matters.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}