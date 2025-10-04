const express = require("express");
const router = express.Router();
const {
  getReviewsByBook,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/auth");

// Public routes
router.get("/book/:bookId", getReviewsByBook);

// Protected routes
router.post("/", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);
router.get("/my/reviews", protect, getMyReviews);

module.exports = router;

