import React, { createContext, useState, useEffect } from "react";
import API from "../utils/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const response = await API.get("/api/auth/me", {
        withCredentials: true,
      });

      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("No active session or invalid token.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = (userData) => setUser(userData);

  const logout = async function () {
    try {
      const response = await API.get("/api/auth/logout", {
        withCredentials: true,
      });
      if (response.data.success) {
        setUser(null);
      }
    } catch (error) {
      console.log("No active session or invalid token.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        checkSession, 
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};