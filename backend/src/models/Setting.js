const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },

  // Inventory Settings
  lowStock: {
    type: Boolean,
    default: true
  },

  autoStockUpdate: {
    type: Boolean,
    default: true
  },

  barcodeEnabled: {
    type: Boolean,
    default: false
  },

  allowNegativeStock: {
    type: Boolean,
    default: false
  },

  // User Permissions
  roleManagement: {
    type: Boolean,
    default: true
  },

  allowStaffCreate: {
    type: Boolean,
    default: true
  },

  allowStaffEdit: {
    type: Boolean,
    default: true
  },

  allowStaffDelete: {
    type: Boolean,
    default: false
  },

  // Security
  twoFactorAuth: {
    type: Boolean,
    default: false
  },

  passwordExpiry: {
    type: Boolean,
    default: false
  },

  sessionTimeout: {
    type: Boolean,
    default: true
  },

  loginHistory: {
    type: Boolean,
    default: true
  },

  // Notifications
  emailNotification: {
    type: Boolean,
    default: true
  },

  orderNotification: {
    type: Boolean,
    default: true
  },

  supplierNotification: {
    type: Boolean,
    default: true
  },

  lowStockNotification: {
    type: Boolean,
    default: true
  },

  // Appearance
  darkMode: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Setting", settingSchema);