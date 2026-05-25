const express = require('express');
const router = express.Router();
const {
  getCurrentWeather,
  getForecast,
  getAirQuality,
} = require('../controllers/weatherController');
const { protect } = require('../middleware/auth');
const { validateCity } = require('../middleware/validate');
const { weatherLimiter } = require('../middleware/rateLimiter');

// All weather routes are protected and rate-limited
router.use(protect);
router.use(weatherLimiter);

// @route   GET /api/weather/current/:city
router.get('/current/:city', validateCity, getCurrentWeather);

// @route   GET /api/weather/forecast/:city
router.get('/forecast/:city', validateCity, getForecast);

// @route   GET /api/weather/air-quality/:city
router.get('/air-quality/:city', validateCity, getAirQuality);

module.exports = router;
