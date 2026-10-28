// One-time helper to create your first Admin account.
// Usage:  node seedAdmin.js "Admin Name" admin@example.com YourPassword123
require("dotenv").config();
const bcrypt = require("bcryptjs");
const pool = require("./config/db");

async function seedAdmin() {
  const [fullName, email, password] = process.argv.slice(2);

  if (!fullName || !email || !password) {
    console.log('Usage: node seedAdmin.js "Admin Name" admin@example.com YourPassword123');
    process.exit(1);
  }
  if (password.length < 8) {
    console.log("Password must be at least 8 characters.");
    process.exit(1);
  }

  try {
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      console.log("A user with that email already exists.");
      process.exit(1);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role, status)
       VALUES (?, ?, ?, 'Admin', 'Active')`,
      [fullName, email, passwordHash]
    );

    console.log(`✅ Admin account created for ${email}. You can now log in.`);
    process.exit(0);
  } catch (err) {
    console.error("Failed to seed admin:", err.message);
    process.exit(1);
  }
}

seedAdmin();
