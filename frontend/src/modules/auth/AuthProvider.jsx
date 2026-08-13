import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from 'react';

import keycloak from './keycloak';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const isRun = useRef(false);

  const loadUser = () => {
    const tokenParsed = keycloak.tokenParsed || {};

    const userData = {
      id: tokenParsed.sub,
      username: tokenParsed.preferred_username,
      email: tokenParsed.email,
      name:
        tokenParsed.name ||
        tokenParsed.preferred_username ||
        'Utilisateur',

      roles: tokenParsed.realm_access?.roles || [],
    };

    setUser(userData);

    return userData;
  }

  useEffect(() => {
    if (isRun.current) {
      return;
    }

    isRun.current = true;

    console.log('Initialisation de Keycloak...');

    keycloak
      .init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
      })
      .then((authenticated) => {
        console.log(
          'Keycloak authenticated:',
          authenticated
        );

        setIsAuthenticated(authenticated);

        if (authenticated && keycloak.token) {
          const userData = loadUser();

          console.log(
            'Utilisateur connecté:',
            userData
          );
        }

        setIsInitialized(true);
      })
      .catch((error) => {
        console.error(
          'Erreur initialisation Keycloak:',
          error
        );

        setIsAuthenticated(false);
        setUser(null);
        setIsInitialized(true);
      });

    const refreshInterval = setInterval(() => {
      if (!keycloak.authenticated) {
        return;
      }

      keycloak
        .updateToken(30)
        .then((refreshed) => {
          if (refreshed) {
            console.log(
              ' Token Keycloak rafraîchi'
            );

            loadUser();
          }
        })
        .catch((error) => {
          console.error(
            '❌ Impossible de rafraîchir le token:',
            error
          );

          setIsAuthenticated(false);
          setUser(null);

          keycloak.clearToken();
        });
    }, 60000);

    keycloak.onTokenExpired = () => {
      console.log(
        'Token expiré, tentative de renouvellement...'
      );

      keycloak
        .updateToken(30)
        .then((refreshed) => {
          if (refreshed) {
            console.log(
              'Token renouvelé après expiration'
            );

            setIsAuthenticated(true);
            loadUser();
          }
        })
        .catch((error) => {
          console.error(
            ' Impossible de renouveler le token:',
            error
          );

          setIsAuthenticated(false);
          setUser(null);

          keycloak.clearToken();
        });
    };

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const logout = () => {
    console.log(' Déconnexion...');

    setIsAuthenticated(false);
    setUser(null);

    keycloak.logout();
  };

  if (!isInitialized) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
        }}
      >
        Initialisation de la sécurité...
      </div>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        user,
        keycloak,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}