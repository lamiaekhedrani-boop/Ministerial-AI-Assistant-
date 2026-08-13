import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, keycloak } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      keycloak.login();
    }
  }, [isAuthenticated, keycloak]);

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <p>Redirection vers le portail d'authentification...</p>
      </div>
    );
  }

  return children;
};