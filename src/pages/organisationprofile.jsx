import React, { useState, useEffect } from 'react';
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

  return (
    <div>
      <Navbar islogged={isLogged}/>
      {showAfterLogin ? <HomeWithLogin /> : <HomeWithOutLogin />}
    </div>
  );
}