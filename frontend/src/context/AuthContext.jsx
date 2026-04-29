import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
          setUserInfo(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Failed to parse user info', err);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // Login Function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.post('/api/users/login', { email, password }, config);
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err) {
      const message = err.response && err.response.data.message 
        ? err.response.data.message 
        : err.message;
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Register Function
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.post('/api/users', { name, email, password }, config);
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err) {
      const message = err.response && err.response.data.message 
        ? err.response.data.message 
        : err.message;
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await axios.post('/api/users/logout');
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      localStorage.removeItem('userInfo');
      setUserInfo(null);
    }
  };

  // Update Profile Function
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.put('/api/users/profile', userData, config);
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err) {
      const message = err.response && err.response.data.message 
        ? err.response.data.message 
        : err.message;
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userInfo, loading, error, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
