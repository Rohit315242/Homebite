require("dotenv").config();

const connectDB = require("../config/db");

const Review = require("../models/Review");
const Subscription = require("../models/Subscription");
const User = require("../models/User");
const Mess = require("../models/Mess");
const comments = [
  "Excellent homemade food.",
  "Very hygienic and tasty.",
  "Affordable monthly mess.",
  "Good quality meals.",
  "Best mess for students.",
  "Fresh food every day.",
  "Loved the lunch.",
  "Dinner quality is amazing.",
  "Worth the money.",
  "Highly recommended.",
  
];
async function seedReviews() {

  try {

    await connectDB();

    await Review.deleteMany({});

    console.log("🗑 Old Reviews Deleted");

    const subscriptions = await Subscription.find()
      .populate("user")
      .populate("mess");

    console.log(
      "Subscriptions :",
      subscriptions.length
    );
        for (const sub of subscriptions) {

      const rating = Math.floor(Math.random() * 2) + 4;
      

      const comment =
        comments[Math.floor(Math.random() * comments.length)];

      try {

        await Review.create({

          user: sub.user._id,

          mess: sub.mess._id,

          rating,

          comment,

        });

      } catch (err) {

      
        console.log(
          `⚠ Review already exists for ${sub.user.name}`
        );

      }

    }

    console.log(
      `✅ ${subscriptions.length} Reviews Created`
    );

    process.exit();

  } catch (err) {

    console.error("❌ Review Seed Error:", err);

    process.exit(1);

  }

}

seedReviews();