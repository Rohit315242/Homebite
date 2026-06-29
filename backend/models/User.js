const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  location: {
    type: String,
    default: "",
  },

  profileImage: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

// Hash password only if modified
userSchema.pre("save", async function () {

  if (!this.isModified("password")) {

    return;

  }

  this.password = await bcrypt.hash(

    this.password,

    10

  );

});
module.exports = mongoose.model("User", userSchema);