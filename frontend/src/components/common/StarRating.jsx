import { FiStar } from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
  };

  const stars = [1, 2, 3, 4, 5];

  const renderStar = (position) => {
    const filled = rating >= position;
    const halfFilled = rating >= position - 0.5 && rating < position;

    if (readonly) {
      if (halfFilled) {
        return <FaStarHalfAlt className="text-yellow-500" />;
      }
      return filled ? (
        <FaStar className="text-yellow-500" />
      ) : (
        <FiStar className="text-gray-400" />
      );
    }

    return filled ? (
      <FaStar className="text-yellow-500" />
    ) : (
      <FiStar className="text-gray-400" />
    );
  };

  return (
    <div className={`flex items-center space-x-1 ${sizeClasses[size]}`}>
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          className={`${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          } transition-transform`}
        >
          {renderStar(star)}
        </button>
      ))}
      {readonly && rating > 0 && (
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default StarRating;

