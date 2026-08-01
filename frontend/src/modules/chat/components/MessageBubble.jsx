import React from 'react';

function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`message-wrapper ${isUser ? 'message-user' : 'message-bot'}`}>
      <div className="message-content">
        <p>{message.content}</p>
      </div>
    </div>
  );
}

export default MessageBubble;