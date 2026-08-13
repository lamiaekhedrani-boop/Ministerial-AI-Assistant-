import keycloak from '../../auth/keycloak';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ChatService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // ========================================
  // RÉCUPÉRER LE TOKEN KEYCLOAK
  // ========================================
  async getAuthToken() {
    if (!keycloak.authenticated) {
      return null;
    }

    try {
      await keycloak.updateToken(30);
      return keycloak.token;
    } catch (error) {
      console.error('Erreur lors de la récupération du token :', error);
      keycloak.clearToken();
      return null;
    }
  }

  // ========================================
  // HEADERS
  // ========================================
  async getHeaders() {
    const token = await this.getAuthToken();

    return {
      'Content-Type': 'application/json',

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // ========================================
  // ENVOYER UN MESSAGE
  // ========================================
  async sendMessage(message, sessionId = null) {
    const headers = await this.getHeaders();

    const response = await fetch(
      `${this.baseUrl}/api/chat/send`,
      {
        method: 'POST',
        headers,

        body: JSON.stringify({
          message,
          session_id: sessionId,
        }),
      }
    );

    if (!response.ok) {
      let errorMessage = `Erreur API: ${response.status}`;

      try {
        const errorData = await response.json();

        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      } catch {}

      throw new Error(errorMessage);
    }

    return await response.json();
  }

  // ========================================
  // RÉCUPÉRER LES SESSIONS
  // ========================================
  async getSessions() {
    const headers = await this.getHeaders();

    const response = await fetch(
      `${this.baseUrl}/api/chat/sessions`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      let errorMessage = `Erreur API: ${response.status}`;

      try {
        const errorData = await response.json();

        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      } catch {}

      throw new Error(errorMessage);
    }

    return await response.json();
  }

  // ========================================
  // RÉCUPÉRER LES MESSAGES D'UNE SESSION
  // ========================================
  async getSessionMessages(sessionId) {
    if (!sessionId) {
      throw new Error('Session ID manquant.');
    }

    const headers = await this.getHeaders();

    const response = await fetch(
      `${this.baseUrl}/api/chat/sessions/${sessionId}/messages`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      let errorMessage = `Erreur API: ${response.status}`;

      try {
        const errorData = await response.json();

        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      } catch {}

      throw new Error(errorMessage);
    }

    return await response.json();
  }

  // ========================================
  // SUPPRIMER UNE SESSION
  // ========================================
  async deleteSession(sessionId) {
    if (!sessionId) {
      throw new Error('Session ID manquant.');
    }

    const headers = await this.getHeaders();

    const response = await fetch(
      `${this.baseUrl}/api/chat/sessions/${sessionId}`,
      {
        method: 'DELETE',
        headers,
      }
    );

    if (!response.ok) {
      let errorMessage =
        `Erreur lors de la suppression : ${response.status}`;

      try {
        const errorData = await response.json();

        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      } catch {}

      throw new Error(errorMessage);
    }

    return await response.json();
  }

  // ========================================
  // RENOMMER UNE SESSION
  // ========================================
  async renameSession(sessionId, newTitle) {
    if (!sessionId) {
      throw new Error('Session ID manquant.');
    }

    if (!newTitle || !newTitle.trim()) {
      throw new Error('Le nouveau titre est obligatoire.');
    }

    const headers = await this.getHeaders();

    const response = await fetch(
      `${this.baseUrl}/api/chat/sessions/${sessionId}`,
      {
        method: 'PUT',
        headers,

        body: JSON.stringify({
          title: newTitle.trim(),
        }),
      }
    );

    if (!response.ok) {
      let errorMessage =
        `Erreur lors du renommage : ${response.status}`;

      try {
        const errorData = await response.json();

        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      } catch {}

      throw new Error(errorMessage);
    }

    return await response.json();
  }
}

export default new ChatService();