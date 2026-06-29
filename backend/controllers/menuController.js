const Menu = require("../models/Menu");
const Mess = require("../models/Mess");

// Create Menu
exports.createMenu = async (req, res) => {
  try {
    const mess = await Mess.findOne({ owner: req.user.id });

    if (!mess) {
      return res.status(404).json({
        message: "Please create your Mess Profile first",
      });
    }

    const menu = new Menu({
      mess: mess._id,
      day: req.body.day,
      mealType: req.body.mealType,
      foodType: req.body.foodType,
      dishName: req.body.dishName,
      price: req.body.price,
      description: req.body.description,
    });

    await menu.save();

    res.status(201).json(menu);
  } catch (err) {
    console.error("Create Menu Error:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Owner Menu
exports.getMenu = async (req, res) => {
  try {
    const mess = await Mess.findOne({ owner: req.user.id });

    if (!mess) {
      return res.json([]);
    }

    const menus = await Menu.find({ mess: mess._id }).sort({
      createdAt: -1,
    });

    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Menu
exports.deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);

    res.json({
      message: "Menu deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Menu By Mess (User Side)
exports.getMenuByMess = async (req, res) => {
  try {
    const menus = await Menu.find({
      mess: req.params.messId,
    });

    res.json(menus);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Update Menu
exports.updateMenu = async (req, res) => {

  try {

    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      {
        day: req.body.day,
        mealType: req.body.mealType,
        foodType: req.body.foodType,
        dishName: req.body.dishName,
        price: req.body.price,
        description: req.body.description,
      },
      {
        new: true,
      }
    );

    res.json(menu);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

};