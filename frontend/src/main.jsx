import React from "react";
import ReactDOM from "react-dom/client";
import App from "./modules/chat/App.jsx";
import keycloak from "./shared/utils/keycloak"; 

keycloak.init({
  onLoad: 'login-required',
  checkLoginIframe: false
}).then((authenticated) => {
  if (!authenticated) {
    console.log("Utilisateur non authentifié");
  } else {
    console.log("Authentification réussie !");
    
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}).catch((error) => {
  console.error("Échec de l'initialisation de Keycloak", error);
});