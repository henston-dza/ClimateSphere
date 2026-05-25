const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  searchedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient queries by user + time
searchHistorySchema.index({ userId: 1, searchedAt: -1 });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
