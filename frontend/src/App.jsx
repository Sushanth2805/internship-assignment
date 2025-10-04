import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Layout
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import AddReview from "./pages/AddReview";
import EditReview from "./pages/EditReview";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden w-full">
            <Navbar />
            <div className="pt-16">
              <Routes>
                {/* Public Routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<BookList />} />
                <Route path="/books/:id" element={<BookDetails />} />

                {/* Protected Routes */}
                <Route
                  path="/books/add"
                  element={
                    <ProtectedRoute>
                      <AddBook />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/books/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditBook />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/books/:id/review"
                  element={
                    <ProtectedRoute>
                      <AddReview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reviews/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditReview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
