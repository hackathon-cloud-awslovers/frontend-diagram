import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EditorPage from './pages/EditorPage';

import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
