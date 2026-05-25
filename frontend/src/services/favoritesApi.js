import api from './api';

export const favoritesApi = {
  getFavorites: async () => {
    const res = await api.get('/favorites');
    return res.data.data.favorites;
  },

  addFavorite: async (city) => {
    const res = await api.post('/favorites', { city });
    return res.data;
  },

  removeFavorite: async (city) => {
    const res = await api.delete(`/favorites/${encodeURIComponent(city)}`);
    return res.data;
  },
};
