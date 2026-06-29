const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");

const Owner = require("../models/Owner");
const Mess = require("../models/Mess");
const Menu = require("../models/Menu");

const dataset = require("./dataset");
const { vegLunchMenus, vegDinnerMenus, nonVegLunchMenus, nonVegDinnerMenus,} = require("./menuData");



function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice() {
  return Math.floor(Math.random() * (4500 - 2500 + 1)) + 2500;
}

function randomFoodPrice() {
  return Math.floor(Math.random() * (140 - 60 + 1)) + 60;
}

function randomEmail(messName, area) {
  return (
    messName
      .toLowerCase()
      .replace(/mess/g, "")
      .replace(/[^a-z0-9]/g, "") +
    "." +
    area.toLowerCase().replace(/\s/g, "") +
    "@gmail.com"
  );
}

const descriptions = [
  "Pure Veg Maharashtrian meals.",
  "Affordable monthly mess for students.",
  "Healthy homemade food.",
  "Unlimited lunch & dinner.",
  "Fresh and hygienic meals.",
];

function randomDescription() {
  return randomItem(descriptions);
}



async function createMenu(messId, foodType) {

  const option = Math.floor(Math.random() * 2);

  let lunchDish;
  let dinnerDish;

  if (foodType === "Veg") {
    lunchDish = randomItem(vegLunchMenus);
    dinnerDish = randomItem(vegDinnerMenus);
  } else {
    lunchDish = randomItem(nonVegLunchMenus);
    dinnerDish = randomItem(nonVegDinnerMenus);
  }

  // 0 = Lunch
  if (option === 0) {

    await Menu.create({
      mess: messId,
      day: "Tuesday",
      mealType: "Lunch",
      foodType: foodType,
      dishName: lunchDish,
      price: randomFoodPrice(),
      description: "Fresh Homemade Lunch",
    });

  }

  // 1 = Dinner
  else {

    await Menu.create({
      mess: messId,
      day: "Tuesday",
      mealType: "Dinner",
      foodType: foodType,
      dishName: dinnerDish,
      price: randomFoodPrice(),
      description: "Fresh Homemade Dinner",
    });

  }

}



async function createOwnerAndMess(messName, area, city, foodType) {

  const owner = await Owner.create({
    name: messName,
    email: randomEmail(messName, area),
    password: "owner123",
  });

  const mess = await Mess.create({
    name: messName,
    location: `${area}, ${city}`,
    subscriptionPrice: randomPrice(),
    description: randomDescription(),
    owner: owner._id,
  });

  await createMenu(mess._id, foodType);

  return mess;
}

async function startSeed() {
  try {
    await connectDB();

    // Clear old data
    await Menu.deleteMany({});
    await Mess.deleteMany({});
    await Owner.deleteMany({});

    console.log("🗑 Old Data Deleted");

    for (const item of dataset) 
  try {
    await createOwnerAndMess(
      item.mess,
      item.area,
      item.city,
      item.foodType
    );

    console.log("✅", item.mess);

  } catch (err) {

    console.log("❌ Failed :", item.mess);
    console.log(err.message);

  
  }

    console.log(`✅ ${dataset.length} Messes Created`);
    console.log("✅ Database Seeding Completed Successfully");

    process.exit();

  } catch (err) {

    console.error("❌ Seed Error:", err);
    process.exit(1);

  }
}

startSeed();