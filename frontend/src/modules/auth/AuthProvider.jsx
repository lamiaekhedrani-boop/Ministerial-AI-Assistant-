import React, { useState, useEffect, createContext, useContext } from 'react';
import keycloak from './keycloak';

// Création d'un contexte pour partager l'état d'authentification
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({
      onLoad: 'check-sso', 
      checkLoginIframe: false
    })
    .then((authenticated) => {
      setIsAuthenticated(authenticated);
      setIsInitialized(true);
    })
    .catch((error) => {
      console.error("Échec de l'initialisation de Keycloak", error);
    });
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111827', color: 'white' }}>
        <h2>Vérification des habilitations...</h2>
      </div>
    );
  }

  // On fournit l'état de connexion et l'instance keycloak à toute l'application
  return (
    <AuthContext.Provider value={{ isAuthenticated, keycloak }}>
      {children}
    </AuthContext.Provider>
  );
};

// Un "hook" personnalisé pour utiliser facilement ce contexte ailleurs
export const useAuth = () => useContext(AuthContext);