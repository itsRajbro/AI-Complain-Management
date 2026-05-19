# 🤖 AI-Based Smart Complaint Management System

A full-stack MERN application with AI-powered complaint analysis using OpenRouter AI APIs.

## ✨ Features

- 📝 **Complaint Registration** — Submit complaints with detailed information
- 🔍 **Complaint Tracking** — Track and filter complaint status in real time
- 🤖 **AI Analysis** — Auto priority detection, department routing, and response generation
- 🔐 **JWT Authentication** — Secure login/signup with bcrypt password hashing
- 🚀 **Deployed on Render** — Both frontend and backend live

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcryptjs |
| AI | OpenRouter API (DeepSeek/GPT-3.5) |
| Deployment | Render |

## 📁 Project Structure

```
project-root/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── context/         # Auth context
│       ├── pages/           # Page components
│       ├── routes/          # Protected routes
│       └── services/        # Axios API calls
│
└── server/                  # Express backend
    ├── config/              # MongoDB connection
    ├── controllers/         # Business logic
    ├── middleware/          # Auth + error handlers
    ├── models/              # Mongoose schemas
    └── routes/              # API route definitions
```

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- OpenRouter API key

### 1. Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/smart-complaint-system.git

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

**server/.env**
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
OPENROUTER_API_KEY=sk-or-v1-...
PORT=5000
CLIENT_URL=http://localhost:5173
```

**client/.env**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Run the App

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Open `http://localhost:5173`

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login and get token |
| GET | `/api/auth/profile` | Get user profile (protected) |

### Complaints
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/complaints` | Add new complaint |
| GET | `/api/complaints` | Get all complaints (protected) |
| PUT | `/api/complaints/:id` | Update complaint status (protected) |
| DELETE | `/api/complaints/:id` | Delete complaint (protected) |
| GET | `/api/complaints/search?location=Ghaziabad` | Search by location |

### AI
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/analyze` | Analyze complaint with AI (protected) |

## 🌐 Deployment on Render

### Backend
1. Push code to GitHub
2. Create new **Web Service** on Render
3. Root Directory: `server`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add all `.env` variables

### Frontend
1. Create new **Static Site** on Render
2. Root Directory: `client`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `dist`
5. Add `VITE_API_URL=https://your-backend.onrender.com/api`

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `OPENROUTER_API_KEY` | OpenRouter AI API key |
| `PORT` | Server port (default: 5000) |
| `CLIENT_URL` | Frontend URL for CORS |
| `VITE_API_URL` | Backend API base URL |

## 👥 Author

B.Tech 4th Semester — AI308B (AI Driven Full Stack Development)
ESE Examination 2025-26
