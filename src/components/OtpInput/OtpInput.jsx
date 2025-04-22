import React from 'react';
import Loader from '../Loader/Loader';
import './OtpInput.css';
const OtpInput = ({
  title,
  onSubmitHandler,
  timeLeft,
  formatTimeLeft,
  inputsRef,
  sendOtp,
  loader1,
  loader2,
  isOtpSent,
}) => {
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
  return (
    <form
      className="otp-form"
      onSubmit={onSubmitHandler}>
      <h1>{title}</h1>
      <p>Enter the otp sent to your email</p>
      <div
        className="otp-input-fields"
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
      <div className="send-otp-options">
        {isOtpSent === false && (
          <span onClick={sendOtp}>{loader1 ? <Loader /> : 'Send OTP'}</span>
        )}
        {isOtpSent && (
          <span onClick={sendOtp}>{loader1 ? <Loader /> : 'Resend OTP'}</span>
        )}
        {timeLeft > 0 && (
          <p className="otp-expire-time">
            OTP expires in: {formatTimeLeft(timeLeft)}
          </p>
        )}
      </div>
      <button>{loader2 ? <Loader /> : 'Verify email'}</button>
    </form>
  );
};

export default OtpInput;
