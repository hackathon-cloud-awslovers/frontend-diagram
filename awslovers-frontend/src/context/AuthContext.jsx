// src/context/AuthContext.jsx

import { createContext, useState, useEffect, useCallback } from 'react';
import API from '../api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { data } = await API.post('/user/validate');
        setUser(data.user);
        // Set token again to refresh it if backend sends a new one
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      } catch (error) {
        console.error('Token validation failed', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const signup = async ({ user_id, tenant_id, password }) => {
    await API.post('/user/register', { user_id, tenant_id, password });
  };

  const login = async ({ user_id, tenant_id, password }) => {
    const { data } = await API.post('/user/login', { user_id, tenant_id, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await API.post('/user/logout');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
