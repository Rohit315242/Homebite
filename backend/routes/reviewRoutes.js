const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const reviewController = require("../controllers/reviewController");


router.get("/owner/all", auth, reviewController.getOwnerReviews);




router.post("/", auth, reviewController.addReview);


router.put("/:reviewId", auth, reviewController.updateReview);


router.delete("/:reviewId", auth, reviewController.deleteReview);


router.get("/:messId", reviewController.getMessReviews);

module.exports = router;