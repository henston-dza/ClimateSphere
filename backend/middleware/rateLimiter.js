const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for weather API endpoints
 * 10 requests per minute per IP
 */
const weatherLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
    });
  },
});

/**
 * Rate limiter for auth endpoints
 * 5 requests per minute per IP
 */
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many login attempts. Please try again later.',
    });
  },
});

/**
 * General API rate limiter
 * 100 requests per minute per IP
 */
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { weatherLimiter, authLimiter, generalLimiter };
