const cloudinary = require("../config/cloudinary");

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to Cloudinary with proper configuration
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "book-review-platform",
      resource_type: "auto",
      upload_preset: undefined, // Use signed upload
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload image to Cloudinary",
    });
  }
};

// @desc    Upload multiple images to Cloudinary
// @route   POST /api/upload/multiple
// @access  Private
exports.uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    const uploadPromises = req.files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "book-review-platform",
        resource_type: "auto",
        upload_preset: undefined, // Use signed upload
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: uploadedImages,
    });
  } catch (error) {
    console.error("Cloudinary multiple upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload images to Cloudinary",
    });
  }
};
