import React, { useState } from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';
import { useAuth } from '../auth/AuthProvider';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 1. Nouvelles variables d'état pour la Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Le faux backend en attendant la BDD
  
  const { isAuthenticated, keycloak } = useAuth();
  const username = keycloak.tokenParsed?.preferred_username;

  const handleLogout = () => { keycloak.logout(); };

  // 2. Fonction pour ouvrir/fermer la barre
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 3. Fonction Nouveau Chat (Sauvegarde la session dans l'historique dynamique)
  const handleNewChat = () => {
    if (messages.length > 0) {
      // On crée un objet "Chat" pour l'historique
      const historyItem = {
        id: Date.now(),
        date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
        title: messages[0].content, // Le titre devient la 1ère question posée
        messages: [...messages]
      };
      
      // On l'ajoute au début du tableau d'historique
      setChatHistory((prev) => [historyItem, ...prev]);
      
      // On vide l'écran actuel
      setMessages([]);
    }
  };

  const handleSendMessage = async (text) => {
    if (!isAuthenticated) {
      keycloak.login();
      return; 
    }

    const newUserMessage = { role: 'user', content: text };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${keycloak.token}` },
        body: JSON.stringify({ prompt: text })
      });

      if (!response.ok) throw new Error("Erreur de connexion");

      const data = await response.json();
      const newBotMessage = { role: 'bot', content: data.message };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { role: 'bot', content: "Erreur serveur." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isChatEmpty = messages.length === 0;

  return (
    <div className="app-layout">
      {/* On passe nos variables d'état à la Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onNewChat={handleNewChat} 
        chatHistory={chatHistory} 
      />

      <div className="chat-container">
        {isAuthenticated && (
          <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
        )}

        {/* On donne le pouvoir d'ouvrir la barre au bouton du Header */}
        <ChatHeader toggleSidebar={toggleSidebar} />
        
        {!isChatEmpty && (
          <main className="chat-main">
            <MessageList messages={messages} isLoading={isLoading} />
          </main>
        )}

        <div className={`dynamic-input-area ${isChatEmpty ? 'centered' : 'bottom'}`}>
          {isChatEmpty && <WelcomeScreen />}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;