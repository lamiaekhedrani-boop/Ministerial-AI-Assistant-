import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useRoles } from '../auth/useRoles';
import LanguageSelector from '../../shared/components/LanguageSelector';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import './ProfileMenu.css';

const ProfileMenu = ({ onAdminClick }) => {
  const { user, logout } = useAuth();
  const { isAdmin } = useRoles();
  const { t } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleAdminClick = () => {
    setIsOpen(false);

    if (onAdminClick) {
      onAdminClick();
    }
  };

  return (
    <div className="profile-menu">

      <button
        type="button"
        className="profile-avatar"
        onClick={toggleMenu}
        aria-label={t('profile.title')}
      >
        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
      </button>

      {isOpen && (
        <div className="profile-dropdown">

          <div className="profile-info">
            <p className="profile-name">
              {user?.name || user?.username}
            </p>

            <p className="profile-email">
              {user?.email || ''}
            </p>

            <span className="profile-role">
              {isAdmin ? 'ADMIN' : 'USER'}
            </span>
          </div>

          {isAdmin && (
            <>
              <hr />

              <button
                type="button"
                className="profile-action admin-action"
                onClick={handleAdminClick}
              >
                {t('admin.title')}
              </button>
            </>
          )}

          <hr />

          <div className="profile-language">
            <label>
              {t('profile.language')}
            </label>

            <LanguageSelector />
          </div>

          <hr />

          <button
            type="button"
            className="profile-action logout"
            onClick={logout}
          >
            {t('auth.logout')}
          </button>

        </div>
      )}

    </div>
  );
};

export default ProfileMenu;