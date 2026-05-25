import api from './api';

export const authApi = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    return res.data.data;
  },

  register: async (username, email, password) => {
    const res = await api.post('/auth/register', { username, email, password });
    return res.data.data;
  },

  getProfile: async (token) => {
    const res = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  logout: async () => {
    const res = await api.get('/auth/logout');
    return res.data;
  },
};
