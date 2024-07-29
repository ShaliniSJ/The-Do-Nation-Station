import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HomeWithLogin from '../components/HomeWithLogin';
import HomeWithOutLogin from '../components/HomeWithOutLogin';
import { getCurrentUser } from '../lib/appwrite';
import { idID } from '@mui/material/locale';

export default function Home() {
  const [showAfterLogin, setShowAfterLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isdonor,setIsdonor]=useState(false);
  useEffect(() => {
  if(typeof window !== 'undefined'){
        const islogged = localStorage.getItem('islogged');
        if(islogged === 'true') {
          setIsLogged(true);
        }
        else{
          setIsLogged(false);
        }
      }
  if(isLogged){
    setShowAfterLogin(true);
  }
},[]);
 

  return (
    <div>
      <Navbar islogged={isLogged}  />
      {showAfterLogin ? <HomeWithLogin /> : <HomeWithOutLogin />}
    </div>
  );
}
