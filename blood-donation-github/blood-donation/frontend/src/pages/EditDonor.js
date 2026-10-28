import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddDonor.css";

function EditDonor() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [blood, setBlood] = useState("A+");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [status, setStatus] = useState("Approved");

  useEffect(() => {

    const donors =
      JSON.parse(localStorage.getItem("donors")) || [];

    const donor = donors[id];

    if (donor) {

      setName(donor.name);
      setEmail(donor.email);
      setPhone(donor.phone);
      setBlood(donor.blood);
      setAge(donor.age);
      setGender(donor.gender);
      setCity(donor.city);
      setProvince(donor.province);
      setStatus(donor.status);

    }

  }, [id]);

  const updateDonor = (e) => {

    e.preventDefault();

    const donors =
      JSON.parse(localStorage.getItem("donors")) || [];

    donors[id] = {
      name,
      email,
      phone,
      blood,
      age,
      gender,
      city,
      province,
      status,
    };

    localStorage.setItem(
      "donors",
      JSON.stringify(donors)
    );

    alert("Donor Updated Successfully!");

    navigate("/donors");

  };

  return (

    <div className="add-container">

      <div className="form-box">

        <h2>Edit Donor</h2>

        <form onSubmit={updateDonor}>

          <div className="row">

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

          </div>

          <div className="row">

            <div className="input-group">
              <label>Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Blood Group</label>

              <select
                value={blood}
                onChange={(e)=>setBlood(e.target.value)}
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
                onChange={(e)=>setAge(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Gender</label>

              <select
                value={gender}
                onChange={(e)=>setGender(e.target.value)}
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
                onChange={(e)=>setCity(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Province</label>
              <input
                type="text"
                value={province}
                onChange={(e)=>setProvince(e.target.value)}
              />
            </div>

          </div>

          <div className="row">

            <div className="input-group">
              <label>Status</label>

              <select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
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
              Update Donor
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditDonor;