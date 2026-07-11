const express = require("express");

const router = express.Router();

const {
    getStats,
    getRevenueChart,
    getActivity
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");


// Dashboard stats
router.get(
    "/stats",
    authMiddleware,
    getStats
);


// Revenue chart
router.get(
    "/revenue-chart",
    authMiddleware,
    getRevenueChart
);


// Recent activity
router.get(
    "/activity",
    authMiddleware,
    getActivity
);


module.exports = router;