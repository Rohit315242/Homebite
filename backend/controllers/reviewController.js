const Review = require("../models/Review");
const Mess = require("../models/Mess");


// Add Review

exports.addReview = async (req, res) => {
  try {
    const { messId, rating, comment } = req.body;

    if (!messId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check mess exists
    const mess = await Mess.findById(messId);

    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    // One review per user per mess
    const alreadyReviewed = await Review.findOne({
      user: req.user.id,
      mess: messId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this mess.",
      });
    }

    const review = await Review.create({
      user: req.user.id,
      mess: messId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Get Reviews By Mess

exports.getMessReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      mess: req.params.messId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : (
            reviews.reduce((sum, item) => sum + item.rating, 0) /
            totalReviews
          ).toFixed(1);

    res.json({
      success: true,
      averageRating,
      totalReviews,
      reviews,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Update Review

exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Only review owner
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    res.json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Delete Review

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await review.deleteOne();

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Owner Reviews

exports.getOwnerReviews = async (req, res) => {
  try {

    console.log("\n========== OWNER REVIEWS ==========");
    console.log("Owner ID:", req.user.id);

    // Get all messes of current owner
    const messes = await Mess.find({
      owner: req.user.id,
    }).select("_id name");

    console.log("Owner Messes:", messes);

    const messIds = messes.map((m) => m._id);

    console.log("Mess IDs:", messIds);

    // Get reviews of owner's messes
    const reviews = await Review.find({
      mess: { $in: messIds },
    })
      .populate("user", "name")
      .populate("mess", "name")
      .sort({ createdAt: -1 });

    console.log("Reviews Found:", reviews.length);
    console.log(reviews);

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : Number(
            (
              reviews.reduce(
                (sum, review) => sum + review.rating,
                0
              ) / totalReviews
            ).toFixed(1)
          );

    console.log("Average Rating:", averageRating);
    console.log("===================================\n");

    res.status(200).json({
      success: true,
      averageRating,
      totalReviews,
      reviews,
    });

  } catch (err) {

    console.error("Owner Reviews Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });

  }
};