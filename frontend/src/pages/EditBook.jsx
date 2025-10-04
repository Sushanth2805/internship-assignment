import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import api from "../utils/api";
import ImageUpload from "../components/common/ImageUpload";
import ErrorMessage from "../components/common/ErrorMessage";
import { GENRES } from "../utils/helpers";

const EditBook = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      const book = response.data.data.book;
      setFormData({
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre,
        year: book.year,
        imageUrl: book.imageUrl || "",
      });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch book");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.title ||
      !formData.author ||
      !formData.description ||
      !formData.genre
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      await api.put(`/books/${id}`, formData);
      navigate(`/books/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update book");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full overflow-x-hidden">
      <button
        onClick={() => navigate(`/books/${id}`)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
      >
        <FiArrowLeft />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Edit Book
      </h1>

      {loading ? (
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12">
            <FiLoader className="text-4xl text-primary-600 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading book details...
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card space-y-6">
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
              disabled={submitting}
            />
          </div>

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
              disabled={submitting}
            />
          </div>

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
                disabled={submitting}
              >
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
                disabled={submitting}
              />
            </div>
          </div>

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
              disabled={submitting}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Book Cover
            </label>
            <ImageUpload
              onUploadComplete={(url) =>
                setFormData({ ...formData, imageUrl: url })
              }
              initialValue={formData.imageUrl}
              disabled={submitting}
            />
          </div>

          {error && <ErrorMessage message={error} />}

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Book</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/books/${id}`)}
              className="flex-1 btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditBook;
