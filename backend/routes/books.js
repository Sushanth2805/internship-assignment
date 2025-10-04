const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getMyBooks,
} = require("../controllers/bookController");
const { protect } = require("../middleware/auth");

// Public routes
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Protected routes
router.post("/", protect, createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);
router.get("/my/books", protect, getMyBooks);

module.exports = router;

