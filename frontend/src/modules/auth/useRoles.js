import { useAuth } from './AuthProvider';

export const useRoles = () => {
  const { user } = useAuth();
  const roles = user?.roles || [];

  const normalizedRoles = roles.map(role => role.toLowerCase());

  return {
    roles,
    isAdmin: normalizedRoles.includes('admin'),
    isUser: normalizedRoles.includes('user')
  };
};