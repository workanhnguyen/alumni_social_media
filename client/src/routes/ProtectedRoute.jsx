import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { DASHBOARD } from '.';

const ProtectedRoute = ({ path, element, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to={DASHBOARD} /> : <Route path={path} element={element} />;
};

export default ProtectedRoute;
