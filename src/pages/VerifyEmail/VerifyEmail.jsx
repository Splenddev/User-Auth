import React, { useContext, useRef } from 'react';
import './VerifyEmail.css';
import Logo from '../../components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const VerifyEmail = () => {
  const inputsRef = useRef([]);
  const { verifyOtp, sendOtp } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputHandler = (e, index) => {
    if (e.target.value.length > 0 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };
  const keydownHandler = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  const pasteHandler = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = char;
      }
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otp = inputsRef.current.map((inputs) => inputs.value).join('');
    verifyOtp(otp, navigate);
  };
  return (
    <div className="verify">
      <a
        className="verify-top"
        href="/">
        <Logo />
      </a>
      <div className="verify-form">
        <form onSubmit={onSubmitHandler}>
          <h1>Verify Email Otp</h1>
          <p>Enter the otp sent to your email</p>
          <div
            className="verify-input-fields"
            onPaste={pasteHandler}>
            {' '}
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  required
                  maxLength="1"
                  ref={(e) => (inputsRef.current[index] = e)}
                  onInput={(e) => inputHandler(e, index)}
                  onKeyDown={(e) => keydownHandler(e, index)}
                />
              ))}
          </div>
          <input
            type="button"
            value="Resend OTP"
            onClick={sendOtp}
          />
          <button>Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
