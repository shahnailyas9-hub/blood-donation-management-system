const pool = require("../config/db");

// GET /api/appointments  (admin: all, donor: only their own via ?donorId=)
async function getAppointments(req, res) {
  try {
    const { donorId } = req.query;
    let sql = `SELECT a.*, u.full_name AS donor_name, u.blood_group
               FROM appointments a JOIN users u ON u.id = a.donor_id`;
    const params = [];
    if (donorId) {
      sql += " WHERE a.donor_id = ?";
      params.push(donorId);
    }
    sql += " ORDER BY a.appointment_date DESC, a.appointment_time DESC";
    const [rows] = await pool.query(sql, params);
    return res.json(rows);
  } catch (err) {
    console.error("Get appointments error:", err);
    return res.status(500).json({ message: "Failed to fetch appointments." });
  }
}

// POST /api/appointments
async function createAppointment(req, res) {
  try {
    const { donorId, appointmentDate, appointmentTime, location, notes } = req.body;
    if (!donorId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: "donorId, appointmentDate, and appointmentTime are required." });
    }
    const [result] = await pool.query(
      `INSERT INTO appointments (donor_id, appointment_date, appointment_time, location, notes)
       VALUES (?, ?, ?, ?, ?)`,
      [donorId, appointmentDate, appointmentTime, location || null, notes || null]
    );
    return res.status(201).json({ message: "Appointment booked successfully.", appointmentId: result.insertId });
  } catch (err) {
    console.error("Create appointment error:", err);
    return res.status(500).json({ message: "Failed to book appointment." });
  }
}

// PUT /api/appointments/:id  (e.g. admin confirms/cancels/completes)
async function updateAppointment(req, res) {
  try {
    const { appointmentDate, appointmentTime, location, status, notes } = req.body;
    const [result] = await pool.query(
      `UPDATE appointments SET
         appointment_date = COALESCE(?, appointment_date),
         appointment_time = COALESCE(?, appointment_time),
         location = COALESCE(?, location),
         status = COALESCE(?, status),
         notes = COALESCE(?, notes)
       WHERE id = ?`,
      [appointmentDate, appointmentTime, location, status, notes, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Appointment not found." });
    return res.json({ message: "Appointment updated successfully." });
  } catch (err) {
    console.error("Update appointment error:", err);
    return res.status(500).json({ message: "Failed to update appointment." });
  }
}

// DELETE /api/appointments/:id
async function deleteAppointment(req, res) {
  try {
    const [result] = await pool.query("DELETE FROM appointments WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Appointment not found." });
    return res.json({ message: "Appointment cancelled successfully." });
  } catch (err) {
    console.error("Delete appointment error:", err);
    return res.status(500).json({ message: "Failed to cancel appointment." });
  }
}

module.exports = { getAppointments, createAppointment, updateAppointment, deleteAppointment };
