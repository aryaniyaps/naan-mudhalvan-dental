import React from 'react';
import { Navigate } from 'react-router'; // Use react-router

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Check if the user is authenticated (e.g., check for a token in localStorage)
  const isAuthenticated = !!localStorage.getItem('authToken'); // Simple check

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Render the children if authenticated
};

export default PrivateRoute;
