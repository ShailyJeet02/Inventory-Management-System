const express = require("express");
const router = express.Router();

const {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    restoreUser
} = require("../controllers/userController");

// GET ALL USERS
router.get(
    "/",
    getUsers
);

// ADD USER
router.post(
    "/",
    addUser
);

// UPDATE USER
router.put(
    "/:id",
    updateUser
);

// DELETE USER
router.delete(
    "/:id",
    deleteUser
);

// RESTORE USER
router.post(
    "/restore-user",
    restoreUser
);

module.exports = router;
