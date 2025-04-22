import React from 'react';
import './Loader.css';
const Loader = ({ width, height, bdWidth, bdColor, duration }) => {
  const boderWidth = bdWidth || '3px';
  const style = {
    width: width || '20px',
    height: height || '20px',
    border: `${boderWidth} solid ${bdColor || '#fff'}`,
    borderTop: `${boderWidth} solid transparent`,
    borderRight: `${boderWidth} solid transparent`,
    animationDuration: duration || '0.8s',
  };
  return (
    <div
      style={style}
      className="loader"></div>
  );
};

export default Loader;
