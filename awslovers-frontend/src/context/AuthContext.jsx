import { createContext, useState, useEffect } from 'react';
import API from '../api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tenantId = localStorage.getItem('authTenant');
      setUser({ tenantId });
    }
    // Inicializar mockUsers con un solo campo tenantId + password
    if (!localStorage.getItem('mockUsers')) {
      const initial = [
        { tenantId: 'demo', password: '123' }
      ];
      localStorage.setItem('mockUsers', JSON.stringify(initial));
    }
  }, []);

  const mockSignup = ({ tenantId, password }) => {
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    if (users.find(u => u.tenantId === tenantId)) {
      throw new Error('Tenant ID ya existe');
    }
    users.push({ tenantId, password });
    localStorage.setItem('mockUsers', JSON.stringify(users));
  };

  const mockLogin = ({ tenantId, password }) => {
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const found = users.find(u =>
      u.tenantId === tenantId &&
      u.password === password
    );
    if (!found) throw new Error('Credenciales inválidas');
    const fakeToken = btoa(`${tenantId}:${password}`);
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('authTenant', tenantId);
    setUser({ tenantId });
    return { token: fakeToken };
  };

  const signup = async ({ tenantId, password }) => {
    if (!import.meta.env.VITE_API_URL) {
      mockSignup({ tenantId, password });
      return;
    }
    await API.post('/signup', { tenantId, password });
  };

  const login = async ({ tenantId, password }) => {
  // Forzar mock si es demo
  const useMock = !import.meta.env.VITE_API_URL || tenantId === 'demo';

  if (useMock) {
    return mockLogin({ tenantId, password });
  }
  // Branch real
  const { data } = await API.post('/login', { tenantId, password });
  localStorage.setItem('token', data.token);
  localStorage.setItem('authTenant', tenantId);
  setUser({ tenantId });
  return data;
};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authTenant');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
