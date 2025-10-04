import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiBook,
  FiStar,
  FiEdit2,
  FiTrash2,
  FiLoader,
  FiBookOpen,
} from "react-icons/fi";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import ErrorMessage from "../components/common/ErrorMessage";
import Pagination from "../components/common/Pagination";
import { getInitials, formatDate } from "../utils/helpers";

const Profile = () => {
  const { user } = useAuth();
  const [myBooks, setMyBooks] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("books");

  // Pagination for books
  const [currentBooksPage, setCurrentBooksPage] = useState(1);
  const booksPerPage = 5;

  // Pagination for reviews
  const [currentReviewsPage, setCurrentReviewsPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [booksRes, reviewsRes] = await Promise.all([
        api.get("/books/my/books"),
        api.get("/reviews/my/reviews"),
      ]);
      setMyBooks(booksRes.data.data);
      setMyReviews(reviewsRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await api.delete(`/books/${bookId}`);
      setMyBooks(myBooks.filter((book) => book._id !== bookId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete book");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await api.delete(`/reviews/${reviewId}`);
      setMyReviews(myReviews.filter((review) => review._id !== reviewId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete review");
    }
  };

  // Pagination calculations for books
  const totalBooksPages = Math.ceil(myBooks.length / booksPerPage);
  const indexOfLastBook = currentBooksPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = myBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleBooksPageChange = (page) => {
    setCurrentBooksPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pagination calculations for reviews
  const totalReviewsPages = Math.ceil(myReviews.length / reviewsPerPage);
  const indexOfLastReview = currentReviewsPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = myReviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleReviewsPageChange = (page) => {
    setCurrentReviewsPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full overflow-x-hidden">
      {/* Profile Header */}
      <div className="card mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg ring-4 ring-primary-100 dark:ring-primary-900">
            {getInitials(user.name)}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 break-all">
              {user.email}
            </p>
          </div>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <FiLoader className="text-3xl text-primary-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-primary-600">
                {myBooks.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Books Added
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-primary-600">
                {myReviews.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Reviews Written
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && <ErrorMessage message={error} />}

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("books")}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "books"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <FiBook className="inline mr-2" />
          My Books
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "reviews"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <FiStar className="inline mr-2" />
          My Reviews
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12">
            <FiLoader className="text-4xl text-primary-600 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading your content...
            </p>
          </div>
        </div>
      ) : activeTab === "books" ? (
        <div>
          {myBooks.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                You haven't added any books yet.
              </p>
              <Link to="/books/add" className="btn-primary mt-4 inline-block">
                Add Your First Book
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {currentBooks.map((book) => (
                  <div
                    key={book._id}
                    className="card hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Book Cover */}
                      <Link to={`/books/${book._id}`} className="flex-shrink-0">
                        {book.imageUrl ? (
                          <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-24 h-32 object-cover rounded-lg shadow-md ring-1 ring-gray-200 dark:ring-gray-700 hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-24 h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-md flex items-center justify-center">
                            <FiBookOpen className="text-white text-3xl" />
                          </div>
                        )}
                      </Link>

                      {/* Book Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <Link
                            to={`/books/${book._id}`}
                            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {book.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            by{" "}
                            <span className="font-medium">{book.author}</span>
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="px-2.5 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-medium">
                              {book.genre}
                            </span>
                            <span>{book.year}</span>
                            {book.totalReviews > 0 && (
                              <span>
                                ⭐ {book.averageRating?.toFixed(1) || "0.0"} (
                                {book.totalReviews}{" "}
                                {book.totalReviews === 1 ? "review" : "reviews"}
                                )
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 mt-3">
                          <Link
                            to={`/books/edit/${book._id}`}
                            className="px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <FiEdit2 className="text-sm" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteBook(book._id)}
                            className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <FiTrash2 className="text-sm" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalBooksPages > 1 && (
                <Pagination
                  currentPage={currentBooksPage}
                  totalPages={totalBooksPages}
                  onPageChange={handleBooksPageChange}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <div>
          {myReviews.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                You haven't written any reviews yet.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {currentReviews.map((review) => (
                  <div
                    key={review._id}
                    className="card hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Book Cover */}
                      <Link
                        to={`/books/${review.bookId._id}`}
                        className="flex-shrink-0"
                      >
                        {review.bookId.imageUrl ? (
                          <img
                            src={review.bookId.imageUrl}
                            alt={review.bookId.title}
                            className="w-24 h-32 object-cover rounded-lg shadow-md ring-1 ring-gray-200 dark:ring-gray-700 hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-24 h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-md flex items-center justify-center">
                            <FiBookOpen className="text-white text-3xl" />
                          </div>
                        )}
                      </Link>

                      {/* Review Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/books/${review.bookId._id}`}
                          className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {review.bookId.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                          by{" "}
                          <span className="font-medium">
                            {review.bookId.author}
                          </span>{" "}
                          • {formatDate(review.createdAt)}
                        </p>

                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 font-medium">
                            {review.rating}.0
                          </span>
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
                          {review.reviewText}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 mt-3">
                          <Link
                            to={`/reviews/edit/${review._id}`}
                            state={{ review, bookId: review.bookId._id }}
                            className="px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <FiEdit2 className="text-sm" />
                            Edit Review
                          </Link>
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <FiTrash2 className="text-sm" />
                            Delete Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalReviewsPages > 1 && (
                <Pagination
                  currentPage={currentReviewsPage}
                  totalPages={totalReviewsPages}
                  onPageChange={handleReviewsPageChange}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
