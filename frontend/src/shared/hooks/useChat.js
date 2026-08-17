import { useState, useEffect } from 'react';
import chatService from '../../services/chatService';
import { useAuth } from '../../modules/auth/AuthProvider';

export const useChat = () => {
  const { isAuthenticated } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadSessions();
    } else {
      setSessions([]);
      setCurrentSessionId(null);
      setMessages([]);
    }
  }, [isAuthenticated]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await chatService.getSessions();

      setSessions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.message || 'Impossible de charger les conversations.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadSessionMessages = async (sessionId) => {
    if (!sessionId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await chatService.getSessionMessages(sessionId);

      setMessages(Array.isArray(data) ? data : []);
      setCurrentSessionId(sessionId);
    } catch (err) {
      setError(
        err.message || 'Impossible de charger cette conversation.'
      );
    } finally {
      setLoading(false);
    }
  };

  const createNewSession = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setError(null);
  };

  const sendMessage = async (message) => {
    if (!message || !message.trim()) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    const cleanMessage = message.trim();
    const userMessageId = Date.now();

    const userMessage = {
      id: userMessageId,
      role: 'user',
      content: cleanMessage,
      created_at: new Date().toISOString(),
      session_id: currentSessionId,
    };

    try {
      setLoading(true);
      setError(null);

      setMessages((prev) => [...prev, userMessage]);

      const response = await chatService.sendMessage(
        cleanMessage,
        currentSessionId
      );

      const newSessionId =
        response?.session_id || currentSessionId;

      if (!currentSessionId && response?.session_id) {
        setCurrentSessionId(response.session_id);
      }

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response?.reply || 'Réponse reçue.',
        created_at: new Date().toISOString(),
        session_id: newSessionId,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      await loadSessions();

      return response;
    } catch (err) {
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== userMessageId)
      );

      setError(
        err.message || "Impossible d'envoyer le message."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionId) => {
    if (!sessionId) return;

    try {
      setLoading(true);
      setError(null);

      await chatService.deleteSession(sessionId);

      setSessions((prev) =>
        prev.filter((session) => session.id !== sessionId)
      );

      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
        setMessages([]);
      }
    } catch (err) {
      setError(
        err.message || 'Impossible de supprimer la conversation.'
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const renameSession = async (sessionId, newTitle) => {
    if (!sessionId || !newTitle || !newTitle.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await chatService.renameSession(
        sessionId,
        newTitle.trim()
      );

      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                title: newTitle.trim(),
              }
            : session
        )
      );
    } catch (err) {
      setError(
        err.message || 'Impossible de renommer la conversation.'
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sessions,
    currentSessionId,
    messages,
    loading,
    error,
    sendMessage,
    loadSessionMessages,
    createNewSession,
    loadSessions,
    deleteSession,
    renameSession,
    setCurrentSessionId,
  };
};