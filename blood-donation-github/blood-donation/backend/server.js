require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authController = require("./controllers/authController");
const donorRoutes = require("./routes/donorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// --- Auth routes: kept at root path to match the existing frontend ---
// Login.js  -> axios.post("http://localhost:5000/login", {...})
// Register.js -> axios.post("http://localhost:5000/register", {...})
app.post("/login", authController.login);
app.post("/register", authController.register);

// --- Resource routes ---
app.use("/api/donors", donorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Blood Donation API is running." });
});

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Central error handler (catches anything thrown/passed to next(err))
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
