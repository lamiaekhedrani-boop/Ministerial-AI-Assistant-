import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRoles } from './useRoles';

export const AdminRoute = ({ children }) => {
  const { isAdmin } = useRoles();

  if (!isAdmin) {
    return <Navigate to="/chat" replace />;
  }

  return children;
};