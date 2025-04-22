import React, { useContext, useEffect, useRef, useState } from 'react';
import './VerifyEmail.css';
import Logo from '../../components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';
import OtpInput from '../../components/OtpInput/OtpInput';
const VerifyEmail = () => {
  const inputsRef = useRef([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const {
    isSendOtpBtnLoading,
    isVerifyOtpBtnLoading,
    verifyOtp,
    sendOtp,
    isOtpSent,
    otpExpTime,
    isLoggedIn,
    userData,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otp = inputsRef.current.map((inputs) => inputs.value).join('');
    verifyOtp(otp, navigate);
  };
  useEffect(() => {
    if (isOtpSent === false || otpExpTime === '') return;
    const interval = setInterval(() => {
      const diff = parseInt(otpExpTime) - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else setTimeLeft(diff);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpExpTime, isOtpSent]);
  const formatTimeLeft = (milliseconds) => {
    const totalSec = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const seconds = String(totalSec % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  useEffect(() => {
    if (isLoggedIn && userData && userData.verifiedAccount) navigate('/');
  }, [isLoggedIn, userData]);
  return (
    <div className="verify">
      <a
        className="verify-top"
        href="/">
        <Logo />
      </a>
      <div className="verify-form">
        <OtpInput
          onSubmitHandler={onSubmitHandler}
          timeLeft={timeLeft}
          formatTimeLeft={formatTimeLeft}
          inputsRef={inputsRef}
          loader1={isSendOtpBtnLoading}
          loader2={isVerifyOtpBtnLoading}
          isOtpSent={isOtpSent}
          sendOtp={sendOtp}
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
