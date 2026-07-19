import { useState } from 'react'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'
import WelcomeScreen from './components/WelcomeScreen'
import './App.css'

function App() {
  // État pour stocker l'historique de la conversation
  const [messages, setMessages] = useState([])
  // État pour savoir si le backend est en train de chercher une réponse
  const [isLoading, setIsLoading] = useState(false)

  // Fonction déclenchée quand l'utilisateur envoie un message
  const handleSendMessage = async (text) => {
    // 1. Ajouter la question du citoyen à l'interface
    const userMessage = { role: 'user', content: text }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setIsLoading(true)

    try {
      // 2. SIMULATION DU BACKEND (Étape temporaire)
      // C'est ici que nous ferons le "fetch" vers FastAPI à l'Étape 4.
      // Pour l'instant, on simule un délai de 1.5 secondes.
      setTimeout(() => {
        const botMessage = { 
          role: 'assistant', 
          content: 'Ceci est une réponse simulée. Le backend FastAPI n\'est pas encore connecté.' 
        }
        setMessages((prevMessages) => [...prevMessages, botMessage])
        setIsLoading(false)
      }, 1500)

    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <ChatHeader />
      
      <main className="chat-main">
        {/* Si aucun message, on affiche l'accueil, sinon on affiche la conversation */}
        {messages.length === 0 ? (
          <WelcomeScreen onSuggestionClick={handleSendMessage} />
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}
      </main>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}

export default App