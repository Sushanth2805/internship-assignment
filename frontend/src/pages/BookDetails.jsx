import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  FiUser,
  FiCalendar,
  FiArrowLeft,
  FiLoader,
} from "react-icons/fi";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import StarRating from "../components/common/StarRating";
import ReviewCard from "../components/reviews/ReviewCard";
import RatingChart from "../components/reviews/RatingChart";
import ErrorMessage from "../components/common/ErrorMessage";
import { formatDate } from "../utils/helpers";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get(`/books/${id}`);
      setBookData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch book details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      setDeleting(true);
      await api.delete(`/books/${id}`);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete book");
      setDeleting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await api.delete(`/reviews/${reviewId}`);
      fetchBookDetails(); // Refresh to update rating
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full overflow-x-hidden">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 
        hover:text-primary-600 dark:hover:text-primary-400 
        font-semibold mb-6 group transition-all duration-200
        px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
        <span>Back to books</span>
      </button>

      {loading ? (
        <div className="card">
          <div className="flex flex-col items-center justify-center py-16">
            <FiLoader className="text-5xl text-primary-600 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Loading book details...
            </p>
          </div>
        </div>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : !bookData ? null : (
        <>
          {(() => {
            const { book, reviews } = bookData;
            const isOwner = user && book.addedBy?._id === user._id;
            const hasReviewed = reviews.some(
              (r) => r.userId?._id === user?._id
            );

            return (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Book Info */}
                <div className="lg:col-span-2">
                  <div className="card">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Book Cover */}
                      <div className="flex-shrink-0">
                        {book.imageUrl ? (
                          <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-full sm:w-48 h-72 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full sm:w-48 h-72 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-6xl font-bold">
                              {book.title.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Book Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words">
                              {book.title}
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mt-2">
                              by {book.author}
                            </p>
                          </div>
                          <span className="self-start px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full whitespace-nowrap">
                            {book.genre}
                          </span>
                        </div>

                        <div className="mt-4">
                          <StarRating
                            rating={book.averageRating || 0}
                            readonly
                            size="lg"
                          />
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {book.totalReviews}{" "}
                            {book.totalReviews === 1 ? "review" : "reviews"}
                          </p>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mt-6 leading-relaxed">
                          {book.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <FiCalendar />
                            <span>Published: {book.year}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FiUser />
                            <span>
                              Added by: {book.addedBy?.name || "Unknown"}
                            </span>
                          </div>
                        </div>

                        {/* Actions (for owner) */}
                        {isOwner && (
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
                            <Link
                              to={`/books/edit/${book._id}`}
                              className="btn-primary flex items-center justify-center space-x-2"
                            >
                              <FiEdit2 />
                              <span>Edit</span>
                            </Link>
                            <button
                              onClick={handleDelete}
                              disabled={deleting}
                              className="btn-danger flex items-center justify-center space-x-2"
                            >
                              <FiTrash2 />
                              <span>{deleting ? "Deleting..." : "Delete"}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <div className="mt-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        Reviews ({reviews.length})
                      </h2>
                      {isAuthenticated && !hasReviewed && (
                        <Link
                          to={`/books/${book._id}/review`}
                          className="btn-primary w-full sm:w-auto text-center"
                        >
                          Write a Review
                        </Link>
                      )}
                    </div>

                    {reviews.length === 0 ? (
                      <div className="card text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400">
                          No reviews yet. Be the first to review!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <ReviewCard
                            key={review._id}
                            review={review}
                            onEdit={(review) =>
                              navigate(`/reviews/edit/${review._id}`, {
                                state: { review, bookId: book._id },
                              })
                            }
                            onDelete={handleDeleteReview}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <RatingChart reviews={reviews} />
                </div>
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
};

export default BookDetails;
