const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getDashboard } = require("../controllers/dashboardController");

// =====================================
// Dashboard (Single API)
// GET /api/dashboard
// =====================================
router.get("/", authMiddleware, getDashboard);

module.exports = router;