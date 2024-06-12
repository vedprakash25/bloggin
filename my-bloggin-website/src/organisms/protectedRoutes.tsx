import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = (children: any) => {
  const isAuthenticated = false;
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children; // Render children component if authenticated
};

export default ProtectedRoute;
