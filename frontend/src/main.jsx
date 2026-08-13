import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AuthProvider from './modules/auth/AuthProvider.jsx';
import { LanguageProvider } from './shared/contexts/LanguageContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);