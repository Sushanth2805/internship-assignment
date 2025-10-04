Here is a complete `context.md` that summarizes all required, optional, and enhanced features for your Book Review Platform (MERN), including integrated image upload for both books and reviews:

---

# Book Review Platform – Assignment Context

## Objective

Develop a full-stack Book Review Platform using the MERN stack (MongoDB, Express, React, Node.js) focused on authentication, book & review management, image uploads, search/filtering, and a clean responsive UI using Tailwind CSS. The platform allows users to sign up, log in, add/manage books and reviews (with images), browse/search/filter content, and enjoy bonus UX features.[2][5]

---

## Functional Requirements

### 1. User Authentication

- **Signup:** Name, unique Email, Password (hashed)
- **Login:** Email & Password
- JWT token issued upon login for authentication
- Secure password storage (bcrypt)
- Auth middleware for protected API routes[5]

### 2. Book Management

- Add/Edit/Delete books with: Title, Author, Description, Genre, Published Year, _Image_
- Only book creator can edit/delete (ownership checks)
- All users can view book list, details, and images
- Pagination for books list (5 books per page)

### 3. Review System

- Review a book with: Rating (1–5 stars), Review Text, _One or more Images_
- Users can edit/delete their own reviews
- All reviews and average book rating displayed on book details page

---

## Technical & Design Requirements

- Backend: Node.js, Express, MongoDB Atlas, Mongoose (schemas for User, Book, Review), bcrypt, JWT, MVC structure
- Frontend: React, React Router, Context API, Axios/Fetch, **Tailwind CSS** for styling
- Image Upload:
  - Books and reviews can have image uploads
  - Images uploaded via backend API and stored securely Cloudinary; only image URLs stored in MongoDB
  - Frontend supports image preview and upload controls for both books and reviews[11][12][13]
- Protected routes & API authentication: JWT middleware, Context for frontend route protection

---

## Pages Required

- **Signup Page:** User registration form
- **Login Page:** User authentication form; JWT stored in localStorage
- **Book List Page:** Paginated (5 per page), includes search, filter, and book images (covers)
- **Book Details Page:** Book info, cover, reviews & review images, average rating
- **Add/Edit Book Page:** Form to add/edit book including image upload & preview
- **Add/Edit Review:** Form for review/rating with image support
- **Profile Page (Bonus):** User’s books and reviews (with management options)

---

## Bonus Features (Optional but Impressive)

- **Search:** Books can be searched by title or author (case-insensitive, partial match)[14][5]
- **Filter:** Filter books by genre
- **Sort:** Sort by published year or average rating
- **Charts:** Display rating distribution (Recharts/Chart.js)
- **Dark/Light Mode:** Theme toggle using Tailwind’s dark mode support
- **Deployment:** Backend (Render, Heroku, AWS), Frontend (Vercel, Netlify)
- **Postman Collection:** For API docs and testing

---

## Database Schema Design

- **User:** `{ name: String, email: String (unique), password: String }`
- **Book:** `{ title, author, description, genre, year, imageUrl (String), addedBy (User ref) }`
- **Review:** `{ bookId (Book ref), userId (User ref), rating, reviewText, images: [String], createdAt }`

---

## Key Deliverables

- **GitHub repository** with `/backend` and `/frontend` (clear, documented folder structure)
- **README.md:** Setup instructions, API docs, deployment links, feature overview
- **Deployed App:** Live URL(s)
- _(Bonus)_ Postman collection for API

---

## Evaluation Criteria

- Code quality, structure, and documentation
- Authentication and security best practices
- RESTful API design and error handling
- React frontend and API integration
- UI/UX and responsiveness (Tailwind)
- Schema design and data relations (User–Book–Review)
- Bonus: Deployment, charts, search/sort, dark mode, overall polish

---
