const express = require("express");
const router = express.Router();
const { verifyToken, requireRole } = require("../middleware/auth");
const requestController = require("../controllers/requestController");

// Public: anyone can submit a blood request (RequestBlood.js has no login)
router.get("/", verifyToken, requireRole("Admin"), requestController.getRequests);
router.post("/", requestController.createRequest);
router.put("/:id", verifyToken, requireRole("Admin"), requestController.updateRequest);
router.delete("/:id", verifyToken, requireRole("Admin"), requestController.deleteRequest);

module.exports = router;
