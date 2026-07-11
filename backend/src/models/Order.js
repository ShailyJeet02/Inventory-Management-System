const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({

    orderType: {
        type: String,
        enum: ["sales", "purchase"],
        required: true
    },

    customer: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },


    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


}, {
    timestamps: true
});


module.exports = mongoose.model(
    "Order",
    orderSchema
);