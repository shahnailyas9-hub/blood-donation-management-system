const bcrypt = require("bcryptjs");
const pool = require("../config/db");

// GET /api/donors
async function getAllDonors(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT id, full_name, email, phone, blood_group, age, gender, city, province,
              times_donated, last_donated_date, donation_frequency, status, created_at
       FROM users WHERE role = 'Donor' ORDER BY created_at DESC`
    );
    return res.json(rows);
  } catch (err) {
    console.error("Get donors error:", err);
    return res.status(500).json({ message: "Failed to fetch donors." });
  }
}

// GET /api/donors/:id
async function getDonorById(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT id, full_name, email, phone, blood_group, age, gender, city, province,
              times_donated, last_donated_date, donation_frequency, has_illness,
              illness_details, on_medication, medication_details, had_surgery,
              status, created_at
       FROM users WHERE id = ? AND role = 'Donor'`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Donor not found." });
    return res.json(rows[0]);
  } catch (err) {
    console.error("Get donor error:", err);
    return res.status(500).json({ message: "Failed to fetch donor." });
  }
}

// POST /api/donors  (admin manually adds a donor, e.g. AddDonor.js)
async function createDonor(req, res) {
  try {
    const {
      fullName, email, phone, bloodGroup, age, gender, city, province,
      timesDonated, lastDonatedDate, donationFrequency, password,
    } = req.body;

    if (!fullName || !email || !bloodGroup) {
      return res.status(400).json({ message: "Full name, email, and blood group are required." });
    }

    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "A user with this email already exists." });
    }

    const tempPassword = password || Math.random().toString(36).slice(-8);
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    const [result] = await pool.query(
      `INSERT INTO users
        (full_name, email, phone, password_hash, role, blood_group, age, gender, city, province,
         times_donated, last_donated_date, donation_frequency)
       VALUES (?, ?, ?, ?, 'Donor', ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, email, phone || null, passwordHash, bloodGroup, age || null,
       gender || null, city || null, province || null, timesDonated || 0,
       lastDonatedDate || null, donationFrequency || null]
    );

    return res.status(201).json({ message: "Donor added successfully.", donorId: result.insertId });
  } catch (err) {
    console.error("Create donor error:", err);
    return res.status(500).json({ message: "Failed to add donor." });
  }
}

// PUT /api/donors/:id  (EditDonor.js)
async function updateDonor(req, res) {
  try {
    const {
      fullName, email, phone, bloodGroup, age, gender, city, province,
      timesDonated, lastDonatedDate, donationFrequency, status,
    } = req.body;

    const [result] = await pool.query(
      `UPDATE users SET
         full_name = COALESCE(?, full_name),
         email = COALESCE(?, email),
         phone = COALESCE(?, phone),
         blood_group = COALESCE(?, blood_group),
         age = COALESCE(?, age),
         gender = COALESCE(?, gender),
         city = COALESCE(?, city),
         province = COALESCE(?, province),
         times_donated = COALESCE(?, times_donated),
         last_donated_date = COALESCE(?, last_donated_date),
         donation_frequency = COALESCE(?, donation_frequency),
         status = COALESCE(?, status)
       WHERE id = ? AND role = 'Donor'`,
      [fullName, email, phone, bloodGroup, age, gender, city, province,
       timesDonated, lastDonatedDate, donationFrequency, status, req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Donor not found." });
    return res.json({ message: "Donor updated successfully." });
  } catch (err) {
    console.error("Update donor error:", err);
    return res.status(500).json({ message: "Failed to update donor." });
  }
}

// DELETE /api/donors/:id
async function deleteDonor(req, res) {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ? AND role = 'Donor'", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Donor not found." });
    return res.json({ message: "Donor deleted successfully." });
  } catch (err) {
    console.error("Delete donor error:", err);
    return res.status(500).json({ message: "Failed to delete donor." });
  }
}

module.exports = { getAllDonors, getDonorById, createDonor, updateDonor, deleteDonor };
