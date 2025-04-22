axios.defaults.withCredentials = true;

import { createContext, useEffect, useState } from 'react';
import { handleApiError } from '../utils/handleApiError';
import axios from 'axios';
import { toast } from 'react-toastify';
export const AuthContext = createContext();
export const AuthContextProvider = (prop) => {
  const url = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const [auth, setAuth] = useState('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginBtnLoading, setIsLoginBtnLoading] = useState(false);
  const [isSendOtpBtnLoading, setIsSendOtpBtnLoading] = useState(false);
  const [isVerifyOtpBtnLoading, setIsVerifyOtpBtnLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpExpTime, setOtpExpTime] = useState('');
  const [userData, setUserData] = useState(false);
  const location = window.location.pathname;
  const login = async (identifier, password, navigate) => {
    setIsLoginBtnLoading(true);
    try {
      const { data } = await axios.post(`${url}/app/user/login`, {
        identifier,
        password,
      });
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        if (data.isAccountVerified === true) {
          navigate('/');
        } else navigate('/verify/email');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoginBtnLoading(false);
    }
  };
  const signup = async (user) => {
    setIsLoginBtnLoading(true);
    if (user.confirmPassword !== user.password) {
      setIsLoginBtnLoading(false);
      return toast.error('Password mismatch!');
    }
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
        setAuth('Login');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoginBtnLoading(false);
    }
  };
  const getUserData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${url}/app/user/get/data`);
      if (data.success) {
        setUserData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
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
      } else if (data.status === 'guest' && location === '/') {
        toast.info('Please login to view our app.');
      } else if (data.status === 'expired') {
        toast.info('Not authorized! Login again.');
      }
      setIsLoading(false);
    } catch (error) {
      handleApiError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, [location]);

  const logout = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${url}/app/user/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        alert('Logged out!');
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const sendOtp = async () => {
    setIsSendOtpBtnLoading(true);
    try {
      const { data } = await axios.post(`${url}/app/user/otp/send`);
      if (data.success) {
        setOtpExpTime(data.otpExpTime);
        toast.success(data.message);
        setIsOtpSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSendOtpBtnLoading(false);
    }
  };
  const verifyOtp = async (otp, navigate) => {
    setIsVerifyOtpBtnLoading(true);
    try {
      const { data } = await axios.post(`${url}/app/user/otp/verify`, { otp });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsVerifyOtpBtnLoading(false);
    }
  };
  const sendResetOtp = async (
    identifier,
    setIsEmailSent,
    setLoader1,
    setResetPasswordOtpExpTime
  ) => {
    setLoader1(true);
    try {
      const { data } = await axios.post(
        `${url}/app/user/otp/reset-password/send`,
        { identifier }
      );
      if (data.success) {
        toast.success(data.message);
        setResetPasswordOtpExpTime(data.otpExpTime);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoader1(false);
    }
  };
  const verifyResetOtp = async (
    otp,
    setLoader2,
    setIsOtpVerified,
    identifier
  ) => {
    setLoader2(true);
    try {
      const { data } = await axios.post(
        `${url}/app/user/otp/reset-password/verify`,
        {
          otp,
          identifier,
        }
      );
      if (data.success) {
        toast.success(data.message);
        setIsOtpVerified(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoader2(false);
    }
  };
  const resetPassword = async (
    newPassword,
    setLoader3,
    identifier,
    navigate
  ) => {
    setLoader3(true);
    try {
      const { data } = await axios.post(`${url}/app/user/reset/password`, {
        newPassword,
        identifier,
      });
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoader3(false);
    }
  };
  const checkUsername = async (username, setLoading) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/app/user/check/username`, {
        username,
      });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
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
    isOtpSent,
    setIsOtpSent,
    otpExpTime,
    setOtpExpTime,
    verifyOtp,
    isLoading,
    setIsLoading,
    isLoginBtnLoading,
    setIsLoginBtnLoading,
    isSendOtpBtnLoading,
    isVerifyOtpBtnLoading,
    setIsSendOtpBtnLoading,
    setIsVerifyOtpBtnLoading,
    sendResetOtp,
    verifyResetOtp,
    resetPassword,
    checkUsername,
  };
  return (
    <AuthContext.Provider value={value}>{prop.children}</AuthContext.Provider>
  );
};
