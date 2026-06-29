const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  mess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mess",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["paid", "failed", "pending"],
    default: "paid",
  },

  // Razorpay Order ID
  razorpayOrderId: {
    type: String,
    default: "",
  },

  // Razorpay Payment ID
  razorpayPaymentId: {
    type: String,
    default: "",
  },

  date: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Payment", paymentSchema);