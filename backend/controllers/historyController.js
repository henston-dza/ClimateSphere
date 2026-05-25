const SearchHistory = require('../models/SearchHistory');

/**
 * @desc    Get user's search history (last 20)
 * @route   GET /api/history
 * @access  Private
 */
const getHistory = async (req, res, next) => {
  try {
    const history = await SearchHistory.find({ userId: req.user._id })
      .sort({ searchedAt: -1 })
      .limit(20)
      .select('city searchedAt -_id');

    res.json({
      success: true,
      data: { history },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear user's search history
 * @route   DELETE /api/history
 * @access  Private
 */
const clearHistory = async (req, res, next) => {
  try {
    await SearchHistory.deleteMany({ userId: req.user._id });

    res.json({
      success: true,
      message: 'Search history cleared',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getHistory, clearHistory };
