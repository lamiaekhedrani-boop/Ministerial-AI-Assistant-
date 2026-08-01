import React from 'react';

function Sidebar({ isOpen, onNewChat, chatHistory }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <button className="new-chat-button" onClick={onNewChat}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="plus-icon">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Nouveau Chat
        </button>

        <div className="history-section">
          <p className="history-title">Historique des sessions</p>
          <ul className="history-list">
            
            {chatHistory.length === 0 ? (
              <li className="history-item empty">Aucun historique pour le moment.</li>
            ) : (
              chatHistory.map((chat) => (
                <li key={chat.id} className="history-item">
                  <span className="history-date">{chat.date}</span>
                  <span className="history-text">{chat.title}</span>
                </li>
              ))
            )}
            
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;