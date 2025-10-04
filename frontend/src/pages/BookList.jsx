import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import api from "../utils/api";
import BookCard from "../components/books/BookCard";
import SearchBar from "../components/books/SearchBar";
import Pagination from "../components/common/Pagination";
import Loader from "../components/common/Loader";
import Error from "../components/common/ErrorMessage";
import { useAuth } from "../context/AuthContext";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    genre: "",
    sort: "",
  });

  const { isAuthenticated } = useAuth();

  const fetchBooks = async (page = 1, filterParams = filters) => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit: 5,
        ...filterParams,
      };

      const response = await api.get("/books", { params });
      setBooks(response.data.data);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    fetchBooks(1, newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBooks(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Discover Books
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
            Explore our collection of books and reviews
          </p>
        </div>
        {isAuthenticated && (
          <Link
            to="/books/add"
            className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <FiPlus className="text-lg" />
            <span>Add Book</span>
          </Link>
        )}
      </div>

      {/* Search & Filters */}
      <SearchBar onSearch={handleSearch} />

      {/* Error Message */}
      {error && <Error message={error} />}

      {/* Loading */}
      {loading ? (
        <Loader />
      ) : books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No books found. {isAuthenticated && "Be the first to add one!"}
          </p>
        </div>
      ) : (
        <>
          {/* Books Grid */}
          <div className="space-y-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default BookList;
