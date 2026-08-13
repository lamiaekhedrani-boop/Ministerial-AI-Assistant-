import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { useAuth } from './modules/auth/AuthProvider';
import { ProtectedRoute } from './modules/auth/ProtectedRoute';
import { AdminRoute } from './modules/auth/AdminRoute';

import ChatApp from './modules/chat/ChatApp';
import AdminPanel from './modules/admin/AdminPanel';

import './App.css';

export default function App() {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        Initialisation de la sécurité...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* Page par défaut */}
        <Route
          path="/"
          element={<Navigate to="/chat" replace />}
        />

        {/* CHAT */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatApp />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        {/* URL inconnue */}
        <Route
          path="*"
          element={<Navigate to="/chat" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}