const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

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

  date: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ["present"],
    default: "present",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

// One Attendance Per User Per Day Per Mess
attendanceSchema.index(
  {
    user: 1,
    mess: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);