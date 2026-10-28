const pool = require("../config/db");

// GET /api/inventory
async function getInventory(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM blood_inventory ORDER BY blood_group");
    return res.json(rows);
  } catch (err) {
    console.error("Get inventory error:", err);
    return res.status(500).json({ message: "Failed to fetch inventory." });
  }
}

// PUT /api/inventory/:bloodGroup  (set an exact unit count)
async function setInventory(req, res) {
  try {
    const { unitsAvailable } = req.body;
    if (unitsAvailable == null || unitsAvailable < 0) {
      return res.status(400).json({ message: "unitsAvailable must be a non-negative number." });
    }
    const [result] = await pool.query(
      "UPDATE blood_inventory SET units_available = ? WHERE blood_group = ?",
      [unitsAvailable, req.params.bloodGroup]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Blood group not found." });
    return res.json({ message: "Inventory updated successfully." });
  } catch (err) {
    console.error("Set inventory error:", err);
    return res.status(500).json({ message: "Failed to update inventory." });
  }
}

// PATCH /api/inventory/:bloodGroup/adjust  (increment/decrement by delta)
async function adjustInventory(req, res) {
  try {
    const { delta } = req.body; // e.g. +1 after a donation, -1 after fulfilling a request
    if (typeof delta !== "number") {
      return res.status(400).json({ message: "delta must be a number." });
    }
    const [result] = await pool.query(
      "UPDATE blood_inventory SET units_available = GREATEST(0, units_available + ?) WHERE blood_group = ?",
      [delta, req.params.bloodGroup]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Blood group not found." });
    return res.json({ message: "Inventory adjusted successfully." });
  } catch (err) {
    console.error("Adjust inventory error:", err);
    return res.status(500).json({ message: "Failed to adjust inventory." });
  }
}

module.exports = { getInventory, setInventory, adjustInventory };
