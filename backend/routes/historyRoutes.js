const express = require('express');
const router = express.Router();
const { getHistory, clearHistory } = require('../controllers/historyController');
const { protect } = require('../middleware/auth');

// All history routes are protected
router.use(protect);

// @route   GET /api/history
router.get('/', getHistory);

// @route   DELETE /api/history
router.delete('/', clearHistory);

module.exports = router;
