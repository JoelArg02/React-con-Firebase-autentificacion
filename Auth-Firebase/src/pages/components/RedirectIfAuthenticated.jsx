import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem('userToken');
  return token ? <Navigate to="/home" replace /> : children;
};
