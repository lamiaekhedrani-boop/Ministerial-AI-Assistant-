import keycloak from '../modules/auth/keycloak';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000';

class RAGService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async getAuthToken() {
    if (!keycloak.authenticated) {
      console.warn('Keycloak : utilisateur non authentifié');
      return null;
    }

    try {
      await keycloak.updateToken(30);

      return keycloak.token;
    } catch (error) {
      console.error(
        'Erreur récupération token Keycloak:',
        error
      );

      keycloak.clearToken();

      return null;
    }
  }

  async getHeaders() {
    const token = await this.getAuthToken();

    return {
      'Content-Type': 'application/json',

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  async askQuestion(question) {
    const headers = await this.getHeaders();

    const response = await fetch(
      `${this.baseUrl}/api/rag/ask`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          question,
        }),
      }
    );

    if (!response.ok) {
      let errorMessage =
        `Erreur API RAG: ${response.status}`;

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

  async getDocuments() {
    const headers = await this.getHeaders();

    const response = await fetch(
      `${this.baseUrl}/api/rag/documents`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      let errorMessage =
        `Erreur API RAG: ${response.status}`;

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

  async getDocument(filename) {
    const headers = await this.getHeaders();

    const response = await fetch(
      `${this.baseUrl}/api/rag/documents/${encodeURIComponent(filename)}`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      let errorMessage =
        `Erreur API RAG: ${response.status}`;

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

  async uploadDocument(file) {
    const token = await this.getAuthToken();

    const formData = new FormData();

    formData.append('file', file);

    const headers = {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    };

    const response = await fetch(
      `${this.baseUrl}/api/rag/documents`,
      {
        method: 'POST',
        headers,
        body: formData,
      }
    );

    if (!response.ok) {
      let errorMessage =
        `Erreur API RAG: ${response.status}`;

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

  async deleteDocument(filename) {
    const headers = await this.getHeaders();

    const response = await fetch(
      `${this.baseUrl}/api/rag/documents/${encodeURIComponent(filename)}`,
      {
        method: 'DELETE',
        headers,
      }
    );

    if (!response.ok) {
      let errorMessage =
        `Erreur API RAG: ${response.status}`;

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

  async updateDocument(filename, file) {
    const token = await this.getAuthToken();

    const formData = new FormData();

    formData.append('file', file);

    const headers = {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    };

    const response = await fetch(
      `${this.baseUrl}/api/rag/documents/${encodeURIComponent(filename)}`,
      {
        method: 'PUT',
        headers,
        body: formData,
      }
    );

    if (!response.ok) {
      let errorMessage =
        `Erreur API RAG: ${response.status}`;

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

export default new RAGService();