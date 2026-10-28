const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const appointmentController = require("../controllers/appointmentController");

router.get("/", verifyToken, appointmentController.getAppointments);
router.post("/", verifyToken, appointmentController.createAppointment);
router.put("/:id", verifyToken, appointmentController.updateAppointment);
router.delete("/:id", verifyToken, appointmentController.deleteAppointment);

module.exports = router;
