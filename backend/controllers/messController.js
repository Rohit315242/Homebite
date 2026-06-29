const Mess = require("../models/Mess");

// 🔍 SEARCH MESS (FINAL)
exports.searchMess = async (req, res) => {
  try {
    const { search } = req.query;

    
    if (!search || search.trim() === "") {
      const allMess = await Mess.find();
      return res.json(allMess);
    }

   
    const messes = await Mess.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ],
    });

    res.json(messes);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ➕ CREATE MESS
exports.createMess = async (req, res) => {
  try {
    const { name, location, subscriptionPrice } = req.body;

    if (!name || !location || !subscriptionPrice) {
      return res.status(400).json({
        message: "Name, location and price required",
      });
    }

    const mess = new Mess({
      name,
      location,
      subscriptionPrice,
      owner: req.user?.id,
    });

    await mess.save();

    res.json(mess);
  } catch (err) {
    console.error("Create Mess Error:", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};