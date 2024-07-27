import React, { useState, useEffect } from 'react';
import NavbarBeforeLogin from '../components/NavbarBeforeLogin';
import NavbarAfterLogin from '../components/NavbarAfterLogin';
import HomeWithLogin from '../components/HomeWithLogin';
import HomeWithOutLogin from '../components/HomeWithOutLogin';

export default function Home() {
  const [showAfterLogin, setShowAfterLogin] = useState(false);

  // Function to check if user is logged in
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    // or
    // const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (token) {
      setShowAfterLogin(true);
    } else {
      setShowAfterLogin(false);
    }
  };

  // Use useEffect to check login status on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div>
      {showAfterLogin ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}
      {showAfterLogin ? <HomeWithLogin /> : <HomeWithOutLogin />}
    </div>
  );
}