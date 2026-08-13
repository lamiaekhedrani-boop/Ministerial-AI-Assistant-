import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { useLanguage } from '../../shared/contexts/LanguageContext';

const DocumentsManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const { t } = useLanguage();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);

    try {
      const data = await adminService.getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error(
        'Erreur lors du chargement des documents :',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await adminService.uploadDocument(formData);

      setFile(null);

      // Réinitialiser l'input file
      e.target.reset();

      await loadDocuments();
    } catch (error) {
      console.error(
        'Erreur lors de l\'upload du document :',
        error
      );
    }
  };

  const deleteDocument = async (docId) => {
    if (!window.confirm(t('admin.confirm_delete_document'))) {
      return;
    }

    try {
      await adminService.deleteDocument(docId);
      await loadDocuments();
    } catch (error) {
      console.error(
        'Erreur lors de la suppression du document :',
        error
      );
    }
  };

  return (
    <div className="documents-management">

      <h2>{t('admin.documents')}</h2>

      {/* Upload */}
      <form
        className="upload-document-form"
        onSubmit={uploadDocument}
      >
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
          }}
          required
        />

        <button type="submit">
          {t('admin.add_document')}
        </button>
      </form>

      {/* Liste des documents */}
      <div className="documents-list">

        {loading ? (
          <p>{t('admin.loading')}</p>
        ) : documents.length === 0 ? (
          <p>{t('admin.no_documents')}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>{t('admin.name')}</th>
                <th>{t('admin.type')}</th>
                <th>{t('admin.size')}</th>
                <th>{t('admin.actions')}</th>
              </tr>
            </thead>

            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>

                  <td>{doc.type}</td>

                  <td>
                    {(doc.size / 1024).toFixed(2)} KB
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => deleteDocument(doc.id)}
                    >
                      {t('admin.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

    </div>
  );
};

export default DocumentsManagement;