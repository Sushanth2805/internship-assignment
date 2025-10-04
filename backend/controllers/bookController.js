const Book = require("../models/Book");
const Review = require("../models/Review");

// @desc    Get all books with pagination, search, filter, sort
// @route   GET /api/books
// @access  Public
exports.getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Search by title or author
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { author: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Filter by genre
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    // Sort options
    let sort = { createdAt: -1 }; // Default: newest first
    if (req.query.sort === "year") {
      sort = { year: -1 };
    } else if (req.query.sort === "rating") {
      sort = { averageRating: -1 };
    } else if (req.query.sort === "title") {
      sort = { title: 1 };
    }

    // Execute query with case-insensitive sorting for titles
    let booksQuery = Book.find(query)
      .populate("addedBy", "name email")
      .sort(sort)
      .limit(limit)
      .skip(skip);

    // Apply collation for case-insensitive title sorting
    if (req.query.sort === "title") {
      booksQuery = booksQuery.collation({ locale: "en", strength: 2 });
    }

    const books = await booksQuery;

    // Get total count for pagination
    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "addedBy",
      "name email"
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Get reviews for this book
    const reviews = await Review.find({ bookId: req.params.id })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        book,
        reviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a new book
// @route   POST /api/books
// @access  Private
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, genre, year, imageUrl } = req.body;

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      year,
      imageUrl,
      addedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private (Owner only)
exports.updateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user is the owner
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this book",
      });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private (Owner only)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user is the owner
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this book",
      });
    }

    // Delete all reviews for this book
    await Review.deleteMany({ bookId: req.params.id });

    // Delete the book
    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Book and associated reviews deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get books added by logged in user
// @route   GET /api/books/my/books
// @access  Private
exports.getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ addedBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
