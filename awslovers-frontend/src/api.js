import axios from 'axios';

// TODO: This should be in a .env file
const API_URL = 'https://03r6q6tfrj.execute-api.us-east-1.amazonaws.com/dev';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || API_URL,
});

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;
