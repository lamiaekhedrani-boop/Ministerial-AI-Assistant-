import React from 'react';

function ChatHeader({ toggleSidebar }) {
  return (
    <header className="chat-header">
      {/* Le bouton menu (hamburger) en haut à gauche */}
      <button className="menu-button" onClick={toggleSidebar} title="Ouvrir le menu">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div className="header-logo">
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