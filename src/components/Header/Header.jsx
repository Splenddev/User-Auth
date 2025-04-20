import React, { useContext } from 'react';
import './Header.css';
import { AuthContext } from '../../context/AuthContext';
import Logo from '../Logo/Logo';
// import { useNavigate } from 'react-router-dom';
const Header = () => {
  const { userData, isLoading } = useContext(AuthContext);
  const welcomeTexts = [
    'Use the top-left menu to access your dashboard and profile.',
    'If you have not verified your email address, please do in top-left menu.',
    'Click proceed to App to check out our app features.',
  ];
  // const navigate = useNavigate();
  return (
    <div className="header">
      <div class="logo-container">
        <Logo no_text={true} />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : userData ? (
        userData.verifiedAccount ? (
          <>
            <h2>
              Hello, <span className="capitalize">{userData.name}</span>!
            </h2>
            <div class="header-messages">
              <p className="welcome-text">
                Welcome to User Auth. We are glad to have you here. Your account
                has been created successfully, and you are all set to explore.
              </p>
              <hr />
              {welcomeTexts.map((text, index) => (
                <ul key={index}>
                  <li>
                    👉<span>{text}</span>
                  </li>
                </ul>
              ))}
            </div>
            <a href="#">Proceed to App</a>
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
          <h2>Hey 🖐!</h2>{' '}
          <div class="header-messages">
            <p className="welcome-text">
              <span>Welcome to User Auth.</span>
              This is a secure platform where you can manage profiles, access
              protected resources and explore personalized resources.
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
          <a href="/login">Sign Up</a>
        </>
      )}
    </div>
  );
};

export default Header;
