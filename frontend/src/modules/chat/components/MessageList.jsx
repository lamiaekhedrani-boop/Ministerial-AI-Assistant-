import React from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

function MessageList({ messages, isLoading }) {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
      
      {isLoading && <TypingIndicator />}
    </div>
  );
}

export default MessageList;