import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; 

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading){
    return <div>Loading...</div>; 
  }
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;