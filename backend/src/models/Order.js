const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderType: {
      type: String,
      enum: ["sales", "purchase"],
      required: true,
    },

    customer: {
      type: String,
      required: true,
      trim: true,
    },

    // Date should be Date type for Dashboard & Reports
    date: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Completed", "Pending", "Cancelled"],
      default: "Pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);