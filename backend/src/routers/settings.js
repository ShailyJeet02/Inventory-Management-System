const express = require("express");
const router = express.Router();

// Make sure this matches your filename: settingController.js not settingsController.js
const { getSettings, updateSettings } = require("../controllers/settingController");

router.get("/", getSettings);
router.put("/", updateSettings);

module.exports = router;
