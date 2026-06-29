const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const aiController = require("../controllers/aiController");


// AI Nutrition Chat


router.post(
  "/chat",
  auth,
  aiController.chat
);

module.exports = router;