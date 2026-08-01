import React from 'react';
import { useAuth } from './AuthProvider';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, keycloak } = useAuth();

  // Si l'utilisateur n'est pas connecté, on déclenche manuellement la redirection Keycloak
  if (!isAuthenticated) {
    keycloak.login(); 
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Redirection vers le portail d'authentification...</p>
      </div>
    );
  }

  // S'il est connecté, on le laisse passer et on affiche le composant enfant (le Chat)
  return children;
};