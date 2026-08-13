import React from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

function ChatHeader({ toggleSidebar }) {
  const { t } = useLanguage();

  return (
    <header className="chat-header">

      {/* Bouton menu avec le symbole du ministère */}
      <button
        className="menu-button"
        onClick={toggleSidebar}
        title={t('chat.menu')}
        aria-label={t('chat.menu')}
      >
        {/* Symbole normal */}
        <span className="menu-logo">🏛️</span>

        {/* Hamburger visible au survol */}
        <svg
          className="menu-hamburger"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

    </header>
  );
}

export default ChatHeader;