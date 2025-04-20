import React from 'react';
import './Logo.css';
import { FaCheckCircle, FaUser } from 'react-icons/fa';

const Logo = ({ no_text }) => {
  return (
    <div className="logo">
      <div className="scene">
        <div className="circle">
          <FaUser
            // color="#5372f0"
            size={'30px'}
          />
          <div className="check">
            <FaCheckCircle />
          </div>
        </div>
      </div>
      {!no_text && <p className="company-name">User Auth</p>}
    </div>
  );
};

export default Logo;
