import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { useLanguage } from '../../shared/contexts/LanguageContext';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: 'USER'
  });

  const { t } = useLanguage();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);

    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs :', error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();

    try {
      await adminService.createUser(newUser);

      setNewUser({
        email: '',
        password: '',
        role: 'USER'
      });

      await loadUsers();
    } catch (error) {
      console.error(
        'Erreur lors de la création de l’utilisateur :',
        error
      );
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm(t('admin.confirm_delete'))) {
      return;
    }

    try {
      await adminService.deleteUser(userId);
      await loadUsers();
    } catch (error) {
      console.error(
        'Erreur lors de la suppression de l’utilisateur :',
        error
      );
    }
  };

  return (
    <div className="users-management">

      <h2>{t('admin.users')}</h2>

      {/* Création utilisateur */}
      <form
        className="create-user-form"
        onSubmit={createUser}
      >
        <input
          type="email"
          placeholder={t('admin.email')}
          value={newUser.email}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              email: e.target.value
            })
          }
          required
        />

        <input
          type="password"
          placeholder={t('admin.password')}
          value={newUser.password}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              password: e.target.value
            })
          }
          required
        />

        <select
          value={newUser.role}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              role: e.target.value
            })
          }
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button type="submit">
          {t('admin.add_user')}
        </button>
      </form>

      {/* Liste utilisateurs */}
      <div className="users-list">

        {loading ? (
          <p>{t('admin.loading')}</p> 
        ) : users.length === 0 ? (
          <p>{t('admin.no_users')}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>{t('admin.email')}</th>
                <th>{t('profile.role')}</th> 
                <th>Actions</th> 
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>

                  <td>
                    {user.role}
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => deleteUser(user.id)}
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

export default UsersManagement;