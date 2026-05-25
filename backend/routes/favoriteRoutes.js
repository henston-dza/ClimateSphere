const express = require('express');
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require('../controllers/favoritesController');
const { protect } = require('../middleware/auth');
const { validateFavorite } = require('../middleware/validate');

// All favorite routes are protected
router.use(protect);

// @route   GET /api/favorites
router.get('/', getFavorites);

// @route   POST /api/favorites
router.post('/', validateFavorite, addFavorite);

// @route   DELETE /api/favorites/:city
router.delete('/:city', removeFavorite);

module.exports = router;
