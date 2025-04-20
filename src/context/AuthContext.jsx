axios.defaults.withCredentials = true;

import { createContext, useEffect, useState } from 'react';
import { handleApiError } from '../utils/handleApiError';
import axios from 'axios';
export const AuthContext = createContext();
export const AuthContextProvider = (prop) => {
  const url = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const [auth, setAuth] = useState('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState(false);
  const login = async (identifier, password) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${url}/app/user/login`, {
        identifier,
        password,
      });
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        return data.success;
      } else {
        alert(data.message);
        return false;
      }
    } catch (error) {
      handleApiError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const signup = async (user) => {
    try {
      const { data } = await axios.post(`${url}/app/user/register`, {
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
      });
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        return data.success;
      } else {
        alert(data.message);
      }
    } catch (error) {
      handleApiError(error);
    }
  };
  const getUserData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${url}/app/user/get/data`);
      if (data.success) {
        setUserData(data.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      handleApiError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${url}/app/user/is-auth`);
      if (data.status === 'authenticated') {
        setIsLoggedIn(true);
        getUserData();
      } else if (data.status === 'guest') {
        alert('Please login to view our app.');
      } else if (data.status === 'expired') {
        alert('Not authorized! Login again.');
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const logout = async () => {
    try {
      const { data } = await axios.post(`${url}/app/user/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        window.location.href = '/';
      }
    } catch (error) {
      handleApiError(error);
    }
  };
  const sendOtp = async () => {
    try {
      const { data } = await axios.post(`${url}/app/user/otp/send`);
      if (data.success) {
        alert(data.message);
        window.location.href = '/verify/email';
      } else {
        alert(data.message);
      }
    } catch (error) {
      handleApiError(error);
    }
  };
  const verifyOtp = async (otp, navigate) => {
    try {
      const { data } = await axios.post(`${url}/app/user/otp/verify`, { otp });
      if (data.success) {
        alert(data.message);
        getUserData();
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      handleApiError(error);
    }
  };
  const value = {
    url,
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    signup,
    userData,
    setUserData,
    auth,
    setAuth,
    sendOtp,
    verifyOtp,
    isLoading,
    setIsLoading,
  };
  return (
    <AuthContext.Provider value={value}>{prop.children}</AuthContext.Provider>
  );
};
