const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a book title"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Please provide author name"],
      trim: true,
      maxlength: [100, "Author name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [2000, "Description cannot be more than 2000 characters"],
    },
    genre: {
      type: String,
      required: [true, "Please provide a genre"],
      enum: [
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Thriller",
        "Romance",
        "Science Fiction",
        "Fantasy",
        "Biography",
        "History",
        "Self-Help",
        "Poetry",
        "Horror",
        "Adventure",
        "Other",
      ],
    },
    year: {
      type: Number,
      required: [true, "Please provide publication year"],
      min: [1000, "Please provide a valid year"],
      max: [new Date().getFullYear(), "Year cannot be in the future"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
bookSchema.index({ title: "text", author: "text" });

module.exports = mongoose.model("Book", bookSchema);

