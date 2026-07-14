const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "product",
        "order",
        "supplier",
        "user"
      ],
      default: "order",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      default: "",
      trim: true,
    },

    color: {
      type: String,
      default: "purple",
    },

    time: {
      type: String,
      default: "Just now",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);