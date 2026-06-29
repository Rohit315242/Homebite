const express = require("express");
const router = express.Router();
const Mess = require("../models/Mess");
const auth = require("../middleware/auth");
const { searchMess } = require("../controllers/messController");


router.get("/search", searchMess);


router.post("/", auth, async (req, res) => {
  try {
    const mess = new Mess({
      name: req.body.name,
      location: req.body.location,
      subscriptionPrice: req.body.subscriptionPrice,
      owner: req.user.id,
    });

    await mess.save();

    res.json(mess);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/owner", auth, async (req, res) => {
const mess = await Mess.findOne({
owner: req.user.id,
});

res.json(mess);
});


router.put("/:id", auth, async (req, res) => {
const mess = await Mess.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);

res.json(mess);
});

module.exports = router;
