import React, { useState } from 'react';
import './ChatApp.css';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';
import AdminPanel from '../admin/AdminPanel';
import ProfileMenu from '../profile/ProfileMenu';
import { useAuth } from '../auth/AuthProvider';
import { useChat } from './hooks/useChat';

const ChatApp = () => {
  const { user } = useAuth();

  const {
    sessions,
    currentSessionId,
    messages,
    loading,
    sendMessage,
    createNewSession,
    loadSessionMessages,
    deleteSession,
    renameSession,
  } = useChat();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    createNewSession();
    setShowAdmin(false);

    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  const handleSelectSession = async (sessionId) => {
    await loadSessionMessages(sessionId);

    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await deleteSession(sessionId);
    } catch (error) {
      console.error(
        'Erreur lors de la suppression de la session :',
        error
      );
    }
  };

  const handleRenameSession = async (
    sessionId,
    newTitle
  ) => {
    try {
      await renameSession(
        sessionId,
        newTitle
      );
    } catch (error) {
      console.error(
        'Erreur lors du renommage de la session :',
        error
      );

      throw error;
    }
  };

  const handleSendMessage = async (text) => {
    await sendMessage(text);
  };

  const handleAdminClick = () => {
    setShowAdmin((prev) => !prev);
    closeSidebar();
  };

  const isChatEmpty = messages.length === 0;

  return (
    <div className="app-layout">
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onRenameSession={handleRenameSession}
      />

      <div className="chat-container">
        <ChatHeader
          toggleSidebar={toggleSidebar}
          user={user}
        />

        {showAdmin ? (
          <AdminPanel />
        ) : (
          <>
            {!isChatEmpty && (
              <main className="chat-main">
                <MessageList
                  messages={messages}
                  isLoading={loading}
                />
              </main>
            )}

            <div
              className={`dynamic-input-area ${
                isChatEmpty
                  ? 'centered'
                  : 'bottom'
              }`}
            >
              {isChatEmpty && (
                <WelcomeScreen />
              )}

              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={loading}
              />
            </div>
          </>
        )}

        <ProfileMenu
          onAdminClick={handleAdminClick}
        />
      </div>
    </div>
  );
};

export default ChatApp;