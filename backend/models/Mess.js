const mongoose = require("mongoose");

const messSchema = new mongoose.Schema({
  name: String,
  location: String,

  subscriptionPrice: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
  },
});

module.exports = mongoose.model("Mess", messSchema);