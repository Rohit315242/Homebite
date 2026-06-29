const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
      required: true,
    },

    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },

    mealType: {
      type: String,
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner"],
    },

    foodType: {
      type: String,
      required: true,
      enum: ["Veg", "Non-Veg"],
    },

    dishName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", menuSchema);