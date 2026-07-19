import React, { useState } from 'react';

function ChatInput({ onSendMessage, isLoading }) {
  // État local pour stocker le texte en cours de frappe
  const [inputText, setInputText] = useState('');

  // Fonction appelée quand on soumet le formulaire (clic ou touche Entrée)
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la page web de se recharger
    
    // On vérifie que le message n'est pas vide et qu'on n'est pas déjà en train de charger
    if (inputText.trim() !== '' && !isLoading) {
      onSendMessage(inputText); // On envoie le texte au composant parent (App.jsx)
      setInputText(''); // On vide le champ de saisie
    }
  };

  return (
    <div className="chat-input-container">
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          // À chaque touche tapée, on met à jour l'état React
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Posez votre question sur les démarches..."
          disabled={isLoading}
          className="chat-input-field"
        />
        <button 
          type="submit" 
          disabled={isLoading || inputText.trim() === ''}
          className="chat-input-button"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default ChatInput;