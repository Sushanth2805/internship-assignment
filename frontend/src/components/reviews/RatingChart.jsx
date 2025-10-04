import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const RatingChart = ({ reviews }) => {
  const { darkMode } = useTheme();

  // Calculate rating distribution
  const distribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating: `${rating} ★`,
    count: reviews.filter((r) => r.rating === rating).length,
  }));

  if (reviews.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        No reviews yet
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Rating Distribution
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={distribution}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />
          <XAxis
            dataKey="rating"
            stroke={darkMode ? "#9ca3af" : "#6b7280"}
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke={darkMode ? "#9ca3af" : "#6b7280"}
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
              borderRadius: "0.5rem",
              color: darkMode ? "#f3f4f6" : "#111827",
            }}
          />
          <Bar dataKey="count" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;

