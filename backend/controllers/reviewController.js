const Review = require("../models/Review");
const Book = require("../models/Book");

// Helper function to update book's average rating
const updateBookRating = async (bookId) => {
  const reviews = await Review.find({ bookId });

  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await Book.findByIdAndUpdate(bookId, {
      averageRating: averageRating.toFixed(1),
      totalReviews: reviews.length,
    });
  } else {
    await Book.findByIdAndUpdate(bookId, {
      averageRating: 0,
      totalReviews: 0,
    });
  }
};

// @desc    Get all reviews for a book
// @route   GET /api/reviews/book/:bookId
// @access  Public
exports.getReviewsByBook = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { bookId, rating, reviewText, images } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      bookId,
      userId: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this book",
      });
    }

    // Create review
    const review = await Review.create({
      bookId,
      userId: req.user._id,
      rating,
      reviewText,
      images: images || [],
    });

    // Update book's average rating
    await updateBookRating(bookId);

    const populatedReview = await Review.findById(review._id).populate(
      "userId",
      "name email"
    );

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: populatedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private (Owner only)
exports.updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user is the owner
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this review",
      });
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("userId", "name email");

    // Update book's average rating
    await updateBookRating(review.bookId);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Owner only)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user is the owner
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this review",
      });
    }

    const bookId = review.bookId;

    await Review.findByIdAndDelete(req.params.id);

    // Update book's average rating
    await updateBookRating(bookId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get reviews by logged in user
// @route   GET /api/reviews/my/reviews
// @access  Private
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate("bookId", "title author imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

