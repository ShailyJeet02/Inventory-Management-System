const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingController");

// Get Logged In User Settings
router.get("/", authMiddleware, getSettings);

// Update Logged In User Settings
router.put("/", authMiddleware, updateSettings);

module.exports = router;