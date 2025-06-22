// src/context/AuthContext.jsx

import { createContext, useState, useEffect, useCallback } from 'react';
import API, { testAPI } from '../api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // If demo token, skip validate call
      if (token === 'demo-token') {
        setUser({ userId: 'demo', tenantId: 'demo' });
      } else {
        try {
          const { data } = await API.post('/user/validate');
          console.log('Token validation response:', data);
          
          // Handle the AWS Lambda response structure
          const responseData = data.body || data;
          const user = responseData.user;
          const newToken = responseData.token;
          
          setUser(user);
          if (newToken) {
            localStorage.setItem('token', newToken);
          }
        } catch (err) {
          console.error('Token validation failed', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Test API connectivity on app load
    testAPI();
    validateToken();
  }, [validateToken]);

  const signup = async ({ user_id, tenant_id, password }) => {
    // For demo user, skip backend
    if (user_id === 'demo' && tenant_id === 'demo') {
      // nothing to do
      return;
    }
    console.log('Attempting signup with:', { user_id, tenant_id, password });
    try {
      await API.post('/user/register', { user_id, tenant_id, password });
      console.log('Signup successful');
    } catch (error) {
      console.error('Signup error:', error.response?.status, error.response?.data);
      throw error;
    }
  };

  const login = async ({ user_id, tenant_id, password }) => {
    // Demo mode: bypass AWS Lambda
    if (user_id === 'demo' && tenant_id === 'demo' && password === '123') {
      const demoToken = 'demo-token';
      localStorage.setItem('token', demoToken);
      setUser({ userId: 'demo', tenantId: 'demo' });
      return { token: demoToken, user: { userId: 'demo', tenantId: 'demo' } };
    }

    // Normal login via AWS Lambda
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Credentials being sent:', { user_id, tenant_id, password });
    console.log('API base URL:', API.defaults.baseURL);
    console.log('Full login URL will be:', API.defaults.baseURL + '/user/login');
    
    try {
      const { data } = await API.post('/user/login', { user_id, tenant_id, password });
      console.log('=== LOGIN RESPONSE ===');
      console.log('Full response:', data);
      console.log('Response body:', data.body);
      console.log('Response statusCode:', data.statusCode);
      
      // Check if Lambda returned an error
      if (data.statusCode >= 400) {
        const errorMessage = data.body?.error || 'Login failed';
        console.error('Lambda returned error:', errorMessage);
        throw new Error(errorMessage);
      }
      
      // Handle the AWS Lambda response structure
      const responseData = data.body || data;
      const token = responseData.token;
      const user = responseData.user || { userId: user_id, tenantId: tenant_id };
      
      console.log('Extracted token:', token);
      console.log('Extracted user:', user);
      
      localStorage.setItem('token', token);
      setUser(user);
      return { token, user };
    } catch (error) {
      console.error('=== LOGIN ERROR ===');
      console.error('Status:', error.response?.status);
      console.error('Status Text:', error.response?.statusText);
      console.error('Data:', error.response?.data);
      console.error('URL attempted:', error.config?.url);
      console.error('Full error:', error);
      throw error;
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    if (token && token !== 'demo-token') {
      try {
        await API.post('/user/logout');
      } catch (err) {
        console.error('Logout failed', err);
      }
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
