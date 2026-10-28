
import React, { useState, useEffect, useCallback } from "react";
import {
  Droplet,
  Search,
  AlertTriangle,
  Lock,
  Check,
  CheckCircle2,
  Heart,
  Star,
  Clock,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Github,
  Activity,
  X,
  ArrowRight,
} from "lucide-react";

/* -------------------------------------------------------------------- */
/*  Static data                                                          */
/* -------------------------------------------------------------------- */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#why" },
  { label: "Blood Availability", href: "#inventory" },
  { label: "Contact Us", href: "#footer" },
];

const FEATURES = [
  {
    icon: Search,
    tint: "bg-rose-50 text-rose-500",
    title: "Fast donor search",
    body: "Find eligible donors near any hospital in seconds, filtered by blood type and location.",
  },
  {
    icon: Droplet,
    tint: "bg-teal-50 text-teal-600",
    title: "All blood groups",
    body: "From O- to AB+, we track live inventory across every type at every branch.",
  },
  {
    icon: AlertTriangle,
    tint: "bg-amber-50 text-amber-500",
    title: "Emergency requests",
    body: "Urgent hospital requests are broadcast instantly to nearby eligible donors.",
  },
  {
    icon: Lock,
    tint: "bg-emerald-50 text-emerald-600",
    title: "Secure donor records",
    body: "Every profile and donation history is encrypted and privacy-protected.",
  },
  {
    icon: Check,
    tint: "bg-rose-50 text-rose-500",
    title: "Verified donors",
    body: "Every donor is ID-checked and screened for eligibility before approval.",
  },
  {
    icon: Heart,
    tint: "bg-teal-50 text-teal-600",
    title: "Save more lives",
    body: "One donation can support up to three patients in critical need.",
  },
];

const INVENTORY = [
  { type: "A+", units: 12, label: "12 units available", status: "HEALTHY", pct: 80 },
  { type: "A-", units: 4, label: "04 units available", status: "LOW STOCK", pct: 30 },
  { type: "B+", units: 8, label: "08 units available", status: "HEALTHY", pct: 65 },
  { type: "B-", units: 2, label: "02 units available", status: "CRITICAL", pct: 12 },
  { type: "O+", units: 15, label: "15 units available", status: "HEALTHY", pct: 95 },
  { type: "O-", units: 3, label: "03 units available", status: "CRITICAL", pct: 18 },
  { type: "AB+", units: 6, label: "06 units available", status: "MODERATE", pct: 45 },
  { type: "AB-", units: 1, label: "01 unit available", status: "CRITICAL", pct: 6 },
];

const STATUS_STYLES = {
  HEALTHY: "bg-emerald-500/15 text-emerald-400",
  "LOW STOCK": "bg-rose-500/15 text-rose-400",
  CRITICAL: "bg-rose-500/15 text-rose-400",
  MODERATE: "bg-emerald-500/15 text-emerald-400",
};

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

/* -------------------------------------------------------------------- */
/*  Small building blocks                                                */
/* -------------------------------------------------------------------- */

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 shadow-2xl text-sm font-medium animate-[fadein_.2s_ease-out]">
      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
      {message}
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block text-left">
      <span className="text-xs font-semibold text-slate-600 mb-1 block">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition"
      />
    </label>
  );
}

function Select({ label, options, ...props }) {
  return (
    <label className="block text-left">
      <span className="text-xs font-semibold text-slate-600 mb-1 block">{label}</span>
      <select
        {...props}
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition bg-white"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Modal({ open, onClose, title, subtitle, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 sm:p-7 relative animate-[fadein_.15s_ease-out]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 transition"
        >
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mb-5">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Main page                                                             */
/* -------------------------------------------------------------------- */

export default function LifeCareHome() {
  const [modal, setModal] = useState(null); // 'donor' | 'request' | 'login' | 'register' | null
  const [toast, setToast] = useState("");
  const [donorForm, setDonorForm] = useState({ name: "", email: "", phone: "", bloodType: "" });
  const [requestForm, setRequestForm] = useState({ hospital: "", bloodType: "", units: "", urgency: "" });
  const [authForm, setAuthForm] = useState({ email: "", password: "" });

  const closeModal = useCallback(() => setModal(null), []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitDonor = (e) => {
    e.preventDefault();
    if (!donorForm.name || !donorForm.email || !donorForm.bloodType) {
      setToast("Please fill in all required fields.");
      return;
    }
    setModal(null);
    setToast(`Thanks ${donorForm.name.split(" ")[0]}! Your donor application was submitted.`);
    setDonorForm({ name: "", email: "", phone: "", bloodType: "" });
  };

  const submitRequest = (e) => {
    e.preventDefault();
    if (!requestForm.hospital || !requestForm.bloodType || !requestForm.units) {
      setToast("Please fill in all required fields.");
      return;
    }
    setModal(null);
    setToast(`Blood request for ${requestForm.bloodType} sent — nearby donors are being notified.`);
    setRequestForm({ hospital: "", bloodType: "", units: "", urgency: "" });
  };

  const submitAuth = (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.password) {
      setToast("Please enter email and password.");
      return;
    }
    setToast(modal === "login" ? "Logged in successfully." : "Account created — welcome to LifeCare!");
    setModal(null);
    setAuthForm({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-[#eef1f6] text-slate-900 font-sans">
      <style>{`
        @keyframes fadein { from { opacity:0; transform: translateY(4px);} to { opacity:1; transform:none;} }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ---------------- Header ---------------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-rose-600 text-white">
              <Droplet size={16} fill="white" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif font-bold text-[15px] text-slate-900">LifeCare Hospital</span>
              <span className="block text-[10px] text-slate-400 -mt-0.5">Blood Donation Center</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {NAV_LINKS.map((l) => (
              
                key={l.label}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="hover:text-rose-600 transition"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModal("login")}
              className="hidden sm:inline-flex text-sm font-semibold px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
            >
              Login
            </button>
            <button
              onClick={() => setModal("register")}
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition shadow-sm shadow-rose-200"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Emergency requests answered in minutes
            </span>

            <h1 className="font-serif text-5xl leading-[1.08] font-bold text-slate-900 mb-5">
              Donate Blood,
              <br />
              <span className="text-rose-600">Save Lives</span> Today
            </h1>

            <p className="text-slate-500 text-[15px] leading-relaxed max-w-md mb-8">
              One donation can help up to three patients. Join a network of verified donors making a real
              difference across Sri Lanka — safely, quickly, and whenever it&apos;s needed most.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => setModal("donor")}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 text-white font-semibold text-sm px-5 py-3 hover:bg-rose-700 transition shadow-lg shadow-rose-200"
              >
                <span className="text-lg leading-none">+</span> Become a Donor
              </button>
              <button
                onClick={() => setModal("request")}
                className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold text-sm px-5 py-3 hover:bg-slate-50 transition"
              >
                Request Blood
              </button>
            </div>

            <div className="flex gap-10">
              <div>
                <p className="font-serif text-2xl font-bold text-slate-900">12,400+</p>
                <p className="text-xs text-slate-400 mt-0.5">Donations made</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-slate-900">150+</p>
                <p className="text-xs text-slate-400 mt-0.5">Active donors</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-slate-900">24/7</p>
                <p className="text-xs text-slate-400 mt-0.5">Emergency response</p>
              </div>
            </div>
          </div>

          {/* Hero graphic */}
          <div className="relative h-[420px] flex items-center justify-center">
            <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-br from-rose-100 to-transparent" />
            <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-rose-200" />
            <Droplet size={190} className="text-rose-700 drop-shadow-xl relative z-10" fill="currentColor" strokeWidth={0} />

            <div className="absolute top-2 left-0 sm:left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
              <span className="grid place-items-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-500">
                <Check size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Donor Verified</p>
                <p className="text-[11px] text-slate-400">ID + eligibility checked</p>
              </div>
            </div>

            <div className="absolute bottom-6 right-0 sm:right-2 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
              <span className="grid place-items-center w-8 h-8 rounded-full bg-rose-50 text-rose-500">
                <Activity size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Live Matching</p>
                <p className="text-[11px] text-slate-400">Nearest hospital in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Trust bar ---------------- */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-14 text-xs sm:text-sm font-medium text-slate-200 text-center">
          <span className="inline-flex items-center gap-2">
            <Star size={14} className="text-amber-400" /> Trusted by 40+ partner hospitals
          </span>
          <span className="inline-flex items-center gap-2">
            <Lock size={14} className="text-rose-400" /> Fully verified &amp; secure records
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock size={14} className="text-rose-400" /> Average match time: 8 minutes
          </span>
        </div>
      </section>

      {/* ---------------- Why LifeCare ---------------- */}
      <section id="why" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-rose-600 text-xs font-bold tracking-wide mb-3">WHY LIFECARE</p>
          <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">Every drop counts</h2>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            Our Blood Donation Management System connects donors and patients quickly during emergencies —
            built to be fast, safe, and reliable when it matters most.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition border border-slate-100"
            >
              <span className={`inline-grid place-items-center w-11 h-11 rounded-xl mb-5 ${f.tint}`}>
                <f.icon size={20} />
              </span>
              <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Inventory ---------------- */}
      <section id="inventory" className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-rose-400 text-xs font-bold tracking-wide mb-3">LIVE INVENTORY</p>
            <h2 className="font-serif text-4xl font-bold mb-4">Blood availability</h2>
            <p className="text-slate-400 text-[15px]">
              Real-time stock across all LifeCare branches, updated as donations come in.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INVENTORY.map((b) => (
              <div key={b.type} className="rounded-2xl bg-slate-800/60 border border-slate-700/60 p-5 text-center">
                <p className="font-serif text-3xl font-bold mb-1">{b.type}</p>
                <p className="text-[11px] text-slate-400 font-mono mb-3">{b.label}</p>
                <div className="h-1.5 w-full rounded-full bg-slate-700 overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full ${
                      b.status === "CRITICAL" ? "bg-rose-500" : "bg-teal-400"
                    }`}
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <span
                  className={`inline-block text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full ${STATUS_STYLES[b.status]}`}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 to-rose-500 px-8 py-10 sm:px-12 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -right-10 -bottom-16 w-56 h-56 rounded-full bg-white/10" />
          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Ready to save a life today?
            </h3>
            <p className="text-rose-100 text-sm max-w-md">
              Registration takes less than 3 minutes. Your next donation could be someone&apos;s second chance.
            </p>
          </div>
          <button
            onClick={() => setModal("donor")}
            className="relative z-10 inline-flex items-center gap-2 bg-white text-rose-600 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-rose-50 transition shrink-0"
          >
            Become a Donor <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer id="footer" className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-rose-600 text-white">
                <Droplet size={16} fill="white" />
              </span>
              <span className="font-serif font-bold text-white text-[15px]">LifeCare Hospital</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Saving lives through blood donation. Connecting donors and patients across Sri Lanka since 2019.
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-400 mb-2">
              <MapPin size={14} /> 123 Hospital Road, Colombo, Sri Lanka
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Phone size={14} /> +94 11 234 5678
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Github].map((Icon, i) => (
                
                  key={i}
                  href="#footer"
                  onClick={(e) => e.preventDefault()}
                  className="grid place-items-center w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-xs font-bold tracking-wide mb-4">QUICK LINKS</p>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={(e) => handleNavClick(e, l.href)} className="hover:text-white transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-xs font-bold tracking-wide mb-4">DONOR INFO</p>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {["Eligibility Criteria", "Donation Process", "FAQs", "Privacy Policy"].map((t) => (
                <li key={t}>
                  
                    href="#footer"
                    onClick={(e) => {
                      e.preventDefault();
                      setToast(`${t} — coming soon.`);
                    }}
                    className="hover:text-white transition"
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-xs font-bold tracking-wide mb-4">EMERGENCY REQUESTS</p>
            <div className="rounded-xl bg-rose-950/40 border border-rose-900/50 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1.5">
                <AlertTriangle size={13} /> Available 24/7
              </p>
              <a href="tel:+94771234567" className="font-mono text-white text-sm tracking-wide hover:text-rose-300 transition">
                +94 77 123 4567
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <p>© 2026 LifeCare Hospital Blood Donation Center. All Rights Reserved.</p>
            <p className="flex items-center gap-1.5">
              <Heart size={12} className="text-rose-500" /> Every drop counts. Every donor matters.
            </p>
          </div>
        </div>
      </footer>

      {/* ---------------- Modals ---------------- */}
      <Modal
        open={modal === "donor"}
        onClose={closeModal}
        title="Become a Donor"
        subtitle="Fill in your details and our team will reach out to schedule your donation."
      >
        <form onSubmit={submitDonor} className="space-y-4">
          <Field
            label="Full name"
            value={donorForm.name}
            onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
            placeholder="Nimal Perera"
          />
          <Field
            label="Email"
            type="email"
            value={donorForm.email}
            onChange={(e) => setDonorForm({ ...donorForm, email: e.target.value })}
            placeholder="you@example.com"
          />
          <Field
            label="Phone number"
            value={donorForm.phone}
            onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
            placeholder="+94 77 123 4567"
          />
          <Select
            label="Blood type"
            options={BLOOD_TYPES}
            value={donorForm.bloodType}
            onChange={(e) => setDonorForm({ ...donorForm, bloodType: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 transition text-white font-semibold text-sm py-3 rounded-lg mt-2"
          >
            Submit application
          </button>
        </form>
      </Modal>

      <Modal
        open={modal === "request"}
        onClose={closeModal}
        title="Request Blood"
        subtitle="Broadcast an urgent request to nearby eligible donors."
      >
        <form onSubmit={submitRequest} className="space-y-4">
          <Field
            label="Hospital / location"
            value={requestForm.hospital}
            onChange={(e) => setRequestForm({ ...requestForm, hospital: e.target.value })}
            placeholder="LifeCare Colombo Branch"
          />
          <Select
            label="Blood type needed"
            options={BLOOD_TYPES}
            value={requestForm.bloodType}
            onChange={(e) => setRequestForm({ ...requestForm, bloodType: e.target.value })}
          />
          <Field
            label="Units needed"
            type="number"
            min="1"
            value={requestForm.units}
            onChange={(e) => setRequestForm({ ...requestForm, units: e.target.value })}
            placeholder="2"
          />
          <Select
            label="Urgency"
            options={["Critical — within hours", "Urgent — within 24h", "Planned — this week"]}
            value={requestForm.urgency}
            onChange={(e) => setRequestForm({ ...requestForm, urgency: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 transition text-white font-semibold text-sm py-3 rounded-lg mt-2"
          >
            Send request
          </button>
        </form>
      </Modal>

      <Modal
        open={modal === "login"}
        onClose={closeModal}
        title="Welcome back"
        subtitle="Log in to manage your donor profile."
      >
        <form onSubmit={submitAuth} className="space-y-4">
          <Field
            label="Email"
            type="email"
            value={authForm.email}
            onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
            placeholder="you@example.com"
          />
          <Field
            label="Password"
            type="password"
            value={authForm.password}
            onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 transition text-white font-semibold text-sm py-3 rounded-lg mt-2"
          >
            Log in
          </button>
          <p className="text-xs text-center text-slate-500">
            No account?{" "}
            <button type="button" onClick={() => setModal("register")} className="text-rose-600 font-semibold">
              Register
            </button>
          </p>
        </form>
      </Modal>

      <Modal
        open={modal === "register"}
        onClose={closeModal}
        title="Create your account"
        subtitle="Join LifeCare's donor network in under a minute."
      >
        <form onSubmit={submitAuth} className="space-y-4">
          <Field
            label="Email"
            type="email"
            value={authForm.email}
            onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
            placeholder="you@example.com"
          />
          <Field
            label="Password"
            type="password"
            value={authForm.password}
            onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
            placeholder="Create a password"
          />
          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 transition text-white font-semibold text-sm py-3 rounded-lg mt-2"
          >
            Create account
          </button>
          <p className="text-xs text-center text-slate-500">
            Already registered?{" "}
            <button type="button" onClick={() => setModal("login")} className="text-rose-600 font-semibold">
              Log in
            </button>
          </p>
        </form>
      </Modal>

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
```

Requires `lucide-react` and Tailwind CSS set up in your project. Save it as `LifeCareHome.jsx` and import it wherever you want the page to render.