const express = require("express");
const router = express.Router();
const {
  uploadImage,
  uploadMultipleImages,
} = require("../controllers/uploadController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Protected routes
router.post("/", protect, upload.single("image"), uploadImage);
router.post(
  "/multiple",
  protect,
  upload.array("images", 5),
  uploadMultipleImages
);

module.exports = router;

