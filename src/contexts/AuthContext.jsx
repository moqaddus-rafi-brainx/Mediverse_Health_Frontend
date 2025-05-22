import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, forgetPasswordApi, resetPasswordApi } from '../apis/AuthApi';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Validate token with your backend
      // For now, we'll just set a dummy user
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginApi(email,password);
      const { token, username, message } = response.data;
      localStorage.setItem('token', token);
      setUser({ email, username });
      return { success: true, message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      throw new Error(errorMessage);
    }
  };

  const forgotPassword = async (email,setIsLoading) => {
    try {
      const response = await forgetPasswordApi(email,setIsLoading);
      const { message, link } = response.data;
      return { success: true, message, link };
    } catch (error) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.response?.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error('Failed to send reset instructions. Please try again.');
      }
    }
  };

  const resetPassword = async (token, newPass) => {
    try {
      const response = await resetPasswordApi(token, newPass);
      return { success: true, message: response.data };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error('Failed to reset password. Please try again.');
      }
    }
  };

  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 