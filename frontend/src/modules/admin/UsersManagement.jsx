import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { useLanguage } from '../../shared/contexts/LanguageContext';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });

  const { t } = useLanguage();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);

    try {
      const data = await adminService.getUsers();
      setUsers(data.users ? data.users : data);
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
        username: '',
        email: '',
        password: '',
        role: 'user'
      });

      await loadUsers();
    } catch (error) {
      console.error('Erreur lors de la création de l’utilisateur :', error);
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
      console.error('Erreur lors de la suppression de l’utilisateur :', error);
    }
  };

  return (
    <div className="users-management">
      <h2>{t('admin.users')}</h2>

      <form className="create-user-form" onSubmit={createUser}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
          minLength={3}
        />

        <input
          type="email"
          placeholder={t('admin.email')}
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder={t('admin.password')}
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
          minLength={6}
        />

        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">USER</option>
          <option value="admin">ADMIN</option>
        </select>

        <button type="submit">{t('admin.add_user')}</button>
      </form>

      <div className="users-list">
        {loading ? (
          <p>{t('admin.loading')}</p>
        ) : users.length === 0 ? (
          <p>{t('admin.no_users')}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>{t('admin.email')}</th>
                <th>{t('profile.role')}</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.roles && user.roles.length > 0 ? user.roles.join(', ') : 'user'}</td>
                  <td>
                    <button type="button" onClick={() => deleteUser(user.id)}>
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