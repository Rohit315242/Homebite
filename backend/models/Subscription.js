const mongoose = require("mongoose");

const schema = new mongoose.Schema({
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
  plan: {
    type: String,
    default: "monthly", 
  },
  status: {
    type: String,
    default: "active", 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscription", schema);