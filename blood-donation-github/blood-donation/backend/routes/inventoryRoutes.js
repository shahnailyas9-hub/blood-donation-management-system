const express = require("express");
const router = express.Router();
const { verifyToken, requireRole } = require("../middleware/auth");
const inventoryController = require("../controllers/inventoryController");

router.get("/", verifyToken, inventoryController.getInventory);
router.put("/:bloodGroup", verifyToken, requireRole("Admin"), inventoryController.setInventory);
router.patch("/:bloodGroup/adjust", verifyToken, requireRole("Admin"), inventoryController.adjustInventory);

module.exports = router;
