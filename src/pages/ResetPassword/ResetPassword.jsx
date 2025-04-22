import { useState, useRef, useContext, useEffect } from 'react';
import transition from '../../utils/transition';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo.jsx';
import './ResetPassword.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import OtpInput from '../../components/OtpInput/OtpInput.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import Loader from '../../components/Loader/Loader.jsx';
const ResetPassword = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isEmailSent, setIsEmailSent] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState('');
  const [resetPasswordOtpExpTime, setResetPasswordOtpExpTime] = useState('');
  const { sendResetOtp, verifyResetOtp, resetPassword } =
    useContext(AuthContext);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    sendResetOtp(
      identifier,
      setIsEmailSent,
      setLoader1,
      setResetPasswordOtpExpTime
    );
  };
  const inputsRef = useRef([]);
  const reSendOtp = () => {
    sendResetOtp(
      identifier,
      setIsEmailSent,
      setLoader1,
      setResetPasswordOtpExpTime
    );
  };
  const verifyOtp = (e) => {
    e.preventDefault();
    const otp = inputsRef.current.map((inputs) => inputs.value).join('');
    verifyResetOtp(otp, setLoader2, setIsOtpVerified, identifier);
  };
  const resetPasswordHandler = (e) => {
    e.preventDefault();
    resetPassword(newPassword, setLoader3, identifier, navigate);
  };
  useEffect(() => {
    if (isEmailSent === false || resetPasswordOtpExpTime === '') return;
    const interval = setInterval(() => {
      const diff = parseInt(resetPasswordOtpExpTime) - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else setTimeLeft(diff);
    }, 1000);
    return () => clearInterval(interval);
  }, [resetPasswordOtpExpTime, isEmailSent]);
  const formatTimeLeft = (milliseconds) => {
    const totalSec = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const seconds = String(totalSec % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  return (
    <div className="reset-password">
      <div
        className="reset-password-top"
        onClick={() => navigate('/')}>
        <Logo />
      </div>
      <div className="reset-password-form">
        {!isEmailSent && (
          <>
            <h1>Reset Password</h1>
            <p>Enter your registered email address to continue</p>
            <form onSubmit={onSubmitHandler}>
              <div className="reset-password-form-inputs">
                <div className="input-fields">
                  <FaEnvelope className="icon" />
                  <input
                    placeholder="Registered email/username"
                    type="email"
                    value={identifier}
                    required
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>
              <button className="reset-password-btn">
                {loader1 ? <Loader /> : 'Send Otp'}
              </button>
            </form>
          </>
        )}
        {!isOtpVerified && isEmailSent && (
          <OtpInput
            onSubmitHandler={verifyOtp}
            timeLeft={timeLeft}
            inputsRef={inputsRef}
            title={'Reset Password OTP'}
            formatTimeLeft={formatTimeLeft}
            loader1={loader1}
            loader2={loader2}
            isOtpSent={isEmailSent}
            sendOtp={reSendOtp}
          />
        )}
        {isOtpVerified && isEmailSent && (
          <form onSubmit={resetPasswordHandler}>
            <h1 style={{ textAlign: 'center' }}>New Password</h1>
            <p style={{ textAlign: 'center' }}>
              Enter your new secure password
            </p>
            <div className="reset-password-form-inputs">
              <div className="input-fields">
                <FaLock className="icon" />
                <input
                  type="password"
                  value={newPassword}
                  required
                  placeholder="New password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <button className="reset-password-btn">
              {loader3 ? <Loader /> : 'Change Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default transition(ResetPassword);
