const express = require("express");
const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");


// ========================
// REGISTER API
// ========================
router.post("/register", register);


// ========================
// LOGIN API
// ========================
router.post("/login", login);


// (optional test route for debugging)
router.get("/test", (req, res) => {
    res.send("Auth routes working");
});

module.exports = router;