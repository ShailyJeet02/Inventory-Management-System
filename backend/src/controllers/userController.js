const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ==========================
// GET ALL USERS
// ==========================
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({
                createdAt: -1
            });

        res.status(200).json(users);
    } catch (error) {
        console.log("Get Users Error:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// ==========================
// CREATE USER
// ==========================
const addUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            status
        } = req.body;

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "Staff",
            status: status || "Active"
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        console.log("Add User Error:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// ==========================
// UPDATE USER
// ==========================
const updateUser = async (req, res) => {
    try {
        const {
            name,
            email,
            role,
            status
        } = req.body;

        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.status = status || user.status;

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        console.log("Update User Error:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// ==========================
// DELETE USER
// ==========================
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.log("Delete User Error:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// ==========================
// RESTORE DELETED USER
// ==========================
const restoreUser = async (req, res) => {
    try {
        const {
            _id,
            name,
            email,
            password,
            role,
            status
        } = req.body;

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await User.create({
            _id,
            name,
            email,
            password: await bcrypt.hash(
                password,
                10
            ),
            role: role || "Staff",
            status: status || "Active"
        });

        res.status(201).json({
            message: "User restored successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        console.log("Restore User Error:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    restoreUser
};
