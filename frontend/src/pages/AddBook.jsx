import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import api from "../utils/api";
import ImageUpload from "../components/common/ImageUpload";
import ErrorMessage from "../components/common/ErrorMessage";
import { GENRES } from "../utils/helpers";

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: new Date().getFullYear(),
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.title ||
      !formData.author ||
      !formData.description ||
      !formData.genre
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/books", formData);
      navigate(`/books/${response.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create book");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full overflow-x-hidden">
      {/* Header */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
      >
        <FiArrowLeft />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Add New Book
      </h1>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter book title"
            disabled={loading}
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter author name"
            disabled={loading}
          />
        </div>

        {/* Genre & Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="input-field"
              disabled={loading}
            >
              <option value="">Select genre</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Publication Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1000"
              max={new Date().getFullYear()}
              className="input-field"
              disabled={loading}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            className="input-field"
            placeholder="Enter book description"
            disabled={loading}
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Book Cover
          </label>
          <ImageUpload
            onUploadComplete={(url) =>
              setFormData({ ...formData, imageUrl: url })
            }
            disabled={loading}
          />
        </div>

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Submit Button */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn-primary flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                <span>Adding Book...</span>
              </>
            ) : (
              <span>Add Book</span>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
