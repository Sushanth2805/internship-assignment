# 📚 Book Review Platform

A professional full-stack MERN application for managing and reviewing books with authentication, image uploads, and advanced search features.

![Book Review Platform](https://img.shields.io/badge/MERN-Stack-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

### ✅ Live Application

**🌐 Frontend:** [https://internship-assignment-lilac.vercel.app](https://internship-assignment-lilac.vercel.app)

**🔧 Backend API:** [https://book-review-platform-backend-a8d0.onrender.com](https://book-review-platform-backend-a8d0.onrender.com)

**📡 API Base URL:** [https://book-review-platform-backend-a8d0.onrender.com/api](https://book-review-platform-backend-a8d0.onrender.com/api)

## 🚀 Features

### Core Features

- ✅ **User Authentication** (Signup/Login with JWT)
- ✅ **Book Management** (CRUD with image upload)
- ✅ **Review System** (Ratings, text reviews)
- ✅ **Search & Filter** (by title, author, genre)
- ✅ **Pagination** (5 books per page)
- ✅ **Image Upload** (Cloudinary integration)
- ✅ **Responsive UI** (Tailwind CSS)

### Bonus Features

- ✅ **Dark/Light Mode** (Theme toggle)
- ✅ **Rating Charts** (Visual distribution)
- ✅ **User Profile** (Personal dashboard)
- ✅ **Real-time Search** (Live filtering)
- ✅ **Advanced Sorting** (Multiple criteria)
- ✅ **Professional UI** (Modern design)

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Recharts** - Chart library for rating visualization
- **Vite** - Build tool

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File upload middleware

## 📦 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB Atlas** account
- **Cloudinary** account
- **Git**

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd internship_assignment
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
touch .env
```

**Configure `.env` file:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

**Start backend server:**

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file
touch .env
```

**Configure `.env` file:**

```env
VITE_API_URL=http://localhost:5000/api
```

**Start frontend development server:**

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. User Signup

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Access:** Public

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. User Login

- **URL:** `/auth/login`
- **Method:** `POST`
- **Access:** Public

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Get Current User

- **URL:** `/auth/me`
- **Method:** `GET`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`

### Book Endpoints

#### 1. Get All Books

- **URL:** `/books`
- **Method:** `GET`
- **Access:** Public

**Query Parameters:**

- `page` (default: 1)
- `limit` (default: 5)
- `search` (searches in title and author)
- `genre` (Fiction, Mystery, Romance, etc.)
- `sort` (year, rating, title)

**Example:** `/books?page=1&limit=5&search=Harry&genre=Fantasy&sort=rating`

**Success Response (200):**

```json
{
  "success": true,
  "count": 5,
  "total": 23,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "64abc456...",
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book description...",
      "genre": "Fiction",
      "year": 2023,
      "imageUrl": "https://cloudinary.com/...",
      "averageRating": 4.5,
      "totalReviews": 10,
      "addedBy": {
        "_id": "64abc123...",
        "name": "John Doe"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 2. Get Single Book

- **URL:** `/books/:id`
- **Method:** `GET`
- **Access:** Public

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "book": {
      "_id": "64abc456...",
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book description...",
      "genre": "Fiction",
      "year": 2023,
      "imageUrl": "https://cloudinary.com/...",
      "averageRating": 4.5,
      "totalReviews": 10,
      "addedBy": {
        "_id": "64abc123...",
        "name": "John Doe"
      }
    },
    "reviews": [
      {
        "_id": "64abc789...",
        "rating": 5,
        "reviewText": "Great book!",
        "userId": {
          "_id": "64abc123...",
          "name": "Jane Doe"
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

#### 3. Create Book

- **URL:** `/books`
- **Method:** `POST`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "title": "New Book",
  "author": "Author Name",
  "description": "Book description...",
  "genre": "Fiction",
  "year": 2023,
  "imageUrl": "https://cloudinary.com/..."
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

#### 4. Update Book

- **URL:** `/books/:id`
- **Method:** `PUT`
- **Access:** Private (Owner only)
- **Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### 5. Delete Book

- **URL:** `/books/:id`
- **Method:** `DELETE`
- **Access:** Private (Owner only)
- **Headers:** `Authorization: Bearer {token}`

#### 6. Get My Books

- **URL:** `/books/my/books`
- **Method:** `GET`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`

### Review Endpoints

#### 1. Get Reviews by Book

- **URL:** `/reviews/book/:bookId`
- **Method:** `GET`
- **Access:** Public

**Success Response (200):**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "64abc789...",
      "rating": 5,
      "reviewText": "Excellent book!",
      "userId": {
        "_id": "64abc123...",
        "name": "Jane Doe"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 2. Create Review

- **URL:** `/reviews`
- **Method:** `POST`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "bookId": "64abc456...",
  "rating": 5,
  "reviewText": "Great book! Highly recommend."
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Review created successfully",
  "data": { ... }
}
```

#### 3. Update Review

- **URL:** `/reviews/:id`
- **Method:** `PUT`
- **Access:** Private (Owner only)
- **Headers:** `Authorization: Bearer {token}`

#### 4. Delete Review

- **URL:** `/reviews/:id`
- **Method:** `DELETE`
- **Access:** Private (Owner only)
- **Headers:** `Authorization: Bearer {token}`

#### 5. Get My Reviews

- **URL:** `/reviews/my/reviews`
- **Method:** `GET`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`

### Upload Endpoints

#### 1. Upload Single Image

- **URL:** `/upload`
- **Method:** `POST`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`
- **Content-Type:** `multipart/form-data`

**Request Body:** Form-data with key `image` and file value

**Success Response (200):**

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "book-review-platform/..."
  }
}
```

#### 2. Upload Multiple Images

- **URL:** `/upload/multiple`
- **Method:** `POST`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`
- **Content-Type:** `multipart/form-data`

**Request Body:** Form-data with key `images` and multiple file values (max 5)

**Success Response (200):**

```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "data": [
    {
      "url": "https://res.cloudinary.com/...",
      "publicId": "book-review-platform/..."
    },
    {
      "url": "https://res.cloudinary.com/...",
      "publicId": "book-review-platform/..."
    }
  ]
}
```

## 🎨 Available Genres

- Fiction
- Non-Fiction
- Mystery
- Thriller
- Romance
- Science Fiction
- Fantasy
- Biography
- History
- Self-Help
- Poetry
- Horror
- Adventure
- Other

## 🚀 Deployment

### Backend Deployment (Render)

1. **Create Render Account**
2. **Connect GitHub Repository**
3. **Create New Web Service**
4. **Configure Environment Variables:**
   ```
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLIENT_URL=your_frontend_deployment_url
   ```
5. **Deploy**

### Frontend Deployment (Vercel)

1. **Create Vercel Account**
2. **Import Project from GitHub**
3. **Configure Environment Variables:**
   ```
   VITE_API_URL=your_backend_deployment_url/api
   ```
### API Testing with Postman

Import the provided `Book_Review_Platform.postman_collection.json` file into Postman for comprehensive API testing.

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Book CRUD operations
- [ ] Review creation and management
- [ ] Image upload functionality
- [ ] Search and filtering
- [ ] Pagination
- [ ] Responsive design
- [ ] Dark mode toggle

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Verify connection string in `.env`
   - Check network access in MongoDB Atlas

2. **Cloudinary Upload Error**

   - Verify API credentials in `.env`
   - Check upload preset configuration

3. **CORS Issues**

   - Ensure `CLIENT_URL` matches frontend URL
   - Verify backend CORS configuration

4. **JWT Token Issues**
   - Check token expiration
   - Verify `JWT_SECRET` configuration

## 📝 Project Structure

```
internship_assignment/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── reviewController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── books.js
│   │   ├── reviews.js
│   │   └── upload.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── server.js
│   ├── package.json
│   ├── API_DOCUMENTATION.md
│   ├── TESTING_GUIDE.md
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── ErrorMessage.jsx
│   │   │   │   ├── StarRating.jsx
│   │   │   │   ├── Pagination.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   └── ImageUpload.jsx
│   │   │   ├── books/
│   │   │   │   ├── BookCard.jsx
│   │   │   │   └── SearchBar.jsx
│   │   │   └── reviews/
│   │   │       ├── ReviewCard.jsx
│   │   │       └── RatingChart.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── BookList.jsx
│   │   │   ├── BookDetails.jsx
│   │   │   ├── AddBook.jsx
│   │   │   ├── EditBook.jsx
│   │   │   ├── AddReview.jsx
│   │   │   ├── EditReview.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── NotFound.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── .env
├── README.md
└── Book_Review_Platform.postman_collection.json
```


