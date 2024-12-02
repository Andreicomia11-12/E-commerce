import React, { Fragment } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return null; // Optionally show loading state

  return (
    <Fragment>
      <Route
        {...rest}
        element={
          isAuthenticated ? (
            element // If authenticated, render the component
          ) : (
            <Navigate to="/login" replace /> // If not authenticated, redirect to login
          )
        }
      />
    </Fragment>
  );
};

export default ProtectedRoute;
