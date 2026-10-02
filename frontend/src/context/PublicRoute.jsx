import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; 

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading){
    return <div>Loading...</div>; 
  }
  if (user){
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;