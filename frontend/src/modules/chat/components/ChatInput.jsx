import React, { useState } from 'react';

function ChatInput({ onSendMessage, isLoading }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '' && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  // On vérifie s'il y a du texte (en enlevant les espaces vides)
  const hasText = inputText.trim() !== '';

  return (
    <div className="chat-input-container">
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Posez votre question sur les démarches..."
          disabled={isLoading}
          className="chat-input-field"
        />
        
        {/* Le bouton n'apparaît que si hasText est vrai */}
        {hasText && (
          <button 
            type="submit" 
            disabled={isLoading}
            className="chat-input-button"
            title="Envoyer"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </form>
    </div>
  );
}

export default ChatInput;