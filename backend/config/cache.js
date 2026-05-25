const NodeCache = require('node-cache');

// Weather data cached for 5 minutes (300 seconds)
const weatherCache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: false,
});

weatherCache.on('set', (key) => {
  console.log(`📦 Cache SET: ${key}`);
});

weatherCache.on('expired', (key) => {
  console.log(`🗑️  Cache EXPIRED: ${key}`);
});

module.exports = weatherCache;
