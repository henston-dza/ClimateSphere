const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');

// Load env vars
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// ─── Security Middleware ───────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// ─── Body Parsers ──────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── General Rate Limiter ──────────────────────────────────────────
app.use(generalLimiter);

// ─── API Routes ────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));

// ─── Health Check ──────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'ClimateSphere API is running',
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Error Handler ─────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🌍 ClimateSphere API Server`);
  console.log(`   Port:  ${PORT}`);
  console.log(`   Env:   ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Time:  ${new Date().toLocaleString()}\n`);
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT}`);
});
