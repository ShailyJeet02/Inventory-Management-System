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
      default: "",
    },

    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "purple",
    },

    time: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);