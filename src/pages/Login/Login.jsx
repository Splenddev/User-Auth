import React, { useContext, useState, useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import transition from '../../utils/transition';
const Login = () => {
  const { login, signup, auth, setAuth, isLoginBtnLoading, checkUsername } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
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
      login(data.identifier, data.password, navigate);
    }
  };
  useEffect(() => {
    if (data.username === '') return;
    checkUsername(data.username, setLoading);
  }, [data.username]);
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
                  required
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
                {loading && <Loader bdColor={'#eb793d'} />}
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
                type={isVisible.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                placeholder="confirm password"
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
          <Link
            onClick={() => navigate('/reset/password')}
            style={{ color: '#5372f5' }}>
            Forgot password? Reset here.
          </Link>
          <button
            className={`signup-login-btn ${isLoginBtnLoading && 'loading'}`}
            disabled={isLoginBtnLoading || loading}>
            {isLoginBtnLoading ? (
              <Loader />
            ) : auth === 'Login' ? (
              'Login'
            ) : (
              'Create account'
            )}
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

export default transition(Login);
