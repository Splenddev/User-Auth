/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
const transition = (OgComponent, location) => {
  return () => (
    <>
      <OgComponent />
      <motion.div
        className={location === 'home' ? 'slide-out' : 'slide-in'}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className={location === 'home' ? 'slide-in' : 'slide-out'}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default transition;
