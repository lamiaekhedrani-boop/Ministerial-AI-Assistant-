import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import './Sidebar.css';

const RenameModal = ({
  isOpen,
  onClose,
  onRename,
  currentTitle,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setNewTitle(currentTitle || '');
    }
  }, [isOpen, currentTitle]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = newTitle.trim();

    if (!title) {
      return;
    }

    onRename(title);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        dir="ltr"
      >
        <h3>
          {t('chat.rename')}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={t('chat.rename_placeholder')}
            autoFocus
            maxLength={100}
          />

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
            >
              {t('common.cancel')}
            </button>

            <button
              type="submit"
              disabled={!newTitle.trim()}
            >
              {t('common.rename')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Sidebar({
  isOpen,
  sessions = [],
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onRenameSession,
  onClose,
}) {
  const { t, language, dir } = useLanguage();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [renameTarget, setRenameTarget] = useState(null);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleDateString(
      language === 'ar' ? 'ar-MA' : 'fr-FR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  };

  const toggleMenu = (e, sessionId) => {
    e.stopPropagation();

    setOpenMenuId((prev) =>
      prev === sessionId ? null : sessionId
    );
  };

  const handleDelete = async (e, sessionId) => {
    e.stopPropagation();

    setOpenMenuId(null);

    if (!onDeleteSession) {
      return;
    }

    const confirmed = window.confirm(
      t('chat.delete_confirm') ||
        'Voulez-vous vraiment supprimer cette conversation ?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await onDeleteSession(sessionId);
    } catch (error) {
      console.error(
        'Erreur lors de la suppression :',
        error
      );
    }
  };

  const handleRenameClick = (e, session) => {
    e.stopPropagation();

    setOpenMenuId(null);
    setRenameTarget(session);
    setShowRenameModal(true);
  };

  const handleRenameConfirm = async (newTitle) => {
    if (!renameTarget || !onRenameSession) {
      return;
    }

    try {
      await onRenameSession(
        renameTarget.id,
        newTitle
      );

      setRenameTarget(null);
      setShowRenameModal(false);
    } catch (error) {
      console.error(
        'Erreur lors du renommage :',
        error
      );
    }
  };

  const handleRenameCancel = () => {
    setRenameTarget(null);
    setShowRenameModal(false);
  };

  const handleNewChatClick = () => {
    setOpenMenuId(null);

    if (onNewChat) {
      onNewChat();
    }
  };

  const handleSelectSession = (sessionId) => {
    setOpenMenuId(null);

    if (onSelectSession) {
      onSelectSession(sessionId);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`sidebar ${isOpen ? 'open' : ''}`}
        dir={dir}
      >
        <div className="sidebar-content">
          {/* ===== BRANDING ===== */}
          <div className="sidebar-brand">
            <span className="sidebar-brand-name">
              DALIL AI
            </span>
          </div>

          <button
            type="button"
            className="new-chat-button"
            onClick={handleNewChatClick}
          >
            <svg
              className="plus-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <span>
              {t('chat.new')}
            </span>
          </button>

          <div className="history-section">
            <p className="history-title">
              {t('chat.history')}
            </p>

            {sessions.length === 0 ? (
              <div className="history-empty">
                {t('chat.empty')}
              </div>
            ) : (
              <ul className="history-list">
                {sessions.map((session) => (
                  <li
                    key={session.id}
                    className={`history-item ${
                      currentSessionId === session.id
                        ? 'active'
                        : ''
                    }`}
                  >
                    <div
                      className="history-main"
                      onClick={() =>
                        handleSelectSession(session.id)
                      }
                    >
                      <svg
                        className="chat-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 15C21 16.1 20.1 17 19 17H7L3 21V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V15Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <div className="history-content">
                        <span className="history-text">
                          {session.title ||
                            t('chat.new')}
                        </span>

                        {session.updated_at && (
                          <span className="history-date">
                            {formatDate(
                              session.updated_at
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="menu-dots-btn"
                      onClick={(e) =>
                        toggleMenu(
                          e,
                          session.id
                        )
                      }
                      aria-label={
                        language === 'ar'
                          ? 'خيارات المحادثة'
                          : 'Options de la conversation'
                      }
                    >
                      ⋮
                    </button>

                    {openMenuId === session.id && (
                      <div
                        className="session-dropdown"
                        dir={dir}
                      >
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={(e) =>
                            handleRenameClick(
                              e,
                              session
                            )
                          }
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>

                          <span>
                            {t('chat.rename')}
                          </span>
                        </button>

                        <button
                          type="button"
                          className="dropdown-item delete"
                          onClick={(e) =>
                            handleDelete(
                              e,
                              session.id
                            )
                          }
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                          </svg>

                          <span>
                            {t('chat.delete')}
                          </span>
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>

      <RenameModal
        isOpen={showRenameModal}
        onClose={handleRenameCancel}
        onRename={handleRenameConfirm}
        currentTitle={
          renameTarget?.title || ''
        }
      />
    </>
  );
}

export default Sidebar;