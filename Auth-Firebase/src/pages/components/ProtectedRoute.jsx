import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('userToken');

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
