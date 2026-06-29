const express = require("express");
const router = express.Router();
const analytics = require("../controllers/analyticsController");
const auth = require("../middleware/auth");


router.get("/", auth, analytics.getStats);

module.exports = router;