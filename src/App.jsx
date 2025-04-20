import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ x: -200, opacity: 0 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        animate={{ x: 0, opacity: 1 }}>
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
