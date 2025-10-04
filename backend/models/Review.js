const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    reviewText: {
      type: String,
      required: [true, "Please provide review text"],
      maxlength: [1000, "Review text cannot be more than 1000 characters"],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 5;
        },
        message: "Cannot upload more than 5 images per review",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one review per user per book
reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);

