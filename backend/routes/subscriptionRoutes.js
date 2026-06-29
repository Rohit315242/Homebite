const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const subscription = require("../controllers/subscriptionController");




router.post("/", auth, subscription.subscribe);


router.get("/my", auth, subscription.getUserSubscriptions);


router.post("/cancel", auth, subscription.cancelSubscription);

router.get("/status/:messId", auth, subscription.checkSubscription);


router.get("/owner", auth, subscription.getOwnerMembers);

module.exports = router;