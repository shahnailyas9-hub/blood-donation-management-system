import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddDonor.css";

function AddDonor() {

  const navigate = useNavigate();

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [blood, setBlood] = useState("A+");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [status, setStatus] = useState("Approved");

  // Save Donor
  const saveDonor = (e) => {
    e.preventDefault();

    const donor = {
      name,
      email,
      phone,
      blood,
      age,
      gender,
      city,
      province,
      status,
      joined: new Date().toLocaleDateString(),
    };

    const oldDonors =
      JSON.parse(localStorage.getItem("donors")) || [];

    oldDonors.push(donor);

    localStorage.setItem(
      "donors",
      JSON.stringify(oldDonors)
    );

    alert("Donor Added Successfully!");

    navigate("/donors");
  };

  return (
    <div className="add-container">

      <div className="form-box">

        <h2>Add New Donor</h2>

        <form onSubmit={saveDonor}>

          <div className="row">

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="row">

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Blood Group</label>

              <select
                value={blood}
                onChange={(e) => setBlood(e.target.value)}
              >
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>

            </div>

          </div>

          <div className="row">

            <div className="input-group">
              <label>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Gender</label>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

            </div>

          </div>

          <div className="row">

            <div className="input-group">
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Province</label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="row">

            <div className="input-group">
              <label>Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Approved</option>
                <option>Pending</option>
              </select>

            </div>

          </div>

          <div className="buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/donors")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Donor
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddDonor;