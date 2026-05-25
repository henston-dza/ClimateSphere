import api from './api';

export const weatherApi = {
  getCurrentWeather: async (city) => {
    const res = await api.get(`/weather/current/${encodeURIComponent(city)}`);
    return res.data.data;
  },

  getForecast: async (city) => {
    const res = await api.get(`/weather/forecast/${encodeURIComponent(city)}`);
    return res.data.data;
  },

  getAirQuality: async (city) => {
    const res = await api.get(`/weather/air-quality/${encodeURIComponent(city)}`);
    return res.data.data;
  },

  getSearchHistory: async () => {
    const res = await api.get('/history');
    return res.data.data.history;
  },

  clearHistory: async () => {
    const res = await api.delete('/history');
    return res.data;
  },
};
