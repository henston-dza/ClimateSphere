const axios = require('axios');
const weatherCache = require('../config/cache');

const BASE_URL = 'https://api.openweathermap.org';
const API_KEY = () => process.env.OPENWEATHER_API_KEY;

/**
 * Geocode a city name to coordinates
 * @param {string} city - City name
 * @returns {Promise<{lat: number, lon: number, name: string, country: string}>}
 */
const geocode = async (city) => {
  const cacheKey = `geo_${city.toLowerCase()}`;
  const cached = weatherCache.get(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${BASE_URL}/geo/1.0/direct`, {
    params: {
      q: city,
      limit: 1,
      appid: API_KEY(),
    },
  });

  if (!response.data || response.data.length === 0) {
    const error = new Error('City not found. Please check the city name and try again.');
    error.statusCode = 404;
    throw error;
  }

  const result = {
    lat: response.data[0].lat,
    lon: response.data[0].lon,
    name: response.data[0].name,
    country: response.data[0].country,
    state: response.data[0].state || null,
  };

  weatherCache.set(cacheKey, result, 3600); // Cache geocode for 1 hour
  return result;
};

/**
 * Get current weather for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Current weather data
 */
const getCurrentWeather = async (city) => {
  const cacheKey = `current_${city.toLowerCase()}`;
  const cached = weatherCache.get(cacheKey);
  if (cached) return cached;

  const geo = await geocode(city);

  const response = await axios.get(`${BASE_URL}/data/2.5/weather`, {
    params: {
      lat: geo.lat,
      lon: geo.lon,
      appid: API_KEY(),
      units: 'metric',
    },
  });

  const data = {
    city: geo.name,
    country: geo.country,
    state: geo.state,
    coords: { lat: geo.lat, lon: geo.lon },
    temperature: response.data.main.temp,
    feelsLike: response.data.main.feels_like,
    tempMin: response.data.main.temp_min,
    tempMax: response.data.main.temp_max,
    humidity: response.data.main.humidity,
    pressure: response.data.main.pressure,
    visibility: response.data.visibility,
    windSpeed: response.data.wind.speed,
    windDeg: response.data.wind.deg,
    windGust: response.data.wind.gust || null,
    clouds: response.data.clouds.all,
    weather: {
      id: response.data.weather[0].id,
      main: response.data.weather[0].main,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    },
    sunrise: response.data.sys.sunrise,
    sunset: response.data.sys.sunset,
    timezone: response.data.timezone,
    dt: response.data.dt,
  };

  weatherCache.set(cacheKey, data); // Default 5-minute TTL
  return data;
};

/**
 * Get 5-day / 3-hour forecast for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Forecast data
 */
const getForecast = async (city) => {
  const cacheKey = `forecast_${city.toLowerCase()}`;
  const cached = weatherCache.get(cacheKey);
  if (cached) return cached;

  const geo = await geocode(city);

  const response = await axios.get(`${BASE_URL}/data/2.5/forecast`, {
    params: {
      lat: geo.lat,
      lon: geo.lon,
      appid: API_KEY(),
      units: 'metric',
    },
  });

  // Group forecasts by day
  const dailyMap = {};
  response.data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyMap[date]) {
      dailyMap[date] = {
        date,
        temps: [],
        weather: [],
        items: [],
      };
    }
    dailyMap[date].temps.push(item.main.temp);
    dailyMap[date].weather.push(item.weather[0]);
    dailyMap[date].items.push({
      dt: item.dt,
      dt_txt: item.dt_txt,
      temp: item.main.temp,
      feelsLike: item.main.feels_like,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      weather: {
        id: item.weather[0].id,
        main: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      },
    });
  });

  const daily = Object.values(dailyMap).map((day) => ({
    date: day.date,
    tempMin: Math.min(...day.temps),
    tempMax: Math.max(...day.temps),
    // Use the most common weather condition for the day
    weather: day.weather.sort(
      (a, b) =>
        day.weather.filter((w) => w.main === b.main).length -
        day.weather.filter((w) => w.main === a.main).length
    )[0],
    hourly: day.items,
  }));

  const data = {
    city: geo.name,
    country: geo.country,
    daily: daily.slice(0, 5),
    hourly: response.data.list.map((item) => ({
      dt: item.dt,
      dt_txt: item.dt_txt,
      temp: item.main.temp,
      feelsLike: item.main.feels_like,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      weather: {
        id: item.weather[0].id,
        main: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      },
    })),
  };

  weatherCache.set(cacheKey, data);
  return data;
};

/**
 * Get air quality data for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Air quality data
 */
const getAirQuality = async (city) => {
  const cacheKey = `aqi_${city.toLowerCase()}`;
  const cached = weatherCache.get(cacheKey);
  if (cached) return cached;

  const geo = await geocode(city);

  const response = await axios.get(
    `${BASE_URL}/data/2.5/air_pollution`,
    {
      params: {
        lat: geo.lat,
        lon: geo.lon,
        appid: API_KEY(),
      },
    }
  );

  const pollution = response.data.list[0];
  const aqiLabels = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

  const data = {
    city: geo.name,
    country: geo.country,
    aqi: pollution.main.aqi,
    aqiLabel: aqiLabels[pollution.main.aqi] || 'Unknown',
    components: {
      co: pollution.components.co,
      no: pollution.components.no,
      no2: pollution.components.no2,
      o3: pollution.components.o3,
      so2: pollution.components.so2,
      pm2_5: pollution.components.pm2_5,
      pm10: pollution.components.pm10,
      nh3: pollution.components.nh3,
    },
    dt: pollution.dt,
  };

  weatherCache.set(cacheKey, data);
  return data;
};

module.exports = {
  getCurrentWeather,
  getForecast,
  getAirQuality,
  geocode,
};
