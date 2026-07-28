import React, { useState } from 'react';
import keycloak from '../../shared/utils/keycloak';

function App() {
  const username = keycloak.tokenParsed?.preferred_username;
  const isAdmin = keycloak.hasRealmRole('ADMIN');

  const handleLogout = () => {
    keycloak.logout();
  };
  
  const [reponseIA, setReponseIA] = useState("");

  const envoyerMessageAuChatbot = async () => {
    try {
      // Remplace l'URL par la route exacte de ton backend FastAPI
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keycloak.token}` // Le pass de sécurité !
        },
        body: JSON.stringify({ prompt: "Bonjour l'IA !" })
      });

      if (response.status === 401) {
        setReponseIA("Erreur 401 : Accès refusé par FastAPI.");
        return;
      }

      const data = await response.json();
      setReponseIA(data.message); // Adapte selon la structure de ton JSON
      
    } catch (error) {
      console.error("Erreur de communication :", error);
      setReponseIA("Erreur de connexion au serveur.");
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Interface du Chatbot</h1>
      <p>Bienvenue, {username} !</p>
      
      {/* Bouton pour déclencher l'appel API sécurisé */}
      <button onClick={envoyerMessageAuChatbot} style={{ padding: '10px', background: '#007bff', color: 'white', borderRadius: '5px' }}>
        Tester l'appel sécurisé vers FastAPI
      </button>

      {/* Affichage de la réponse */}
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <strong>Réponse du serveur : </strong> {reponseIA}
      </div>
    </div>
  );
}

export default App;