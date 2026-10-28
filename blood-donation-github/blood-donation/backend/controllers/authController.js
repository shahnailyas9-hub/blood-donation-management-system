const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// POST /register
// Body matches the Register.js form fields exactly.
async function register(req, res) {
  try {
    const {
      fullName,
      email,
      phone,
      bloodGroup,
      age,
      gender,
      city,
      province,
      timesDonated,
      lastDonatedDate,
      donationFrequency,
      hasIllness,
      illnessDetails,
      onMedication,
      medicationDetails,
      hadSurgery,
      password,
      confirmPassword,
    } = req.body;

    if (!fullName || !email || !phone || !bloodGroup) {
      return res.status(400).json({ message: "Please fill in all required personal information fields." });
    }
    if (!password || !confirmPassword) {
      return res.status(400).json({ message: "Please create and confirm a password." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users
        (full_name, email, phone, password_hash, role, blood_group, age, gender, city, province,
         times_donated, last_donated_date, donation_frequency,
         has_illness, illness_details, on_medication, medication_details, had_surgery)
       VALUES (?, ?, ?, ?, 'Donor', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        email,
        phone,
        passwordHash,
        bloodGroup,
        age || null,
        gender || null,
        city || null,
        province || null,
        timesDonated || 0,
        lastDonatedDate || null,
        donationFrequency || null,
        hasIllness || "No",
        illnessDetails || null,
        onMedication || "No",
        medicationDetails || null,
        hadSurgery || "No",
      ]
    );

    return res.status(201).json({
      message: "Registration successful! You can now log in.",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Something went wrong during registration." });
  }
}

// POST /login
// Body: { email, password, role }
async function login(req, res) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password, and role are required." });
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = rows[0];

    if (user.role !== role) {
      return res.status(403).json({ message: `This account is not registered as ${role}.` });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Don't send the password hash back to the client
    const { password_hash, ...safeUser } = user;

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Something went wrong during login." });
  }
}

module.exports = { register, login };
