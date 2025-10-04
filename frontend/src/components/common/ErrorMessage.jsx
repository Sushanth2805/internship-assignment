import { FiAlertCircle } from "react-icons/fi";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start space-x-3">
      <FiAlertCircle className="text-red-600 dark:text-red-400 text-xl mt-0.5 flex-shrink-0" />
      <p className="text-red-800 dark:text-red-300">{message}</p>
    </div>
  );
};

export default ErrorMessage;

