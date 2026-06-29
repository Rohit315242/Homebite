require("dotenv").config();

const connectDB = require("../config/db");

const User = require("../models/User");

const userData = require("./userData");

async function seedUsers() {

  try {

    await connectDB();

    await User.deleteMany({});

    console.log("🗑 Old Users Deleted");

    for (const user of userData) {

      await User.create({

        name: user.name,

        email: user.email,

        password: "user123",

        phone: "9876543210",

        address: "Pune",

        location: "Pune",

      });

    }

    console.log(`✅ ${userData.length} Users Created`);

    process.exit();

  }

  catch (err) {

    console.log(err);

    process.exit(1);

  }

}

seedUsers();