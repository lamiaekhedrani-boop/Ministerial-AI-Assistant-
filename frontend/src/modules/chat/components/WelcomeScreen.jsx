import React from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

const WelcomeScreen = () => {
  const { t, dir } = useLanguage();

  return (
    <div
      className="welcome-screen"
      dir={dir}
    >
      <h1>
        {t('chat.welcome')}
      </h1>
    </div>
  );
};

export default WelcomeScreen;