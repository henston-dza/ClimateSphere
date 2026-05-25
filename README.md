# 🌍 ClimateSphere — Weather Forecast Dashboard

A production-grade, full-stack weather dashboard built with React, Node.js/Express, and MongoDB.

![License](https://img.shields.io/badge/license-ISC-blue)
![Node](https://img.shields.io/badge/node-18%2B-green)

## ✨ Features

- **Real-time Weather** — Current conditions for any city worldwide
- **5-Day Forecast** — Daily forecasts with temperature trends
- **Air Quality Index** — AQI monitoring with pollutant breakdown
- **Temperature Charts** — Visual temperature trend analysis (Recharts)
- **Favorite Cities** — Save up to 20 cities for quick access
- **Search History** — Track and revisit recent searches
- **Dark/Light Mode** — Theme toggle with system preference detection
- **Unit Toggle** — Switch between °C and °F
- **Secure Auth** — JWT authentication with bcrypt password hashing
- **Rate Limiting** — API protection (10 req/min for weather, 5 for auth)
- **API Caching** — 5-minute cache reduces external API calls
- **Responsive Design** — Mobile-first glassmorphism UI
- **Smooth Animations** — Framer Motion page transitions and micro-animations

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Framer Motion, Recharts, React Icons |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| External API | OpenWeather API |
| Security | Helmet, CORS, express-rate-limit, express-validator |

## 📁 Project Structure

```
Climate/
├── backend/
│   ├── config/          # DB connection, cache
│   ├── controllers/     # Auth, weather, favorites, history
│   ├── middleware/       # Auth, rate-limit, error handler, validation
│   ├── models/          # User, SearchHistory (Mongoose)
│   ├── routes/          # Express routers
│   ├── services/        # OpenWeather API proxy + caching
│   ├── utils/           # JWT token generation
│   ├── server.js        # Entry point
│   └── .env.example     # Environment template
│
└── frontend/
    └── src/
        ├── components/  # Navbar, WeatherCard, ForecastCard, etc.
        ├── context/     # AuthContext, ThemeContext
        ├── pages/       # Landing, Login, Register, Dashboard
        ├── services/    # Axios API clients
        └── styles/      # CSS design system
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- OpenWeather API key ([get one free](https://openweathermap.org/appid))

### 1. Clone & Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set your OPENWEATHER_API_KEY and MONGO_URI
npm install
npm run dev
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Open the App

Visit **http://localhost:5173** in your browser.

## 🔑 Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/climatesphere
JWT_SECRET=your_secret_key_here
OPENWEATHER_API_KEY=your_api_key_here
CLIENT_URL=http://localhost:5173
```

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Protected |
| GET | `/api/auth/logout` | Public |

### Weather
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/weather/current/:city` | Protected |
| GET | `/api/weather/forecast/:city` | Protected |
| GET | `/api/weather/air-quality/:city` | Protected |

### Favorites
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/favorites` | Protected |
| POST | `/api/favorites` | Protected |
| DELETE | `/api/favorites/:city` | Protected |

### History
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/history` | Protected |
| DELETE | `/api/history` | Protected |

## 🔒 Security

- Helmet HTTP headers
- CORS with origin whitelist
- bcrypt password hashing (12 salt rounds)
- JWT token auth (7-day expiry)
- Rate limiting per IP
- Input validation & sanitization
- API keys never exposed to frontend
