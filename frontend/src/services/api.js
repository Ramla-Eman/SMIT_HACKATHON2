import axios from 'axios';

// Add caching for GET requests
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add caching interceptor for GET requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add cache check for GET requests
  if (config.method === 'get') {
    const cacheKey = `${config.url}${JSON.stringify(config.params || {})}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      // Return cached response
      return Promise.reject({ __cached: true, data: cached.data });
    }
  }
  
  return config;
});

API.interceptors.response.use(
  (response) => {
    // Cache GET responses
    if (response.config.method === 'get') {
      const cacheKey = `${response.config.url}${JSON.stringify(response.config.params || {})}`;
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });
    }
    return response;
  },
  (error) => {
    if (error.__cached) {
      // Return cached data
      return Promise.resolve({ data: error.data });
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/api/admin/login';
    }
    return Promise.reject(error);
  }
);

export default API;