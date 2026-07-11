const Setting = require("../models/Setting");

// ==============================
// Get Settings
// ==============================
exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({
      userId: req.user._id,
    });

    // Create default settings if not found
    if (!settings) {
      settings = await Setting.create({
        userId: req.user._id,
        companyName: "InventoryPro",
        email: req.user.email,
        phone: "",
        address: "",
        lowStock: true,
        orderNotification: true,
        emailNotification: true,
        darkMode: false,
      });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error("Get Settings Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch settings",
    });
  }
};

// ==============================
// Update Settings
// ==============================
exports.updateSettings = async (req, res) => {
  try {
    const settings = await Setting.findOneAndUpdate(
      {
        userId: req.user._id,
      },
      {
        ...req.body,
        userId: req.user._id, // userId kabhi change nahi hoga
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Update Settings Error:", error.message);

    res.status(500).json({
      message: "Failed to update settings",
    });
  }
};