import React from 'react';

function ChatHeader() {
  return (
    <header className="chat-header">
      <div className="header-logo">
        {/* On utilise un simple emoji ou icône pour l'instant, on pourra le remplacer par le logo officiel */}
        <span className="logo-icon">🏛️</span>
      </div>
      <div className="header-title">
        <h1>Assistant IA</h1>
        <p>Réponses basées sur les documents officiels</p>
      </div>
    </header>
  );
}

export default ChatHeader;