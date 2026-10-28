const express = require("express");
const router = express.Router();
const { verifyToken, requireRole } = require("../middleware/auth");
const donorController = require("../controllers/donorController");

router.get("/", verifyToken, requireRole("Admin"), donorController.getAllDonors);
router.get("/:id", verifyToken, donorController.getDonorById);
router.post("/", verifyToken, requireRole("Admin"), donorController.createDonor);
router.put("/:id", verifyToken, requireRole("Admin"), donorController.updateDonor);
router.delete("/:id", verifyToken, requireRole("Admin"), donorController.deleteDonor);

module.exports = router;
