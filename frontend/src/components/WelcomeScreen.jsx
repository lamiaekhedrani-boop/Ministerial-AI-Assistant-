import React from 'react';

function WelcomeScreen({ onSuggestionClick }) {
  // Liste des questions fréquentes pour aider le citoyen à démarrer
  const suggestions = [
    "Quelles sont les démarches pour renouveler un passeport ?",
    "Comment obtenir une aide financière pour mon entreprise ?",
    "Où trouver le formulaire Cerfa de déclaration ?",
    "Quels sont les délais de traitement des dossiers ?"
  ];

  return (
    <div className="welcome-screen">
      <div className="welcome-icon">💬</div>
      <h2>Comment puis-je vous aider aujourd'hui ?</h2>
      <p className="welcome-subtitle">
        Posez votre question en langage naturel. Je chercherai la réponse dans notre base documentaire sécurisée.
      </p>
      
      <div className="suggestions-grid">
        {suggestions.map((suggestion, index) => (
          <button 
            key={index} 
            className="suggestion-button"
            // Lorsque l'utilisateur clique, on remonte le texte à App.jsx
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeScreen;