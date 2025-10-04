import { Link } from "react-router-dom";
import { FiUser, FiCalendar, FiBookOpen } from "react-icons/fi";
import StarRating from "../common/StarRating";
import { truncateText, getGenreColor } from "../../utils/helpers";

const BookCard = ({ book }) => {
  // Capitalize first letter of each word in title
  const formatTitle = (title) => {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <Link
      to={`/books/${book._id}`}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl 
      transition-all duration-300 overflow-hidden group 
      border border-gray-200 dark:border-gray-700 
      hover:border-primary-400 dark:hover:border-primary-600
      hover:-translate-y-1 hover:scale-[1.01] w-full"
    >
      <div className="flex flex-col sm:flex-row gap-6 p-6">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          {book.imageUrl ? (
            <div className="relative overflow-hidden rounded-lg shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full sm:w-40 h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div
              className="w-full sm:w-40 h-56 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 
            rounded-lg shadow-xl ring-1 ring-primary-400 dark:ring-primary-600
            flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
            >
              <div className="text-center">
                <FiBookOpen className="text-white text-4xl mx-auto mb-2 opacity-90" />
                <span className="text-white text-5xl font-bold drop-shadow-2xl">
                  {book.title.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header with Title and Badge */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3
                className="text-2xl font-extrabold text-gray-900 dark:text-white 
              group-hover:text-primary-600 dark:group-hover:text-primary-400 
              transition-colors duration-200 leading-tight mb-1 tracking-tight"
              >
                {formatTitle(book.title)}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                by{" "}
                <span className="text-gray-800 dark:text-gray-300">
                  {book.author}
                </span>
              </p>
            </div>
            <span
              className={`flex-shrink-0 px-3 py-1.5 text-xs font-bold tracking-wide rounded-full border shadow-md 
              group-hover:shadow-lg transition-shadow duration-200
              ${getGenreColor(book.genre)}`}
            >
              {book.genre}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {truncateText(book.description, 150)}
          </p>

          {/* Metadata */}
          <div className="flex items-center flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-1.5">
              <FiCalendar className="text-primary-500" />
              <span className="font-medium">{book.year}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <FiUser className="text-primary-500" />
              <span className="font-medium">
                {book.addedBy?.name || "Unknown"}
              </span>
            </div>
          </div>

          {/* Rating Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <StarRating rating={book.averageRating || 0} readonly size="sm" />
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                {book.totalReviews || 0}
              </span>{" "}
              {book.totalReviews === 1 ? "review" : "reviews"}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Indicator */}
      <div
        className="h-1.5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 
      transform scale-x-0 group-hover:scale-x-100 
      transition-transform duration-500 origin-left
      shadow-lg shadow-primary-500/50"
      ></div>
    </Link>
  );
};

export default BookCard;
