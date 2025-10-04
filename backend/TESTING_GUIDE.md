# 🧪 Backend Testing Guide

## Quick Start Testing

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create .env File

Make sure your `backend/.env` file has all required variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

### 3. Start Server

```bash
npm run dev
```

You should see:

```
🚀 Server running on port 5000 in development mode
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
```

### 4. Test Basic Endpoint

Open browser or use curl:

```bash
curl http://localhost:5000
```

Expected response:

```json
{
  "message": "Book Review Platform API",
  "version": "1.0.0",
  "status": "active"
}
```

---

## Testing with Postman

### Import Collection

1. Open Postman
2. Click "Import"
3. Select `Book_Review_Platform.postman_collection.json`
4. Collection will be imported with all endpoints

### Set Environment Variables

1. Create new environment in Postman
2. Add variables:
   - `BASE_URL`: `http://localhost:5000`
   - `TOKEN`: (leave empty, will be set after login)

### Testing Workflow

#### Step 1: Sign Up

- Endpoint: `POST /api/auth/signup`
- Body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

- Copy the `token` from response

#### Step 2: Login

- Endpoint: `POST /api/auth/login`
- Body:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

- Copy the `token` from response
- Set it in Postman environment variable `TOKEN`

#### Step 3: Get Current User

- Endpoint: `GET /api/auth/me`
- Headers: `Authorization: Bearer {{TOKEN}}`
- Should return your user profile

#### Step 4: Upload an Image

- Endpoint: `POST /api/upload`
- Headers: `Authorization: Bearer {{TOKEN}}`
- Body: form-data
  - Key: `image`
  - Type: File
  - Value: Select an image file
- Copy the `url` from response

#### Step 5: Create a Book

- Endpoint: `POST /api/books`
- Headers: `Authorization: Bearer {{TOKEN}}`
- Body:

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic novel about the American Dream in the 1920s",
  "genre": "Fiction",
  "year": 1925,
  "imageUrl": "paste_cloudinary_url_here"
}
```

- Copy the book `_id` from response

#### Step 6: Get All Books

- Endpoint: `GET /api/books?page=1&limit=5`
- No auth required
- Should see your created book

#### Step 7: Get Book Details

- Endpoint: `GET /api/books/:id`
- Replace `:id` with your book ID
- Should return book with reviews (empty array initially)

#### Step 8: Create a Review

- Endpoint: `POST /api/reviews`
- Headers: `Authorization: Bearer {{TOKEN}}`
- Body:

```json
{
  "bookId": "your_book_id_here",
  "rating": 5,
  "reviewText": "Excellent book! A true masterpiece of American literature.",
  "images": []
}
```

#### Step 9: Get Book Again

- Endpoint: `GET /api/books/:id`
- Should now show:
  - Your review
  - Updated `averageRating`: 5
  - Updated `totalReviews`: 1

#### Step 10: Test Search

- Endpoint: `GET /api/books?search=Gatsby`
- Should return books matching "Gatsby" in title or author

#### Step 11: Test Filter

- Endpoint: `GET /api/books?genre=Fiction`
- Should return only Fiction books

#### Step 12: Test Sort

- Endpoint: `GET /api/books?sort=rating`
- Should return books sorted by rating (highest first)

---

## Testing with cURL

### Authentication

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Save the token from response
TOKEN="your_token_here"

# Get current user
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Books

```bash
# Create book
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "description": "Dystopian novel",
    "genre": "Fiction",
    "year": 1949,
    "imageUrl": ""
  }'

# Get all books
curl http://localhost:5000/api/books

# Get book by ID
curl http://localhost:5000/api/books/YOUR_BOOK_ID

# Search books
curl "http://localhost:5000/api/books?search=1984"

# Filter by genre
curl "http://localhost:5000/api/books?genre=Fiction"

# Get my books
curl http://localhost:5000/api/books/my/books \
  -H "Authorization: Bearer $TOKEN"
```

### Reviews

```bash
# Create review
curl -X POST http://localhost:5000/api/reviews \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookId": "YOUR_BOOK_ID",
    "rating": 5,
    "reviewText": "Amazing book!",
    "images": []
  }'

# Get reviews for a book
curl http://localhost:5000/api/reviews/book/YOUR_BOOK_ID

# Get my reviews
curl http://localhost:5000/api/reviews/my/reviews \
  -H "Authorization: Bearer $TOKEN"
```

---

## Common Issues & Solutions

### Issue: "MongoDB connection error"

**Solution:** Check your `MONGODB_URI` in `.env` file. Make sure:

- Username and password are correct
- IP address is whitelisted in MongoDB Atlas
- Database name is specified

### Issue: "Not authorized to access this route"

**Solution:** Make sure you're sending the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Issue: "User already exists"

**Solution:** Use a different email or login with existing credentials

### Issue: "Not authorized to update/delete this book"

**Solution:** You can only edit/delete books you created. Login with the account that created the book.

### Issue: "You have already reviewed this book"

**Solution:** Each user can only review a book once. Update or delete your existing review instead.

### Issue: "Image upload failed"

**Solution:** Check your Cloudinary credentials in `.env` file:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

---

## Test Data Examples

### Genres Available

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

### Sample Books

```json
[
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "description": "A gripping tale of racial injustice and childhood innocence",
    "genre": "Fiction",
    "year": 1960
  },
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "description": "A fantasy adventure of Bilbo Baggins",
    "genre": "Fantasy",
    "year": 1937
  },
  {
    "title": "Sapiens",
    "author": "Yuval Noah Harari",
    "description": "A brief history of humankind",
    "genre": "Non-Fiction",
    "year": 2011
  }
]
```

---

## Success Indicators

✅ Server starts without errors
✅ MongoDB connection established
✅ Can create new user
✅ Can login and receive token
✅ Can access protected routes with token
✅ Can create, read, update, delete books
✅ Can create, read, update, delete reviews
✅ Average rating updates automatically
✅ Search, filter, and sort work correctly
✅ Image upload returns Cloudinary URL
✅ Ownership checks prevent unauthorized edits
✅ Pagination works correctly

---

**Backend is ready for integration with Frontend!** 🚀

