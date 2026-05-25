const User = require('../models/User');
const { ApiError } = require('../middleware/errorHandler');

/**
 * @desc    Get user's favorite cities
 * @route   GET /api/favorites
 * @access  Private
 */
const getFavorites = async (req, res) => {
  res.json({
    success: true,
    data: { favorites: req.user.favoriteCities },
  });
};

/**
 * @desc    Add a city to favorites
 * @route   POST /api/favorites
 * @access  Private
 */
const addFavorite = async (req, res, next) => {
  try {
    const { city } = req.body;
    const normalizedCity = city.trim();

    // Check for duplicate (case-insensitive)
    const alreadyExists = req.user.favoriteCities.some(
      (fav) => fav.toLowerCase() === normalizedCity.toLowerCase()
    );

    if (alreadyExists) {
      throw new ApiError(409, 'City is already in your favorites');
    }

    // Limit favorites to 20
    if (req.user.favoriteCities.length >= 20) {
      throw new ApiError(400, 'Maximum of 20 favorite cities allowed');
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: { favoriteCities: normalizedCity },
    });

    res.status(201).json({
      success: true,
      message: `${normalizedCity} added to favorites`,
      data: { city: normalizedCity },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove a city from favorites
 * @route   DELETE /api/favorites/:city
 * @access  Private
 */
const removeFavorite = async (req, res, next) => {
  try {
    const { city } = req.params;

    const exists = req.user.favoriteCities.some(
      (fav) => fav.toLowerCase() === city.toLowerCase()
    );

    if (!exists) {
      throw new ApiError(404, 'City not found in your favorites');
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        favoriteCities: {
          $regex: new RegExp(`^${city}$`, 'i'),
        },
      },
    });

    res.json({
      success: true,
      message: `${city} removed from favorites`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
