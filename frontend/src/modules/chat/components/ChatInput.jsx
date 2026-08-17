import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

function ChatInput({ onSendMessage, isLoading }) {
  const { isAuthenticated, keycloak } = useAuth();
  const { t, dir } = useLanguage();

  const [inputText, setInputText] = useState('');

  console.log(
    ' ChatInput - isAuthenticated =',
    isAuthenticated
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      ' handleSubmit appelé, isAuthenticated =',
      isAuthenticated
    );

    const text = inputText.trim();

    if (!text) {
      return;
    }

    if (!isAuthenticated) {
      sessionStorage.setItem(
        'pending_message',
        text
      );

      if (keycloak) {
        keycloak.login();
      }

      return;
    }

    if (!isLoading) {
      onSendMessage(text);
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const hasText = inputText.trim() !== '';

  const placeholder = isAuthenticated
    ? t('chat.placeholder')
    : t('auth.login');

  return (
    <div className="chat-input-container">

      <form
        className="chat-input-form"
        onSubmit={handleSubmit}
        dir={dir}
      >

        <input
          type="text"
          value={inputText}
          onChange={(e) =>
            setInputText(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="chat-input-field"
          dir={dir}
        />

        {hasText && (
          <button
            type="submit"
            disabled={isLoading}
            className="chat-input-button"
            title={
              isAuthenticated
                ? t('chat.send')
                : t('auth.login')
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L12 20M12 4L6 10M12 4L18 10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

      </form>
    </div>
  );
}

export default ChatInput;