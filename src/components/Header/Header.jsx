import React, { useContext } from 'react';
import './Header.css';
import { AuthContext } from '../../context/AuthContext';
import Logo from '../Logo/Logo';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
const Header = () => {
  const { userData, isLoading, setAuth } = useContext(AuthContext);
  const welcomeTexts = [
    'Use the top-left menu to access your dashboard and logout.',
    'Click Proceed to App to check out our app features.',
  ];
  // const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo-container">
        <Logo no_text={true} />
      </div>
      {isLoading ? (
        <Loader />
      ) : userData ? (
        userData.verifiedAccount ? (
          <>
            <h2>
              Hello, <span className="capitalize">{userData.name}!</span>
            </h2>
            <div class="header-messages">
              <p className="welcome-text">
                Welcome to User Auth. We are glad to have you here. Your account
                has been created and verified successfully.
              </p>
              <hr />
              <p>
                Your email is:{' '}
                <span className="highlight">{userData.email}</span>
              </p>
              <p>
                Your username is:{' '}
                <span className="id">{userData.username}</span>
              </p>
              <hr />
              <ul>
                {welcomeTexts.map((text, index) => (
                  <li key={index}>
                    👉<span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/user-page">Proceed to App</Link>
          </>
        ) : (
          <>
            <h2>
              Welcome <span className="capitalize">{userData.name}</span>!
            </h2>
            <p className="welcome-text">
              To continue, please verify your account.
            </p>
            <a href="#">Verify</a>
          </>
        )
      ) : (
        <>
          <h2>Hey there!</h2>{' '}
          <div class="header-messages">
            <p className="welcome-text">
              <span>Welcome to User Auth.</span>
              This is a secure platform where you can manage profiles, access
              and explore protected, personalized resources.
            </p>
            <hr />
            <p>Get started by logging into your account</p>
            <hr />
            <p style={{ marginBottom: '12px' }}>New here?</p>
            <ul>
              <li>
                👉 <span>Create an account in seconds using your email </span>
              </li>
              <li>
                👉{' '}
                <span>
                  Enjoy a smooth, fast and responsive experience on all devices.{' '}
                </span>
              </li>
              <li>
                👉 <span>Enjoy secure and reliable authentication system.</span>
              </li>
            </ul>
          </div>
          <Link
            to="/login"
            onClick={() => setAuth('Sign Up')}>
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
