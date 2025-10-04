import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import api from "../utils/api";
import StarRating from "../components/common/StarRating";
import ErrorMessage from "../components/common/ErrorMessage";

const EditReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state?.bookId;

  const [formData, setFormData] = useState({
    rating: location.state?.review?.rating || 0,
    reviewText: location.state?.review?.reviewText || "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!formData.reviewText.trim()) {
      setError("Please write a review");
      return;
    }

    setLoading(true);

    try {
      await api.put(`/reviews/${id}`, formData);
      navigate(`/books/${bookId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update review");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full overflow-x-hidden">
      <button
        onClick={() => navigate(`/books/${bookId}`)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
      >
        <FiArrowLeft />
        <span>Back to book</span>
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Edit Review
      </h1>

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Rating <span className="text-red-500">*</span>
          </label>
          <StarRating
            rating={formData.rating}
            onRatingChange={(rating) => setFormData({ ...formData, rating })}
            size="lg"
            readonly={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.reviewText}
            onChange={(e) =>
              setFormData({ ...formData, reviewText: e.target.value })
            }
            rows="6"
            className="input-field"
            maxLength="1000"
            disabled={loading}
          ></textarea>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formData.reviewText.length}/1000 characters
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn-primary flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <span>Update Review</span>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/books/${bookId}`)}
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

export default EditReview;
