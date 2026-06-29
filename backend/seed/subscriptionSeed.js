require("dotenv").config();

const connectDB = require("../config/db");

const User = require("../models/User");
const Mess = require("../models/Mess");
const Subscription = require("../models/Subscription");

async function seedSubscriptions() {

  try {

    await connectDB();

    await Subscription.deleteMany({});

    console.log("🗑 Old Subscriptions Deleted");

    const users = await User.find();

    const messes = await Mess.find();
    console.log(
  messes.map((m) => m.name)
);

    console.log("Users :", users.length);
    console.log("Messes :", messes.length);
     

    const distribution = {
      "Swami Samarth Mess": 3,
      "Annapurna Mess": 2,
      "Sai Krupa Mess": 2,
      "Royal Mess": 1,
      "Food Corner": 1,

      "Aai Mess": 4,
      "Om Sai Mess": 3,
      "Shree Mess": 2,
      "Tasty Tiffin": 1,

      "Baner Home Mess": 2,
      "IT Park Mess": 3,
      "Hadapsar Home Mess": 2,
      "Camp Mess": 2,
      "Pimpri Home Mess": 2,

      "Mumbai Home Mess": 2,
      "Nashik Meals": 2,
      "Nagpur Veg Mess": 2,
      "Kolhapur Meals": 2,
      "Satara Mess": 2,
    };

    let userIndex = 0;

    for (const [messName, memberCount] of Object.entries(distribution)) {

      const mess = messes.find(m => m.name === messName);

      if (!mess) {
        console.log(`❌ Mess Not Found: ${messName}`);
        continue;
      }

      for (let i = 0; i < memberCount; i++) {

        if (userIndex >= users.length) break;

        await Subscription.create({
          user: users[userIndex]._id,
          mess: mess._id,
          plan: "monthly",
          status: "active",
        });

        userIndex++;

      }

    }

    console.log(`✅ ${userIndex} Subscriptions Created`);
        process.exit();

  } catch (err) {

    console.error("❌ Subscription Seed Error:", err);

    process.exit(1);

  }

}

seedSubscriptions();