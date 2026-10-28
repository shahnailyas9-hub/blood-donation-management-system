// MySQL connection pool (using mysql2/promise so we can use async/await)
require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blood_donation",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Quick sanity check on startup
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL connected:", process.env.DB_NAME);
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();

module.exports = pool;
