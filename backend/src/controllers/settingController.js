const Setting = require("../models/Setting");



// ========================================
// GET SETTINGS
// ========================================

const getSettings = async (req, res) => {

  try {

    const userId = req.user._id || req.user.id || req.user.userId;

    let settings = await Setting.findOne({
      userId
    });

    // First Time Login
    if (!settings) {

      settings = await Setting.create({

        userId,

        lowStock: true,
        autoStockUpdate: true,
        barcodeEnabled: false,
        allowNegativeStock: false,

        roleManagement: true,
        allowStaffCreate: true,
        allowStaffEdit: true,
        allowStaffDelete: false,

        twoFactorAuth: false,
        passwordExpiry: false,
        sessionTimeout: true,
        loginHistory: true,

        emailNotification: true,
        orderNotification: true,
        supplierNotification: true,
        lowStockNotification: true,

        darkMode: false

      });

    }

    res.status(200).json(settings);

  }

  catch (error) {

    console.log("GET SETTINGS ERROR :", error);

    res.status(500).json({

      message: error.message

    });

  }

};



// ========================================
// UPDATE SETTINGS
// ========================================

const updateSettings = async (req, res) => {

  try {

    const userId = req.user._id || req.user.id || req.user.userId;

    const settings = await Setting.findOneAndUpdate(

      {
        userId
      },

      req.body,

      {

        new: true,

        upsert: true,

        runValidators: true

      }

    );

    res.status(200).json({

      message: "Settings Updated Successfully",

      settings

    });

  }

  catch (error) {

    console.log("UPDATE SETTINGS ERROR :", error);

    res.status(500).json({

      message: error.message

    });

  }

};





module.exports = {

  getSettings,

  updateSettings

};