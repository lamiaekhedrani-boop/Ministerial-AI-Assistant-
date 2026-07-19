import React from 'react';

function TypingIndicator() {
  return (
    <div className="message-wrapper message-bot">
      <div className="typing-indicator">
        {/* Trois petits points que nous allons animer en CSS plus tard */}
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}

export default TypingIndicator;