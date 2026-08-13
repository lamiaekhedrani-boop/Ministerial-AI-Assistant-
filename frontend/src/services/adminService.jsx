import keycloak from '../modules/auth/keycloak';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000';

class AdminService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async getAuthToken() {
    if (!keycloak.authenticated) {
      return null;
    }

    try {
      await keycloak.updateToken(30);
      return keycloak.token;
    } catch (error) {
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

  async getUsers() {
    try {
      const headers = await this.getHeaders();

      const response = await fetch(
        `${this.baseUrl}/api/admin/users`,
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
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des utilisateurs:',
        error
      );

      throw error;
    }
  }

  async createUser(userData) {
    try {
      const headers = await this.getHeaders();

      const response = await fetch(
        `${this.baseUrl}/api/admin/users`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(userData),
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
    } catch (error) {
      console.error(
        'Erreur lors de la création de l’utilisateur:',
        error
      );

      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const headers = await this.getHeaders();

      const response = await fetch(
        `${this.baseUrl}/api/admin/users/${userId}`,
        {
          method: 'DELETE',
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
    } catch (error) {
      console.error(
        'Erreur lors de la suppression de l’utilisateur:',
        error
      );

      throw error;
    }
  }

  async getDocuments() {
    try {
      const headers = await this.getHeaders();

      const response = await fetch(
        `${this.baseUrl}/api/admin/documents`,
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
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des documents:',
        error
      );

      throw error;
    }
  }

  async uploadDocument(formData) {
    try {
      const token = await this.getAuthToken();

      const headers = {
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await fetch(
        `${this.baseUrl}/api/admin/documents`,
        {
          method: 'POST',
          headers,
          body: formData,
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
    } catch (error) {
      console.error(
        'Erreur lors de l’upload du document:',
        error
      );

      throw error;
    }
  }

  async deleteDocument(documentId) {
    try {
      const headers = await this.getHeaders();

      const response = await fetch(
        `${this.baseUrl}/api/admin/documents/${documentId}`,
        {
          method: 'DELETE',
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
    } catch (error) {
      console.error(
        'Erreur lors de la suppression du document:',
        error
      );

      throw error;
    }
  }
}

export default new AdminService();