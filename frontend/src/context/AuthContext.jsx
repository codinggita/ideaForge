import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import { setAuthenticated } from '../store/slices/authSlice';
import { clearUserProfile, setUserProfile } from '../store/slices/userSlice';

// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      let storedUser = null;

      try {
        storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
          setUserInfo(JSON.parse(storedUser));
          dispatch(setUserProfile(JSON.parse(storedUser)));
          dispatch(setAuthenticated(true));
        }
      } catch (err) {
        console.error('Failed to parse user info', err);
      }

      try {
        const { data } = await api.get('/users/profile');
        setUserInfo(data);
        dispatch(setUserProfile(data));
        dispatch(setAuthenticated(true));
        localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('userInfo');
          setUserInfo(null);
          dispatch(clearUserProfile());
          dispatch(setAuthenticated(false));
        }
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

      const { data } = await api.post('/users/login', { email, password }, config);
      
      setUserInfo(data);
      dispatch(setUserProfile(data));
      dispatch(setAuthenticated(true));
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

      const { data } = await api.post('/users', { name, email, password }, config);
      
      setUserInfo(data);
      dispatch(setUserProfile(data));
      dispatch(setAuthenticated(true));
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
      await api.post('/users/logout');
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      localStorage.removeItem('userInfo');
      sessionStorage.clear();
      setUserInfo(null);
      dispatch(clearUserProfile());
      dispatch(setAuthenticated(false));
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

      const { data } = await api.put('/users/profile', userData, config);
      
      setUserInfo(data);
      dispatch(setUserProfile(data));
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
