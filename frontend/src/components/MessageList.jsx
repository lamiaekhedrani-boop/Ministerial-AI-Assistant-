import React from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

function MessageList({ messages, isLoading }) {
  return (
    <div className="message-list">
      {/* On parcourt le tableau de messages pour créer une bulle pour chacun */}
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
      
      {/* Si le backend cherche une réponse, on affiche l'animation à la fin */}
      {isLoading && <TypingIndicator />}
    </div>
  );
}

export default MessageList;