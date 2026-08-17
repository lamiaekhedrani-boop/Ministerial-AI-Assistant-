import React, { useState, useEffect } from 'react';
import ragService from '../../services/ragService';
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
      const data = await ragService.getDocuments();
      console.log('Documents récupérés :', data);
      setDocuments(data);
    } catch (error) {
      console.error('Erreur lors du chargement des documents :', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    try {
      console.log('Upload du fichier :', file.name);
      await ragService.uploadDocument(file);
      setFile(null);
      e.target.reset();
      await loadDocuments();
    } catch (error) {
      console.error("Erreur lors de l'upload du document :", error);
    }
  };

  const deleteDocument = async (id) => {
    if (!window.confirm(t('admin.confirm_delete_document'))) {
      return;
    }

    try {
      console.log('Suppression du document :', id);
      await ragService.deleteDocument(id);
      await loadDocuments();
    } catch (error) {
      console.error('Erreur lors de la suppression du document :', error);
    }
  };

  return (
    <div className="documents-management">
      <h2>{t('admin.documents')}</h2>

      <form className="upload-document-form" onSubmit={uploadDocument}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
          }}
          required
        />
        <button type="submit">{t('admin.add_document')}</button>
      </form>

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
                <th>Chunks</th>
                <th>{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.type}</td>
                  <td>{doc.chunks} chunks</td>
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