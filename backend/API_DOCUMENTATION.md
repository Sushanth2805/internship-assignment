# API Documentation - Book Review Platform

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### 1. User Signup

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Access:** Public
- **Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

- **Success Response (201):**

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

### 2. User Login

- **URL:** `/auth/login`
- **Method:** `POST`
- **Access:** Public
- **Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- **Success Response (200):**

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

### 3. Get Current User

- **URL:** `/auth/me`
- **Method:** `GET`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`
- **Success Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Book Endpoints

### 1. Get All Books (with pagination, search, filter, sort)

- **URL:** `/books`
- **Method:** `GET`
- **Access:** Public
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 5)
  - `search` (searches in title and author)
  - `genre` (Fiction, Mystery, Romance, etc.)
  - `sort` (year, rating, title)
- **Example:** `/books?page=1&limit=5&search=Harry&genre=Fantasy&sort=rating`
- **Success Response (200):**

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

### 2. Get Single Book

- **URL:** `/books/:id`
- **Method:** `GET`
- **Access:** Public
- **Success Response (200):**

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
        "images": ["url1", "url2"],
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

### 3. Create Book

- **URL:** `/books`
- **Method:** `POST`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`
- **Body:**

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

- **Success Response (201):**

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

### 4. Update Book

- **URL:** `/books/:id`
- **Method:** `PUT`
- **Access:** Private (Owner only)
- **Headers:** `Authorization: Bearer {token}`
- **Body:** (any fields to update)

```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### 5. Delete Book

- **URL:** `/books/:id`
- **Method:** `DELETE`
- **Access:** Private (Owner only)
- **Headers:** `Authorization: Bearer {token}`

### 6. Get My Books

- **URL:** `/books/my/books`
- **Method:** `GET`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`

---

## Review Endpoints

### 1. Get Reviews by Book

- **URL:** `/reviews/book/:bookId`
- **Method:** `GET`
- **Access:** Public
- **Success Response (200):**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "64abc789...",
      "rating": 5,
      "reviewText": "Excellent book!",
      "images": ["url1", "url2"],
      "userId": {
        "_id": "64abc123...",
        "name": "Jane Doe"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Create Review

- **URL:** `/reviews`
- **Method:** `POST`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`
- **Body:**

```json
{
  "bookId": "64abc456...",
  "rating": 5,
  "reviewText": "Great book! Highly recommend.",
  "images": ["url1", "url2"]
}
```

- **Success Response (201):**

```json
{
  "success": true,
  "message": "Review created successfully",
  "data": { ... }
}
```

### 3. Update Review

- **URL:** `/reviews/:id`
- **Method:** `PUT`
- **Access:** Private (Owner only)
- **Headers:** `Authorization: Bearer {token}`

### 4. Delete Review

- **URL:** `/reviews/:id`
- **Method:** `DELETE`
- **Access:** Private (Owner only)
- **Headers:** `Authorization: Bearer {token}`

### 5. Get My Reviews

- **URL:** `/reviews/my/reviews`
- **Method:** `GET`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`

---

## Upload Endpoints

### 1. Upload Single Image

- **URL:** `/upload`
- **Method:** `POST`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`
- **Content-Type:** `multipart/form-data`
- **Body:** Form-data with key `image` and file value
- **Success Response (200):**

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

### 2. Upload Multiple Images

- **URL:** `/upload/multiple`
- **Method:** `POST`
- **Access:** Private
- **Headers:** `Authorization: Bearer {token}`
- **Content-Type:** `multipart/form-data`
- **Body:** Form-data with key `images` and multiple file values (max 5)
- **Success Response (200):**

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

---

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Genre Options

Available genres for books:

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

