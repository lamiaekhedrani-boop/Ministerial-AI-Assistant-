import React, { useState } from 'react';
import { useRoles } from '../auth/useRoles';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import './AdminPanel.css';

import UsersManagement from './UsersManagement';
import DocumentsManagement from './DocumentsManagement';

const AdminPanel = () => {
  const { isAdmin } = useRoles();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('users');

  if (!isAdmin) {
    return null;
  }

  return (
  <div className="admin-panel">
    <h1>{t('admin.title')}</h1>

    <div className="admin-tabs">
      <button
        className={activeTab === 'users' ? 'active' : ''}
        onClick={() => setActiveTab('users')}
      >
        {t('admin.users')}
      </button>

      <button
        className={activeTab === 'documents' ? 'active' : ''}
        onClick={() => setActiveTab('documents')}
      >
        {t('admin.documents')}
      </button>
    </div>

    <div className="admin-content">
      {activeTab === 'users' && <UsersManagement />}
      {activeTab === 'documents' && <DocumentsManagement />}
    </div>
  </div>
);

};

export default AdminPanel;