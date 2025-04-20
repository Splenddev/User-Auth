import React, { useContext, useState } from 'react';
import './Login.css';
import Logo from '../../components/Logo/Logo';
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaIdBadge,
  FaLock,
  FaUser,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
  const { login, signup, auth, setAuth, isLoading } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const [data, setData] = useState({
    name: '',
    email: '',
    identifier: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    if (auth === 'Sign Up') {
      const response = signup(data);
      if (response === true) {
        navigate('/');
      }
    } else {
      const response = login(data.identifier, data.password);
      if (response === true) {
        navigate('/');
      }
    }
  };
  return (
    <div className="login">
      <div
        className="login-top"
        onClick={() => navigate('/')}>
        <Logo />
      </div>
      <div className="login-form">
        <h1>{auth}</h1>
        {auth === 'Login' ? (
          <p>Welcome user! Login to your account.</p>
        ) : (
          <p>Create a new account</p>
        )}
        <form onSubmit={onSubmitHandler}>
          {auth === 'Sign Up' && (
            <>
              <div className="input-fields fullname">
                <FaUser className="icon" />
                <input
                  value={data.name}
                  type="text"
                  name="name"
                  placeholder="full name"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="input-fields username">
                <FaIdBadge className="icon" />
                <input
                  value={data.username}
                  type="text"
                  required
                  name="username"
                  placeholder="username"
                  onChange={onChangeHandler}
                />
              </div>
            </>
          )}
          {auth !== 'Login' ? (
            <div className="input-fields email">
              <FaEnvelope className="icon" />
              <input
                value={data.email}
                name="email"
                type="email"
                autoComplete="off"
                required
                placeholder="email"
                onChange={onChangeHandler}
              />
            </div>
          ) : (
            <div className="input-fields email">
              <FaIdBadge className="icon" />
              <input
                value={data.identifier}
                type="text"
                name="identifier"
                required
                placeholder="email/username"
                onChange={onChangeHandler}
              />
            </div>
          )}
          <div className="input-fields password">
            <FaLock className="icon" />
            <input
              value={data.password}
              type={isVisible.password ? 'text' : 'password'}
              name="password"
              required
              placeholder="password"
              autoComplete="new-password"
              onChange={onChangeHandler}
            />
            <div
              className="eye-icon"
              onClick={() =>
                setIsVisible((prev) => ({ ...prev, password: !prev.password }))
              }>
              {isVisible.password ? (
                <FaEye className="icon" />
              ) : (
                <FaEyeSlash className="icon" />
              )}
            </div>
          </div>
          {auth === 'Sign Up' && (
            <div className="input-fields password">
              <FaLock className="icon" />
              <input
                value={data.confirmPassword}
                type={isVisible.password ? 'text' : 'password'}
                name="confirmPassword"
                required
                placeholder="confirm password"
                autoComplete="new-password"
                onChange={onChangeHandler}
              />
              <div
                className="eye-icon"
                onClick={() =>
                  setIsVisible((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }>
                {isVisible.confirmPassword ? (
                  <FaEye className="icon" />
                ) : (
                  <FaEyeSlash className="icon" />
                )}
              </div>
            </div>
          )}
          <p
            onClick={() => navigate('/reset/password')}
            style={{ color: '#5372f5', cursor: 'pointer' }}>
            Forgot password? Reset here.
          </p>
          <button className="signup-login-btn">
            {isLoading ? 'Connecting...' : auth}
          </button>
          {auth === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span
                style={{
                  color: '#5372f5',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => setAuth('Login')}>
                Login here
              </span>
            </p>
          ) : (
            <p>
              Are you new to our website?{' '}
              <span
                style={{
                  color: '#5372f5',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => setAuth('Sign Up')}>
                Create a new account here.
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
