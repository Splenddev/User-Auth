import React, { useContext, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import './Navbar.css';
import Logo from '../Logo/Logo';
import { AuthContext } from '../../context/AuthContext';
const Navbar = () => {
  const { userData, logout, sendOtp } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fullName = userData.name;
  const defaultName = 'John Doe';
  const displayName = fullName
    ? fullName
        .split(' ')
        .map((word) => word.charAt(0))
        .join(' ')
    : defaultName
        .split(' ')
        .map((word) => word.charAt(0))
        .join(' ');

  return (
    <div className="navbar">
      <Logo />
      {userData ? (
        <div
          className="navbar-user-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <p>{displayName}</p>
          {isMenuOpen && (
            <ul>
              {!userData.verifiedAccount && (
                <li onClick={sendOtp}>Verify Email</li>
              )}
              <li onClick={logout}>Logout</li>
            </ul>
          )}
        </div>
      ) : (
        <button>
          <a
            className="login-link"
            href="/login">
            Login <FaAngleRight />
          </a>
        </button>
      )}
    </div>
  );
};

export default Navbar;
