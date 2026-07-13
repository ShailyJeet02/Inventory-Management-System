const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getHelp,
  updateHelp
} = require("../controllers/helpController");


// ====================================
// GET HELP DATA
// ====================================

router.get(
  "/",
  authMiddleware,
  getHelp
);


// ====================================
// UPDATE HELP DATA
// ====================================

router.put(
  "/",
  authMiddleware,
  updateHelp
);


module.exports = router;