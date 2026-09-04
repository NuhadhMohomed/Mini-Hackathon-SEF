import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isStaffUser } from '@/lib/api';

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // If user is authenticated and is staff/owner
  if (!isAuthenticated() || !isStaffUser()) {
    // For demo evaluators: if no session yet, redirect to login with notification
    return <Navigate to="/login" state={{ from: location, message: 'Please sign in to access Bakehouse Operations' }} replace />;
  }

  return children;
}
