# 🐾 Happy Tails — Pet Adoption Platform

> "Find a Friend. Give a Home."

Happy Tails is a full-stack pet adoption platform that connects loving families with pets in need of a home. Built with the MERN stack, it supports browsing pets, multi-step adoption applications, favorites, request tracking, and a complete admin panel for managing pets, users, and adoption requests.

## ✨ Features

**For Users**
- Browse and search/filter pets by species, gender, status, and age
- View detailed pet profiles with gallery, health info, and shelter details
- Submit a 5-step adoption application
- Save pets to favorites
- Track adoption request status (Pending → Under Review → Approved/Rejected)
- Manage profile and view activity feed
- Read adopter success stories

**For Admins**
- Dashboard with key statistics and species breakdown
- Full CRUD on pet listings
- Manage registered users
- Review, approve, or reject adoption requests

**General**
- JWT authentication with protected routes and role-based access
- Responsive design (mobile, tablet, desktop)
- Animated UI with Framer Motion

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router DOM, Axios, Framer Motion, React Hook Form, Font Awesome
**Backend:** Node.js, Express.js
**Database:** MongoDB, Mongoose
**Auth:** JWT, bcryptjs

## 📂 Project Structure
happy-tails/

├── backend/      # Express API, MongoDB models, controllers, routes

└── frontend/     # React + Vite client
## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/happy-tails.git
cd happy-tails
```

### 2. Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure environment variables

**`backend/.env`**
PORT=5000

NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRE=7d

CLIENT_URL=http://localhost:5173
**`frontend/.env`**
VITE_API_URL=http://localhost:5000/api
### 4. Seed the database
```bash
cd backend
npm run seed
```

**Seeded login credentials:**
| Role  | Email | Password |
|---|---|---|
| Admin | admin@happytails.com | admin123 |
| User | user1@happytails.com | user1234 |

### 5. Run the app
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Visit `http://localhost:5173`

## 📸 Screenshots

*(Add screenshots of Home, Pets page, Pet Details, and Admin Dashboard here)*

## 👤 Author

**Goutham**
Final-year ECE student | Full-stack developer

## 📄 License

This project is open source and available under the MIT License.