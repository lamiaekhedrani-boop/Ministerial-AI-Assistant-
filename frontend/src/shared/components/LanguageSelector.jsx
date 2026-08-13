import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="profile-language-buttons">

      <button
        type="button"
        className={language === 'fr' ? 'active' : ''}
        onClick={() => setLanguage('fr')}
      >
        🇫🇷 FR
      </button>

      <button
        type="button"
        className={language === 'ar' ? 'active' : ''}
        onClick={() => setLanguage('ar')}
      >
        🇲🇦 AR
      </button>

    </div>
  );
};

export default LanguageSelector;