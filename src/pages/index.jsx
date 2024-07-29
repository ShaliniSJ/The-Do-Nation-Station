import React, { useState, useEffect } from 'react';
// import NavbarBeforeLogin from '../components/NavbarBeforeLogin';
// import NavbarAfterLogin from '../components/NavbarAfterLogin';
import Navbar from '../components/Navbar';
import HomeWithLogin from '../components/HomeWithLogin';
import HomeWithOutLogin from '../components/HomeWithOutLogin';
import { getCurrentUser } from '../lib/appwrite';

export default function Home() {
  const [showAfterLogin, setShowAfterLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const islogged = localStorage.getItem('islogged');
      setIsLogged(Boolean(islogged));
    }
    if (isLogged=="true") {
      setShowAfterLogin(true);
      const currentUser = getCurrentUser();
      setUser(currentUser);
    }
  }, [isLogged]);

  // Function to check if user is logged in
  // const checkLoginStatus = () => {
  //   const token = localStorage.getItem('token');
  //   // or
  //   // const isLoggedIn = localStorage.getItem('isLoggedIn');
  //   if (token) {
  //     setShowAfterLogin(true);
  //   } else {
  //     setShowAfterLogin(false);
  //   }
  // };

  // Use useEffect to check login status on component mount
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);

  return (
    <div>
      <Navbar islogged={isLogged}/>
      {/* {showAfterLogin ? <NavbarAfterLogin /> : <NavbarBeforeLogin />} */}
      {showAfterLogin ? <HomeWithLogin /> : <HomeWithOutLogin />}
    </div>
  );
}