import { FiEdit2, FiTrash2, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import StarRating from "../common/StarRating";
import { formatDate, getInitials } from "../../utils/helpers";

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user && review.userId?._id === user._id;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-shadow duration-200">
      {/* User Info */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 
          shadow-md flex items-center justify-center text-white font-bold text-sm flex-shrink-0
          ring-2 ring-primary-100 dark:ring-primary-900"
          >
            {getInitials(review.userId?.name || "Unknown")}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {review.userId?.name || "Unknown User"}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        {/* Actions (only for owner) */}
        {isOwner && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(review)}
              className="p-2.5 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 
              rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
              title="Edit review"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={() => onDelete(review._id)}
              className="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 
              rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
              title="Delete review"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mt-3">
        <StarRating rating={review.rating} readonly size="sm" />
      </div>

      {/* Review Text */}
      <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
        {review.reviewText}
      </p>
    </div>
  );
};

export default ReviewCard;
