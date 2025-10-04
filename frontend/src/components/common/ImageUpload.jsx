import { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import api from "../../utils/api";
import Loader from "./Loader";

const ImageUpload = ({
  onUploadComplete,
  multiple = false,
  maxImages = 5,
  disabled = false,
  initialValue = null, // Can be a URL string (single) or array of URLs (multiple)
}) => {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState(() => {
    // Initialize with existing image(s) if provided
    if (initialValue) {
      return Array.isArray(initialValue) ? initialValue : [initialValue];
    }
    return [];
  });

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    if (multiple && files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    setUploading(true);

    try {
      if (multiple) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("images", file);
        });

        const response = await api.post("/upload/multiple", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const urls = response.data.data.map((img) => img.url);
        setPreviews(urls);
        onUploadComplete(urls);
      } else {
        const formData = new FormData();
        formData.append("image", files[0]);

        const response = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const url = response.data.data.url;
        setPreviews([url]);
        onUploadComplete(url);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onUploadComplete(multiple ? newPreviews : "");
  };

  const isDisabled = disabled || uploading;

  return (
    <div className="space-y-4">
      {/* Single Image Upload */}
      {!multiple && (
        <div className="flex items-center justify-center w-full">
          {previews.length === 0 ? (
            // Upload Button (No image yet)
            <label
              className={`w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all duration-200 ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              {uploading ? (
                <div className="text-center py-8">
                  <Loader size="sm" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    Uploading image...
                  </p>
                </div>
              ) : (
                <>
                  <FiUpload className="text-4xl text-gray-400 mb-3" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Click to upload image
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    PNG, JPG, WebP up to 10MB
                  </span>
                </>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isDisabled}
              />
            </label>
          ) : (
            // Image Preview (Image uploaded)
            <div className="relative w-full group">
              <div className="w-full h-80 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 flex items-center justify-center overflow-hidden">
                <img
                  src={previews[0]}
                  alt="Book cover preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center gap-3">
                <label
                  className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg font-semibold text-sm ${
                    isDisabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {uploading ? "Uploading..." : "Change Image"}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isDisabled}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeImage(0)}
                  disabled={disabled}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Multiple Images Upload */}
      {multiple && (
        <div className="space-y-4">
          {/* Grid with images and upload button */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Existing Images */}
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative aspect-square group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-primary-500 dark:hover:ring-primary-500"
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={disabled}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 active:scale-95"
                    title="Remove image"
                  >
                    <FiX className="text-lg" />
                  </button>
                </div>
                {/* Image number badge */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-black bg-opacity-60 text-white text-xs font-bold rounded-md">
                  {index + 1}
                </div>
              </div>
            ))}

            {/* Upload Button Card - Only show if under max limit */}
            {previews.length < maxImages && (
              <label
                className={`aspect-square flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all duration-300 ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 hover:from-primary-50 hover:to-primary-100 dark:hover:from-primary-900/20 dark:hover:to-primary-800/20 hover:shadow-lg hover:scale-105 active:scale-95"
                }`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader size="sm" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Uploading...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                      <FiUpload className="text-2xl text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="text-center px-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">
                        Add Image
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 block">
                        {previews.length}/{maxImages}
                      </span>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple={multiple}
                  onChange={handleFileChange}
                  disabled={isDisabled}
                />
              </label>
            )}
          </div>

          {/* Info text */}
          {previews.length === 0 && !uploading && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Click to add up to {maxImages} images
            </p>
          )}
          {previews.length > 0 && previews.length < maxImages && !uploading && (
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              {previews.length} of {maxImages} images added. Click the card to
              add more.
            </p>
          )}
          {previews.length === maxImages && (
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>
              Maximum {maxImages} images reached. Remove an image to add more.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
