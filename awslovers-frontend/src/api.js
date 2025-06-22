import axios from 'axios';

// TODO: This should be in a .env file
const API_URL = 'https://03r6q6tfrj.execute-api.us-east-1.amazonaws.com/dev';

console.log('API Configuration:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Fallback API_URL:', API_URL);
console.log('Final baseURL:', API_URL); // Always use AWS Lambda URL

const API = axios.create({
  baseURL: API_URL, // Always use AWS Lambda URL for now
});

// Test function to verify API connectivity
export const testAPI = async () => {
  try {
    console.log('Testing API connectivity...');
    const response = await axios.get(API_URL);
    console.log('API test successful:', response.status);
    return true;
  } catch (error) {
    console.error('API test failed:', error.response?.status, error.response?.data);
    return false;
  }
};

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  console.log('Making API request to:', cfg.baseURL + cfg.url);
  return cfg;
});

export default API;
