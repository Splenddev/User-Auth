import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import './Home.css';
import transition from '../../utils/transition';
const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
    </div>
  );
};

export default transition(Home, 'home');
