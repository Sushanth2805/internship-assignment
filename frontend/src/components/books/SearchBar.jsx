import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { GENRES, SORT_OPTIONS } from "../../utils/helpers";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search: searchTerm, genre, sort });
  };

  const handleReset = () => {
    setSearchTerm("");
    setGenre("");
    setSort("");
    onSearch({ search: "", genre: "", sort: "" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 mb-6 w-full overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <FiSearch className="text-lg text-primary-600 dark:text-primary-400 flex-shrink-0" />
        <h2 className="text-base font-bold text-gray-900 dark:text-white truncate">
          Search & Filter Books
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 w-full">
        {/* Search Input */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Genre Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="input-field cursor-pointer text-sm"
            >
              <option value="">All Genres</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field cursor-pointer text-sm"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex items-end space-x-2">
            <button
              type="submit"
              className="flex-1 btn-primary flex items-center justify-center gap-1.5 text-sm py-2"
            >
              <FiFilter className="text-sm" />
              <span>Apply</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 btn-secondary text-sm py-2"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
