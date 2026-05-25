const weatherService = require('../services/weatherService');
const SearchHistory = require('../models/SearchHistory');

/**
 * @desc    Get current weather for a city
 * @route   GET /api/weather/current/:city
 * @access  Private
 */
const getCurrentWeather = async (req, res, next) => {
  try {
    const { city } = req.params;
    const data = await weatherService.getCurrentWeather(city);

    // Save search history
    if (req.user) {
      await SearchHistory.create({
        userId: req.user._id,
        city: data.city,
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get 5-day forecast for a city
 * @route   GET /api/weather/forecast/:city
 * @access  Private
 */
const getForecast = async (req, res, next) => {
  try {
    const { city } = req.params;
    const data = await weatherService.getForecast(city);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get air quality for a city
 * @route   GET /api/weather/air-quality/:city
 * @access  Private
 */
const getAirQuality = async (req, res, next) => {
  try {
    const { city } = req.params;
    const data = await weatherService.getAirQuality(city);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCurrentWeather, getForecast, getAirQuality };
