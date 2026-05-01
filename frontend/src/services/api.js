import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');

  if (userInfo) {
    config.headers['X-IdeaForge-Session'] = 'active';
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest &&
      !originalRequest._retry &&
      [408, 429, 503].includes(error.response?.status)
    ) {
      originalRequest._retry = true;
      await new Promise((resolve) => setTimeout(resolve, 600));
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
