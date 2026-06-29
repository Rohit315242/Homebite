const express = require("express");
const router = express.Router();
const analytics = require("../controllers/analyticsController");
const auth = require("../middleware/auth");

// 🔐 Protected route
router.get("/", auth, analytics.getStats);

module.exports = router;