import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  bloodGroup: "",
  age: "",
  gender: "",
  city: "",
  province: "Central Province",
  timesDonated: "",
  lastDonatedDate: "",
  donationFrequency: "Every 4 months",
  hasIllness: "No",
  illnessDetails: "",
  onMedication: "No",
  medicationDetails: "",
  hadSurgery: "No",
  password: "",
  confirmPassword: "",
  agreedToTerms: false,
};

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.phone || !form.bloodGroup) {
      setError("Please fill in all required personal information fields.");
      return;
    }
    if (!form.password || !form.confirmPassword) {
      setError("Please create and confirm a password.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.agreedToTerms) {
      setError("You must agree to the Terms and Conditions to continue.");
      return;
    }

    // TODO: replace with your real registration API call.
    // Example:
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(form) });

   try {
  const response = await axios.post(
    "http://localhost:5000/register",
    form
  );

  alert(response.data.message);

  setForm(initialState);

  navigate("/login");
} catch (err) {
  setError(
    err.response?.data?.message || "Registration failed."
  );
}
  };

  return (
    <div className="register-page">
      <nav className="navbar">
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
        <div className="switch-link">
          Already have an account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
            Login
          </a>
        </div>
      </nav>

      <div className="page-wrap">
        <div className="page-head">
          <div className="eyebrow">Join the network</div>
          <h1>Create your donor account</h1>
          <p>Takes less than 3 minutes — your details help us match you safely.</p>
        </div>

        <div className="steps">
          <div className="step active"><span className="num">1</span> Your details</div>
          <div className="step-line"></div>
          <div className="step"><span className="num">2</span> Health history</div>
          <div className="step-line"></div>
          <div className="step"><span className="num">3</span> Secure account</div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="form-error">{error}</div>}

          {/* Personal information */}
          <div className="section">
            <div className="section-title">
              <div className="section-icon crimson">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </div>
              <h3>Personal information</h3>
            </div>
            <div className="row2">
              <div className="field">
                <label htmlFor="fullName">Full name</label>
                <input id="fullName" name="fullName" className="input" placeholder="Enter your full name" value={form.fullName} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="input" placeholder="Enter your email" value={form.email} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" name="phone" className="input" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="bloodGroup">Blood group</label>
                <select id="bloodGroup" name="bloodGroup" className="input" value={form.bloodGroup} onChange={handleChange}>
                  <option value="">Select your blood group</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="age">Age</label>
                <input id="age" name="age" type="number" className="input" placeholder="Enter your age" value={form.age} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" className="input" value={form.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">City</label>
                <input id="city" name="city" className="input" placeholder="Enter your city" value={form.city} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="province">Province</label>
                <select id="province" name="province" className="input" value={form.province} onChange={handleChange}>
                  <option>Central Province</option>
                  <option>Western Province</option>
                  <option>Southern Province</option>
                  <option>Northern Province</option>
                  <option>Eastern Province</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="divider-line" />

          {/* Donation history */}
          <div className="section">
            <div className="section-title">
              <div className="section-icon teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z" />
                </svg>
              </div>
              <h3>Donation history</h3>
              <span>Optional if this is your first time</span>
            </div>
            <div className="row2">
              <div className="field">
                <label htmlFor="timesDonated">Number of times donated</label>
                <input id="timesDonated" name="timesDonated" type="number" className="input" placeholder="0" value={form.timesDonated} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="lastDonatedDate">Last donated date</label>
                <input id="lastDonatedDate" name="lastDonatedDate" type="date" className="input" value={form.lastDonatedDate} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="donationFrequency">How often would you like to donate?</label>
                <select id="donationFrequency" name="donationFrequency" className="input" value={form.donationFrequency} onChange={handleChange}>
                  <option>Every 3 months</option>
                  <option>Every 4 months</option>
                  <option>Every 6 months</option>
                  <option>Once a year</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="divider-line" />

          {/* Health history */}
          <div className="section">
            <div className="section-title">
              <div className="section-icon amber">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h3>Health &amp; medical history</h3>
              <span>Helps us confirm you're eligible to donate</span>
            </div>

            <div className="row2">
              <div className="field">
                <label htmlFor="hasIllness">Are you suffering from any long-term illness?</label>
                <select id="hasIllness" name="hasIllness" className="input" value={form.hasIllness} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="onMedication">Are you taking any medication?</label>
                <select id="onMedication" name="onMedication" className="input" value={form.onMedication} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
            </div>

            {form.hasIllness === "Yes" && (
              <div className="row2">
                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="illnessDetails">Describe the illness</label>
                  <textarea id="illnessDetails" name="illnessDetails" placeholder="Please share details" value={form.illnessDetails} onChange={handleChange} />
                </div>
              </div>
            )}

            {form.onMedication === "Yes" && (
              <div className="row2">
                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="medicationDetails">Medication details</label>
                  <textarea id="medicationDetails" name="medicationDetails" placeholder="Please share details" value={form.medicationDetails} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="field" style={{ maxWidth: 340 }}>
              <label htmlFor="hadSurgery">Have you undergone any surgery?</label>
              <select id="hadSurgery" name="hadSurgery" className="input" value={form.hadSurgery} onChange={handleChange}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
          </div>

          <hr className="divider-line" />

          {/* Account security */}
          <div className="section">
            <div className="section-title">
              <div className="section-icon crimson">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>Secure your account</h3>
            </div>
            <div className="row2">
              <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className="input" placeholder="Create a password" value={form.password} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" className="input" placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} />
              </div>
            </div>
          </div>

          <label className="checkbox-row">
            <input type="checkbox" name="agreedToTerms" checked={form.agreedToTerms} onChange={handleChange} />
            I agree to the{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/terms"); }}>Terms and Conditions</a>{" "}
            and{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/privacy-policy"); }}>Privacy Policy</a>.
          </label>

          <button type="submit" className="submit-btn">Create account</button>
        </form>
      </div>
    </div>
  );
}