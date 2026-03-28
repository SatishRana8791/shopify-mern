# ShopEasy - Full Stack E-Commerce App

A full featured e-commerce web application built with MERN Stack.

## 🔗 Live Demo
- Frontend: [ShopEasy](https://shopify-mern-delta.vercel.app)
- Backend:  [API](https://shopify-mern-backend.onrender.com)

## ✨ Features

### User Features
- Register and Login with JWT Authentication
- Browse products with search and filter
- Product detail with customer reviews
- Add to cart with quantity controls
- Checkout with shipping address
- Razorpay payment integration
- Order history and tracking

### Admin Features
- Admin dashboard with stats
- Manage products (add, edit, delete)
- Manage orders (mark as delivered)
- Manage users (view, delete)

## 🛠️ Tech Stack

**Frontend:**
- React.js + Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt password hashing
- Razorpay payment gateway

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Razorpay account (test mode)

### Installation

1. Clone the repository
```bash
git clone https://github.com/SatishRana8791/shopify-mern.git
cd shopify-mern
```

2. Setup Backend
```bash
cd backend
npm install
```

3. Create `backend/.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

4. Setup Frontend
```bash
cd frontend
npm install
```

5. Create `frontend/.env` file:
```
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

6. Seed the database
```bash
cd backend
npm run seed
```

7. Run the application
```bash
# Backend (terminal 1)
cd backend
npm run dev

# Frontend (terminal 2)
cd frontend
npm run dev
```

## 📸 Screenshots
### Home Page
<img width="1919" height="918" alt="Screenshot 2026-03-28 180704" src="https://github.com/user-attachments/assets/a318a8e3-d904-4daf-83f9-95e099f9f592" />


### Products Page
<img width="1919" height="912" alt="Screenshot 2026-03-28 180730" src="https://github.com/user-attachments/assets/fb83676d-bb81-4d41-92a8-17185d3a3939" />


### Admin Dashboard
<img width="1917" height="912" alt="Screenshot 2026-03-28 180812" src="https://github.com/user-attachments/assets/0180b47d-05df-4ec3-815e-1a9132868165" />


## 👨‍💻 Author
Satish Kumar
- GitHub: [@SatishRana8791](https://github.com/SatishRana8791)
