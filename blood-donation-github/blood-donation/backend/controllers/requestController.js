const pool = require("../config/db");

// GET /api/requests
async function getRequests(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM blood_requests ORDER BY created_at DESC");
    return res.json(rows);
  } catch (err) {
    console.error("Get requests error:", err);
    return res.status(500).json({ message: "Failed to fetch blood requests." });
  }
}

// POST /api/requests  (RequestBlood.js)
async function createRequest(req, res) {
  try {
    const { requesterName, contactNumber, bloodGroup, unitsNeeded, hospital, urgency, notes } = req.body;
    if (!requesterName || !contactNumber || !bloodGroup) {
      return res.status(400).json({ message: "requesterName, contactNumber, and bloodGroup are required." });
    }
    const [result] = await pool.query(
      `INSERT INTO blood_requests (requester_name, contact_number, blood_group, units_needed, hospital, urgency, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [requesterName, contactNumber, bloodGroup, unitsNeeded || 1, hospital || null, urgency || "Medium", notes || null]
    );
    return res.status(201).json({ message: "Blood request submitted successfully.", requestId: result.insertId });
  } catch (err) {
    console.error("Create request error:", err);
    return res.status(500).json({ message: "Failed to submit blood request." });
  }
}

// PUT /api/requests/:id  (admin updates status: Approved / Fulfilled / Rejected)
async function updateRequest(req, res) {
  try {
    const { status, unitsNeeded, notes } = req.body;
    const [result] = await pool.query(
      `UPDATE blood_requests SET
         status = COALESCE(?, status),
         units_needed = COALESCE(?, units_needed),
         notes = COALESCE(?, notes)
       WHERE id = ?`,
      [status, unitsNeeded, notes, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Request not found." });

    // If fulfilled, deduct the units from inventory automatically
    if (status === "Fulfilled") {
      const [[reqRow]] = await pool.query("SELECT blood_group, units_needed FROM blood_requests WHERE id = ?", [req.params.id]);
      if (reqRow) {
        await pool.query(
          "UPDATE blood_inventory SET units_available = GREATEST(0, units_available - ?) WHERE blood_group = ?",
          [reqRow.units_needed, reqRow.blood_group]
        );
      }
    }

    return res.json({ message: "Blood request updated successfully." });
  } catch (err) {
    console.error("Update request error:", err);
    return res.status(500).json({ message: "Failed to update blood request." });
  }
}

// DELETE /api/requests/:id
async function deleteRequest(req, res) {
  try {
    const [result] = await pool.query("DELETE FROM blood_requests WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Request not found." });
    return res.json({ message: "Blood request deleted successfully." });
  } catch (err) {
    console.error("Delete request error:", err);
    return res.status(500).json({ message: "Failed to delete blood request." });
  }
}

module.exports = { getRequests, createRequest, updateRequest, deleteRequest };
